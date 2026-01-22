<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderTracking extends Model
{
    protected $fillable = [
        'order_id',
        'status',
        'description',
        'location',
        'estimated_delivery',
        'tracking_number',
        'carrier',
        'metadata'
    ];

    protected $casts = [
        'estimated_delivery' => 'datetime',
        'metadata' => 'array'
    ];

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    public static function getStatusLabels()
    {
        return [
            'pending' => 'Order Pending',
            'confirmed' => 'Order Confirmed',
            'processing' => 'Processing',
            'packed' => 'Packed',
            'shipped' => 'Shipped',
            'in_transit' => 'In Transit',
            'out_for_delivery' => 'Out for Delivery',
            'delivered' => 'Delivered',
            'cancelled' => 'Cancelled',
            'returned' => 'Returned'
        ];
    }

    public function getStatusLabelAttribute()
    {
        return self::getStatusLabels()[$this->status] ?? ucfirst($this->status);
    }

    public static function getStatusProgress($status)
    {
        $progressMap = [
            'pending' => 10,
            'confirmed' => 20,
            'processing' => 35,
            'packed' => 50,
            'shipped' => 65,
            'in_transit' => 80,
            'out_for_delivery' => 90,
            'delivered' => 100,
            'cancelled' => 0,
            'returned' => 0
        ];

        return $progressMap[$status] ?? 0;
    }

    public function getProgressAttribute()
    {
        return self::getStatusProgress($this->status);
    }
}
