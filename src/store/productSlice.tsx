import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {STATUS} from '../utils/status';
import {URL} from '../utils/apiURL'
import { RootState } from ".";


export type ProductType = {
    id: number;
    title: string;
    thumbnail: string;
    brand: string;
    rating: number;
    price: number;
    discountPercentage: number;
}

interface IProduct {
    products: ProductType[],
    productsStatus: STATUS,
    product: ProductType,
    productStatus: STATUS,
    suggestProducts: ProductType[],
    suggestStatus: STATUS
}

const initialState: IProduct = {
    products: [],
    productsStatus: STATUS.IDLE,
    product: {} as ProductType,
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
        .addCase(fetchProducts.fulfilled, (state, {payload}: PayloadAction<ProductType[]>) => {
            state.products = payload
            state.productsStatus = STATUS.SUCCEEDED
        })
        .addCase(fetchProducts.rejected, (state) => {
            state.productsStatus = STATUS.FAILED
        })


        .addCase(fetchProduct.pending, (state) => {
            state.productStatus = STATUS.LOADING
        })
        .addCase(fetchProduct.fulfilled, (state, {payload}: PayloadAction<ProductType>) => {
            state.product = payload
            state.productStatus = STATUS.SUCCEEDED
        })
        .addCase(fetchProduct.rejected, (state) => {
            state.productStatus = STATUS.FAILED
        })


        .addCase(fetchSuggest.pending, (state) => {
            state.suggestStatus = STATUS.LOADING
        })
        .addCase(fetchSuggest.fulfilled, (state, {payload}: PayloadAction<ProductType[]>) => {
            state.suggestProducts = payload
            state.suggestStatus = STATUS.SUCCEEDED
        })
        .addCase(fetchSuggest.rejected, (state) => {
            state.suggestStatus = STATUS.FAILED
        })
    }
})


export const fetchProducts = createAsyncThunk<ProductType[], number>('product/fetchProducts', async(limit) => {
    const res = await fetch(`${URL}products?limit=${limit}`);
    const dataJson = await res.json()
    const data: ProductType[] = dataJson.products

    return data
})

export const fetchProduct = createAsyncThunk<ProductType, number>('product/fetchProduct', async(id) => {
    const res = await fetch(`${URL}products/${id}`);
    const data: ProductType = await res.json();

    return data
})

export const fetchSuggest = createAsyncThunk<ProductType[], string>('product/fetchSuggest', async(category) => {
    const res = await fetch(`${URL}products/category/${category}`);
    const dataJson = await res.json()
    const data: ProductType[] = dataJson.products

    return data
})

export const getProduct = (state: RootState) => state.product.product;
export const getProducts = (state: RootState) => state.product.products;
export const getProductStatus = (state: RootState) => state.product.productStatus;
export const getProductsStatus = (state: RootState) => state.product.productsStatus;
export const getSuggestProducts = (state: RootState) => state.product.suggestProducts;
export const getSuggestStatus = (state: RootState) => state.product.suggestStatus;
export default productSlice.reducer