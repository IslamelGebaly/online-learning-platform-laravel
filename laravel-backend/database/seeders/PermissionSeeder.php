<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $instructorPermissions = [
           'course-list',
           'course-create',
           'course-edit',
           'course-delete',
           'lesson-list',
           'lesson-create',
           'lesson-edit',
           'lesson-delete'
        ];

        $studentPermissions = [
            'enrollment-list',
            'enrollment-create',
            'enrollment-delete',
            'review-list',
            'review-create',
            'review-edit',
            'review-delete'
         ];

        foreach ($instructorPermissions as $permission) {
             Permission::create(['name' => $permission]);
        }

        foreach ($studentPermissions as $permission) {
            Permission::create(['name' => $permission]);
       }
    }
}
