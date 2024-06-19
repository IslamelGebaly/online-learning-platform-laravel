<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $instructorRole = Role::create(["name" => "instructor"]);
        $studentRole = Role::create(["name"=> "student"]);

        $instructor = User::factory()->create([
            'name' => 'TestInstructor',
            'email' => 'instructor@example.com',
        ]);

        $instructor->assignRole('instructor');

        $student = User::factory()->create([
            'name' => 'TestStudent',
            'email' => 'student@example.com',
        ]);

        $student->assignRole('student');

        Course::factory()
            ->count(10)
            ->hasLessons(10)
            ->hasReviews(10)
            ->hasEnrollments(1)
            ->create();

    }
}
