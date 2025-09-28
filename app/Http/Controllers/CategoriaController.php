<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CategoriaController extends Controller
{
    public function index()
    {
        return Categoria::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'slug' => 'required|unique:categorias,slug',
            'tipo' => 'required|in:producto,servicio',
            'imagen' => 'nullable|image|max:2048',
            'descripcion' => 'nullable|string',
        ]);

        $path = null;
        if ($request->hasFile('imagen')) {
            $path = $request->file('imagen')->store('categorias', 'public');
        }

        $categoria = Categoria::create([
            'nombre' => $validated['nombre'],
            'slug' =>  Str::slug($validated['slug']), 
            'tipo' => $validated['tipo'],
            'descripcion' => $validated['descripcion'] ?? null,
            'imagen' => $path,
        ]);

        return response()->json($categoria, 201);
    }

    public function show(Categoria $categoria)
    {
        return $categoria;
    }

    public function update(Request $request, Categoria $categoria)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'tipo' => 'required|in:producto,servicio',
            'imagen' => 'nullable|image|max:2048',
            'descripcion' => 'nullable|string',
            'slug' => 'required|unique:categorias,slug,' . $categoria->id, // 👈 valida único excepto el mismo
        ]);

        $path = $categoria->imagen;
        if ($request->hasFile('imagen')) {
            $path = $request->file('imagen')->store('categorias', 'public');
        }

        $categoria->update([
            'nombre' => $validated['nombre'],
            'slug' => Str::slug($validated['slug']), // 👈 normaliza el slug
            'tipo' => $validated['tipo'],
            'descripcion' => $validated['descripcion'] ?? null,
            'imagen' => $path,
        ]);

        return response()->json($categoria);
    }

    public function destroy(Categoria $categoria)
    {
        $categoria->delete();
        return response()->noContent();
    }
}
