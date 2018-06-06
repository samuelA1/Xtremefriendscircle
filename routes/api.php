<?php

use Illuminate\Http\Request;

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
Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function() {
    Route::post('/register', 'AuthController@register');
    Route::post('/login', 'AuthController@login');
    Route::get('/me', 'AuthController@me');
});

Route::get('/users/friends', 'UserController@friends');
Route::post('/users/{friend_id}/add_friend', 'UserController@addFriend');
Route::post('/users/{friend_id}/remove_friend', 'UserController@removeFriend');


Route::apiResource('/posts', 'PostController');
Route::apiResource('/users', 'UserController');