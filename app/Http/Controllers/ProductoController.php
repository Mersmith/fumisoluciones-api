<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProductoController extends Controller
{
    public function index(Request $request)
    {
        $query = Producto::with('categoria');

        if ($request->filled('buscar')) {
            $buscar = $request->buscar;
            $query->where('nombre', 'like', "%{$buscar}%");
        }

        // 🏷️ Filtro por categoría
        if ($request->filled('categoria_id')) {
            $query->where('categoria_id', $request->categoria_id);
        }

        $orden = $request->get('orden', 'desc');
        if (!in_array($orden, ['asc', 'desc'])) {
            $orden = 'desc';
        }

        $query->orderBy('created_at', $orden);

        $perPage = $request->get('per_page', 15);

        return $query->paginate($perPage);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'categoria_id' => 'required|exists:categorias,id',
            'nombre'       => 'required|string|max:255',
            'descripcion'  => 'nullable|string',
            'imagen'       => 'nullable|image|max:2048',
        ]);

        $slug = Str::slug($validated['nombre']);

        // Evitar duplicados de slug
        $count = Producto::where('slug', 'like', "{$slug}%")->count();
        if ($count > 0) {
            $slug .= '-' . ($count + 1);
        }

        $path = null;
        if ($request->hasFile('imagen')) {
            $path = $request->file('imagen')->store('productos', 'public');
        }

        $producto = Producto::create([
            'categoria_id' => $validated['categoria_id'],
            'nombre'       => $validated['nombre'],
            'slug'         => $slug,
            'descripcion'  => $validated['descripcion'] ?? null,
            'imagen'       => $path,
        ]);

        return response()->json($producto, 201);
    }

    public function show($id)
    {
        return Producto::with('categoria')->findOrFail($id);
    }

    public function update(Request $request, Producto $producto)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'slug' => 'required|unique:productos,slug,' . $producto->id,
            'imagen' => 'nullable|string',
            'descripcion' => 'nullable|string',
        ]);

        $producto->update($validated);
        return $producto;
    }

    public function destroy(Producto $producto)
    {
        $producto->delete();
        return response()->noContent();
    }
}
