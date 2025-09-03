<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contacto;
class ContactoController extends Controller
{
    public function index()
    {
        return Contacto::with('servicio')->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'nombre' => 'required|string|max:255',
            'apellido' => 'required|string|max:255',
            'correo' => 'required|email|max:255',
            'telefono' => 'required|string|max:50',
            'detalle' => 'nullable|string',
            'servicio_id' => 'required|exists:servicios,id',
        ]);

        return Contacto::create($data);
    }

    public function show(Contacto $contacto)
    {
        return $contacto->load('servicio');
    }

    public function destroy(Contacto $contacto)
    {
        $contacto->delete();
        return response()->noContent();
    }
}
