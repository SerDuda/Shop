import { ProductTypeItem } from "../pages/ProductPage/ProductPage"

export const discountedPrice = (obj: ProductTypeItem) => {
    let result = (obj.price - (obj.price / 100) * obj.discountPercentage ) 
    return result.toFixed(2)
}