<?php

namespace App\Http\Controllers;

use App\Models\Driver;
use App\Models\User;
use App\Models\Vehicle;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DriverController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return Inertia::render('Master/Driver/Index', [
            'drivers' => function () use ($request) {
                return Driver::with('vehicle', 'user')->search($request->search, 'code', 'merk', 'type', 'police_no')->orderBy('license_valid_until')->paginate(10)->withQueryString();
            },
            'vehicles' => function() use ($request){
                return Vehicle::all();
            },
            'users' => function () {
                return User::where('role', 'Kurir')->get();
            }
        ]);
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
            'user_id' => 'required|integer',
            'vehicle_id' => 'nullable|integer',
            'license_type' => 'required|string',
            'license_valid_until' => 'required|string',
        ]);

        Driver::create($form);
        return back()->with('success', 'Kurir berhasil ditambah!');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Driver $driver)
    {
        $form = $request->validate([
            'user_id' => 'required|integer',
            'vehicle_id' => 'nullable|integer',
            'license_type' => 'required|string',
            'license_valid_until' => 'required|string',
        ]);

        $driver->update($form);

        return back()->with('success', 'Kurir berhasil diperbaharui!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Driver $driver)
    {
        $driver->delete();
        return back()->with('success', 'Kurir berhasil dihapus!');
    }
}
