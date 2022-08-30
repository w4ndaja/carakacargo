<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDeliveriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('deliveries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('driver_id')->constrained('drivers', 'id')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignId('vehicle_id')->constrained('vehicles', 'id')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignId('product_id')->constrained('products', 'id')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignId('province_id')->constrained('indonesia_provinces', 'id')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignId('city_id')->constrained('indonesia_cities', 'id')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignId('district_id')->constrained('indonesia_districts', 'id')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignId('client_id')->constrained('clients', 'id')->cascadeOnDelete()->cascadeOnUpdate();
            $table->string('status')->default('Warehouse');
            $table->timestamp('sent_at')->nullable();
            $table->timestamp('received_at')->nullable();
            $table->integer('fee')->default(0);
            $table->integer('weight')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('deliveries');
    }
}
