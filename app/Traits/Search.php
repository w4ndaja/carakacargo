<?php

namespace App\Traits;

trait Search
{
    public function scopeSearch($q, $search, ...$columns)
    {
        if (!empty($search)) {
            $q->where($columns[0], 'like', '%' . $search . '%');
            foreach ($columns as $i => $column) {
                if ($i > 1) $q->orWhere($column, 'like', '%' . $search . '%');
            }
        }
    }
}