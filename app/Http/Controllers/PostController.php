<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\DB;
use GuzzleHttp\Exception\RequestException;
use Illuminate\Support\Facades\Storage;


class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Home', [
            'Posts' => Post::with('user:id,name')->latest()->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Write', [

        ]);
    }
    
    public function show($postId): Response
    {
        return Inertia::render('Single', [
            'Post' => DB::table('posts')
            ->join('users', 'users.id', '=', 'posts.user_id')
            ->select('posts.*', 'users.name','users.picture')
            ->where('posts.id', $postId)
            ->first()
        ]);
            
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        // dd($request->all());
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'categories_id' => 'required',
            'coverImg' => 'required|image|mimes:jpeg,png,jpg,gif', // Validate image file (optional)
        ]);

        if ($request->hasFile('coverImg')) {
            // Save the image with a custom filename and store its path
            $imageName = time() . '_' . $request->file('coverImg')->getClientOriginalName();
            $imagePath = $request->file('coverImg')->storeAs('public/posts', $imageName);
    
            // Add the image filename to the validated data
            $validated['coverImg'] = $imageName;
        } 
        
            // Guardar los Blobs generados por Froala localmente
    $blobUrls = $request->input('blogImages');

    foreach ($blobUrls as $index => $blobUrl) {
        $blobData = $request->input('blob_' . $index); // Cambia 'blob_' por el prefijo correcto en tus campos

        if ($blobData) {
            $nombreArchivoBlob = 'blob_image_' . $index . '.jpg'; // Cambia el nombre y la extensión

            try {
                Storage::put('public/posts/' . $nombreArchivoBlob, base64_decode($blobData));
            } catch (\Exception $e) {
                // Manejar la excepción, imprimir mensajes de error, etc.
            }
            
        }
    }

        $request->user()->posts()->create($validated);
 
        return redirect(route('posts.index'));
    }

    public function edit($postId): Response
    {
        return Inertia::render('Edit', [
            'Post' => DB::table('posts')
            ->join('users', 'users.id', '=', 'users.id')
            ->select('posts.*', 'users.name','users.picture')
            ->where('posts.id', $postId)
            ->first()
        ]);
            
    }

    public function update(Request $request, Post $post): RedirectResponse
    {
        // dd($request->all());
        $this->authorize('update', $post);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'categories_id' => 'required',
            'coverImg' => 'nullable|image|mimes:jpeg,png,jpg,gif', // Validación de imagen | |max:2048
            'oldImg' => 'required', // Validate image file (optional)
        ]);        
        
        if ($request->hasFile('coverImg') && $request['coverImg'] != null ) {
            // Delete the old image
            Storage::delete('public/posts/' . $validated['oldImg']);
            // Save the new image with a custom filename and store its path
            $imageName = time() . '_' . $request->file('coverImg')->getClientOriginalName();
            $imagePath = $request->file('coverImg')->storeAs('public/posts', $imageName);
    
            // Add the image filename to the validated data
            $validated['coverImg'] = $imageName;
        }else{
            $validated['coverImg'] = $validated['oldImg'];
        }
 
        $post->update($validated);
 
        return redirect(route('posts.show',$post));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {

        $this->authorize('delete', $post);
 
        $post->delete();
 
        return redirect(route('posts.index'));
    }
}
