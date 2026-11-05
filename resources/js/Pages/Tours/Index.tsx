import { Link } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import { ArrowRight, Calendar, MapPin, Users, Clock, Star, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
    duration: string;
    price: number;
    rating: number;
    image: string;
    featured: boolean;
}

interface ToursIndexProps {
    tours: {
        data: Tour[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    destinations: Array<{
        id: number;
        name: string;
        country: string;
        slug: string;
    }>;
    filters: {
        search?: string;
        destination?: string;
        min_price?: string;
        max_price?: string;
    };
}

export default function ToursIndex({ tours, destinations, filters }: ToursIndexProps) {
    return (
        <TourLayout
            header={
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">All Tours</h2>
                        <p className="text-gray-600 mt-1">
                            Find your perfect adventure across East Africa
                        </p>
                    </div>
                    <Link
                        href={route('home')}
                        className="inline-flex items-center gap-2 rounded-md bg-travel-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-travel-700 focus:outline-none focus:ring-2 focus:ring-travel-500 focus:ring-offset-2 transition-colors"
                    >
                        <ArrowRight className="-mr-1 h-4 w-4 rotate-180" />
                        Back to home
                    </Link>
                </div>
            }
            breadcrumbs={[
                { href: route('home'), label: 'Home' },
                { href: route('tours.index'), label: 'Tours' },
            ]}
        >
            <Head title="Tours" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Search & Filters */}
                    <div className="bg-white p-6 rounded-xl border border-travel-100 shadow-sm mb-8">
                        <form method="GET" as={Link} asForm className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Search
                                </label>
                                <Input
                                    type="text"
                                    name="search"
                                    placeholder="Search tours..."
                                    defaultValue={filters.search ?? ''}
                                    className="flex-1"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Destination
                                </label>
                                <select
                                    name="destination"
                                    defaultValue={filters.destination ?? ''}
                                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-travel-500 focus:ring-2 focus:ring-travel-200 focus:outline-none"
                                >
                                    <option value="">All destinations</option>
                                    {destinations.map((d) => (
                                        <option key={d.id} value={d.id}>
                                            {d.name}, {d.country}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Min Price ($)
                                </label>
                                <Input
                                    type="number"
                                    name="min_price"
                                    defaultValue={filters.min_price ?? ''}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Max Price ($)
                                </label>
                                <Input
                                    type="number"
                                    name="max_price"
                                    defaultValue={filters.max_price ?? ''}
                                />
                            </div>
                            <div className="flex items-end">
                                <Button type="submit" className="w-full">
                                    <Search className="mr-2 h-4 w-4" /> Apply Filters
                                </Button>
                            </div>
                        </form>
                    </div>

                    {/* Results summary */}
                    <div className="flex items-center justify-between mb-6">
                        <p className="text-sm text-gray-500">
                            Showing {tours.total} tour{tours.total !== 1 ? 's' : ''}
                        </p>
                    </div>

                    {/* Tours Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tours.data.map((tour) => (
                            <Card
                                key={tour.id}
                                className="group hover:shadow-xl transition-shadow duration-200"
                                asChild
                            >
                                <Link href={route('tours.show', tour)}>
                                    <div className="relative h-56 overflow-hidden rounded-t-xl">
                                        <img
                                            src={tour.image}
                                            alt={tour.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        {tour.featured && (
                                            <div className="absolute top-3 left-3 bg-travel-600 text-white px-2 py-1 rounded-md text-xs font-semibold">
                                                Featured
                                            </div>
                                        )}
                                        <Badge
                                            variant="outline"
                                            className="absolute top-3 right-3 z-10"
                                        >
                                            {tour.rating}
                                            <Star className="ml-1 h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                                        </Badge>
                                    </div>
                                    <CardContent className="p-5">
                                        <div className="space-y-3">
                                            <h3 className="font-semibold text-gray-900 group-hover:text-travel-600 transition-colors">
                                                {tour.title}
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                {tour.destination.name},
                                                {tour.destination.country}
                                            </p>
                                            <div className="flex items-center gap-4 text-xs text-gray-500">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="h-3.5 w-3.5" />
                                                    <span>{tour.duration}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <MapPin className="h-3.5 w-3.5" />
                                                    <span>{tour.destination.country}</span>
                                                </div>
                                            </div>
                                            <div className="mt-4 flex items-center justify-between">
                                                <span className="font-bold text-travel-700">
                                                    ${tour.price}
                                                </span>
                                                <Button size="sm" className="flex-1">
                                                    Book Now <ArrowRight className="ml-1 h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Link>
                            </Card>
                        ))}
                    </div>

                    {/* Pagination */}
                    {tours.last_page > 1 && (
                        <div className="mt-8 flex items-center justify-between">
                            {tours.current_page > 1 && (
                                <Link
                                    href={route('tours.index', { page: tours.current_page - 1, ...filters })}
                                    className="text-sm font-medium text-travel-600 hover:text-travel-700 transition-colors"
                                >
                                    <ArrowRight className="-mr-1 h-4 w-4 rotate-180" /> Previous
                                </Link>
                            )}
                            <p className="text-sm text-gray-500">
                                Page {tours.current_page} of {tours.last_page}
                            </p>
                            {tours.current_page < tours.last_page && (
                                <Link
                                    href={route('tours.index', { page: tours.current_page + 1, ...filters })}
                                    className="text-sm font-medium text-travel-600 hover:text-travel-700 transition-colors"
                                >
                                    Next <ArrowRight className="ml-1 h-4 w-4" />
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </TourLayout>
    );
}
