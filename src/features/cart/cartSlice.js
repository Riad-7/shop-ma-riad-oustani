import { createSlice } from "@reduxjs/toolkit";

const getItemId = (item) => item._id;

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
  },

  reducers: {
    addToCart: (state, action) => {
      const incomingItem = action.payload;
      const itemId = getItemId(incomingItem);
      const item = state.items.find((i) => getItemId(i) === itemId);

      if (item) {
        item.quantity++;
      } else {
        state.items.push({ ...incomingItem, quantity: 1 });
      }

      state.totalQuantity++;
      state.totalPrice += incomingItem.price;
    },

    removeFromCart: (state, action) => {
      const item = state.items.find((i) => getItemId(i) === action.payload);

      if (item) {
        state.totalQuantity -= item.quantity;
        state.totalPrice -= item.price * item.quantity;
        state.items = state.items.filter((i) => getItemId(i) !== action.payload);
      }
    },

    increment: (state, action) => {
      const item = state.items.find((i) => getItemId(i) === action.payload);
      if (!item) return;

      item.quantity++;
      state.totalQuantity++;
      state.totalPrice += item.price;
    },

    decrement: (state, action) => {
      const item = state.items.find((i) => getItemId(i) === action.payload);
      if (!item) return;

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
