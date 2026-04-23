import React, { useState } from 'react';
import { Wallet, ShoppingCart, TrendingUp, Trophy, BarChart3, Power, ChevronDown } from 'lucide-react';

const NAV = [
  { id: 'wallet', label: 'Кошелёк', icon: Wallet },
  { id: 'marketplace', label: 'Маркетплейс', icon: ShoppingCart, active: true },
  { id: 'investing', label: 'Инвестирование', icon: TrendingUp },
  { id: 'rating', label: 'Рейтинг', icon: BarChart3 },
  { id: 'leaderboard', label: 'Лидерборд', icon: Trophy },
];

const Header = ({ balance = 4.28 }) => {
  const [active, setActive] = useState('marketplace');
  const [lang, setLang] = useState('RU');

  return (
    <header
      className="sticky top-0 z-50 glass border-b border-white/5"
      data-testid="site-header"
    >
      <div className="max-w-[1440px] mx-auto flex items-center gap-6 px-4 md:px-8 py-3">
        {/* Logo */}
        <div className="flex items-center gap-2" data-testid="brand-logo">
          <div className="relative w-9 h-9 rounded-lg flex items-center justify-center font-display font-bold text-lg"
            style={{
              background: 'linear-gradient(135deg, #00F0FF, #B026FF)',
              boxShadow: '0 0 16px rgba(0,240,255,0.4), inset 0 1px 0 rgba(255,255,255,0.3)',
            }}>
            <span className="text-black drop-shadow">MI</span>
          </div>
          <div className="leading-tight">
            <div className="font-display text-lg font-bold tracking-wider text-white">MoveInvestor</div>
            <div className="text-[9px] font-mono-data tracking-widest text-gray-500 uppercase">Card Game v1.0</div>
          </div>
        </div>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-1 ml-4">
          {NAV.map((n) => {
            const Icon = n.icon;
            const isActive = active === n.id;
            return (
              <button
                key={n.id}
                data-testid={`nav-${n.id}`}
                onClick={() => setActive(n.id)}
                className={`font-display font-bold text-sm uppercase tracking-widest px-4 py-2 rounded-md transition-all flex items-center gap-2 ${
                  isActive
                    ? 'text-cyan-400 bg-cyan-400/10'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
                style={isActive ? { boxShadow: 'inset 0 -2px 0 #00F0FF' } : {}}
              >
                <Icon size={14} />
                {n.label}
              </button>
            );
          })}
        </nav>

        <div className="flex-1" />

        {/* Lang switcher */}
        <div className="hidden sm:flex items-center gap-1 text-xs font-display font-bold">
          {['RU', 'EN'].map((l) => (
            <button
              key={l}
              data-testid={`lang-${l}`}
              onClick={() => setLang(l)}
              className={`px-2 py-1 rounded transition-colors ${
                lang === l ? 'text-cyan-400 bg-cyan-400/10' : 'text-gray-500 hover:text-white'
              }`}
            >
              {l}
            </button>
          ))}
        </div>

        {/* TESTNET */}
        <span className="testnet-badge hidden md:inline-block" data-testid="testnet-badge">TESTNET</span>

        {/* Wallet balance */}
        <div
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-md glass-light"
          data-testid="wallet-balance"
        >
          <div className="w-6 h-6 rounded-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #00F0FF, #B026FF)' }}>
            <Wallet size={12} className="text-black" />
          </div>
          <span className="font-mono-data text-sm font-bold text-white">{balance.toFixed(2)}</span>
          <span className="text-xs text-gray-400 font-display">MOVE</span>
          <ChevronDown size={12} className="text-gray-500" />
        </div>

        {/* Disconnect */}
        <button
          data-testid="disconnect-btn"
          className="btn-tactile btn-tactile-ghost text-xs py-1.5 px-3 flex items-center gap-1.5"
        >
          <Power size={12} />
          <span className="hidden sm:inline">Отключить</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
