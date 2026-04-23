import React from 'react';
import { ChevronDown } from 'lucide-react';
import { CATEGORIES, RARITIES, SORT_OPTIONS } from '../data/cards';

const FilterTabs = ({
  activeCategory,
  onCategoryChange,
  activeRarity,
  onRarityChange,
  sort,
  onSortChange,
}) => {
  const [sortOpen, setSortOpen] = React.useState(false);

  return (
    <div className="space-y-4" data-testid="filter-tabs">
      {/* Category tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {CATEGORIES.map((c) => {
          const active = activeCategory === c.id;
          return (
            <button
              key={c.id}
              data-testid={`cat-${c.id}`}
              onClick={() => onCategoryChange(c.id)}
              className={`relative whitespace-nowrap px-5 py-2.5 font-display font-bold uppercase tracking-widest text-xs transition-all ${
                active
                  ? 'text-cyan-300'
                  : 'text-gray-400 hover:text-white'
              }`}
              style={
                active
                  ? {
                      background:
                        'linear-gradient(180deg, rgba(0,240,255,0.15), rgba(0,240,255,0.02))',
                      clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 100%, 0 100%)',
                      boxShadow: 'inset 0 -2px 0 #00F0FF, 0 0 12px rgba(0,240,255,0.25)',
                    }
                  : {
                      clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 100%, 0 100%)',
                      background: 'rgba(255,255,255,0.02)',
                    }
              }
            >
              {c.label}
            </button>
          );
        })}
      </div>

      {/* Rarity + sort row */}
      <div className="flex flex-wrap items-center gap-3 justify-between">
        <div className="flex items-center gap-2 flex-wrap">
          {RARITIES.map((r) => {
            const active = activeRarity === r.id;
            return (
              <button
                key={r.id}
                data-testid={`rarity-${r.id}`}
                onClick={() => onRarityChange(r.id)}
                className="font-display font-bold uppercase tracking-widest text-[11px] px-3.5 py-1.5 rounded-full transition-all"
                style={{
                  color: active ? '#000' : r.color,
                  background: active ? r.color : `${r.color}10`,
                  border: `1px solid ${r.color}${active ? 'ff' : '55'}`,
                  boxShadow: active ? `0 0 16px ${r.color}88` : 'none',
                }}
              >
                {r.label}
              </button>
            );
          })}
        </div>

        {/* Sort */}
        <div className="relative">
          <button
            data-testid="sort-btn"
            onClick={() => setSortOpen((s) => !s)}
            className="flex items-center gap-2 px-4 py-2 rounded-md glass-light font-display font-bold uppercase tracking-widest text-xs text-white hover:border-cyan-400/50 transition"
          >
            {SORT_OPTIONS.find((s) => s.id === sort)?.label || 'По умолч.'}
            <ChevronDown size={14} className={`transition ${sortOpen ? 'rotate-180' : ''}`} />
          </button>
          {sortOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 glass rounded-lg border border-white/10 overflow-hidden z-20">
              {SORT_OPTIONS.map((s) => (
                <button
                  key={s.id}
                  data-testid={`sort-${s.id}`}
                  onClick={() => {
                    onSortChange(s.id);
                    setSortOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-xs font-display font-bold uppercase tracking-widest transition ${
                    sort === s.id
                      ? 'text-cyan-400 bg-cyan-400/10'
                      : 'text-gray-300 hover:bg-white/5'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterTabs;
