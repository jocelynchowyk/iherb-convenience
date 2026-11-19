import { CATEGORIES, SupplementCategory } from '../data/supplements';

interface FooterProps {
  onSelectCategory: (cat: SupplementCategory | 'All') => void;
  onOpenCart: () => void;
}

export function Footer({ onSelectCategory, onOpenCart }: FooterProps) {
  const scrollToCatalog = (cat: SupplementCategory | 'All') => {
    onSelectCategory(cat);
    const el = document.getElementById('catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <footer className="border-t border-[#E5E8E3] bg-[#F3F5F2] text-[#4A554C]">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-2.5">
            <span className="font-display text-lg font-bold text-[#386E00] block">
              iHerb
            </span>
            <p className="text-xs leading-relaxed text-[#5A655C]">
              Authentic wellness supplements shipped direct from climate-controlled
              distribution centers to Singapore in SG$.
            </p>
          </div>

          <div>
            <h3 className="font-display text-xs font-semibold text-[#1C241E] mb-3">
              Supplement Categories
            </h3>
            <ul className="space-y-2 text-xs">
              {CATEGORIES.map((cat) => (
                <li key={cat}>
                  <button
                    type="button"
                    onClick={() => scrollToCatalog(cat)}
                    className="hover:text-[#1C241E] transition-colors text-left"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-xs font-semibold text-[#1C241E] mb-3">
              Singapore Storefront
            </h3>
            <ul className="space-y-2 text-xs">
              <li>Free SG Delivery over SG$30</li>
              <li>Currency: Singapore Dollar (SG$)</li>
              <li>9% SG GST Included at Checkout</li>
              <li>
                <button
                  type="button"
                  onClick={onOpenCart}
                  className="hover:text-[#1C241E] underline decoration-[#C8D1C4]"
                >
                  View Shopping Cart
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-xs font-semibold text-[#1C241E] mb-3">
              Quality &amp; Standards
            </h3>
            <ul className="space-y-2 text-xs">
              <li>iTested Independent Lab Reports</li>
              <li>Direct Authorized Manufacturer Supply</li>
              <li>Expiration Dates Listed on Every Batch</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#DFE4DC] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-[#6C776E]">
          <p>© 2026 iHerb Singapore Storefront Replica. All prices shown in SG$.</p>
          <p>
            Statements regarding dietary supplements are for informational purposes.
          </p>
        </div>
      </div>
    </footer>
  );
}
