import { useForm } from '@inertiajs/react';
import { Head, Link } from '@inertiajs/react';
import { ArrowRight, Calendar, MapPin, Users, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TourLayout from '@/Layouts/TourLayout';

interface Departure {
    id: number;
    departure_date: string;
    capacity: number;
    available_seats: number;
    price_adjustment: number;
    total_price: number;
    is_fully_booked: boolean;
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
}

interface TravelerDetailsProps {
    departure: Departure;
}

export default function TravelerDetails({ departure }: TravelerDetailsProps) {
    const { data, setData, errors, processing } = useForm({
        adults: 1,
        children: 0,
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        special_requests: '',
    });

    const travelerCount = data.adults + data.children;
    const totalPrice = departure.total_price * travelerCount;

    const increment = (field: 'adults' | 'children') => {
        setData(field, data[field] + 1);
    };

    const decrement = (field: 'adults' | 'children') => {
        if (data[field] > (field === 'adults' ? 1 : 0)) {
            setData(field, data[field] - 1);
        }
    };

    return (
        <TourLayout
            header={
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            Traveler Details
                        </h2>
                        <p className="text-gray-600 mt-1">
                            Step 1 of 3 — Tell us about your travelers
                        </p>
                    </div>
                    <Link
                        href={route('availability.index', departure.tour)}
                        className="text-sm font-medium text-travel-600 hover:text-travel-700 transition-colors"
                    >
                        <ArrowRight className="-mr-1 h-4 w-4 rotate-180" />
                        Back to dates
                    </Link>
                </div>
            }
            breadcrumbs={[
                { href: route('home'), label: 'Home' },
                { href: route('tours.index'), label: 'Tours' },
                { href: route('tours.show', departure.tour), label: departure.tour.title },
                { href: route('availability.index', departure.tour), label: 'Availability' },
                { href: route('bookings.create', { departure: departure.id }), label: 'Traveler Details' },
            ]}
        >
            <Head title="Traveler Details" />

            <div className="py-12">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    {/* Progress indicator */}
                    <div className="mb-8">
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-travel-600 flex items-center justify-center text-white text-sm font-bold">
                                    1
                                </div>
                                <span className="text-sm font-semibold text-travel-600">
                                    Traveler Details
                                </span>
                            </div>
                            <div className="h-px w-8 bg-gray-200"></div>
                            <div className="flex items-center gap-2 opacity-50">
                                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                                    2
                                </div>
                                <span className="text-sm font-medium text-gray-500">
                                    Review
                                </span>
                            </div>
                            <div className="h-px w-8 bg-gray-200"></div>
                            <div className="flex items-center gap-2 opacity-50">
                                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                                    3
                                </div>
                                <span className="text-sm font-medium text-gray-500">
                                    Confirm
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Left: Form */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Departure summary */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Your Trip</CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-4 mb-4">
                                        <img
                                            src={departure.tour.image}
                                            alt={departure.tour.title}
                                            className="w-16 h-16 rounded-xl object-cover"
                                        />
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900">
                                                {departure.tour.title}
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                {departure.tour.destination.name},
                                                {departure.tour.destination.country}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm text-gray-500">
                                            Departure Date
                                        </span>
                                        <span className="text-sm font-medium text-gray-900">
                                            {new Date(departure.departure_date).toLocaleDateString('en-US', {
                                                weekday: 'long',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-sm text-gray-500">
                                            Duration
                                        </span>
                                        <span className="text-sm font-medium text-gray-900">
                                            {departure.tour.duration}
                                        </span>
                                    </div>

                                    <div className="h-px bg-gray-100 my-4"></div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-gray-600">
                                            Price per person
                                        </span>
                                        <span className="text-lg font-bold text-travel-700">
                                            ${departure.total_price}
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Traveler form */}
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    // Submit to booking store route
                                }}
                                className="space-y-6"
                            >
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">
                                            Traveler Information
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label htmlFor="customer_name" className="block text-sm font-medium text-gray-700">
                                                    Full Name
                                                </label>
                                                <Input
                                                    id="customer_name"
                                                    name="customer_name"
                                                    value={data.customer_name}
                                                    onChange={(e) =>
                                                        setData(
                                                            'customer_name',
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="John Doe"
                                                    className="flex-1"
                                                    required
                                                />
                                                {errors.customer_name && (
                                                    <span className="text-sm text-red-600">
                                                        {errors.customer_name}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <label htmlFor="customer_email" className="block text-sm font-medium text-gray-700">
                                                    Email Address
                                                </label>
                                                <Input
                                                    id="customer_email"
                                                    type="email"
                                                    name="customer_email"
                                                    value={data.customer_email}
                                                    onChange={(e) =>
                                                        setData(
                                                            'customer_email',
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="john@example.com"
                                                    className="flex-1"
                                                    required
                                                />
                                                {errors.customer_email && (
                                                    <span className="text-sm text-red-600">
                                                        {errors.customer_email}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <label htmlFor="customer_phone" className="block text-sm font-medium text-gray-700">
                                                    Phone Number
                                                </label>
                                                <Input
                                                    id="customer_phone"
                                                    type="tel"
                                                    name="customer_phone"
                                                    value={data.customer_phone}
                                                    onChange={(e) =>
                                                        setData(
                                                            'customer_phone',
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="+1 555-000-0000"
                                                    className="flex-1"
                                                />
                                                {errors.customer_phone && (
                                                    <span className="text-sm text-red-600">
                                                        {errors.customer_phone}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="mt-6">
                                            <label htmlFor="special_requests" className="block text-sm font-medium text-gray-700 mb-2">
                                                Special Requests (optional)
                                            </label>
                                            <Input
                                                id="special_requests"
                                                name="special_requests"
                                                value={data.special_requests}
                                                onChange={(e) =>
                                                    setData(
                                                        'special_requests',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Any dietary restrictions, mobility needs, or other requests..."
                                                className="flex-1"
                                            />
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Traveler count selector */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">
                                            Number of Travelers
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between mb-6">
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => decrement('adults')}
                                                        disabled={data.adults <= 1}
                                                    >
                                                        −
                                                    </Button>
                                                    <span className="font-semibold text-gray-900">
                                                        {data.adults}
                                                    </span>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => increment('adults')}
                                                    >
                                                        +
                                                    </Button>
                                                </div>
                                                <span className="text-sm text-gray-600">
                                                    Adults
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => decrement('children')}
                                                        disabled={data.children <= 0}
                                                    >
                                                        −
                                                    </Button>
                                                    <span className="font-semibold text-gray-900">
                                                        {data.children}
                                                    </span>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => increment('children')}
                                                    >
                                                        +
                                                    </Button>
                                                </div>
                                                <span className="text-sm text-gray-600">
                                                    Children
                                                </span>
                                            </div>
                                        </div>

                                        <div className="bg-travel-50 rounded-lg p-4 border border-travel-100">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm text-gray-600">
                                                    Total Travelers
                                                </span>
                                                <span className="font-bold text-travel-700">
                                                    {travelerCount}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-600">
                                                    Total Price
                                                </span>
                                                <span className="text-lg font-bold text-travel-700">
                                                    ${totalPrice}
                                                </span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </form>

                            <div className="flex items-center justify-end">
                                <Button
                                    className="w-full lg:w-auto"
                                    disabled={processing || !data.customer_name || !data.customer_email}
                                    asChild
                                >
                                    <Link
                                        href={route('bookings.store')}
                                        method="post"
                                        data={{
                                            departure_id: departure.id,
                                            adults: data.adults,
                                            children: data.children,
                                            customer_name: data.customer_name,
                                            customer_email: data.customer_email,
                                            customer_phone: data.customer_phone,
                                            special_requests: data.special_requests,
                                        }}
                                    >
                                        Continue to Review <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>
                        </div>

                        {/* Right: Price summary */}
                        <div className="lg:col-span-1 space-y-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Price Summary</CardTitle>
                                </CardHeader>
                                <CardContent className="p-6 space-y-6">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600">
                                            Base price × {travelerCount} travelers
                                        </span>
                                        <span className="font-medium text-gray-900">
                                            ${departure.total_price * travelerCount}
                                        </span>
                                    </div>
                                    {departure.price_adjustment > 0 && (
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-600">
                                                Date adjustment
                                            </span>
                                            <span className="text-sm font-medium text-amber-600">
                                                +${departure.price_adjustment}
                                            </span>
                                        </div>
                                    )}
                                    <div className="h-px bg-gray-100"></div>
                                    <div className="flex items-center justify-between text-lg font-bold">
                                        <span className="text-gray-900">
                                            Total
                                        </span>
                                        <span className="text-travel-700">
                                            ${totalPrice}
                                        </span>
                                    </div>
                                    <div className="text-xs text-gray-500 text-center">
                                        Payment will be processed securely via Stripe.
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
