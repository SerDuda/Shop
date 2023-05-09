import { configureStore } from "@reduxjs/toolkit";
import productsReducer from '../store/productSlice'
import cartReducer from '../store/cartSlice';
import categoryReducer from '../store/categorySlice'

const store = configureStore({
    reducer: {
        product: productsReducer,
        cart: cartReducer,
        category: categoryReducer
    }
})

export default store