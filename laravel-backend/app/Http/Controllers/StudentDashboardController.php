<?php

namespace App\Http\Controllers;

use App\Http\Resources\CourseResource;
use App\Models\Course;
use App\Models\Enrollment;
use Illuminate\Http\Request;

class StudentDashboardController extends Controller
{
    public function index(){
        $user = auth()->user();

        $numEnrollments = Enrollment::query()
                                    ->where("student_id", $user->id)
                                    ->count();

        $numInProgress = Enrollment::query()
                                    ->where("status", "in_progress")
                                    ->count();

        $numCompleted= Enrollment::query()
                                    ->where("status", "completed")
                                    ->count();

        $enrollments = Enrollment::query()
                                    ->where("student_id", $user->id)
                                    ->get()
                                    ->pluck("course_id");

        $courses = Course::query()
        ->whereIn("id", $enrollments)
        ->limit(10)
        ->get();

        return response()->json([
            "numEnrollments" => $numEnrollments,
            "numCompleted" => $numCompleted,
            "numInProgress" => $numInProgress,
            "courses" => CourseResource::collection($courses),
            "enrollments"=>$enrollments
        ]);
    }
}
