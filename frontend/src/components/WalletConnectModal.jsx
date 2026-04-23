import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Loader2, Shield, ExternalLink } from 'lucide-react';

/**
 * Wallet icons rendered as pure SVG with brand-ish colors.
 */
const walletIcons = {
  metamask: (
    <svg viewBox="0 0 40 40" width="34" height="34">
      <path d="M33 6 22.5 14l2-5L33 6z" fill="#E17726" />
      <path d="M7 6l10.4 8.1L15.5 9 7 6z" fill="#E27625" />
      <path d="M28.5 26l-3 4.6 6.4 1.8 1.8-6.3-5.2-.1z" fill="#E27625" />
      <path d="M6.3 26l1.8 6.4 6.4-1.8-3-4.6-5.2 0z" fill="#E27625" />
      <path d="M14.2 18l-1.8 2.7 6.3.3-.2-6.8-4.3 3.8z" fill="#E27625" />
      <path d="M25.8 18l-4.4-3.9-.2 6.9 6.4-.3-1.8-2.7z" fill="#E27625" />
      <path d="M14.5 30.6l3.8-1.9-3.3-2.6-.5 4.5zM21.7 28.7l3.8 1.9-.5-4.5-3.3 2.6z" fill="#D5BFB2" />
      <path d="M25.5 30.6l-3.8-1.9.3 2.5v1l3.5-1.6zM14.5 30.6l3.5 1.6v-1l.3-2.5-3.8 1.9z" fill="#233447" />
    </svg>
  ),
  walletconnect: (
    <svg viewBox="0 0 40 40" width="34" height="34">
      <rect width="40" height="40" rx="10" fill="#3B99FC" />
      <path
        d="M12 17.5c4.4-4.3 11.6-4.3 16 0l.5.5c.2.2.2.6 0 .8L26.7 21c-.1.1-.3.1-.4 0l-.7-.7c-3.1-3-8-3-11.1 0l-.8.7c-.1.1-.3.1-.4 0l-1.8-2.2c-.2-.2-.2-.6 0-.8l.5-.5zm19.8 3.7l1.6 1.6c.2.2.2.6 0 .8l-7.2 7c-.2.2-.6.2-.8 0l-5.1-5c-.1-.1-.1-.1-.3 0l-5.1 5c-.2.2-.6.2-.8 0l-7.2-7c-.2-.2-.2-.6 0-.8l1.6-1.6c.2-.2.6-.2.8 0l5.1 5c.1.1.1.1.3 0l5.1-5c.2-.2.6-.2.8 0l5.1 5c.1.1.1.1.3 0l5.1-5c.3-.2.6-.2.8 0z"
        fill="#fff"
      />
    </svg>
  ),
  phantom: (
    <svg viewBox="0 0 40 40" width="34" height="34">
      <rect width="40" height="40" rx="10" fill="#AB9FF2" />
      <path
        d="M32 19.2c0 7-6.3 11.6-11.7 11.6-3.2 0-5.1-1.4-5.9-2.4-.5-.6-1.6-.1-1.4.6.4 1.4 1.9 3.7 6.9 3.7 3.1 0 6.2-1.2 8.3-3.1-1.2 1.5-3.8 3.5-7.9 3.5-5.8 0-11.3-4.4-11.3-12.1C9 13.2 14.4 8 20.5 8s11.5 5.2 11.5 11.2z"
        fill="#fff"
      />
      <circle cx="16" cy="19" r="2.2" fill="#AB9FF2" />
      <circle cx="25" cy="19" r="2.2" fill="#AB9FF2" />
    </svg>
  ),
  coinbase: (
    <svg viewBox="0 0 40 40" width="34" height="34">
      <rect width="40" height="40" rx="10" fill="#0052FF" />
      <circle cx="20" cy="20" r="10" fill="none" stroke="#fff" strokeWidth="2" />
      <rect x="16" y="16" width="8" height="8" rx="1.5" fill="#fff" />
    </svg>
  ),
  trust: (
    <svg viewBox="0 0 40 40" width="34" height="34">
      <rect width="40" height="40" rx="10" fill="#3375BB" />
      <path d="M20 9l9 3v8c0 6-4.5 9.8-9 11-4.5-1.2-9-5-9-11v-8l9-3z" fill="#fff" />
      <path d="M20 12v18c3.5-1.2 7-4.3 7-10v-5.9L20 12z" fill="#3375BB" />
    </svg>
  ),
  okx: (
    <svg viewBox="0 0 40 40" width="34" height="34">
      <rect width="40" height="40" rx="10" fill="#000" />
      <rect x="8" y="8" width="8" height="8" fill="#fff" />
      <rect x="24" y="8" width="8" height="8" fill="#fff" />
      <rect x="16" y="16" width="8" height="8" fill="#fff" />
      <rect x="8" y="24" width="8" height="8" fill="#fff" />
      <rect x="24" y="24" width="8" height="8" fill="#fff" />
    </svg>
  ),
  binance: (
    <svg viewBox="0 0 40 40" width="34" height="34">
      <rect width="40" height="40" rx="10" fill="#F3BA2F" />
      <path
        d="M14.5 20l-2.5 2.5L9.5 20l2.5-2.5 2.5 2.5zM20 14.5l5 5-2.5 2.5L20 19.5l-2.5 2.5-2.5-2.5 5-5zM20 25.5l-5-5 2.5-2.5 2.5 2.5 2.5-2.5 2.5 2.5-5 5zM28 20l-2.5 2.5-2.5-2.5 2.5-2.5L28 20zM22.5 20L20 22.5 17.5 20l2.5-2.5L22.5 20z"
        fill="#fff"
      />
    </svg>
  ),
};

const WALLETS = [
  { id: 'metamask', name: 'MetaMask', subtitle: 'Популярный · Браузерное расширение', featured: true },
  { id: 'walletconnect', name: 'WalletConnect', subtitle: 'Сканируйте QR-код через мобильный' },
  { id: 'phantom', name: 'Phantom', subtitle: 'Solana · Multichain' },
  { id: 'coinbase', name: 'Coinbase Wallet', subtitle: 'Self-custody кошелёк' },
  { id: 'trust', name: 'Trust Wallet', subtitle: 'Mobile · Multichain' },
  { id: 'okx', name: 'OKX Wallet', subtitle: 'Биржевой кошелёк' },
  { id: 'binance', name: 'Binance Web3', subtitle: 'MPC · Gasless' },
];

const randomAddress = () => {
  const chars = 'abcdef0123456789';
  let a = '0x';
  for (let i = 0; i < 40; i++) a += chars[Math.floor(Math.random() * chars.length)];
  return a;
};

const WalletConnectModal = ({ open, onClose, onConnected }) => {
  const [stage, setStage] = useState('list'); // list | connecting | success | error
  const [wallet, setWallet] = useState(null);

  const handleConnect = (w) => {
    setWallet(w);
    setStage('connecting');
    // mocked connection: 1.6s loader, 90% success
    setTimeout(() => {
      if (Math.random() > 0.1) {
        const address = randomAddress();
        setStage('success');
        setTimeout(() => {
          onConnected?.({ wallet: w, address, balance: 4.28 });
          reset();
        }, 1200);
      } else {
        setStage('error');
      }
    }, 1600);
  };

  const reset = () => {
    setStage('list');
    setWallet(null);
  };

  const handleClose = () => {
    reset();
    onClose?.();
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        data-testid="wallet-connect-modal"
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/75 backdrop-blur-md"
          onClick={handleClose}
        />

        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          className="relative w-full max-w-md glass rounded-2xl overflow-hidden"
          style={{
            border: '1px solid rgba(0,240,255,0.3)',
            boxShadow: '0 0 50px rgba(0,240,255,0.25), inset 0 1px 0 rgba(255,255,255,0.08)',
          }}
        >
          {/* Decorative gradient top */}
          <div
            className="absolute inset-x-0 top-0 h-24 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(0,240,255,0.25), transparent 70%)',
            }}
          />

          {/* Close */}
          <button
            data-testid="wallet-modal-close"
            onClick={handleClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full glass-light flex items-center justify-center text-gray-400 hover:text-white z-10 transition"
          >
            <X size={18} />
          </button>

          {/* Header */}
          <div className="relative px-6 pt-6 pb-4">
            <div className="flex items-center gap-2 mb-1">
              <Shield size={14} className="text-cyan-400" />
              <span className="font-display text-[10px] uppercase tracking-widest text-cyan-400">
                Безопасное подключение
              </span>
            </div>
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-white">
              {stage === 'list' && 'Подключить кошелёк'}
              {stage === 'connecting' && 'Подключение...'}
              {stage === 'success' && 'Успешно!'}
              {stage === 'error' && 'Ошибка подключения'}
            </h2>
            {stage === 'list' && (
              <p className="text-xs text-gray-400 mt-1">
                Выберите провайдера, чтобы войти в экосистему MoveInvestor.
              </p>
            )}
          </div>

          {/* Body */}
          <div className="relative px-3 pb-3 min-h-[320px]">
            {stage === 'list' && (
              <div className="space-y-1.5 max-h-[420px] overflow-y-auto no-scrollbar px-3">
                {WALLETS.map((w) => (
                  <button
                    key={w.id}
                    data-testid={`wallet-option-${w.id}`}
                    onClick={() => handleConnect(w)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl glass-light hover:border-cyan-400/50 border border-transparent transition-all group"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                  >
                    <div className="flex-shrink-0">{walletIcons[w.id]}</div>
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2">
                        <span className="font-display font-bold text-white text-sm uppercase tracking-wide">
                          {w.name}
                        </span>
                        {w.featured && (
                          <span className="text-[9px] font-display font-bold px-1.5 py-0.5 rounded text-cyan-400 border border-cyan-400/50 bg-cyan-400/10 uppercase tracking-widest">
                            Популярный
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-gray-400 mt-0.5">{w.subtitle}</div>
                    </div>
                    <div className="text-gray-500 group-hover:text-cyan-400 transition">
                      <ExternalLink size={14} />
                    </div>
                  </button>
                ))}
              </div>
            )}

            {stage === 'connecting' && wallet && (
              <div className="flex flex-col items-center justify-center py-10 px-6">
                <div className="relative">
                  <div
                    className="absolute inset-0 rounded-full blur-xl"
                    style={{ background: '#00F0FF', opacity: 0.5, transform: 'scale(1.5)' }}
                  />
                  <div
                    className="relative w-20 h-20 rounded-2xl glass-light flex items-center justify-center"
                    style={{ border: '1px solid rgba(0,240,255,0.4)' }}
                  >
                    {walletIcons[wallet.id]}
                  </div>
                  <motion.div
                    className="absolute -inset-2 rounded-2xl border-2 border-cyan-400"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    style={{
                      borderRadius: '16px',
                      borderRightColor: 'transparent',
                      borderBottomColor: 'transparent',
                    }}
                  />
                </div>
                <div className="mt-6 font-display text-lg uppercase tracking-widest text-white">
                  {wallet.name}
                </div>
                <div className="mt-2 flex items-center gap-2 text-xs text-gray-400">
                  <Loader2 size={12} className="animate-spin" />
                  <span>Подтвердите подключение в кошельке...</span>
                </div>
                <button
                  onClick={reset}
                  data-testid="wallet-connect-cancel"
                  className="mt-6 text-xs text-gray-500 hover:text-white transition font-display uppercase tracking-widest"
                >
                  Отмена
                </button>
              </div>
            )}

            {stage === 'success' && wallet && (
              <div className="flex flex-col items-center justify-center py-10 px-6">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 14 }}
                  className="relative w-20 h-20 rounded-full flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #00F0FF, #00c2d4)',
                    boxShadow: '0 0 40px rgba(0,240,255,0.8)',
                  }}
                >
                  <Check size={44} className="text-black" strokeWidth={4} />
                </motion.div>
                <div className="mt-6 font-display text-lg uppercase tracking-widest text-white">
                  Добро пожаловать!
                </div>
                <div className="mt-2 text-xs text-gray-400">Кошелёк {wallet.name} подключён</div>
              </div>
            )}

            {stage === 'error' && (
              <div className="flex flex-col items-center justify-center py-10 px-6">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={{
                    background: 'rgba(255, 80, 80, 0.15)',
                    border: '2px solid rgba(255, 80, 80, 0.6)',
                  }}
                >
                  <X size={44} className="text-red-400" strokeWidth={3} />
                </div>
                <div className="mt-6 font-display text-lg uppercase tracking-widest text-white">
                  Не удалось подключиться
                </div>
                <div className="mt-2 text-xs text-gray-400 text-center max-w-xs">
                  Пользователь отклонил запрос или кошелёк не отвечает. Попробуйте ещё раз.
                </div>
                <button
                  onClick={reset}
                  data-testid="wallet-connect-retry"
                  className="btn-tactile btn-tactile-cyan mt-6 text-xs px-8"
                >
                  Повторить
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          {stage === 'list' && (
            <div className="relative px-6 py-3 border-t border-white/5 text-center">
              <p className="text-[10px] text-gray-500">
                Новичок в крипте?{' '}
                <span className="text-cyan-400 hover:underline cursor-pointer">Создать кошелёк</span>
              </p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default WalletConnectModal;
