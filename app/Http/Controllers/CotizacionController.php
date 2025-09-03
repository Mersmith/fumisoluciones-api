<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cotizacion;

class CotizacionController extends Controller
{
    public function index()
    {
        return Cotizacion::all();
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
