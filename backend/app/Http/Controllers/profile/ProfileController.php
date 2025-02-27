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
            
            $this->profileService->update($data);

            return response()->json(["message" => "Profile Updated Successful"] ,200);
        } catch(Exception $e) {
            return response()->json(["message" => "Update has failed", "error" => $e->getMessage()], 500);
        }
    }

    

    public function passwordCheck(UpdateRequest $request) {
        try {
            $passwordCheck = $request->validated();

            $data = $this->profileService->passwordCheck($passwordCheck['password'], Auth::user()->password);

            return response()->json($data, 200);
        } catch (Exception $e) {
            Log::error('Password check failed: ' . $e->getMessage());
            return response()->json(["message" => "Password check has failed", "error" => $e->getMessage()], 500);
        }
    }


    public function resetPassword(UpdateRequest $request) {
        try {
            $data = $request->validated();
            
            $this->profileService->resetPassword($data);

            return response()->json(["message" => "Password has been reset"], 200);
        } catch(Exception $e) {
            return response()->json(["message" => "Password reset has failed", "error" => $e->getMessage()], 500);
        }
    }
}
