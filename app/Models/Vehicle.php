<?php

namespace App\Models;

use App\Traits\Search;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    use HasFactory, Search;
    protected $guarded = ['id'];
    protected $casts = [
        'license_valid_until' => 'datetime:Y-m-d',
        'keur_valid_until' => 'datetime:Y-m-d'
    ];
    protected $appends = ['license_valid_until_translated', 'keur_valid_until_translated'];

    public function getLicenseValidUntilTranslatedAttribute()
    {
        return $this->license_valid_until->translatedFormat('d F Y');
    }

    public function getKeurValidUntilTranslatedAttribute()
    {
        return $this->keur_valid_until->translatedFormat('d F Y');
    }

}
