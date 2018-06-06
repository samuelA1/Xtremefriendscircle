<?php

namespace App\Http\Controllers;

use App\Post;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class PostController extends Controller
{
    public function _constructor(){
        $this->middleware('auth:api');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        
        $results = array();
        
        $public = 100;
        $friendsPost = Auth::user()->friends()
            ->join('posts', 'posts.author_id', '=', 'users.id')
            ->orderBy('posts.created_at', 'desc')
            ->get(['posts.*']);
        $publicAndOwnPosts = Post::where('visibility', '=', $public)
            ->orWhere('author_id', Auth::user()->id)
            ->orderBy('created_at', 'desc')
            ->get();
        $posts = $friendsPost->merge($publicAndOwnPosts)->sortByDesc('created_at')
            ->values()->all();

        // foreach ($posts as $post)
        // {
        //     $results[] = array('content' => $post->content,
        //      'author' => $post->author_id, 'created' => $post->created_at);
        // }
        return response()->json($posts);

       
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
        $post = new Post($request->all());

        Auth::user()->posts()->save($post);

        return response()->json(['success' => true, 'post' => $post]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function show(Post $post)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Post $post)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function destroy(Post $post)
    {
        //
    }
}
