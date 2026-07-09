'use strict';

'use client';

import Navbar from '@/components/storefront/Navbar';
import Footer from '@/components/storefront/Footer';

export default function ReturnPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0A0A0A] pt-16 font-body text-white">
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-white/5 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(199,168,76,0.05),transparent_70%)]" />
          <div className="max-w-3xl mx-auto relative z-10">
            <span className="text-[#C9A84C] text-xs font-semibold uppercase tracking-widest border border-[#C9A84C]/30 px-3 py-1 rounded-sm">
              Legal
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white mt-6 mb-4 tracking-tight">
              Return Policy
            </h1>
          </div>
        </section>
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-8">
          <p className="text-white/70 leading-relaxed">
            We want you to be completely satisfied with your purchase. If you are not satisfied, you may return the item within our specified return period for a refund or exchange, subject to the conditions below.
          </p>
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">Return Conditions</h2>
          <ul className="list-disc list-inside text-white/70 leading-relaxed space-y-2">
            <li>Items must be returned within 7 days of receipt.</li>
            <li>Items must be unworn, unaltered, and in their original packaging.</li>
            <li>All original tags, certificates, and accessories must be included.</li>
          </ul>
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">Non-Returnable Items</h2>
          <p className="text-white/70 leading-relaxed">
            Certain items may not be eligible for return, such as custom-made or specially ordered timepieces. Final sale items are also non-returnable.
          </p>
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">Refund Process</h2>
          <p className="text-white/70 leading-relaxed">
            Once your return is received and inspected, we will notify you of the approval or rejection of your refund. If approved, your refund will be processed to your original method of payment within a certain number of days.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
