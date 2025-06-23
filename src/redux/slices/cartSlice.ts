



import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../Products";

export interface CartState {
  products: Product[];
}

const initialState: CartState = {
  products: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
     addProduct: (state, action: PayloadAction<Product>) => {
      const productIndex = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      if (productIndex == -1) {
        state.products = [action.payload, ...state.products];
      } else {
		state.products[productIndex].quantity += 1;
      }
    },
    emptyCart: (state:any) => {
      state.products = [];
    },
  },
});

export const { addProduct, emptyCart } = cartSlice.actions;

export default cartSlice.reducer;
