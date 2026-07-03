'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Navbar from '@/components/storefront/Navbar';
import Footer from '@/components/storefront/Footer';
import ProductGallery from '@/components/storefront/ProductGallery';
import WhatsAppCTA from '@/components/storefront/WhatsAppCTA';
import SpecsAccordion from '@/components/storefront/SpecsAccordion';
import ProductCard from '@/components/storefront/ProductCard';
import useCartStore from '@/lib/store/cartStore';
import useWishlistStore from '@/lib/store/wishlistStore';


const CONDITION_COLORS = {
  'New': 'bg-emerald-500/20 text-emerald-400',
  'Like New': 'bg-blue-500/20 text-blue-400',
  'Excellent': 'bg-[#C9A84C]/20 text-[#C9A84C]',
  'Good': 'bg-white/10 text-white/60',
};

export default function ProductDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Review form states
  const [reviews, setReviews] = useState([]);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [postingReview, setPostingReview] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState('');

  const addItem       = useCartStore((s) => s.addItem);
  const toggleItem    = useWishlistStore((s) => s.toggleItem);
  const isWishlisted  = useWishlistStore((s) => product ? s.isWishlisted(product._id) : false);
  const isInCart      = useCartStore((s) => product ? s.items.some((item) => item.id === product._id) : false);
  const titleRef = useRef(null);

  // Fetch product reviews
  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    fetch(`${apiUrl}/reviews`, {
      headers: { 'X-Tenant-ID': process.env.NEXT_PUBLIC_TENANT_ID || '' }
    })
      .then((r) => r.json())
      .then((data) => {
        if (data && data.reviews) {
          setReviews(data.reviews);
        }
      })
      .catch(() => {});
  }, [slug]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!product) return;
    setPostingReview(true);
    setReviewSuccess('');
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

    try {
      const headers = {
        'Content-Type': 'application/json',
        'X-Tenant-ID': process.env.NEXT_PUBLIC_TENANT_ID || '',
      };
      if (session?.user?.accessToken) {
        headers['Authorization'] = `Bearer ${session.user.accessToken}`;
      }

      const res = await fetch(`${apiUrl}/reviews`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          rating: reviewRating,
          comment: reviewComment,
          productId: product._id || product.id,
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || 'Failed to submit review');

      setReviewSuccess('Your review has been posted successfully!');
      setReviewComment('');
      setReviewRating(5);
      setReviews((prev) => [data.review, ...prev]);
    } catch (err) {
      console.error(err);
    } finally {
      setPostingReview(false);
    }
  };

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

    // Fetch product
    fetch(`${apiUrl}/products/${slug}`, {
      headers: { 'X-Tenant-ID': process.env.NEXT_PUBLIC_TENANT_ID || '' },
    })
      .then((r) => r.json())
      .then((data) => {
        if (data && data._id) {
          setProduct(data);
          // Fetch related
          return fetch(`${apiUrl}/brands/${data.brand}/products?limit=4`, {
            headers: { 'X-Tenant-ID': process.env.NEXT_PUBLIC_TENANT_ID || '' },
          });
        }
        throw new Error('Not found');
      })
      .then((r) => r?.json())
      .then((data) => {
        if (Array.isArray(data)) setRelatedProducts(data.filter((p) => p.slug !== slug).slice(0, 4));
      })
      .catch(() => {
        // Leave product as null
      })
      .finally(() => setLoading(false));
  }, [slug]);

  // GSAP title reveal
  useEffect(() => {
    if (!product || !titleRef.current) return;
    let ctx;
    (async () => {
      const { gsap } = await import('@/lib/gsap-helpers');
      ctx = gsap.context(() => {
        gsap.from('.product-title-word', {
          y: 30,
          opacity: 0,
          stagger: 0.08,
          duration: 0.7,
          ease: 'power3.out',
        });
      }, titleRef);
    })();
    return () => { if (ctx) ctx.revert(); };
  }, [product]);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[#0A0A0A] pt-16">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-pulse">
              <div className="aspect-square bg-[#111111]" />
              <div className="space-y-4">
                <div className="h-4 bg-[#111111] rounded w-1/4" />
                <div className="h-10 bg-[#111111] rounded w-3/4" />
                <div className="h-8 bg-[#111111] rounded w-1/3" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[#0A0A0A] pt-16 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-4xl text-white mb-4">Watch Not Found</h1>
            <a href="/shop" className="text-[#C9A84C] underline font-body">Browse all watches</a>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const conditionClass = CONDITION_COLORS[product.condition] || 'bg-white/10 text-white/60';
  const isOutOfStock = product.stock === 0;
  const titleWords = product.name.split(' ');

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0A0A0A] pt-16">
        {/* Breadcrumb */}
        <div className="border-b border-white/5 py-3 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <nav className="text-white/30 font-body text-sm flex items-center gap-2">
              <a href="/" className="hover:text-[#C9A84C] transition-colors">Home</a>
              <span>/</span>
              <a href="/shop" className="hover:text-[#C9A84C] transition-colors">Shop</a>
              <span>/</span>
              <span className="text-white/60">{product.name}</span>
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Gallery */}
            <ProductGallery images={product.images} name={product.name} />

            {/* Details */}
            <div className="flex flex-col">
              {/* Brand */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-body font-semibold uppercase tracking-widest text-[#C9A84C] bg-[#C9A84C]/10 px-2.5 py-1 rounded-sm">
                  {product.brand}
                </span>
              </div>

              {/* Title */}
              <h1 ref={titleRef} className="font-display text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
                {titleWords.map((word, i) => (
                  <span key={i} className="product-title-word inline-block mr-2">
                    {word}
                  </span>
                ))}
              </h1>

              {/* SKU */}
              <p className="text-white/30 font-body text-sm mb-6">SKU: {product.sku}</p>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-8">
                <span className="font-display text-4xl font-bold text-[#C9A84C]">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <>
                    <span className="text-white/30 text-xl line-through">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-emerald-400 text-sm font-body font-semibold">
                      {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                    </span>
                  </>
                )}
              </div>

              {/* Quick Specs */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {[
                  { label: 'Movement', value: product.movement },
                  { label: 'Case Size', value: product.caseSize ? `${product.caseSize}mm` : '—' },
                  { label: 'Dial', value: product.dial || '—' },
                  { label: 'Material', value: product.caseMaterial || '—' },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-[#111111] border border-white/5 p-3">
                    <p className="text-white/30 text-xs font-body uppercase tracking-wider mb-1">{label}</p>
                    <p className="text-white font-body text-sm font-medium">{value}</p>
                  </div>
                ))}
              </div>

              {/* Stock */}
              {!isOutOfStock && (
                <p className="text-emerald-400 text-sm font-body mb-4 flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  {product.stock} in stock — ready to ship
                </p>
              )}

              {/* CTAs */}
              <div className="flex flex-col gap-3">
                {/* Add to Cart + Wishlist row */}
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      if (!session) {
                        router.push('/login?redirect=' + encodeURIComponent(window.location.pathname.substring(1)));
                        return;
                      }
                      addItem(product);
                    }}
                    disabled={isOutOfStock}
                    className={`flex-1 py-4 font-body font-semibold uppercase tracking-wider text-sm transition-colors ${
                      isOutOfStock
                        ? 'bg-white/5 text-white/30 cursor-not-allowed'
                        : 'bg-[#C9A84C] text-black hover:bg-[#F5E6C3]'
                    }`}
                  >
                    {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                  </button>

                  {/* Wishlist heart button */}
                  <button
                    onClick={() => {
                      if (!session) {
                        router.push('/login?redirect=' + encodeURIComponent(window.location.pathname.substring(1)));
                        return;
                      }
                      toggleItem(product);
                    }}
                    aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
                    className={`
                      shrink-0 w-14 flex items-center justify-center border transition-all duration-300
                      ${
                        isWishlisted
                          ? 'bg-red-500/15 border-red-500/50 text-red-400 shadow-[0_0_16px_rgba(239,68,68,0.2)]'
                          : 'border-white/10 text-white/30 hover:border-red-400/50 hover:text-red-400 hover:bg-red-500/10'
                      }
                    `}
                  >
                    <svg
                      className="w-5 h-5 transition-transform duration-300 hover:scale-110"
                      fill={isWishlisted ? 'currentColor' : 'none'}
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={1.8}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>

                {/* Wishlist status label */}
                {isWishlisted && (
                  <p className="text-red-400/70 font-body text-xs text-center flex items-center justify-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                    Saved to your wishlist
                  </p>
                )}

                <WhatsAppCTA product={product} />
              </div>
            </div>
          </div>

          {/* Specs Accordion */}
          <div className="max-w-2xl mb-16">
            <SpecsAccordion product={product} />
          </div>

          {/* Customer Reviews Section */}
          <div className="border-t border-white/5 pt-16 mb-16 max-w-4xl">
            <h2 className="font-display text-2xl font-bold text-white mb-8">
              Customer Reviews
            </h2>

            {/* Write a Review box */}
            <div className="bg-[#111111]/60 border border-white/5 p-6 md:p-8 mb-8">
              <h3 className="font-display text-lg text-white font-medium mb-4">
                Write a Review
              </h3>

              {isInCart ? (
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  {reviewSuccess && (
                    <p className="text-emerald-400 font-body text-sm mb-4">
                      {reviewSuccess}
                    </p>
                  )}
                  <div>
                    <label className="block text-white/40 text-xs uppercase tracking-wider mb-2">Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewRating(star)}
                          className={`text-xl transition-colors ${
                            star <= reviewRating ? 'text-[#C9A84C]' : 'text-white/20 hover:text-[#C9A84C]/50'
                          }`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-white/40 text-xs uppercase tracking-wider mb-2">Your Review</label>
                    <textarea
                      required
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder="Share your experience with this luxury timepiece..."
                      rows={4}
                      className="w-full bg-[#1A1A1A] border border-white/10 px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[#C9A84C] font-body text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={postingReview}
                    className="bg-[#C9A84C] text-black font-body font-semibold uppercase tracking-wider text-xs px-6 py-3 hover:bg-[#F5E6C3] disabled:opacity-50 transition-colors"
                  >
                    {postingReview ? 'Posting...' : 'Submit Review'}
                  </button>
                </form>
              ) : (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2">
                  <p className="text-white/55 font-body text-sm">
                    To write a review for this timepiece, you must first add it to your shopping cart.
                  </p>
                  <button
                    onClick={() => {
                      if (!session) {
                        router.push('/login?redirect=' + encodeURIComponent(window.location.pathname.substring(1)));
                        return;
                      }
                      addItem(product);
                    }}
                    className="shrink-0 font-body font-semibold text-xs text-[#C9A84C] uppercase tracking-wider border border-[#C9A84C]/40 px-4 py-2.5 hover:bg-[#C9A84C]/10 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              )}
            </div>

            {/* List Reviews */}
            <div className="space-y-6">
              {reviews.filter((r) => r.productId === product._id || r.product_id === product.id).length > 0 ? (
                reviews
                  .filter((r) => r.productId === product._id || r.product_id === product.id)
                  .map((r, idx) => (
                    <div key={r._id || idx} className="border-b border-white/5 pb-6">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-display text-white text-base font-medium">
                            {r.reviewerName || 'Anonymous Customer'}
                          </p>
                          <p className="text-white/30 text-xs font-body tracking-wider mt-0.5">
                            {r.reviewerLocation || 'Verified Buyer'}
                          </p>
                        </div>
                        <div className="flex gap-0.5">
                          {Array.from({ length: r.rating || 5 }).map((_, i) => (
                            <span key={i} className="text-[#C9A84C] text-xs">★</span>
                          ))}
                        </div>
                      </div>
                      <p className="text-white/70 font-body text-sm italic leading-relaxed">
                        &ldquo;{r.quote || r.comment}&rdquo;
                      </p>
                    </div>
                  ))
              ) : (
                <p className="text-white/30 font-body text-sm italic">
                  No reviews yet for this watch.
                </p>
              )}
            </div>
          </div>

          {/* Related Watches */}
          {relatedProducts.length > 0 && (
            <div>
              <h2 className="font-display text-2xl font-bold text-white mb-8">
                More from {product.brand}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {relatedProducts.map((p) => (
                  <ProductCard key={p._id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
