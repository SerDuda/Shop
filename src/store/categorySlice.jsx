import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../utils/status";
import { URL } from "../utils/apiURL";

const initialState = {
    category: [],
    allCategories: [],
    categoryStatus: STATUS.IDLE,
    allCategoriesStatus: STATUS.IDLE
}

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchCategory.pending, (state) => {
            state.categoryStatus = STATUS.LOADING
        })
        .addCase(fetchCategory.fulfilled, (state, action) => {
            state.category = action.payload
            state.categoryStatus = STATUS.SUCCEEDED
        })
        .addCase(fetchCategory.rejected, (state) => {
            state.categoryStatus = STATUS.FAILED
        })


        .addCase(fetchAllCategories.pending, (state) => {
            state.allCategoriesStatus = STATUS.LOADING
        })
        .addCase(fetchAllCategories.fulfilled, (state, action) => {
            state.allCategories = action.payload
            state.allCategoriesStatus = STATUS.SUCCEEDED
        })
        .addCase(fetchAllCategories.rejected, (state) => {
            state.allCategoriesStatus = STATUS.FAILED
        })
    }
})

export const fetchCategory = createAsyncThunk('category/fetchCategory', async(category) => {
    const res = await fetch(`${URL}products/category/${category}`)
    const data = await res.json()

    return data.products
})

export const fetchAllCategories = createAsyncThunk('category/fetchAllCategories', async() => {
    const res = await fetch(`${URL}products`)
    const data = await res.json()

    return data.products
})

export default categorySlice.reducer

