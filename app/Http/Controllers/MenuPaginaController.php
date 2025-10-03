<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use App\Models\MenuPagina;
use Illuminate\Http\Request;

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

    public function update(Request $request, MenuPagina $menuPagina)
    {
        $validated = $request->validate([
            'menu_id' => 'required|exists:menus,id',
            'pagina_id' => 'required|exists:paginas,id',
        ]);

        $menuPagina->update($validated);

        return response()->json($menuPagina);
    }

    public function destroy(MenuPagina $menuPagina)
    {
        $menuPagina->delete();
        return response()->noContent();
    }
}
