'use strict';

'use client';

import Navbar from '@/components/storefront/Navbar';
import Footer from '@/components/storefront/Footer';

export default function ShippingPolicyPage() {
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
              Shipping Policy
            </h1>
          </div>
        </section>
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-8">
          <p className="text-white/70 leading-relaxed">
            We carefully process and ship all orders to ensure your luxury timepiece arrives safely and securely.
          </p>
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">Processing Time</h2>
          <p className="text-white/70 leading-relaxed">
            All orders are subject to a processing period of 1-3 business days before shipping. We will notify you once your order has been dispatched.
          </p>
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">Shipping Methods and Costs</h2>
          <p className="text-white/70 leading-relaxed">
            We offer premium, fully insured shipping for all domestic and international orders. Shipping costs and estimated delivery times will be calculated at checkout based on your location.
          </p>
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">International Shipping</h2>
          <p className="text-white/70 leading-relaxed">
            Please note that international shipments may be subject to import taxes, customs duties, and fees levied by the destination country. These charges are the buyer&apos;s responsibility.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
