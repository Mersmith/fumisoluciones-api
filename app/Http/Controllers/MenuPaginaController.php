<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use Illuminate\Http\Request;
use App\Models\MenuPagina;

class MenuPaginaController extends Controller
{
    public function index()
    {
        return MenuPagina::with(['menu', 'pagina'])->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'menu_id' => 'required|exists:menus,id',
            'pagina_id' => 'required|exists:paginas,id',
        ]);

        $menu = Menu::findOrFail($data['menu_id']);
        $menu->paginas()->syncWithoutDetaching([$data['pagina_id']]);

        return response()->json(['message' => 'Relación creada correctamente']);
    }

    public function destroy(Request $request)
    {
        $data = $request->validate([
            'menu_id' => 'required|exists:menus,id',
            'pagina_id' => 'required|exists:paginas,id',
        ]);

        $menu = Menu::findOrFail($data['menu_id']);
        $menu->paginas()->detach($data['pagina_id']);

        return response()->json(['message' => 'Relación eliminada correctamente']);
    }
}
