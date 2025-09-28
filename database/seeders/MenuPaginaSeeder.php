<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Menu;
use App\Models\Pagina;

class MenuPaginaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $menus = Menu::all();

        foreach ($menus as $menu) {
            $pagina = Pagina::where('slug', str($menu->label)->slug('-'))->first();

            if ($pagina) {
                $menu->paginas()->syncWithoutDetaching([$pagina->id]);
            }
        }
    }
}
