<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    protected $fillable = [
        "title",
        "description",
    ];

    public function instructor(){
        return $this->belongsTo(User::class, "instructor_id");
    }

    public function lessons(){
        return $this->hasMany(Lesson::class);
    }

    public function reviews(){
        return $this->hasMany(Review::class);
    }

    public function enrollments(){
        return $this->hasMany(Enrollment::class);
    }
}
