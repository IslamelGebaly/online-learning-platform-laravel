<?php

namespace App\Http\Controllers;

use App\Http\Resources\LessonResource;
use App\Models\Lesson;
use App\Http\Requests\StoreLessonRequest;
use App\Http\Requests\UpdateLessonRequest;

class LessonController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    public function courseLessons($id){
        $lessons = Lesson::where("course_id", $id)->get();

        return response()->json([
            "status" => true,
            "lessons" => LessonResource::collection($lessons),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLessonRequest $request)
    {
        $data = $request->validated();

        Lesson::create($data);

        return response()->json([
            "status" => true,
            "message"=> "New lesson has been submitted.",
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $lesson = Lesson::findOrFail($id);
        return response()->json([
            "status" => true,
            "message"=> "Showing course",
            "lesson" => new LessonResource($lesson),
        ]);
    }

    /**
     * Show the form for editing the specified resource.

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLessonRequest $request, $id)
    {
        $data = $request->validated();
        $lesson = Lesson::findOrFail($id);
        $lesson->update($data);
        return response()->json([
            "status" => true,
            "message"=> "Lesson has been successfully updated",
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function delete($id)
    {
        $lesson = Lesson::find($id);
        $lesson->delete();

        return response()->json([
            "status" => true,
            "message" => "Message has been successfully deleted"
        ]);
    }
}
