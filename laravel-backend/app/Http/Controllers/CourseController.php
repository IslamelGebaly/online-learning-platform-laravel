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

    //Return all courses that the user hasn't enrolled in yet
    public function browseCourses(){
        //Get the enrollments that belong to the authenticated user
        $user = auth()->user();
        try{
            $enrollments = $user->enrollments();
            //Get the enrolled courses of the student
            $enrolledCourses = $enrollments->pluck("course_id");
            //Get all courses that the user hasn't enrolled in
            $courses = Course::whereNotIn("id", $enrolledCourses)->get();
        }catch(\Exception $e){
            return response()->json([
                "status"=> false,
                "message"=> $e->getMessage(),
                "courses" => [],
            ]);
        }


        return response()->json([
            "status"=> true,
            "courses"=> CourseResource::collection($courses),
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
