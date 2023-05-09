import React from 'react';
import styles from './styles.module.scss';
import { AiOutlineCheck } from "react-icons/ai";

const Modal = () => {
    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <AiOutlineCheck className={styles.icon}/>
                <p className={styles.title}>Product was add to cart</p>
            </div>
        </div>
    );
}

export default Modal;
