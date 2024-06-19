<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LessonResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id"=> $this->id,
            "title" => $this->title,
            "image_path" => $this->image_path,
            "video_path" => $this->video_path,
            "supporting_material" => $this->supporting_material,
            "course" => new CourseResource($this->course),
        ];

    }
}
