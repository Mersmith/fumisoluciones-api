<?php

namespace Database\Seeders;

use App\Models\Servicio;
use Faker\Factory as Faker;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ServicioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        $servicios = [
            'Fumigación',
            'Desinfección',
            'Limpieza',
            'Sanitización',
            'Desratización',
            'Desinsectación',
        ];

        foreach ($servicios as $nombre) {
            Servicio::create([
                'nombre' => $nombre,
                'slug' => Str::slug($nombre),
                'imagen' => "https://www.centromedicoosi.com/wp-content/uploads/2024/06/fisioterapia.jpg", // Imagen fake
                'descripcion' => $faker->sentence(12), // Descripción random
            ]);
        }
    }
}
