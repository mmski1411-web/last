import React from 'react';
import { CreditCard, Package, Zap, Crown } from 'lucide-react';

const STATS = [
  { id: 'cards', label: 'Карточек', value: '20', hint: 'UT', icon: CreditCard, color: '#00F0FF' },
  { id: 'chests', label: 'Сундуков', value: '2', hint: 'шт', icon: Package, color: '#B026FF' },
  { id: 'merge', label: 'Готово к слиянию', value: '0', hint: '5 карт = прокачка', icon: Zap, color: '#FFD700' },
  { id: 'epic', label: 'Эпик / Легенда', value: '0', hint: 'редкие карточки', icon: Crown, color: '#FFB800' },
];

const StatsBento = () => {
  return (
    <div
      className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 w-full"
      data-testid="stats-bento"
    >
      {STATS.map((s) => {
        const Icon = s.icon;
        return (
          <div
            key={s.id}
            data-testid={`stat-${s.id}`}
            className="relative glass rounded-xl p-4 md:p-5 overflow-hidden hover-lift group"
            style={{ border: `1px solid ${s.color}22` }}
          >
            <div
              className="absolute -top-8 -right-8 w-24 h-24 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity"
              style={{ background: s.color }}
            />
            <div className="relative flex items-start justify-between">
              <div>
                <div className="text-[10px] md:text-xs font-display font-bold uppercase tracking-widest text-gray-400">
                  {s.label}
                </div>
                <div className="flex items-baseline gap-2 mt-1.5">
                  <span
                    className="font-mono-data text-2xl md:text-3xl font-bold"
                    style={{ color: s.color, textShadow: `0 0 12px ${s.color}66` }}
                  >
                    {s.value}
                  </span>
                  <span className="text-[10px] md:text-xs text-gray-500 font-mono-data uppercase">{s.hint}</span>
                </div>
              </div>
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{
                  background: `${s.color}15`,
                  border: `1px solid ${s.color}44`,
                  boxShadow: `inset 0 0 10px ${s.color}22`,
                }}
              >
                <Icon size={16} style={{ color: s.color }} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsBento;
