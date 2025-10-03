<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            MenuSeeder::class,
            PaginaSeeder::class,
            MenuPaginaSeeder::class,
            CategoriaSeeder::class,
            ProductoSeeder::class,
            ServicioSeeder::class,
            //PaginaServicioSeeder::class,
            //ContactoSeeder::class,
            //CotizacionSeeder::class,
        ]);
    }
}
