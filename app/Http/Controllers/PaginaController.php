<?php

namespace App\Http\Controllers;

use App\Models\Pagina;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PaginaController extends Controller
{
    public function indexWeb()
    {
        $query = Pagina::all();

        return $query;
    }

    public function index(Request $request)
    {
        $query = Pagina::query();

        if ($request->filled('buscar')) {
            $buscar = $request->buscar;
            $query->where('titulo', 'like', "%{$buscar}%")
                  ->orWhere('slug', 'like', "%{$buscar}%")
                  ->orWhere('descripcion', 'like', "%{$buscar}%");
        }

        $orden = $request->get('orden', 'desc');
        $query->orderBy('created_at', $orden);

        $perPage = $request->get('per_page', 15);

        return response()->json($query->paginate($perPage));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'titulo' => 'required|string|max:255',
            'slug' => 'required|unique:paginas,slug',
            'imagen' => 'nullable|image|max:2048',
            'descripcion' => 'nullable|string',
        ]);

        $path = null;
        if ($request->hasFile('imagen')) {
            $path = $request->file('imagen')->store('paginas', 'public');
        }

        $pagina = Pagina::create([
            'titulo' => $validated['titulo'],
            'slug' => Str::slug($validated['slug']),
            'imagen' => $path,
            'descripcion' => $validated['descripcion'] ?? null,
        ]);

        return response()->json($pagina, 201);
    }

    public function show(Pagina $pagina)
    {
        return $pagina->load('menus');
    }

    public function update(Request $request, Pagina $pagina)
    {
        $validated = $request->validate([
            'titulo' => 'required|string|max:255',
            'slug' => 'required|unique:paginas,slug,' . $pagina->id,
            'imagen' => 'nullable|image|max:2048',
            'descripcion' => 'nullable|string',
        ]);

        $path = $pagina->imagen;
        if ($request->hasFile('imagen')) {
            $path = $request->file('imagen')->store('paginas', 'public');
        }

        $pagina->update(
            [
                'titulo' => $validated['titulo'],
                'slug' => Str::slug($validated['slug']),
                'imagen' => $path,
                'descripcion' => $validated['descripcion'] ?? null,
            ]
        );

        return response()->json($pagina);
    }

    public function destroy(Pagina $pagina)
    {
        $pagina->delete();

        return response()->json(null, 204);
    }
}
