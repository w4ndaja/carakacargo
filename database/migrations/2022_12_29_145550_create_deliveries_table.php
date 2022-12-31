<?php

use App\Models\Driver;
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
            $table->foreignId('product_id')->constrained('products', 'id')->cascadeOnDelete()->cascadeOnUpdate();
            $table->string('waybill')->unique();
            $table->foreignId('origin_province_id');
            $table->foreignId('origin_city_id');
            $table->foreignId('origin_district_id');
            $table->foreignId('dest_province_id');
            $table->foreignId('dest_city_id');
            $table->foreignId('dest_district_id');
            $table->string('service_type')->index('delivery_service_type_index');
            $table->string('status')->index('delivery_status_index');
            $table->double('price');
            $table->foreignId('client_id')->constrained('clients', 'id')->cascadeOnDelete()->cascadeOnUpdate();
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
