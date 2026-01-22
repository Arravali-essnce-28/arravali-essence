<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    protected $fillable = [
        'user_id',
        'order_number',
        'status',
        'total_amount',
        'shipping_address',
        'billing_address',
        'payment_method',
        'payment_status',
        'notes'
    ];

    protected $casts = [
        'total_amount' => 'decimal:2',
        'shipping_address' => 'array',
        'billing_address' => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

        public function tracking(): HasMany
    {
        return $this->hasMany(OrderTracking::class)->orderBy('created_at', 'desc');
    }

    public function latestTracking(): BelongsTo
    {
        return $this->belongsTo(OrderTracking::class, 'id', 'id')
            ->orderBy('created_at', 'desc')
            ->withDefault(function () {
                return new OrderTracking([
                    'status' => $this->status,
                    'description' => 'Order created'
                ]);
            });
    }

    protected static function booted()
    {
        static::creating(function ($order) {
            if (empty($order->order_number)) {
                $order->order_number = 'ORD-' . strtoupper(uniqid());
            }
        });
    }
}