<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    public function showHomePage()
    {
        $postsUserID1 = Post::join('users', 'users.id', 'posts.user_id')
            ->join('friends', 'friends.userID2', 'users.id')
            ->select('users.name', 'users.id as user_id', 'posts.content', 'posts.created_at', 'posts.id as id')
            ->where('friends.userID1', Auth::user()->id)
            ->where('friends.confirmed', 1)
            ->with('comments')
            ->with('likes')->get();

        return response(['data'=> $postsUserID1], 201);
    }
}
