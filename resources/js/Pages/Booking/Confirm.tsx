import { Head, Link } from '@inertiajs/react';
import { ArrowRight, CheckCircle, Calendar, CreditCard } from 'lucide-react';
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
    departure: {
        id: number;
        departure_date: string;
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

interface BookingConfirmProps {
    booking: Booking;
}

export default function BookingConfirm({ booking }: BookingConfirmProps) {
    return (
        <TourLayout
            header={
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                        Booking Confirmed
                    </h2>
                    <p className="text-gray-600 mt-1">
                        Step 3 of 3 — Your booking is complete
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
                { href: route('booking.confirm', booking), label: 'Confirm' },
            ]}
        >
            <Head title="Booking Confirmed" />

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
                                <div className="w-8 h-8 rounded-full bg-travel-100 flex items-center justify-center text-travel-600 text-sm font-bold">
                                    2
                                </div>
                                <span className="text-sm font-medium text-gray-500">
                                    Review
                                </span>
                            </div>
                            <div className="h-px w-8 bg-gray-200"></div>
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-travel-600 flex items-center justify-center text-white text-sm font-bold">
                                    3
                                </div>
                                <span className="text-sm font-semibold text-travel-600">
                                    Confirm
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="text-center py-16">
                        <div className="flex items-center justify-center mb-6">
                            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                                <CheckCircle className="h-8 w-8 text-green-600" />
                            </div>
                        </div>

                        <h3 className="text-3xl font-bold text-gray-900 mb-4">
                            Thank you, {booking.customer_name}!
                        </h3>
                        <p className="text-lg text-gray-600 mb-8">
                            Your booking has been confirmed. A confirmation email has been sent to{' '}
                            {booking.customer_email}.
                        </p>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Booking Reference</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 text-center">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 border border-gray-200 font-mono text-lg font-bold text-travel-700">
                                    {booking.reference}
                                </div>
                                <p className="mt-2 text-sm text-gray-500">
                                    Save this reference for future inquiries
                                </p>
                            </CardContent>
                        </Card>

                        <div className="mt-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Trip Details</CardTitle>
                                </CardHeader>
                                <CardContent className="p-6 space-y-4">
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={booking.departure.tour.image}
                                            alt={booking.departure.tour.title}
                                            className="w-20 h-20 rounded-xl object-cover"
                                        />
                                        <div className="flex-1">
                                            <h4 className="font-bold text-gray-900">
                                                {booking.departure.tour.title}
                                            </h4>
                                            <p className="text-sm text-gray-500">
                                                {booking.departure.tour.destination.name},
                                                {booking.departure.tour.destination.country}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                                        <span className="text-sm text-gray-600">
                                            Departure Date
                                        </span>
                                        <span className="text-sm font-medium text-gray-900">
                                            {new Date(booking.departure.departure_date).toLocaleDateString('en-US', {
                                                weekday: 'long',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                                        <span className="text-sm text-gray-600">
                                            Total Paid
                                        </span>
                                        <span className="text-sm font-bold text-travel-700">
                                            ${booking.total_price}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                                        <span className="text-sm text-gray-600">
                                            Status
                                        </span>
                                        <Badge variant="success" className="text-xs">
                                            Confirmed
                                        </Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                className="w-full sm:w-auto"
                                asChild
                            >
                                <Link href={route('home')}>
                                    Back to Home
                                </Link>
                            </Button>
                            <Button
                                className="w-full sm:w-auto"
                                variant="outline"
                                asChild
                            >
                                <Link href={route('tours.index')}>
                                    Browse More Tours
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </TourLayout>
    );
}
