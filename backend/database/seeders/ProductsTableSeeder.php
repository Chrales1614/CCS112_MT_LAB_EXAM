<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductsTableSeeder extends Seeder
{
    public function run()
    {
        Product::insert([
            [
                'name' => 'Rolex Submariner',
                'description' => 'A timeless classic with a sleek stainless steel case, ceramic bezel, and automatic movement.',
                'price' => 10999.99,
                'stock' => 5,
                'image' => 'https://th.bing.com/th/id/OIP.MTCCNEAkjNQXZf5gTW3O-wHaE8?rs=1&pid=ImgDetMain',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Patek Philippe Nautilus',
                'description' => 'Elegant sports watch with a blue dial, gold case, and perpetual calendar.',
                'price' => 42999.99,
                'stock' => 3,
                'image' => 'https://th.bing.com/th/id/OIP.IcK-o904KYpmI33T78ntEQHaHa?w=500&h=500&rs=1&pid=ImgDetMain',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Audemars Piguet Royal Oak',
                'description' => 'Luxury steel watch with an octagonal bezel and automatic chronograph movement.',
                'price' => 37999.99,
                'stock' => 4,
                'image' => 'https://www.audemarspiguet.com/content/dam/ap/com/products/watches/MTR010962AA/importer/watch.png.transform.apfw.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Omega Speedmaster',
                'description' => 'The legendary Moonwatch with a black dial, stainless steel case, and chronograph function.',
                'price' => 6999.99,
                'stock' => 6,
                'image' => 'https://th.bing.com/th/id/OIP.XFlP6xYfxH9fRRK7_c7EGAHaFP?rs=1&pid=ImgDetMain',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Tag Heuer Monaco',
                'description' => 'Square-shaped iconic watch with a blue dial and automatic movement.',
                'price' => 5499.99,
                'stock' => 8,
                'image' => 'https://www.watchtime.com/wp-content/uploads/2023/05/TAG-Heuer-Monaco-Chronograph-Skeleton-3-1500x1500.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Hublot Big Bang',
                'description' => 'A bold design featuring a fusion of materials and skeleton dial.',
                'price' => 15999.99,
                'stock' => 4,
                'image' => 'https://th.bing.com/th/id/OIP.oEF-UGkxop98zWpaezmGCAHaHa?rs=1&pid=ImgDetMain',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Richard Mille RM 11-03',
                'description' => 'Avant-garde luxury with a tonneau-shaped case and high-tech materials.',
                'price' => 149999.99,
                'stock' => 2,
                'image' => 'https://cdn2.chrono24.com/images/uhren/22099543-r3e07o52faouafgxil1eqiyf-ExtraLarge.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Cartier Santos',
                'description' => 'A luxurious timepiece with a square case, Roman numerals, and automatic movement.',
                'price' => 7999.99,
                'stock' => 7,
                'image' => 'https://th.bing.com/th/id/OIP.siWoqR-SbVgqfFDYnM6xMAHaE7?w=2000&h=1333&rs=1&pid=ImgDetMain',
                'created_at' => now(),
                'updated_at' => now(),
            ]
          
           
        ]);
    }
}
