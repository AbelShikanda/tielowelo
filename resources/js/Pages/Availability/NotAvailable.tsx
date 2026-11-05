import { Link } from '@inertiajs/react';
import { Head, usePage } from '@inertiajs/react';
import { Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
}

interface AvailabilityNotAvailableProps {
    tour: Tour;
    requestedDate: string;
}

export default function AvailabilityNotAvailable({ tour, requestedDate }: AvailabilityNotAvailableProps) {
    return (
        <TourLayout
            header={
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Date Not Available</h2>
                    <p className="text-gray-600 mt-1">
                        No departures for {tour.title} on {requestedDate}
                    </p>
                </div>
            }
            breadcrumbs={[
                { href: route('home'), label: 'Home' },
                { href: route('tours.index'), label: 'Tours' },
                { href: route('tours.show', tour), label: tour.title },
                { href: route('availability.index', tour), label: 'Availability' },
            ]}
        >
            <Head title="Date Not Available" />

            <div className="py-12">
                <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
                    <div className="mb-8">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                            <Calendar className="h-8 w-8 text-red-600" />
                        </div>
                        <h3 className="mt-6 text-xl font-bold text-gray-900">
                            No departures available
                        </h3>
                        <p className="mt-2 text-gray-600">
                            There are no departure dates for <strong>{tour.title}</strong> on{' '}
                            <strong>{new Date(requestedDate).toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}</strong>.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href={route('availability.index', tour)}
                            className="inline-flex items-center gap-2 rounded-md bg-travel-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-travel-700 focus:outline-none focus:ring-2 focus:ring-travel-500 focus:ring-offset-2 transition-colors"
                        >
                            <ArrowRight className="h-4 w-4" />
                            Choose another date
                        </Link>
                        <Link
                            href={route('tours.show', tour)}
                            className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors"
                        >
                            Back to tour
                        </Link>
                    </div>
                </div>
            </div>
        </TourLayout>
    );
}
