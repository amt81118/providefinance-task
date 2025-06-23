



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
      state.products = [action.payload, ...state.products];
    },
    emptyCart: (state:any) => {
      state.products = [];
    },
  },
});

export const { addProduct, emptyCart } = cartSlice.actions;

export default cartSlice.reducer;
