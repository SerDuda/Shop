import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'


export const mainApi = createApi({
    reducerPath: 'mainApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://dummyjson.com'}),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => `/products`,
            transformResponse: (response) => {
                return response.products
            },
            providesTags: ['Products']
        }),
        getAllSmartphones: builder.query({
            query: () => '/products/category/smartphones',
            transformResponse: (response) => {
                return response.products.sort((a, b) => b.rating - a.rating)
            }
        }),
        getAllLaptops: builder.query({
            query: () => '/products/category/laptops',
            transformResponse: (response) => {
                return response.products.sort((a, b) => b.rating - a.rating)
            }
        })

    })
})

export const {useGetProductsQuery, useGetAllSmartphonesQuery, useGetAllLaptopsQuery} = mainApi
export default mainApi

