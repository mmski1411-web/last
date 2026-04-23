import React from 'react';
import { motion } from 'framer-motion';
import Particles from './Particles';
import { RARITY_STYLES } from '../data/cards';
import { Zap, TrendingUp } from 'lucide-react';

/**
 * Each chest has a unique icon/emoji-style glyph built in SVG to give a distinctive 3D look
 * without external assets.
 */
const ChestGlyph = ({ type, color }) => {
  // Hamster / Bear / Bull — a stylized face + coin
  const glyphs = {
    hamster: (
      <g>
        {/* chest body */}
        <rect x="18" y="44" width="84" height="58" rx="10" fill="url(#body)" stroke={color} strokeWidth="2" />
        <rect x="18" y="44" width="84" height="14" rx="6" fill="rgba(255,255,255,0.08)" />
        {/* lid */}
        <path d="M14 50 Q60 14 106 50 L106 58 L14 58 Z" fill="url(#lid)" stroke={color} strokeWidth="2" />
        {/* lock */}
        <circle cx="60" cy="70" r="9" fill={color} opacity="0.85" />
        <rect x="56" y="70" width="8" height="14" rx="2" fill="#000" opacity="0.6" />
        {/* hamster ears on top */}
        <circle cx="40" cy="38" r="8" fill={color} opacity="0.9" />
        <circle cx="80" cy="38" r="8" fill={color} opacity="0.9" />
        <circle cx="40" cy="38" r="3" fill="#000" opacity="0.5" />
        <circle cx="80" cy="38" r="3" fill="#000" opacity="0.5" />
      </g>
    ),
    bear: (
      <g>
        <rect x="16" y="42" width="88" height="62" rx="12" fill="url(#body)" stroke={color} strokeWidth="2.5" />
        <rect x="16" y="42" width="88" height="16" rx="6" fill="rgba(255,255,255,0.1)" />
        <path d="M12 48 Q60 10 108 48 L108 58 L12 58 Z" fill="url(#lid)" stroke={color} strokeWidth="2.5" />
        {/* bear claws */}
        <path d="M30 86 L40 70 L46 86" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M52 86 L60 66 L68 86" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M74 86 L82 70 L92 86" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        {/* bear ears */}
        <circle cx="28" cy="30" r="10" fill={color} />
        <circle cx="92" cy="30" r="10" fill={color} />
      </g>
    ),
    bull: (
      <g>
        <rect x="14" y="44" width="92" height="62" rx="14" fill="url(#body)" stroke={color} strokeWidth="3" />
        <rect x="14" y="44" width="92" height="16" rx="8" fill="rgba(255,255,255,0.12)" />
        <path d="M10 50 Q60 6 110 50 L110 58 L10 58 Z" fill="url(#lid)" stroke={color} strokeWidth="3" />
        {/* bull horns */}
        <path d="M20 36 Q10 10 38 14 Q40 24 30 30" fill={color} opacity="0.95" />
        <path d="M100 36 Q110 10 82 14 Q80 24 90 30" fill={color} opacity="0.95" />
        {/* bull nose ring */}
        <circle cx="60" cy="80" r="10" fill="none" stroke={color} strokeWidth="3" />
        <circle cx="60" cy="80" r="3" fill={color} />
      </g>
    ),
  };
  return glyphs[type] || glyphs.hamster;
};

const Lootbox3D = ({ chest, onBuy, onOpen }) => {
  const rarityHex = RARITY_STYLES[chest.rarity].hex;
  const glyphType = chest.id; // hamster | bear | bull

  return (
    <div
      data-testid={`lootbox-card-${chest.id}`}
      className={`relative rounded-2xl glass overflow-hidden hover-lift ${RARITY_STYLES[chest.rarity].className}`}
      style={{ minHeight: 420 }}
    >
      {/* Aura glow background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 38%, ${rarityHex}33 0%, transparent 55%)`,
        }}
      />
      {/* Grid lines decoration */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1), transparent 70%)',
        }}
      />

      <Particles count={20} color={rarityHex} />

      {/* Drop rate live pill */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest glass-light">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        <span className="text-cyan-300">Drop rate live</span>
      </div>

      {/* Owned pill */}
      <div className="absolute top-4 right-4 z-10 px-2.5 py-1 rounded-full text-[10px] font-bold glass-light text-white font-mono-data">
        x{chest.owned}
      </div>

      {/* 3D Chest */}
      <div className="relative flex items-center justify-center pt-20 pb-6 z-[2]" style={{ perspective: 800 }}>
        {/* Pulse halo behind chest */}
        <div
          className="absolute top-1/2 left-1/2 w-48 h-48 rounded-full blur-3xl"
          style={{
            transform: 'translate(-50%, -50%)',
            background: rarityHex,
            opacity: 0.35,
            animation: 'aura-pulse 3.2s ease-in-out infinite',
          }}
        />
        <motion.div
          animate={{ y: [0, -12, 0], rotate: [-2, 2, -2] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            filter: `drop-shadow(0 10px 24px ${rarityHex}AA) drop-shadow(0 0 18px ${rarityHex}CC)`,
          }}
        >
          <svg width="180" height="180" viewBox="0 0 120 120">
            <defs>
              <linearGradient id="body" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#141722" />
                <stop offset="1" stopColor="#05070c" />
              </linearGradient>
              <linearGradient id="lid" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#1f2430" />
                <stop offset="1" stopColor="#0a0d14" />
              </linearGradient>
            </defs>
            <ChestGlyph type={glyphType} color={rarityHex} />
          </svg>
        </motion.div>

        {/* Lightning bolts for epic/legendary */}
        {(chest.rarity === 'epic' || chest.rarity === 'legendary') && (
          <>
            <div
              className="absolute top-10 left-10 z-[3]"
              style={{ animation: 'lightning-bolt 2.6s ease-in-out infinite' }}
            >
              <Zap size={28} color="#fff" fill={rarityHex} />
            </div>
            <div
              className="absolute bottom-12 right-10 z-[3]"
              style={{ animation: 'lightning-bolt 2.6s ease-in-out 1.3s infinite' }}
            >
              <Zap size={22} color={rarityHex} fill="#fff" />
            </div>
          </>
        )}
      </div>

      {/* Info section */}
      <div className="relative z-[2] px-6 pb-6">
        <div className="flex items-baseline justify-between mb-1">
          <h3 className="font-display text-2xl font-bold text-white uppercase tracking-wide">
            {chest.name}
          </h3>
          <span
            className="text-[10px] font-display font-bold px-2 py-0.5 rounded uppercase tracking-widest"
            style={{
              color: rarityHex,
              border: `1px solid ${rarityHex}`,
              background: `${rarityHex}15`,
            }}
          >
            {chest.subtitle}
          </span>
        </div>
        <p className="text-xs text-gray-400 mb-4">{chest.description}</p>

        {/* Drop rates */}
        <div className="flex gap-1 mb-4 rounded-md overflow-hidden h-2 glass-light">
          {chest.dropRates.map((d) => (
            <div
              key={d.rarity}
              style={{
                width: `${d.percent}%`,
                background: RARITY_STYLES[d.rarity].hex,
                boxShadow: `0 0 6px ${RARITY_STYLES[d.rarity].hex}`,
              }}
              title={`${RARITY_STYLES[d.rarity].label} ${d.percent}%`}
            />
          ))}
        </div>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <TrendingUp size={14} className="text-cyan-400" />
            <span className="font-mono-data">
              {chest.dropRates.find((d) => d.rarity === 'legendary')?.percent || 0}% LEGENDARY
            </span>
          </div>
          <div className="font-mono-data text-xl font-bold text-white">
            <span style={{ color: rarityHex }}>{chest.price.toFixed(2)}</span>
            <span className="text-gray-500 text-sm ml-1">MOVE</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            data-testid={`buy-chest-${chest.id}`}
            onClick={() => onBuy?.(chest)}
            className="btn-tactile btn-tactile-ghost text-sm"
          >
            Купить
          </button>
          <button
            data-testid={`open-chest-${chest.id}`}
            onClick={() => onOpen?.(chest)}
            disabled={chest.owned === 0}
            className={`btn-tactile text-sm ${
              chest.rarity === 'legendary' || chest.rarity === 'epic'
                ? 'btn-tactile-purple'
                : 'btn-tactile-cyan'
            } ${chest.owned === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            + Открыть x1
          </button>
        </div>
      </div>
    </div>
  );
};

export default Lootbox3D;
