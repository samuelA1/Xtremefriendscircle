<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Friends extends Model
{
    protected $fillable = ['user_id', 'friend_id'];

    public function user() {
        return $this->belongsToMany('App\User');
    }

    public function friend() {
        return $this->belongsToMany('App\User');
    }
}
