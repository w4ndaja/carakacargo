<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Client;
use App\Models\Delivery;
use App\Models\Driver;
use App\Models\Product;
use App\Models\ShippingRate;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Laravolt\Indonesia\Models\City;
use Laravolt\Indonesia\Models\District;
use Laravolt\Indonesia\Models\Province;

class ReportController extends Controller
{
    public function report(Request $request)
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
                $shippingRate->_price = number_format($shippingRate->price, 0, ',', '.');
            }
            return $shippingRate;
        };
        $categories = function () {
            return Category::all();
        };
        return Inertia::render('Report/Index', compact('deliveries', 'provinces', 'originCities', 'originDistricts', 'destCities', 'destDistricts', 'drivers', 'products', 'clients', 'shippingRate', 'categories'));
    }
}
