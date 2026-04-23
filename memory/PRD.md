# MoveInvestor — Crypto Card Game Marketplace UI/UX

## Problem Statement
Доработать UI/UX маркетплейса крипто-карточной игры в стиле dark gaming + neon.
Итерация 2: Модальные окна подключения кошельков и открытия сундуков.

## Architecture
- Frontend: React 19 + Craco, Tailwind, Framer Motion, Lucide
- Backend: FastAPI + MongoDB (boilerplate, не используется)
- Данные: `/app/frontend/src/data/cards.js` (24 карты, 3 сундука)

## Components
- `Header.jsx` — sticky glass nav, адаптируется под connected/disconnected
- `StatsBento.jsx` — 4 статистических карточки
- `Lootbox3D.jsx` — 3D лутбокс (SVG-глифы хомяк/медведь/бык)
- `Particles.jsx` — CSS-анимированные частицы
- `CryptoCard.jsx` — glassmorphism карта с rarity glow, lightning, shimmer progress
- `FilterTabs.jsx` — игровые вкладки + rarity pills + sort
- `ChestOpenModal.jsx` — preview → opening → flash → reveal (с x1/x5/x10)
- `WalletConnectModal.jsx` — список провайдеров + connecting → success/error
- `Marketplace.jsx` — main page, gated actions (chest/buy/sell без кошелька → открыть connect)

## Implemented (P0)
- [x] 3D лутбоксы с аурой и частицами
- [x] Glassmorphism + rarity border glow (4 уровня)
- [x] Lightning sweep + Zap для rare+
- [x] Progress bars X/5 с shimmer
- [x] Игровые вкладки с clip-path
- [x] Тактильные объёмные кнопки
- [x] **Wallet Connect Modal** (2026-01): 7 провайдеров (MetaMask/WalletConnect/Phantom/Coinbase/Trust/OKX/Binance), brand SVG icons, connecting/success/error stages, mocked address generation
- [x] **Chest Open Modal** (2026-01): pre-open preview (chest 3D + drop rates table + amount x1/x5/x10 с discounts), shake+flash, reveal одной или нескольких карт, "Открыть ещё" / "Забрать"
- [x] Gated actions — без кошелька автоматически открывается Wallet modal
- [x] Hero CTA "Подключить кошелёк для игры" когда отключён
- [x] Адрес-badge + balance в Header после подключения, кнопка "Отключить"

## Backlog (P1/P2)
- P1: Реальный backend (инвентарь, транзакции)
- P1: Страницы Кошелёк/Инвестирование/Рейтинг/Лидерборд
- P1: Merge (5 карт → прокачка)
- P2: Реальный Web3 (wagmi/rainbowkit)
- P2: Локализация EN
- P2: Sound FX для chest open
- P2: Транзакционная история

## Next tasks
- Интеграция Web3 (wagmi + MetaMask SDK) когда понадобится реальный on-chain flow
- Персистентность инвентаря через backend + MongoDB
