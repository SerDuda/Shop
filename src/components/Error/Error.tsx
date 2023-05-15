import React from 'react';
import { BiCommentError } from "react-icons/bi";
import styles from './styles.module.scss'

const Error: React.FC = () => {
    return (
        <div className={styles.error}>
            <div className={styles.error__message}>
                <BiCommentError className={styles.error__icon} />
                <span>Some Error</span>
                <span>You should to update the page</span>
            </div>
        </div>
    );
}

export default Error;
