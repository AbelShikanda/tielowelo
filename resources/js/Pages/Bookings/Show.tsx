import { Head, Link } from '@inertiajs/react';
import { ArrowRight, Calendar, Clock, Star, CreditCard, MapPin } from 'lucide-react';
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
    customer_phone: string | null;
    special_requests: string | null;
    adults: number;
    children: number;
    payment_completed: boolean;
    departure: {
        id: number;
        departure_date: string;
        capacity: number;
        available_seats: number;
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
            itinerary: string | null;
            inclusions: string | null;
        };
    };
}

interface BookingsShowProps {
    booking: Booking;
}

export default function BookingsShow({ booking }: BookingsShowProps) {
    const travelerCount = booking.adults + booking.children;

    return (
        <TourLayout
            header={
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            Booking Details
                        </h2>
                        <p className="text-gray-600 mt-1">
                            Reference: {booking.reference}
                        </p>
                    </div>
                    <Link
                        href={route('bookings.index')}
                        className="text-sm font-medium text-travel-600 hover:text-travel-700 transition-colors"
                    >
                        <ArrowRight className="-mr-1 h-4 w-4 rotate-180" />
                        Back to my bookings
                    </Link>
                </div>
            }
            breadcrumbs={[
                { href: route('home'), label: 'Home' },
                { href: route('bookings.index'), label: 'My Bookings' },
                { href: route('bookings.show', booking), label: 'Booking Details' },
            ]}
        >
            <Head title="Booking Details" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Status banner */}
                    <div className="mb-8">
                        <div className={(
                            'inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium ' +
                            (booking.payment_completed
                                ? 'bg-green-100 border border-green-200 text-green-800'
                                : booking.status === 'pending'
                                    ? 'bg-yellow-100 border border-yellow-200 text-yellow-800'
                                    : 'bg-red-100 border border-red-200 text-red-800')
                        )}>
                            <span className="text-sm">{booking.payment_completed ? '✓ Payment Completed' : '○ Payment Pending'}</span>
                            <span className="text-xs font-semibold uppercase tracking-wider ml-auto">
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </span>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Left: Trip details */}
                        <div className="lg:col-span-2 space-y-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Trip Details</CardTitle>
                                </CardHeader>
                                <CardContent className="p-6 space-y-6">
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={booking.departure.tour.image}
                                            alt={booking.departure.tour.title}
                                            className="w-20 h-20 rounded-xl object-cover"
                                        />
                                        <div>
                                            <h3 className="font-bold text-gray-900">
                                                {booking.departure.tour.title}
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                {booking.departure.tour.destination.name},
                                                {booking.departure.tour.destination.country}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <Calendar className="h-5 w-5 text-travel-600" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">
                                                    Departure Date
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {new Date(booking.departure.departure_date).toLocaleDateString('en-US', {
                                                        weekday: 'long',
                                                        month: 'long',
                                                        day: 'numeric',
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Clock className="h-5 w-5 text-travel-600" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">
                                                    Duration
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {booking.departure.tour.duration}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <MapPin className="h-5 w-5 text-travel-600" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">
                                                    Destination
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {booking.departure.tour.destination.name}, {booking.departure.tour.destination.country}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Star className="h-5 w-5 text-travel-600" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">
                                                    Travelers
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {booking.adults} adult{booking.adults !== 1 ? 's' : ''},
                                                    {booking.children} child{booking.children !== 1 ? 'ren' : ''}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {booking.special_requests && (
                                        <div className="pt-4 border-t border-gray-100">
                                            <p className="text-sm font-medium text-gray-900 mb-2">
                                                Special Requests
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                {booking.special_requests}
                                            </p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Right: Payment & actions */}
                        <div className="lg:col-span-1 space-y-8 sticky top-24">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Payment</CardTitle>
                                </CardHeader>
                                <CardContent className="p-6 space-y-4">
                                    <div className="flex items-baseline gap-2 mb-4">
                                        <span className="text-2xl font-bold text-travel-700">
                                            ${booking.total_price}
                                        </span>
                                        <span className="text-sm text-gray-500">total</span>
                                    </div>

                                    <div className="flex items-center gap-2 mb-4">
                                        <div className={(
                                            'h-3 w-3 rounded-full ' +
                                            (booking.payment_completed ? 'bg-green-500' : 'bg-yellow-500')
                                        )} />
                                        <span className={(
                                            'text-sm font-medium ' +
                                            (booking.payment_completed ? 'text-green-700' : 'text-yellow-700')
                                        )}>
                                            {booking.payment_completed ? 'Payment Completed' : 'Payment Pending'}
                                        </span>
                                    </div>

                                    {booking.payment_completed ? (
                                        <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                                            <p className="text-sm text-green-800 mb-2">
                                                Your booking is confirmed!
                                            </p>
                                            <div className="flex items-center gap-2">
                                                <span className="font-mono text-sm text-green-700">
                                                    {booking.reference}
                                                </span>
                                                <button
                                                    className="ml-2 text-xs text-green-600 underline hover:text-green-800"
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(booking.reference);
                                                    }}
                                                >
                                                    Copy
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <Button
                                            className="w-full"
                                            variant="outline"
                                            asChild
                                        >
                                            <Link href={route('payment.checkout', booking)}>
                                                <CreditCard className="mr-2 h-4 w-4" />
                                                Complete Payment
                                            </Link>
                                        </Button>
                                    )}
                                </CardContent>
                            </Card>

                            <div className="pt-4 border-t border-gray-200">
                                <Link
                                    href={route('bookings.index')}
                                    className="block text-center text-sm font-medium text-travel-600 hover:text-travel-700 transition-colors"
                                >
                                    <ArrowRight className="-mr-1 h-4 w-4 rotate-180" />
                                    Back to My Bookings
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </TourLayout>
    );
}
