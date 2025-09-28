<?php

namespace Database\Seeders;

use App\Models\Menu;
use Illuminate\Database\Seeder;

class MenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        // 🔹 Saneamiento ambiental (padre)
        $saneamiento = Menu::create([
            'label' => 'Saneamiento ambiental',
            'icon' => 'fa-solid fa-leaf',
            'route' => null,
            'parent_id' => null,
            'orden' => 1,
        ]);

        $saneamientoChildren = [
            ['label' => 'Fumigación', 'icon' => 'fa-solid fa-bug'],
            ['label' => 'Limpieza', 'icon' => 'fa-solid fa-soap'],
            ['label' => 'Desinsectación', 'icon' => 'fa-solid fa-soap'],
            ['label' => 'Desratización', 'icon' => 'fa-solid fa-soap'],
            ['label' => 'Desinfección', 'icon' => 'fa-solid fa-soap'],
            ['label' => 'Limpieza y Desinfección de Reservorios', 'icon' => 'fa-solid fa-soap'],
            ['label' => 'Planes Oparativos de Saneamiento', 'icon' => 'fa-solid fa-soap'],
            ['label' => 'Limpieza de ambientes', 'icon' => 'fa-solid fa-soap'],
        ];

        foreach ($saneamientoChildren as $index => $child) {
            Menu::create([
                'label' => $child['label'],
                'icon' => $child['icon'],
                'route' => '/seguridad',
                'parent_id' => $saneamiento->id,
                'orden' => $index + 1,
            ]);
        }

        // 🔹 Extintores (padre)
        $extintores = Menu::create([
            'label' => 'Extintores',
            'icon' => 'fa-solid fa-fire-extinguisher',
            'route' => null,
            'parent_id' => null,
            'orden' => 2,
        ]);

        // Submenú: Venta de extintores
        $ventaExtintores = Menu::create([
            'label' => 'Venta de extintores',
            'icon' => 'fa-solid fa-store',
            'route' => null,
            'parent_id' => $extintores->id,
            'orden' => 1,
        ]);

        $ventaChildren = [
            ['label' => 'Extintores PQS', 'icon' => 'fa-solid fa-fire'],
            ['label' => 'Extintores CO₂', 'icon' => 'fa-solid fa-wind'],
            ['label' => 'Extintores Halotrón', 'icon' => 'fa-solid fa-wind'],
            ['label' => 'Extintores de Espuma', 'icon' => 'fa-solid fa-wind'],
            ['label' => 'Extintores Clase D', 'icon' => 'fa-solid fa-wind'],
            ['label' => 'Extintores Agua Prezurizada', 'icon' => 'fa-solid fa-wind'],
            ['label' => 'Extintores de Demineralizada', 'icon' => 'fa-solid fa-wind'],
            ['label' => 'Extintores Acetato de Potasio', 'icon' => 'fa-solid fa-wind'],
        ];

        foreach ($ventaChildren as $index => $child) {
            Menu::create([
                'label' => $child['label'],
                'icon' => $child['icon'],
                'route' => '/seguridad',
                'parent_id' => $ventaExtintores->id,
                'orden' => $index + 1,
            ]);
        }

        // Submenús de Extintores
        Menu::create([
            'label' => 'Recarga de extintores',
            'icon' => 'fa-solid fa-rotate',
            'route' => '/seguridad',
            'parent_id' => $extintores->id,
            'orden' => 2,
        ]);

        Menu::create([
            'label' => 'Mantenimientos de extintores',
            'icon' => 'fa-solid fa-rotate',
            'route' => '/seguridad',
            'parent_id' => $extintores->id,
            'orden' => 3,
        ]);

        // 🔹 Seguridad
        Menu::create([
            'label' => 'Seguiridad',
            'icon' => 'fa-solid fa-shield-halved',
            'route' => '/seguridad',
            'parent_id' => null,
            'orden' => 3,
        ]);

        // 🔹 Servicios
        Menu::create([
            'label' => 'Servicios',
            'icon' => 'fa-solid fa-gears',
            'route' => '/servicios',
            'parent_id' => null,
            'orden' => 4,
        ]);
    }
}
