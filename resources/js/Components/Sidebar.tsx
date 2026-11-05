import { Link, usePage } from '@inertiajs/react';
import { ChevronRight, Home, MapPin, Calendar, Users, Ticket, Map, Settings } from 'lucide-react';

interface NavItem {
    href: string;
    label: string;
    icon: React.ElementType;
    exact?: boolean;
}

const navItems: NavItem[] = [
    { href: route('dashboard'), label: 'Dashboard', icon: Home, exact: true },
    { href: route('tours.index'), label: 'Tours', icon: MapPin },
    { href: route('destinations.index'), label: 'Destinations', icon: Map },
    { href: route('departures.index'), label: 'Departures', icon: Calendar },
    { href: route('bookings.index'), label: 'Bookings', icon: Ticket },
    { href: route('users.index'), label: 'Users', icon: Users },
    { href: route('settings.index'), label: 'Settings', icon: Settings },
];

export default function Sidebar() {
    return (
        <aside className="hidden fixed inset-y-0 z-20 w-64 bg-white border-r border-gray-200 lg:flex">
            <div className="flex h-full flex-col">
                <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 bg-gray-50">
                    <span className="text-xl font-semibold text-gray-800">Tielowelo</span>
                </div>
                <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
                    {navItems.map((item) => {
                        const current = usePage().props.url;
                        const isActive = item.exact ? current === item.href : current.startsWith(item.href);
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={(
                                    'flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors ' +
                                    (isActive
                                        ? 'bg-gray-100 text-gray-900'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900')
                                )}
                            >
                                <Icon className="h-5 w-5 mr-3" />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
                <div className="h-16 px-6 border-t border-gray-200 bg-gray-50">
                    <Link
                        href={route('profile.edit')}
                        className="flex items-center rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                    >
                        <Settings className="h-5 w-5 mr-3" />
                        Profile
                    </Link>
                </div>
            </div>
        </aside>
    );
}
