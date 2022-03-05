<?php

namespace App\Http\Controllers;

use App\Models\Like;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LikeController extends Controller
{
    public function showPostLikes($postId)
    {
        $userLikes = Like::with('users')->where('post_id', '=', $postId)->get();

        return response(['data'=> $userLikes], 201);
    }

    public function like(Request  $request)
    {
        $user_id = Auth::user()->id;
        $post_id = $request->post_id;

        $like = new Like();
        $like->user_id = $user_id;
        $like->post_id = $post_id;

        $isLiked = Like::where('user_id', '=', $user_id)
            ->where('post_id', '=', $post_id)
            ->get();

        if($isLiked->isNotEmpty()){
            return response(['already liked post'], 201);
        }
        $like->save();

        return response(['liked success'=> $like], 201);

    }

    public function isLiked(Request $request, $postId)
    {
        $user_id = Auth::user()->id;
        //$post_id = $request->post_id;

        $like = new Like();
        $like->user_id = $user_id;
        //$like->post_id = $post_id;

        $isLiked = Like::where('user_id', '=', $user_id)
            ->where('post_id', $postId)
            ->get();

//        if($isLiked->isNotEmpty()){
//            return response(['already liked post'], 201);
//        }

        $def = $isLiked->isNotEmpty();

        return response(['data'=> $def], 201);
    }

    public function unlike(Request $request, $postId)
    {
        $user_id = Auth::user()->id;
        //$post_id = $request->post_id;

        $unlike = Like::where('user_id', '=', $user_id)
                      ->where('post_id', '=', $postId)->delete();

        return response(['unlike success'=> $unlike], 201);
    }
}
