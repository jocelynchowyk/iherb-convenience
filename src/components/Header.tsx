import { useState } from 'react';
import { ShoppingBag, X } from 'lucide-react';
import { formatSGD, SupplementCategory } from '../data/supplements';

interface HeaderProps {
  cartCount: number;
  cartSubtotal: number;
  activeCategory: SupplementCategory | 'All';
  onSelectCategory: (cat: SupplementCategory | 'All') => void;
  onScrollToBrands: () => void;
  onOpenCart: () => void;
}

export function Header({
  cartCount,
  cartSubtotal,
  activeCategory,
  onSelectCategory,
  onScrollToBrands,
  onOpenCart,
}: HeaderProps) {
  const [showPromo, setShowPromo] = useState(true);

  const handleNavCategory = (cat: SupplementCategory | 'All') => {
    onSelectCategory(cat);
    const catalogEl = document.getElementById('catalog-section');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {showPromo && (
        <div className="bg-[#234300] text-white text-xs h-9 px-4 flex items-center justify-center relative">
          <p className="truncate pr-8 text-center font-medium">
            Free Singapore shipping on orders over SG$30 · Use code IHERBSG10 for 10% off
          </p>
          <button
            type="button"
            onClick={() => setShowPromo(false)}
            aria-label="Dismiss promotion banner"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-white/80 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded"
          >
            <X className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      )}

      <header className="sticky top-0 z-30 bg-[#FAFBF9]/95 backdrop-blur-sm border-b border-[#E5E8E3]">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single-element Brand Wordmark */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              onSelectCategory('All');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-display text-xl font-bold tracking-tight text-[#386E00] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#458500] rounded"
          >
            iHerb
          </a>

          {/* Zone 2: 5 concise single-line text navigation links */}
          <nav
            aria-label="Supplement categories"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-[#4A554C]"
          >
            <button
              type="button"
              onClick={() => handleNavCategory('All')}
              className={`whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#458500] ${
                activeCategory === 'All'
                  ? 'text-[#1C241E] border-[#458500]'
                  : 'border-transparent hover:text-[#1C241E] hover:border-[#C8D1C4]'
              }`}
            >
              Supplements
            </button>
            <button
              type="button"
              onClick={() => handleNavCategory('Vitamins')}
              className={`whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#458500] ${
                activeCategory === 'Vitamins'
                  ? 'text-[#1C241E] border-[#458500]'
                  : 'border-transparent hover:text-[#1C241E] hover:border-[#C8D1C4]'
              }`}
            >
              Vitamins
            </button>
            <button
              type="button"
              onClick={() => handleNavCategory('Minerals & Magnesium')}
              className={`whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#458500] ${
                activeCategory === 'Minerals & Magnesium'
                  ? 'text-[#1C241E] border-[#458500]'
                  : 'border-transparent hover:text-[#1C241E] hover:border-[#C8D1C4]'
              }`}
            >
              Minerals
            </button>
            <button
              type="button"
              onClick={() => handleNavCategory('Probiotics & Gut Health')}
              className={`whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#458500] ${
                activeCategory === 'Probiotics & Gut Health'
                  ? 'text-[#1C241E] border-[#458500]'
                  : 'border-transparent hover:text-[#1C241E] hover:border-[#C8D1C4]'
              }`}
            >
              Probiotics
            </button>
            <button
              type="button"
              onClick={onScrollToBrands}
              className="whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:text-[#1C241E] hover:border-[#C8D1C4] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#458500]"
            >
              Top Brands
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`Open shopping cart with ${cartCount} items`}
            className="inline-flex items-center gap-2.5 px-4 py-2.5 min-h-[40px] rounded-lg bg-[#3D7700] hover:bg-[#315F00] text-white text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3D7700]"
          >
            <ShoppingBag className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span className="tabular-nums">
              Cart ({cartCount}){cartCount > 0 ? ` · ${formatSGD(cartSubtotal)}` : ''}
            </span>
          </button>
        </div>
      </header>
    </>
  );
}
