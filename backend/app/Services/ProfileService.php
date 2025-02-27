<?php 
namespace App\Services;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class ProfileService 
{
    public function update(array $data){
        $user = Auth::user();

        if (!$user) {
            return response()->json(["message" => "User not authenticated"], 401);
        }

        $user->update($data);
    }

    public function passwordCheck($inputPassword, $hashedPassword) 
    {    
        if (Hash::check(trim($inputPassword), $hashedPassword)) {
            return ["message" => "Password is correct", "success" => true];
        } else {
            return ["message" => "Password is incorrect","success" => false];
        }
    }

    public function resetPassword(array $data) {
        $user = Auth::user();

        if (!$user) {
            return response()->json(["message" => "User not authenticated"], 401);
        }

        if (!isset($data['password']) || empty($data['password'])) {
            return response()->json(["message" => "Password is required"], 400);
        }

        $user->password = Hash::make($data['password']);
        $user->save();
    }
}