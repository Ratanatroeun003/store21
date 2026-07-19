<?php

namespace App\Http\Resources\Item;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ItemResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'     => $this->id,
            'status' => $this->status,
            'desc'   => $this->desc,
            'price'  => $this->price,
            'images' => $this->images->map(function ($image) {
                return [
                      'url' => $image->url,
                      'public_id' => $image->public_id,
               ];
            })->values(), 
            'created_at' => $this->created_at,
        ];
    }
}
