<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Servicio;

class ServicioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $servicios = [
            'Diseño Web',
            'Desarrollo de Software',
            'Marketing Digital',
            'Consultoría Tecnológica',
            'Soporte Técnico',
        ];

        foreach ($servicios as $servicio) {
            Servicio::create(['nombre' => $servicio]);
        }
    }
}
