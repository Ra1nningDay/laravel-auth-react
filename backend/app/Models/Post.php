<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use \Illuminate\Database\Eloquent\Relations\BelongTo;

class Post extends Model
{
    use HasFactory;

    protected $table = "posts";

    protected $fillable = [
        "title",
        "content",
    ];

    public function type() {
        return $this->belongTo(PostType::clase, 'type_id');
    }
}
