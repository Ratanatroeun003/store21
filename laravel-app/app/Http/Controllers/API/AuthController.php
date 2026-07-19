<?php

namespace App\Http\Controllers\API;
use App\Models\User;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\SigninRequest;
use App\Http\Requests\Auth\SignupRequest;
use App\Http\Resources\Auth\UserResource;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    function signup(SignupRequest $request) 
    {
      
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password'=> $request -> password,
        ]);
        return response([
            'message' => 'User signed up.',
            'user' => new UserResource($user)
        ],201);
    }
    function signin(SigninRequest $request){
      
        $user = User::where('email',$request -> email)->first();
        if(!Hash::check($request->password,$user->password)){
            throw ValidationException::withMessages([
                'password'=>"Password dose not match!",
            ]);
        };
        $token = $user->createToken('auth_token') -> plainTextToken;
        return response([
            'message'=> "User signed in.",
            'user' => new UserResource($user),
            'token'=> $token,
        ],200);
    }
    function signout(Request $request){
        $request ->user()->currentAccessToken()->delete();
        return response([
            'message'=>"User signed out."
        ],200);
    }
    function verify(Request $request){
        return response([
            'message'=> 'Token is valid.',
            'user'=> new UserResource($request-> user())
        ],200);
    }
}
