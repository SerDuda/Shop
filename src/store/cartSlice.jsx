import { createSlice } from "@reduxjs/toolkit";

const fetchFromLocalStorage = () => {
    const cart = localStorage.getItem('cart');
    if(!cart) return [];
    
    return JSON.parse(cart);
}

const storeInLocalStorage = (data) => {
    localStorage.setItem('cart', JSON.stringify(data));
}

const initialState = {
    carts: fetchFromLocalStorage(),
    itemsCount: 0,
    totalAmount: 0,
    isModal: false
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const isItemInCart = state.carts.find(item => item.id === action.payload.id)

            if (isItemInCart) {
                const newCart = state.carts.map(item => {
                    if (item.id === action.payload.id) {
                        let newQty = item.quantity + action.payload.quantity;
                        let newTotalPrice = newQty * item.price;

                        return { ...item, quantity: newQty, totalPrice: newTotalPrice }
                    } else {
                        return item
                    }
                })

                state.carts = newCart;
                storeInLocalStorage(state.carts)
            } else {
                state.carts.push(action.payload);
                storeInLocalStorage(state.carts)
            }
        },
        removeCart: (state, action) => {
            const newCartLength = state.carts.filter(item => item.id !== action.payload.id)
            state.carts = newCartLength
            storeInLocalStorage(state.carts)
        },
        clearCart: (state) => {
            state.carts = [];
            storeInLocalStorage(state.carts)
        },
        getCartTotal: (state) => {
            state.totalAmount = state.carts.reduce((total, cart) => {
                return total += cart.totalPrice
            }, 0)

            state.itemsCount = state.carts.length
        },
        toggleCartQty: (state, action) => {
            const countItem = state.carts.map(item => {
                if(item.id === action.payload.id) {
                    let qty = item.quantity;
                    let newTotalPrice = item.totalPrice

                    if(action.payload.type === 'DEC') {
                        qty--;
                        if(qty < 1) qty = 1;
                        newTotalPrice = qty * item.discountPrice
                    }

                    if(action.payload.type === 'INC') {
                        qty++;
                        if(qty === item.stock) qty = item.stock;
                        newTotalPrice = qty * item.discountPrice
                    }
                    return {...item, totalPrice: newTotalPrice, quantity: qty}
                } else {
                    return item
                }
            })
            state.carts = countItem;
            storeInLocalStorage(state.carts)
        },
        isModalCartOn: (state) => {
            state.isModal = true
        },
        isModalCartOff: (state) => {
            state.isModal = false
        }

    }
})

export const {addToCart, removeCart, toggleCartQty, clearCart, getCartTotal, isModalCartOff, isModalCartOn} = cartSlice.actions
export default cartSlice.reducer