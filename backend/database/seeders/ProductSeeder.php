<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Database\Seeder;

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
            // Whole Spices
            [
                'category_id' => $wholeSpices->id,
                'name' => 'Green Cardamom Pods',
                'description' => 'Premium green cardamom pods from Kerala hills. Known as the "Queen of Spices", these aromatic pods add a sweet, floral flavor to both sweet and savory dishes. Hand-selected for size and freshness.',
                'short_description' => 'Premium green cardamom pods from Kerala',
                'price' => 24.99,
                'sale_price' => 19.99,
                'quantity' => 50,
                'image' => 'https://images.unsplash.com/photo-1599909533730-b5b6e4b5b5b5?w=500&h=500&fit=crop',
                'weight' => 100,
                'is_featured' => true,
            ],
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

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}