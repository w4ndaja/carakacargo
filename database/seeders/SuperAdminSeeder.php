<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;

class SuperAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::updateOrCreate([
            'email' => 'super@admin.com',
        ], [
            'name' => 'Super Admin',
            'role' => 'Super Admin',
            'password' => bcrypt('password'),
        ]);
    }
}
