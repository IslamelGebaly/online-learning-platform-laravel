<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    use HasFactory;

    protected $fillable = [
        "title",
        "image_path",
        "video_path",
        "supporting_material",
    ];

    public function course(){
        return $this->belongsTo(Course::class);
    }
}
