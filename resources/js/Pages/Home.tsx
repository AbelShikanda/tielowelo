import TourLayout from '@/Layouts/TourLayout';
import { Link } from '@inertiajs/react';
import { ArrowRight, Calendar, MapPin, Users, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Destination {
    id: number;
    name: string;
    country: string;
    image: string;
    tourCount: number;
}

interface Tour {
    id: number;
    title: string;
    destination: string;
    duration: string;
    price: number;
    rating: number;
    image: string;
}

const featuredDestinations: Destination[] = [
    {
        id: 1,
        name: 'Serengeti',
        country: 'Tanzania',
        image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf034963?w=800&q=80',
        tourCount: 12,
    },
    {
        id: 2,
        name: 'Maasai Mara',
        country: 'Kenya',
        image: 'https://images.unsplash.com/photo-1533168232545-b2b04b9e0301?w=800&q=80',
        tourCount: 15,
    },
    {
        id: 3,
        name: 'Zanzibar',
        country: 'Tanzania',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
        tourCount: 8,
    },
    {
        id: 4,
        name: 'Amboseli',
        country: 'Kenya',
        image: 'https://images.unsplash.com/photo-1540209672_420227968b2d?w=800&q=80',
        tourCount: 6,
    },
];

const trendingTours: Tour[] = [
    {
        id: 1,
        title: 'Serengeti Great Migration Safari',
        destination: 'Serengeti, Tanzania',
        duration: '5 days',
        price: 1299,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf034963?w=600&q=80',
    },
    {
        id: 2,
        title: 'Maasai Mara Big Cats Expedition',
        destination: 'Maasai Mara, Kenya',
        duration: '4 days',
        price: 999,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1533168232545-b2b04b9e0301?w=600&q=80',
    },
    {
        id: 3,
        title: 'Zanzibar Beach & Spice Tour',
        destination: 'Zanzibar, Tanzania',
        duration: '3 days',
        price: 549,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80',
    },
    {
        id: 4,
        title: 'Amboseli Elephant Viewing',
        destination: 'Amboseli, Kenya',
        duration: '3 days',
        price: 749,
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1540209672_420227968b2d?w=600&q=80',
    },
];

export default function Home() {
    return (
        <TourLayout>
            {/* Hero Section */}
            <section className="relative bg-travel-900 text-white overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1533168232545-b2b04b9e0301?w=1920&q=80')] bg-cover bg-center opacity-60"></div>
                <div className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
                        Explore the Wild<br />
                        <span className="text-travel-300">with Tielowelo</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-travel-200 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Handcrafted safari and beach tours across East Africa.
                        From the Serengeti migration to Zanzibar's white sands —
                        your next adventure starts here.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" asChild>
                            <Link href="/tours">
                                <ArrowRight className="mr-2 h-5 w-5" /> Browse Tours
                            </Link>
                        </Button>
                        <Button variant="outline" size="lg" asChild>
                            <Link href="/destinations">
                                Explore Destinations
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Search CTA */}
            <section className="py-16 bg-white border-t border-gray-200">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-3">
                            Find Your Perfect Tour
                        </h2>
                        <p className="text-gray-600 max-w-lg mx-auto">
                            Search by destination, dates, and travelers. Instant
                            availability and pricing.
                        </p>
                    </div>
                    <div className="bg-travel-50 rounded-2xl p-6 sm:p-8 shadow-sm border border-travel-100">
                        <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Destination
                                </label>
                                <select className="w-full rounded-md border border-travel-200 bg-white px-3 py-2 text-sm focus:border-travel-500 focus:ring-2 focus:ring-travel-200 focus:outline-none">
                                    <option>All destinations</option>
                                    <option>Serengeti, Tanzania</option>
                                    <option>Maasai Mara, Kenya</option>
                                    <option>Zanzibar, Tanzania</option>
                                    <option>Amboseli, Kenya</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Check-in Date
                                </label>
                                <input
                                    type="date"
                                    className="w-full rounded-md border border-travel-200 bg-white px-3 py-2 text-sm focus:border-travel-500 focus:ring-2 focus:ring-travel-200 focus:outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Travelers
                                </label>
                                <select className="w-full rounded-md border border-travel-200 bg-white px-3 py-2 text-sm focus:border-travel-500 focus:ring-2 focus:ring-travel-200 focus:outline-none">
                                    <option>1 traveler</option>
                                    <option>2 travelers</option>
                                    <option>3 travelers</option>
                                    <option>4+ travelers</option>
                                </select>
                            </div>
                            <div className="flex items-end">
                                <Button className="w-full">
                                    Search Tours <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            {/* Featured Destinations */}
            <section className="py-20 bg-gray-50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">
                                Featured Destinations
                            </h2>
                            <p className="text-gray-600 mt-2">
                                Discover East Africa's most iconic locations
                            </p>
                        </div>
                        <Link
                            href="/destinations"
                            className="text-sm font-medium text-travel-600 hover:text-travel-700 underline-offset-4 transition-colors"
                        >
                            View all <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featuredDestinations.map((dest) => (
                            <Card key={dest.id} className="hover:shadow-lg transition-shadow group">
                                <div className="relative h-48 overflow-hidden rounded-t-xl">
                                    <img
                                        src={dest.image}
                                        alt={dest.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                                    <div className="absolute bottom-2 left-2">
                                        <Badge variant="success">{dest.tourCount} tours</Badge>
                                    </div>
                                </div>
                                <CardHeader className="p-4">
                                    <CardTitle className="text-lg">
                                        {dest.name}, {dest.country}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-4">
                                    <div className="flex items-center justify-between text-sm text-gray-600">
                                        <span>
                                            <MapPin className="mr-1.5 h-4 w-4 text-travel-600" />
                                            {dest.country}
                                        </span>
                                        <Link
                                            href={`/destinations/${dest.id}`}
                                            className="font-medium text-travel-600 hover:text-travel-700"
                                        >
                                            Browse tours
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trending Tours */}
            <section className="py-20 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">
                                Trending Tours
                            </h2>
                            <p className="text-gray-600 mt-2">
                                Most popular adventures this season
                            </p>
                        </div>
                        <Link
                            href="/tours"
                            className="text-sm font-medium text-travel-600 hover:text-travel-700 underline-offset-4 transition-colors"
                        >
                            View all <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {trendingTours.map((tour) => (
                            <Card key={tour.id} className="hover:shadow-lg transition-shadow">
                                <div className="relative h-48 overflow-hidden rounded-t-xl">
                                    <img
                                        src={tour.image}
                                        alt={tour.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <Badge
                                        variant="outline"
                                        className="absolute top-2 left-2 z-10"
                                    >
                                        {tour.rating}
                                        <Star className="ml-1 h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                                    </Badge>
                                </div>
                                <CardContent className="p-5">
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-semibold text-gray-900 group-hover:text-travel-600 transition-colors">
                                                {tour.title}
                                            </h3>
                                            <span className="font-bold text-travel-700">
                                                ${tour.price}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600">
                                            {tour.destination}
                                        </p>
                                        <div className="flex items-center gap-4 text-xs text-gray-500">
                                            <div className="flex items-center gap-1">
                                                <Clock className="h-3.5 w-3.5" />
                                                <span>{tour.duration}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pt-4 border-t border-gray-100">
                                        <Button
                                            variant="outline"
                                            className="w-full"
                                            asChild
                                        >
                                            <Link href={`/tours/${tour.id}`}>
                                                View Details <ArrowRight className="ml-1 h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Banner */}
            <section className="py-20 bg-travel-600 text-white">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                        Ready for your next adventure?
                    </h2>
                    <p className="text-travel-200 mb-10 max-w-lg mx-auto">
                        Join thousands of travelers who have experienced East
                        Africa with Tielowelo.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" variant="outline" className="text-travel-700 border-white text-white hover:bg-white" asChild>
                            <Link href="/tours">
                                Start Planning
                            </Link>
                        </Button>
                        <Button size="lg" asChild>
                            <Link href="/contact">
                                Contact Us
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
        </TourLayout>
    );
}
