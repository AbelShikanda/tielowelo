import Sidebar from '@/Components/Sidebar';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import Breadcrumbs from '@/Components/Breadcrumbs';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

interface TourAuthenticatedLayoutProps {
    header?: React.ReactNode;
    breadcrumbs?: { href: string; label: string }[];
    children: React.ReactNode;
}

export default function TourAuthenticatedLayout({
    header,
    breadcrumbs,
    children,
}: TourAuthenticatedLayoutProps) {
    const user = usePage().props.auth.user;
    const [showingSidebar, setShowingSidebar] = useState(false);

    return (
        <div className="flex min-h-screen flex-col bg-gray-50">
            <Header user={user} onMenuToggle={() => setShowingSidebar((p) => !p)} />

            <div className="flex flex-1">
                {showingSidebar && (
                    <div className="fixed inset-0 z-20 bg-gray-900/50 lg:hidden" onClick={() => setShowingSidebar(false)} />
                )}

                <div className="relative z-10 lg:w-64 lg:flex-shrink-0">
                    <Sidebar />
                </div>

                <div className="flex-1 min-w-0">
                    {header && (
                        <header className="bg-white shadow border-b border-gray-200">
                            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                                {header}
                                {breadcrumbs && (
                                    <Breadcrumbs
                                        items={[
                                            { href: route('dashboard'), label: 'Dashboard' },
                                            ...breadcrumbs,
                                        ]}
                                    />
                                )}
                            </div>
                        </header>
                    )}

                    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
                        {children}
                    </main>

                    <Footer />
                </div>
            </div>

            {showingSidebar && (
                <div className="fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transform transition-transform lg:hidden">
                    <div className="flex h-full flex-col">
                        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 bg-gray-50">
                            <span className="text-xl font-semibold text-gray-800">Tielowelo</span>
                            <button
                                onClick={() => setShowingSidebar(false)}
                                className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none"
                            >
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
                            {[
                                { href: route('dashboard'), label: 'Dashboard' },
                                { href: route('tours.index'), label: 'Tours' },
                                { href: route('destinations.index'), label: 'Destinations' },
                                { href: route('departures.index'), label: 'Departures' },
                                { href: route('bookings.index'), label: 'Bookings' },
                                { href: route('users.index'), label: 'Users' },
                                { href: route('settings.index'), label: 'Settings' },
                            ].map((item) => {
                                const current = usePage().props.url;
                                const isActive = current.startsWith(item.href);
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setShowingSidebar(false)}
                                        className={(
                                            'flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors ' +
                                            (isActive
                                                ? 'bg-gray-100 text-gray-900'
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900')
                                        )}
                                    >
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </nav>
                        <div className="h-16 px-6 border-t border-gray-200 bg-gray-50">
                            <Link
                                href={route('profile.edit')}
                                onClick={() => setShowingSidebar(false)}
                                className="flex items-center rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                            >
                                Profile
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
