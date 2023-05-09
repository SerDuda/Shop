export const discountedPrice = (obj) => {
    let result = (obj.price - (obj.price / 100) * obj.discountPercentage ) 
    return result.toFixed(2)
}