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
                'description' => 'Premium green cardamom pods from Kerala hills. Known as the "Queen of Spices", these aromatic pods add a sweet, floral flavor to both sweet and savory dishes.',
                'short_description' => 'Premium green cardamom pods from Kerala',
                'price' => 24.99,
                'sale_price' => 19.99,
                'quantity' => 50,
                'image' => 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500',
                'weight' => 100,
                'is_featured' => true,
            ],
            [
                'category_id' => $wholeSpices->id,
                'name' => 'Black Peppercorns',
                'description' => 'Whole black peppercorns from Malabar coast. These peppercorns offer a sharp, pungent flavor that enhances any dish.',
                'short_description' => 'Whole black peppercorns from Malabar',
                'price' => 18.99,
                'quantity' => 75,
                'image' => 'https://images.unsplash.com/photo-1599909533730-b5b6e4b5b5b5?w=500',
                'weight' => 200,
            ],
            [
                'category_id' => $wholeSpices->id,
                'name' => 'Cinnamon Sticks',
                'description' => 'Ceylon cinnamon sticks with sweet, delicate flavor. Perfect for teas, desserts, and savory dishes.',
                'short_description' => 'Ceylon cinnamon sticks',
                'price' => 16.99,
                'quantity' => 60,
                'image' => 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500',
                'weight' => 150,
            ],

            // Ground Spices
            [
                'category_id' => $groundSpices->id,
                'name' => 'Turmeric Powder',
                'description' => 'Pure turmeric powder with high curcumin content. Known for its anti-inflammatory properties and golden color.',
                'short_description' => 'Pure turmeric powder with high curcumin',
                'price' => 12.99,
                'sale_price' => 9.99,
                'quantity' => 100,
                'image' => 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500',
                'weight' => 250,
                'is_featured' => true,
            ],
            [
                'category_id' => $groundSpices->id,
                'name' => 'Red Chili Powder',
                'description' => 'Fiery red chili powder made from premium Kashmiri chilies. Adds heat and vibrant color to dishes.',
                'short_description' => 'Fiery red chili powder from Kashmiri chilies',
                'price' => 14.99,
                'quantity' => 80,
                'image' => 'https://images.unsplash.com/photo-1583306985093-e5b8e6b5b5b5?w=500',
                'weight' => 200,
            ],
            [
                'category_id' => $groundSpices->id,
                'name' => 'Coriander Powder',
                'description' => 'Freshly ground coriander seeds with citrusy, nutty flavor. Essential for Indian cooking.',
                'short_description' => 'Freshly ground coriander powder',
                'price' => 11.99,
                'quantity' => 90,
                'image' => 'https://images.unsplash.com/photo-1599909533730-b5b6e4b5b5b5?w=500',
                'weight' => 200,
            ],

            // Spice Blends
            [
                'category_id' => $spiceBlends->id,
                'name' => 'Garam Masala',
                'description' => 'Traditional garam masala blend with cardamom, cinnamon, cloves, and black pepper. The heart of Indian cuisine.',
                'short_description' => 'Traditional garam masala blend',
                'price' => 18.99,
                'sale_price' => 15.99,
                'quantity' => 70,
                'image' => 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500',
                'weight' => 150,
                'is_featured' => true,
            ],
            [
                'category_id' => $spiceBlends->id,
                'name' => 'Biryani Masala',
                'description' => 'Aromatic biryani masala blend perfect for rice dishes. Contains saffron, cardamom, and other premium spices.',
                'short_description' => 'Aromatic biryani masala blend',
                'price' => 22.99,
                'quantity' => 45,
                'image' => 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500',
                'weight' => 100,
            ],
            [
                'category_id' => $spiceBlends->id,
                'name' => 'Curry Powder',
                'description' => 'Authentic curry powder blend with turmeric, coriander, cumin, and fenugreek. Perfect for curries and marinades.',
                'short_description' => 'Authentic curry powder blend',
                'price' => 16.99,
                'quantity' => 65,
                'image' => 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500',
                'weight' => 200,
            ],

            // Herbs
            [
                'category_id' => $herbs->id,
                'name' => 'Dried Mint Leaves',
                'description' => 'Premium dried mint leaves with refreshing aroma. Perfect for teas, chutneys, and garnishing.',
                'short_description' => 'Premium dried mint leaves',
                'price' => 13.99,
                'quantity' => 55,
                'image' => 'https://images.unsplash.com/photo-1544216717-3bbf52512659?w=500',
                'weight' => 50,
            ],
            [
                'category_id' => $herbs->id,
                'name' => 'Dried Fenugreek Leaves',
                'description' => 'Aromatic dried fenugreek leaves (Kasoori Methi). Adds a unique bitter-sweet flavor to dishes.',
                'short_description' => 'Aromatic dried fenugreek leaves',
                'price' => 15.99,
                'quantity' => 40,
                'image' => 'https://images.unsplash.com/photo-1544216717-3bbf52512659?w=500',
                'weight' => 75,
            ],

            // Premium Collection
            [
                'category_id' => $premium->id,
                'name' => 'Kashmiri Saffron',
                'description' => 'Premium Kashmiri saffron threads, the most expensive spice in the world. Adds luxury and flavor to dishes.',
                'short_description' => 'Premium Kashmiri saffron threads',
                'price' => 89.99,
                'sale_price' => 79.99,
                'quantity' => 20,
                'image' => 'https://images.unsplash.com/photo-1599909533730-b5b6e4b5b5b5?w=500',
                'weight' => 5,
                'is_featured' => true,
            ],
            [
                'category_id' => $premium->id,
                'name' => 'Black Cardamom',
                'description' => 'Large black cardamom pods with smoky flavor. Perfect for meat dishes and biryanis.',
                'short_description' => 'Large black cardamom pods',
                'price' => 32.99,
                'quantity' => 30,
                'image' => 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500',
                'weight' => 100,
            ],
            [
                'category_id' => $premium->id,
                'name' => 'Star Anise',
                'description' => 'Whole star anise with sweet licorice flavor. Essential for Chinese five-spice and Indian garam masala.',
                'short_description' => 'Whole star anise',
                'price' => 28.99,
                'quantity' => 35,
                'image' => 'https://images.unsplash.com/photo-1599909533730-b5b6e4b5b5b5?w=500',
                'weight' => 100,
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}