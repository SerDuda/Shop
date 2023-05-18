import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllCategories } from '../../../store/categorySlice';
import Product from '../../../components/Product/Product'
import { STATUS } from '../../../utils/status';
import Loader from '../../../utils/Loader/Loader';
import styles from './styles.module.scss'
import Error from '../../../components/Error/Error';
import { RootState, useAppDispatch } from '../../../store';

const AllProducts: React.FC = () => {
    const dispatch = useAppDispatch();
    const allCategories = useSelector((state: RootState) => state.category.allCategories);
    const allCategoriesStatus = useSelector((state: RootState) => state.category.allCategoriesStatus);

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
