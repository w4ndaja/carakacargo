<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class PatchToProductKolisTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('product_kolis', function (Blueprint $table) {
            $table->double('vol_kg')->default(0);
            $table->double('cbm')->default(0);
            $table->double('total_kg')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('product_kolis', function (Blueprint $table) {
            //
        });
    }
}
