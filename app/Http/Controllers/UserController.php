<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function _constructor() {
        $this->middleware('auth:api');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index() {
        $results = array();

        foreach (User::where('id', '!=', Auth::id())->get() as $friend) {
            $results[] = array('created_at' => $friend->created_at, 'email' => $friend->email,
            'firstName' => $friend->firstName, 'id' => $friend->id, 'lastName' => $friend->lastName,
            'updated_at' => $friend->updated_at);
        }
    
        return response()->json($results);
    }

    public function friends() {
        $results = array();
        foreach (Auth::user()->friends as $friend) {
            $results[] = array('created_at' => $friend->created_at, 'email' => $friend->email,
            'firstName' => $friend->firstName, 'id' => $friend->id, 'lastName' => $friend->lastName,
            'updated_at' => $friend->updated_at);
        }
        return response()->json($results);
    }

    public function addFriend($friendId)
    {
        $friendToAdd = User::find($friendId);
        $loggedUser = Auth::user();

        if (!$friendToAdd) {
            return response()->json([ 'error' => "There is no user you are trying to add to friends."], 400);  
        }

        if ($friendToAdd->id === $loggedUser->id) {
            return response()->json([ 'error' => "You can't add yourself to friends."], 400);  
        }

        if ($loggedUser->hasFriendWithId($friendToAdd->id)) {
            return response()->json([ 'error' => 'You are friends already.'], 400);              
        }

        $loggedUser->addFriend($friendToAdd->id);

        return response()->json([
            'success' => true
        ]);
    }


    public function removeFriend($friendId)
    {
        $friendToRemove = User::find($friendId);
        $loggedUser = Auth::user();

        if (!$friendToRemove) {
            return response()->json(
                ['error' => "There is no user you are trying to remove from friends."],
                400
            );  
        }

        if ($friendToRemove->id === $loggedUser->id) {
            return response()->json([ 'error' => "You can't remove yourself from friends."], 400);  
        }

        if (!$loggedUser->hasFriendWithId($friendToRemove->id)) {
            return response()->json([ 'error' => "You can't remove friend you don't have."], 400);              
        }

        $loggedUser->removeFriend($friendToRemove->id);

        return response()->json([
            'success' => true
        ]);
         }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        return response()->json($user);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        //
    }
}
