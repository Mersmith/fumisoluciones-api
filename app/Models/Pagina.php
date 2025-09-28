<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pagina extends Model
{
    use HasFactory;

    protected $fillable = ['titulo', 'slug', 'imagen', 'descripcion', 'contenido'];

    protected $casts = [
        'contenido' => 'array', // JSON → array automático
    ];

    // Relación con menús
    public function menus()
    {
        return $this->belongsToMany(Menu::class, 'menu_paginas');
    }

    // Relación con servicios
    public function servicios()
    {
        return $this->belongsToMany(Servicio::class, 'pagina_servicios');
    }
}
