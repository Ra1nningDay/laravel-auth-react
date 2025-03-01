<?php

namespace App\Http\Controllers\Post;

use App\Http\Controllers\Controller;
use App\Http\Requests\Post\PostRequest;
use App\Models\Post;
use App\Services\PostService;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

class PostController extends Controller
{
    protected $postService;

    public function __construct(PostService $postService) 
    {
        return $this->postService = $postService;
    }

    public function index()
    {
        $posts = Post::getAll();

        return response()->json(["message" => "Response Posts Successful!", "posts" => $posts],201);
    }

    public function create(PostRequest $request): JsonResponse
    {
        try {
            $validated = $request->validated();

            $post = $this->postService->create($validated);

            return response()->json(["message" => "Create Post Successful!", "post" => $post], 201);
        } catch(\Exception $e) {
            return response()->json(["message" => "Failed to Create Post", "error" => $e->getMessage()], 500);
        }
    }
}
