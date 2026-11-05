import TourLayout from '@/Layouts/TourLayout';
import { Head, Link } from '@inertiajs/react';
import { ArrowRight, MapPin, Users, Clock, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface DestinationsShowProps {
    destination: {
        id: number;
        name: string;
        country: string;
        description: string;
        image: string;
        tour_count: number;
        featured: boolean;
        tours: Array<{
            id: number;
            title: string;
            duration: string;
            price: number;
            rating: number;
            image: string;
        }>;
    };
}

export default function DestinationsShow({ destination }: DestinationsShowProps) {
    return (
        <TourLayout
            header={
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                        {destination.name}
                    </h2>
                    <p className="text-gray-600 mt-1">
                        {destination.country}
                    </p>
                </div>
            }
            breadcrumbs={[
                { href: route('home'), label: 'Home' },
                { href: route('destinations.index'), label: 'Destinations' },
                { href: route('destinations.show', destination), label: destination.name },
            ]}
        >
            <Head title={destination.name} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Hero Image */}
                    <div className="relative h-80 w-full overflow-hidden rounded-xl border border-travel-100 mb-8">
                        <img
                            src={destination.image}
                            alt={destination.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        <div className="absolute bottom-6 left-6">
                            <h1 className="text-3xl font-bold text-white">
                                {destination.name}
                            </h1>
                            <p className="text-travel-100 text-lg">
                                {destination.country}
                            </p>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mb-8">
                        <p className="text-lg text-gray-600 leading-relaxed">
                            {destination.description}
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="flex flex-col md:flex-row gap-6 mb-12">
                        <div className="flex-1 bg-white p-6 rounded-xl border border-travel-100 shadow-sm">
                            <div className="text-2xl font-bold text-travel-600">
                                {destination.tour_count}
                            </div>
                            <div className="text-sm text-gray-500 mt-1">
                                Available Tours
                            </div>
                        </div>
                    </div>

                    {/* Tours Grid */}
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-gray-900">
                                Tours in {destination.name}
                            </h3>
                            <Link
                                href={route('tours.index')}
                                className="text-sm font-medium text-travel-600 hover:text-travel-700 transition-colors"
                            >
                                Browse all tours <ArrowRight className="ml-1 h-4 w-4" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {destination.tours.map((tour) => (
                                <Card key={tour.id} className="hover:shadow-lg transition-shadow duration-200">
                                    <div className="relative h-56 overflow-hidden rounded-t-xl">
                                        <img
                                            src={tour.image}
                                            alt={tour.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <Badge
                                            variant="outline"
                                            className="absolute top-3 left-3 z-10"
                                        >
                                            {tour.rating}
                                            <Star className="ml-1 h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                                        </Badge>
                                    </div>
                                    <CardContent className="p-5">
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <h4 className="font-semibold text-gray-900 group-hover:text-travel-600 transition-colors">
                                                    {tour.title}
                                                </h4>
                                                <span className="font-bold text-travel-700">
                                                    ${tour.price}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-500">{tour.duration}</p>
                                            <div className="flex items-center gap-4 text-xs text-gray-500">
                                                <div className="flex items-center gap-1">
                                                    <Clock className="h-3.5 w-3.5" />
                                                    <span>{tour.capacity} spots</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="pt-4 border-t border-gray-100">
                                            <Button
                                                variant="outline"
                                                className="w-full"
                                                asChild
                                            >
                                                <Link href={`/tours/${tour.slug}`}>
                                                    View Details <ArrowRight className="ml-1 h-4 w-4" />
                                                </Link>
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {destination.tours.length === 0 && (
                            <div className="text-center py-20">
                                <p className="text-gray-500">
                                    No tours available for this destination yet.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </TourLayout>
    );
}
