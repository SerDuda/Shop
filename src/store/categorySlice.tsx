import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../utils/status";
import { URL } from "../utils/apiURL";
import { ProductType } from "./productSlice";

interface IStateCategory {
    category: ProductType[],
    allCategories: ProductType[],
    categoryStatus: STATUS,
    allCategoriesStatus: STATUS
}

const initialState: IStateCategory = {
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
        .addCase(fetchCategory.fulfilled, (state, {payload}: PayloadAction<ProductType[]>) => {
            state.category = payload
            state.categoryStatus = STATUS.SUCCEEDED
        })
        .addCase(fetchCategory.rejected, (state) => {
            state.categoryStatus = STATUS.FAILED
        })


        .addCase(fetchAllCategories.pending, (state) => {
            state.allCategoriesStatus = STATUS.LOADING
        })
        .addCase(fetchAllCategories.fulfilled, (state, {payload}: PayloadAction<ProductType[]>) => {
            state.allCategories = payload
            state.allCategoriesStatus = STATUS.SUCCEEDED
        })
        .addCase(fetchAllCategories.rejected, (state) => {
            state.allCategoriesStatus = STATUS.FAILED
        })
    }
})

export const fetchCategory = createAsyncThunk<ProductType[], string>('category/fetchCategory', async(category) => {
    const res = await fetch(`${URL}products/category/${category}`)
    const dataJson = await res.json()
    const data: ProductType[] = dataJson.products

    return data
})

export const fetchAllCategories = createAsyncThunk<ProductType[]>('category/fetchAllCategories', async() => {
    const res = await fetch(`${URL}products`)
    const dataJson = await res.json()
    const data: ProductType[] = dataJson.products

    return data
})

export default categorySlice.reducer

