<?php

namespace App\Http\Controllers\Profile;

use App\Http\Controllers\Controller;
use App\Http\Requests\Profile\UpdateRequest;
use App\Services\ProfileService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ProfileController extends Controller
{
    protected $profileService;

    public function __construct(ProfileService $profileService){
        $this->profileService = $profileService;
    }

    public function show(Request $request) {
        return response()->json($request->user(), 200);
    }

    public function update(UpdateRequest $request) {
        try {
            $data = $request->validated();
            
            $user = $this->profileService->update($data);

            return response()->json($user, 200);
        } catch(Exception $e) {
            return response()->json(["message" => "Update has failed", "error" => $e->getMessage()], 500);
        }
    }

    

    public function passwordCheck(Request $request) {
        $request->validate([
            'password' => 'required|string|min:6',
        ]);

        try {
            $user = Auth::user();

            if (!$user) {
                return response()->json(["message" => "User not authenticated"], 401);
            }

            $inputPassword = trim($request->password);
            $hashedPassword = $user->password;

            // Log ข้อมูลเพื่อตรวจสอบค่า
            Log::info('Password Check:', [
                'input_password' => $inputPassword,
                'hashed_password' => $hashedPassword,
                'hash_check_result' => Hash::check($inputPassword, $hashedPassword)
            ]);

            if (Hash::check($inputPassword, $hashedPassword)) {
                return response()->json(["message" => "Password is correct", "success" => true], 200);
            } else {
                return response()->json(["message" => "Password is incorrect","success" => false], 401);
            }
        } catch (Exception $e) {
            Log::error('Password check failed: ' . $e->getMessage());
            return response()->json(["message" => "Password check has failed", "error" => $e->getMessage()], 500);
        }
    }


    public function resetPassword(Request $request) {
        $request->validate([
            'password' => 'required|string|min:6',
        ]);
        try {
            $user = Auth::user();

            $password = $request->password;

            $user->password = Hash::make($password);
            $user->save();

            return response()->json(["message" => "Password has been reset"], 200);
        } catch(Exception $e) {
            return response()->json(["message" => "Password reset has failed", "error" => $e->getMessage()], 500);
        }
    }
}
