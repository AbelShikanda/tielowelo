<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreTourRequest extends FormRequest
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
            'destination_id' => ['required', 'integer', 'exists:destinations,id'],
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'duration' => ['required', 'string', 'max:50'],
            'price' => ['required', 'numeric', 'min:0'],
            'rating' => ['nullable', 'integer', 'min:1', 'max:5'],
            'image' => ['nullable', 'url'],
            'itinerary' => ['nullable', 'string'],
            'inclusions' => ['nullable', 'string'],
            'featured' => ['sometimes', 'boolean'],
            'capacity' => ['required', 'integer', 'min:1', 'max:100'],
        ];
    }

    /**
     * Get custom error messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'destination_id.required' => 'Please select a destination.',
            'title.required' => 'Please enter a tour title.',
            'duration.required' => 'Please specify the tour duration.',
            'price.required' => 'Please enter the tour price.',
            'capacity.required' => 'Please specify the tour capacity.',
        ];
    }
}
