<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Whole Spices',
                'slug' => 'whole-spices',
                'description' => 'Premium whole spices for authentic flavors',
                'image' => 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400',
                'is_active' => true,
            ],
            [
                'name' => 'Ground Spices',
                'slug' => 'ground-spices',
                'description' => 'Freshly ground spices for convenience',
                'image' => 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400',
                'is_active' => true,
            ],
            [
                'name' => 'Spice Blends',
                'slug' => 'spice-blends',
                'description' => 'Expertly crafted spice blends',
                'image' => 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
                'is_active' => true,
            ],
            [
                'name' => 'Herbs',
                'slug' => 'herbs',
                'description' => 'Fresh and dried herbs',
                'image' => 'https://images.unsplash.com/photo-1544216717-3bbf52512659?w=400',
                'is_active' => true,
            ],
            [
                'name' => 'Premium Collection',
                'slug' => 'premium-collection',
                'description' => 'Our finest selection of rare spices',
                'image' => 'https://images.unsplash.com/photo-1599909533730-b5b6e4b5b5b5?w=400',
                'is_active' => true,
            ],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}