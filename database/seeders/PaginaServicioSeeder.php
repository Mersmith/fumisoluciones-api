<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Pagina;
use App\Models\Servicio;

class PaginaServicioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $paginas = Pagina::all();       // Todas las páginas
        $servicios = Servicio::all();   // Todos los servicios

        // Aquí puedes asignar servicios a páginas de manera aleatoria o según un criterio
        foreach ($paginas as $pagina) {
            // Por ejemplo, asignar 2 servicios aleatorios a cada página
            $serviciosAsignados = $servicios->random(2)->pluck('id')->toArray();
            $pagina->servicios()->sync($serviciosAsignados);
        }
    }
}
