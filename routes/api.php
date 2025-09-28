<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\CotizacionController;
use App\Http\Controllers\ContactoController;
use App\Http\Controllers\ServicioController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\PaginaController;
use App\Http\Controllers\MenuPaginaController;

Route::apiResource('categorias', CategoriaController::class);
Route::apiResource('productos', ProductoController::class);
Route::apiResource('servicios', ServicioController::class);
Route::apiResource('contactos', ContactoController::class);
Route::apiResource('cotizaciones', CotizacionController::class);

Route::apiResource('menus', MenuController::class);
Route::apiResource('paginas', PaginaController::class);

// para la tabla pivote menu_paginas (relaciones)
Route::apiResource('menu-paginas', MenuPaginaController::class)->only(['index', 'store', 'destroy']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
