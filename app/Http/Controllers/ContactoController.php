<?php

namespace App\Http\Controllers;

use App\Models\Contacto;
use Illuminate\Http\Request;

class ContactoController extends Controller
{
    public function index(Request $request)
    {
        $query = Contacto::with('servicio');

        if ($request->filled('buscar')) {
            $buscar = $request->buscar;
            $query->where('nombre', 'like', "%{$buscar}%");
        }

        if ($request->filled('servicio_id')) {
            $query->where('servicio_id', $request->servicio_id);
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
