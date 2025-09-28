<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categoria extends Model
{
    use HasFactory;

    protected $fillable = ['tipo', 'nombre', 'slug', 'imagen', 'descripcion'];

    public function productos()
    {
        return $this->hasMany(Producto::class);
    }

    // Relación con servicios
    public function servicios()
    {
        return $this->hasMany(Servicio::class);
    }
}
