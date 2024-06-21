<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{

    public function run()
    {
        $instructorRole = Role::create(['name' => 'instructor']);
        $studentRole = Role::create(["name" => "student"]);
    }

}
