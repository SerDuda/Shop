import React from 'react';
import styles from './Footer.module.scss'

const Footer = () => {
    return (
        <footer className={styles.main}>
            <div className={styles.links}>
                <span>privacy policy</span>
                <span>term of service</span>
                <span>about shop</span>
            </div>
            <div className={styles.year}><span className={styles.copy}>&copy;</span> 2023</div>
        </footer>
    );
}

export default Footer;
