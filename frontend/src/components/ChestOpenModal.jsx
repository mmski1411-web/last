import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, X, Sparkles, Coins, Info } from 'lucide-react';
import Particles from './Particles';
import { RARITY_STYLES, CARDS } from '../data/cards';

/**
 * Pick a single reward card based on chest drop rates.
 */
const pickRevealCard = (chest) => {
  const roll = Math.random() * 100;
  let cum = 0;
  let pickedRarity = chest.dropRates[0].rarity;
  for (const r of chest.dropRates) {
    cum += r.percent;
    if (roll <= cum) {
      pickedRarity = r.rarity;
      break;
    }
  }
  const pool = CARDS.filter((c) => c.rarity === pickedRarity);
  return pool[Math.floor(Math.random() * pool.length)] || CARDS[0];
};

const AMOUNTS = [
  { count: 1, label: 'x1', discount: 0 },
  { count: 5, label: 'x5', discount: 0.05 },
  { count: 10, label: 'x10', discount: 0.1 },
];

const STAGE = {
  PREVIEW: 'preview',
  OPENING: 'opening',
  FLASH: 'flash',
  REVEAL: 'reveal',
};

/**
 * Chest glyph used on the preview — matches Lootbox3D's visual.
 */
const ChestGlyph = ({ type, color }) => {
  const common = (
    <>
      <rect x="18" y="44" width="84" height="58" rx="10" fill="url(#body2)" stroke={color} strokeWidth="2" />
      <rect x="18" y="44" width="84" height="14" rx="6" fill="rgba(255,255,255,0.08)" />
      <path d="M14 50 Q60 14 106 50 L106 58 L14 58 Z" fill="url(#lid2)" stroke={color} strokeWidth="2" />
      <circle cx="60" cy="70" r="9" fill={color} opacity="0.85" />
      <rect x="56" y="70" width="8" height="14" rx="2" fill="#000" opacity="0.6" />
    </>
  );
  const decor = {
    hamster: (
      <>
        <circle cx="40" cy="38" r="8" fill={color} opacity="0.9" />
        <circle cx="80" cy="38" r="8" fill={color} opacity="0.9" />
      </>
    ),
    bear: (
      <>
        <circle cx="28" cy="30" r="10" fill={color} />
        <circle cx="92" cy="30" r="10" fill={color} />
        <path d="M52 86 L60 66 L68 86" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </>
    ),
    bull: (
      <>
        <path d="M20 36 Q10 10 38 14 Q40 24 30 30" fill={color} opacity="0.95" />
        <path d="M100 36 Q110 10 82 14 Q80 24 90 30" fill={color} opacity="0.95" />
        <circle cx="60" cy="80" r="10" fill="none" stroke={color} strokeWidth="3" />
      </>
    ),
  };
  return (
    <g>
      {common}
      {decor[type] || decor.hamster}
    </g>
  );
};

const RewardCard = ({ reward, rarity, delay = 0, size = 'lg' }) => {
  const isSmall = size === 'sm';
  return (
    <motion.div
      initial={{ scale: 0.3, opacity: 0, rotateY: -60 }}
      animate={{ scale: 1, opacity: 1, rotateY: 0 }}
      transition={{ type: 'spring', stiffness: 180, damping: 18, delay }}
      data-testid={`reward-card-${reward.ticker}`}
      className={`relative rounded-xl overflow-hidden glass ${rarity.className} flex flex-col`}
      style={{
        width: isSmall ? 140 : 240,
        boxShadow: `0 0 ${isSmall ? 25 : 50}px ${rarity.hex}, inset 0 0 ${isSmall ? 15 : 25}px ${rarity.hex}55`,
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-80"
        style={{
          background: `linear-gradient(115deg, transparent 30%, ${rarity.hex}99 50%, transparent 70%)`,
          backgroundSize: '200% 100%',
          animation: 'lightning-sweep 2s linear infinite',
          mixBlendMode: 'screen',
        }}
      />
      <div className={`relative ${isSmall ? 'p-3' : 'p-5'} text-center flex flex-col items-center`}>
        <span
          className={`font-display font-bold tracking-widest uppercase ${isSmall ? 'text-[9px]' : 'text-xs'}`}
          style={{ color: rarity.hex, textShadow: `0 0 10px ${rarity.hex}` }}
        >
          {rarity.label}
        </span>
        <div className="relative my-3">
          <div
            className="absolute inset-0 rounded-full blur-xl"
            style={{ background: rarity.hex, opacity: 0.5 }}
          />
          <div
            className={`relative ${isSmall ? 'w-16 h-16 text-sm' : 'w-24 h-24 text-lg'} rounded-full flex items-center justify-center font-mono-data font-bold`}
            style={{
              background: `radial-gradient(circle at 35% 25%, ${reward.color}ee, ${reward.color}66 70%)`,
              border: `2px solid ${rarity.hex}`,
              boxShadow: `0 0 20px ${rarity.hex}, inset 0 4px 14px rgba(255,255,255,0.3)`,
            }}
          >
            {reward.ticker}
            <Zap
              size={isSmall ? 12 : 18}
              className="absolute -top-1 -right-1"
              style={{ color: rarity.hex, fill: '#fff', filter: `drop-shadow(0 0 6px ${rarity.hex})` }}
            />
          </div>
        </div>
        <div className={`font-display font-bold uppercase text-white ${isSmall ? 'text-xs' : 'text-lg'}`}>
          {reward.name}
        </div>
        <div className={`font-mono-data font-bold mt-1 ${isSmall ? 'text-xs' : 'text-base'}`} style={{ color: rarity.hex }}>
          {reward.price.toFixed(2)} <span className="text-gray-500 text-[10px]">MOVE</span>
        </div>
      </div>
    </motion.div>
  );
};

const ChestOpenModal = ({ chest, onClose }) => {
  const [stage, setStage] = useState(STAGE.PREVIEW);
  const [amount, setAmount] = useState(1);
  const [rewards, setRewards] = useState([]);

  useEffect(() => {
    if (!chest) return;
    setStage(STAGE.PREVIEW);
    setAmount(1);
    setRewards([]);
  }, [chest]);

  if (!chest) return null;
  const chestRarity = RARITY_STYLES[chest.rarity];

  const totalPrice = (chest.price * amount * (1 - (AMOUNTS.find((a) => a.count === amount)?.discount || 0))).toFixed(2);
  const selectedAmount = AMOUNTS.find((a) => a.count === amount);

  const handleOpen = () => {
    // Pre-calc rewards, then play animation
    const picks = Array.from({ length: amount }, () => pickRevealCard(chest));
    setRewards(picks);
    setStage(STAGE.OPENING);
    setTimeout(() => setStage(STAGE.FLASH), 1700);
    setTimeout(() => setStage(STAGE.REVEAL), 2150);
  };

  return (
    <AnimatePresence>
      <motion.div
        data-testid="chest-open-modal"
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />

        {/* Radial explosion bg */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${chestRarity.hex}33 0%, transparent 60%)`,
          }}
        />

        {/* Close */}
        <button
          data-testid="close-chest-modal"
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full glass-light flex items-center justify-center text-white hover:text-cyan-400 z-10 transition"
        >
          <X size={20} />
        </button>

        {/* Flash overlay */}
        {stage === STAGE.FLASH && (
          <div
            className="absolute inset-0 bg-white pointer-events-none"
            style={{ animation: 'screen-flash 0.5s ease-out forwards' }}
          />
        )}

        {/* ===== PREVIEW STAGE ===== */}
        {stage === STAGE.PREVIEW && (
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            className={`relative w-full max-w-md glass rounded-2xl overflow-hidden my-auto ${chestRarity.className}`}
            style={{
              boxShadow: `0 0 50px ${chestRarity.hex}66, inset 0 1px 0 rgba(255,255,255,0.08)`,
            }}
          >
            {/* Aura */}
            <div
              className="absolute inset-x-0 top-0 h-40 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at center, ${chestRarity.hex}55, transparent 70%)`,
              }}
            />

            {/* Chest preview with particles */}
            <div
              className="relative flex items-center justify-center pt-10 pb-4"
              style={{ minHeight: 220 }}
            >
              <Particles count={18} color={chestRarity.hex} />
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [-2, 2, -2] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  filter: `drop-shadow(0 10px 24px ${chestRarity.hex}AA) drop-shadow(0 0 18px ${chestRarity.hex}CC)`,
                }}
              >
                <svg width="180" height="180" viewBox="0 0 120 120">
                  <defs>
                    <linearGradient id="body2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#141722" />
                      <stop offset="1" stopColor="#05070c" />
                    </linearGradient>
                    <linearGradient id="lid2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#1f2430" />
                      <stop offset="1" stopColor="#0a0d14" />
                    </linearGradient>
                  </defs>
                  <ChestGlyph type={chest.id} color={chestRarity.hex} />
                </svg>
              </motion.div>
            </div>

            {/* Title */}
            <div className="relative px-6 text-center">
              <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-white">
                {chest.name}
              </h2>
              <div className="mt-1 flex items-center justify-center gap-2">
                <span
                  className="text-[10px] font-display font-bold px-2 py-0.5 rounded uppercase tracking-widest"
                  style={{
                    color: chestRarity.hex,
                    border: `1px solid ${chestRarity.hex}`,
                    background: `${chestRarity.hex}15`,
                  }}
                >
                  {chest.subtitle}
                </span>
                <span className="text-xs text-gray-400">{chest.description}</span>
              </div>
            </div>

            {/* Drop rates table */}
            <div className="relative px-6 mt-5">
              <div className="flex items-center gap-1.5 mb-2">
                <Info size={12} className="text-cyan-400" />
                <span className="font-display text-[10px] uppercase tracking-widest text-cyan-400">
                  Шансы выпадения
                </span>
              </div>
              <div className="space-y-1.5 glass-light rounded-lg p-3">
                {chest.dropRates.map((r) => {
                  const rs = RARITY_STYLES[r.rarity];
                  return (
                    <div key={r.rarity} className="flex items-center gap-3" data-testid={`drop-rate-${r.rarity}`}>
                      <span
                        className="font-display text-[10px] font-bold uppercase tracking-widest w-20"
                        style={{ color: rs.hex }}
                      >
                        {rs.label}
                      </span>
                      <div className="flex-1 h-2 rounded-full bg-black/50 overflow-hidden border border-white/5">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${r.percent}%`,
                            background: rs.hex,
                            boxShadow: `0 0 8px ${rs.hex}`,
                          }}
                        />
                      </div>
                      <span className="font-mono-data text-xs font-bold text-white w-10 text-right">
                        {r.percent}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Amount selector */}
            <div className="relative px-6 mt-5">
              <div className="font-display text-[10px] uppercase tracking-widest text-gray-400 mb-2">
                Сколько открыть
              </div>
              <div className="grid grid-cols-3 gap-2">
                {AMOUNTS.map((a) => {
                  const active = amount === a.count;
                  return (
                    <button
                      key={a.count}
                      data-testid={`amount-${a.count}`}
                      onClick={() => setAmount(a.count)}
                      className="relative py-3 rounded-lg font-display font-bold uppercase tracking-widest text-sm transition-all"
                      style={{
                        color: active ? '#000' : chestRarity.hex,
                        background: active
                          ? `linear-gradient(to bottom, ${chestRarity.hex}ee, ${chestRarity.hex}aa)`
                          : `${chestRarity.hex}10`,
                        border: `1px solid ${chestRarity.hex}${active ? 'ff' : '55'}`,
                        boxShadow: active ? `0 0 18px ${chestRarity.hex}88, inset 0 1px 0 rgba(255,255,255,0.4)` : 'none',
                      }}
                    >
                      {a.label}
                      {a.discount > 0 && (
                        <span
                          className="absolute -top-2 -right-1 text-[9px] font-mono-data font-bold px-1.5 py-0.5 rounded"
                          style={{
                            background: '#FFD700',
                            color: '#000',
                            boxShadow: '0 0 8px rgba(255,215,0,0.6)',
                          }}
                        >
                          -{Math.round(a.discount * 100)}%
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price + open */}
            <div className="relative px-6 pt-5 pb-6 mt-4 border-t border-white/5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Coins size={14} className="text-yellow-400" />
                  <span className="font-display text-[10px] uppercase tracking-widest text-gray-400">
                    Итого
                  </span>
                </div>
                <div className="flex items-baseline gap-1">
                  {selectedAmount?.discount > 0 && (
                    <span className="text-xs font-mono-data text-gray-500 line-through">
                      {(chest.price * amount).toFixed(2)}
                    </span>
                  )}
                  <span className="font-mono-data text-2xl font-bold" style={{ color: chestRarity.hex }}>
                    {totalPrice}
                  </span>
                  <span className="text-xs text-gray-400 font-display">MOVE</span>
                </div>
              </div>
              <button
                data-testid="confirm-open-chest"
                onClick={handleOpen}
                className={`btn-tactile w-full ${
                  chest.rarity === 'legendary' || chest.rarity === 'epic'
                    ? 'btn-tactile-purple'
                    : 'btn-tactile-cyan'
                }`}
              >
                <Sparkles size={14} className="inline-block mr-2 -mt-1" />
                Открыть {selectedAmount?.label}
              </button>
            </div>
          </motion.div>
        )}

        {/* ===== OPENING + FLASH ===== */}
        {(stage === STAGE.OPENING || stage === STAGE.FLASH) && (
          <div className="relative z-[2] flex flex-col items-center">
            <Particles count={40} color={chestRarity.hex} />
            <motion.div
              animate={
                stage === STAGE.OPENING
                  ? { x: [0, -10, 10, -10, 10, 0], y: [0, -4, 0, -4, 0], rotate: [0, -3, 3, -3, 0] }
                  : { scale: [1, 1.5] }
              }
              transition={{
                duration: stage === STAGE.OPENING ? 1.7 : 0.4,
                repeat: stage === STAGE.OPENING ? Infinity : 0,
                ease: 'easeInOut',
              }}
            >
              <div
                className="w-48 h-48 rounded-2xl glass flex items-center justify-center"
                style={{
                  border: `2px solid ${chestRarity.hex}`,
                  boxShadow: `0 0 60px ${chestRarity.hex}, inset 0 0 40px ${chestRarity.hex}66`,
                }}
              >
                <Sparkles size={88} color={chestRarity.hex} />
              </div>
            </motion.div>
            <p className="mt-8 font-display text-2xl uppercase tracking-widest text-white">
              Открытие...
            </p>
          </div>
        )}

        {/* ===== REVEAL ===== */}
        {stage === STAGE.REVEAL && rewards.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-[2] flex flex-col items-center w-full max-w-4xl px-4 my-auto"
          >
            <Particles count={50} color={chestRarity.hex} />
            <div className="font-display text-sm uppercase tracking-[0.3em] text-gray-400 mb-5">
              {rewards.length === 1 ? 'Вам выпала карта' : `Вам выпало ${rewards.length} карт`}
            </div>

            {rewards.length === 1 ? (
              <RewardCard reward={rewards[0]} rarity={RARITY_STYLES[rewards[0].rarity]} size="lg" />
            ) : (
              <div
                className="grid gap-3 w-full max-h-[60vh] overflow-y-auto no-scrollbar justify-items-center"
                style={{
                  gridTemplateColumns:
                    rewards.length <= 5
                      ? `repeat(${rewards.length}, minmax(0, 1fr))`
                      : 'repeat(5, minmax(0, 1fr))',
                }}
                data-testid="rewards-grid"
              >
                {rewards.map((r, i) => (
                  <RewardCard
                    key={i}
                    reward={r}
                    rarity={RARITY_STYLES[r.rarity]}
                    delay={i * 0.12}
                    size="sm"
                  />
                ))}
              </div>
            )}

            <div className="flex items-center gap-3 mt-8">
              <button
                data-testid="open-more"
                onClick={() => setStage(STAGE.PREVIEW)}
                className="btn-tactile btn-tactile-ghost px-6"
              >
                Открыть ещё
              </button>
              <button
                data-testid="collect-reward"
                onClick={onClose}
                className="btn-tactile btn-tactile-cyan px-10"
              >
                Забрать
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default ChestOpenModal;
