import  productsReducer from "../features/products/productsSlice";
import cartReducer from "../features/cart/cartSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        products: productsReducer,
        cart: cartReducer
    }
})

export default store;