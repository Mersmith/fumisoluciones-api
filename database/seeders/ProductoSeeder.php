<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Producto;
use App\Models\Categoria;

class ProductoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categorias = Categoria::where('tipo', 'producto')->take(5)->get();

        if ($categorias->isEmpty()) {
            $this->command->info('No hay categorías disponibles para asignar productos.');
            return;
        }

        // Crear 20 productos para cada categoría
        foreach ($categorias as $categoria) {
            Producto::factory(20)->create([
                'categoria_id' => $categoria->id,
            ]);
        }
    }
}
