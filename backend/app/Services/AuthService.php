<?php 
namespace App\Services;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Role;

class AuthService 
{
    public function register($data){
        $user =  User::create([
            "name" => $data['name'],
            "email" => strtolower($data['email']),
            "password" => Hash::make($data['password']),
        ]);
        $role = Role::where('name', 'user')->first();

        if (!$role) {
            return response()->json(['message' => 'Role not found'], 404);
        }

        $user->roles()->attach($role);
        return [
            "user" => $user
        ];
    }

    public function login($data){
        $user = User::where('email', $data['email'])->first();

        if (!$user || !Hash::check($data['password'], $user->password)){
            return response(['message' => 'Bad cred'], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        $role = $user->roles()->first();
        
        return [
            'user' => $user,
            'role' => $role->name,
            'token' => $token
        ];
    }

    public function logout() {
        Auth::user()->currentAccessToken()->delete();
        return response()->json(["message" => "Logged Out"], 200);
    }
}