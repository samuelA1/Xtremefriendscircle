<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = [
        'content', 'visibility'
    ];

    public function author() {
        return $this->belongsTo('App\User');
    }
}
