<?php 
namespace App\Services;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthService 
{
    public function register($data){
        return User::create([
            "name" => $data['name'],
            "email" => strtolower($data['email']),
            "password" => Hash::make($data['password']),
        ]);
    }

    public function login($data){
        $user = User::where('email', $data['email'])->first();

        if (!$user || !Hash::check($data['password'], $user->password)){
            return response(['message' => 'Bad cred'], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;
        
        return [
            "user" => $user,
            "token" => $token,
        ];
    }

    public function logout() {
        Auth::user()->token()->logout();
        return response()->json(["message" => "Logged Out"], 200);
    }
}