import React from "react";
import Cart from "./Cart";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

function Checkout() {
  const productsInCart = useSelector((state: RootState) => state.cart.products);

  return (
    <Cart
      products={productsInCart}
      text="Click Confirm Order to place your order"
      mode="confirm"
    ></Cart>
  );
}

export default Checkout;