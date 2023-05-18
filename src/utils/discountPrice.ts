import { ProductType } from "../store/productSlice"

export const discountedPrice = (obj: ProductType) => {
    let result = (obj.price - (obj.price / 100) * obj.discountPercentage ) 
    return result.toFixed(2)
}