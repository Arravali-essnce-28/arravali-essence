<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $wholeSpices = Category::where('slug', 'whole-spices')->first();
        $groundSpices = Category::where('slug', 'ground-spices')->first();
        $spiceBlends = Category::where('slug', 'spice-blends')->first();
        $herbs = Category::where('slug', 'herbs')->first();
        $premium = Category::where('slug', 'premium-collection')->first();

        $products = [
           
            [
                'category_id' => $wholeSpices->id,
                'name' => 'Black Peppercorns',
                'description' => 'Whole black peppercorns from Malabar coast. These peppercorns offer a sharp, pungent flavor that enhances any dish. Perfect for pepper mills and fresh grinding.',
                'short_description' => 'Whole black peppercorns from Malabar',
                'price' => 18.99,
                'quantity' => 75,
                'image' => 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&h=500&fit=crop',
                'weight' => 200,
            ],
        ];

        $now = now();

        foreach ($products as $product) {
            $slug = Str::slug($product['name']);

            DB::table('products')->upsert(
                array_merge($product, [
                    'slug'       => $slug,
                    'sku'        => 'SKU-' . strtoupper(Str::random(8)),
                    'created_at' => $now,
                    'updated_at' => $now,
                    'deleted_at' => null,
                ]),
                ['slug'],
                ['name', 'category_id', 'description', 'short_description', 'price', 'quantity', 'image', 'weight', 'updated_at', 'deleted_at']
            );
        }
    }
}