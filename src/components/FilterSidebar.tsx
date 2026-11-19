import { RotateCcw } from 'lucide-react';
import { CATEGORIES, SupplementCategory } from '../data/supplements';

export type PriceBucket = 'all' | 'under25' | '25to45' | 'over45';

interface FilterSidebarProps {
  activeCategory: SupplementCategory | 'All';
  onSelectCategory: (cat: SupplementCategory | 'All') => void;
  selectedBrands: string[];
  onToggleBrand: (brand: string) => void;
  selectedGoals: string[];
  onToggleGoal: (goal: string) => void;
  selectedDietary: string[];
  onToggleDietary: (diet: string) => void;
  onlyITested: boolean;
  onToggleITested: () => void;
  minRating: number;
  onChangeMinRating: (rating: number) => void;
  priceBucket: PriceBucket;
  onChangePriceBucket: (bucket: PriceBucket) => void;
  brandCounts: Record<string, number>;
  categoryCounts: Record<string, number>;
  allGoals: string[];
  allDietary: string[];
  hasActiveFilters: boolean;
  onResetFilters: () => void;
}

export function FilterSidebar({
  activeCategory,
  onSelectCategory,
  selectedBrands,
  onToggleBrand,
  selectedGoals,
  onToggleGoal,
  selectedDietary,
  onToggleDietary,
  onlyITested,
  onToggleITested,
  minRating,
  onChangeMinRating,
  priceBucket,
  onChangePriceBucket,
  brandCounts,
  categoryCounts,
  allGoals,
  allDietary,
  hasActiveFilters,
  onResetFilters,
}: FilterSidebarProps) {
  const brands = Object.keys(brandCounts).sort();

  return (
    <aside aria-label="Product filters" className="space-y-6 text-sm">
      <div className="flex items-center justify-between pb-3 border-b border-[#E5E8E3]">
        <h2 className="font-display text-base font-semibold text-[#1C241E]">
          Filters
        </h2>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#3D7700] hover:text-[#2D5900] py-1 px-1.5 rounded transition-colors focus-visible:outline-2 focus-visible:outline-[#458500]"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            Reset
          </button>
        )}
      </div>

      {/* Category Facet */}
      <div className="pb-5 border-b border-[#E5E8E3]">
        <h3 className="font-display text-xs font-semibold text-[#1C241E] tracking-wide mb-3">
          Category
        </h3>
        <ul className="space-y-1">
          <li>
            <button
              type="button"
              onClick={() => onSelectCategory('All')}
              className={`w-full flex items-center justify-between py-1.5 px-2 rounded-md text-left text-[13px] transition-colors ${
                activeCategory === 'All'
                  ? 'bg-[#EDF3E8] text-[#2D5900] font-semibold'
                  : 'text-[#4A554C] hover:text-[#1C241E] hover:bg-[#F3F5F2]'
              }`}
            >
              <span>All Supplements</span>
              <span className="tabular-nums text-xs text-[#6C776E]">
                {Object.values(categoryCounts).reduce((a, b) => a + b, 0)}
              </span>
            </button>
          </li>
          {CATEGORIES.map((cat) => (
            <li key={cat}>
              <button
                type="button"
                onClick={() => onSelectCategory(cat)}
                className={`w-full flex items-center justify-between py-1.5 px-2 rounded-md text-left text-[13px] transition-colors ${
                  activeCategory === cat
                    ? 'bg-[#EDF3E8] text-[#2D5900] font-semibold'
                    : 'text-[#4A554C] hover:text-[#1C241E] hover:bg-[#F3F5F2]'
                }`}
              >
                <span className="truncate pr-2">{cat}</span>
                <span className="tabular-nums text-xs text-[#6C776E]">
                  {categoryCounts[cat] || 0}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Brands Facet */}
      <div className="pb-5 border-b border-[#E5E8E3]">
        <h3 className="font-display text-xs font-semibold text-[#1C241E] tracking-wide mb-3">
          Brands
        </h3>
        <div className="space-y-2">
          {brands.map((brand) => {
            const checked = selectedBrands.includes(brand);
            return (
              <label
                key={brand}
                className="flex items-center justify-between gap-2 cursor-pointer py-0.5 text-[13px] text-[#3F4A41] hover:text-[#1C241E]"
              >
                <span className="flex items-center gap-2.5 min-w-0">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onToggleBrand(brand)}
                    className="w-4 h-4 rounded border-[#C6CFC2] text-[#458500] focus:ring-[#458500] accent-[#3D7700]"
                  />
                  <span className="truncate">{brand}</span>
                </span>
                <span className="tabular-nums text-xs text-[#6C776E] shrink-0">
                  {brandCounts[brand]}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Price Range SG$ */}
      <div className="pb-5 border-b border-[#E5E8E3]">
        <h3 className="font-display text-xs font-semibold text-[#1C241E] tracking-wide mb-3">
          Price (SG$)
        </h3>
        <div className="space-y-2">
          {(
            [
              { id: 'all', label: 'All Prices' },
              { id: 'under25', label: 'Under SG$25' },
              { id: '25to45', label: 'SG$25 – SG$45' },
              { id: 'over45', label: 'SG$45 & Above' },
            ] as const
          ).map((opt) => (
            <label
              key={opt.id}
              className="flex items-center gap-2.5 cursor-pointer py-0.5 text-[13px] text-[#3F4A41] hover:text-[#1C241E]"
            >
              <input
                type="radio"
                name="priceBucket"
                checked={priceBucket === opt.id}
                onChange={() => onChangePriceBucket(opt.id)}
                className="w-4 h-4 border-[#C6CFC2] text-[#458500] focus:ring-[#458500] accent-[#3D7700]"
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Health Goals */}
      <div className="pb-5 border-b border-[#E5E8E3]">
        <h3 className="font-display text-xs font-semibold text-[#1C241E] tracking-wide mb-3">
          Health Goals
        </h3>
        <div className="space-y-2">
          {allGoals.map((goal) => (
            <label
              key={goal}
              className="flex items-center gap-2.5 cursor-pointer py-0.5 text-[13px] text-[#3F4A41] hover:text-[#1C241E]"
            >
              <input
                type="checkbox"
                checked={selectedGoals.includes(goal)}
                onChange={() => onToggleGoal(goal)}
                className="w-4 h-4 rounded border-[#C6CFC2] accent-[#3D7700]"
              />
              <span>{goal}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Dietary & Testing */}
      <div className="pb-5 border-b border-[#E5E8E3]">
        <h3 className="font-display text-xs font-semibold text-[#1C241E] tracking-wide mb-3">
          Dietary &amp; Quality
        </h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2.5 cursor-pointer py-0.5 text-[13px] text-[#3F4A41] hover:text-[#1C241E]">
            <input
              type="checkbox"
              checked={onlyITested}
              onChange={onToggleITested}
              className="w-4 h-4 rounded border-[#C6CFC2] accent-[#3D7700]"
            />
            <span>iTested Lab Verified</span>
          </label>
          {allDietary.map((diet) => (
            <label
              key={diet}
              className="flex items-center gap-2.5 cursor-pointer py-0.5 text-[13px] text-[#3F4A41] hover:text-[#1C241E]"
            >
              <input
                type="checkbox"
                checked={selectedDietary.includes(diet)}
                onChange={() => onToggleDietary(diet)}
                className="w-4 h-4 rounded border-[#C6CFC2] accent-[#3D7700]"
              />
              <span>{diet}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Minimum Rating */}
      <div>
        <h3 className="font-display text-xs font-semibold text-[#1C241E] tracking-wide mb-3">
          Customer Rating
        </h3>
        <div className="space-y-2">
          {[
            { value: 0, label: 'All Ratings' },
            { value: 4.8, label: '4.8 Stars & Up' },
            { value: 4.5, label: '4.5 Stars & Up' },
          ].map((opt) => (
            <label
              key={opt.value}
              className="flex items-center gap-2.5 cursor-pointer py-0.5 text-[13px] text-[#3F4A41] hover:text-[#1C241E]"
            >
              <input
                type="radio"
                name="minRating"
                checked={minRating === opt.value}
                onChange={() => onChangeMinRating(opt.value)}
                className="w-4 h-4 border-[#C6CFC2] accent-[#3D7700]"
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
