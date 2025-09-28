<?php

namespace App\Http\Controllers;

use App\Models\Servicio;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ServicioController extends Controller
{
    public function index(Request $request)
    {
        $query = Servicio::with('categoria');

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
            'slug' => 'required|unique:servicios,slug',
            'categoria_id' => 'required|exists:categorias,id',
            'imagen' => 'nullable|image|max:2048',
            'descripcion' => 'nullable|string',
            'contenido' => 'nullable|array',
            'contenido.*' => 'string',
        ]);

        $path = null;
        if ($request->hasFile('imagen')) {
            $path = $request->file('imagen')->store('servicios', 'public');
        }

        $servicio = Servicio::create([
            'nombre' => $validated['nombre'],
            'slug' => Str::slug($validated['slug']),
            'categoria_id' => $validated['categoria_id'],
            'imagen' => $path,
            'descripcion' => $validated['descripcion'] ?? null,
            'contenido' => $validated['contenido'] ?? []
        ]);

        return response()->json($servicio, 201);
    }

    public function show($id)
    {
        return Servicio::with('categoria')->findOrFail($id);
    }

    public function update(Request $request, Servicio $servicio)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'slug' => 'required|unique:servicios,slug,' . $servicio->id,
            'categoria_id' => 'required|exists:categorias,id',
            'imagen' => 'nullable|image|max:2048',
            'descripcion' => 'nullable|string',
            'contenido' => 'nullable|array',
            'contenido.*' => 'string'
        ]);

        $path = $servicio->imagen;
        if ($request->hasFile('imagen')) {
            $path = $request->file('imagen')->store('servicios', 'public');
        }

        $servicio->update([
            'nombre' => $validated['nombre'],
            'slug' => Str::slug($validated['slug']),
            'categoria_id' => $validated['categoria_id'],
            'imagen' => $path,
            'descripcion' => $validated['descripcion'] ?? null,
            'contenido' => $validated['contenido'] ?? []
        ]);

        return response()->json($servicio);
    }

    public function destroy(Servicio $servicio)
    {
        $servicio->delete();
        return response()->noContent();
    }
}
