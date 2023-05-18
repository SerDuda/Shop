import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchCategory } from '../../../store/categorySlice';
import Product from '../../../components/Product/Product'
import { STATUS } from '../../../utils/status';
import Loader from '../../../utils/Loader/Loader';
import styles from './styles.module.scss'
import Error from '../../../components/Error/Error';
import { RootState, useAppDispatch } from '../../../store';

const Smartphones: React.FC = () => {
    const dispatch = useAppDispatch();
    const smartphones = useSelector((state: RootState) => state.category.category);
    const smartphonesStatus = useSelector((state: RootState) => state.category.categoryStatus);

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
