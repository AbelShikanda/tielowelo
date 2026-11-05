import { Link } from '@inertiajs/react';
import { Head, usePage } from '@inertiajs/react';
import { ArrowRight, Calendar, Clock, MapPin, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TourLayout from '@/Layouts/TourLayout';

interface Tour {
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
}

interface Departure {
    id: number;
    departure_date: string;
    capacity: number;
    available_seats: number;
    price_adjustment: number;
    total_price: number;
    is_fully_booked: boolean;
}

interface AvailabilityBookProps {
    tour: Tour;
    departure: Departure;
}

export default function AvailabilityBook({ tour, departure }: AvailabilityBookProps) {
    return (
        <TourLayout
            header={
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Book Your Tour</h2>
                    <p className="text-gray-600 mt-1">
                        Confirm your booking for {tour.title}
                    </p>
                </div>
            }
            breadcrumbs={[
                { href: route('home'), label: 'Home' },
                { href: route('tours.index'), label: 'Tours' },
                { href: route('tours.show', tour), label: tour.title },
                { href: route('availability.index', tour), label: 'Availability' },
                { href: route('availability.book', { tour, departure: departure.id }), label: 'Book' },
            ]}
        >
            <Head title="Book Your Tour" />

            <div className="py-12">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Left: Booking summary */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Tour info */}
                            <Card>
                                <div className="p-6">
                                    <div className="flex items-center gap-4 mb-4">
                                        <img
                                            src={tour.image}
                                            alt={tour.title}
                                            className="w-16 h-16 rounded-xl object-cover"
                                        />
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900">
                                                {tour.title}
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                {tour.destination.name}, {tour.destination.country}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div className="p-4 rounded-lg bg-travel-50 border border-travel-100">
                                            <p className="text-xs font-medium text-travel-600 uppercase tracking-wider">
                                                Departure Date
                                            </p>
                                            <p className="text-lg font-bold text-gray-900">
                                                {new Date(departure.departure_date).toLocaleDateString('en-US', {
                                                    weekday: 'long',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
                                            </p>
                                        </div>
                                        <div className="p-4 rounded-lg bg-gray-50 border border-gray-100">
                                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Duration
                                            </p>
                                            <p className="text-lg font-bold text-gray-900">
                                                {tour.duration}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                        <span className="text-sm font-medium text-gray-600">
                                            Base price per person
                                        </span>
                                        <span className="text-lg font-bold text-gray-900">
                                            ${tour.price}
                                        </span>
                                    </div>

                                    {departure.price_adjustment > 0 && (
                                        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                                            <span className="text-sm font-medium text-gray-600">
                                                Date adjustment
                                            </span>
                                            <span className="text-sm font-medium text-amber-600">
                                                +${departure.price_adjustment}
                                            </span>
                                        </div>
                                    )}

                                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                        <span className="text-lg font-bold text-gray-900">
                                            Total per person
                                        </span>
                                        <span className="text-2xl font-bold text-travel-700">
                                            ${departure.total_price}
                                        </span>
                                    </div>

                                    <div className="mt-6">
                                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                                            <CreditCard className="h-4 w-4" />
                                            <span>Secure payment via Stripe</span>
                                        </div>
                                        <Button
                                            className="w-full"
                                            variant="outline"
                                            asChild
                                        >
                                            <Link href="#checkout">Proceed to Checkout</Link>
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* Right: Departure info */}
                        <div className="lg:col-span-1 space-y-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Departure Details</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <Calendar className="h-5 w-5 text-travel-600" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">
                                                Date
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {new Date(departure.departure_date).toLocaleDateString('en-US', {
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
                                                {tour.duration}
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
                                                {tour.destination.name}, {tour.destination.country}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="pt-4 border-t border-gray-100">
                                        <p className="text-sm font-medium text-gray-900">
                                            Available seats
                                        </p>
                                        <Badge
                                            variant={departure.available_seats < 5 ? 'destructive' : 'success'}
                                            className="mt-1"
                                        >
                                            {departure.available_seats} of {departure.capacity} remaining
                                        </Badge>
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="pt-4 border-t border-gray-200">
                                <Link
                                    href={route('availability.index', tour)}
                                    className="block text-center text-sm font-medium text-travel-600 hover:text-travel-700 transition-colors"
                                >
                                    <ArrowRight className="-mr-1 h-4 w-4 rotate-180" />
                                    Choose a different date
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </TourLayout>
    );
}
