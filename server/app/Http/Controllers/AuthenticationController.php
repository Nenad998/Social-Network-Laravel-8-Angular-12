<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;

class AuthenticationController extends Controller
{
    public function login(Request $request)
    {
        $fields = $request->validate([
            'email'=> 'required',
            'password'=> 'required'
        ]);
        $user = User::where('email', $fields['email'])->first();

        if(!$user || !Hash::check($fields['password'], $user->password)){
            return response([
                'message'=> 'Bad creds', 401]);
        }

        $token = $user->createToken('myapptoken')->plainTextToken;

        $response = [
            'user'=> $user,
            'token'=> $token
        ];

        return response($response, 201);
    }

    public function register(Request $request)
    {
        $request->validate([
            'name'=> 'required|string',
            'email'=> 'required|string|unique:users,email',
            'password'=> 'required|confirmed',
            'gender'=> 'required',
        ]);

        $user = new User();
        $user->name= $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->gender = $request->gender;
        $user->slug = Str::slug($request->name);

        if ($request->file('image')) {
            $avatar = $request->file('image');
            $filename = time() . '.' . $avatar->getClientOriginalExtension();
            Image::make($avatar)->resize(200, 126)->save( public_path('storage/' . $filename) );
            $user->image = $filename;
        }

        $user->save();

        $token = $user->createToken('myapptoken')->plainTextToken;

        $response = [
            'user'=> $user,
            'token'=> $token
        ];

        return response($response, 201);

    }

    public function forgot(Request $request)
    {
        $request->validate([
            'email'=> 'required|email'
        ]);

        $email = $request->email;

        $ifEmailExist = User::where('email', $email)->get();

        if($ifEmailExist->isEmpty()){
            return response(['message'=> 'Email does not exist.'], 201);
        }
        $token = Str::random(10);

        DB::table('password_resets')->insert([
            'email'=> $email,
            'token'=> $token,
            'created_at'=> now()->addHours(6)
        ]);

        Mail::send('mail.password_reset', ['token'=> $token], function ($message) use ($email){
            $message->to($email);
            $message->subject('Reset your password');
        });

        return response(['message'=> 'Check your email'], 201);
    }

    public function reset(Request $request)
    {
        $request->validate([
            'token'=> 'required|string',
            'password'=> 'required|confirmed'
        ]);

        $token = $request->token;
        $passwordReset = DB::table('password_resets')->where('token', $token)->first();

        if(!$passwordReset){
            return response(['message'=> 'Token not found'], 201);
        }

        $user = User::where('email', $passwordReset->email)->first();

        if(!$user){
            return response(['message'=> 'User does not exist'], 201);
        }

        $user->password = Hash::make($request->password);
        $user->save();

        DB::table('password_resets')->where('token', $token)->delete();

        return response(['message'=> 'Password successfully updated'], 201);
    }

    public function logout(Request $request)
    {
        auth()->user()->tokens()->delete();

        return [
            'message'=> 'Logged out'
        ];
    }
}
