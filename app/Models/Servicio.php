<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Servicio extends Model
{
    use HasFactory;

    protected $fillable = ['nombre', 'slug', 'imagen', 'descripcion'];

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
