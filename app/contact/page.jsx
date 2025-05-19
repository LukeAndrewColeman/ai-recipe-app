'use client';

import { useState } from 'react';

export default function ContactPage() {
  // State to track if the email was copied
  const [copied, setCopied] = useState(false);

  // Email address
  const email = 'smartrecipeai@gmail.com';

  // Function to handle copying email to clipboard
  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
  };

  return (
    <main className='min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='container mx-auto'>
        {/* Page Title */}
        <h1 className='text-4xl font-extrabold text-primary mb-2'>Contact</h1>
        {/* Subtitle/Description */}
        <p className='text-neutral/70 mb-8'>
          Have questions or feedback? We'd love to hear from you. Reach out and
          we'll get back to you as soon as possible!
        </p>

        {/* Card */}
        <div className='bg-white shadow rounded-2xl p-8'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-4 sm:space-y-0'>
            {/* Email Button */}
            <a
              href={`mailto:${email}`}
              className='inline-block px-6 py-3 rounded-lg bg-primary text-white font-semibold shadow hover:bg-primary/80 transition'
            >
              Send us an email
            </a>
            {/* Copy Email Button */}
            <button
              onClick={handleCopyEmail}
              className='inline-block px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-semibold bg-gray-50 hover:bg-gray-100 transition'
            >
              {copied ? 'Copied!' : 'Copy email'}
            </button>
          </div>
          {/* Response Time */}
          <div className='mt-8 text-gray-500 text-sm'>
            We typically respond to all inquiries within 24-48 hours during
            business days.
          </div>
        </div>
      </div>
    </main>
  );
}
