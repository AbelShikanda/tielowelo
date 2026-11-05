import { Head, Link } from '@inertiajs/react';
import { ArrowRight, Calendar, Clock, Star, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TourLayout from '@/Layouts/TourLayout';

interface Booking {
    id: number;
    reference: string;
    status: string;
    total_price: number;
    customer_name: string;
    customer_email: string;
    adults: number;
    children: number;
    departure: {
        id: number;
        departure_date: string;
        total_price: number;
        tour: {
            id: number;
            title: string;
            slug: string;
            destination: {
                id: number;
                name: string;
                country: string;
                slug: string;
            };
            price: number;
            image: string;
            duration: string;
        };
    };
    is_upcoming: boolean;
}

interface BookingsIndexProps {
    bookings: Booking[];
}

export default function BookingsIndex({ bookings }: BookingsIndexProps) {
    const upcomingBookings = bookings.filter((b) => b.is_upcoming);
    const pastBookings = bookings.filter((b) => !b.is_upcoming);

    return (
        <TourLayout
            header={
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">My Bookings</h2>
                    <p className="text-gray-600 mt-1">
                        View your upcoming and past tours
                    </p>
                </div>
            }
            breadcrumbs={[
                { href: route('home'), label: 'Home' },
                { href: route('bookings.index'), label: 'My Bookings' },
            ]}
        >
            <Head title="My Bookings" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Tabs */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4 border-b border-gray-200 pb-4">
                            <Link
                                href={route('bookings.index', { tab: 'upcoming' })}
                                className={(
                                    'px-3 py-2 text-sm font-medium transition-colors ' +
                                    (upcomingBookings.length > 0
                                        ? 'border-b-2 border-travel-600 text-travel-600'
                                        : 'text-gray-500 hover:text-gray-700')
                                )}
                            >
                                Upcoming ({upcomingBookings.length})
                            </Link>
                            <Link
                                href={route('bookings.index', { tab: 'past' })}
                                className={(
                                    'px-3 py-2 text-sm font-medium transition-colors ' +
                                    (pastBookings.length > 0
                                        ? 'border-b-2 border-travel-600 text-travel-600'
                                        : 'text-gray-500 hover:text-gray-700')
                                )}
                            >
                                Past ({pastBookings.length})
                            </Link>
                        </div>
                    </div>

                    {/* Empty state */}
                    {bookings.length === 0 && (
                        <div className="text-center py-20">
                            <div className="flex items-center justify-center mb-4">
                                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                                    <Calendar className="h-6 w-6 text-gray-400" />
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                No bookings yet
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Start planning your next adventure in East Africa.
                            </p>
                            <Link
                                href={route('tours.index')}
                                className="inline-flex items-center gap-2 rounded-md bg-travel-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-travel-700 focus:outline-none focus:ring-2 focus:ring-travel-500 focus:ring-offset-2"
                            >
                                <ArrowRight className="h-4 w-4" />
                                Browse Tours
                            </Link>
                        </div>
                    )}

                    {/* Bookings list */}
                    <div className="space-y-6">
                        {(upcomingBookings.length > 0 ? upcomingBookings : pastBookings).map((booking) => (
                            <Card
                                key={booking.id}
                                className="hover:shadow-lg transition-shadow duration-200 border-travel-100/50"
                            >
                                <div className="p-6">
                                    {/* Header */}
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={booking.departure.tour.image}
                                                alt={booking.departure.tour.title}
                                                className="w-12 h-12 rounded-lg object-cover"
                                            />
                                            <div>
                                                <h3 className="font-semibold text-gray-900 group-hover:text-travel-600 transition-colors">
                                                    {booking.departure.tour.title}
                                                </h3>
                                                <p className="text-sm text-gray-500">
                                                    {booking.departure.tour.destination.name},
                                                    {booking.departure.tour.destination.country}
                                                </p>
                                            </div>
                                        </div>
                                        <Badge
                                            variant={
                                                booking.status === 'confirmed'
                                                    ? 'success'
                                                    : booking.status === 'paid'
                                                        ? 'success'
                                                        : booking.status === 'pending'
                                                            ? 'outline'
                                                            : 'destructive'
                                            }
                                        >
                                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                        </Badge>
                                    </div>

                                    {/* Details */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                        <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                                            <Calendar className="h-4 w-4 text-travel-600" />
                                            <div>
                                                <p className="text-xs text-gray-500 uppercase tracking-wider">
                                                    Departure
                                                </p>
                                                <p className="text-sm font-medium text-gray-900">
                                                    {new Date(booking.departure.departure_date).toLocaleDateString('en-US', {
                                                        weekday: 'long',
                                                        month: 'long',
                                                        day: 'numeric',
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                                            <Clock className="h-4 w-4 text-travel-600" />
                                            <div>
                                                <p className="text-xs text-gray-500 uppercase tracking-wider">
                                                    Duration
                                                </p>
                                                <p className="text-sm font-medium text-gray-900">
                                                    {booking.departure.tour.duration}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                                            <Star className="h-4 w-4 text-travel-600" />
                                            <div>
                                                <p className="text-xs text-gray-500 uppercase tracking-wider">
                                                    Travelers
                                                </p>
                                                <p className="text-sm font-medium text-gray-900">
                                                    {booking.adults + booking.children}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Price */}
                                    <div className="flex items-center justify-between mb-6">
                                        <span className="text-sm font-medium text-gray-600">
                                            Total Paid
                                        </span>
                                        <span className="text-lg font-bold text-travel-700">
                                            ${booking.total_price}
                                        </span>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-3">
                                        <Link
                                            href={route('bookings.show', booking)}
                                            className="flex items-center gap-2 rounded-md bg-travel-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-travel-700 focus:outline-none focus:ring-2 focus:ring-travel-500 focus:ring-offset-2 transition-colors"
                                        >
                                            View Details <ArrowRight className="ml-1 h-4 w-4" />
                                        </Link>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </TourLayout>
    );
}
