@component('mail::layout')
@slot('title')
Payment Confirmed - Tielowelo
@endslot

@component('mail::header')
{{ config('app.name') }} - Payment Confirmed
@endslot

@component('mail::body')
<p>Dear {{ $booking->customer_name }},</p>

<p>Great news! Your payment has been confirmed and your booking is now complete.</p>

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
        <td><strong>Total Paid:</strong></td>
        <td>${{ $booking->total_price }}</td>
    </tr>
    <tr>
        <td><strong>Status:</strong></td>
        <td><span style="color: #10b981; font-weight: bold;">Confirmed</span></td>
    </tr>
</table>

<p>Your booking is confirmed. Please save your booking reference {{ $booking->reference }} for future inquiries.</p>

@component('mail::button', ['url' => route('bookings.show', $booking)])
View Booking Details
@endcomponent

<p>Thank you for traveling with Tielowelo!</p>

@component('mail::footer')
Tielowelo Team
@endcomponent
@endcomponent