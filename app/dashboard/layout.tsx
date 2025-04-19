'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { Book, Home, LogOut, Users, Building, BookOpen, Heart } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link href="/dashboard" className="text-xl font-bold text-indigo-600">
                NIBF Dashboard
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {session?.user?.name}
              </span>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      <div className="container mx-auto flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md h-[calc(100vh-4rem)] sticky top-16">
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <Link
                  href="/dashboard"
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                    pathname === '/dashboard'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Home className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/attendees"
                  className="flex items-center space-x-2 rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  <Users className="h-5 w-5" />
                  <span>Attendees</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/exhibitors"
                  className="flex items-center space-x-2 rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  <Building className="h-5 w-5" />
                  <span>Exhibitors</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/books"
                  className="flex items-center space-x-2 rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  <Book className="h-5 w-5" />
                  <span>Manage Books</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/book-stands"
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                    pathname === '/dashboard/book-stands'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <BookOpen className="h-5 w-5" />
                  <span>Book Stands</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/donations"
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                    pathname === '/dashboard/donations'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Heart className="h-5 w-5" />
                  <span>Donations</span>
                </Link>
              </li>
            </ul>
          </nav>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
} 