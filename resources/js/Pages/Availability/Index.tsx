import { Link } from '@inertiajs/react';
import { Head, usePage } from '@inertiajs/react';
import { Calendar, MapPin, Clock, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TourLayout from '@/Layouts/TourLayout';

interface Departure {
    id: number;
    departure_date: string;
    capacity: number;
    available_seats: number;
    price_adjustment: number;
    is_available: boolean;
    total_price: number;
    is_fully_booked: boolean;
}

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

interface AvailabilityIndexProps {
    tour: Tour;
    departures: Departure[];
}

export default function AvailabilityIndex({ tour, departures }: AvailabilityIndexProps) {
    const availableDepartures = departures.filter((d) => d.is_available && !d.is_fully_booked);
    const bookedDepartures = departures.filter((d) => d.is_fully_booked || !d.is_available);

    return (
        <TourLayout
            header={
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Choose Your Date</h2>
                        <p className="text-gray-600 mt-1">
                            Select a departure date for {tour.title}
                        </p>
                    </div>
                    <Link
                        href={route('tours.show', tour)}
                        className="inline-flex items-center gap-2 rounded-md bg-travel-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-travel-700 focus:outline-none focus:ring-2 focus:ring-travel-500 focus:ring-offset-2 transition-colors"
                    >
                        <ArrowRight className="-mr-1 h-4 w-4 rotate-180" /> Back to tour
                    </Link>
                </div>
            }
            breadcrumbs={[
                { href: route('home'), label: 'Home' },
                { href: route('tours.index'), label: 'Tours' },
                { href: route('tours.show', tour), label: tour.title },
                { href: route('availability.index', tour), label: 'Availability' },
            ]}
        >
            <Head title={`Choose Date - ${tour.title}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Tour info card */}
                    <div className="mb-8">
                        <div className="flex items-center gap-4 mb-4">
                            <img
                                src={tour.image}
                                alt={tour.title}
                                className="w-16 h-16 rounded-xl object-cover"
                            />
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">{tour.title}</h3>
                                <p className="text-sm text-gray-500">
                                    {tour.destination.name}, {tour.destination.country}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>{tour.duration}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                <span>{tour.destination.country}</span>
                            </div>
                        </div>
                    </div>

                    {/* Available departures */}
                    <div className="mb-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">
                            Available Departures
                        </h3>

                        {availableDepartures.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-gray-500">
                                    No available departure dates at the moment.
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {availableDepartures.map((departure) => (
                                    <Card
                                        key={departure.id}
                                        className="cursor-pointer hover:shadow-lg transition-shadow duration-200 border-travel-100/50 hover:border-travel-300"
                                        asChild
                                    >
                                        <Link
                                            href={route('availability.book', {
                                                tour,
                                                departure: departure.id,
                                            })}
                                        >
                                            <div className="p-6">
                                                <div className="flex items-center justify-between mb-4">
                                                    <span className="text-xs font-medium text-travel-600 uppercase tracking-wider">
                                                        Available
                                                    </span>
                                                    <span className="text-lg font-bold text-travel-700">
                                                        ${departure.total_price}
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-xl font-bold text-gray-900">
                                                        {new Date(departure.departure_date).toLocaleDateString('en-US', {
                                                            weekday: 'short',
                                                            month: 'short',
                                                            day: 'numeric',
                                                        })}
                                                    </span>
                                                    <span className="text-sm font-medium text-travel-600">
                                                        {departure.available_seats} seats left
                                                    </span>
                                                </div>
                                                <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                                                    <Calendar className="h-4 w-4" />
                                                    <span>{departure.capacity} total capacity</span>
                                                </div>
                                                {departure.price_adjustment > 0 && (
                                                    <div className="mt-3 flex items-center gap-1 text-sm text-amber-600">
                                                        <span>+${departure.price_adjustment} premium date</span>
                                                    </div>
                                                )}
                                                <div className="mt-6">
                                                    <Button className="w-full" variant="outline">
                                                        Select Date <ArrowRight className="ml-1 h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </Link>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Unavailable departures */}
                    {bookedDepartures.length > 0 && (
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-6">
                                Unavailable Dates
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {bookedDepartures.map((departure) => (
                                    <Card key={departure.id} className="opacity-50 pointer-events-none">
                                        <div className="p-6">
                                            <div className="flex items-center justify-between mb-4">
                                                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                                                    Unavailable
                                                </span>
                                                <span className="text-lg font-bold text-gray-900">
                                                    ${departure.total_price}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-xl font-bold text-gray-500">
                                                    {new Date(departure.departure_date).toLocaleDateString('en-US', {
                                                        weekday: 'short',
                                                        month: 'short',
                                                        day: 'numeric',
                                                    })}
                                                </span>
                                                <span className="text-sm font-medium text-red-500">
                                                    Sold out
                                                </span>
                                            </div>
                                            <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                                                <Calendar className="h-4 w-4" />
                                                <span>{departure.capacity} total capacity</span>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </TourLayout>
    );
}
