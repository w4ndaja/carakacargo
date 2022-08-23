<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $users = User::with('role:id,name')->search($request->search, 'name', 'email')->paginate()->withQueryString();
        $roles = Role::all();
        return Inertia::render('Master/User/Index', compact('users', 'roles'));
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
            'email' => 'required|string|unique:users,email',
            'name' => 'required|string',
            'password' => 'required|string|confirmed',
            'role_id' => 'required|integer',
        ]);
        $form['password'] = bcrypt($request->password);
        $user = User::create($form);
        return back()->with('success', 'User berhasil ditambah!');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        $form = $request->validate([
            'email' => 'required|string|unique:users,email,' . $user->id,
            'name' => 'required|string',
            'password' => 'nullable|string|confirmed',
            'role_id' => 'required|integer',
        ]);

        if(!$request->exists('password') || $request->password == ''){
            unset($form['password']);
            unset($form['password_confirmation']);
        }else{
            $form['password'] = bcrypt($request->password);
        }

        $user->update($form);
        return back()->with('success', 'User berhasil diperbaharui!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $user->delete();
        return back()->with('success', 'User berhasil dihapus!');
    }
}
