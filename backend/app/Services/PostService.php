<?php 
namespace App\Services;

use App\Models\Post;
use App\Models\PostType;
use App\Models\User;
use Illuminate\Support\Facades\Auth;


class PostService 
{
    public function create(array $data) {
        $user = Auth::user();
        if (!$user) {
            return ["message" => "Bad Credentials"];
        }

        if ($data['user_id'] !== $user->id){
            return ["message" => "Unauthorized Credentials"];
        }

        $post = Post::create([
            "type_id" => $data['type_id'],
            "user_id" => $data['user_id'],
            "title" => $data['title'],
            "content" => $data['content'],
        ]);

        return [
            "user" => $user,
            "post" => $post,
        ];
    }
}