<?php
namespace App\Http\Requests\Item;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ItemRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'status'             => ['required', 'string', Rule::in(['available', 'sold'])],
            'desc'               => 'required|string',
            'price'              => 'required|numeric|min:0',
            'images'             => 'required|array|min:1',
            'images.*.url'       => 'required|string|url',
            'images.*.public_id' => 'required|string',
        ];
    }
}
