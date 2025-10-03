<?php

use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\ContactoController;
use App\Http\Controllers\CotizacionController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\MenuPaginaController;
use App\Http\Controllers\PaginaController;
use App\Http\Controllers\PaginaServicioController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\ServicioController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('menus', [MenuController::class, 'index'])->name('menus.index');
Route::post('menus', [MenuController::class, 'store'])->name('menus.store');
Route::get('menus/{menu}', [MenuController::class, 'show'])->name('menus.show');
Route::put('menus/{menu}', [MenuController::class, 'update'])->name('menus.update');
Route::patch('menus/{menu}', [MenuController::class, 'update']);
Route::delete('menus/{menu}', [MenuController::class, 'destroy'])->name('menus.destroy');

Route::get('paginas', [PaginaController::class, 'index'])->name('paginas.index');
Route::post('paginas', [PaginaController::class, 'store'])->name('paginas.store');
Route::get('paginas/{pagina}', [PaginaController::class, 'show'])->name('paginas.show');
Route::put('paginas/{pagina}', [PaginaController::class, 'update'])->name('paginas.update');
Route::patch('paginas/{pagina}', [PaginaController::class, 'update']);
Route::delete('paginas/{pagina}', [PaginaController::class, 'destroy'])->name('paginas.destroy');

Route::get('menu-paginas', [MenuPaginaController::class, 'index'])->name('menu-paginas.index');
Route::post('menu-paginas', [MenuPaginaController::class, 'store'])->name('menu-paginas.store');
Route::delete('menu-paginas', [MenuPaginaController::class, 'destroy'])->name('menu-paginas.destroy');

Route::get('categorias', [CategoriaController::class, 'index'])->name('categorias.index');//
Route::post('categorias', [CategoriaController::class, 'store'])->name('categorias.store');
Route::get('categorias/{categoria}', [CategoriaController::class, 'show'])->name('categorias.show');
Route::put('categorias/{categoria}', [CategoriaController::class, 'update'])->name('categorias.update');
Route::patch('categorias/{categoria}', [CategoriaController::class, 'update']);
Route::delete('categorias/{categoria}', [CategoriaController::class, 'destroy'])->name('categorias.destroy');

Route::get('productos', [ProductoController::class, 'index'])->name('productos.index');
Route::post('productos', [ProductoController::class, 'store'])->name('productos.store');
Route::get('productos/{producto}', [ProductoController::class, 'show'])->name('productos.show');
Route::put('productos/{producto}', [ProductoController::class, 'update'])->name('productos.update');
Route::patch('productos/{producto}', [ProductoController::class, 'update']);
Route::delete('productos/{producto}', [ProductoController::class, 'destroy'])->name('productos.destroy');

Route::get('servicios/web', [ServicioController::class, 'indexWeb'])->name('servicios-web.index');
Route::get('servicios', [ServicioController::class, 'index'])->name('servicios.index');
Route::post('servicios', [ServicioController::class, 'store'])->name('servicios.store');
Route::get('servicios/{servicio}', [ServicioController::class, 'show'])->name('servicios.show');
Route::put('servicios/{servicio}', [ServicioController::class, 'update'])->name('servicios.update');
Route::patch('servicios/{servicio}', [ServicioController::class, 'update']);
Route::delete('servicios/{servicio}', [ServicioController::class, 'destroy'])->name('servicios.destroy');

Route::get('pagina-servicios', [PaginaServicioController::class, 'index'])->name('pagina-servicios.index');
Route::post('pagina-servicios', [PaginaServicioController::class, 'store'])->name('pagina-servicios.store');
Route::get('pagina-servicios/{paginaServicio}', [PaginaServicioController::class, 'show'])->name('pagina-servicios.show');
Route::put('pagina-servicios/{paginaServicio}', [PaginaServicioController::class, 'update'])->name('pagina-servicios.update');
Route::patch('pagina-servicios/{paginaServicio}', [PaginaServicioController::class, 'update']);
Route::delete('pagina-servicios/{paginaServicio}', [PaginaServicioController::class, 'destroy'])->name('pagina-servicios.destroy');

Route::get('contactos', [ContactoController::class, 'index'])->name('contactos.index');
Route::post('contactos', [ContactoController::class, 'store'])->name('contactos.store');
Route::get('contactos/{contacto}', [ContactoController::class, 'show'])->name('contactos.show');
Route::delete('contactos/{contacto}', [ContactoController::class, 'destroy'])->name('contactos.destroy');

Route::get('cotizaciones', [CotizacionController::class, 'index'])->name('cotizaciones.index');
Route::post('cotizaciones', [CotizacionController::class, 'store'])->name('cotizaciones.store');
Route::get('cotizaciones/{cotizacion}', [CotizacionController::class, 'show'])->name('cotizaciones.show');
Route::delete('cotizaciones/{cotizacion}', [CotizacionController::class, 'destroy'])->name('cotizaciones.destroy');

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
