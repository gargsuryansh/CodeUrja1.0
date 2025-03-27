'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

const Sidebar = ({ isOpen, onToggle }) => {
  const { data: session } = useSession();
  const pathname = usePathname();

  // Navigation items based on user role
  const getNavItems = () => {
    const items = [
      { 
        label: 'Dashboard', 
        path: '/dashboard', 
        roles: ['user', 'admin', 'bank', 'verifier'],
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        )
      },
      { 
        label: 'My Lands', 
        path: '/my-lands', 
        roles: ['user'], 
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
        )
      },
      { 
        label: 'Register Land', 
        path: '/land-registration', 
        roles: ['user'],
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        )
      },
      { 
        label: 'Land Mutation', 
        path: '/land-mutation', 
        roles: ['user'],
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
        )
      },
      { 
        label: 'Map View', 
        path: '/map-view', 
        roles: ['user', 'admin', 'verifier'],
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
        )
      },
      { 
        label: 'Verification Portal', 
        path: '/verification', 
        roles: ['bank', 'verifier'],
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        )
      },
      { 
        label: 'Admin Panel', 
        path: '/admin', 
        roles: ['admin'],
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        )
      },
    ];
    
    if (!session) {
      return [];
    }
    
    return items.filter(item => item.roles.includes(session.user.role));
  };
  
  const navItems = getNavItems();

  const isActive = (path) => {
    return pathname === path;
  };

  return (
    <aside 
      className={`z-30 bg-white w-64 min-h-screen fixed top-0 left-0 shadow-lg transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 pt-16`}
    >
      <div className="flex flex-col h-full">
        <div className="flex-grow overflow-y-auto pt-5 px-4">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  isActive(item.path)
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => onToggle && window.innerWidth < 1024 && onToggle()}
              >
                <div className={`mr-3 flex-shrink-0 ${
                  isActive(item.path) ? 'text-blue-600' : 'text-gray-500'
                }`}>
                  {item.icon}
                </div>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="p-4 border-t">
          <div className="flex items-center">
            <div className="bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center text-gray-700 font-medium flex-shrink-0">
              {session?.user?.name?.charAt(0) || '?'}
            </div>
            <div className="ml-2 overflow-hidden">
              <p className="text-sm font-medium text-gray-900 truncate">
                {session?.user?.name || 'Guest'}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {session?.user?.email || ''}
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
