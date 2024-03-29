import React from 'react';
import styles from './Header.module.scss'
import Navbar from '../Navbar/Navbar';

const Header: React.FC = () => {
    return (
        <header className={styles.main}>
            <Navbar/>
        </header>
    );
}

export default Header;
