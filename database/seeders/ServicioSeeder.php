<?php

namespace Database\Seeders;

use App\Models\Categoria;
use App\Models\Servicio;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ServicioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $servicios = [
            [
                'nombre' => 'Fumigación',
                'descripcion' => 'Eliminamos plagas de manera segura y efectiva, protegiendo la salud de tu familia y la de tus trabajadores.',
                'imagen' => 'http://127.0.0.1:8000/imagenes/servicio/servicio-2.jpg',
                'contenido' => [
                    'Control efectivo de plagas.',
                    'Protección de la salud.',
                    'Prevención de daños estructurales.',
                ],
            ],
            [
                'nombre' => 'Desinfección',
                'descripcion' => 'Servicio especializado en desinfección de ambientes y superficies con productos certificados y seguros.',
                'imagen' => 'http://127.0.0.1:8000/imagenes/servicio/servicio-3.jpg',
                'contenido' => [
                    'Control efectivo de plagas.',
                    'Protección de la salud.',
                    'Prevención de daños estructurales.',
                ],
            ],
            [
                'nombre' => 'Limpieza',
                'descripcion' => 'Limpieza profunda de hogares, oficinas e industrias con equipos profesionales de alta calidad.',
                'imagen' => 'http://127.0.0.1:8000/imagenes/servicio/servicio-4.jpg',
                'contenido' => [
                    'Control efectivo de plagas.',
                    'Protección de la salud.',
                    'Prevención de daños estructurales.',
                ],
            ],
            [
                'nombre' => 'Sanitización',
                'descripcion' => 'Aplicamos productos de grado hospitalario que eliminan virus, bacterias y hongos para un ambiente más seguro.',
                'imagen' => 'http://127.0.0.1:8000/imagenes/servicio/servicio-5.jpg',
                'contenido' => [
                    'Control efectivo de plagas.',
                    'Protección de la salud.',
                    'Prevención de daños estructurales.',
                ],
            ],
            [
                'nombre' => 'Desratización',
                'descripcion' => 'Control efectivo de roedores con métodos modernos y seguros, evitando daños materiales y riesgos sanitarios.',
                'imagen' => 'http://127.0.0.1:8000/imagenes/servicio/servicio-6.jpg',
                'contenido' => [
                    'Control efectivo de plagas.',
                    'Protección de la salud.',
                    'Prevención de daños estructurales.',
                ],
            ],
            [
                'nombre' => 'Desinsectación',
                'descripcion' => 'Eliminación de insectos rastreros y voladores con técnicas de control ambiental y productos confiables.',
                'imagen' => 'http://127.0.0.1:8000/imagenes/servicio/servicio-7.jpg',
                'contenido' => [
                    'Control efectivo de plagas.',
                    'Protección de la salud.',
                    'Prevención de daños estructurales.',
                ],
            ],
        ];

        foreach ($servicios as $servicio) {
            // Buscar la categoría correspondiente por nombre
            $categoria = Categoria::where('tipo', 'servicio')
                ->where('nombre', $servicio['nombre'])
                ->first();

            if ($categoria) {
                Servicio::create([
                    'nombre' => $servicio['nombre'],
                    'slug' => Str::slug($servicio['nombre']),
                    'imagen' => $servicio['imagen'],
                    'descripcion' => $servicio['descripcion'],
                    'contenido' => $servicio['contenido'], 
                    'categoria_id' => $categoria->id, // <-- asignar la categoría
                ]);
            }
        }

    }
}
