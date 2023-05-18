import React, { useEffect } from 'react';
import { useSelector} from 'react-redux';
import { fetchCategory } from '../../../store/categorySlice';
import Product from '../../../components/Product/Product'
import { STATUS } from '../../../utils/status';
import Loader from '../../../utils/Loader/Loader';
import styles from './styles.module.scss'
import Error from '../../../components/Error/Error';
import { RootState, useAppDispatch } from '../../../store';

const Laptops: React.FC = () => {
    const dispatch = useAppDispatch();
    const laptops = useSelector((state: RootState) => state.category.category);
    const laptopsStatus = useSelector((state: RootState) => state.category.categoryStatus);

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
