import React from 'react';
import loader from '../../assets/icons/loader-icon.svg'
import styles from './styles.module.scss'

const Loader = () => {
    return (
        <div className={styles.main}>
            <img src={loader} alt="loading..." />
        </div>
    );
}

export default Loader;
