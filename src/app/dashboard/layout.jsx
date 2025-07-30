// File: src/app/dashboard/layout.jsx (Final Responsive Code)
'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

// This is a helper component for sidebar links
const SidebarLink = ({ href, children, icon, onClick }) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link href={href} onClick={onClick} className={`flex items-center p-3 rounded-lg transition-colors ${
        isActive 
          ? 'bg-indigo-600 text-white shadow-lg' 
          : 'text-gray-400 hover:bg-gray-700 hover:text-white'
      }`}>
      {icon}
      <span className="ml-3 font-medium">{children}</span>
    </Link>
  );
};

// This is the main Sidebar component
const SidebarContent = ({ onLinkClick }) => (
    <div>
        <div className="p-6">
          <Link href="/dashboard" className="text-2xl font-bold text-white">CreatorVerse</Link>
        </div>
        <nav className="px-4 space-y-2">
            <SidebarLink href="/dashboard" onClick={onLinkClick} icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>}>
                Overview
            </SidebarLink>
            <SidebarLink href="/dashboard/content" onClick={onLinkClick} icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>}>
                Content
            </SidebarLink>
            <SidebarLink href="/dashboard/products" onClick={onLinkClick} icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>}>
                Products
            </SidebarLink>
            <SidebarLink href="/dashboard/crm" onClick={onLinkClick} icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>}>
                Brand CRM
            </SidebarLink>
            <SidebarLink href="/dashboard/team" onClick={onLinkClick} icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.08-1.282-.22-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.08-1.282.22-1.857m1.28-4.286A3 3 0 017 15h10a3 3 0 011.536-2.143M12 12a3 3 0 100-6 3 3 0 000 6z"></path></svg>}>
                Team
            </SidebarLink>
            <SidebarLink href="/dashboard/settings" onClick={onLinkClick} icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>}>
                Settings
            </SidebarLink>
        </nav>
    </div>
);

// This is the main Layout component
export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar for Desktop */}
      <aside className="w-64 bg-gray-800 border-r border-gray-700 flex-shrink-0 hidden lg:block">
        <SidebarContent onLinkClick={() => {}} />
      </aside>

      {/* Mobile Sidebar (with overlay) */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black opacity-50" onClick={() => setSidebarOpen(false)}></div>
          <aside className="absolute top-0 left-0 w-64 h-full bg-gray-800 z-50">
            <SidebarContent onLinkClick={() => setSidebarOpen(false)} />
          </aside>
        </div>
      )}

      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <header className="lg:hidden bg-gray-800 border-b border-gray-700 p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-white">CreatorVerse</h1>
          <button onClick={() => setSidebarOpen(true)}>
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
          </button>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}