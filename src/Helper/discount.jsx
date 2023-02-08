export function discount(price, discountPercent) {
    const result = Math.trunc(price - (price / 100 * discountPercent))
    return result
}