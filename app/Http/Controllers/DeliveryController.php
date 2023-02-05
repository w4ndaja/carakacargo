<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Client;
use Inertia\Inertia;
use Illuminate\Support\Str;
use App\Models\Delivery;
use App\Models\Driver;
use App\Models\Product;
use App\Models\ShippingRate;
use Illuminate\Http\Request;
use Laravolt\Indonesia\Models\City;
use Laravolt\Indonesia\Models\District;
use Laravolt\Indonesia\Models\Province;

class DeliveryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $deliveries = function () {
            $deliveries = Delivery::with('originProvince', 'originCity', 'originDistrict', 'destProvince', 'destCity', 'destDistrict', 'driver.user', 'client', 'product')->paginate(10)->withQueryString();
            $deliveries->getCollection()->map(function ($item) {
                $item->_price = number_format($item->price, 0, ',', '.');
                return $item;
            });
            return $deliveries;
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
        $drivers = function () {
            return Driver::with('user')->get();
        };
        $products = function () {
            return Product::whereDoesntHave('delivery')->orWhereHas('delivery', function ($delivery) {
                $delivery->whereNull('received_by');
            })->get();
        };
        $clients = function () {
            return Client::all();
        };
        $shippingRate = function () use ($request) {
            $shippingRate = ShippingRate::where([
                'origin_province_id' => $request->origin_province_id,
                'origin_city_id' => $request->origin_city_id,
                'origin_district_id' => $request->origin_district_id,
                'dest_province_id' => $request->dest_province_id,
                'dest_city_id' => $request->dest_city_id,
                'dest_district_id' => $request->dest_district_id,
                'shipping_channel' => $request->shipping_channel,
            ])->first();
            if ($shippingRate) {
                $shippingRate->price = Product::findOrNew($request->product_id)->volume_total || 0;
                // $shippingRate->price = $shippingRate->price * floor(Product::find($request->product_id)->volume_total / 1000);
                $shippingRate->_price = number_format($shippingRate->price, 0, ',', '.');
            }
            return $shippingRate;
        };
        $categories = function () {
            return Category::all();
        };
        return Inertia::render('Delivery/Index', compact('deliveries', 'provinces', 'originCities', 'originDistricts', 'destCities', 'destDistricts', 'drivers', 'products', 'clients', 'shippingRate', 'categories'));
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
            "driver_id" => "required|integer",
            "product_id" => "required|integer",
            "waybill" => "required|string",
            "origin_province_id" => "required|integer",
            "origin_city_id" => "required|integer",
            "origin_district_id" => "required|integer",
            "dest_province_id" => "required|integer",
            "dest_city_id" => "required|integer",
            "dest_district_id" => "required|integer",
            "service_type" => "required|string",
            "status" => "required|string",
            "price" => "required|integer",
            "client_id" => "required|integer",
        ]);
        Delivery::create($form);
        return back()->with('success', 'Pengiriman berhasil ditambah!');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Delivery $delivery)
    {
        $form = $request->validate([
            "driver_id" => "required|integer",
            "product_id" => "required|integer",
            "waybill" => "required|string",
            "origin_province_id" => "required|integer",
            "origin_city_id" => "required|integer",
            "origin_district_id" => "required|integer",
            "dest_province_id" => "required|integer",
            "dest_city_id" => "required|integer",
            "dest_district_id" => "required|integer",
            "service_type" => "required|string",
            "status" => "required|string",
            "price" => "required|integer",
            "client_id" => "required|integer",
        ]);
        $delivery->update($form);
        return back()->with('success', 'Pengiriman berhasil diperbaharui!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Delivery $delivery)
    {
        $delivery->delete();
        return back()->with('success', 'Pengiriman berhasil dihapus!');
    }
}
