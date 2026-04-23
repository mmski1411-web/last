// Mock data for MoveInvestor crypto card game marketplace

export const CATEGORIES = [
  { id: 'all', label: 'Все монеты' },
  { id: 'layer1', label: 'Layer 1' },
  { id: 'exchange', label: 'Exchange' },
  { id: 'meme', label: 'Meme' },
  { id: 'infra', label: 'Infrastructure' },
  { id: 'defi', label: 'DeFi' },
  { id: 'layer2', label: 'Layer 2' },
];

export const RARITIES = [
  { id: 'all', label: 'Все', color: '#94A3B8' },
  { id: 'common', label: 'Common', color: '#94A3B8' },
  { id: 'rare', label: 'Rare', color: '#00F0FF' },
  { id: 'epic', label: 'Epic', color: '#B026FF' },
  { id: 'legendary', label: 'Legendary', color: '#FFB800' },
];

export const SORT_OPTIONS = [
  { id: 'default', label: 'По умолчанию' },
  { id: 'rarity_desc', label: 'Редкость ↓' },
  { id: 'price_asc', label: 'Цена ↑' },
  { id: 'price_desc', label: 'Цена ↓' },
];

// Color per coin for logo background
export const CARDS = [
  { ticker: 'BTC', name: 'Bitcoin', type: 'POW', category: 'layer1', rarity: 'legendary', price: 2.40, progress: 3, target: 5, isNew: true, color: '#F7931A' },
  { ticker: 'BNB', name: 'Binance Coin', type: 'BEP-20', category: 'exchange', rarity: 'epic', price: 0.85, progress: 1, target: 5, isNew: true, color: '#F3BA2F' },
  { ticker: 'DOGE', name: 'Dogecoin', type: 'MEME', category: 'meme', rarity: 'rare', price: 0.32, progress: 2, target: 5, isNew: false, color: '#C2A633' },
  { ticker: 'TRX', name: 'Tron', type: 'DPOS', category: 'layer1', rarity: 'common', price: 0.12, progress: 1, target: 5, isNew: false, color: '#FF060A' },
  { ticker: 'SHIB', name: 'Shiba Inu', type: 'MEME', category: 'meme', rarity: 'rare', price: 0.28, progress: 4, target: 5, isNew: true, color: '#FFA409' },
  { ticker: 'LINK', name: 'Chainlink', type: 'ORACLE', category: 'infra', rarity: 'epic', price: 0.72, progress: 2, target: 5, isNew: false, color: '#2A5ADA' },
  { ticker: 'LTC', name: 'Litecoin', type: 'POW', category: 'layer1', rarity: 'common', price: 0.18, progress: 3, target: 5, isNew: false, color: '#B8B8B8' },
  { ticker: 'ICP', name: 'Internet Computer', type: 'POS', category: 'infra', rarity: 'rare', price: 0.42, progress: 1, target: 5, isNew: false, color: '#3B00B9' },
  { ticker: 'OKB', name: 'OKEx Token', type: 'UTILITY', category: 'exchange', rarity: 'common', price: 0.22, progress: 2, target: 5, isNew: false, color: '#000000' },
  { ticker: 'XLM', name: 'Stellar', type: 'POS', category: 'layer1', rarity: 'common', price: 0.15, progress: 1, target: 5, isNew: false, color: '#7D00FF' },
  { ticker: 'IMX', name: 'Immutable X', type: 'ROLLUP', category: 'layer2', rarity: 'epic', price: 0.68, progress: 2, target: 5, isNew: true, color: '#0A0A0A' },
  { ticker: 'CRO', name: 'Crypto.com', type: 'UTILITY', category: 'exchange', rarity: 'common', price: 0.14, progress: 4, target: 5, isNew: false, color: '#002D74' },
  { ticker: 'ALGO', name: 'Algorand', type: 'POS', category: 'layer1', rarity: 'rare', price: 0.38, progress: 3, target: 5, isNew: false, color: '#000000' },
  { ticker: 'GRT', name: 'The Graph', type: 'INDEXER', category: 'infra', rarity: 'rare', price: 0.36, progress: 1, target: 5, isNew: false, color: '#6F4CFF' },
  { ticker: 'FTM', name: 'Fantom', type: 'POS', category: 'layer1', rarity: 'rare', price: 0.34, progress: 2, target: 5, isNew: false, color: '#1969FF' },
  { ticker: 'EOS', name: 'EOS', type: 'DPOS', category: 'layer1', rarity: 'common', price: 0.16, progress: 1, target: 5, isNew: false, color: '#000000' },
  { ticker: 'LDO', name: 'Lido DAO', type: 'STAKING', category: 'defi', rarity: 'epic', price: 0.78, progress: 3, target: 5, isNew: true, color: '#00A3FF' },
  { ticker: 'KAS', name: 'Kaspa', type: 'POW', category: 'layer1', rarity: 'legendary', price: 2.10, progress: 4, target: 5, isNew: true, color: '#70C7BA' },
  { ticker: 'BONK', name: 'Bonk', type: 'MEME', category: 'meme', rarity: 'rare', price: 0.30, progress: 1, target: 5, isNew: true, color: '#FF8B00' },
  { ticker: 'UNI', name: 'Uniswap', type: 'DEX', category: 'defi', rarity: 'epic', price: 0.82, progress: 2, target: 5, isNew: false, color: '#FF007A' },
  { ticker: 'ARB', name: 'Arbitrum', type: 'ROLLUP', category: 'layer2', rarity: 'rare', price: 0.44, progress: 1, target: 5, isNew: false, color: '#28A0F0' },
  { ticker: 'OP', name: 'Optimism', type: 'ROLLUP', category: 'layer2', rarity: 'epic', price: 0.70, progress: 3, target: 5, isNew: false, color: '#FF0420' },
  { ticker: 'AAVE', name: 'Aave', type: 'LENDING', category: 'defi', rarity: 'rare', price: 0.48, progress: 2, target: 5, isNew: false, color: '#B6509E' },
  { ticker: 'PEPE', name: 'Pepe', type: 'MEME', category: 'meme', rarity: 'legendary', price: 2.60, progress: 5, target: 5, isNew: true, color: '#4C9A2A' },
];

export const LOOTBOXES = [
  {
    id: 'hamster',
    name: 'Сундук хомяка',
    subtitle: 'COMMON',
    description: 'Базовый сундук с обычными монетами',
    price: 0.10,
    rarity: 'common',
    owned: 1,
    dropRates: [
      { rarity: 'common', percent: 85 },
      { rarity: 'rare', percent: 13 },
      { rarity: 'epic', percent: 2 },
    ],
  },
  {
    id: 'bear',
    name: 'Сундук медведя',
    subtitle: 'RARE+',
    description: 'Редкие и эпические дропы',
    price: 0.30,
    rarity: 'rare',
    owned: 1,
    dropRates: [
      { rarity: 'common', percent: 40 },
      { rarity: 'rare', percent: 45 },
      { rarity: 'epic', percent: 13 },
      { rarity: 'legendary', percent: 2 },
    ],
  },
  {
    id: 'bull',
    name: 'Сундук быка',
    subtitle: 'EPIC+',
    description: 'Шанс на легендарные токены',
    price: 0.90,
    rarity: 'legendary',
    owned: 0,
    dropRates: [
      { rarity: 'rare', percent: 50 },
      { rarity: 'epic', percent: 38 },
      { rarity: 'legendary', percent: 12 },
    ],
  },
];

export const RARITY_STYLES = {
  common: { hex: '#94A3B8', className: 'rarity-common', label: 'COMMON' },
  rare: { hex: '#00F0FF', className: 'rarity-rare', label: 'RARE' },
  epic: { hex: '#B026FF', className: 'rarity-epic', label: 'EPIC' },
  legendary: { hex: '#FFB800', className: 'rarity-legendary', label: 'LEGENDARY' },
};
