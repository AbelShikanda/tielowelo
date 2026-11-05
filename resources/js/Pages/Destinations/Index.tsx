import DestinationCard from '@/Components/DestinationCard';
import TourLayout from '@/Layouts/TourLayout';
import { Head, Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DestinationsIndexProps {
    destinations: Array<{
        id: number;
        name: string;
        country: string;
        image: string;
        tour_count: number;
        featured: boolean;
    }>;
}

export default function DestinationsIndex({ destinations }: DestinationsIndexProps) {
    return (
        <TourLayout
            header={
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Destinations</h2>
                        <p className="text-gray-600 mt-1">
                            Explore East Africa's most iconic locations
                        </p>
                    </div>
                    <Button asChild>
                        <Link href="/tours">View All Tours</Button>
                    </Button>
                </div>
            }
            breadcrumbs={[
                { href: route('home'), label: 'Home' },
                { href: route('destinations.index'), label: 'Destinations' },
            ]}
        >
            <Head title="Destinations" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {destinations.map((destination) => (
                            <DestinationCard
                                key={destination.id}
                                destination={destination}
                            />
                        ))}
                    </div>

                    {destinations.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-gray-500">
                                No destinations available yet.
                            </p>
                            <Link
                                href={route('home')}
                                className="text-travel-600 hover:text-travel-700 underline-offset-4"
                            >
                                <ArrowRight className="inline h-4 w-4 ml-1" />
                                Back to home
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </TourLayout>
    );
}
