<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        // Standard spelling
        User::updateOrCreate([
            'email' => 'admin@arravaliessence.com',
        ], [
            'name' => 'Admin User',
            'password' => Hash::make('Vinay@123456'),
            'email_verified_at' => now(),
            'is_admin' => true,
            'role' => 'admin',
            'status' => 'active',
        ]);

        // Alias spelling with double 'l' (arravallessence.com)
        User::updateOrCreate([
            'email' => 'admin@arravallessence.com',
        ], [
            'name' => 'Admin User',
            'password' => Hash::make('Vinay@123456'),
            'email_verified_at' => now(),
            'is_admin' => true,
            'role' => 'admin',
            'status' => 'active',
        ]);

        // Alias spelling with double 'e' (arravalieessence.com)
        User::updateOrCreate([
            'email' => 'admin@arravalieessence.com',
        ], [
            'name' => 'Admin User',
            'password' => Hash::make('Vinay@123456'),
            'email_verified_at' => now(),
            'is_admin' => true,
            'role' => 'admin',
            'status' => 'active',
        ]);
    }       
    
}