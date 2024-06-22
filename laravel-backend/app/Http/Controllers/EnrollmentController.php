<?php

namespace App\Http\Controllers;

use App\Models\Enrollment;
use App\Http\Requests\StoreEnrollmentRequest;
use App\Http\Requests\UpdateEnrollmentRequest;

class EnrollmentController extends Controller
{

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEnrollmentRequest $request)
    {
        $data = $request->validated();
        $data["student_id"] = auth()->user()->id;
        try{
            Enrollment::create($data);

        }catch(\Exception $e){
            return response()->json([
                "status" => false,
                "message"=> $e,
                "data" => $data
            ]);
        }
        return response()->json([
            "status" => true,
            "message"=> "You have in enrolled into the course successfully",
        ]);
    }

    public function destroy(Enrollment $enrollment)
    {
        $enrollment->delete();
        return response()->json([
            "status"=> true,
            "message"=> "Enrollment deleted successfully",
        ]);
    }
}
