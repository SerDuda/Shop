import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type CartType = {
    id: number;
    title: string;
    thumbnail: string;
    price: number;
    quantity: number;
    totalPrice: number;
    discountPrice: number;
    stock: number;
    type?: string;
}

interface IStateCart {
    // carts: () => {},
    carts: CartType[],
    itemsCount: number,
    totalAmount: number,
    isModal: boolean
}

const fetchFromLocalStorage = () => {
    const cart = localStorage.getItem('cart');
    if(!cart) return [];
    
    return JSON.parse(cart);
}

const storeInLocalStorage = (data: CartType[]) => {
    localStorage.setItem('cart', JSON.stringify(data));
}

const initialState: IStateCart = {
    carts: fetchFromLocalStorage(),
    itemsCount: 0,
    totalAmount: 0,
    isModal: false
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, {payload}: PayloadAction<CartType>) => {
            const isItemInCart = state.carts.find(item => item.id === payload.id)

            if (isItemInCart) {
                const newCart = state.carts.map(item => {
                    if (item.id === payload.id) {
                        let newQty = item.quantity + payload.quantity;
                        let newTotalPrice = newQty * item.price;

                        return { ...item, quantity: newQty, totalPrice: newTotalPrice }
                    } else {
                        return item
                    }
                })

                state.carts = newCart;
                storeInLocalStorage(state.carts)
            } else {
                state.carts.push(payload);
                storeInLocalStorage(state.carts)
            }
        },
        removeCart: (state, {payload}: PayloadAction<CartType>) => {
            const newCartLength = state.carts.filter(item => item.id !== payload.id)
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
        toggleCartQty: (state, {payload}: PayloadAction<CartType>) => {
            const countItem = state.carts.map(item => {
                if(item.id === payload.id) {
                    let qty = item.quantity;
                    let newTotalPrice = item.totalPrice

                    if(payload.type === 'DEC') {
                        qty--;
                        if(qty < 1) qty = 1;
                        newTotalPrice = qty * item.discountPrice
                    }

                    if(payload.type === 'INC') {
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