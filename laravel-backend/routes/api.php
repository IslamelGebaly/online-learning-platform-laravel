<?php

use App\Http\Controllers\CourseController;
use App\Http\Controllers\EnrollmentController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\CorsMiddleware;
use App\Http\Middleware\InstructorMiddleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::group(["middleware" => CorsMiddleware::class], function() {

    Route::post('register', [UserController::class, "register"]);
    Route::post('login', [UserController::class, "login"]);
});

Route::group([
    "middleware" => "auth:api"
], function(){
    Route::get("profile", [UserController::class, "profile"]);
    Route::get("refresh", [UserController::class,"refreshToken"]);
    Route::post("logout", [UserController::class,"logout"]);

    //Instructor Role
    Route::group(["middleware"=> [InstructorMiddleware::class, CorsMiddleware::class]], function(){
        //Course Api
        Route::get("course/instructor", [CourseController::class, "instructorCourses"]);
        Route::post("course/create", [CourseController::class, "store"]);
        Route::get("course/{id}", [CourseController::class, "show"]);
        Route::put("course/update/{id}", [CourseController::class, "update"]);
        Route::delete("course/delete/{id}", [CourseController::class, "delete"]);

        //Lesson API
        Route::post("lesson/create", [LessonController::class, "store"]);
        Route::get("lesson/{id}", [LessonController::class, "show"]);
        Route::put("lesson/update/{id}", [LessonController::class, "update"]);
        Route::delete("lesson/delete/{id}", [LessonController::class, "delete"]);
    });

    //Student Role
    Route::group(["middleware"=> "student"], function(){
        //Enrollment API
        Route::post("enroll/create", [EnrollmentController::class, "store"]);
        Route::delete("enroll/drop", [EnrollmentController::class, "delete"]);

        //Review API
        Route::post("review/create", [ReviewController::class,"store"]);
        Route::put("review/update", [ReviewController::class, "update"]);
        Route::delete("review/delete", [ReviewController::class, "delete"]);
    });
});
