import React from 'react';
import {Link} from 'react-router-dom'

import {ReactComponent as Basket} from '../assets/basket_icon.svg'

const Navbar = () => {
    
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container px-4 px-lg-5">
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                            <li className="nav-item"><Link to={'/'} className="nav-link active">Home</Link></li>
                            <li className="nav-item dropdown">
                                <div className="nav-link dropdown-toggle" id="navbarDropdown" role="button"
                                    data-bs-toggle="dropdown" aria-expanded="false">Shop</div>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link to={'/allproducts'} className="dropdown-item">All Products</Link></li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li><Link to={'/smartphones'} className="dropdown-item">Smartphones</Link></li>
                                    <li><Link to={'/laptops'} className="dropdown-item">Laptops</Link></li>
                                </ul>
                            </li>
                        </ul>
                        <form className="d-flex">
                            <button className="btn btn-outline-secondary d-inline-flex " type="submit">
                                <Basket style={{width: '20px', height: '20px'}}/>
                                <i className="bi-cart-fill me-1" />
                                {/* Basket */}
                                <span className="badge bg-dark text-white ms-1 rounded-pill" style={{top: '1px'}}>
                                    0
                                </span>
                            </button>
                        </form>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
