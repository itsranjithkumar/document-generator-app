import React from 'react';
import Link from 'next/link';
import { ArrowRight, FileText, Download, Zap } from 'lucide-react';
import { DOCUMENT_TYPES } from '@/lib/constants';

export const metadata = {
  title: 'Professional Document Generator - Create HR Documents Instantly',
  description:
    'Generate professional offer letters, relieving letters, and receipts with customizable templates and instant PDF download.',
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header Navigation */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-yellow-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                D
              </div>
              <span className="font-bold text-xl text-black hidden sm:inline">DocGen</span>
            </div>
            <nav className="flex items-center gap-6">
              <Link
                href="/#features"
                className="text-gray-700 hover:text-black transition"
              >
                Features
              </Link>
              <Link
                href="/#documents"
                className="text-gray-700 hover:text-black transition"
              >
                Documents
              </Link>
              <Link
                href="/document-generator"
                className="px-6 py-2 bg-yellow-600 text-white rounded-lg font-semibold hover:bg-yellow-700 transition"
              >
                Start Now
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-black mb-6 text-balance">
            Professional Documents,
            <span className="text-yellow-600"> Instantly</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto text-balance">
            Create professional HR documents with custom branding, signatures, and seals. Download as PDF in seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/document-generator"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700 transition shadow-lg hover:shadow-xl"
            >
              Get Started
              <ArrowRight size={20} />
            </Link>
            <button className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-gray-400 transition">
              Watch Demo
            </button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="mt-16 rounded-xl overflow-hidden shadow-2xl border border-gray-200">
          <div className="bg-yellow-50 p-8 sm:p-12 aspect-video flex items-center justify-center">
            <FileText size={120} className="text-yellow-600 opacity-20" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-black mb-4">Why Choose DocGen?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to create professional HR documents
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Zap size={32} />,
              title: 'Lightning Fast',
              description: 'Generate documents in seconds with our intuitive form interface',
            },
            {
              icon: <Download size={32} />,
              title: 'Instant Download',
              description: 'Download as PDF with one click, ready to print or email',
            },
            {
              icon: <FileText size={32} />,
              title: 'Professional Templates',
              description: 'Pre-designed templates for offer letters, relieving letters, and receipts',
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="p-8 rounded-xl bg-white border border-gray-200 hover:shadow-lg transition text-center"
            >
              <div className="inline-block p-3 bg-yellow-100 rounded-lg text-yellow-600 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-black mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Documents Section */}
      <section id="documents" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-black mb-4">Available Documents</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose from our collection of professional document templates
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Object.entries(DOCUMENT_TYPES).map(([key, template]) => (
            <div
              key={key}
              className="p-8 rounded-xl bg-white border-2 border-gray-200 hover:border-yellow-600 hover:shadow-lg transition"
            >
              <div className="text-6xl mb-4">{template.icon}</div>
              <h3 className="text-2xl font-bold text-black mb-2">{template.title}</h3>
              <p className="text-gray-600 mb-6">{template.description}</p>
              <Link
                href="/document-generator"
                className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700 transition"
              >
                Create Now
                <ArrowRight size={16} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Customization Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-black mb-6">Full Customization</h2>
            <ul className="space-y-4 text-gray-700">
              {[
                'Upload your company logo and branding',
                'Add authorized signatures and seals',
                'Customize all document content and fields',
                'Professional gold-bordered templates',
                'One-click PDF download and printing',
                'Mobile-friendly and responsive design',
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-yellow-50 rounded-xl p-8 sm:p-12 aspect-square flex items-center justify-center border border-yellow-200">
            <FileText size={200} className="text-yellow-600 opacity-20" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-2xl p-12 sm:p-16 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to Generate Professional Documents?</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Start creating your first document now. It takes less than a minute.
          </p>
          <Link
            href="/document-generator"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-yellow-600 font-semibold rounded-lg hover:bg-gray-100 transition shadow-lg"
          >
            Create Your First Document
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-black mb-4">DocGen</h3>
              <p className="text-gray-600 text-sm">
                Professional document generation made simple.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-black mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="/" className="hover:text-black transition">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:text-black transition">
                    Documents
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-black mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="/" className="hover:text-black transition">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:text-black transition">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-black mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="/" className="hover:text-black transition">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:text-black transition">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 text-center text-sm text-gray-600">
            <p>© 2024 DocGen. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
