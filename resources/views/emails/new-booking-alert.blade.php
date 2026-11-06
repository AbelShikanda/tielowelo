@component('mail::layout')
@slot('title')
New Booking Received - Tielowelo
@endslot

@component('mail::header')
{{ config('app.name') }} - New Booking Alert
@endslot

@component('mail::body')
<p>Hello Admin,</p>

<p>A new booking has been received on Tielowelo.</p>

<table>
    <tr>
        <td><strong>Booking Reference:</strong></td>
        <td>{{ $booking->reference }}</td>
    </tr>
    <tr>
        <td><strong>Customer:</strong></td>
        <td>{{ $booking->customer_name }} ({{ $booking->customer_email }})</td>
    </tr>
    <tr>
        <td><strong>Phone:</strong></td>
        <td>{{ $booking->customer_phone ?? 'Not provided' }}</td>
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
    <tr>
        <td><strong>Status:</strong></td>
        <td>{{ ucfirst($booking->status) }}</td>
    </tr>
</table>

@component('mail::button', ['url' => route('bookings.show', $booking)])
Manage Booking
@endcomponent

<p>Special Requests: {{ $booking->special_requests ?? 'None' }}</p>

@component('mail::footer')
Tielowelo Admin System
@endcomponent
@endcomponent