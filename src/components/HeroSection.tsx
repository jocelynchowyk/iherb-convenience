import { Search, X } from 'lucide-react';
import {
  CATEGORIES,
  HERO_SHOWCASE_IMAGE,
  SupplementCategory,
} from '../data/supplements';
import { ResilientImage } from './ResilientImage';

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  activeCategory: SupplementCategory | 'All';
  onSelectCategory: (cat: SupplementCategory | 'All') => void;
}

export function HeroSection({
  searchQuery,
  onSearchChange,
  activeCategory,
  onSelectCategory,
}: HeroSectionProps) {
  return (
    <section id="top" className="border-b border-[#E5E8E3] bg-white">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        {/* Clean Breadcrumb & Region Metadata */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs text-[#5A655C] mb-5"
        >
          <button
            type="button"
            onClick={() => onSelectCategory('All')}
            className="hover:text-[#1C241E] transition-colors"
          >
            Home
          </button>
          <span aria-hidden="true">/</span>
          <span className="text-[#1C241E] font-medium">Supplements</span>
          <span aria-hidden="true">·</span>
          <span>Singapore (SG$)</span>
        </nav>

        {/* Split Hero Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            <div>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-[#1C241E] leading-[1.15] [text-wrap:balance]">
                Supplements for Daily Wellness &amp; Performance
              </h1>
              <p className="mt-3 text-[15px] sm:text-base text-[#4A554C] leading-relaxed max-w-2xl">
                Clinically verified vitamins, chelated minerals, molecularly distilled
                omega-3s, and shelf-stable probiotics—stored in climate-controlled hubs
                and delivered direct to Singapore.
              </p>
            </div>

            {/* Search Input directly reachable in first navigation layer */}
            <div className="space-y-4">
              <div className="relative max-w-xl">
                <Search
                  className="w-4 h-4 text-[#5A655C] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Search vitamins, magnesium, probiotics, or brands..."
                  aria-label="Search supplements"
                  className="w-full min-h-[44px] pl-10 pr-10 py-2.5 rounded-lg bg-[#FAFBF9] border border-[#D4DBD0] text-sm text-[#1C241E] placeholder:text-[#6C776E] focus:outline-none focus:border-[#458500] focus:ring-2 focus:ring-[#458500]/15 transition-colors"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => onSearchChange('')}
                    aria-label="Clear search query"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 text-[#5A655C] hover:text-[#1C241E] rounded"
                  >
                    <X className="w-4 h-4" aria-hidden="true" />
                  </button>
                )}
              </div>

              {/* Interactive Subcategory Tabs */}
              <div
                role="tablist"
                aria-label="Quick category filter"
                className="flex flex-wrap items-center gap-1.5"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === 'All'}
                  onClick={() => onSelectCategory('All')}
                  className={`px-3.5 py-2 min-h-[40px] rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#458500] ${
                    activeCategory === 'All'
                      ? 'bg-[#1C241E] text-white'
                      : 'bg-[#F3F5F2] text-[#3F4A41] hover:bg-[#E7ECE5]'
                  }`}
                >
                  All Supplements
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    role="tab"
                    aria-selected={activeCategory === cat}
                    onClick={() => onSelectCategory(cat)}
                    className={`px-3.5 py-2 min-h-[40px] rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#458500] ${
                      activeCategory === cat
                        ? 'bg-[#1C241E] text-white'
                        : 'bg-[#F3F5F2] text-[#3F4A41] hover:bg-[#E7ECE5]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Quiet unboxed trust summary */}
            <div className="pt-2 border-t border-[#ECEFE9] flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#5A655C]">
              <span>100% Authentic Direct Sourcing</span>
              <span aria-hidden="true">·</span>
              <span>iTested Third-Party Lab Verified</span>
              <span aria-hidden="true">·</span>
              <span>2–4 Day SG Delivery</span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="h-56 sm:h-64 lg:h-full rounded-xl overflow-hidden bg-[#F3F5F2] border border-[#E5E8E3]">
              <ResilientImage
                src={HERO_SHOWCASE_IMAGE}
                alt="Curated iHerb Singapore supplements lineup on limestone plinth"
                title="iHerb Singapore Supplements"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
