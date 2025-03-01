<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Post\PostController;
use App\Http\Controllers\Profile\ProfileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('auth')->group(function () {
    // Route::get('/profile', [AuthController::class, 'show']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login'])->name('login');
});

Route::prefix('profile')->middleware('auth:sanctum')->group(function () {
    Route::get('/', [ProfileController::class, 'show']);
    Route::put('/', [ProfileController::class, 'update']);
    Route::post('/password-check', [ProfileController::class, 'passwordCheck']);
    Route::put('/reset-password', [ProfileController::class, 'resetPassword']);
});

Route::prefix('post')->middleware('auth:sanctum')->group(function(){
    Route::get('/', [PostController::class, 'index']);
    Route::get('/show', [PostController::class, 'show']);
    Route::post('/create', [PostController::class, 'create']);
    Route::put('/update', [PostController::class, 'update']);
    Route::delete('/destroy', [PostController::class, 'destroy']);
});