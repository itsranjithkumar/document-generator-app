'use client';

import React from 'react';
import Link from 'next/link';
import { FileText, Award, ExternalLink, ArrowRight } from 'lucide-react';

const documentCards = [
  {
    icon: <Award className="w-8 h-8" />,
    title: 'Course Completion Certificate',
    description: 'Create professional certificates for completed courses',
    href: '/document-generator/course-completion/form',
  },
  {
    icon: <FileText className="w-8 h-8" />,
    title: 'Experience Certificate',
    description: 'Generate work experience certificates for employees',
    href: '/document-generator/experience-certificate/form',
  },
  {
    icon: <FileText className="w-8 h-8" />,
    title: 'Offer Letter',
    description: 'Create professional offer letters for new employees',
    href: '/document-generator',
  },
  {
    icon: <FileText className="w-8 h-8" />,
    title: 'Relieving Letter',
    description: 'Generate formal relieving letters for departing employees',
    href: '/document-generator',
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            <div className="flex items-center gap-2">
              <span className="text-xl font-semibold text-foreground">DocGen</span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <Link href="#documents" className="text-sm text-muted-foreground hover:text-foreground transition">
                Documents
              </Link>
              <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition">
                Features
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm font-medium text-muted-foreground mb-4 tracking-wide">GENERATE DOCUMENTS</p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold text-balance leading-tight text-foreground mb-6">
            Professional Documents Made Simple
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground text-balance leading-relaxed mb-10">
            Create certificates, offer letters, and more in seconds. Beautiful templates, instant PDF downloads, and complete customization.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/document-generator/course-completion/form"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-foreground text-background font-medium rounded-full hover:bg-foreground/90 transition group"
            >
              Get Started
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#documents"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 border border-border text-foreground font-medium rounded-full hover:bg-accent transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Documents Grid */}
      <section id="documents" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground mb-3">Available Documents</h2>
          <p className="text-muted-foreground">Choose from our collection of professional templates</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {documentCards.map((card, index) => (
            <Link
              key={index}
              href={card.href}
              className="group relative overflow-hidden rounded-2xl bg-accent/5 border border-border p-8 hover:border-foreground/20 hover:bg-accent/10 transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-foreground text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                {card.icon}
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{card.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{card.description}</p>
              <div className="flex items-center gap-2 text-foreground text-sm font-medium group-hover:gap-3 transition-all">
                Get Started
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}

          {/* Receipt / Pay Slip Box - Links to external URL */}
          <a
            href="https://pay-slip-xi.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/50 p-8 hover:border-accent hover:from-accent/30 hover:to-accent/10 transition-all duration-300 cursor-pointer"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-accent/80 text-white mb-6 group-hover:scale-110 transition-transform duration-300">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Pay Slip & Receipts</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">Access and manage your payment slips and receipts online</p>
            <div className="flex items-center gap-2 text-accent text-sm font-medium group-hover:gap-3 transition-all">
              View Pay Slips
              <ExternalLink className="w-4 h-4" />
            </div>
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-border">
        <div className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground mb-3">Why DocGen?</h2>
          <p className="text-muted-foreground">Everything you need for professional document generation</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: 'Lightning Fast', description: 'Generate documents in seconds with our intuitive interface' },
            { title: 'Instant PDF Export', description: 'Download professionally formatted PDFs ready to share' },
            { title: 'Professional Quality', description: 'Premium templates with perfect formatting' },
            { title: 'Custom Branding', description: 'Add your logo, signature, and company details' },
            { title: 'Multiple Templates', description: 'Certificates, letters, and more templates' },
            { title: 'Easy to Use', description: 'No technical skills required, just fill and generate' },
          ].map((feature, index) => (
            <div key={index} className="space-y-3">
              <h3 className="font-semibold text-foreground text-lg">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-border">
        <div className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground mb-3">Three Simple Steps</h2>
          <p className="text-muted-foreground">Your professional document in minutes</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            {
              step: '01',
              title: 'Choose Document Type',
              description: 'Select from certificates, experience letters, offer letters, or more',
            },
            {
              step: '02',
              title: 'Fill in Details',
              description: 'Enter your information in our simple, intuitive form',
            },
            {
              step: '03',
              title: 'Download PDF',
              description: 'Preview and instantly download your professional document',
            },
          ].map((item, index) => (
            <div key={index} className="space-y-4">
              <div className="text-sm font-semibold text-accent">{item.step}</div>
              <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="rounded-3xl bg-foreground text-background p-12 sm:p-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-4 text-balance">Start Creating Today</h2>
          <p className="text-lg text-background/80 mb-8 max-w-2xl mx-auto">
            Join thousands of users generating professional documents instantly
          </p>
          <Link
            href="/document-generator/course-completion/form"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-background text-foreground font-medium rounded-full hover:bg-background/90 transition group"
          >
            Create Your First Document
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-accent/5 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <p className="text-sm text-muted-foreground">DocGen © 2024. All rights reserved.</p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition">Privacy</a>
              <a href="#" className="hover:text-foreground transition">Terms</a>
              <a href="#" className="hover:text-foreground transition">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
