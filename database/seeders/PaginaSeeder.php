<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Pagina;
use App\Models\Menu;

class PaginaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $menus = Menu::all();

        foreach ($menus as $menu) {
            Pagina::create([
                'titulo' => $menu->label,
                'slug' => str($menu->label)->slug('-'),
                'imagen' => str($menu->label)->slug('-') . '.jpg',
                'descripcion' => "Página de {$menu->label}",
            ]);
        }
    }
}
