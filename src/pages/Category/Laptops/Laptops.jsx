import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategory } from '../../../store/categorySlice';
import Product from '../../../components/Product/Product'
import { STATUS } from '../../../utils/status';
import Loader from '../../../utils/Loader/Loader';
import styles from './styles.module.scss'
import Error from '../../../components/Error/Error';

const Laptops = () => {
    const dispatch = useDispatch();
    const laptops = useSelector((state) => state.category.category);
    const laptopsStatus = useSelector((state) => state.category.categoryStatus);

    useEffect(() => {
        dispatch(fetchCategory('laptops'))
    }, [dispatch])


    return (
        <div className={styles.main}>
            {laptopsStatus === STATUS.FAILED && <Error/>}
                {
                    laptopsStatus === STATUS.LOADING ? <Loader /> :
                        laptops.map((item) => {
                            return <Product key={item.id} product={item} />
                        })
                }
        </div>
    );
}

export default Laptops;
