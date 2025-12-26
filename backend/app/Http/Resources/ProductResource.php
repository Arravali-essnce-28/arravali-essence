<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'description' => $this->description,
            'short_description' => $this->short_description,
            'price' => (float) $this->price,
            'sale_price' => $this->whenNotNull((float) $this->sale_price),
            'final_price' => (float) $this->final_price,
            'has_discount' => $this->has_discount,
            'discount_percentage' => $this->when($this->has_discount, $this->discount_percentage),
            'in_stock' => $this->in_stock,
            'quantity' => $this->quantity,
            'sku' => $this->sku,
            'image' => $this->image ? asset('storage/' . $this->image) : null,
            'gallery' => $this->when($this->gallery, function () {
                return collect($this->gallery)->map(fn($image) => asset('storage/' . $image))->toArray();
            }, []),
            'is_featured' => $this->is_featured,
            'is_active' => $this->is_active,
            'weight' => $this->whenNotNull((float) $this->weight),
            'dimensions' => [
                'length' => $this->whenNotNull((float) $this->length),
                'width' => $this->whenNotNull((float) $this->width),
                'height' => $this->whenNotNull((float) $this->height),
            ],
            'category' => new CategoryResource($this->whenLoaded('category')),
            'created_at' => $this->created_at?->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at?->format('Y-m-d H:i:s'),
            'deleted_at' => $this->whenNotNull($this->deleted_at?->format('Y-m-d H:i:s')),
        ];
    }
}