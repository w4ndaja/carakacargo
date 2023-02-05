<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Client;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
        $products = Product::search($request->search, 'code', 'label')->with(['category:id,name', 'client:id,code,name', 'kolis'])->where(function ($q) use ($request) {
            $q->orWhereHas('client', function ($client) use ($request) {
                $client->search($request->search, 'name');
            });
        })->whereDoesntHave('delivery')->paginate()->withQueryString();
        $categories = Category::all();

        $clients = function () use ($request) {
            if (array_key_exists('q', $request->client ?? [])) {
                return Client::search($request->client['q'])->get();
            }
            return Client::all();
        };

        return Inertia::render('Master/Product/Index', compact('products', 'categories', 'clients', 'newResi'));
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
            'code' => 'required|string|unique:products,code',
            'client_id' => 'required|integer',
            'label' => 'required|string',
            'resi' => 'required|string',
            'koli' => 'required|integer',
            'width.*' => 'required|integer',
            'height.*' => 'required|integer',
            'length.*' => 'required|integer',
            'weight.*' => 'required|integer',
            'category_id' => 'required|integer',
            'volume_weight' => 'required|integer',
        ]);
        $product = Product::create([
            'client_id' => $form['client_id'],
            'resi' => $form['resi'],
            'code' => $form['code'],
            'label' => $form['label'],
            'koli' => $form['koli'],
            'category_id' => $form['category_id'],
            'volume_weight' => $form['volume_weight'],
        ]);
        for ($koli = 0; $koli < $form['koli']; $koli++) {
            $product->kolis()->create([
                'width' => $form['width'][$koli],
                'height' => $form['height'][$koli],
                'length' => $form['length'][$koli],
                'weight' => $form['weight'][$koli],
            ]);
        }

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
            'code' => 'required|string|unique:products,code,' . $product->id,
            'client_id' => 'required|integer',
            'label' => 'required|string',
            'resi' => 'required|string',
            'koli' => 'required|integer',
            'width.*' => 'required|integer',
            'height.*' => 'required|integer',
            'length.*' => 'required|integer',
            'weight.*' => 'required|integer',
            'category_id' => 'required|integer',
            'volume_weight' => 'required|integer',
        ]);
        $product->update([
            'client_id' => $form['client_id'],
            'resi' => $form['resi'],
            'code' => $form['code'],
            'label' => $form['label'],
            'koli' => $form['koli'],
            'category_id' => $form['category_id'],
            'volume_weight' => $form['volume_weight'],
        ]);
        $product->kolis()->delete();
        for ($koli = 0; $koli < $form['koli']; $koli++) {
            $product->kolis()->create([
                'width' => $form['width'][$koli],
                'height' => $form['height'][$koli],
                'length' => $form['length'][$koli],
                'weight' => $form['weight'][$koli],
            ]);
        }
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
