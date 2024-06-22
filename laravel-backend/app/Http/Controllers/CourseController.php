<?php

namespace App\Http\Controllers;

use App\Http\Resources\CourseResource;
use App\Http\Resources\LessonResource;
use App\Http\Resources\UserResource;
use App\Models\Course;
use App\Http\Requests\StoreCourseRequest;
use App\Http\Requests\UpdateCourseRequest;
use App\Models\Lesson;
use App\Models\User;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCourseRequest $request)
    {
        $data = $request->validated();
        $data["instructor_id"] = auth()->user()->id;

        Course::create($data);

        return response()->json([
            "status" => true,
            "message"=> "New course has been submitted.",
            "data" => $data
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $course = Course::findOrFail($id);
        $lessons = Lesson::where("course_id", $course->id)->get();
        return response()->json([
            "status" => true,
            "message"=> "Showing course",
            "course" => new CourseResource($course),
            "lessons" => LessonResource::collection($lessons),
        ]);
    }

    //Return all courses taught by one instructor
    public function instructorCourses(){
        $user = auth()->user();
        $courses = Course::where("instructor_id", $user->id)->get();

        return response()->json([
            "status" => true,
            "courses" => CourseResource::collection($courses),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCourseRequest $request, $id)
    {
        $data = $request->validated();
        $course = Course::findOrFail($id);
        $course->update($data);

        return response()->json([
            "status" => true,
            "message"=> "Course has been successfully updated",
            "course" => new CourseResource($course),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function delete($id)
    {
        $course = Course::findOrFail($id);
        $course->lessons()->delete();
        $course->reviews()->delete();
        $course->enrollments()->delete();
        $course->delete();

        return response()->json([
            "status" => true,
            "message" => "Course has been successfully deleted"
        ]);
    }
}
