<?php

namespace App\Models;

use App\Models\Client;
use App\Models\Driver;
use App\Models\Product;
use App\Models\ShippingRate;
use Laravolt\Indonesia\Models\City;
use Illuminate\Database\Eloquent\Model;
use Laravolt\Indonesia\Models\District;
use Laravolt\Indonesia\Models\Province;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Delivery extends Model
{
    use HasFactory;
    protected $guarded = ['id'];
    public function originProvince()
    {
        return $this->belongsTo(Province::class, 'origin_province_id', 'code');
    }
    public function originCity()
    {
        return $this->belongsTo(City::class, 'origin_city_id', 'code');
    }
    public function originDistrict()
    {
        return $this->belongsTo(District::class, 'origin_district_id', 'code');
    }
    public function destProvince()
    {
        return $this->belongsTo(Province::class, 'dest_province_id', 'code');
    }
    public function destCity()
    {
        return $this->belongsTo(City::class, 'dest_city_id', 'code');
    }
    public function destDistrict()
    {
        return $this->belongsTo(District::class, 'dest_district_id', 'code');
    }
    public function driver()
    {
        return $this->belongsTo(Driver::class, 'driver_id');
    }
    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
    public function warehouse()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
    public function client()
    {
        return $this->belongsTo(Client::class, 'client_id');
    }
}
