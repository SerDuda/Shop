import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {STATUS} from '../utils/status';
import {URL} from '../utils/apiURL'

const initialState = {
    products: [],
    productsStatus: STATUS.IDLE,
    product: [],
    productStatus: STATUS.IDLE,
    suggestProducts: [],
    suggestStatus: STATUS.IDLE
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchProducts.pending, (state) => {
                state.productsStatus = STATUS.LOADING
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
            state.products = action.payload
            state.productsStatus = STATUS.SUCCEEDED
        })
        .addCase(fetchProducts.rejected, (state) => {
            state.productsStatus = STATUS.FAILED
        })


        .addCase(fetchProduct.pending, (state) => {
            state.productStatus = STATUS.LOADING
        })
        .addCase(fetchProduct.fulfilled, (state, action) => {
            state.product = action.payload
            state.productStatus = STATUS.SUCCEEDED
        })
        .addCase(fetchProduct.rejected, (state) => {
            state.productStatus = STATUS.FAILED
        })


        .addCase(fetchSuggest.pending, (state) => {
            state.suggestStatus = STATUS.LOADING
        })
        .addCase(fetchSuggest.fulfilled, (state, action) => {
            state.suggestProducts = action.payload
            state.suggestStatus = STATUS.SUCCEEDED
        })
        .addCase(fetchSuggest.rejected, (state) => {
            state.suggestStatus = STATUS.FAILED
        })
    }
})


export const fetchProducts = createAsyncThunk('product/fetchProducts', async(limit) => {
    const res = await fetch(`${URL}products?limit=${limit}`);
    const data = await res.json();

    return data.products
})

export const fetchProduct = createAsyncThunk('product/fetchProduct', async(id) => {
    const res = await fetch(`${URL}products/${id}`);
    const data = await res.json();

    return data
})

export const fetchSuggest = createAsyncThunk('product/fetchSuggest', async(category) => {
    const res = await fetch(`${URL}products/category/${category}`);
    const data = await res.json();

    return data.products
})

export const getProduct = (state) => state.product.product;
export const getProducts = (state) => state.product.products;
export const getProductStatus = (state) => state.product.productStatus;
export const getProductsStatus = (state) => state.product.productsStatus;
export const getSuggestProducts = (state) => state.product.suggestProducts;
export const getSuggestStatus = (state) => state.product.suggestStatus;
export default productSlice.reducer