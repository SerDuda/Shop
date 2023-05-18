import React from 'react';
import styles from './CartPage.module.scss';
import { useSelector } from 'react-redux';
import { formatPrice } from '../../utils/helpers';
import { clearCart, toggleCartQty, removeCart } from '../../store/cartSlice';
import { Link } from 'react-router-dom';
import emptyCart from '../../assets/images/empty_cart.png'
import { RootState, useAppDispatch } from '../../store';
import { CartType } from '../../store/cartSlice';

const CartPage: React.FC = () => {
    const dispatch = useAppDispatch()
    const { totalAmount } = useSelector((state: RootState) => state.cart)
    const carts = useSelector((state: RootState) => state.cart.carts)

    if (carts.length === 0) {
        return (
            <div className={styles.emptycart}>
                <div className={styles.container__empty}>
                    <img src={emptyCart} alt="" className={styles.empty_cart__img} />
                    <p className={styles.empty_cart__title}>Your shopping cart is empty.</p>
                    <Link to={'/'} className={styles.empty_cart__link}>
                        Go shopping
                    </Link>
                </div>
            </div>
        )
    }


    return (
        <div className={styles.main}>
            {
                carts.map(product => {
                    return (

                        <div className={styles.cart__product} key={product?.id}>
                            <div className={styles.container}>
                                <div className={styles.title}>{product?.title}</div>
                                <div className={styles.img}>
                                    <img src={product?.thumbnail} className={styles.img__cart} alt={product?.title} />
                                </div>
                                <div className={styles.discountedPrice}>{formatPrice(product?.totalPrice)}</div>
                                <div className={styles.quantityBtn}>
                                    <button
                                        className={styles.minus}
                                        // onClick={() => dispatch(toggleCartQty({ id: product?.id, type: "DEC" }))}
                                        onClick={() => dispatch(toggleCartQty({
                                            id: product?.id, type: "DEC",
                                            title: product?.title,
                                            thumbnail: product?.thumbnail,
                                            price: product?.price,
                                            quantity: product?.quantity,
                                            totalPrice: product?.totalPrice,
                                            discountPrice: product?.discountPrice,
                                            stock: product?.stock
                                        }as CartType))}
                                    >-</button>
                                    <div className={styles.count}>{product?.quantity}</div>
                                    <button
                                        className={styles.plus}
                                        // onClick={() => dispatch(toggleCartQty({ id: product?.id, type: "INC" }))}
                                        // onClick={() => dispatch(toggleCartQty({
                                        //     id: product?.id, type: "INC",
                                        //     title: '',
                                        //     thumbnail: '',
                                        //     price: 0,
                                        //     quantity: 0,
                                        //     totalPrice: 0,
                                        //     discountPrice: 0,
                                        //     stock: 0
                                        // }))}
                                        onClick={() => dispatch(toggleCartQty({
                                            id: product?.id, type: "INC",
                                            title: product?.title,
                                            thumbnail: product?.thumbnail,
                                            price: product?.price,
                                            quantity: product?.quantity,
                                            totalPrice: product?.totalPrice,
                                            discountPrice: product?.discountPrice,
                                            stock: product?.stock
                                        }as CartType))}
                                    >+</button>
                                </div>
                                <div className={styles.btn__delete}>
                                    <button
                                        className={styles.btn__delete_product}
                                        onClick={() => dispatch(removeCart(product))}
                                    >Delete
                                    </button>
                                </div>
                            </div>
                        </div>

                    )
                })
            }
            <div className={styles.itemsInfo}>
                <div className={styles.clearCart}>
                    <button
                        className={styles.btn}
                        onClick={() => dispatch(clearCart())}
                    >Clear All
                    </button>
                </div>
                <div className={styles.price}>Total Price: {formatPrice(totalAmount)}</div>
            </div>
        </div>
    );
}

export default CartPage;
