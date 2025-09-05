<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;

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
            'nombre' => 'required|string|max:255',
            'slug' => 'required|unique:productos',
            'imagen' => 'nullable|string',
            'descripcion' => 'nullable|string',
        ]);

        return Producto::create($validated);
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
