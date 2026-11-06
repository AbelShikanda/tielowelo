<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="robots" content="index, follow">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        @php
            $siteName = config('app.name', 'Tielowelo');
            $siteUrl = config('app.url', 'http://localhost');
        @endphp

        <meta name="description" content="{{ $page['metaDescription'] ?? config('app.name', 'Tielowelo') . ' - Tour and travel booking platform for East Africa adventures' }}">
        <meta name="keywords" content="tour, travel, safari, adventure, tielowelo, east africa, serengeti, maasai mara, zanzibar">

        <meta property="og:title" content="{{ $page['ogTitle'] ?? config('app.name', 'Tielowelo') }}">
        <meta property="og:description" content="{{ $page['ogDescription'] ?? config('app.name', 'Tielowelo') . ' - Tour and travel booking platform for East Africa adventures' }}">
        <meta property="og:type" content="website">
        <meta property="og:url" content="{{ $page['ogUrl'] ?? config('app.url', 'http://localhost') }}">
        <meta property="og:image" content="{{ $page['ogImage'] ?? config('app.url', 'http://localhost') . '/images/og-image.jpg' }}">
        <meta property="og:site_name" content="{{ $siteName }}">

        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="{{ $page['twitterTitle'] ?? config('app.name', 'Tielowelo') }}">
        <meta name="twitter:description" content="{{ $page['twitterDescription'] ?? config('app.name', 'Tielowelo') . ' - Tour and travel booking platform for East Africa adventures' }}">
        <meta name="twitter:image" content="{{ $page['twitterImage'] ?? config('app.url', 'http://localhost') . '/images/og-image.jpg' }}">

        <link rel="canonical" href="{{ $page['canonicalUrl'] ?? config('app.url', 'http://localhost') . request()->path() }}">

        <link rel="alternate" hreflang="en" href="{{ config('app.url', 'http://localhost') . request()->path() }}">
        <link rel="alternate" hreflang="es" href="{{ config('app.url', 'http://localhost') . request()->path() }}?locale=es">

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>