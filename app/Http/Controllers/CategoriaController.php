<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Categoria;
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
            'imagen' => 'nullable|image|max:2048',
            'descripcion' => 'nullable|string',
        ]);

        $slug = Str::slug($validated['nombre']);

        $count = Categoria::where('slug', 'like', "{$slug}%")->count();
        if ($count > 0) {
            $slug .= '-' . ($count + 1);
        }

        $path = null;
        if ($request->hasFile('imagen')) {
            $path = $request->file('imagen')->store('categorias', 'public');
        }

        $categoria = Categoria::create([
            'nombre'       => $validated['nombre'],
            'slug'         => $slug,
            'descripcion'  => $validated['descripcion'] ?? null,
            'imagen'       => $path,
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
            'slug' => 'required|unique:categorias,slug,' . $categoria->id,
            'imagen' => 'nullable|string',
            'descripcion' => 'nullable|string',
        ]);

        $categoria->update($validated);
        return $categoria;
    }

    public function destroy(Categoria $categoria)
    {
        $categoria->delete();
        return response()->noContent();
    }
}
