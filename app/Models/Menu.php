<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    use HasFactory;

    protected $fillable = ['label', 'icon', 'route', 'parent_id', 'orden'];

    // Relación con submenús
    public function children()
    {
        return $this->hasMany(Menu::class, 'parent_id');
    }

    // Relación con menú padre
    public function parent()
    {
        return $this->belongsTo(Menu::class, 'parent_id');
    }

    // Relación con páginas
    public function paginas()
    {
        return $this->belongsToMany(Pagina::class, 'menu_paginas');
    }
}
