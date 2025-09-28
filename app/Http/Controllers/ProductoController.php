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
            'nombre' => 'required|string|max:255',
            'slug' => 'required|unique:productos,slug',
            'categoria_id' => 'required|exists:categorias,id',
            'imagen' => 'nullable|image|max:2048',
            'descripcion' => 'nullable|string',
        ]);

        $path = null;
        if ($request->hasFile('imagen')) {
            $path = $request->file('imagen')->store('productos', 'public');
        }

        $producto = Producto::create([
            'nombre' => $validated['nombre'],
            'slug' => Str::slug($validated['slug']),
            'categoria_id' => $validated['categoria_id'],
            'imagen' => $path,
            'descripcion' => $validated['descripcion'] ?? null,
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
            'categoria_id' => 'required|exists:categorias,id',
            'imagen' => 'nullable|image|max:2048',
            'descripcion' => 'nullable|string',
        ]);

        $path = $producto->imagen;
        if ($request->hasFile('imagen')) {
            $path = $request->file('imagen')->store('productos', 'public');
        }

        $producto->update(
            [
                'nombre' => $validated['nombre'],
                'slug' => Str::slug($validated['slug']),
                'categoria_id' => $validated['categoria_id'],
                'imagen' => $path,
                'descripcion' => $validated['descripcion'] ?? null,
            ]
        );

        return response()->json($producto);
    }

    public function destroy(Producto $producto)
    {
        $producto->delete();
        return response()->noContent();
    }
}
