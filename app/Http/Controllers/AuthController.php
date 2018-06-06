<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Validator;
use App\User;

class AuthController extends Controller
{
    public function _constructor() {
        $this->middleware('auth:api', ['except' => ['register','login', 'respondWithToken', 'guard']]);
    }

    public function register(Request $request) {
        $rules = [
            'firstName' => 'required',
            'lastName' => 'required',
            'email' => 'unique:users|required',
            'password' => 'required'
        ];

        $input = $request->only('name', 'firstName', 'lastName', 'email', 'password');
        $validator = Validator::make($input, $rules);

        if($validator->fails()) {
            return response()->json(['success' => false, 'error' => $validator->messages()]);
        }

        $firstName = $request->firstName;
        $lastName = $request->lastName;
        $email = $request->email;
        $password = $request->password;

        $user = User::create([
            'firstName' => $firstName,
            'lastName' => $lastName,
            'email' => $email,
            'password' => Hash::make($password)
        ]);

        $input = $request->only('email', 'password');
        if($token = $this->guard()->attempt($input)) {
            return $this->respondWithToken($token);
        }
    }

    public function login(Request $request) {
        $input = $request->only('email', 'password');
        if($token = $this->guard()->attempt($input)) {
            return $this->respondWithToken($token);
        }

        return response()->json(['success' => false, 'error' => 'Unauthorized'], 401);
    }

    public function guard() {
        return Auth::guard();
    }

    public function respondWithToken($token) {
        return response()->json([
            'success' => true,
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => $this->guard()->factory()->getTTL() * 60 * 60

        ]);
    }

    public function me() {
        return response()->json($this->guard()->user());
    }
}
