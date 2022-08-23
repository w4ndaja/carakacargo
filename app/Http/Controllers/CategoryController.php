<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $categories = Category::search($request->search, 'code', 'name', 'description' )->paginate(10)->withQueryString();
        return Inertia::render('Master/Category/Index', compact('categories'));
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
            'code' => 'required|string|unique:categories,code',
            'name' => 'required|string|unique:categories,name',
            'description' => 'required|string',
        ]);
        Category::create($form);
        return back()->with('success', 'Kategori berhasil ditambah!');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Category $category)
    {
        $form = $request->validate([
            'code' => 'required|string|unique:categories,code,'.$category->id,
            'name' => 'required|string|unique:categories,name,'.$category->id,
            'description' => 'required|string',
        ]);
        $category->update($form);
        return back()->with('success', 'Kategori berhasil diperbaharui!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Category $category)
    {
        $category->delete();
        return back()->with('success', 'Kategory berhasil dihapus!');
    }
}
