# MoveInvestor — Crypto Card Game Marketplace UI/UX

## Problem Statement
Доработать UI/UX маркетплейса крипто-карточной игры в стиле dark gaming + neon.
Итерация 3: Вторая страница — «Кошелёк» с вкладками «Мои продажи / Мои карты / История».

## Architecture
- Frontend: React 19 + Craco, Tailwind, Framer Motion, Lucide, React Router DOM
- Routes: `/` (Marketplace), `/wallet` (WalletPage)
- Shared state: `ConnectionContext` (connection + walletOpen)
- Моки: `/data/cards.js`, `/data/wallet.js` (USER_INVENTORY, USER_LISTINGS, USER_TRANSACTIONS, PORTFOLIO_STATS)

## Components
### Маркетплейс
- Header, StatsBento, Lootbox3D, Particles, CryptoCard, FilterTabs, ChestOpenModal, Marketplace
### Кошелёк (новое)
- `WalletPage.jsx` — hero portfolio + distribution + quick actions + tabs + filters + content
- `SaleLotCard.jsx` — горизонтальная карточка активного лота с красной кнопкой «Снять»
- `ConnectionContext.jsx` — общий state для connection/walletOpen между страницами
### Modals (глобальные)
- `WalletConnectModal.jsx` — 7 провайдеров
- `ChestOpenModal.jsx` — preview/x1-x5-x10/reveal

## Implemented (P0)
- [x] Маркетплейс (1-я страница) со всеми эффектами
- [x] Wallet Connect Modal + Chest Open Modal
- [x] **Страница «Кошелёк» (2026-01)**:
  - Portfolio Hero с gradient-балансом 12.84 MOVE, "+12.4% за 7 дней", копирование адреса
  - 4-мини-стата: всего карт, уникальных, активных лотов, баланс MOVE
  - Rarity Distribution Bar (сегментированный индикатор)
  - Quick Actions: Отправить / Получить / Слить карты / К сундукам
  - Tabbed nav: Мои продажи / Мои карты / История
  - Филтры редкость + тип (работают для sales и inventory)
  - **Мои продажи**: горизонтальные карточки с превью, LTC/LINK/SHIB в каталоге, статистика (views/watchers/time), кнопки «Править» (призрачная) и «Снять» (красная)
  - **Мои карты**: grid инвентаря с ×count бейджами
  - **История**: таблица транзакций 8 шт (buy/sell/send/chest/merge) с цветными иконками, датой, контрагентом, суммой, статус-pills (Завершено / Ожидает / Ошибка)
  - Locked state если кошелёк не подключён — большой призыв к подключению
- [x] Роутинг с React Router DOM, active-state в навигации по useLocation
- [x] Общий WalletConnectModal глобально через context

## Backlog (P1/P2)
- P1: Страницы Инвестирование / Рейтинг / Лидерборд
- P1: Merge-флоу (5 карт → прокачка) с модалкой
- P1: Детали карты + страница лота на маркете
- P1: Реальный backend (инвентарь, транзакции)
- P2: Реальный Web3 (wagmi + rainbowkit)
- P2: Локализация EN
- P2: Sound FX

## Next tasks
- Инвестирование page (staking / yield)
- Leaderboard с top-игроками
- Детали транзакции / лота (модалка)
