<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    // database/seeders/ProductsTableSeeder.php
public function run()
{
    // Get or create categories
    $categoryWhole = \App\Models\Category::where('slug', 'whole-spices')->first();
    $categoryGround = \App\Models\Category::where('slug', 'ground-spices')->first();
    $categoryBlends = \App\Models\Category::where('slug', 'spice-blends')->first();
    $categoryHerbs = \App\Models\Category::where('slug', 'herbs')->first();
    $categoryPepper = \App\Models\Category::where('slug', 'peppercorns')->first();

    $products = [
        // Whole Spices
        [
            'name' => 'Cumin Seeds',
            'slug' => 'cumin-seeds',
            'sku' => 'CUMIN-001',
            'description' => 'Premium quality whole cumin seeds',
            'price' => 4.99,
            'sale_price' => 3.99,
            'quantity' => 100,
            'category_id' => $categoryWhole->id,
            'is_featured' => true,
            'is_active' => true,
            'weight' => 100,
        ],
        [
            'name' => 'Coriander Seeds',
            'slug' => 'coriander-seeds',
            'sku' => 'CORI-001',
            'description' => 'Aromatic coriander seeds',
            'price' => 3.99,
            'quantity' => 150,
            'category_id' => $categoryWhole->id,
            'is_active' => true,
            'weight' => 100,
        ],
        // Ground Spices
        [
            'name' => 'Turmeric Powder',
            'slug' => 'turmeric-powder',
            'sku' => 'TURM-001',
            'description' => 'Pure turmeric powder with vibrant color',
            'price' => 5.99,
            'quantity' => 200,
            'category_id' => $categoryGround->id,
            'is_featured' => true,
            'is_active' => true,
            'weight' => 100,
        ],
        // Spice Blends
        [
            'name' => 'Garam Masala',
            'slug' => 'garam-masala',
            'sku' => 'GRMS-001',
            'description' => 'Traditional Indian spice blend',
            'price' => 6.99,
            'quantity' => 75,
            'category_id' => $categoryBlends->id,
            'is_active' => true,
            'weight' => 100,
        ],
        // Herbs
        [
            'name' => 'Dried Oregano',
            'slug' => 'dried-oregano',
            'sku' => 'OREG-001',
            'description' => 'Premium dried oregano leaves',
            'price' => 3.49,
            'quantity' => 120,
            'category_id' => $categoryHerbs->id,
            'is_active' => true,
            'weight' => 50,
        ],
        // Peppercorns
        [
            'name' => 'Black Peppercorns',
            'slug' => 'black-peppercorns',
            'sku' => 'BLKPEP-001',
            'description' => 'Premium Tellicherry black peppercorns',
            'price' => 7.99,
            'sale_price' => 6.49,
            'quantity' => 80,
            'category_id' => $categoryPepper->id,
            'is_featured' => true,
            'is_active' => true,
            'weight' => 100,
        ],
    ];

    foreach ($products as $product) {
        \App\Models\Product::create($product);
    }
}
}
