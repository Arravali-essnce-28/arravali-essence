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
            [
                'category_id' => $wholeSpices->id,
                'name' => 'Cinnamon Sticks',
                'description' => 'Ceylon cinnamon sticks with sweet, delicate flavor. Perfect for teas, desserts, and savory dishes. Rolled by hand for optimal quality and aroma.',
                'short_description' => 'Ceylon cinnamon sticks',
                'price' => 16.99,
                'quantity' => 60,
                'image' => 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=500&fit=crop',
                'weight' => 150,
            ],
            [
                'category_id' => $wholeSpices->id,
                'name' => 'Cloves',
                'description' => 'Aromatic whole cloves with strong, pungent flavor. Essential for pickling, mulled wine, and savory dishes. High oil content for maximum flavor.',
                'short_description' => 'Aromatic whole cloves',
                'price' => 22.99,
                'quantity' => 40,
                'image' => 'https://images.unsplash.com/photo-1582734158340-b3c5c5b0c9b1?w=500&h=500&fit=crop',
                'weight' => 100,
            ],

            // Ground Spices
            [
                'category_id' => $groundSpices->id,
                'name' => 'Turmeric Powder',
                'description' => 'Pure turmeric powder with high curcumin content. Known for its anti-inflammatory properties and golden color. Perfect for curries, golden milk, and natural food coloring.',
                'short_description' => 'Pure turmeric powder with high curcumin',
                'price' => 12.99,
                'sale_price' => 9.99,
                'quantity' => 100,
                'image' => 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&h=500&fit=crop',
                'weight' => 250,
                'is_featured' => true,
            ],
            [
                'category_id' => $groundSpices->id,
                'name' => 'Red Chili Powder',
                'description' => 'Fiery red chili powder made from premium Kashmiri chilies. Adds heat and vibrant color to dishes. Medium heat level with rich flavor.',
                'short_description' => 'Fiery red chili powder from Kashmiri chilies',
                'price' => 14.99,
                'quantity' => 80,
                'image' => 'https://images.unsplash.com/photo-1583306985093-e5b8e6b5b5b5?w=500&h=500&fit=crop',
                'weight' => 200,
            ],
            [
                'category_id' => $groundSpices->id,
                'name' => 'Coriander Powder',
                'description' => 'Freshly ground coriander seeds with citrusy, nutty flavor. Essential for Indian cooking and spice blends. Adds subtle sweetness to dishes.',
                'short_description' => 'Freshly ground coriander powder',
                'price' => 11.99,
                'quantity' => 90,
                'image' => 'https://images.unsplash.com/photo-1599909533730-b5b6e4b5b5b5?w=500&h=500&fit=crop',
                'weight' => 200,
            ],
            [
                'category_id' => $groundSpices->id,
                'name' => 'Cumin Powder',
                'description' => 'Aromatic cumin powder with earthy, warm flavor. Staple in Indian, Middle Eastern, and Latin American cuisines. Perfect for curries and stews.',
                'short_description' => 'Aromatic cumin powder',
                'price' => 13.99,
                'quantity' => 85,
                'image' => 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=500&fit=crop',
                'weight' => 200,
            ],

            // Spice Blends
            [
                'category_id' => $spiceBlends->id,
                'name' => 'Garam Masala',
                'description' => 'Traditional garam masala blend with cardamom, cinnamon, cloves, and black pepper. The heart of Indian cuisine. Perfect for finishing dishes.',
                'short_description' => 'Traditional garam masala blend',
                'price' => 18.99,
                'sale_price' => 15.99,
                'quantity' => 70,
                'image' => 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=500&fit=crop',
                'weight' => 150,
                'is_featured' => true,
            ],
            [
                'category_id' => $spiceBlends->id,
                'name' => 'Biryani Masala',
                'description' => 'Aromatic biryani masala blend perfect for rice dishes. Contains saffron, cardamom, and other premium spices. Creates authentic biryani flavor.',
                'short_description' => 'Aromatic biryani masala blend',
                'price' => 22.99,
                'quantity' => 45,
                'image' => 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&h=500&fit=crop',
                'weight' => 100,
            ],
            [
                'category_id' => $spiceBlends->id,
                'name' => 'Curry Powder',
                'description' => 'Authentic curry powder blend with turmeric, coriander, cumin, and fenugreek. Perfect for curries and marinades. Versatile and flavorful.',
                'short_description' => 'Authentic curry powder blend',
                'price' => 16.99,
                'quantity' => 65,
                'image' => 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&h=500&fit=crop',
                'weight' => 200,
            ],
            [
                'category_id' => $spiceBlends->id,
                'name' => 'Tandoori Masala',
                'description' => 'Vibrant tandoori spice blend for marinades and grilling. Gives authentic tandoori flavor and color to meats and vegetables.',
                'short_description' => 'Vibrant tandoori spice blend',
                'price' => 19.99,
                'quantity' => 55,
                'image' => 'https://images.unsplash.com/photo-1582734158340-b3c5c5b0c9b1?w=500&h=500&fit=crop',
                'weight' => 150,
            ],

            // Herbs
            [
                'category_id' => $herbs->id,
                'name' => 'Dried Mint Leaves',
                'description' => 'Premium dried mint leaves with refreshing aroma. Perfect for teas, chutneys, and garnishing. Intense mint flavor that lasts.',
                'short_description' => 'Premium dried mint leaves',
                'price' => 13.99,
                'quantity' => 55,
                'image' => 'https://images.unsplash.com/photo-1544216717-3bbf52512659?w=500&h=500&fit=crop',
                'weight' => 50,
            ],
            [
                'category_id' => $herbs->id,
                'name' => 'Dried Fenugreek Leaves',
                'description' => 'Aromatic dried fenugreek leaves (Kasoori Methi). Adds a unique bitter-sweet flavor to dishes. Essential for Indian curries.',
                'short_description' => 'Aromatic dried fenugreek leaves',
                'price' => 15.99,
                'quantity' => 40,
                'image' => 'https://images.unsplash.com/photo-1544216717-3bbf52512659?w=500&h=500&fit=crop',
                'weight' => 75,
            ],
            [
                'category_id' => $herbs->id,
                'name' => 'Bay Leaves',
                'description' => 'Aromatic bay leaves for soups, stews, and braises. Adds subtle depth and complexity to slow-cooked dishes.',
                'short_description' => 'Aromatic bay leaves',
                'price' => 10.99,
                'quantity' => 80,
                'image' => 'https://images.unsplash.com/photo-1544216717-3bbf52512659?w=500&h=500&fit=crop',
                'weight' => 30,
            ],

            // Premium Collection
            [
                'category_id' => $premium->id,
                'name' => 'Kashmiri Saffron',
                'description' => 'Premium Kashmiri saffron threads, the most expensive spice in the world. Adds luxury and flavor to dishes. Hand-picked for quality.',
                'short_description' => 'Premium Kashmiri saffron threads',
                'price' => 89.99,
                'sale_price' => 79.99,
                'quantity' => 20,
                'image' => 'https://images.unsplash.com/photo-1599909533730-b5b6e4b5b5b5?w=500&h=500&fit=crop',
                'weight' => 5,
                'is_featured' => true,
            ],
            [
                'category_id' => $premium->id,
                'name' => 'Black Cardamom',
                'description' => 'Large black cardamom pods with smoky flavor. Perfect for meat dishes and biryanis. Adds depth and complexity to rich dishes.',
                'short_description' => 'Large black cardamom pods',
                'price' => 32.99,
                'quantity' => 30,
                'image' => 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&h=500&fit=crop',
                'weight' => 100,
            ],
            [
                'category_id' => $premium->id,
                'name' => 'Star Anise',
                'description' => 'Whole star anise with sweet licorice flavor. Essential for Chinese five-spice and Indian garam masala. Beautiful star shape.',
                'short_description' => 'Whole star anise',
                'price' => 28.99,
                'quantity' => 35,
                'image' => 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&h=500&fit=crop',
                'weight' => 100,
            ],
            [
                'category_id' => $premium->id,
                'name' => 'Vanilla Beans',
                'description' => 'Premium Madagascar vanilla beans. Perfect for baking, desserts, and beverages. Rich aroma and flavor.',
                'short_description' => 'Premium Madagascar vanilla beans',
                'price' => 45.99,
                'quantity' => 25,
                'image' => 'https://images.unsplash.com/photo-1582734158340-b3c5c5b0c9b1?w=500&h=500&fit=crop',
                'weight' => 15,
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}