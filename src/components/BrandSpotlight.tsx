import { ArrowUpRight, ShieldCheck, ThermometerSnowflake, Truck } from 'lucide-react';
import { TOP_BRANDS } from '../data/supplements';

interface BrandSpotlightProps {
  selectedBrands: string[];
  onSelectBrand: (brandName: string) => void;
}

export function BrandSpotlight({
  selectedBrands,
  onSelectBrand,
}: BrandSpotlightProps) {
  const handlePickBrand = (name: string) => {
    onSelectBrand(name);
    const catalogEl = document.getElementById('catalog-section');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="brands-section"
      className="border-t border-[#E5E8E3] bg-white py-12 lg:py-16"
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Brands Grid */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <h2 className="font-display text-2xl font-bold text-[#1C241E] tracking-tight">
                Top Supplement Brands in Singapore
              </h2>
              <p className="mt-1 text-sm text-[#4A554C]">
                Select any brand below to filter the catalog directly.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TOP_BRANDS.map((brand) => {
              const isSelected = selectedBrands.includes(brand.name);
              return (
                <button
                  key={brand.name}
                  type="button"
                  onClick={() => handlePickBrand(brand.name)}
                  className={`group p-5 rounded-xl border text-left transition-all flex items-start justify-between gap-4 ${
                    isSelected
                      ? 'border-[#3D7700] bg-[#EDF3E8]'
                      : 'border-[#E5E8E3] bg-[#FAFBF9] hover:border-[#B6C2B0] hover:bg-white'
                  }`}
                >
                  <div>
                    <h3 className="font-display text-base font-semibold text-[#1C241E]">
                      {brand.name}
                    </h3>
                    <p className="mt-1 text-xs text-[#5A655C]">{brand.tagline}</p>
                  </div>
                  <ArrowUpRight
                    className="w-4 h-4 text-[#5A655C] group-hover:text-[#3D7700] shrink-0 mt-0.5 transition-colors"
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Quality & Climate-Controlled SG Commitment */}
        <div className="pt-10 border-t border-[#E5E8E3] grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-3.5">
            <ShieldCheck
              className="w-5 h-5 text-[#3D7700] shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <div>
              <h3 className="font-display text-sm font-semibold text-[#1C241E]">
                iTested Third-Party Verification
              </h3>
              <p className="mt-1 text-xs text-[#4A554C] leading-relaxed">
                Independent laboratories test house-brand batches for label potency,
                heavy metals, and microbial purity.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3.5">
            <ThermometerSnowflake
              className="w-5 h-5 text-[#3D7700] shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <div>
              <h3 className="font-display text-sm font-semibold text-[#1C241E]">
                Climate-Controlled Fulfillment
              </h3>
              <p className="mt-1 text-xs text-[#4A554C] leading-relaxed">
                Stored in GMP-certified, temperature-regulated hubs before air
                dispatch to protect softgels and live probiotics in humid weather.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3.5">
            <Truck
              className="w-5 h-5 text-[#3D7700] shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <div>
              <h3 className="font-display text-sm font-semibold text-[#1C241E]">
                Direct to Singapore in 2–4 Days
              </h3>
              <p className="mt-1 text-xs text-[#4A554C] leading-relaxed">
                Transparent SG$ pricing with GST calculated upfront and free tracked
                doorstep delivery on orders over SG$30.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
