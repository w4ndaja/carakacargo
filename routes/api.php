<?php

use App\Http\Controllers\AuthApiController;
use App\Http\Controllers\DeliveryApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('login', [AuthApiController::class, 'login']);
Route::middleware('auth:sanctum')->group(function(){
    Route::get('me', [AuthApiController::class, 'me']);
    Route::delete('logout', [AuthApiController::class, 'logout']);
    Route::get('deliveries', [DeliveryApiController::class, 'list']);
});