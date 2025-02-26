<?php 
namespace App\Services;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class ProfileService 
{
    public function update(array $data){
        $user = Auth::user();

        $user->update($data);

        return $user;
    }
}