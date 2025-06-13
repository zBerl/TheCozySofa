'use client';

import { useState } from 'react';

export default function ImportProductsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Import Amazon Products
          </h1>

          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="rounded-md bg-yellow-50 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">
                      Requirements Not Met
                    </h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <p>
                        To use the Amazon Product Advertising API, you must meet the following requirements:
                      </p>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Have completed 3 qualifying sales in 180 days</li>
                        <li>Have an approved associate account</li>
                        <li>Comply with the associates program Operating Agreement</li>
                      </ul>
                      <p className="mt-4">
                        Once these requirements are met, you can uncomment the integration code and add your Amazon Associates credentials.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-lg font-medium text-gray-900">Next Steps</h4>
                <div className="mt-4 space-y-4">
                  <div>
                    <h5 className="text-sm font-medium text-gray-700">1. Complete Sales Requirements</h5>
                    <p className="mt-1 text-sm text-gray-500">
                      Make at least 3 qualifying sales through your Amazon Associates account within 180 days.
                    </p>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-700">2. Get API Access</h5>
                    <p className="mt-1 text-sm text-gray-500">
                      Once approved, you'll receive access to the Product Advertising API and your credentials.
                    </p>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-700">3. Enable Integration</h5>
                    <p className="mt-1 text-sm text-gray-500">
                      Uncomment the integration code and add your credentials to enable automatic product imports.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 