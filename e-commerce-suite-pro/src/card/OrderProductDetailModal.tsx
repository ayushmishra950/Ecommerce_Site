"use client";

import React, { useState } from "react";
import {
    Package,
    Truck,
    CheckCircle2,
    XCircle,
    RotateCcw,
    Download,
    MapPin,
    CreditCard,
    Calendar,
    ShoppingBag,
    Star,
    ChevronRight,
    Printer,
    Box,
    ExternalLink,
    AlertCircle,
    Info
} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export interface OrderProduct {
    id: string;
    productName: string;
    brand: string;
    image: string;
    description: string;
    price: number;
    quantity: number;
    orderId: string;
    orderDate: string;
    status: "placed" | "shipped" | "delivered" | "cancelled";
    paymentMethod: string;
    address: string;
    city?: string;
    zipCode?: string;
    deliveryDate: string;
    trackingNumber: string;
    discount: number;
    shipping: number;
    tax: number;
}

interface OrderProductDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    data?: OrderProduct;
}

const dummyData: OrderProduct = {
    id: "p1",
    productName: "Wireless Bluetooth Headphones",
    brand: "Boat",
    image: "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd",
    description: "High quality wireless headphones with noise cancellation and long battery life.",
    price: 1999,
    quantity: 1,
    orderId: "ORD12345678",
    orderDate: "05 March 2026",
    status: "shipped",
    paymentMethod: "UPI",
    address: "221B Baker Street, London, UK",
    city: "London",
    zipCode: "NW1 6XE",
    deliveryDate: "12 March 2026",
    trackingNumber: "TRK99887766",
    discount: 200,
    shipping: 50,
    tax: 90,
};

const OrderProductDetailModal: React.FC<OrderProductDetailModalProps> = ({
    isOpen,
    onClose,
    data = dummyData
}) => {
    const [isCancelling, setIsCancelling] = useState(false);

    const subtotal = data.price * data.quantity;
    const total = subtotal - data.discount + data.shipping + data.tax;

    const statusSteps = [
        { label: "Placed", icon: ShoppingBag, color: "text-blue-500", bgColor: "bg-blue-500" },
        { label: "Shipped", icon: Package, color: "text-orange-500", bgColor: "bg-orange-500" },
        { label: "Out for Delivery", icon: Truck, color: "text-purple-500", bgColor: "bg-purple-500" },
        { label: "Delivered", icon: CheckCircle2, color: "text-green-500", bgColor: "bg-green-500" },
    ];

    const currentStepIndex = statusSteps.findIndex(
        step => step.label.toLowerCase() === data.status.toLowerCase()
    ) !== -1 ? statusSteps.findIndex(
        step => step.label.toLowerCase() === data.status.toLowerCase()
    ) : data.status === "placed" ? 0 : data.status === "shipped" ? 1 : data.status === "delivered" ? 3 : 0;

    const handleCancelOrder = async () => {
        setIsCancelling(true);
        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        toast.success("Order cancellation request submitted successfully.");
        setIsCancelling(false);
    };

    const handleDownloadInvoice = () => {
        toast.info("Preparing your invoice for download...");
        // Mock download
    };

    const getStatusBadge = (status: string) => {
        switch (status.toLowerCase()) {
            case "placed": return <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200">Order Placed</Badge>;
            case "shipped": return <Badge variant="secondary" className="bg-orange-100 text-orange-700 hover:bg-orange-200">Shipped</Badge>;
            case "delivered": return <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-200">Delivered</Badge>;
            case "cancelled": return <Badge variant="destructive">Cancelled</Badge>;
            default: return <Badge variant="outline">{status}</Badge>;
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className=" flex flex-col w-[95vw] sm:w-[90vw] max-h-[95vh] md:max-w-4xl p-0 overflow-hidden bg-zinc-50 dark:bg-zinc-950 border-none rounded-xl sm:rounded-2xl shadow-2xl transition-all">
                <DialogHeader className="p-4 sm:p-6 bg-white dark:bg-zinc-900 border-b">
                    <div className="flex items-center justify-between gap-2 sm:gap-4">
                        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                            <div className="hidden sm:block p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-zinc-600 dark:text-zinc-400 shrink-0">
                                <Box size={20} />
                            </div>
                            <div className="min-w-0">
                                <DialogTitle className="text-lg sm:text-xl font-bold text-zinc-800 dark:text-zinc-100 truncate">
                                    Product Order Details
                                </DialogTitle>
                                <p className="text-[10px] sm:text-sm text-zinc-500 dark:text-zinc-400 truncate">
                                    ID: <span className="font-mono font-medium">{data.orderId}</span>
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                            <div className="hidden xs:block">
                                {getStatusBadge(data.status)}
                            </div>

                        </div>
                    </div>
                    <div className="xs:hidden mt-2">
                        {getStatusBadge(data.status)}
                    </div>
                </DialogHeader>

                <ScrollArea className="flex-1 overflow-y-auto">
                    <div className="p-4 sm:p-6 space-y-6 sm:space-y-8 pb-100">
                        {/* Status Stepper */}
                        {data.status !== "cancelled" && (
                            <div className="bg-white dark:bg-zinc-900 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm transition-all">
                                <h3 className="text-[10px] sm:text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-4 sm:mb-6 flex items-center gap-2">
                                    <Truck size={14} className="sm:w-4 sm:h-4" /> Order Tracking
                                </h3>
                                <div className="relative flex justify-between">
                                    {statusSteps.map((step, idx) => {
                                        const Icon = step.icon;
                                        const isCompleted = idx <= currentStepIndex;
                                        const isCurrent = idx === currentStepIndex;

                                        return (
                                            <div key={idx} className="flex flex-col items-center relative z-10 w-1/4">
                                                <div className={cn(
                                                    "w-7 h-7 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-500",
                                                    isCompleted ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black shadow-lg scale-105 sm:scale-110" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400"
                                                )}>
                                                    <Icon className="w-3.5 h-3.5 sm:w-[18px] sm:h-[18px]" />
                                                </div>
                                                <div className="mt-2 text-center px-1">
                                                    <p className={cn(
                                                        "text-[8px] sm:text-xs font-bold leading-tight",
                                                        isCompleted ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-400"
                                                    )}>{step.label}</p>
                                                    {isCurrent && (
                                                        <p className="text-[7px] sm:text-[10px] text-zinc-500 mt-0.5 animate-pulse hidden xs:block">In Progress</p>
                                                    )}
                                                </div>
                                                {idx < statusSteps.length - 1 && (
                                                    <div className={cn(
                                                        "absolute h-[1px] sm:h-[2px] w-full top-[14px] sm:top-5 left-1/2 -z-10",
                                                        idx < currentStepIndex ? "bg-zinc-900 dark:bg-zinc-100" : "bg-zinc-200 dark:bg-zinc-800"
                                                    )} />
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {data.status === "cancelled" && (
                            <div className="bg-red-50 dark:bg-red-900/10 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-red-100 dark:border-red-900/20 flex flex-col xs:flex-row items-center gap-3 sm:gap-4">
                                <div className="p-3 bg-red-100 dark:bg-red-900/20 text-red-600 rounded-xl shrink-0">
                                    <AlertCircle size={24} />
                                </div>
                                <div className="text-center xs:text-left">
                                    <h3 className="font-bold text-red-800 dark:text-red-400">Order Cancelled</h3>
                                    <p className="text-xs sm:text-sm text-red-600/80 dark:text-red-400/60 leading-snug">This order was cancelled on {data.deliveryDate}. If you have any questions, please contact support.</p>
                                </div>
                            </div>
                        )}

                        {/* Product Detail Card */}
                        <div className="flex flex-col md:flex-row gap-6 sm:gap-8">
                            <div className="w-full md:w-1/3 max-h-[300px] md:max-h-none aspect-square rounded-xl sm:rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-inner group shrink-0">
                                <img
                                    src={data.image}
                                    alt={data.productName}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>

                            <div className="flex-1 space-y-4 sm:space-y-4">
                                <div>
                                    <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-1 leading-tight">
                                        {data.productName}
                                    </h2>
                                    <div className="flex flex-wrap items-center gap-2 text-zinc-500 dark:text-zinc-400">
                                        <Badge variant="outline" className="font-semibold px-2 py-0 h-5 text-[10px] sm:text-xs tracking-tight">{data.brand}</Badge>
                                        <span className="w-1 h-1 bg-zinc-300 rounded-full" />
                                        <span className="text-xs sm:text-sm">Quantity: {data.quantity}</span>
                                    </div>
                                </div>

                                <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed">
                                    {data.description}
                                </p>

                                <div className="flex items-baseline gap-2 pt-1">
                                    <span className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">₹{data.price}</span>
                                    <span className="text-zinc-400 dark:text-zinc-500 line-through text-xs sm:text-sm">₹{data.price + data.discount}</span>
                                </div>

                                <div className="flex flex-wrap sm:flex-nowrap gap-2 sm:gap-3 pt-2 sm:pt-4">
                                    <Button className="flex-1 min-w-[120px] bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-black rounded-xl h-10 sm:h-11 text-xs sm:text-sm">
                                        Buy Again
                                    </Button>
                                    <Button variant="outline" className="flex-1 min-w-[120px] border-zinc-200 dark:border-zinc-800 rounded-xl h-10 sm:h-11 flex items-center gap-2 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-xs sm:text-sm">
                                        <Star size={14} className="text-yellow-500 fill-yellow-500 sm:w-4 sm:h-4" />
                                        Write Review
                                    </Button>
                                    <Button variant="ghost" size="icon" className="rounded-xl h-10 w-10 sm:h-11 sm:w-11 border border-zinc-200 dark:border-zinc-800 shrink-0">
                                        <Info size={16} className="sm:w-18 sm:h-18" />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <Separator className="bg-zinc-200 dark:bg-zinc-800" />

                        {/* Details Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            <div className="bg-white dark:bg-zinc-900 p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-zinc-100 dark:border-zinc-800/50 shadow-sm">
                                <h4 className="text-[10px] sm:text-xs font-bold text-zinc-400 uppercase mb-3 sm:mb-4 flex items-center gap-2">
                                    <MapPin size={12} className="sm:w-14 sm:h-14" /> Shipping Information
                                </h4>
                                <div className="space-y-1">
                                    <p className="text-xs sm:text-sm font-semibold text-zinc-800 dark:text-zinc-200">Delivery Address</p>
                                    <p className="text-[11px] sm:text-xs text-zinc-500 leading-relaxed">
                                        {data.address}, {data.city}<br />
                                        {data.zipCode}
                                    </p>
                                </div>
                                <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-zinc-50 dark:border-zinc-800/50">
                                    <p className="text-xs sm:text-sm font-semibold text-zinc-800 dark:text-zinc-200">Expected Delivery</p>
                                    <p className="text-[11px] sm:text-xs text-zinc-500">{data.deliveryDate}</p>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-zinc-900 p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-zinc-100 dark:border-zinc-800/50 shadow-sm">
                                <h4 className="text-[10px] sm:text-xs font-bold text-zinc-400 uppercase mb-3 sm:mb-4 flex items-center gap-2">
                                    <CreditCard size={12} className="sm:w-14 sm:h-14" /> Payment & Order Info
                                </h4>
                                <div className="space-y-2.5 sm:space-y-3 font-medium">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[11px] sm:text-xs text-zinc-500">Payment</span>
                                        <Badge variant="outline" className="text-[9px] sm:text-[10px] px-1.5 py-0 h-5 font-bold uppercase">{data.paymentMethod}</Badge>
                                    </div>
                                    <div className="flex justify-between items-center text-[11px] sm:text-xs">
                                        <span className="text-zinc-500 font-normal">Order Date</span>
                                        <span className="text-zinc-800 dark:text-zinc-300">{data.orderDate}</span>
                                    </div>
                                    {data.trackingNumber && (
                                        <div className="flex justify-between items-center text-[11px] sm:text-xs">
                                            <span className="text-zinc-500 font-normal">Tracking #</span>
                                            <span className="font-mono text-zinc-800 dark:text-zinc-300">{data.trackingNumber}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="bg-white dark:bg-zinc-900 p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-zinc-100 dark:border-zinc-800/50 shadow-sm sm:col-span-2 lg:col-span-1">
                                <h4 className="text-[10px] sm:text-xs font-bold text-zinc-400 uppercase mb-3 sm:mb-4 flex items-center gap-2">
                                    <ShoppingBag size={12} className="sm:w-14 sm:h-14" /> Price Breakdown
                                </h4>
                                <div className="space-y-2.5 sm:space-y-3 text-[11px] sm:text-sm">
                                    <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                                        <span>Subtotal</span>
                                        <span>₹{subtotal}</span>
                                    </div>
                                    <div className="flex justify-between text-green-600 font-medium">
                                        <span>Discount</span>
                                        <span>-₹{data.discount}</span>
                                    </div>
                                    <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                                        <span>Tax</span>
                                        <span>₹{data.tax}</span>
                                    </div>
                                    <div className="flex justify-between text-zinc-600 dark:text-zinc-400 pb-1.5 sm:pb-2">
                                        <span>Shipping</span>
                                        <span>₹{data.shipping}</span>
                                    </div>
                                    <Separator className="bg-zinc-100 dark:bg-zinc-800" />
                                    <div className="flex justify-between font-bold text-zinc-900 dark:text-white pt-1 text-sm sm:text-lg">
                                        <span>Total</span>
                                        <span>₹{total}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                   
                </ScrollArea>
                <DialogFooter >
        
                     <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-2">
  <Button
    variant="outline"
    className="m-1"
    onClick={handleDownloadInvoice}
  >
    <Download size={14}/> Invoice
  </Button>

  <Button
    variant="outline"
    className="m-1"
  >
    <Printer size={14}/> Print
  </Button>

  {data.status !== "cancelled" && data.status !== "delivered" && (
    <Button
      variant="destructive"
      className="m-1"
      onClick={handleCancelOrder}
      disabled={isCancelling}
    >
      {isCancelling ? "Processing..." : "Cancel Order"}
    </Button>
  )}

  {data.status === "delivered" && (
    <Button
      variant="secondary"
      className="m-1"
    >
      <RotateCcw size={14}/> Return
    </Button>
  )}
</div>
                </DialogFooter>


            </DialogContent>
        </Dialog>

    );
};

export default OrderProductDetailModal;
