import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux-toolkit/store";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";

interface ShippingAddress {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

const Checkout = () => {
  const navigate = useNavigate();
  const items = useSelector((state: RootState) => state.cart.items);

  const [shipping, setShipping] = useState<ShippingAddress>({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  // 🔹 Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShipping({
      ...shipping,
      [e.target.name]: e.target.value,
    });
  };

  // 🔹 Price Calculation
  const subtotal = items.reduce(
    (sum, item) => sum + item.totalPrice,
    0
  );

  const shippingCost = subtotal > 1000 ? 0 : 99;
  const tax = subtotal * 0.08;
  const grandTotal = subtotal + shippingCost + tax;

  // 🔹 Place Order
  const handlePlaceOrder = () => {
    if (
      !shipping.fullName ||
      !shipping.phone ||
      !shipping.address ||
      !shipping.city
    ) {
      alert("Please fill all required fields");
      return;
    }

    console.log("Shipping Data:", shipping);
    console.log("Order Items:", items);

    alert("Order Placed Successfully!");
    navigate("/");
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold mb-4">
          No items to checkout
        </h2>
        <Button onClick={() => navigate("/products")}>
          Go Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        Checkout
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* 🔹 Left Section */}
        <div className="lg:col-span-2 space-y-6">

          {/* Shipping Address */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-semibold">
                Shipping Address
              </h2>

              <Input
                name="fullName"
                placeholder="Full Name"
                value={shipping.fullName}
                onChange={handleChange}
              />

              <Input
                name="phone"
                placeholder="Phone Number"
                value={shipping.phone}
                onChange={handleChange}
              />

              <Input
                name="address"
                placeholder="Street Address"
                value={shipping.address}
                onChange={handleChange}
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  name="city"
                  placeholder="City"
                  value={shipping.city}
                  onChange={handleChange}
                />
                <Input
                  name="state"
                  placeholder="State"
                  value={shipping.state}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  name="postalCode"
                  placeholder="Postal Code"
                  value={shipping.postalCode}
                  onChange={handleChange}
                />
                <Input
                  name="country"
                  placeholder="Country"
                  value={shipping.country}
                  onChange={handleChange}
                />
              </div>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-semibold">
                Order Items
              </h2>

              {items.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between"
                >
                  <div>
                    {item.name} × {item.quantity}
                  </div>
                  <div>
                    ₹{item.totalPrice.toFixed(2)}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* 🔹 Right Section - Summary */}
        <div>
          <Card className="sticky top-24">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-semibold">
                Order Summary
              </h2>

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {shippingCost === 0
                    ? "Free"
                    : `₹${shippingCost}`}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Tax</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>

              <Separator />

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>₹{grandTotal.toFixed(2)}</span>
              </div>

              <Button
                className="w-full"
                size="lg"
                onClick={handlePlaceOrder}
              >
                Place Order
              </Button>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default Checkout;
