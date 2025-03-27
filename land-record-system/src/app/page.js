import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Digital Land Record Management System
            </h1>
            <p className="text-xl mb-8">
              A secure, tamper-proof solution for managing land records, registrations, and verifications.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/login"
                className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium shadow-lg transition-colors"
              >
                Login to Your Account
              </Link>
              <Link 
                href="/sign-up"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Create an Account
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Tamper-Proof Records</h3>
              <p className="text-gray-600">
                Secure storage with hash verification ensures the integrity of all land documents.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Online Registration</h3>
              <p className="text-gray-600">
                Streamlined land registration and mutation process, eliminating paperwork.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Geospatial Mapping</h3>
              <p className="text-gray-600">
                Visual representation of land parcels with accurate boundary information.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Verification</h3>
              <p className="text-gray-600">
                Aadhaar-based authentication and verification for banks and loan agencies.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute top-0 left-6 h-full w-1 bg-blue-200 hidden md:block"></div>
              
              {/* Timeline Items */}
              <div className="space-y-12">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center z-10">1</div>
                  <div className="ml-6">
                    <h3 className="text-xl font-semibold mb-2">Register and Verify</h3>
                    <p className="text-gray-600">
                      Create an account and verify your identity using Aadhaar e-KYC for secure access to the system.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center z-10">2</div>
                  <div className="ml-6">
                    <h3 className="text-xl font-semibold mb-2">Upload Land Records</h3>
                    <p className="text-gray-600">
                      Upload your land documents which are securely stored with tamper-proof hash verification.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center z-10">3</div>
                  <div className="ml-6">
                    <h3 className="text-xl font-semibold mb-2">Map Your Property</h3>
                    <p className="text-gray-600">
                      Use our geospatial tools to accurately map your land boundaries for visual representation.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center z-10">4</div>
                  <div className="ml-6">
                    <h3 className="text-xl font-semibold mb-2">Secure Verification</h3>
                    <p className="text-gray-600">
                      Authorized parties like banks can securely verify your land records for loans and transactions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of property owners who have digitized their land records for secure, easy management.
          </p>
          <Link 
            href="/register"
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium shadow-lg transition-colors"
          >
            Register Now
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-600">
            <p>© {new Date().getFullYear()} Digital Land Record Management System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
