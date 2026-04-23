import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, X, Sparkles } from 'lucide-react';
import Particles from './Particles';
import { RARITY_STYLES, CARDS } from '../data/cards';

/**
 * Picks a card based on the chest drop rates.
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

const STAGES = {
  IDLE: 'idle',
  SHAKE: 'shake',
  FLASH: 'flash',
  REVEAL: 'reveal',
};

const ChestOpenModal = ({ chest, onClose }) => {
  const [stage, setStage] = useState(STAGES.SHAKE);
  const reward = useMemo(() => (chest ? pickRevealCard(chest) : null), [chest]);
  const rarity = reward ? RARITY_STYLES[reward.rarity] : null;

  useEffect(() => {
    if (!chest) return;
    setStage(STAGES.SHAKE);
    const t1 = setTimeout(() => setStage(STAGES.FLASH), 1600);
    const t2 = setTimeout(() => setStage(STAGES.REVEAL), 2100);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [chest]);

  if (!chest) return null;
  const chestRarity = RARITY_STYLES[chest.rarity];

  return (
    <AnimatePresence>
      <motion.div
        data-testid="chest-open-modal"
        className="fixed inset-0 z-[100] flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

        {/* Radial explosion bg */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${
              (stage === STAGES.REVEAL ? rarity?.hex : chestRarity.hex) || '#00F0FF'
            }40 0%, transparent 60%)`,
          }}
        />

        {/* Close button */}
        <button
          data-testid="close-chest-modal"
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full glass-light flex items-center justify-center text-white hover:text-cyan-400 z-10"
        >
          <X size={20} />
        </button>

        {/* Flash */}
        {stage === STAGES.FLASH && (
          <div
            className="absolute inset-0 bg-white pointer-events-none"
            style={{ animation: 'screen-flash 0.5s ease-out forwards' }}
          />
        )}

        {/* Chest shake stage */}
        {(stage === STAGES.SHAKE || stage === STAGES.FLASH) && (
          <div className="relative z-[2] flex flex-col items-center">
            <Particles count={30} color={chestRarity.hex} />
            <motion.div
              animate={
                stage === STAGES.SHAKE
                  ? { x: [0, -10, 10, -10, 10, 0], y: [0, -4, 0, -4, 0], rotate: [0, -3, 3, -3, 0] }
                  : { scale: [1, 1.4] }
              }
              transition={{
                duration: stage === STAGES.SHAKE ? 1.6 : 0.4,
                repeat: stage === STAGES.SHAKE ? Infinity : 0,
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

        {/* Reveal stage */}
        {stage === STAGES.REVEAL && reward && (
          <motion.div
            initial={{ scale: 0.4, opacity: 0, rotateY: -60 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            transition={{ type: 'spring', stiffness: 180, damping: 18 }}
            className="relative z-[2] flex flex-col items-center max-w-sm w-full px-6"
          >
            <Particles count={40} color={rarity.hex} />
            <div className="font-display text-sm uppercase tracking-[0.3em] text-gray-400 mb-2">
              Вам выпала карта
            </div>

            <div
              data-testid="reveal-card"
              className={`relative w-72 rounded-2xl overflow-hidden glass ${rarity.className}`}
              style={{
                boxShadow: `0 0 60px ${rarity.hex}, inset 0 0 30px ${rarity.hex}55`,
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
              <div className="relative p-6 text-center">
                <span
                  className="text-xs font-display font-bold tracking-widest uppercase"
                  style={{ color: rarity.hex, textShadow: `0 0 10px ${rarity.hex}` }}
                >
                  {rarity.label}
                </span>
                <div className="relative my-6 flex justify-center">
                  <div
                    className="absolute inset-0 rounded-full blur-2xl"
                    style={{ background: rarity.hex, opacity: 0.6 }}
                  />
                  <div
                    className="relative w-32 h-32 rounded-full flex items-center justify-center font-mono-data text-2xl font-bold"
                    style={{
                      background: `radial-gradient(circle at 35% 25%, ${reward.color}ee, ${reward.color}66 70%)`,
                      border: `3px solid ${rarity.hex}`,
                      boxShadow: `0 0 30px ${rarity.hex}, inset 0 4px 20px rgba(255,255,255,0.3)`,
                    }}
                  >
                    {reward.ticker}
                    <Zap
                      size={22}
                      className="absolute -top-2 -right-2"
                      style={{ color: rarity.hex, fill: '#fff', filter: `drop-shadow(0 0 8px ${rarity.hex})` }}
                    />
                  </div>
                </div>
                <div className="font-display text-2xl font-bold uppercase text-white">
                  {reward.name}
                </div>
                <div className="font-display text-xs uppercase text-gray-400 tracking-widest mt-1">
                  {reward.type}
                </div>
                <div className="font-mono-data text-xl font-bold mt-4" style={{ color: rarity.hex }}>
                  {reward.price.toFixed(2)} <span className="text-gray-500 text-xs">MOVE</span>
                </div>
              </div>
            </div>

            <button
              data-testid="collect-reward"
              onClick={onClose}
              className="btn-tactile btn-tactile-cyan mt-8 px-10"
            >
              Забрать
            </button>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default ChestOpenModal;
