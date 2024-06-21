<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    //Handles login (POST)
    public function login(Request $request){
        //validate request
        $request->validate([
            "email" => "required|email",
            "password" => "required",
            "role" => Rule::in(["instructor", "student"]),
        ]);

        //Checking whether the user role is correct
        $users = User::role($request["role"])->get();
        if (!$users->where("email", $request["email"])->first())
        {
            return response()->json([
                "status" => false,
                "message" => "Invalid Role",
            ]);
        }

        //JWTAuth and attempt
        $token = JWTAuth::attempt([
            "email" => $request->email,
            "password" => $request->password,
        ]);
        //response
        if (!empty($token)){
            return response()->json([
                "status" => true,
                "message" => "Logged in successfully",
                "token" => $token,
                "user" => new UserResource($users->where("email", $request["email"])->first()),
            ]);
        }

        return response()->json([
            "status" => false,
            "message" => "Invalid Credentials",
        ]);
    }

    //Handles Registration (POST)
    public function register(StoreUserRequest $request)
    {
        //Getting validated data from the request object
        $data = $request->validated();
        //encrypting password
        $data["password"] = bcrypt($data["password"]);
        $data["email_verified_at"] = now();

        $role = $request["role"];
        unset($data["role"]);

        $user = User::create($data);
        $user->assignRole($role);

        $payload = ['user_id' => $user->id]; // Replace with minimal user data
        $token = JWTAuth::fromUser($user, $payload);

        return response()->json([
            "status" => true,
            "message" => "User created successfully",
            "token" => $token,
            "user" => new UserResource($user),
        ]);
    }

    //Gets User Profile (GET)
    public function profile(){
        $user = auth()->user();

        return response()->json([
            "status" => true,
            "message" => "Profile data returned successfully",
            "user" => $user,
        ]);
    }

    //Refreshes Token (GET)
    public function refreshToken(){
        $newToken = auth()->refresh();

        return response()->json([
            "status"=> true,
            "message"=> "New token value generated",
            "token"=> $newToken,
        ]);
    }

    //Logout (GET)
    public function logout(){
        auth()->logout();

        return response()->json([
            "status"=> true,
            "message"=> "User logged out successfully",
            ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */



    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
}
