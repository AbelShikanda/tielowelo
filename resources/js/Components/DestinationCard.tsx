import { Link } from '@inertiajs/react';

interface DestinationCardProps {
    destination: {
        id: number;
        name: string;
        country: string;
        image: string;
        tour_count: number;
        featured: boolean;
    };
}

export default function DestinationCard({ destination }: DestinationCardProps) {
    return (
        <Link
            href={route('destinations.show', destination)}
            className="group block"
        >
            <div className="rounded-xl overflow-hidden border border-travel-100 bg-white shadow-sm hover:shadow-lg transition-shadow duration-200">
                <div className="relative h-56 overflow-hidden">
                    <img
                        src={destination.image}
                        alt={destination.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {destination.featured && (
                        <div className="absolute top-3 left-3 bg-travel-600 text-white px-2 py-1 rounded-md text-xs font-semibold">
                            Featured
                        </div>
                    )}
                </div>
                <div className="p-4">
                    <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-gray-900 group-hover:text-travel-600 transition-colors">
                            {destination.name}
                        </h3>
                        <span className="text-xs font-medium text-travel-600 bg-travel-50 px-2 py-0.5 rounded">
                            {destination.tour_count} tours
                        </span>
                    </div>
                    <p className="text-sm text-gray-500">{destination.country}</p>
                </div>
            </div>
        </Link>
    );
}
