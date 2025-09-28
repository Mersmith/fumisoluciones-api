<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MenuPagina extends Model
{
    use HasFactory;

    protected $table = 'menu_paginas';

    protected $fillable = [
        'menu_id',
        'pagina_id',
    ];

    public function menu()
    {
        return $this->belongsTo(Menu::class, 'menu_id');
    }

    public function pagina()
    {
        return $this->belongsTo(Pagina::class, 'pagina_id');
    }
}
