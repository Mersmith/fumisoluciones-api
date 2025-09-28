<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('menu_paginas', function (Blueprint $table) {
            $table->id();

            $table->foreignId('menu_id')->constrained('menus')->onDelete('cascade');
            $table->foreignId('pagina_id')->constrained('paginas')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('menu_paginas');
    }
};
