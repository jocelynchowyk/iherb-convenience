import { useEffect, useState } from 'react';
import {
  CheckCircle2,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  Truck,
  X,
} from 'lucide-react';
import {
  formatSGD,
  FREE_SG_SHIPPING_THRESHOLD,
  SG_SHIPPING_FEE,
  SupplementProduct,
} from '../data/supplements';
import { ResilientImage } from './ResilientImage';

export interface CartItem {
  product: SupplementProduct;
  variantId: string;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (productId: string, variantId: string, delta: number) => void;
  onRemoveItem: (productId: string, variantId: string) => void;
  onClearCart: () => void;
}

interface ConfirmedOrder {
  orderNumber: string;
  recipient: string;
  postalCode: string;
  courier: string;
  totalSGD: number;
  itemCount: number;
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState('');
  const [step, setStep] = useState<'bag' | 'checkout' | 'confirmed'>('bag');

  // Checkout fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [courier, setCourier] = useState('Ninja Van Standard (2–4 Business Days)');
  const [confirmedOrder, setConfirmedOrder] = useState<ConfirmedOrder | null>(
    null
  );

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && items.length > 0 && step === 'confirmed') {
      setStep('bag');
    }
  }, [isOpen, items.length, step]);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => {
    const v =
      item.product.variants.find((vr) => vr.id === item.variantId) ||
      item.product.variants[0];
    return sum + v.priceSGD * item.quantity;
  }, 0);

  const discount = appliedPromo === 'IHERBSG10' ? subtotal * 0.1 : 0;
  const discountedSubtotal = subtotal - discount;
  const qualifiesFreeShipping = discountedSubtotal >= FREE_SG_SHIPPING_THRESHOLD;
  const shippingFee =
    items.length === 0 ? 0 : qualifiesFreeShipping ? 0 : SG_SHIPPING_FEE;
  const total = discountedSubtotal + shippingFee;
  const remainingForFreeShipping = Math.max(
    0,
    FREE_SG_SHIPPING_THRESHOLD - discountedSubtotal
  );
  const progressPct = Math.min(
    100,
    (discountedSubtotal / FREE_SG_SHIPPING_THRESHOLD) * 100
  );

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoInput.trim().toUpperCase();
    if (code === 'IHERBSG10') {
      setAppliedPromo(code);
      setPromoError('');
    } else {
      setPromoError('Invalid code. Try IHERBSG10 for 10% off.');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const count = items.reduce((s, i) => s + i.quantity, 0);
    const orderNum = `SG-${Math.floor(40000 + Math.random() * 59999)}`;
    setConfirmedOrder({
      orderNumber: orderNum,
      recipient: fullName.trim(),
      postalCode: postalCode.trim(),
      courier,
      totalSGD: total,
      itemCount: count,
    });
    onClearCart();
    setAppliedPromo(null);
    setPromoInput('');
    setStep('confirmed');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Shopping cart and Singapore checkout"
      className="fixed inset-0 z-50 flex justify-end bg-[#1C241E]/50 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl border-l border-[#E5E8E3]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="px-6 py-4 border-b border-[#E5E8E3] flex items-center justify-between bg-[#FAFBF9]">
          <h2 className="font-display text-base font-bold text-[#1C241E]">
            {step === 'bag' &&
              `Shopping Cart (${items.reduce((s, i) => s + i.quantity, 0)})`}
            {step === 'checkout' && 'Singapore Delivery Checkout'}
            {step === 'confirmed' && 'Order Confirmed'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close shopping cart"
            className="p-2 min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg text-[#4A554C] hover:text-[#1C241E] hover:bg-[#EDF0EB] transition-colors"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Free SG Shipping Progress Bar */}
        {step !== 'confirmed' && (
          <div className="px-6 py-3 bg-[#F3F5F2] border-b border-[#E5E8E3]">
            <div className="flex items-center gap-2 text-xs font-medium text-[#1C241E] mb-2">
              <Truck className="w-4 h-4 text-[#3D7700] shrink-0" aria-hidden="true" />
              {qualifiesFreeShipping ? (
                <span>You have unlocked FREE Singapore shipping</span>
              ) : (
                <span className="tabular-nums">
                  Add {formatSGD(remainingForFreeShipping)} more for FREE Singapore shipping
                </span>
              )}
            </div>
            <div className="h-1.5 w-full rounded-full bg-[#DCE2D8] overflow-hidden">
              <div
                className="h-full bg-[#3D7700] transition-all duration-300"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        )}

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {step === 'confirmed' && confirmedOrder ? (
            <div className="py-8 space-y-5">
              <div className="w-12 h-12 rounded-full bg-[#EDF3E8] text-[#3D7700] flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-[#1C241E]">
                  Order #{confirmedOrder.orderNumber} Confirmed
                </h3>
                <p className="mt-1.5 text-sm text-[#4A554C] leading-relaxed">
                  Preparing climate-controlled dispatch to{' '}
                  <span className="font-medium text-[#1C241E]">
                    {confirmedOrder.recipient}
                  </span>{' '}
                  (Singapore {confirmedOrder.postalCode}).
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[#FAFBF9] border border-[#E5E8E3] space-y-2 text-xs text-[#4A554C]">
                <div className="flex justify-between">
                  <span>Items Ordered</span>
                  <span className="font-semibold text-[#1C241E] tabular-nums">
                    {confirmedOrder.itemCount}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Courier</span>
                  <span className="font-medium text-[#1C241E]">
                    {confirmedOrder.courier}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#E5E8E3] text-sm font-bold text-[#1C241E]">
                  <span>Total Paid (GST Included)</span>
                  <span className="tabular-nums">
                    {formatSGD(confirmedOrder.totalSGD)}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setStep('bag');
                  onClose();
                }}
                className="w-full min-h-[44px] rounded-lg bg-[#3D7700] hover:bg-[#315F00] text-white text-sm font-semibold transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <ShoppingBag
                className="w-10 h-10 mx-auto text-[#8C998B]"
                aria-hidden="true"
              />
              <h3 className="font-display text-base font-semibold text-[#1C241E]">
                Your cart is empty
              </h3>
              <p className="text-sm text-[#5A655C] max-w-xs mx-auto">
                Add vitamins, minerals, or probiotics to unlock free climate-controlled shipping to Singapore over SG$30.
              </p>
            </div>
          ) : step === 'bag' ? (
            <div className="divide-y divide-[#ECEFE9]">
              {items.map((item) => {
                const variant =
                  item.product.variants.find((v) => v.id === item.variantId) ||
                  item.product.variants[0];
                return (
                  <div
                    key={`${item.product.id}-${variant.id}`}
                    className="py-4 first:pt-0 flex gap-4"
                  >
                    <div className="w-20 h-20 rounded-lg bg-[#F3F5F2] border border-[#E5E8E3] overflow-hidden shrink-0">
                      <ResilientImage
                        src={item.product.image}
                        alt={item.product.name}
                        title={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-medium text-[#5A655C]">
                        {item.product.brand}
                      </p>
                      <h3 className="font-display text-sm font-semibold text-[#1C241E] line-clamp-2 leading-snug">
                        {item.product.name}
                      </h3>
                      <p className="text-xs text-[#5A655C] mt-0.5">
                        {variant.label}
                      </p>

                      <div className="mt-3 flex items-center justify-between gap-2">
                        <div className="inline-flex items-center border border-[#D4DBD0] rounded-md bg-[#FAFBF9]">
                          <button
                            type="button"
                            aria-label={`Decrease ${item.product.name} quantity`}
                            onClick={() =>
                              onUpdateQty(item.product.id, variant.id, -1)
                            }
                            className="w-8 h-8 flex items-center justify-center text-[#4A554C] hover:text-[#1C241E]"
                          >
                            <Minus className="w-3.5 h-3.5" aria-hidden="true" />
                          </button>
                          <span className="w-7 text-center text-xs font-semibold tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            aria-label={`Increase ${item.product.name} quantity`}
                            onClick={() =>
                              onUpdateQty(item.product.id, variant.id, 1)
                            }
                            className="w-8 h-8 flex items-center justify-center text-[#4A554C] hover:text-[#1C241E]"
                          >
                            <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                          </button>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="font-display text-sm font-bold text-[#1C241E] tabular-nums">
                            {formatSGD(variant.priceSGD * item.quantity)}
                          </span>
                          <button
                            type="button"
                            aria-label={`Remove ${item.product.name}`}
                            onClick={() =>
                              onRemoveItem(item.product.id, variant.id)
                            }
                            className="p-1.5 text-[#78837A] hover:text-[#B91C1C] transition-colors rounded"
                          >
                            <Trash2 className="w-4 h-4" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <form
              id="sg-checkout-form"
              onSubmit={handlePlaceOrder}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-semibold text-[#1C241E] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Tan Wei Ming"
                  className="w-full min-h-[42px] px-3 py-2 rounded-lg border border-[#D4DBD0] text-sm focus:outline-none focus:border-[#458500]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#1C241E] mb-1">
                  Singapore Mobile (+65)
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +65 9123 4567"
                  className="w-full min-h-[42px] px-3 py-2 rounded-lg border border-[#D4DBD0] text-sm focus:outline-none focus:border-[#458500]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#1C241E] mb-1">
                  Street Address &amp; Unit Number
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. Blk 128 Tampines St 11, #08-412"
                  className="w-full min-h-[42px] px-3 py-2 rounded-lg border border-[#D4DBD0] text-sm focus:outline-none focus:border-[#458500]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#1C241E] mb-1">
                  6-Digit Postal Code
                </label>
                <input
                  type="text"
                  required
                  pattern="[0-9]{6}"
                  maxLength={6}
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="e.g. 521128"
                  className="w-full min-h-[42px] px-3 py-2 rounded-lg border border-[#D4DBD0] text-sm font-mono tabular-nums focus:outline-none focus:border-[#458500]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#1C241E] mb-1">
                  Singapore Courier Method
                </label>
                <select
                  value={courier}
                  onChange={(e) => setCourier(e.target.value)}
                  className="w-full min-h-[42px] px-3 py-2 rounded-lg border border-[#D4DBD0] bg-white text-sm focus:outline-none focus:border-[#458500]"
                >
                  <option>Ninja Van Standard (2–4 Business Days)</option>
                  <option>SingPost Tracked Doorstep (2–4 Business Days)</option>
                  <option>DHL Express Direct Air (1–2 Business Days)</option>
                </select>
              </div>
            </form>
          )}
        </div>

        {/* Drawer Footer Totals */}
        {items.length > 0 && step !== 'confirmed' && (
          <div className="px-6 py-4 border-t border-[#E5E8E3] bg-[#FAFBF9] space-y-4">
            {step === 'bag' && (
              <form onSubmit={handleApplyPromo} className="space-y-1.5">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Promo code (IHERBSG10)"
                    aria-label="Promo code"
                    className="flex-1 min-h-[40px] px-3 py-1.5 rounded-lg border border-[#D4DBD0] bg-white text-xs focus:outline-none focus:border-[#458500]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-1.5 min-h-[40px] rounded-lg border border-[#D4DBD0] bg-white hover:bg-[#F3F5F2] text-xs font-semibold text-[#1C241E]"
                  >
                    Apply
                  </button>
                </div>
                {appliedPromo && (
                  <p className="text-xs text-[#3D7700] font-medium">
                    Promo {appliedPromo} applied (-10%)
                  </p>
                )}
                {promoError && (
                  <p className="text-xs text-[#B91C1C]">{promoError}</p>
                )}
              </form>
            )}

            <div className="space-y-1.5 text-xs text-[#4A554C]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="tabular-nums font-medium text-[#1C241E]">
                  {formatSGD(subtotal)}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[#3D7700]">
                  <span>Promo Discount (10%)</span>
                  <span className="tabular-nums font-medium">
                    -{formatSGD(discount)}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Singapore Shipping</span>
                <span className="tabular-nums font-medium text-[#1C241E]">
                  {shippingFee === 0 ? 'FREE' : formatSGD(shippingFee)}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#E5E8E3] text-sm font-bold text-[#1C241E]">
                <span>Estimated Total (Incl. SG GST)</span>
                <span className="tabular-nums">{formatSGD(total)}</span>
              </div>
            </div>

            {step === 'bag' ? (
              <button
                type="button"
                onClick={() => setStep('checkout')}
                className="w-full min-h-[44px] rounded-lg bg-[#3D7700] hover:bg-[#315F00] text-white text-sm font-semibold transition-colors"
              >
                Proceed to Singapore Checkout
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep('bag')}
                  className="px-4 min-h-[44px] rounded-lg border border-[#D4DBD0] bg-white text-sm font-medium text-[#3F4A41] hover:bg-[#F3F5F2]"
                >
                  Back
                </button>
                <button
                  type="submit"
                  form="sg-checkout-form"
                  className="flex-1 min-h-[44px] rounded-lg bg-[#3D7700] hover:bg-[#315F00] text-white text-sm font-semibold transition-colors"
                >
                  Place Order · {formatSGD(total)}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
