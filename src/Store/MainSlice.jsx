import {createSlice} from '@reduxjs/toolkit'
import { mainApi } from '../API/MainApi'

const initialState = {
    main: []
    // chosenProduct: {}
}

const mainSlice = createSlice({
    name: 'main',
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(
            mainApi.endpoints.getProducts.matchFulfilled,
            (state, {payload}) => {
                state.main = payload
            }
        )
    }

})

// export const {} = mainSlice.actions
export default mainSlice.reducer