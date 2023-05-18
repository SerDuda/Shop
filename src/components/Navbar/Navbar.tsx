import React, { useEffect } from 'react';
import styles from './Navbar.module.scss'
import instagram from '../../assets/icons/instagram.svg'
import twitter from '../../assets/icons/twitter.svg'
import facebook from '../../assets/icons/facebook.svg'
import twitch from '../../assets/icons/twitch.svg'
import { Link } from 'react-router-dom';
import { getCartTotal } from '../../store/cartSlice';
import { useSelector } from 'react-redux';
import { FaShoppingCart } from "react-icons/fa";
import { RootState, useAppDispatch } from '../../store';

const Navbar: React.FC = () => {
    const dispatch = useAppDispatch();
    const itemsCount = useSelector((state: RootState) => state.cart.itemsCount)
    const carts = useSelector((state: RootState) => state.cart.carts)

    useEffect(() => {
        dispatch(getCartTotal())
    }, [carts])


    return (
        <div className={styles.main}>
            <div className={styles.nav}>
                <Link to={'/'} className={styles.linkStyle}>
                    <div className={styles.nav__shop}>Shop</div>
                </Link>
                <div className={styles.nav__categories}>Categories
                    <ul className={styles.nav__categories__list}>
                        <Link to={'/category/smartphones'}>
                            <li className={styles.list__item}>Smartphones</li>
                        </Link>
                        <Link to={'/category/laptops'}>
                            <li className={styles.list__item}>Laptops</li>
                        </Link>
                        <Link to={'/category/allproducts'}>
                            <li className={styles.list__item}>All products</li>
                        </Link>
                    </ul>
                </div>
            </div>
            <div className={styles.links}>
                <div className={styles.link}>
                    <div>
                        <Link to={'https://www.instagram.com/'} target='_blank'>
                            <img src={instagram} alt="" className={styles.link__svg} />
                        </Link>
                    </div>
                    <div>
                        <Link to={'https://www.twitter.com/'} target='_blank'>
                            <img src={twitter} alt="" className={styles.link__svg} />
                        </Link>
                    </div>
                    <div>
                        <Link to={'https://www.facebook.com/'} target='_blank'>
                            <img src={facebook} alt="" className={styles.link__svg} />
                        </Link>
                    </div>
                    <div>
                        <Link to={'https://www.twitch.tv/'} target='_blank'>
                            <img src={twitch} alt="" className={styles.link__svg} />
                        </Link>
                    </div>
                </div>
                <Link to='/cart'>
                    <div className={styles.cart__btn}>
                        <div className={styles.cartIcon}><FaShoppingCart /></div>
                        <div className={styles.cart__btn_count}>{itemsCount}</div>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default Navbar;
