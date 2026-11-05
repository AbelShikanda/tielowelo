import { Head, Link } from '@inertiajs/react';
import { ArrowRight, Clock, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
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

interface PaymentCancelProps {
    booking: Booking;
}

export default function PaymentCancel({ booking }: PaymentCancelProps) {
    return (
        <TourLayout
            header={
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                        Payment Cancelled
                    </h2>
                    <p className="text-gray-600 mt-1">
                        Your payment was not completed
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
                { href: route('payment.cancel', booking), label: 'Payment' },
            ]}
        >
            <Head title="Payment Cancelled" />

            <div className="py-12">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center py-16">
                        <div className="flex items-center justify-center mb-6">
                            <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center">
                                <Clock className="h-8 w-8 text-yellow-600" />
                            </div>
                        </div>

                        <h3 className="text-3xl font-bold text-gray-900 mb-4">
                            Payment Not Completed
                        </h3>
                        <p className="text-lg text-gray-600 mb-8">
                            Hi {booking.customer_name}, your payment for{' '}
                            <strong>{booking.departure.tour.title}</strong> was not completed.
                            You can try again or choose a different date.
                        </p>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Booking Reference</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 text-center">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 border border-gray-200 font-mono text-lg font-bold text-gray-700">
                                    {booking.reference}
                                </div>
                                <p className="mt-2 text-sm text-gray-500">
                                    Your booking is still pending payment
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
                                            Amount
                                        </span>
                                        <span className="text-sm font-bold text-travel-700">
                                            ${booking.total_price}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-50 border border-yellow-100">
                                        <span className="text-sm text-gray-600">
                                            Payment Status
                                        </span>
                                        <Badge variant="destructive" className="text-xs">
                                            Pending
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
                                <Link href={route('payment.checkout', booking)}>
                                    <CreditCard className="mr-2 h-4 w-4" />
                                    Try Payment Again
                                </Link>
                            </Button>
                            <Button
                                className="w-full sm:w-auto"
                                variant="outline"
                                asChild
                            >
                                <Link href={route('tours.index')}>
                                    <ArrowRight className="-mr-1 h-4 w-4 rotate-180" />
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
