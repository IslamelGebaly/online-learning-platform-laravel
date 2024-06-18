<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'TestInstructor',
            'email' => 'instructor@example.com',
        ]);

        User::factory()->create([
            'name' => 'TestStudent',
            'email' => 'student@example.com',
        ]);

        Course::factory()
            ->count(10)
            ->hasLessons(10)
            ->hasReviews(10)
            ->hasEnrollments(1)
            ->create();

    }
}
