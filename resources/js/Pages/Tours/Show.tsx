import { Link } from '@inertiajs/react';
import { Head, usePage } from '@inertiajs/react';
import { ArrowRight, Calendar, MapPin, Users, Clock, Star, Check, X } from 'lucide-react';
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
    description: string;
    duration: string;
    price: number;
    rating: number;
    image: string;
    featured: boolean;
    capacity: number;
    itinerary: string;
    inclusions: string;
}

interface ToursShowProps {
    tour: Tour;
}

export default function ToursShow({ tour }: ToursShowProps) {
    const inclusionsList = tour.inclusions
        ? tour.inclusions.split(',').map((i) => i.trim())
        : [];

    const itineraryDays = tour.itinerary
        ? tour.itinerary.split('.').filter((d) => d.trim().length > 0)
        : [];

    return (
        <TourLayout
            header={
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">{tour.title}</h2>
                    <p className="text-gray-600 mt-1">
                        {tour.destination.name}, {tour.destination.country}
                    </p>
                </div>
            }
            breadcrumbs={[
                { href: route('home'), label: 'Home' },
                { href: route('tours.index'), label: 'Tours' },
                { href: route('tours.show', tour), label: tour.title },
            ]}
        >
            <Head title={tour.title} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Hero Image */}
                    <div className="relative h-96 w-full overflow-hidden rounded-xl border border-travel-100 mb-8">
                        <img
                            src={tour.image}
                            alt={tour.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        <div className="absolute bottom-6 left-6">
                            <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-white border-white">
                                    {tour.rating}
                                    <Star className="ml-1 h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                                </Badge>
                                {tour.featured && (
                                    <span className="bg-travel-600 text-white px-2 py-0.5 rounded text-xs font-semibold">
                                        Featured
                                    </span>
                                )}
                            </div>
                            <h1 className="text-3xl font-bold text-white mt-2">
                                {tour.title}
                            </h1>
                            <p className="text-travel-100 text-lg">
                                {tour.destination.name}, {tour.destination.country}
                            </p>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Description */}
                            <section className="space-y-4">
                                <h3 className="text-xl font-bold text-gray-900">
                                    About this tour
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {tour.description}
                                </p>
                            </section>

                            {/* Inclusions */}
                            <section className="space-y-4">
                                <h3 className="text-xl font-bold text-gray-900">
                                    What's included
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {inclusionsList.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center gap-3 p-3 rounded-lg bg-travel-50 border border-travel-100"
                                        >
                                            <Check className="h-5 w-5 text-travel-600" />
                                            <span className="text-sm text-gray-700">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Itinerary */}
                            <section className="space-y-4">
                                <h3 className="text-xl font-bold text-gray-900">
                                    Itinerary
                                </h3>
                                <div className="space-y-4">
                                    {itineraryDays.map((day, idx) => (
                                        <div
                                            key={idx}
                                            className="flex gap-4 p-4 rounded-lg border border-gray-200 bg-white"
                                        >
                                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-travel-600 flex items-center justify-center text-white font-bold text-sm">
                                                Day {idx + 1}
                                            </div>
                                            <p className="text-sm text-gray-700 leading-relaxed">
                                                {day.trim()}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Reviews */}
                            <section className="space-y-4" id="reviews">
                                <h3 className="text-xl font-bold text-gray-900">
                                    Traveler Reviews
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Read what other travelers have to say about
                                    this tour.
                                </p>
                                <Link
                                    href={route('reviews.index', tour)}
                                    className="inline-flex items-center gap-2 rounded-md bg-travel-50 px-4 py-2 text-sm font-semibold text-travel-600 shadow-sm hover:bg-travel-100 focus:outline-none focus:ring-2 focus:ring-travel-500 focus:ring-offset-2 transition-colors"
                                >
                                    View all reviews <ArrowRight className="ml-1 h-4 w-4" />
                                </Link>
                            </section>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-8">
                            {/* Price Card */}
                            <Card className="sticky top-24">
                                <CardHeader>
                                    <CardTitle className="text-lg">Tour Price</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-baseline gap-2 mb-4">
                                        <span className="text-3xl font-bold text-travel-700">
                                            ${tour.price}
                                        </span>
                                        <span className="text-sm text-gray-500">per person</span>
                                    </div>
                                    <p className="text-sm text-gray-500 mb-4">
                                        {tour.capacity} spots available
                                    </p>
                                    <Button className="w-full" asChild>
                                        <Link href={route('availability.index', tour)}>
                                            Check Availability
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>

                            {/* Tour Details */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Tour Details</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <Calendar className="h-5 w-5 text-travel-600" />
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
                                        <Users className="h-5 w-5 text-travel-600" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">
                                                Capacity
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {tour.capacity} travelers
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
                                        <Link
                                            href={route('destinations.show', tour.destination)}
                                            className="text-sm font-medium text-travel-600 hover:text-travel-700 transition-colors"
                                        >
                                            View all tours in {tour.destination.name} <ArrowRight className="ml-1 h-4 w-4" />
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </TourLayout>
    );
}
