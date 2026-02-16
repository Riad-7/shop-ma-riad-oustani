import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
  },

  reducers: {
    addToCart: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload.id);

      if (item) {
        item.quantity++;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
        state.totalPrice += action.payload.price;
      }
    },

    removeFromCart: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);

      if (item) {
        state.totalPrice -= item.price * item.quantity;
        state.items = state.items.filter((i) => i.id !== action.payload);
      }
    },

    increment: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      item.quantity++;
      state.totalQuantity++;
      state.totalPrice += item.price;
    },

    decrement: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item.quantity > 1) {
        item.quantity--;
        state.totalQuantity--;
        state.totalPrice -= item.price;
      }
    },
    
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart, increment, decrement } =
  cartSlice.actions;
export default cartSlice.reducer;
