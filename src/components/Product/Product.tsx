import React from 'react';
import styles from './Product.module.scss'
import { formatPrice } from '../../utils/helpers';
import { discountedPrice } from '../../utils/discountPrice';
import { useNavigate } from 'react-router-dom';
import Raiting from '../../utils/rating';
import { ProductType } from '../../store/productSlice';

interface IProduct {
    product: ProductType
}

const Product: React.FC<IProduct> = ({ product }) => {
    const navigate = useNavigate();

    const handlerProduct = () => {
        navigate(`/product/${product.id}`, { state: product })
    }
    return (
        <div className={styles.main} onClick={handlerProduct}>
            <div className={styles.container}>
                <div className={styles.image}>
                    <img src={product?.thumbnail} alt={product.title} className={styles.image__img} />
                </div>
                <div className={styles.title}>
                    <div>{product?.title}</div>
                </div>
                <div className={styles.brand}>Brand: {product?.brand}</div>
                <div>
                    <Raiting rating={product?.rating} />
                </div>
                <div className={styles.price}>
                    <div className={styles.price__main}>{formatPrice(product?.price)}</div>
                    <div className={styles.price__discount}>{formatPrice(Number(discountedPrice(product)))}</div>
                </div>
            </div>
        </div>
    );
}

export default Product;