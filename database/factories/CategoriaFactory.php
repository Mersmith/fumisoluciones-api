<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Categoria>
 */
class CategoriaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $nombre = $this->faker->unique()->words(2, true); // Ej: "Ropa Hombre"
        return [
            'nombre' => ucfirst($nombre),
            'slug' => Str::slug($nombre),
            'imagen' => "https://grupotecniexpertos.com/wp-content/uploads/2025/01/4032_20241115121344.png", // Imagen fake
            'descripcion' => $this->faker->sentence(10),
        ];
    }
}
