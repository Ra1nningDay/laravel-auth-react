<?php

namespace App\Http\Controllers\Profile;

use App\Http\Controllers\Controller;
use App\Http\Requests\Profile\UpdateRequest;
use App\Services\ProfileService;
use Illuminate\Http\Request;

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
}
