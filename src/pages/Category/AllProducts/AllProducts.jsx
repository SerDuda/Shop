import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllCategories } from '../../../store/categorySlice';
import Product from '../../../components/Product/Product'
import { STATUS } from '../../../utils/status';
import Loader from '../../../utils/Loader/Loader';
import styles from './styles.module.scss'
import Error from '../../../components/Error/Error';

const AllProducts = () => {
    const dispatch = useDispatch();
    const allCategories = useSelector((state) => state.category.allCategories);
    const allCategoriesStatus = useSelector((state) => state.category.allCategoriesStatus);

    useEffect(() => {
        dispatch(fetchAllCategories())
    }, [dispatch])

    const allProducts = allCategories.filter(item => item.category === 'smartphones' || item.category === 'laptops')

    return (
        <div className={styles.main}>
            {allCategoriesStatus === STATUS.FAILED && <Error/>}
            {
                allCategoriesStatus === STATUS.LOADING ? <Loader /> :
                    allProducts.map((item) => {
                        return <Product key={item.id} product={item} />
                    })
            }
        </div>
    );
}

export default AllProducts;
