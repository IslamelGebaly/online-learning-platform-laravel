<?php

use App\Http\Controllers\CourseController;
use App\Http\Controllers\EnrollmentController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('register', [UserController::class, "register"]);
Route::post('login', [UserController::class, "login"]);



Route::group([
    "middleware" => "auth:api"
], function(){
    Route::get("profile", [UserController::class, "profile"]);
    Route::get("refresh", [UserController::class,"refreshToken"]);
    Route::get("logout", [UserController::class,"logout"]);

    //Course Api
    Route::post("course/create", [CourseController::class, "store"]);
    Route::put("course/update", [CourseController::class, "update"]);
    Route::delete("course/delete", [CourseController::class, "delete"]);

    //Lesson API
    Route::post("lesson/create", [LessonController::class, "store"]);
    Route::put("lesson/update", [LessonController::class, "update"]);
    Route::delete("lesspn/delete", [LessonController::class, "delete"]);

    //Enrollment API
    Route::post("enroll/create", [EnrollmentController::class, "store"]);
    Route::delete("enroll/drop", [EnrollmentController::class, "delete"]);

    //Review API
    Route::post("review/create", [ReviewController::class,"store"]);
    Route::put("review/update", [ReviewController::class, "update"]);
    Route::delete("review/delete", [ReviewController::class, "delete"]);
});
