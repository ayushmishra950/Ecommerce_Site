import React from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

const OrderSuccess: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();

  return (
    <div className="container mx-auto py-16 text-center">
      <h1 className="text-4xl font-bold text-green-600 mb-4">Thank You!</h1>
      <p className="text-lg mb-6">Your order <span className="font-semibold">{orderId}</span> has been placed successfully.</p>
      
      <div className="space-y-4">
        <Link to="/" className="block">
          <Button>Continue Shopping</Button>
        </Link>
        <Link to="/orders" className="block">
          <Button variant="outline">View My Orders</Button>
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
