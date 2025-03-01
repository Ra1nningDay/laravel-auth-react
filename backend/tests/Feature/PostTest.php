<?php

namespace Tests\Feature;

use App\Models\Post;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
// use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class PostTest extends TestCase
{
    // use DatabaseTransactions;
    /**
     * A basic feature test example.
     */
    public function test_example(): void
    {
        $user = User::factory()->create();

        $post = Post::factory()->create([
            'type_id' => 1,
            'user_id' => $user->id,
        ]);

        $this->assertDatabaseHas('posts', [
            'user_id' => $user->id,
            'type_id' => 1,
        ]);
    }
}
