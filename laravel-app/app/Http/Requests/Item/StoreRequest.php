<?php

namespace App\Http\Requests\Item;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
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
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
        'id'          => 'nullable|exists:game_items,id',
        'status'      => 'sometimes|required|string|max:100',
        'desc'        => 'nullable|string',
        'price'       => 'sometimes|required|integer|min:0',
        'images'   => 'required|array|min:1',
        'images.*.url' => 'required|string',
        'images.*.public_id' => 'required|string',
        ];
    }
}
