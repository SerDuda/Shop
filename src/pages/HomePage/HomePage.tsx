import React, { useEffect } from 'react';
import styles from './HomePage.module.scss'
import Product from '../../components/Product/Product'
import Error from '../../components/Error/Error';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts, getProductsStatus, fetchProducts } from '../../store/productSlice';
import { STATUS } from '../../utils/status';
import Loader from '../../utils/Loader/Loader';
import { useAppDispatch } from '../../store';

const HomePage: React.FC = () => {
    const dispatch = useAppDispatch();
    const products = useSelector(getProducts)
    const productsStatus = useSelector(getProductsStatus)


    useEffect(() => {
        dispatch(fetchProducts(9));
    }, [dispatch])

    return (
        <div className={styles.main}>
            {productsStatus === STATUS.FAILED && <Error/>}
            {
                productsStatus === STATUS.LOADING ? <Loader /> : products.map(item => {
                    return (
                        <Product key={item.id} product={item} />
                    )
                })
            }
        </div>
    );
}

export default HomePage;
