<?php

namespace App\Services;

use App\Models\Order;
use App\Models\User;
use App\Models\Product;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use App\Mail\OrderConfirmation;
use App\Mail\OrderStatusUpdate;
use App\Mail\PaymentConfirmation;
use App\Mail\ShippingUpdate;
use App\Mail\LowStockAlert;
use App\Mail\PromotionalEmail;
use App\Mail\PriceDropAlert;
use App\Mail\WelcomeEmail;

class NotificationService
{
    /**
     * Send order confirmation email
     */
    public function sendOrderConfirmation(Order $order): bool
    {
        try {
            if ($order->user) {
                Mail::to($order->user->email)->send(new OrderConfirmation($order));
            }
            
            // Also send to guest email if available
            $shippingAddress = json_decode($order->shipping_address, true);
            if (isset($shippingAddress['email']) && $shippingAddress['email'] !== ($order->user->email ?? null)) {
                Mail::to($shippingAddress['email'])->send(new OrderConfirmation($order));
            }
            
            Log::info('Order confirmation sent', ['order_id' => $order->id]);
            return true;
        } catch (\Exception $e) {
            Log::error('Failed to send order confirmation', [
                'order_id' => $order->id,
                'error' => $e->getMessage()
            ]);
            return false;
        }
    }

    /**
     * Send order status update email
     */
    public function sendOrderStatusUpdate(Order $order, string $oldStatus, string $newStatus): bool
    {
        try {
            if ($order->user) {
                Mail::to($order->user->email)->send(new OrderStatusUpdate($order, $oldStatus, $newStatus));
            }
            
            Log::info('Order status update sent', [
                'order_id' => $order->id,
                'old_status' => $oldStatus,
                'new_status' => $newStatus
            ]);
            return true;
        } catch (\Exception $e) {
            Log::error('Failed to send order status update', [
                'order_id' => $order->id,
                'error' => $e->getMessage()
            ]);
            return false;
        }
    }

    /**
     * Send payment confirmation email
     */
    public function sendPaymentConfirmation(Order $order): bool
    {
        try {
            if ($order->user) {
                Mail::to($order->user->email)->send(new PaymentConfirmation($order));
            }
            
            Log::info('Payment confirmation sent', ['order_id' => $order->id]);
            return true;
        } catch (\Exception $e) {
            Log::error('Failed to send payment confirmation', [
                'order_id' => $order->id,
                'error' => $e->getMessage()
            ]);
            return false;
        }
    }

    /**
     * Send shipping update email
     */
    public function sendShippingUpdate(Order $order, string $trackingNumber, string $status): bool
    {
        try {
            if ($order->user) {
                Mail::to($order->user->email)->send(new ShippingUpdate($order, $trackingNumber, $status));
            }
            
            Log::info('Shipping update sent', [
                'order_id' => $order->id,
                'tracking_number' => $trackingNumber,
                'status' => $status
            ]);
            return true;
        } catch (\Exception $e) {
            Log::error('Failed to send shipping update', [
                'order_id' => $order->id,
                'error' => $e->getMessage()
            ]);
            return false;
        }
    }

    /**
     * Send low stock alert to admin
     */
    public function sendLowStockAlert(Product $product): bool
    {
        try {
            $adminEmail = config('mail.admin_email', 'admin@arravaliessence.co.uk');
            Mail::to($adminEmail)->send(new LowStockAlert($product));
            
            Log::info('Low stock alert sent', ['product_id' => $product->id]);
            return true;
        } catch (\Exception $e) {
            Log::error('Failed to send low stock alert', [
                'product_id' => $product->id,
                'error' => $e->getMessage()
            ]);
            return false;
        }
    }

    /**
     * Send promotional email to subscribers
     */
    public function sendPromotionalEmail(array $userIds, string $subject, string $content, array $products = []): int
    {
        $successCount = 0;
        
        try {
            $users = User::whereIn('id', $userIds)
                ->where('email_notifications', true)
                ->chunk(100, function ($users) use ($content, $products, &$successCount) {
                    foreach ($users as $user) {
                        try {
                            Mail::to($user->email)->send(new PromotionalEmail($user, $content, $products));
                            $successCount++;
                        } catch (\Exception $e) {
                            Log::error('Failed to send promotional email', [
                                'user_id' => $user->id,
                                'error' => $e->getMessage()
                            ]);
                        }
                    }
                });
            
            Log::info('Promotional email campaign completed', [
                'total_users' => count($userIds),
                'successful' => $successCount
            ]);
            
            return $successCount;
        } catch (\Exception $e) {
            Log::error('Failed to send promotional emails', [
                'error' => $e->getMessage()
            ]);
            return $successCount;
        }
    }

    /**
     * Send price drop alert
     */
    public function sendPriceDropAlert(Product $product, float $oldPrice, float $newPrice): int
    {
        $successCount = 0;
        
        try {
            // Send to users who have this product in their wishlist
            $users = User::whereHas('wishlist', function ($query) use ($product) {
                $query->where('product_id', $product->id);
            })->where('email_notifications', true)->get();
            
            foreach ($users as $user) {
                try {
                    Mail::to($user->email)->send(new PriceDropAlert($user, $product, $oldPrice, $newPrice));
                    $successCount++;
                } catch (\Exception $e) {
                    Log::error('Failed to send price drop alert', [
                        'user_id' => $user->id,
                        'product_id' => $product->id,
                        'error' => $e->getMessage()
                    ]);
                }
            }
            
            Log::info('Price drop alerts sent', [
                'product_id' => $product->id,
                'old_price' => $oldPrice,
                'new_price' => $newPrice,
                'successful' => $successCount
            ]);
            
            return $successCount;
        } catch (\Exception $e) {
            Log::error('Failed to send price drop alerts', [
                'product_id' => $product->id,
                'error' => $e->getMessage()
            ]);
            return $successCount;
        }
    }

    /**
     * Send welcome email to new user
     */
    public function sendWelcomeEmail(User $user): bool
    {
        try {
            Mail::to($user->email)->send(new WelcomeEmail($user));
            
            Log::info('Welcome email sent', ['user_id' => $user->id]);
            return true;
        } catch (\Exception $e) {
            Log::error('Failed to send welcome email', [
                'user_id' => $user->id,
                'error' => $e->getMessage()
            ]);
            return false;
        }
    }

    /**
     * Send abandoned cart reminder
     */
    public function sendAbandonedCartReminder(User $user, array $cartItems): bool
    {
        try {
            if ($user->email_notifications) {
                Mail::to($user->email)->send(new \App\Mail\AbandonedCartReminder($user, $cartItems));
                
                Log::info('Abandoned cart reminder sent', [
                    'user_id' => $user->id,
                    'items_count' => count($cartItems)
                ]);
                return true;
            }
            
            return false;
        } catch (\Exception $e) {
            Log::error('Failed to send abandoned cart reminder', [
                'user_id' => $user->id,
                'error' => $e->getMessage()
            ]);
            return false;
        }
    }

    /**
     * Send review request after order delivery
     */
    public function sendReviewRequest(Order $order): bool
    {
        try {
            if ($order->user) {
                Mail::to($order->user->email)->send(new \App\Mail\ReviewRequest($order));
                
                Log::info('Review request sent', ['order_id' => $order->id]);
                return true;
            }
            
            return false;
        } catch (\Exception $e) {
            Log::error('Failed to send review request', [
                'order_id' => $order->id,
                'error' => $e->getMessage()
            ]);
            return false;
        }
    }

    /**
     * Send back in stock notification
     */
    public function sendBackInStockNotification(Product $product): int
    {
        $successCount = 0;
        
        try {
            // Send to users who have this product in their wishlist
            $users = User::whereHas('wishlist', function ($query) use ($product) {
                $query->where('product_id', $product->id);
            })->where('email_notifications', true)->get();
            
            foreach ($users as $user) {
                try {
                    Mail::to($user->email)->send(new \App\Mail\BackInStockNotification($user, $product));
                    $successCount++;
                } catch (\Exception $e) {
                    Log::error('Failed to send back in stock notification', [
                        'user_id' => $user->id,
                        'product_id' => $product->id,
                        'error' => $e->getMessage()
                    ]);
                }
            }
            
            Log::info('Back in stock notifications sent', [
                'product_id' => $product->id,
                'successful' => $successCount
            ]);
            
            return $successCount;
        } catch (\Exception $e) {
            Log::error('Failed to send back in stock notifications', [
                'product_id' => $product->id,
                'error' => $e->getMessage()
            ]);
            return $successCount;
        }
    }

    /**
     * Send bulk email to user segment
     */
    public function sendBulkEmail(array $criteria, string $subject, string $content): array
    {
        $results = [
            'total' => 0,
            'sent' => 0,
            'failed' => 0
        ];
        
        try {
            $query = User::where('email_notifications', true);
            
            // Apply criteria
            if (isset($criteria['registered_after'])) {
                $query->where('created_at', '>=', $criteria['registered_after']);
            }
            
            if (isset($criteria['total_orders_min'])) {
                $query->whereHas('orders', function ($q) use ($criteria) {
                    $q->havingRaw('COUNT(*) >= ?', [$criteria['total_orders_min']]);
                });
            }
            
            if (isset($criteria['total_spent_min'])) {
                $query->whereHas('orders', function ($q) use ($criteria) {
                    $q->havingRaw('SUM(total_amount) >= ?', [$criteria['total_spent_min']]);
                });
            }
            
            $users = $query->get();
            $results['total'] = $users->count();
            
            foreach ($users as $user) {
                try {
                    Mail::to($user->email)->send(new \App\Mail\BulkEmail($user, $subject, $content));
                    $results['sent']++;
                } catch (\Exception $e) {
                    $results['failed']++;
                    Log::error('Failed to send bulk email', [
                        'user_id' => $user->id,
                        'error' => $e->getMessage()
                    ]);
                }
            }
            
            Log::info('Bulk email campaign completed', $results);
            
            return $results;
        } catch (\Exception $e) {
            Log::error('Failed to send bulk emails', [
                'error' => $e->getMessage()
            ]);
            return $results;
        }
    }
}
