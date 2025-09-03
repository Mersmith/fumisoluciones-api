<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;

class ProductoController extends Controller
{
    public function index(Request $request)
    {
        $query = Producto::query();

        if ($request->has('buscar') && $request->buscar != '') {
            $query->where('nombre', 'like', '%' . $request->buscar . '%');
        }

        $orden = $request->get('orden', 'desc');
        $query->orderBy('created_at', $orden);

        return $query->paginate(5);
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
        return Producto::findOrFail($id);
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
