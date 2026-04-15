<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate([
            'email' => 'admin@arravaliessence.com',
        ], [
            'name' => 'Admin User',
            'password' => Hash::make('Vinay@135246'),
            'email_verified_at' => now(),
            'is_admin' => true,
        ]);
    }       
    
}