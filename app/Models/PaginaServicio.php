<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaginaServicio extends Model
{
    use HasFactory;

    protected $fillable = [
        'pagina_id',
        'servicio_id',
    ];

    public function pagina()
    {
        return $this->belongsTo(Pagina::class);
    }

    public function servicio()
    {
        return $this->belongsTo(Servicio::class);
    }
}
