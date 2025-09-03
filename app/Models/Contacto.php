<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contacto extends Model
{
    use HasFactory;

    protected $fillable = ['nombre', 'apellido', 'correo', 'telefono', 'detalle', 'servicio_id'];

    public function servicio()
    {
        return $this->belongsTo(Servicio::class);
    }
}
