import React, { useEffect, useState } from 'react';
import styles from './ProductPage.module.scss';
import { getProduct, getProductStatus, fetchProduct, getSuggestProducts, getSuggestStatus, fetchSuggest } from '../../store/productSlice';
import { addToCart, isModalCartOff, isModalCartOn } from '../../store/cartSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { STATUS } from '../../utils/status';
import Loader from '../../utils/Loader/Loader';
import Raiting from '../../utils/raiting';
import { discountedPrice } from '../../utils/discountPrice';
import { formatPrice } from '../../utils/helpers';
import Modal from '../../components/Modal/Modal';
import Product from '../../components/Product/Product'
import Error from '../../components/Error/Error';


const ProductPage = () => {
    const { id } = useParams()
    const product = useSelector(getProduct)
    const productStatus = useSelector(getProductStatus)
    const modalMassege = useSelector((state) => state.cart.isModal)
    const suggestProducts = useSelector(getSuggestProducts)
    const suggestStatus = useSelector(getSuggestStatus)
    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        dispatch(fetchProduct(id));

        if (modalMassege) {
            setTimeout(() => {
                dispatch(isModalCartOff())
            }, 2000)
        }
    }, [modalMassege, id])

    useEffect(() => {
        dispatch(fetchSuggest(product.category))
    }, [product])

    const increaseQty = () => {
        setQuantity((prevQty) => {
            let tempQty = prevQty + 1;
            if (tempQty > product?.stock) tempQty = product?.stock
            return tempQty
        })
    }

    const decreaseQty = () => {
        setQuantity((prevQty) => {
            let tempQty = prevQty - 1;
            if (tempQty < 1) tempQty = 1;
            return tempQty
        })
    }

    const addToCartHandler = (product) => {
        let discountPrice = discountedPrice(product);
        let totalPrice = quantity * discountPrice;

        dispatch(addToCart({
            ...product,
            quantity: quantity,
            totalPrice,
            discountPrice
        }))
        dispatch(isModalCartOn())
    }

    const suggestOfProducts = suggestProducts
        .filter((item) => item.id !== product.id)
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 3);


    return (
        <div className={styles.main}>
            {modalMassege && <Modal />}
            {productStatus === STATUS.FAILED && <Error />}
            {productStatus === STATUS.LOADING ? <Loader /> : (
                <div className={styles.container}>
                    <div className={styles.img}>
                        <img src={product?.thumbnail} alt={product.title} className={styles.img__link} />
                    </div>
                    <div className={styles.mainInfo}>
                        <div className={styles.title}>{product?.title}</div>
                        <div className={styles.brand}>Brand: {product?.brand}</div>
                        <div className={styles.description}>{product?.description}</div>
                        <div className={styles.rating}><Raiting rating={product?.rating} /></div>
                        <div className={styles.price}>
                            <div className={styles.price__main}>{formatPrice(product?.price)}</div>
                            <div className={styles.price__discount}>{formatPrice(discountedPrice(product))}</div>
                        </div>
                        <div className={styles.product_trade}>
                            <div className={styles.product_count}>
                                <button className={styles.btn__count} onClick={() => decreaseQty()}>-</button>
                                <div>{quantity}</div>
                                <button className={styles.btn__count} onClick={() => increaseQty()}>+</button>
                            </div>
                            <button className={styles.btn__add}
                                onClick={() => addToCartHandler(product)}>Add to Cart</button>
                        </div>
                    </div>
                </div>
            )}

            <div className={styles.suggest}>
                <div className={styles.suggest__title}>
                    <p>The same products</p>
                </div>
                <div className={styles.suggest__products}>
                    {
                        suggestStatus === STATUS.LOADING ? <Loader /> : (
                            suggestOfProducts.map(item => {
                                return (
                                        <Product key={item.id} product={item}/>
                                )
                            })
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default ProductPage;
