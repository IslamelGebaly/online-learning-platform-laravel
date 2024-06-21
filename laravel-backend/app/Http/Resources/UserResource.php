<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $user = User::find($this->id);
        return [
            "id"=> $this->id,
            "name"=> $this->name,
            "email"=> $this->email,
            "role" => $user->getRoleNames()[0],
        ];
    }
}
