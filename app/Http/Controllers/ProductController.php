<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Client;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Laravolt\Indonesia\Models\City;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $todayProductCount = Product::whereDate('created_at', now()->format('Y-m-d'))->count();
        $newResi = now()->format('Ymd') . str_pad($todayProductCount + 1, 5, "0", STR_PAD_LEFT);
        $products = Product::search($request->search, 'label')->with(['category:id,name', 'client:id,code,name', 'kolis', 'destCity'])->where(function ($q) use ($request) {
            $q->orWhereHas('client', function ($client) use ($request) {
                $client->search($request->search, 'name');
            });
        })->whereDoesntHave('delivery')->paginate()->withQueryString();
        $categories = Category::all();
        $cities = function () {
            return City::all();
        };
        $clients = function () use ($request) {
            if (array_key_exists('q', $request->client ?? [])) {
                return Client::search($request->client['q'])->get();
            }
            return Client::all();
        };

        return Inertia::render('Master/Product/Index', compact('products', 'categories', 'clients', 'newResi', 'cities'));
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
            'category_id' => 'required',
            'label' => 'required',
            'resi' => 'required',
            'koli' => 'required',
            'client_id' => 'required',
            'dest_city_id' => 'required',
            'total_berat' => 'required',
            'total_kubikasi' => 'required',
            'kolis' => 'required|array',
            'kolis.*.width' => 'required',
            'kolis.*.length' => 'required',
            'kolis.*.height' => 'required',
            'kolis.*.weight' => 'required',
            'kolis.*.vol_kg' => 'required',
            'kolis.*.cbm' => 'required',
            'kolis.*.total_kg' => 'required',
        ]);
        $product = Product::create([
            'category_id' => $form['category_id'],
            'label' => $form['label'],
            'resi' => $form['resi'],
            'koli' => $form['koli'],
            'client_id' => $form['client_id'],
            'resi' => $form['resi'],
            'dest_city_id' => $form['dest_city_id'],
            'total_berat' => $form['total_berat'],
            'total_kubikasi' => $form['total_kubikasi'],
        ]);
        $product->kolis()->createMany(collect($form['kolis'])->map(function ($item) {
            return [
                'width' => $item['width'],
                'height' => $item['height'],
                'length' => $item['length'],
                'weight' => $item['weight'],
                'vol_kg' => $item['vol_kg'],
                'cbm' => $item['cbm'],
                'total_kg' => $item['total_kg'],
            ];
        }));
        return back()->with('success', 'Barang berhasil ditambah!');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Product $product)
    {
        $form = $request->validate([
            'category_id' => 'required',
            'label' => 'required',
            'resi' => 'required',
            'koli' => 'required',
            'client_id' => 'required',
            'dest_city_id' => 'required',
            'total_berat' => 'required',
            'total_kubikasi' => 'required',
            'kolis' => 'required|array',
            'kolis.*.width' => 'required',
            'kolis.*.length' => 'required',
            'kolis.*.height' => 'required',
            'kolis.*.weight' => 'required',
            'kolis.*.vol_kg' => 'required',
            'kolis.*.cbm' => 'required',
            'kolis.*.total_kg' => 'required',
        ]);
        $product->update([
            'category_id' => $form['category_id'],
            'label' => $form['label'],
            'resi' => $form['resi'],
            'koli' => $form['koli'],
            'client_id' => $form['client_id'],
            'resi' => $form['resi'],
            'dest_city_id' => $form['dest_city_id'],
            'total_berat' => $form['total_berat'],
            'total_kubikasi' => $form['total_kubikasi'],
        ]);
        $product->kolis()->delete();
        $product->kolis()->createMany(collect($form['kolis'])->map(function ($item) {
            return [
                'width' => $item['width'],
                'height' => $item['height'],
                'length' => $item['length'],
                'weight' => $item['weight'],
                'vol_kg' => $item['vol_kg'],
                'cbm' => $item['cbm'],
                'total_kg' => $item['total_kg'],
            ];
        }));
        return back()->with('success', 'Barang berhasil diperbaharui!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        $product->delete();
        return back()->with('success', 'Barang berhasil dihapus!');
    }
}
