<?php

namespace Database\Factories;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    protected $model = Post::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
           'user_id' => User::factory(),  // สร้างผู้ใช้ใหม่และเก็บ user_id ไว้ในโพสต์
            'type_id' => 1,  // กำหนดค่า type_id สำหรับโพสต์
            'title' => $this->faker->sentence,
            'content' => $this->faker->text,
        ];
    }
}
