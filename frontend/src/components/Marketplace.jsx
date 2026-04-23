import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, Sparkles, Lock } from 'lucide-react';
import Header from './Header';
import StatsBento from './StatsBento';
import Lootbox3D from './Lootbox3D';
import CryptoCard from './CryptoCard';
import FilterTabs from './FilterTabs';
import ChestOpenModal from './ChestOpenModal';
import WalletConnectModal from './WalletConnectModal';
import { CARDS, LOOTBOXES } from '../data/cards';

const Marketplace = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeRarity, setActiveRarity] = useState('all');
  const [sort, setSort] = useState('default');
  const [openingChest, setOpeningChest] = useState(null);
  const [toast, setToast] = useState(null);
  const [walletOpen, setWalletOpen] = useState(false);
  const [connection, setConnection] = useState(null);

  const filtered = useMemo(() => {
    let list = CARDS.filter((c) => {
      const catOk = activeCategory === 'all' || c.category === activeCategory;
      const rarOk = activeRarity === 'all' || c.rarity === activeRarity;
      return catOk && rarOk;
    });
    if (sort === 'price_asc') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'price_desc') list = [...list].sort((a, b) => b.price - a.price);
    if (sort === 'rarity_desc') {
      const order = { legendary: 4, epic: 3, rare: 2, common: 1 };
      list = [...list].sort((a, b) => order[b.rarity] - order[a.rarity]);
    }
    return list;
  }, [activeCategory, activeRarity, sort]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  // Require connection for chest / buy interactions
  const requireWallet = () => {
    if (!connection) {
      setWalletOpen(true);
      return false;
    }
    return true;
  };

  const handleBuyChest = (c) => {
    if (!requireWallet()) return;
    showToast(`Добавлен в корзину: ${c.name}`);
  };
  const handleOpenChest = (c) => {
    if (!requireWallet()) return;
    setOpeningChest(c);
  };
  const handleSell = (c) => {
    if (!requireWallet()) return;
    showToast(`Выставлено на продажу: ${c.ticker}`);
  };
  const handleSend = (c) => {
    if (!requireWallet()) return;
    showToast(`Отправка ${c.ticker}`);
  };

  return (
    <div className="relative min-h-screen">
      <Header
        connection={connection}
        onConnect={() => setWalletOpen(true)}
        onDisconnect={() => {
          setConnection(null);
          showToast('Кошелёк отключён');
        }}
      />

      <main className="relative z-[2] max-w-[1440px] mx-auto px-4 md:px-8 py-8 md:py-10 space-y-10">
        {/* HERO */}
        <section className="space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 glass-light rounded-full px-3 py-1 mb-3">
                <Flame size={12} className="text-yellow-400" />
                <span className="font-display text-[10px] font-bold uppercase tracking-widest text-yellow-400">
                  Сезон 1 · Hot drop
                </span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white">
                Маркетплейс{' '}
                <span className="bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-yellow-400 text-transparent bg-clip-text">
                  MoveInvestor
                </span>
              </h1>
              <p className="mt-2 text-sm md:text-base text-gray-400 max-w-xl">
                Открывай сундуки, собирай криптомонеты, прокачивай свою коллекцию и торгуй на живом рынке.
              </p>
              {!connection && (
                <button
                  data-testid="hero-connect-btn"
                  onClick={() => setWalletOpen(true)}
                  className="btn-tactile btn-tactile-cyan mt-4 flex items-center gap-2"
                >
                  <Lock size={14} />
                  Подключить кошелёк для игры
                </button>
              )}
            </div>
            <StatsBento />
          </div>
        </section>

        {/* LOOTBOX STORE */}
        <section data-testid="lootbox-store" className="space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="text-cyan-400" size={22} />
              <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-wide text-white">
                Магазин сундуков
              </h2>
            </div>
            <div className="flex items-center gap-1.5 glass-light px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="font-display text-[10px] font-bold uppercase tracking-widest text-green-400">
                Drop rate live
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {LOOTBOXES.map((chest) => (
              <Lootbox3D
                key={chest.id}
                chest={chest}
                onBuy={handleBuyChest}
                onOpen={handleOpenChest}
              />
            ))}
          </div>
        </section>

        {/* FILTERS + GRID */}
        <section data-testid="card-marketplace" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-wide text-white">
              Криптомонеты
            </h2>
            <div className="font-mono-data text-xs text-gray-400">{filtered.length} карт</div>
          </div>
          <FilterTabs
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            activeRarity={activeRarity}
            onRarityChange={setActiveRarity}
            sort={sort}
            onSortChange={setSort}
          />
          <motion.div
            layout
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4"
            data-testid="cards-grid"
          >
            {filtered.map((card) => (
              <CryptoCard key={card.ticker} card={card} onSell={handleSell} onSend={handleSend} />
            ))}
            {filtered.length === 0 && (
              <div className="col-span-full py-16 text-center text-gray-500">
                <p className="font-display uppercase tracking-widest">Нет карт по выбранным фильтрам</p>
              </div>
            )}
          </motion.div>
        </section>

        <footer className="pt-10 pb-6 border-t border-white/5 text-center">
          <p className="font-display uppercase tracking-widest text-xs text-gray-600">
            MoveInvestor · Играй · Собирай · Прокачивай
          </p>
        </footer>
      </main>

      {toast && (
        <div
          data-testid="toast"
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[90] glass rounded-lg px-5 py-3 border border-cyan-400/40"
          style={{ boxShadow: '0 0 24px rgba(0,240,255,0.4)' }}
        >
          <span className="font-display uppercase tracking-widest text-sm text-white">{toast}</span>
        </div>
      )}

      {openingChest && (
        <ChestOpenModal chest={openingChest} onClose={() => setOpeningChest(null)} />
      )}

      <WalletConnectModal
        open={walletOpen}
        onClose={() => setWalletOpen(false)}
        onConnected={(data) => {
          setConnection(data);
          setWalletOpen(false);
          showToast(`Кошелёк ${data.wallet.name} подключён`);
        }}
      />
    </div>
  );
};

export default Marketplace;
