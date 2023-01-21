<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Delivery;
use App\Models\Driver;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function dashboard()
    {
        $warehouses = Product::whereDoesntHave('delivery')->whereDate('created_at', now()->format('Y-m-d'))->count();
        $deliveries = Delivery::count();
        $couriers = Driver::count();
        $clients = Client::count();
        return Inertia::render('Dashboard', compact(
            'warehouses',
            'deliveries',
            'couriers',
            'clients',
        ));
    }
}
