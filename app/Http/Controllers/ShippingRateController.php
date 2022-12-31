<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Support\Str;
use App\Models\ShippingRate;
use Illuminate\Http\Request;
use Laravolt\Indonesia\Models\City;
use Laravolt\Indonesia\Models\District;
use Laravolt\Indonesia\Models\Province;

class ShippingRateController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $shippingRates = function () {
            $shippingRates = ShippingRate::with('originProvince', 'originCity', 'originDistrict', 'destProvince', 'destCity', 'destDistrict')->paginate(10)->withQueryString();
            $shippingRates->getCollection()->transform(function ($item) {
                $item->origin = "{$item->originProvince->name} - {$item->originCity->name} - {$item->originDistrict->name}";
                $item->destination = "{$item->originProvince->name} - {$item->originCity->name} - {$item->originDistrict->name}";
                $item->shipping_channel = Str::title($item->shipping_channel);
                $item->price = "Rp. " . number_format($item->price, 0, ',', '.');
                return $item;
            });
            return $shippingRates;
        };
        $provinces = function () {
            return Province::all();
        };
        $originCities = function () use ($request) {
            if ($request->has('origin_province_id')) {
                return City::where('province_code', $request->origin_province_id)->get();
            }
            return [];
        };
        $originDistricts = function () use ($request) {
            if ($request->has('origin_city_id')) {
                return District::where('city_code', $request->origin_city_id)->get();
            }
            return [];
        };
        $destCities = function () use ($request) {
            if ($request->has('dest_province_id')) {
                return City::where('province_code', $request->dest_province_id)->get();
            }
            return [];
        };
        $destDistricts = function () use ($request) {
            if ($request->has('dest_city_id')) {
                return District::where('city_code', $request->dest_city_id)->get();
            }
            return [];
        };
        return Inertia::render('Master/ShippingRate/Index', compact('shippingRates', 'provinces', 'originCities', 'originDistricts', 'destCities', 'destDistricts'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $form = $request->validate([
            'origin_province_id' => 'required|integer',
            'origin_city_id' => 'required|integer',
            'origin_district_id' => 'required|integer',
            'dest_province_id' => 'required|integer',
            'dest_city_id' => 'required|integer',
            'dest_district_id' => 'required|integer',
            'shipping_channel' => 'required|string',
            'price' => 'required|integer',
        ]);
        ShippingRate::create($form);
        return back()->with('success', 'Tarif berhasil ditambah!');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ShippingRate $category)
    {
        $form = $request->validate([
            'origin_province_id' => 'required|integer',
            'origin_city_id' => 'required|integer',
            'origin_district_id' => 'required|integer',
            'dest_province_id' => 'required|integer',
            'dest_city_id' => 'required|integer',
            'dest_district_id' => 'required|integer',
            'shipping_channel' => 'required|string',
            'price' => 'required|integer',
        ]);
        $category->update($form);
        return back()->with('success', 'Tarif berhasil diperbaharui!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(ShippingRate $category)
    {
        $category->delete();
        return back()->with('success', 'Kategory berhasil dihapus!');
    }
}
