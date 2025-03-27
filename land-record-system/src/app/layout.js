import { Inter } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import { AuthProvider } from '@/lib/auth';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Land Record Management System',
  description: 'Digital platform for land registration, mutation, and verification',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="flex h-screen bg-gray-50">
            <Sidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
              <Navbar />
              <main className="flex-1 overflow-y-auto p-4">
                {children}
              </main>
              <Footer />
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}