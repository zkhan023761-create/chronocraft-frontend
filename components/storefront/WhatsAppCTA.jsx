'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function WhatsAppCTA({ product }) {
  const { data: session, status: authStatus } = useSession();
  const router = useRouter();
  
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Pre-fill name if session loads
  useEffect(() => {
    if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [session]);

  const handleBuyClick = (e) => {
    e.preventDefault();
    if (authStatus !== 'authenticated') {
      router.push(`/login?redirect=shop/${product.slug}`);
      return;
    }
    setIsOpen(true);
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !street.trim() || !city.trim() || !state.trim() || !pincode.trim()) {
      setErrorMsg('Please fill in all details before proceeding.');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    const token = session?.user?.accessToken;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

    const orderPayload = {
      items: [
        {
          id: product._id || product.id,
          name: product.name,
          price: product.price,
          image: product.images?.[0] || '',
          sku: product.sku,
          stock: product.stock,
          quantity: 1,
          slug: product.slug
        }
      ],
      subtotal: product.price,
      discount: 0,
      total: product.price,
      shippingAddress: {
        name: name.trim(),
        street: street.trim(),
        city: city.trim(),
        state: state.trim(),
        pincode: pincode.trim(),
        phone: phone.trim()
      },
      paymentProvider: 'whatsapp'
    };

    try {
      const res = await fetch(`${apiUrl}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Tenant-ID': process.env.NEXT_PUBLIC_TENANT_ID || '',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderPayload)
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to place order.');
      }

      // Order created successfully! Now redirect to WhatsApp with order number.
      const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919999999999';
      const formattedMessage = `Hello! I would like to purchase the following timepiece:

📦 *Order Number:* ${data.order.orderNumber}
📦 *Watch:* ${product.name} (SKU: ${product.sku})
💰 *Price:* ₹${product.price.toLocaleString('en-IN')}

🚚 *Shipping Location:*
👤 *Name:* ${name.trim()}
📞 *Phone:* ${phone.trim()}
📍 *Address:* ${street.trim()}, ${city.trim()}, ${state.trim()} - ${pincode.trim()}`;

      const encodedText = encodeURIComponent(formattedMessage);
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;

      setIsOpen(false);
      window.open(whatsappUrl, '_blank');
    } catch (err) {
      setErrorMsg(err.message || 'An error occurred while creating order.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Shimmer keyframe — injected once */}
      <style>{`
        @keyframes wa-shimmer {
          0%   { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(250%) skewX(-15deg); }
        }
        .wa-shimmer::after {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 40%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255,255,255,0.22) 50%,
            transparent 100%
          );
          animation: wa-shimmer 2.8s ease-in-out infinite;
          animation-delay: 1.5s;
          pointer-events: none;
        }
      `}</style>

      <button
        onClick={handleBuyClick}
        className="wa-shimmer relative overflow-hidden inline-flex items-center justify-center gap-3 w-full py-4
          bg-[#25D366] text-white font-body font-semibold uppercase tracking-wider text-sm
          transition-all duration-300
          hover:bg-[#1ebe5d] hover:shadow-[0_6px_24px_rgba(37,211,102,0.35)] hover:-translate-y-0.5
          active:translate-y-0 active:shadow-none"
      >
        {/* WhatsApp logo */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        Buy Now
      </button>

      {/* Shipping Details Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-[4px] p-4 animate-fadeIn">
          <div className="bg-[#111111] border border-white/10 w-full max-w-lg p-6 md:p-8 relative shadow-[0_24px_50px_rgba(0,0,0,0.85)] rounded-sm">
            <button
              onClick={() => { if (!submitting) { setIsOpen(false); setErrorMsg(''); } }}
              className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors text-sm font-body uppercase tracking-wider"
              disabled={submitting}
            >
              ✕ Close
            </button>
            <h3 className="font-display text-xl font-bold text-white mb-2">
              Shipping & Contact Details
            </h3>
            <p className="text-white/40 text-xs font-body mb-6 uppercase tracking-wider">
              Please enter your location to finalize your watch purchase on WhatsApp
            </p>

            {errorMsg && (
              <p className="text-red-400 text-sm font-body mb-4 bg-red-500/10 border border-red-500/20 px-4 py-3 rounded-sm">
                {errorMsg}
              </p>
            )}

            <form onSubmit={handleModalSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-white/40 text-[10px] uppercase tracking-widest mb-1.5 font-semibold">Recipient Name</label>
                  <input
                    type="text"
                    required
                    disabled={submitting}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-white/10 px-4 py-2.5 text-white focus:outline-none focus:border-[#C9A84C] text-sm font-body disabled:opacity-50"
                    placeholder="John Doe"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-white/40 text-[10px] uppercase tracking-widest mb-1.5 font-semibold">Street Address</label>
                  <input
                    type="text"
                    required
                    disabled={submitting}
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-white/10 px-4 py-2.5 text-white focus:outline-none focus:border-[#C9A84C] text-sm font-body disabled:opacity-50"
                    placeholder="Apartment, building, street name..."
                  />
                </div>

                <div>
                  <label className="block text-white/40 text-[10px] uppercase tracking-widest mb-1.5 font-semibold">City</label>
                  <input
                    type="text"
                    required
                    disabled={submitting}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-white/10 px-4 py-2.5 text-white focus:outline-none focus:border-[#C9A84C] text-sm font-body disabled:opacity-50"
                    placeholder="Mumbai"
                  />
                </div>

                <div>
                  <label className="block text-white/40 text-[10px] uppercase tracking-widest mb-1.5 font-semibold">State</label>
                  <input
                    type="text"
                    required
                    disabled={submitting}
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-white/10 px-4 py-2.5 text-white focus:outline-none focus:border-[#C9A84C] text-sm font-body disabled:opacity-50"
                    placeholder="Maharashtra"
                  />
                </div>

                <div>
                  <label className="block text-white/40 text-[10px] uppercase tracking-widest mb-1.5 font-semibold">Pincode</label>
                  <input
                    type="text"
                    required
                    disabled={submitting}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-white/10 px-4 py-2.5 text-white focus:outline-none focus:border-[#C9A84C] text-sm font-body disabled:opacity-50"
                    placeholder="400001"
                  />
                </div>

                <div>
                  <label className="block text-white/40 text-[10px] uppercase tracking-widest mb-1.5 font-semibold">Phone Number</label>
                  <input
                    type="tel"
                    required
                    disabled={submitting}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-white/10 px-4 py-2.5 text-white focus:outline-none focus:border-[#C9A84C] text-sm font-body disabled:opacity-50"
                    placeholder="9999999999"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-[#C9A84C] text-black font-body font-semibold uppercase tracking-wider text-xs hover:bg-[#F5E6C3] transition-colors mt-6 disabled:opacity-50"
              >
                {submitting ? 'Placing Order...' : 'Proceed to WhatsApp'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
