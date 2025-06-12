import React from 'react';
import Link from 'next/link';

const TermsOfService = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
      <p className="mb-4">
        By accessing and using The Cozy Sofa, you agree to be bound by the following terms and conditions.
      </p>
      <h2 className="text-2xl font-semibold mb-2">Use of the Website</h2>
      <p className="mb-4">
        You agree to use the website for lawful purposes only and in a way that does not infringe the rights of, restrict or inhibit anyone else's use and enjoyment of the website.
      </p>
      <h2 className="text-2xl font-semibold mb-2">Intellectual Property</h2>
      <p className="mb-4">
        All content included on this site, such as text, graphics, logos, button icons, images, audio clips, digital downloads, data compilations, and software, is the property of The Cozy Sofa or its content suppliers and protected by international copyright laws.
      </p>
      <h2 className="text-2xl font-semibold mb-2">Limitation of Liability</h2>
      <p className="mb-4">
        The Cozy Sofa will not be liable for any damages of any kind arising from the use of this website, including, but not limited to direct, indirect, incidental, punitive, and consequential damages.
      </p>
      <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
      <p className="mb-4">
        If you have any questions about these Terms, please contact us at terms@thecozysofa.com.
      </p>
      <Link href="/privacy" className="text-blue-500 hover:underline">
        View Privacy Policy
      </Link>
    </div>
  );
};

export default TermsOfService; 