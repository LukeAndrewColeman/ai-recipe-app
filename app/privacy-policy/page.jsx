import React from 'react';

const PrivacyPolicy = () => {
  return (
    <section className='bg-white min-h-screen py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-4xl font-bold text-gray-900 mb-8'>
          Privacy Policy
        </h1>

        <div className='space-y-8'>
          {/* Introduction */}
          <div>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
              1. Introduction
            </h2>
            <p className='text-gray-600 leading-relaxed'>
              This Privacy Policy explains how SmartRecipe AI ("we," "our," or
              "us") collects, uses, and protects your personal information when
              you use our website smartrecipeai.com (the "Website"). We are
              committed to ensuring that your privacy is protected and that we
              comply with the General Data Protection Regulation (GDPR) and
              other applicable data protection laws.
            </p>
          </div>

          {/* Data Controller */}
          <div>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
              2. Data Controller
            </h2>
            <p className='text-gray-600 leading-relaxed'>
              SmartRecipe AI is the data controller for the personal information
              we collect and process. You can contact us at:
            </p>
            <ul className='list-disc list-inside text-gray-600 mt-2 space-y-1'>
              <li>Email: help@smartrecipeai.com</li>
              <li>Website: smartrecipeai.com</li>
            </ul>
          </div>

          {/* Information We Collect */}
          <div>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
              3. Information We Collect
            </h2>

            <h3 className='text-xl font-medium text-gray-900 mb-2'>
              3.1 Information You Provide
            </h3>
            <ul className='list-disc list-inside text-gray-600 mb-4 space-y-1'>
              <li>Account information (name, email address, password)</li>
              <li>
                Profile information (dietary preferences, cooking skill level)
              </li>
              <li>Recipe preferences and saved recipes</li>
              <li>Communication preferences</li>
              <li>
                Payment information (processed securely through our payment
                providers)
              </li>
            </ul>

            <h3 className='text-xl font-medium text-gray-900 mb-2'>
              3.2 Automatically Collected Information
            </h3>
            <ul className='list-disc list-inside text-gray-600 space-y-1'>
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Device information</li>
              <li>Usage data (pages visited, time spent on site)</li>
              <li>Cookies and similar technologies</li>
            </ul>
          </div>

          {/* Legal Basis */}
          <div>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
              4. Legal Basis for Processing
            </h2>
            <p className='text-gray-600 leading-relaxed'>
              We process your personal data based on the following legal
              grounds:
            </p>
            <ul className='list-disc list-inside text-gray-600 mt-2 space-y-1'>
              <li>Your consent</li>
              <li>Performance of a contract</li>
              <li>Legitimate interests</li>
              <li>Legal obligations</li>
            </ul>
          </div>

          {/* How We Use Information */}
          <div>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
              5. How We Use Your Information
            </h2>
            <p className='text-gray-600 leading-relaxed'>
              We use your personal information to:
            </p>
            <ul className='list-disc list-inside text-gray-600 mt-2 space-y-1'>
              <li>Provide and improve our recipe generation service</li>
              <li>Process your payments</li>
              <li>Send you service-related communications</li>
              <li>Personalize your experience</li>
              <li>Analyze and improve our website</li>
              <li>Comply with legal obligations</li>
            </ul>
          </div>

          {/* Data Retention */}
          <div>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
              6. Data Retention
            </h2>
            <p className='text-gray-600 leading-relaxed'>
              We retain your personal information only for as long as necessary
              to:
            </p>
            <ul className='list-disc list-inside text-gray-600 mt-2 space-y-1'>
              <li>Provide our services</li>
              <li>Fulfill the purposes outlined in this policy</li>
              <li>Comply with legal obligations</li>
              <li>Resolve disputes</li>
            </ul>
          </div>

          {/* Your Rights */}
          <div>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
              7. Your Rights
            </h2>
            <p className='text-gray-600 leading-relaxed'>
              Under GDPR, you have the following rights:
            </p>
            <ul className='list-disc list-inside text-gray-600 mt-2 space-y-1'>
              <li>Right to access your personal data</li>
              <li>Right to rectification</li>
              <li>Right to erasure ("right to be forgotten")</li>
              <li>Right to restrict processing</li>
              <li>Right to data portability</li>
              <li>Right to object</li>
              <li>Right to withdraw consent</li>
            </ul>
            <p className='text-gray-600 mt-4'>
              To exercise these rights, please contact us at
              help@smartrecipeai.com.
            </p>
          </div>

          {/* Data Security */}
          <div>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
              8. Data Security
            </h2>
            <p className='text-gray-600 leading-relaxed'>
              We implement appropriate technical and organizational measures to
              protect your personal information against unauthorized access,
              alteration, disclosure, or destruction.
            </p>
          </div>

          {/* International Transfers */}
          <div>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
              9. International Data Transfers
            </h2>
            <p className='text-gray-600 leading-relaxed'>
              If we transfer your data outside the European Economic Area (EEA),
              we ensure appropriate safeguards are in place through:
            </p>
            <ul className='list-disc list-inside text-gray-600 mt-2 space-y-1'>
              <li>Standard contractual clauses</li>
              <li>Adequacy decisions</li>
              <li>Binding corporate rules</li>
            </ul>
          </div>

          {/* Third-Party Services */}
          <div>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
              10. Third-Party Services
            </h2>
            <p className='text-gray-600 leading-relaxed'>
              We use the following third-party services:
            </p>
            <ul className='list-disc list-inside text-gray-600 mt-2 space-y-1'>
              <li>Payment processors</li>
              <li>Analytics tools</li>
              <li>Cloud hosting services</li>
              <li>Email service providers</li>
            </ul>
            <p className='text-gray-600 mt-4'>
              Each third-party service has its own privacy policy and data
              processing practices.
            </p>
          </div>

          {/* Children's Privacy */}
          <div>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
              11. Children's Privacy
            </h2>
            <p className='text-gray-600 leading-relaxed'>
              Our services are not intended for children under 16. We do not
              knowingly collect personal information from children under 16.
            </p>
          </div>

          {/* Cookies Policy */}
          <div>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
              12. Cookies Policy
            </h2>
            <p className='text-gray-600 leading-relaxed'>We use cookies to:</p>
            <ul className='list-disc list-inside text-gray-600 mt-2 space-y-1'>
              <li>Remember your preferences</li>
              <li>Analyze website usage</li>
              <li>Improve our services</li>
            </ul>
            <p className='text-gray-600 mt-4'>
              You can control cookie settings through your browser preferences.
            </p>
          </div>

          {/* Changes to Policy */}
          <div>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
              13. Changes to This Policy
            </h2>
            <p className='text-gray-600 leading-relaxed'>
              We may update this Privacy Policy periodically. The last update
              was on May 16, 2025. We will notify you of any material changes
              through our website or email.
            </p>
          </div>

          {/* Contact Us */}
          <div>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
              14. Contact Us
            </h2>
            <p className='text-gray-600 leading-relaxed'>
              For any questions about this Privacy Policy or your personal data,
              please contact us at:
            </p>
            <ul className='list-disc list-inside text-gray-600 mt-2 space-y-1'>
              <li>Email: help@smartrecipeai.com</li>
              <li>Website: smartrecipeai.com</li>
            </ul>
          </div>

          {/* Complaints */}
          <div>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
              15. Complaints
            </h2>
            <p className='text-gray-600 leading-relaxed'>
              You have the right to lodge a complaint with your local data
              protection authority if you believe we have violated applicable
              data protection laws.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
