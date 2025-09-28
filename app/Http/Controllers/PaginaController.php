<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pagina;

class PaginaController extends Controller
{
    public function index()
    {
        return Pagina::with('menus')->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'titulo' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:paginas,slug',
            'imagen' => 'nullable|string',
            'descripcion' => 'nullable|string',
            'contenido' => 'nullable|json',
        ]);

        $pagina = Pagina::create($data);

        return response()->json($pagina, 201);
    }

    public function show(Pagina $pagina)
    {
        return $pagina->load('menus');
    }

    public function update(Request $request, Pagina $pagina)
    {
        $data = $request->validate([
            'titulo' => 'sometimes|required|string|max:255',
            'slug' => "sometimes|required|string|max:255|unique:paginas,slug,{$pagina->id}",
            'imagen' => 'nullable|string',
            'descripcion' => 'nullable|string',
            'contenido' => 'nullable|json',
        ]);

        $pagina->update($data);

        return response()->json($pagina);
    }

    public function destroy(Pagina $pagina)
    {
        $pagina->delete();

        return response()->json(null, 204);
    }
}
