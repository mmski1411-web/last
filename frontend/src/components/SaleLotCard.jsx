import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Eye, Heart, XCircle, Edit3, Clock } from 'lucide-react';
import { RARITY_STYLES } from '../data/cards';

/**
 * Horizontal "My Sale" lot card — row layout, shows listing metadata + Снять (Withdraw).
 */
const SaleLotCard = ({ lot, onWithdraw, onEdit }) => {
  const card = lot.card;
  const rarity = RARITY_STYLES[card.rarity];
  const showLightning = card.rarity !== 'common';

  return (
    <motion.div
      data-testid={`sale-lot-${lot.id}`}
      whileHover={{ y: -3 }}
      className={`relative rounded-xl overflow-hidden glass ${rarity.className} flex flex-col md:flex-row`}
    >
      {showLightning && (
        <div
          className="absolute inset-0 rounded-xl pointer-events-none opacity-50"
          style={{
            background: `linear-gradient(115deg, transparent 30%, ${rarity.hex}55 50%, transparent 70%)`,
            backgroundSize: '200% 100%',
            animation: 'lightning-sweep 4s linear infinite',
            mixBlendMode: 'screen',
            zIndex: 1,
          }}
        />
      )}

      {/* Rarity banner left stripe */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1"
        style={{ background: rarity.hex, boxShadow: `0 0 14px ${rarity.hex}` }}
      />

      {/* Coin avatar */}
      <div className="relative z-[2] flex-shrink-0 flex items-center justify-center p-5 md:w-44">
        <div className="relative">
          <div
            className="absolute inset-0 rounded-full blur-xl"
            style={{ background: rarity.hex, opacity: 0.35, transform: 'scale(1.3)' }}
          />
          <div
            className="relative w-20 h-20 rounded-full flex items-center justify-center font-mono-data font-bold text-base"
            style={{
              background: `radial-gradient(circle at 35% 25%, ${card.color}ee, ${card.color}66 70%)`,
              border: `2px solid ${rarity.hex}`,
              boxShadow: `inset 0 2px 12px rgba(255,255,255,0.25), 0 0 16px ${rarity.hex}77`,
              color: '#fff',
            }}
          >
            <div
              className="absolute top-1 left-2 right-2 h-3 rounded-full opacity-60"
              style={{
                background: 'linear-gradient(to bottom, rgba(255,255,255,0.7), transparent)',
              }}
            />
            {card.ticker}
          </div>
          {showLightning && (
            <Zap
              size={16}
              className="absolute -top-1 -right-1"
              style={{
                color: rarity.hex,
                fill: '#fff',
                filter: `drop-shadow(0 0 6px ${rarity.hex})`,
                animation: 'lightning-bolt 2.2s ease-in-out infinite',
              }}
            />
          )}
        </div>
      </div>

      {/* Meta section */}
      <div className="relative z-[2] flex-1 flex flex-col md:flex-row md:items-center gap-4 px-5 md:pl-0 pb-5 md:pb-0 md:py-5">
        {/* Name + rarity + badges */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span
              className="text-[10px] font-display font-bold tracking-widest uppercase"
              style={{ color: rarity.hex, textShadow: `0 0 8px ${rarity.hex}` }}
            >
              {rarity.label}
            </span>
            <span className="text-[9px] font-display font-bold px-1.5 py-0.5 rounded uppercase tracking-widest text-gray-300 border border-white/15 bg-white/5">
              {card.type}
            </span>
          </div>
          <h4 className="font-display text-xl font-bold uppercase text-white truncate">
            {card.name}
          </h4>
          <div className="mt-1 flex items-center gap-3 text-[11px] text-gray-500 font-mono-data">
            <span className="flex items-center gap-1" title={lot.txHash}>
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" /> {lot.txHash}
            </span>
          </div>
          <div className="mt-2 flex items-center gap-3 text-[10px] text-gray-400 font-display uppercase tracking-widest">
            <span className="flex items-center gap-1">
              <Clock size={10} /> {lot.listedAt}
            </span>
            <span className="flex items-center gap-1">
              <Eye size={10} /> {lot.views}
            </span>
            <span className="flex items-center gap-1">
              <Heart size={10} className="text-pink-400" /> {lot.watchers}
            </span>
          </div>
        </div>

        {/* Price column */}
        <div className="flex flex-row md:flex-col items-baseline md:items-end gap-2 md:gap-0 md:min-w-[110px]">
          <div className="text-[10px] font-display uppercase tracking-widest text-gray-400">
            Цена лота
          </div>
          <div className="font-mono-data text-2xl font-bold" style={{ color: rarity.hex }}>
            {lot.listPrice.toFixed(2)}
            <span className="text-gray-500 text-xs ml-1">MOVE</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 md:min-w-[220px] justify-end">
          <button
            data-testid={`edit-lot-${lot.id}`}
            onClick={() => onEdit?.(lot)}
            className="btn-tactile btn-tactile-ghost text-xs py-2 px-3 flex items-center gap-1.5"
          >
            <Edit3 size={12} /> Править
          </button>
          <button
            data-testid={`withdraw-lot-${lot.id}`}
            onClick={() => onWithdraw?.(lot)}
            className="btn-tactile text-xs py-2 px-4 flex items-center gap-1.5"
            style={{
              color: '#fff',
              background: 'linear-gradient(to bottom, #ff4b6e 0%, #c41e43 100%)',
              border: '1px solid #ff6b8a',
              boxShadow:
                '0 4px 0 0 #7a0a22, 0 6px 16px rgba(255, 75, 110, 0.5), inset 0 1px 0 rgba(255,255,255,0.3)',
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              borderRadius: 8,
            }}
          >
            <XCircle size={12} /> Снять
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default SaleLotCard;
