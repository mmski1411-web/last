import React from 'react';
import { motion } from 'framer-motion';
import { Send, DollarSign, Zap } from 'lucide-react';
import { RARITY_STYLES } from '../data/cards';

const CryptoCard = ({ card, onSell, onSend }) => {
  const rarity = RARITY_STYLES[card.rarity];
  const showLightning = card.rarity === 'rare' || card.rarity === 'epic' || card.rarity === 'legendary';
  const progressPct = Math.round((card.progress / card.target) * 100);

  return (
    <motion.div
      data-testid={`crypto-card-${card.ticker}`}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className={`relative rounded-xl overflow-hidden glass ${rarity.className} flex flex-col`}
    >
      {/* Lightning edge for rare+ */}
      {showLightning && (
        <div
          className="absolute inset-0 rounded-xl pointer-events-none opacity-60"
          style={{
            background: `linear-gradient(115deg, transparent 30%, ${rarity.hex}55 50%, transparent 70%)`,
            backgroundSize: '200% 100%',
            animation: 'lightning-sweep 3.5s linear infinite',
            mixBlendMode: 'screen',
            zIndex: 1,
          }}
        />
      )}

      {/* Inner radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${rarity.hex}22 0%, transparent 60%)`,
        }}
      />

      {/* Top row: rarity label + NEW badge */}
      <div className="relative z-[2] flex items-center justify-between px-4 pt-4">
        <span
          className="text-[10px] font-display font-bold tracking-widest uppercase"
          style={{
            color: rarity.hex,
            textShadow: `0 0 8px ${rarity.hex}`,
          }}
        >
          {rarity.label}
        </span>
        {card.isNew && (
          <span
            className="text-[9px] font-display font-bold px-2 py-0.5 rounded uppercase tracking-widest text-cyan-300 border border-cyan-400/60 bg-cyan-400/10"
            style={{ animation: 'new-badge-pulse 2s infinite' }}
          >
            NEW
          </span>
        )}
      </div>

      {/* Coin icon / ticker circle */}
      <div className="relative z-[2] flex flex-col items-center pt-4 pb-3">
        <div className="relative">
          {/* halo */}
          <div
            className="absolute inset-0 rounded-full blur-xl"
            style={{ background: rarity.hex, opacity: 0.35, transform: 'scale(1.3)' }}
          />
          <div
            className="relative w-20 h-20 rounded-full flex items-center justify-center font-display font-bold text-white text-sm"
            style={{
              background: `radial-gradient(circle at 35% 25%, ${card.color}ee, ${card.color}66 70%)`,
              border: `2px solid ${rarity.hex}`,
              boxShadow: `inset 0 2px 12px rgba(255,255,255,0.25), 0 0 16px ${rarity.hex}77`,
            }}
          >
            {/* inner gloss */}
            <div
              className="absolute top-1 left-2 right-2 h-3 rounded-full opacity-60"
              style={{
                background: 'linear-gradient(to bottom, rgba(255,255,255,0.7), transparent)',
              }}
            />
            <span className="font-mono-data text-lg tracking-tight drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)]">
              {card.ticker}
            </span>
          </div>
          {/* Lightning decoration */}
          {showLightning && (
            <Zap
              size={18}
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

        <div className="mt-2 flex items-center gap-2">
          <span className="font-display font-bold text-white text-sm uppercase">{card.name}</span>
        </div>
        <span
          className="mt-1 text-[9px] font-display font-bold px-2 py-0.5 rounded uppercase tracking-widest text-gray-300 border border-white/15 bg-white/5"
        >
          {card.type}
        </span>
      </div>

      {/* Progress bar */}
      <div className="relative z-[2] px-4 pb-2">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[9px] font-display font-bold uppercase tracking-widest text-gray-400">
            до апгрейда
          </span>
          <span className="font-mono-data text-[11px] font-bold" style={{ color: rarity.hex }}>
            {card.progress}/{card.target}
          </span>
        </div>
        <div className="relative w-full h-2 rounded-full bg-black/60 border border-white/10 overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 rounded-full shimmer"
            style={{
              width: `${progressPct}%`,
              background: `linear-gradient(90deg, ${rarity.hex}80, ${rarity.hex})`,
              boxShadow: `0 0 10px ${rarity.hex}`,
            }}
          />
          {/* glowing tip */}
          <div
            className="absolute top-0 bottom-0 w-[3px] bg-white"
            style={{
              left: `calc(${progressPct}% - 1px)`,
              boxShadow: `0 0 8px #fff, 0 0 14px ${rarity.hex}`,
              opacity: progressPct > 0 ? 1 : 0,
            }}
          />
        </div>
      </div>

      {/* Price */}
      <div className="relative z-[2] px-4 py-2 flex items-baseline justify-between">
        <span className="text-[10px] text-gray-400 uppercase tracking-widest font-display font-semibold">
          Цена
        </span>
        <div className="font-mono-data text-lg font-bold" style={{ color: rarity.hex }}>
          {card.price.toFixed(2)}
          <span className="text-gray-500 text-xs ml-1">MOVE</span>
        </div>
      </div>

      {/* Actions */}
      <div className="relative z-[2] grid grid-cols-2 gap-2 p-3 mt-auto">
        <button
          data-testid={`sell-card-${card.ticker}`}
          onClick={() => onSell?.(card)}
          className="btn-tactile btn-tactile-ghost text-xs py-2 flex items-center justify-center gap-1.5"
        >
          <DollarSign size={14} /> Продать
        </button>
        <button
          data-testid={`send-card-${card.ticker}`}
          onClick={() => onSend?.(card)}
          className="btn-tactile btn-tactile-cyan text-xs py-2 flex items-center justify-center gap-1.5"
        >
          <Send size={14} /> Отправить
        </button>
      </div>
    </motion.div>
  );
};

export default CryptoCard;
