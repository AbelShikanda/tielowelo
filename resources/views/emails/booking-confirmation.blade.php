@component('mail::layout')
@slot('title')
Your Tielowelo Booking Confirmation
@endslot

@component('mail::header')
{{ config('app.name') }} - Booking Confirmation
@endslot

@component('mail::body')
<p>Dear {{ $booking->customer_name }},</p>

<p>Thank you for booking with Tielowelo! Your booking has been created and is awaiting payment confirmation.</p>

<table>
    <tr>
        <td><strong>Booking Reference:</strong></td>
        <td>{{ $booking->reference }}</td>
    </tr>
    <tr>
        <td><strong>Tour:</strong></td>
        <td>{{ $booking->departure->tour->title }}</td>
    </tr>
    <tr>
        <td><strong>Destination:</strong></td>
        <td>{{ $booking->departure->tour->destination->name }}, {{ $booking->departure->tour->destination->country }}</td>
    </tr>
    <tr>
        <td><strong>Departure Date:</strong></td>
        <td>{{ \Illuminate\Support\Carbon::parse($booking->departure->departure_date)->format('F d, Y') }}</td>
    </tr>
    <tr>
        <td><strong>Travelers:</strong></td>
        <td>{{ $booking->adults }} adult{{ $booking->adults !== 1 ? 's' : '' }}, {{ $booking->children }} child{{ $booking->children !== 1 ? 'ren' : '' }}</td>
    </tr>
    <tr>
        <td><strong>Total:</strong></td>
        <td>${{ $booking->total_price }}</td>
    </tr>
</table>

<p>Please proceed to payment to confirm your booking. Your seats are held temporarily.</p>

@component('mail::button', ['url' => route('payment.checkout', $booking)])
Complete Payment
@endcomponent

<p>If you have any questions, please reply to this email or contact our support team.</p>

@component('mail::footer')
Thank you for choosing Tielowelo.
@endcomponent
@endcomponent