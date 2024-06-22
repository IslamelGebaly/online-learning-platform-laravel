# Online Learning Platform App

## Introduction

An application made to help instructors provide courses and students to manage enrollments. Instructors can include multiple Lessons in their courses. Students and instructors can view their stats in a dashboard. Instructors can create update and delete courses, view their courses in a table or individually, and view lessons within their courses

## Features

-   Create, update, and delete courses
-   Seperate dashboard for student and instructor
-   View lessons inside an individual course
-   View and delete lessons
-   Students can view their own enrolled courses

## Technologies

-   Php Laravel
-   React js
-   Tailwind
-   MySQL

## Installation

1. Clone the project
2. Navigate to the project's root directory using terminal
3. Create .env file - `cp .env.example .env`
4. Add your MySQL db information to the .env file
5. Execute `composer install`
6. Execute `npm install`
7. generate key - `php artisan jwt:secret`
8. Add it to your .env file with the key JWT_SECRET
9. Execute migrations and seed data - `php artisan migrate --seed`
10. Execute `cd react-frontend`
11. Start vite server - `npm start`
12. Execute `cd .. && cd laravel-backend`
13. Start Artisan server - `php artisan serve`
