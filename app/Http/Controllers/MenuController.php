<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Menu;

class MenuController extends Controller
{
    public function index()
    {
        return Menu::with('children', 'parent', 'paginas')->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'label' => 'required|string|max:255',
            'icon' => 'nullable|string',
            'route' => 'nullable|string',
            'parent_id' => 'nullable|exists:menus,id',
            'orden' => 'integer'
        ]);

        $menu = Menu::create($data);

        return response()->json($menu, 201);
    }

    public function show(Menu $menu)
    {
        return $menu->load('children', 'parent', 'paginas');
    }

    public function update(Request $request, Menu $menu)
    {
        $data = $request->validate([
            'label' => 'sometimes|required|string|max:255',
            'icon' => 'nullable|string',
            'route' => 'nullable|string',
            'parent_id' => 'nullable|exists:menus,id',
            'orden' => 'integer'
        ]);

        $menu->update($data);

        return response()->json($menu);
    }

    public function destroy(Menu $menu)
    {
        $menu->delete();

        return response()->json(null, 204);
    }
}
