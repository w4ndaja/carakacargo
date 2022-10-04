<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VehicleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $vehicles = Vehicle::search($request->search, 'code', 'merk', 'type', 'police_no')->orderBy('license_valid_until')->paginate(10)->withQueryString();
        return Inertia::render('Master/Vehicle/Index', compact('vehicles'));
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
            'code' => 'required|string|unique:vehicles,code',
            'merk' => 'required|string',
            'type' => 'required|string',
            'police_no' => 'required|string',
            'year' => 'required|integer',
            'license_valid_until' => 'required|date',
            'keur_valid_until' => 'required|date',
        ]);

        Vehicle::create($form);
        return back()->with('success', 'Kendaraan berhasil ditambah!');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Vehicle $vehicle)
    {
        $form = $request->validate([
            'code' => 'required|string|unique:vehicles,code,'.$vehicle->id,
            'merk' => 'required|string',
            'type' => 'required|string',
            'police_no' => 'required|string',
            'year' => 'required|integer',
            'license_valid_until' => 'required|date',
            'keur_valid_until' => 'required|date',
        ]);

        $vehicle->update($form);

        return back()->with('success', 'Kendaraan berhasil diperbaharui!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Vehicle $vehicle)
    {
        $vehicle->delete();
        return back()->with('success', 'Kendaraan berhasil dihapus!');
    }
}
