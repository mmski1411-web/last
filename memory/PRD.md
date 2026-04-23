# MoveInvestor — Crypto Card Game Marketplace UI/UX

## Problem Statement (original)
Доработать UI/UX для маркетплейса карточной крипто-игры. Дизайн в стиле «игровой тёмной темы» с неоновыми акцентами (синий, фиолетовый, голубой).
- 3D-лутбоксы «Хомяка», «Медведя», «Быка» с аурой и частицами
- Glassmorphism-карточки монет с рарити-свечением
- Анимированные «молнии» для редких, прогресс-бары «1/5»
- Фильтры как игровые вкладки, объёмные/тактильные кнопки

## Architecture
- **Frontend**: React 19 + CRA (Craco), Tailwind, Framer Motion, Lucide icons
- **Backend**: FastAPI + MongoDB (boilerplate, не используется на этой итерации — только моки)
- **Фронт-данные**: `/app/frontend/src/data/cards.js` (mock cards + lootboxes + filters)

## Components built (2026-01)
- `Header.jsx` — sticky glass nav, logo MI, TESTNET badge, balance, Отключить
- `StatsBento.jsx` — 4 статистических карточки (Карточек / Сундуков / Готово к слиянию / Эпик)
- `Lootbox3D.jsx` — 3D-лутбоксы с SVG-глифами (хомяк/медведь/бык), radial aura, частицы, live drop-rate bar
- `Particles.jsx` — CSS-анимированные поднимающиеся частицы по цвету редкости
- `CryptoCard.jsx` — glassmorphism-карточки с rarity border-glow, NEW-pulse, shimmer progress bar, tactile buttons, lightning sweep для rare+
- `FilterTabs.jsx` — игровые вкладки (clip-path), рарити-пилюли, sort dropdown
- `ChestOpenModal.jsx` — анимация открытия (shake → flash → reveal), drop-rate-based selection, particle burst, 3D card reveal
- `Marketplace.jsx` — сборка всех секций, state, toast-уведомления

## Design system
- Колор-палитра: void #030305, neon-cyan #00F0FF, neon-purple #B026FF, neon-yellow #FFD700
- Rarity: common #94A3B8, rare #00F0FF, epic #B026FF, legendary #FFB800 (с box-shadow glow pulse)
- Шрифты: Rajdhani (display), Space Mono (data), Outfit (body)
- Кнопки: tactile — depth shadow, translate-y на hover/active
- Фон: radial gradient + grid pattern + SVG noise

## Что реализовано (P0 — MVP)
- [x] Полный лейаут: Header → Hero + Stats → Лутбоксы → Фильтры → Grid 24 карт → Footer
- [x] 3D-вид лутбоксов с уникальными глифами (хомяк/медведь/бык)
- [x] Свечение-аура + частицы вокруг сундуков
- [x] Glassmorphism + rarity border glow (4 уровня)
- [x] Lightning sweep + Zap icon pulse для rare/epic/legendary
- [x] Прогресс-бары "X/5" с shimmer + glow tip
- [x] Игровые вкладки (clip-path trapezoid) + rarity pills
- [x] Объёмные тактильные кнопки Купить / Открыть / Продать / Отправить
- [x] Анимация открытия сундука: shake → flash → card reveal с частицами
- [x] Toast-уведомления
- [x] TESTNET badge, язык RU/EN (UI свитч)

## Backlog (P1/P2)
- P1: Реальный backend (хранение коллекции, инвентарь, transactions)
- P1: Реализация страниц Кошелёк/Инвестирование/Рейтинг/Лидерборд
- P1: Merge-механика (5 карт → прокачка)
- P2: Web3-кошелёк (MetaMask/WalletConnect)
- P2: Локализация EN
- P2: Мобильная адаптация (сейчас responsive, но chest animation можно улучшить)
- P2: Sound FX на chest-open
