'use strict';

'use client';

import Navbar from '@/components/storefront/Navbar';
import Footer from '@/components/storefront/Footer';

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0A0A0A] pt-16 font-body text-white">
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-white/5 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(199,168,76,0.05),transparent_70%)]" />
          <div className="max-w-3xl mx-auto relative z-10">
            <span className="text-[#C9A84C] text-xs font-semibold uppercase tracking-widest border border-[#C9A84C]/30 px-3 py-1 rounded-sm">
              Our Heritage
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white mt-6 mb-4 tracking-tight">
              Chrono Craft
            </h1>
            <p className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto">
              We are a premier platform dedicated to sourcing and delivering the world&apos;s most sought-after premium first-copy luxury timepieces, crafted to perfection.
            </p>
          </div>
        </section>

        {/* Content sections */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-24">
          
          {/* Section 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-6">
                Uncompromising Quality
              </h2>
              <p className="text-white/50 leading-relaxed text-sm mb-4">
                In the premium watch market, craftsmanship is paramount. Every watch that passes through Chrono Craft undergoes a rigorous multi-point inspection to ensure it perfectly matches the original&apos;s feel and weight.
              </p>
              <p className="text-white/50 leading-relaxed text-sm">
                From inspecting the premium materials to verifying movement beat frequencies, we guarantee exceptional quality on every first-copy piece. No exceptions.
              </p>
            </div>
            <div className="aspect-video bg-[#111111] border border-white/5 relative overflow-hidden flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=600"
                alt="Watch inspection"
                className="object-cover w-full h-full opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <span className="absolute bottom-4 left-4 text-xs font-semibold tracking-wider text-[#C9A84C] uppercase">
                Horology lab
              </span>
            </div>
          </div>

          {/* Section 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
            <div className="md:order-2">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-6">
                The Luxury Experience
              </h2>
              <p className="text-white/50 leading-relaxed text-sm mb-4">
                We believe shopping for premium first-copy watches should feel truly extraordinary. Each timepiece is meticulously inspected for quality, and shipped in premium presentation boxes.
              </p>
              <p className="text-white/50 leading-relaxed text-sm">
                Each delivery includes our signature Chrono Craft Quality Assurance and a comprehensive 1-year warranty coverage, ensuring peace of mind with your purchase.
              </p>
            </div>
            <div className="aspect-video bg-[#111111] border border-white/5 relative overflow-hidden flex items-center justify-center md:order-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=600"
                alt="Luxury packaging"
                className="object-cover w-full h-full opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <span className="absolute bottom-4 left-4 text-xs font-semibold tracking-wider text-[#C9A84C] uppercase">
                Premium Delivery Box
              </span>
            </div>
          </div>

        </section>
      </main>
      <Footer />
    </>
  );
}
