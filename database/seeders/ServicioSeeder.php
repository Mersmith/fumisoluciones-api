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
                    'Eliminación de virus, bacterias y microorganismos nocivos.',
                    'Ambientes más seguros y saludables para tu familia o empleados.',
                    'Uso de productos certificados y seguros para todas las superficies.',
                    'Prevención de enfermedades y contaminación cruzada.',
                ],
            ],
            [
                'nombre' => 'Limpieza',
                'descripcion' => 'Limpieza profunda de hogares, oficinas e industrias con equipos profesionales de alta calidad.',
                'imagen' => 'http://127.0.0.1:8000/imagenes/servicio/servicio-4.jpg',
                'contenido' => [
                    'Eliminación completa de suciedad y residuos.',
                    'Ambientes más higiénicos y saludables.',
                    'Prevención de enfermedades y malos olores.',
                    'Cuidado de superficies y mobiliario durante la limpieza.',
                ],
            ],
            [
                'nombre' => 'Sanitización',
                'descripcion' => 'Aplicamos productos de grado hospitalario que eliminan virus, bacterias y hongos para un ambiente más seguro.',
                'imagen' => 'http://127.0.0.1:8000/imagenes/servicio/servicio-5.jpg',
                'contenido' => [
                    'Eliminación de virus, bacterias y hongos con productos de grado hospitalario.',
                    'Ambientes más seguros y saludables para hogares y lugares de trabajo.',
                    'Prevención de enfermedades y contaminación cruzada.',
                    'Protección integral de superficies y áreas comunes.',
                ],
            ],
            [
                'nombre' => 'Desratización',
                'descripcion' => 'Control efectivo de roedores con métodos modernos y seguros, evitando daños materiales y riesgos sanitarios.',
                'imagen' => 'http://127.0.0.1:8000/imagenes/servicio/servicio-6.jpg',
                'contenido' => [
                    'Eliminación segura de roedores utilizando métodos modernos y efectivos.',
                    'Prevención de daños a estructuras, instalaciones y alimentos.',
                    'Reducción de riesgos sanitarios asociados a roedores.',
                    'Protección del ambiente y de los ocupantes de tu hogar o negocio.',
                ],
            ],
            [
                'nombre' => 'Desinsectación',
                'descripcion' => 'Eliminación de insectos rastreros y voladores con técnicas de control ambiental y productos confiables.',
                'imagen' => 'http://127.0.0.1:8000/imagenes/servicio/servicio-7.jpg',
                'contenido' => [
                    'Eliminación de insectos rastreros y voladores de manera segura y efectiva.',
                    'Prevención de infestaciones futuras mediante técnicas de control ambiental.',
                    'Protección de la salud de las personas y mascotas.',
                    'Uso de productos confiables y aprobados para cada tipo de insecto.',
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
