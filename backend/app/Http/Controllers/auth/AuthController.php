<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\auth\LoginRequest;
use App\Http\Requests\auth\RegisterRequest;
use App\Services\AuthService;
use Exception;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    protected $authService;

    public function __construct(AuthService $authService){
        $this->authService = $authService;
    }

    public function show(Request $request) {
        return response()->json($request->user(), 200);
    }
    
    public function register (RegisterRequest $request) {
        try {
            $data = $request->validated();
            
            $user = $this->authService->register($data);

            return response()->json($user, 201);
        } catch(Exception $e) {
            return response()->json(["message" => "Register has failed", "error" => $e->getMessage()], 500);
        }
    }

    public function login(LoginRequest $request) {
        try {
            $data = $request->validated();

            $user = $this->authService->login($data);

            return response()->json(["message" => "Login Successful", "token" => $user['token']],200);
        } catch(Exception $e) {
            return response()->json(["message" => "Login has failed", "error" => $e->getMessage()], 500);
        }
    }

    public function logut(Request $request) {
        try {
            $this->authService->logout();
            
            return response()->json(["message" => "Logut Successful"],200);
        } catch(Exception $e) {
            return response()->json(["message" => "Logout failed", "error" => $e->getMessage()], 500);
        }
    }
}
