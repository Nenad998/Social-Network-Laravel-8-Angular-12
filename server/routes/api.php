<?php

use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LikeController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user()->name;
//});
//Route::get('/users', function (){
//    return User::all();
//});

Route::post('/login', [AuthenticationController::class, 'login']);
Route::post('/register', [AuthenticationController::class, 'register']);
Route::post('/forgot', [AuthenticationController::class, 'forgot']);
Route::post('/reset', [AuthenticationController::class, 'reset']);

//Route::get('/test', function (Request $request){
//    return $request->user()->id;
//});


Route::group(['middleware'=> ['auth:sanctum']], function () {
    Route::post('/logout', [AuthenticationController::class, 'logout']);
    Route::get('/user', function (Request $request){
        return $request->user();
    });

    Route::get('/home', [HomeController::class, 'showHomePage']);
    Route::get('/postLikes/{postId}', [LikeController::class, 'showPostLikes']);
    Route::post('/like', [LikeController::class, 'like']);
    Route::delete('/unlike/{postId}', [LikeController::class, 'unlike']);
    Route::get('/isLiked/{postId}', [LikeController::class, 'isLiked']);
});
