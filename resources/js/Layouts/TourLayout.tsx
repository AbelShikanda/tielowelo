import Link from '@inertiajs/react';
import { Home, MapPin, Calendar, Ticket, Users, UserCircle } from 'lucide-react';
import { useState } from 'react';

interface TourLayoutProps {
    user?: { name: string; email: string };
    header?: React.ReactNode;
    children: React.ReactNode;
}

export default function TourLayout({ user, header, children }: TourLayoutProps) {
    const [showingNav, setShowingNav] = useState(false);

    const publicNavItems = [
        { href: '/', label: 'Home', icon: Home },
        { href: '/tours', label: 'Tours', icon: MapPin },
        { href: '/destinations', label: 'Destinations', icon: MapPin },
    ];

    return (
        <div className="flex min-h-screen flex-col bg-white">
            <nav className="border-b border-gray-200 bg-white sticky top-0 z-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Link
                                href="/"
                                className="flex items-center gap-2 text-xl font-bold text-gray-800"
                            >
                                <div className="h-8 w-8 rounded-full bg-travel-600 flex items-center justify-center text-white text-sm font-bold">
                                    T
                                </div>
                                <span>Tielowelo</span>
                            </Link>
                        </div>

                        <div className="hidden sm:flex items-center gap-6">
                            {publicNavItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="text-sm font-medium text-gray-600 hover:text-travel-600 transition-colors"
                                >
                                    {item.label}
                                </Link>
                            ))}
                            <Link
                                href="/book"
                                className="inline-flex items-center gap-2 rounded-md bg-travel-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-travel-700 focus:outline-none focus:ring-2 focus:ring-travel-500 focus:ring-offset-2 transition-colors"
                            >
                                Book Now
                            </Link>
                        </div>

                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setShowingNav((p) => !p)}
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none md:hidden"
                            >
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                            {user ? (
                                <div className="relative inline-block">
                                    <button
                                        onClick={() => setShowingNav((p) => !p)}
                                        className="flex items-center gap-2 rounded-full bg-gray-100 p-1 text-gray-700 focus:outline-none hover:bg-gray-200"
                                    >
                                        <UserCircle className="h-8 w-8" />
                                        <span className="hidden sm:block text-sm font-medium">{user.name}</span>
                                        <svg className="ml-1 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                    {showingNav && (
                                        <div className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg border border-gray-100 py-1 z-30">
                                            <Link
                                                href={route('profile.edit')}
                                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                                            >
                                                <UserCircle className="h-5 w-5 mr-2" /> Profile
                                            </Link>
                                            <Link
                                                href={route('bookings.index')}
                                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                                            >
                                                <Ticket className="h-5 w-5 mr-2" /> My Bookings
                                            </Link>
                                            <div className="border-t border-gray-100"></div>
                                            <form method="POST" action={route('logout')} className="block">
                                                <button
                                                    type="submit"
                                                    className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 focus:outline-none focus:bg-red-50"
                                                >
                                                    Sign out
                                                </button>
                                            </form>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="text-sm font-medium text-gray-600 hover:text-travel-600 transition-colors"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="inline-flex items-center gap-2 rounded-md bg-travel-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-travel-700 focus:outline-none focus:ring-2 focus:ring-travel-500 focus:ring-offset-2 transition-colors"
                                    >
                                        Sign up
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {showingNav && (
                <div className="fixed inset-0 z-30 bg-gray-900/50" onClick={() => setShowingNav(false)} />
            )}

            {showingNav && (
                <div className="fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform md:hidden">
                    <div className="flex h-full flex-col">
                        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 bg-gray-50">
                            <span className="text-xl font-semibold text-gray-800">Tielowelo</span>
                            <button
                                onClick={() => setShowingNav(false)}
                                className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none"
                            >
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
                            {publicNavItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setShowingNav(false)}
                                    className="flex items-center rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                                >
                                    {item.label}
                                </Link>
                            ))}
                            <Link
                                href="/book"
                                onClick={() => setShowingNav(false)}
                                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-travel-600 bg-travel-50 hover:bg-travel-100 transition-colors"
                            >
                                Book Now
                            </Link>
                            {user ? (
                                <>
                                    <Link
                                        href={route('profile.edit')}
                                        onClick={() => setShowingNav(false)}
                                        className="flex items-center rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                                    >
                                        <UserCircle className="h-5 w-5 mr-2" /> Profile
                                    </Link>
                                    <Link
                                        href={route('bookings.index')}
                                        onClick={() => setShowingNav(false)}
                                        className="flex items-center rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                                    >
                                        <Ticket className="h-5 w-5 mr-2" /> My Bookings
                                    </Link>
                                    <form method="POST" action={route('logout')} className="block">
                                        <button
                                            type="submit"
                                            className="flex w-full items-center rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50 focus:outline-none hover:text-red-700 transition-colors"
                                        >
                                            Sign out
                                        </button>
                                    </form>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        onClick={() => setShowingNav(false)}
                                        className="flex items-center rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        onClick={() => setShowingNav(false)}
                                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-white bg-travel-600 hover:bg-travel-700 transition-colors"
                                    >
                                        Sign up
                                    </Link>
                                </>
                            )}
                        </nav>
                    </div>
                </div>
            )}

            {header && (
                <header className="bg-white shadow border-b border-gray-200">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main className="flex-1">{children}</main>

            <footer className="border-t border-gray-200 bg-white py-8 mt-auto">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                        <p className="leading-6">
                            &copy; {new Date().getFullYear()} Tielowelo. All rights reserved.
                        </p>
                        <div className="flex items-center gap-6">
                            <a
                                href="#"
                                className="font-medium text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                Terms
                            </a>
                            <a
                                href="#"
                                className="font-medium text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                Privacy
                            </a>
                            <a
                                href="#"
                                className="font-medium text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                Contact
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
