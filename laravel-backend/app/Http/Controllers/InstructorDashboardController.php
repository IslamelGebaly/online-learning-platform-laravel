<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;

class InstructorDashboardController extends Controller
{
    public function index(){
        $user = auth()->user();

        $numCourses = Course::query()
                            ->where("instructor_id", $user->id)
                            ->count();

        return response()->json([
            "numCourses" => $numCourses,
        ]);
    }
}
