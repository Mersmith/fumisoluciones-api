<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Categoria;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Producto>
 */
class ProductoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $nombre = $this->faker->unique()->words(3, true); // Ej: "Camiseta deportiva azul"
        return [
            'categoria_id' => Categoria::inRandomOrder()->first()?->id ?? Categoria::factory(),
            'nombre' => ucfirst($nombre),
            'slug' => Str::slug($nombre) . '-' . $this->faker->unique()->numberBetween(1, 9999),
            'imagen' => "https://grupotecniexpertos.com/wp-content/uploads/2025/01/4032_20241115121344.png", // Imagen fake
            'descripcion' => $this->faker->paragraph(3),
        ];
    }
}
