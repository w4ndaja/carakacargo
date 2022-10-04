<?php

namespace App\Http\Controllers;

use App\Models\Category;
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
        $products = Product::with('category:id,name')->search($request->search, 'code', 'name', 'resi_no')->paginate()->withQueryString();
        $categories = Category::all();
        return Inertia::render('Master/Product/Index', compact('products', 'categories'));
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
            'label' => 'required|string',
            'koli' => 'required|integer',
            'width' => 'required|integer',
            'height' => 'required|integer',
            'length' => 'required|integer',
            'weight' => 'required|integer',
            'category_id' => 'required|integer',
        ]);
        Product::create($form);
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
            'name' => 'required|string',
            'category_id' => 'required|integer',
            'description' => 'required|string',
        ]);
        $product->update($form);
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
