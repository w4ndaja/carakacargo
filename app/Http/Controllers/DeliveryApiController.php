<?php

namespace App\Http\Controllers;

use App\Models\Delivery;
use Illuminate\Http\Request;

class DeliveryApiController extends Controller
{
    public function list(Request $request)
    {
        $deliveries = Delivery::with('warehouse.category', 'warehouse.client', 'originCity')->orderBy('created_at', 'asc')->get();
        return response()->json([
            'message' => 'success',
            'data' => $deliveries->map(function($delivery){
                return [
                    'waybill' => $delivery->waybill,
                    'service_type' => $delivery->service_type,
                    'status' => $delivery->status,
                    'received_by' => $delivery->received_by,
                    'foto_penerima' => $delivery->foto_penerima,
                    'foto_surat_jalan' => $delivery->foto_surat_jalan,
                    'notes' => $delivery->notes,
                    'origin_city' => optional($delivery->originCity)->name,
                    'dest_city' => optional($delivery->destCity)->name,
                    'category' => optional(optional($delivery->warehouse)->category)->name,
                    'client' => optional($delivery->warehouse)->client,
                ];
            })
        ]);
    }
}
