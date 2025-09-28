<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PaginaServicio;

class PaginaServicioController extends Controller
{
    public function index()
    {
        $items = PaginaServicio::with(['pagina', 'servicio'])->get();
        return response()->json($items); 
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'pagina_id' => 'required|exists:paginas,id',
            'servicio_id' => 'required|exists:servicios,id',
        ]);

        $registro = PaginaServicio::create($validated);

        return response()->json($registro, 201);
    }

    public function show(PaginaServicio $paginaServicio)
    {
        return $paginaServicio->load(['pagina', 'servicio']);
    }

    public function update(Request $request, PaginaServicio $paginaServicio)
    {
        $validated = $request->validate([
            'pagina_id' => 'required|exists:paginas,id',
            'servicio_id' => 'required|exists:servicios,id',
        ]);

        $paginaServicio->update($validated);

        return response()->json($paginaServicio);
    }

    public function destroy(PaginaServicio $paginaServicio)
    {
        $paginaServicio->delete();
        return response()->noContent();
    }
}
