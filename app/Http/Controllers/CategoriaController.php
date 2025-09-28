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
            'tipo' => 'required|in:producto,servicio',
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
            'nombre' => $validated['nombre'],
            'slug' => $slug,
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
            'imagen' => 'nullable|image|max:2048', // 👈 aceptar imagen como archivo
            'descripcion' => 'nullable|string',
        ]);

        // Generar slug automáticamente desde nombre
        $slug = Str::slug($validated['nombre']);
        $count = Categoria::where('slug', 'like', "{$slug}%")
            ->where('id', '!=', $categoria->id) // evitar conflicto con el mismo
            ->count();

        if ($count > 0) {
            $slug .= '-' . ($count + 1);
        }

        $path = $categoria->imagen; // mantener imagen anterior
        if ($request->hasFile('imagen')) {
            $path = $request->file('imagen')->store('categorias', 'public');
        }

        $categoria->update([
            'nombre' => $validated['nombre'],
            'slug' => $slug,
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
