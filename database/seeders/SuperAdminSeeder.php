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
        $superAdminRole = Role::updateOrCreate([
            'name' => 'Super Admin'
        ]);
        
        $adminRole = Role::updateOrCreate([
            'name' => 'Admin'
        ]);

        User::updateOrCreate([
            'email' => 'super@admin.com',
        ], [
            'name' => 'Super Admin',
            'role_id' => $superAdminRole->id
        ]);
    }
}
