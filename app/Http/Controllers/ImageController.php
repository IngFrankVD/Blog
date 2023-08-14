<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{
    public function upload(Request $request)
    {
        try {
            $imageUrl = $request->input('imageUrl');

            // Descarga la imagen desde la URL
            $imageData = file_get_contents($imageUrl);

            // Genera un nombre único para la imagen
            $imageName = uniqid() . '.' . pathinfo($imageUrl, PATHINFO_EXTENSION);

            // Almacena la imagen en la carpeta "public/images"
            Storage::disk('public')->put('images/' . $imageName, $imageData);

            // Genera la URL de la imagen almacenada
            $imageUrl = Storage::disk('public')->url('images/' . $imageName);

            return response()->json(['newImageUrl' => $imageUrl]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al cargar la imagen'], 500);
        }
    }
}
