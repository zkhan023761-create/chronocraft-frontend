'use strict';

'use client';

import Navbar from '@/components/storefront/Navbar';
import Footer from '@/components/storefront/Footer';

export default function PrivacyPolicyPage() {
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
              Privacy Policy
            </h1>
          </div>
        </section>
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-8">
          <p className="text-white/70 leading-relaxed">
            This Privacy Policy describes how Chrono Craft collects, uses, and shares your personal information when you visit or make a purchase from our website.
          </p>
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">Personal Information We Collect</h2>
          <p className="text-white/70 leading-relaxed">
            When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device.
          </p>
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">How Do We Use Your Personal Information?</h2>
          <p className="text-white/70 leading-relaxed">
            We use the Order Information that we collect generally to fulfill any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations).
          </p>
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">Sharing Your Personal Information</h2>
          <p className="text-white/70 leading-relaxed">
            We share your Personal Information with third parties to help us use your Personal Information, as described above. We may also share your Personal Information to comply with applicable laws and regulations.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
