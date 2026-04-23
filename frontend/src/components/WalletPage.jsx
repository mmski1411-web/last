import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag,
  Package2,
  History,
  Copy,
  CheckCircle2,
  XCircle,
  Loader2,
  ArrowDownLeft,
  ArrowUpRight,
  Send as SendIcon,
  Gift,
  Layers,
} from 'lucide-react';
import Header from './Header';
import CryptoCard from './CryptoCard';
import SaleLotCard from './SaleLotCard';
import ChestOpenModal from './ChestOpenModal';
import WalletConnectModal from './WalletConnectModal';
import { RARITIES, CATEGORIES, RARITY_STYLES } from '../data/cards';
import { USER_INVENTORY, USER_LISTINGS, USER_TRANSACTIONS, PORTFOLIO_STATS } from '../data/wallet';
import { useConnection } from '../context/ConnectionContext';

const TABS = [
  { id: 'sales', label: 'Мои продажи', icon: ShoppingBag, count: USER_LISTINGS.length },
  { id: 'inventory', label: 'Мои карты', icon: Package2, count: USER_INVENTORY.length },
  { id: 'history', label: 'История', icon: History, count: USER_TRANSACTIONS.length },
];

// ==== sub-components ====
const RarityDistributionBar = ({ stats }) => {
  const total = stats.common + stats.rare + stats.epic + stats.legendary || 1;
  const order = ['common', 'rare', 'epic', 'legendary'];
  return (
    <div className="glass rounded-xl p-5 h-full" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="font-display text-[10px] uppercase tracking-widest text-gray-400 mb-3">
        Распределение по редкости
      </div>
      <div className="flex h-3 rounded-full overflow-hidden mb-4 glass-light">
        {order.map((r) => {
          const pct = (stats[r] / total) * 100;
          if (pct === 0) return null;
          return (
            <div
              key={r}
              style={{
                width: `${pct}%`,
                background: RARITY_STYLES[r].hex,
                boxShadow: `0 0 10px ${RARITY_STYLES[r].hex}`,
              }}
              title={`${RARITY_STYLES[r].label}: ${stats[r]}`}
            />
          );
        })}
      </div>
      <div className="grid grid-cols-4 gap-2 text-center">
        {order.map((r) => (
          <div key={r}>
            <div
              className="font-mono-data text-lg font-bold"
              style={{ color: RARITY_STYLES[r].hex, textShadow: `0 0 10px ${RARITY_STYLES[r].hex}66` }}
            >
              {stats[r]}
            </div>
            <div
              className="font-display text-[9px] uppercase tracking-widest"
              style={{ color: RARITY_STYLES[r].hex }}
            >
              {RARITY_STYLES[r].label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PortfolioHero = ({ connection }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    if (!connection?.address) return;
    navigator.clipboard?.writeText(connection.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div
      data-testid="portfolio-hero"
      className="relative glass rounded-2xl p-6 md:p-8 overflow-hidden"
      style={{
        border: '1px solid rgba(0,240,255,0.2)',
        boxShadow: '0 0 40px rgba(0,240,255,0.08)',
      }}
    >
      {/* Decorative glows */}
      <div
        className="absolute -top-24 -right-16 w-72 h-72 rounded-full blur-3xl opacity-30 pointer-events-none"
        style={{ background: '#00F0FF' }}
      />
      <div
        className="absolute -bottom-24 -left-16 w-72 h-72 rounded-full blur-3xl opacity-25 pointer-events-none"
        style={{ background: '#B026FF' }}
      />

      <div className="relative grid md:grid-cols-2 gap-6 items-center">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="font-display text-[10px] uppercase tracking-widest text-green-400">
              Активный кошелёк
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight text-white">
            Мой <span className="bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-transparent bg-clip-text">кошелёк</span>
          </h1>
          {connection?.address && (
            <button
              onClick={copy}
              data-testid="copy-address"
              className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-md glass-light hover:border-cyan-400/50 border border-transparent transition group"
            >
              <span className="font-mono-data text-xs text-gray-300">
                {connection.address.slice(0, 10)}…{connection.address.slice(-8)}
              </span>
              {copied ? (
                <CheckCircle2 size={12} className="text-green-400" />
              ) : (
                <Copy size={12} className="text-gray-500 group-hover:text-cyan-400" />
              )}
            </button>
          )}
        </div>

        {/* Big value */}
        <div className="flex flex-col items-start md:items-end">
          <div className="font-display text-[10px] uppercase tracking-widest text-gray-400 mb-1">
            Общая стоимость портфеля
          </div>
          <div className="flex items-baseline gap-2">
            <span
              className="font-mono-data text-5xl md:text-6xl font-bold"
              style={{
                background: 'linear-gradient(135deg, #00F0FF 0%, #B026FF 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                textShadow: '0 0 20px rgba(0,240,255,0.3)',
              }}
            >
              {PORTFOLIO_STATS.totalValue.toFixed(2)}
            </span>
            <span className="font-display text-xl text-gray-400">MOVE</span>
          </div>
          <div className="mt-2 flex items-center gap-3 text-xs text-gray-400 font-mono-data">
            <span className="text-green-400">+12.4%</span>
            <span className="text-gray-500">за 7 дней</span>
          </div>
        </div>
      </div>

      {/* Small stats row */}
      <div className="relative mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Всего карт', value: PORTFOLIO_STATS.totalCards, color: '#00F0FF' },
          { label: 'Уникальных', value: PORTFOLIO_STATS.unique, color: '#B026FF' },
          { label: 'Активных лотов', value: PORTFOLIO_STATS.activeLots, color: '#FFD700' },
          {
            label: 'MOVE баланс',
            value: connection?.balance?.toFixed(2) || '0.00',
            color: '#00F0FF',
          },
        ].map((s) => (
          <div
            key={s.label}
            className="glass-light rounded-lg px-4 py-3"
            style={{ border: `1px solid ${s.color}22` }}
          >
            <div className="font-display text-[10px] uppercase tracking-widest text-gray-400">
              {s.label}
            </div>
            <div
              className="font-mono-data text-xl font-bold mt-1"
              style={{ color: s.color, textShadow: `0 0 10px ${s.color}55` }}
            >
              {s.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const EmptyState = ({ icon: Icon, title, subtitle }) => (
  <div className="glass rounded-xl p-12 text-center" style={{ border: '1px dashed rgba(255,255,255,0.1)' }}>
    <Icon size={40} className="mx-auto text-gray-600 mb-3" />
    <div className="font-display text-lg uppercase tracking-widest text-gray-400">{title}</div>
    {subtitle && <div className="text-xs text-gray-600 mt-2">{subtitle}</div>}
  </div>
);

const TxIcon = ({ type }) => {
  const map = {
    buy: { icon: ArrowDownLeft, color: '#00F0FF', label: 'Покупка' },
    sell: { icon: ArrowUpRight, color: '#FFD700', label: 'Продажа' },
    send: { icon: SendIcon, color: '#B026FF', label: 'Отправка' },
    chest: { icon: Gift, color: '#FFB800', label: 'Сундук' },
    merge: { icon: Layers, color: '#00F0FF', label: 'Слияние' },
  };
  const cfg = map[type] || map.buy;
  const Icon = cfg.icon;
  return (
    <div
      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
      style={{
        background: `${cfg.color}15`,
        border: `1px solid ${cfg.color}44`,
        color: cfg.color,
      }}
    >
      <Icon size={16} />
    </div>
  );
};

const StatusPill = ({ status }) => {
  const map = {
    completed: { color: '#22c55e', bg: 'rgba(34,197,94,0.1)', label: 'Завершено', icon: CheckCircle2 },
    pending: { color: '#FFD700', bg: 'rgba(255,215,0,0.1)', label: 'Ожидает', icon: Loader2 },
    failed: { color: '#ef4444', bg: 'rgba(239,68,68,0.1)', label: 'Ошибка', icon: XCircle },
  };
  const cfg = map[status] || map.completed;
  const Icon = cfg.icon;
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-display font-bold uppercase tracking-widest"
      style={{ color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.color}44` }}
    >
      <Icon size={10} className={status === 'pending' ? 'animate-spin' : ''} />
      {cfg.label}
    </span>
  );
};

// ==== main ====
const WalletPage = () => {
  const { connection, setWalletOpen } = useConnection();
  const [tab, setTab] = useState('sales');
  const [rarityFilter, setRarityFilter] = useState('all');
  const [catFilter, setCatFilter] = useState('all');
  const [toast, setToast] = useState(null);
  const [openingChest, setOpeningChest] = useState(null);

  const showToast = (m) => {
    setToast(m);
    setTimeout(() => setToast(null), 2200);
  };

  const filteredListings = useMemo(
    () =>
      USER_LISTINGS.filter((l) => {
        const catOk = catFilter === 'all' || l.card.category === catFilter;
        const rarOk = rarityFilter === 'all' || l.card.rarity === rarityFilter;
        return catOk && rarOk;
      }),
    [catFilter, rarityFilter]
  );

  const filteredInventory = useMemo(
    () =>
      USER_INVENTORY.filter((c) => {
        const catOk = catFilter === 'all' || c.category === catFilter;
        const rarOk = rarityFilter === 'all' || c.rarity === rarityFilter;
        return catOk && rarOk;
      }),
    [catFilter, rarityFilter]
  );

  // Locked state if not connected
  if (!connection) {
    return (
      <div className="relative min-h-screen">
        <Header />
        <main className="relative z-[2] max-w-[1440px] mx-auto px-4 md:px-8 py-16 md:py-24">
          <div
            className="relative glass rounded-2xl p-10 md:p-16 text-center max-w-xl mx-auto"
            style={{ border: '1px solid rgba(0,240,255,0.2)' }}
          >
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle at 50% 0%, rgba(0,240,255,0.15), transparent 60%)',
              }}
            />
            <div className="relative">
              <div
                className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4"
                style={{
                  background: 'linear-gradient(135deg, #00F0FF, #B026FF)',
                  boxShadow: '0 0 30px rgba(0,240,255,0.4)',
                }}
              >
                <Package2 size={28} className="text-black" />
              </div>
              <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-white">
                Кошелёк заблокирован
              </h2>
              <p className="mt-3 text-sm text-gray-400 max-w-sm mx-auto">
                Подключите кошелёк, чтобы увидеть вашу коллекцию карт, активные лоты и историю сделок.
              </p>
              <button
                data-testid="wallet-page-connect"
                onClick={() => setWalletOpen(true)}
                className="btn-tactile btn-tactile-cyan mt-6 px-10"
              >
                Подключить кошелёк
              </button>
            </div>
          </div>
        </main>
        <WalletConnectModal open={false} onClose={() => {}} onConnected={() => {}} />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <Header />

      <main className="relative z-[2] max-w-[1440px] mx-auto px-4 md:px-8 py-8 md:py-10 space-y-8">
        {/* Hero portfolio */}
        <PortfolioHero connection={connection} />

        {/* Distribution + quick info */}
        <div className="grid md:grid-cols-2 gap-4">
          <RarityDistributionBar stats={PORTFOLIO_STATS} />
          <div
            className="glass rounded-xl p-5"
            style={{ border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="font-display text-[10px] uppercase tracking-widest text-gray-400 mb-3">
              Быстрые действия
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                data-testid="qa-send"
                onClick={() => showToast('Откройте детали карты для отправки')}
                className="btn-tactile btn-tactile-ghost text-xs py-3 flex items-center justify-center gap-2"
              >
                <SendIcon size={14} /> Отправить
              </button>
              <button
                data-testid="qa-receive"
                onClick={() => showToast('Адрес скопирован')}
                className="btn-tactile btn-tactile-ghost text-xs py-3 flex items-center justify-center gap-2"
              >
                <ArrowDownLeft size={14} /> Получить
              </button>
              <button
                data-testid="qa-merge"
                onClick={() => showToast('Выберите 5 одинаковых карт для слияния')}
                className="btn-tactile btn-tactile-purple text-xs py-3 flex items-center justify-center gap-2"
              >
                <Layers size={14} /> Слить карты
              </button>
              <button
                data-testid="qa-chests"
                onClick={() => (window.location.href = '/')}
                className="btn-tactile btn-tactile-cyan text-xs py-3 flex items-center justify-center gap-2"
              >
                <Gift size={14} /> К сундукам
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div
          className="glass rounded-xl p-1.5 inline-flex gap-1"
          data-testid="wallet-tabs"
          style={{ border: '1px solid rgba(255,255,255,0.06)' }}
        >
          {TABS.map((t) => {
            const Icon = t.icon;
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                data-testid={`wallet-tab-${t.id}`}
                onClick={() => setTab(t.id)}
                className={`relative font-display font-bold uppercase tracking-widest text-xs px-4 py-2.5 rounded-lg flex items-center gap-2 transition-all ${
                  active ? 'text-black' : 'text-gray-400 hover:text-white'
                }`}
                style={
                  active
                    ? {
                        background: 'linear-gradient(to bottom, #5ef5ff, #00c2d4)',
                        boxShadow:
                          '0 0 18px rgba(0,240,255,0.5), inset 0 1px 0 rgba(255,255,255,0.5)',
                      }
                    : {}
                }
              >
                <Icon size={14} />
                {t.label}
                <span
                  className={`font-mono-data text-[10px] px-1.5 rounded ${
                    active ? 'bg-black/20 text-black' : 'bg-white/10 text-gray-300'
                  }`}
                >
                  {t.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Filters (only on sales/inventory) */}
        {tab !== 'history' && (
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-display text-[10px] uppercase tracking-widest text-gray-500 mr-2">
                Редкость
              </span>
              {RARITIES.map((r) => {
                const active = rarityFilter === r.id;
                return (
                  <button
                    key={r.id}
                    data-testid={`wallet-rarity-${r.id}`}
                    onClick={() => setRarityFilter(r.id)}
                    className="font-display font-bold uppercase tracking-widest text-[10px] px-3 py-1.5 rounded-full transition-all"
                    style={{
                      color: active ? '#000' : r.color,
                      background: active ? r.color : `${r.color}10`,
                      border: `1px solid ${r.color}${active ? 'ff' : '55'}`,
                      boxShadow: active ? `0 0 12px ${r.color}66` : 'none',
                    }}
                  >
                    {r.label}
                  </button>
                );
              })}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-display text-[10px] uppercase tracking-widest text-gray-500 mr-2">
                Тип
              </span>
              {CATEGORIES.map((c) => {
                const active = catFilter === c.id;
                return (
                  <button
                    key={c.id}
                    data-testid={`wallet-cat-${c.id}`}
                    onClick={() => setCatFilter(c.id)}
                    className={`font-display font-bold uppercase tracking-widest text-[10px] px-3 py-1.5 rounded-md transition-all ${
                      active
                        ? 'text-cyan-300 bg-cyan-400/15 border border-cyan-400/60'
                        : 'text-gray-400 bg-white/[0.02] border border-white/10 hover:text-white hover:border-white/30'
                    }`}
                    style={
                      active
                        ? { boxShadow: 'inset 0 -2px 0 #00F0FF, 0 0 10px rgba(0,240,255,0.25)' }
                        : {}
                    }
                  >
                    {c.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Content */}
        <AnimatePresence mode="wait">
          {tab === 'sales' && (
            <motion.div
              key="sales"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="space-y-3"
              data-testid="sales-list"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg md:text-xl font-bold uppercase tracking-wide text-white">
                  {filteredListings.length}{' '}
                  <span className="text-cyan-400">активных лотов</span>
                </h3>
              </div>
              {filteredListings.length === 0 ? (
                <EmptyState
                  icon={ShoppingBag}
                  title="Активных лотов нет"
                  subtitle="Выставите карту на продажу с вкладки «Мои карты»"
                />
              ) : (
                filteredListings.map((l) => (
                  <SaleLotCard
                    key={l.id}
                    lot={l}
                    onWithdraw={(lot) => showToast(`Лот снят с продажи: ${lot.card.ticker}`)}
                    onEdit={(lot) => showToast(`Редактирование лота ${lot.card.ticker}`)}
                  />
                ))
              )}
            </motion.div>
          )}

          {tab === 'inventory' && (
            <motion.div
              key="inventory"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              data-testid="inventory-grid"
            >
              {filteredInventory.length === 0 ? (
                <EmptyState
                  icon={Package2}
                  title="Нет карт в коллекции"
                  subtitle="Откройте сундук, чтобы получить первые карты"
                />
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
                  {filteredInventory.map((card) => (
                    <div key={card.ticker} className="relative">
                      {/* count badge */}
                      <div
                        className="absolute top-2 right-2 z-10 px-2 py-0.5 rounded-full text-[10px] font-mono-data font-bold glass-light"
                        style={{ color: '#fff' }}
                      >
                        ×{card.count}
                      </div>
                      <CryptoCard
                        card={card}
                        onSell={(c) => showToast(`Выставлено на продажу: ${c.ticker}`)}
                        onSend={(c) => showToast(`Отправка ${c.ticker}`)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {tab === 'history' && (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              data-testid="history-list"
              className="glass rounded-xl overflow-hidden"
              style={{ border: '1px solid rgba(255,255,255,0.06)' }}
            >
              {/* Table header */}
              <div className="hidden md:grid grid-cols-[auto_1fr_1fr_1fr_auto_auto] gap-4 px-5 py-3 border-b border-white/5 font-display text-[10px] uppercase tracking-widest text-gray-500">
                <div className="w-9">Тип</div>
                <div>Карта / Предмет</div>
                <div>Дата</div>
                <div>Контрагент</div>
                <div className="text-right">Сумма</div>
                <div className="text-right">Статус</div>
              </div>
              {USER_TRANSACTIONS.map((tx) => (
                <div
                  key={tx.id}
                  data-testid={`tx-${tx.id}`}
                  className="grid grid-cols-[auto_1fr_auto] md:grid-cols-[auto_1fr_1fr_1fr_auto_auto] gap-4 px-5 py-4 border-b border-white/5 last:border-0 items-center hover:bg-white/[0.02] transition"
                >
                  <TxIcon type={tx.type} />
                  <div>
                    <div className="font-display font-bold text-white text-sm uppercase">
                      {tx.card}
                    </div>
                    <div className="md:hidden text-[10px] text-gray-500 mt-0.5 font-mono-data">
                      {tx.date}
                    </div>
                  </div>
                  <div className="hidden md:block font-mono-data text-xs text-gray-400">
                    {tx.date}
                  </div>
                  <div className="hidden md:block font-mono-data text-xs text-gray-500">
                    {tx.counterparty || '—'}
                  </div>
                  <div
                    className={`text-right font-mono-data text-sm font-bold ${
                      tx.type === 'sell'
                        ? 'text-green-400'
                        : tx.type === 'buy' || tx.type === 'chest'
                        ? 'text-cyan-400'
                        : 'text-gray-400'
                    }`}
                  >
                    {tx.amount > 0
                      ? `${tx.type === 'sell' ? '+' : '-'}${tx.amount.toFixed(2)}`
                      : '—'}
                    {tx.amount > 0 && (
                      <span className="text-[10px] text-gray-500 ml-1">MOVE</span>
                    )}
                  </div>
                  <div className="md:text-right">
                    <StatusPill status={tx.status} />
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

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
          <span className="font-display uppercase tracking-widest text-sm text-white">
            {toast}
          </span>
        </div>
      )}

      {openingChest && (
        <ChestOpenModal chest={openingChest} onClose={() => setOpeningChest(null)} />
      )}
    </div>
  );
};

export default WalletPage;
