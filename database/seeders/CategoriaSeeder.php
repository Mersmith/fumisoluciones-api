<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Categoria;
use Illuminate\Support\Str;

class CategoriaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categorias_producto = [
            ['tipo' => 'producto', 'nombre' => 'Fumigación Insumos'],
            ['tipo' => 'producto', 'nombre' => 'Seguridad'],
            ['tipo' => 'producto', 'nombre' => 'Accesorios Extintores'],
            ['tipo' => 'producto', 'nombre' => 'EPP'],
            ['tipo' => 'producto', 'nombre' => 'Primeros Auxilios'],
            ['tipo' => 'producto', 'nombre' => 'Capacitación'],
            ['tipo' => 'producto', 'nombre' => 'Conos y porta conos'],
            ['tipo' => 'producto', 'nombre' => 'CLASE D'],
            ['tipo' => 'producto', 'nombre' => 'CLASE K'],
            ['tipo' => 'producto', 'nombre' => 'Extintores'],
            ['tipo' => 'producto', 'nombre' => 'ESPUMA'],
        ];

        foreach ($categorias_producto as $cat) {
            Categoria::create([
                'tipo' => $cat['tipo'],
                'nombre' => $cat['nombre'],
                'slug' => Str::slug($cat['nombre']),
                'descripcion' => $cat['nombre'],
            ]);
        }

        $categorias_servicio = [
            ['tipo' => 'servicio', 'nombre' => 'Fumigación'],
            ['tipo' => 'servicio', 'nombre' => 'Desinfección'],
            ['tipo' => 'servicio', 'nombre' => 'Limpieza'],
            ['tipo' => 'servicio', 'nombre' => 'Sanitización'],
            ['tipo' => 'servicio', 'nombre' => 'Desratización'],
            ['tipo' => 'servicio', 'nombre' => 'Desinsectación'],
        ];

        foreach ($categorias_servicio as $cat) {
            Categoria::create([
                'tipo' => $cat['tipo'],
                'nombre' => $cat['nombre'],
                'slug' => Str::slug($cat['nombre']),
                'descripcion' => $cat['nombre'],
            ]);
        }
    }
}
