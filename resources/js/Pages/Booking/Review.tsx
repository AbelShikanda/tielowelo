import { Head, Link } from '@inertiajs/react';
import { ArrowRight, Calendar, CreditCard, CheckCircle } from 'lucide-react';
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
        };
    };
}

interface BookingReviewProps {
    booking: Booking;
}

export default function BookingReview({ booking }: BookingReviewProps) {
    const travelerCount = booking.adults + booking.children;

    return (
        <TourLayout
            header={
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                        Review Your Booking
                    </h2>
                    <p className="text-gray-600 mt-1">
                        Step 2 of 3 — Review your booking details
                    </p>
                </div>
            }
            breadcrumbs={[
                { href: route('home'), label: 'Home' },
                { href: route('tours.index'), label: 'Tours' },
                { href: route('tours.show', booking.departure.tour), label: booking.departure.tour.title },
                { href: route('availability.index', booking.departure.tour), label: 'Availability' },
                { href: route('bookings.create', { departure: booking.departure.id }), label: 'Traveler Details' },
                { href: route('booking.review', booking), label: 'Review' },
                { href: route('payment.checkout', booking), label: 'Payment' },
            ]}
        >
            <Head title="Review Your Booking" />

            <div className="py-12">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    {/* Progress indicator */}
                    <div className="mb-8">
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-travel-100 flex items-center justify-center text-travel-600 text-sm font-bold">
                                    1
                                </div>
                                <span className="text-sm font-medium text-gray-500">
                                    Traveler Details
                                </span>
                            </div>
                            <div className="h-px w-8 bg-gray-200"></div>
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-travel-600 flex items-center justify-center text-white text-sm font-bold">
                                    2
                                </div>
                                <span className="text-sm font-semibold text-travel-600">
                                    Review
                                </span>
                            </div>
                            <div className="h-px w-8 bg-gray-200"></div>
                            <div className="flex items-center gap-2 opacity-50">
                                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                                    3
                                </div>
                                <span className="text-sm font-medium text-gray-500">
                                    Confirm
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Left: Booking summary */}
                        <div className="lg:col-span-2 space-y-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Booking Summary</CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-4 mb-4">
                                        <img
                                            src={booking.departure.tour.image}
                                            alt={booking.departure.tour.title}
                                            className="w-16 h-16 rounded-xl object-cover"
                                        />
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900">
                                                {booking.departure.tour.title}
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                {booking.departure.tour.destination.name},
                                                {booking.departure.tour.destination.country}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4 text-gray-500" />
                                                <span className="text-sm text-gray-600">
                                                    Departure Date
                                                </span>
                                            </div>
                                            <span className="text-sm font-medium text-gray-900">
                                                {new Date(booking.departure.departure_date).toLocaleDateString('en-US', {
                                                    weekday: 'long',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                                            <div className="flex items-center gap-2">
                                                <Users className="h-4 w-4 text-gray-500" />
                                                <span className="text-sm text-gray-600">
                                                    Travelers
                                                </span>
                                            </div>
                                            <span className="text-sm font-medium text-gray-900">
                                                {travelerCount} (
                                                {booking.adults} adult{booking.adults !== 1 ? 's' : ''},
                                                {booking.children} child{booking.children !== 1 ? 'ren' : ''})
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                                            <div className="flex items-center gap-2">
                                                <CreditCard className="h-4 w-4 text-gray-500" />
                                                <span className="text-sm text-gray-600">
                                                    Reference
                                                </span>
                                            </div>
                                            <span className="text-sm font-mono text-travel-700 font-bold">
                                                {booking.reference}
                                            </span>
                                        </div>

                                        {booking.special_requests && (
                                            <div className="p-3 rounded-lg bg-gray-50">
                                                <p className="text-sm font-medium text-gray-900 mb-1">
                                                    Special Requests
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    {booking.special_requests}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Customer info */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Customer Information</CardTitle>
                                </CardHeader>
                                <CardContent className="p-6 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                                            <span className="text-sm font-medium">{booking.customer_name.charAt(0).toUpperCase()}</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">
                                                {booking.customer_name}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {booking.customer_email}
                                            </p>
                                        </div>
                                    </div>

                                    {booking.customer_phone && (
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                                                <span className="text-sm">📱</span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">
                                                    Phone
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {booking.customer_phone}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Right: Price + confirm */}
                        <div className="lg:col-span-1 space-y-8 sticky top-24">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Total Price</CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="flex items-baseline gap-2 mb-2">
                                        <span className="text-3xl font-bold text-travel-700">
                                            ${booking.total_price}
                                        </span>
                                        <span className="text-sm text-gray-500">per booking</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mb-4">
                                        Includes all travelers and date adjustments
                                    </p>

                                    <Button
                                        className="w-full"
                                        asChild
                                    >
                                        <Link
                                            href={route('payment.checkout', booking)}
                                        >
                                            Confirm & Pay <ArrowRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>

                            <div className="pt-4 border-t border-gray-200">
                                <Link
                                    href={route('bookings.create', { departure: booking.departure.id })}
                                    className="block text-center text-sm font-medium text-travel-600 hover:text-travel-700 transition-colors"
                                >
                                    <ArrowRight className="-mr-1 h-4 w-4 rotate-180" />
                                    Change traveler details
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </TourLayout>
    );
}
