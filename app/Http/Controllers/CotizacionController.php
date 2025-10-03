<?php

namespace App\Http\Controllers;

use App\Models\Cotizacion;
use Illuminate\Http\Request;

class CotizacionController extends Controller
{
    public function index(Request $request)
    {
        $query = Cotizacion::query();

        if ($request->filled('buscar')) {
            $buscar = $request->buscar;
            $query->where('nombre', 'like', "%{$buscar}%");
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
        $data = $request->validate([
            'nombre' => 'required|string|max:255',
            'correo' => 'required|email|max:255',
            'telefono' => 'required|string|max:50',
            'detalle' => 'nullable|string',
        ]);

        return Cotizacion::create($data);
    }

    public function show(Cotizacion $cotizacion)
    {
        return $cotizacion;
    }

    public function destroy(Cotizacion $cotizacion)
    {
        $cotizacion->delete();
        return response()->noContent();
    }
}
