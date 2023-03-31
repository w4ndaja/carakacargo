<?php

namespace App\Models;

use App\Traits\Search;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravolt\Indonesia\Models\City;

class Product extends Model
{
    use HasFactory, Search;
    protected $guarded = ['id'];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function delivery()
    {
        return $this->hasOne(Delivery::class, 'product_id');
    }

    public function kolis()
    {
        return $this->hasMany(ProductKoli::class, 'product_id');
    }

    public function client()
    {
        return $this->belongsTo(Client::class, 'client_id');
    }

    public function destCity()
    {
        return $this->belongsTo(City::class, 'dest_city_id');
    }
}
