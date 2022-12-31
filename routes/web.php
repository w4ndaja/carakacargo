<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return redirect()->route('dashboard');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::resource('categories', 'CategoryController');
    Route::resource('products', 'ProductController');
    Route::resource('clients', 'ClientController');
    Route::resource('users', 'UserController');
    Route::resource('vehicles', 'VehicleController');
    Route::resource('drivers', 'DriverController');
    Route::resource('shipping-rates', 'ShippingRateController');
    Route::resource('deliveries', 'DeliveryController');
    Route::post('provinces/{province}/cities', 'GeoController@citiesByProvince')->name('citiesByProvince');
    Route::post('cities/{city}/districs', 'GeoController@districtsByCity')->name('districtsByCity');
});

require __DIR__ . '/auth.php';
