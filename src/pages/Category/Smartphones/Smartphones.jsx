import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategory } from '../../../store/categorySlice';
import Product from '../../../components/Product/Product'
import { STATUS } from '../../../utils/status';
import Loader from '../../../utils/Loader/Loader';
import styles from './styles.module.scss'
import Error from '../../../components/Error/Error';

const Smartphones = () => {
    const dispatch = useDispatch();
    const smartphones = useSelector((state) => state.category.category);
    const smartphonesStatus = useSelector((state) => state.category.categoryStatus);

    useEffect(() => {
        dispatch(fetchCategory('smartphones'))
    }, [dispatch])
    return (
        <div className={styles.main}>
            {smartphonesStatus === STATUS.FAILED && <Error/>}
            {
                smartphonesStatus === STATUS.LOADING ? <Loader /> :
                smartphones.map((item) => {
                        return <Product key={item.id} product={item} />
                    })
            }
        </div>
    );
}

export default Smartphones;
