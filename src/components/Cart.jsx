import React from 'react';
import CartProduct from './CartProduct';
import { useSelector } from 'react-redux';

const Cart = ({id}) => {
    const {cart} = useSelector(state => state.cart)
    return (
        <>
            <section className="py-5">
                <div className="container px-4 px-lg-5 mt-5">
                    <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                        <CartProduct key={id}/>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Cart;
