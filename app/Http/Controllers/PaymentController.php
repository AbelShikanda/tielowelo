<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Payment;
use App\Mail\PaymentConfirmationMail;
use App\Notifications\BookingConfirmedNotification;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Cashier\Cashier;
use Stripe\Checkout\Session;
use Stripe\Stripe;

class PaymentController extends Controller
{
    /**
     * Create a Stripe Checkout session for a booking.
     */
    public function checkout(Request $request, Booking $booking): RedirectResponse
    {
        Stripe::setApiKey(config('services.stripe.secret'));

        $booking->load('departure.tour');

        $session = Session::create([
            'payment_method_types' => ['card'],
            'line_items' => [[
                'price_data' => [
                    'currency' => 'usd',
                    'product_data' => [
                        'name' => $booking->departure->tour->title,
                        'description' => $booking->departure->tour->destination->name . ', ' . $booking->departure->tour->destination->country,
                    ],
                    'unit_amount' => (int) ($booking->total_price * 100),
                ],
                'quantity' => 1,
            ]],
            'mode' => 'payment',
            'success_url' => route('payment.success', $booking) . '?session_id={CHECKOUT_SESSION_ID}',
            'cancel_url' => route('payment.cancel', $booking),
            'metadata' => [
                'booking_id' => $booking->id,
            ],
            'customer_email' => $booking->customer_email,
        ]);

        Payment::create([
            'booking_id' => $booking->id,
            'stripe_checkout_session_id' => $session->id,
            'amount' => $booking->total_price,
            'currency' => 'usd',
            'status' => 'pending',
        ]);

        return redirect()->away($session->url);
    }

    /**
     * Payment success page.
     */
    public function success(Request $request, Booking $booking): Response
    {
        $sessionId = $request->get('session_id');

        if ($sessionId) {
            $payment = Payment::where('stripe_checkout_session_id', $sessionId)->first();

            if ($payment) {
                Stripe::setApiKey(config('services.stripe.secret'));
                $session = Session::retrieve($sessionId);

                $payment->update([
                    'status' => $session->payment_status === 'paid' ? 'completed' : 'failed',
                    'stripe_payment_intent_id' => $session->payment_intent,
                    'stripe_response' => json_encode($session),
                ]);

                if ($session->payment_status === 'paid') {
                    $booking->update([
                        'status' => 'confirmed',
                        'payment_completed' => true,
                    ]);

                    // Send payment confirmation email
                    Mail::to($booking->customer_email)->send(new PaymentConfirmationMail($booking));

                    // Notify authenticated user
                    if ($request->user()) {
                        $request->user()->notify(new BookingConfirmedNotification($booking));
                    }
                }
            }
        }

        $booking->load('departure.tour');

        return Inertia::render('Payment/Success', [
            'booking' => $booking,
        ]);
    }

    /**
     * Payment cancel page.
     */
    public function cancel(Booking $booking): Response
    {
        $booking->load('departure.tour');

        return Inertia::render('Payment/Cancel', [
            'booking' => $booking,
        ]);
    }

    /**
     * Stripe webhook handler.
     */
    public function webhook(Request $request)
    {
        Stripe::setApiKey(config('services.stripe.secret'));

        $endpointSecret = config('services.stripe.webhook_secret');
        $payload = $request->getContent();
        $sigHeader = $request->header('Stripe-Signature');

        try {
            $event = \Stripe\Webhook::constructEvent($payload, $sigHeader, $endpointSecret);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Invalid signature'], 400);
        }

        $session = $event->data->object ?? null;

        switch ($event->type) {
            case 'checkout.session.completed':
                if ($session) {
                    $this->handleCheckoutSessionCompleted($session);
                }
                break;

            case 'checkout.session.expired':
                if ($session && isset($session->metadata['booking_id'])) {
                    $booking = Booking::find($session->metadata['booking_id']);
                    if ($booking && $booking->status === 'pending') {
                        $booking->update(['status' => 'expired']);
                    }
                }
                break;

            case 'payment_intent.payment_failed':
                if ($session && isset($session->metadata['booking_id'])) {
                    $booking = Booking::find($session->metadata['booking_id']);
                    if ($booking) {
                        $booking->update(['status' => 'payment_failed']);
                        $payment = Payment::where('booking_id', $booking->id)->first();
                        if ($payment) {
                            $payment->update(['status' => 'failed']);
                        }
                    }
                }
                break;

            default:
                // Unhandled event type
                break;
        }

        return response()->json(['status' => 'success']);
    }

    /**
     * Handle checkout.session.completed event.
     */
    protected function handleCheckoutSessionCompleted($session): void
    {
        $payment = Payment::where('stripe_checkout_session_id', $session->id)->first();

        if (!$payment || $payment->status === 'completed') {
            return;
        }

        $payment->update([
            'status' => 'completed',
            'stripe_payment_intent_id' => $session->payment_intent,
            'stripe_response' => json_encode($session),
        ]);

        $booking = Booking::find($payment->booking_id);
                if ($booking) {
                    $booking->update([
                        'status' => 'confirmed',
                        'payment_completed' => true,
                    ]);

                    // Send payment confirmation email
                    Mail::to($booking->customer_email)->send(new PaymentConfirmationMail($booking));
                }
    }
}
