import { Link } from '@inertiajs/react';
import { Head, usePage } from '@inertiajs/react';
import { Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TourLayout from '@/Layouts/TourLayout';

interface Review {
    id: number;
    rating: number;
    comment: string | null;
    created_at: string;
    user: {
        id: number;
        name: string;
        email: string;
    };
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
    rating: number;
    image: string;
}

interface ReviewsIndexProps {
    tour: Tour;
    reviews: Review[];
    averageRating: number;
    reviewCount: number;
    userReview: Review | null;
}

export function StarRating({ rating, size = 20 }: { rating: number; size?: number }) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - Math.ceil(rating);

    return (
        <div className="flex items-center gap-0.5">
            {[...Array(fullStars)].map((_, i) => (
                <Star key={i} className="fill-yellow-400 text-yellow-400" size={size} />
            ))}
            {hasHalfStar && (
                <Star className="fill-yellow-400 text-yellow-400" size={size} />
            )}
            {[...Array(emptyStars)].map((_, i) => (
                <Star
                    key={i}
                    className="text-gray-300"
                    size={size}
                />
            ))}
        </div>
    );
}

export default function ReviewsIndex({ tour, reviews, averageRating, reviewCount, userReview }: ReviewsIndexProps) {
    const user = usePage().props.auth.user;
    const canReview = !!user && !userReview;

    return (
        <TourLayout
            header={
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Reviews</h2>
                        <p className="text-gray-600 mt-1">
                            What travelers are saying about {tour.title}
                        </p>
                    </div>
                    <Link
                        href={route('tours.show', tour)}
                        className="text-sm font-medium text-travel-600 hover:text-travel-700 transition-colors"
                    >
                        <ArrowRight className="-mr-1 h-4 w-4 rotate-180" />
                        Back to tour
                    </Link>
                </div>
            }
            breadcrumbs={[
                { href: route('home'), label: 'Home' },
                { href: route('tours.index'), label: 'Tours' },
                { href: route('tours.show', tour), label: tour.title },
                { href: route('reviews.index', tour), label: 'Reviews' },
            ]}
        >
            <Head title={`Reviews - ${tour.title}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Rating summary */}
                    <div className="mb-8">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="text-4xl font-bold text-gray-900">
                                {averageRating.toFixed(1)}
                            </div>
                            <div>
                                <StarRating rating={averageRating} size={32} />
                                <span className="ml-1 text-sm font-medium text-gray-600">
                                    {averageRating.toFixed(1)} / 5
                                </span>
                            </div>
                            <span className="text-sm text-gray-500">
                                ({reviewCount} review{reviewCount !== 1 ? 's' : ''})
                            </span>
                        </div>

                        {/* Rating breakdown */}
                        <div className="grid grid-cols-4 gap-4">
                            {[5, 4, 3, 2, 1].map((star) => {
                                const count = reviews.filter((r) => r.rating === star).length;
                                const percentage = reviewCount > 0 ? (count / reviewCount) * 100 : 0;
                                return (
                                    <div key={star} className="flex items-center gap-3">
                                        <span className="w-8 text-right text-sm font-medium text-gray-600">
                                            {star}
                                        </span>
                                        <StarRating rating={star} size={16} />
                                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-yellow-400"
                                                style={{ width: `${percentage}%` }}
                                            />
                                        </div>
                                        <span className="w-8 text-right text-sm text-gray-500">
                                            {count}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Review form (if user can review) */}
                    {user && canReview && (
                        <div className="mb-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Leave a Review</CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <form method="POST" as={Link} asForm>
                                        {csrfField()}
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Your Rating
                                                </label>
                                                <div className="flex items-center gap-1">
                                                    {[5, 4, 3, 2, 1].map((star) => (
                                                        <Button
                                                            key={star}
                                                            variant="outline"
                                                            size="sm"
                                                            className="hover:bg-yellow-50 hover:text-yellow-600 border-yellow-200"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                // Set rating via data attribute
                                                            }}
                                                            data-rating={star}
                                                        >
                                                            <Star size={20} />
                                                        </Button>
                                                    ))}
                                                    <input
                                                        type="hidden"
                                                        name="rating"
                                                        id="rating-input"
                                                        value=""
                                                        required
                                                    />
                                                </div>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    Click a star to rate
                                                </p>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Your Comment
                                                </label>
                                                <textarea
                                                    name="comment"
                                                    rows="4"
                                                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-travel-500 focus:ring-2 focus:ring-travel-200 focus:outline-none"
                                                    placeholder="Share your experience..."
                                                    required
                                                ></textarea>
                                            </div>
                                            <div className="flex justify-end">
                                                <Button className="w-full">
                                                    Submit Review
                                                </Button>
                                            </div>
                                        </div>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {/* Reviews list */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-gray-900">
                                Reviews ({reviewCount})
                            </h3>
                            {reviewCount > 0 && (
                                <Link
                                    href="#all-reviews"
                                    className="text-sm font-medium text-travel-600 hover:text-travel-700 underline-offset-4"
                                >
                                    View all
                                </Link>
                            )}
                        </div>

                        {reviews.length === 0 && (
                            <div className="text-center py-12">
                                <div className="flex items-center justify-center mb-4">
                                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                                        <Star className="h-6 w-6 text-gray-400" />
                                    </div>
                                </div>
                                <p className="text-gray-500">
                                    No reviews yet. Be the first to share your experience!
                                </p>
                            </div>
                        )}

                        {reviews.length > 0 && (
                            <div id="all-reviews" className="space-y-6">
                                {reviews.map((review) => (
                                    <Card key={review.id} className="p-6">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                                <span className="text-sm font-medium text-gray-600">
                                                    {review.user.name.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">
                                                    {review.user.name}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {new Date(review.created_at).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric',
                                                    })}
                                                </p>
                                            </div>
                                            <div className="ml-auto">
                                                <StarRating rating={review.rating} size={16} />
                                            </div>
                                        </div>
                                        {review.comment && (
                                            <p className="text-sm text-gray-700 leading-relaxed">
                                                {review.comment}
                                            </p>
                                        )}
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </TourLayout>
    );
}

function csrfField() {
    return <input type="hidden" name="_token" value={usePage().props.csrfToken} />;
}
