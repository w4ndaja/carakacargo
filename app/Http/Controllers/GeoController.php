<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravolt\Indonesia\Models\City;
use Laravolt\Indonesia\Models\Province;

class GeoController extends Controller
{
    public function citiesByProvince(Province $province)
    {
        return back()->with('data', $province->cities);
    }

    public function districtsByCity(City $city)
    {
        return back()->with('data', $city->districts);
    }
}
