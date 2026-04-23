// Mocked user inventory & sales data
import { CARDS } from './cards';

// User owns these cards (subset of CARDS)
export const USER_INVENTORY = [
  { ...CARDS.find((c) => c.ticker === 'BTC'), count: 2, acquired: '2026-04-18' },
  { ...CARDS.find((c) => c.ticker === 'BNB'), count: 1, acquired: '2026-04-20' },
  { ...CARDS.find((c) => c.ticker === 'DOGE'), count: 3, acquired: '2026-04-15' },
  { ...CARDS.find((c) => c.ticker === 'SHIB'), count: 1, acquired: '2026-04-22' },
  { ...CARDS.find((c) => c.ticker === 'LINK'), count: 1, acquired: '2026-04-19' },
  { ...CARDS.find((c) => c.ticker === 'LTC'), count: 2, acquired: '2026-04-17' },
  { ...CARDS.find((c) => c.ticker === 'TRX'), count: 4, acquired: '2026-04-11' },
  { ...CARDS.find((c) => c.ticker === 'ALGO'), count: 1, acquired: '2026-04-21' },
  { ...CARDS.find((c) => c.ticker === 'FTM'), count: 1, acquired: '2026-04-12' },
  { ...CARDS.find((c) => c.ticker === 'KAS'), count: 1, acquired: '2026-04-22' },
  { ...CARDS.find((c) => c.ticker === 'LDO'), count: 1, acquired: '2026-04-16' },
  { ...CARDS.find((c) => c.ticker === 'CRO'), count: 2, acquired: '2026-04-14' },
];

export const USER_LISTINGS = [
  {
    id: 'lot-001',
    card: CARDS.find((c) => c.ticker === 'LTC'),
    listPrice: 0.22,
    listedAt: '2026-04-22 14:30',
    txHash: '0x4762a8f1b3c5d7e9...4b52',
    views: 28,
    watchers: 3,
  },
  {
    id: 'lot-002',
    card: CARDS.find((c) => c.ticker === 'LINK'),
    listPrice: 0.85,
    listedAt: '2026-04-23 09:12',
    txHash: '0x8fa21c7d56e9...7a3b',
    views: 61,
    watchers: 12,
  },
  {
    id: 'lot-003',
    card: CARDS.find((c) => c.ticker === 'SHIB'),
    listPrice: 0.34,
    listedAt: '2026-04-23 18:45',
    txHash: '0xc3b5f91d28a7...9e14',
    views: 15,
    watchers: 1,
  },
];

export const USER_TRANSACTIONS = [
  { id: 't-001', type: 'buy', card: 'BTC', amount: 2.4, date: '2026-04-23 21:02', status: 'completed', counterparty: '0xA12…8f3E' },
  { id: 't-002', type: 'chest', card: 'Сундук медведя', amount: 0.30, date: '2026-04-23 20:45', status: 'completed', counterparty: null },
  { id: 't-003', type: 'sell', card: 'DOGE', amount: 0.32, date: '2026-04-23 14:10', status: 'completed', counterparty: '0x7C4…d02B' },
  { id: 't-004', type: 'send', card: 'TRX', amount: 0, date: '2026-04-22 09:55', status: 'completed', counterparty: '0x9FE…aa01' },
  { id: 't-005', type: 'chest', card: 'Сундук хомяка', amount: 0.10, date: '2026-04-22 08:30', status: 'completed', counterparty: null },
  { id: 't-006', type: 'buy', card: 'LDO', amount: 0.78, date: '2026-04-21 22:18', status: 'pending', counterparty: '0x3B8…ef09' },
  { id: 't-007', type: 'sell', card: 'OKB', amount: 0.22, date: '2026-04-20 16:40', status: 'failed', counterparty: '0x1A0…b77C' },
  { id: 't-008', type: 'merge', card: 'SHIB → SHIB×5', amount: 0, date: '2026-04-20 11:00', status: 'completed', counterparty: null },
];

export const PORTFOLIO_STATS = {
  totalValue: 12.84, // MOVE
  totalCards: USER_INVENTORY.reduce((s, c) => s + c.count, 0),
  unique: USER_INVENTORY.length,
  activeLots: USER_LISTINGS.length,
  legendary: USER_INVENTORY.filter((c) => c.rarity === 'legendary').reduce((s, c) => s + c.count, 0),
  epic: USER_INVENTORY.filter((c) => c.rarity === 'epic').reduce((s, c) => s + c.count, 0),
  rare: USER_INVENTORY.filter((c) => c.rarity === 'rare').reduce((s, c) => s + c.count, 0),
  common: USER_INVENTORY.filter((c) => c.rarity === 'common').reduce((s, c) => s + c.count, 0),
};
