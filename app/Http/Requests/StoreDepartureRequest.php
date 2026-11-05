<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreDepartureRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'tour_id' => ['required', 'integer', 'exists:tours,id'],
            'departure_date' => ['required', 'date', 'after_or_equal:today'],
            'capacity' => ['required', 'integer', 'min:1', 'max:100'],
            'available_seats' => ['required', 'integer', 'min:0', 'max:100'],
            'price_adjustment' => ['nullable', 'numeric', 'min:0'],
            'is_available' => ['sometimes', 'boolean'],
        ];
    }

    /**
     * Get custom error messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'departure_date.required' => 'Please select a departure date.',
            'departure_date.after_or_equal' => 'Departure date must be today or in the future.',
            'capacity.required' => 'Please specify the tour capacity.',
            'available_seats.required' => 'Please specify available seats.',
        ];
    }
}
