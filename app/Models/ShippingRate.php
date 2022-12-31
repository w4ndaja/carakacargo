<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravolt\Indonesia\Models\City;
use Laravolt\Indonesia\Models\District;
use Laravolt\Indonesia\Models\Province;

class ShippingRate extends Model
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
}
