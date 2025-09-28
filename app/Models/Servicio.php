<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Servicio extends Model
{
    use HasFactory;

    protected $fillable = ['nombre', 'slug', 'categoria_id', 'imagen', 'descripcion', 'contenido'];

    protected $casts = [
        'contenido' => 'array',
    ];

    public function contactos()
    {
        return $this->hasMany(Contacto::class);
    }

    // Relación con categoría
    public function categoria()
    {
        return $this->belongsTo(Categoria::class);
    }

    // Relación con páginas
    public function paginas()
    {
        return $this->belongsToMany(Pagina::class, 'pagina_servicios');
    }
}
