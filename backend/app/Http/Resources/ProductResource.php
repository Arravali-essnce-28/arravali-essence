<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class ProductResource extends JsonResource
{
    private function resolveImageUrl(?string $image): ?string
    {
        if (!$image) return null;
        // Already a full URL (Cloudinary or external) — return as-is
        if (str_starts_with($image, 'http')) return $image;
        // Local storage path — build full URL
        return url(Storage::url($image));
    }

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
            'image' => $this->resolveImageUrl($this->image),
            'back_image' => $this->resolveImageUrl($this->back_image),
            'gallery' => $this->when($this->gallery, function () {
                return collect($this->gallery)->map(fn($image) => $this->resolveImageUrl($image))->toArray();
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