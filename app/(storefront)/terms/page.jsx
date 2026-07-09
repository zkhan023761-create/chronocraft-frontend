'use strict';

'use client';

import Navbar from '@/components/storefront/Navbar';
import Footer from '@/components/storefront/Footer';

export default function TermsOfServicePage() {
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
              Terms of Service
            </h1>
          </div>
        </section>
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-8">
          <p className="text-white/70 leading-relaxed">
            Please read these Terms of Service carefully before accessing or using our website. By accessing or using any part of the site, you agree to be bound by these Terms of Service.
          </p>
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. General Conditions</h2>
          <p className="text-white/70 leading-relaxed">
            We reserve the right to refuse service to anyone for any reason at any time. You understand that your content (not including credit card information), may be transferred unencrypted and involve transmissions over various networks.
          </p>
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Products or Services</h2>
          <p className="text-white/70 leading-relaxed">
            Certain products or services may be available exclusively online through the website. These products or services may have limited quantities and are subject to return or exchange only according to our Return Policy.
          </p>
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Accuracy of Billing and Account Information</h2>
          <p className="text-white/70 leading-relaxed">
            We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household or per order.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
