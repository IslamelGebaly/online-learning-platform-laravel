<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    protected $fillable = [
        "content"
    ];

    public function course(){
        return $this->belongsTo(Course::class, "course_id");
    }

    public function student(){
        return $this->belongsTo(Course::class, "student_id");
    }
}
