<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    public function users()
    {
        return $this->belongsTo(User::class, 'receiver_id', 'id');
    }

    public function users2()
    {
        return $this->belongsTo(User::class, 'sender_id', 'id');
    }

//    public function users2()
//    {
//        return $this->belongsTo(User::class, 'sender_id', 'id');
//    }
}
