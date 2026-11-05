<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('booking_id')->constrained()->onDelete('cascade');
            $table->string('stripe_payment_intent_id')->unique();
            $table->string('stripe_checkout_session_id')->unique();
            $table->decimal('amount', 10, 2);
            $table->string('currency')->default('usd');
            $table->string('status')->default('pending'); // pending, completed, failed, refunded
            $table->text('receipt_url')->nullable();
            $table->text('stripe_response')->nullable();
            $table->timestamps();

            $table->index('booking_id');
            $table->index('stripe_payment_intent_id');
            $table->index('stripe_checkout_session_id');
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
