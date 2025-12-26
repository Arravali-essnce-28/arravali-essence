<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    // database/seeders/CategoriesTableSeeder.php
// database/seeders/CategoriesTableSeeder.php
public function run(): void
{
    $categories = [
        [
            'name' => 'Whole Spices',
            'slug' => 'whole-spices',
            'description' => 'Whole spices for grinding and cooking',
            'is_active' => true
        ],
        [
            'name' => 'Ground Spices',
            'slug' => 'ground-spices',
            'description' => 'Finely ground spices for easy use',
            'is_active' => true
        ],
        [
            'name' => 'Spice Blends',
            'slug' => 'spice-blends',
            'description' => 'Specialty spice mixes and masalas',
            'is_active' => true
        ],
        [
            'name' => 'Herbs',
            'slug' => 'herbs',
            'description' => 'Dried herbs for cooking',
            'is_active' => true
        ],
        [
            'name' => 'Peppercorns',
            'slug' => 'peppercorns',
            'description' => 'Various types of peppercorns',
            'is_active' => true
        ],
    ];

    foreach ($categories as $category) {
        \App\Models\Category::create($category);
    }
}
}
