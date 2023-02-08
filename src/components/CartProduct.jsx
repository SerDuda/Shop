import { Button } from 'bootstrap';
import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { discount } from '../Helper/discount'
import Rating from './Rating/Rating';



const CartProduct = () => {

    const location = useLocation()

    const discountPrice = discount(location.price, location.discountPrice)



    return (
        <>
            <div className="col mb-5">
                {/* <Link to={'/productpage'} style={{textDecoration: 'none', color: '#212529'}}> */}
                <div className="card h-100"
                    style={{ cursor: 'pointer' }}>
                    {/* Product image*/}
                    <div
                        className="badge bg-dark text-white position-absolute"
                        style={{ top: "0.5rem", right: "0.5rem" }}
                    >
                        Sale
                    </div>
                    <img
                        className="card-img-top card-img__el"
                        src={location.img}
                        alt="Picture"
                    />
                    {/* Product details*/}
                    <div className="card-body p-4">
                        <div className="text-center">
                            {/* Product name*/}
                            <h5 className="fw-bolder">
                                {location.title}
                            </h5>
                            {/* Product price */}
                            <Rating rating={location.rating} />
                            <br />
                            <span className="text-muted text-decoration-line-through pe-2">
                                {`$${location.price}`}
                            </span>
                            {`$${discountPrice}`}
                            <div className="d-flex align-items-center justify-content-center">
                                <div className='cursor-pointer'>
                                    <span>-</span>
                                </div>
                                <div className='ms-2 me-2'>
                                    0
                                </div>
                                <div className='cursor-pointer ms-1'>
                                    <span>+</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Product actions*/}
                    <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                        <div className="text-center">
                            <a className="btn btn-outline-dark mt-auto" href="#">
                                Delete
                            </a>
                        </div>
                    </div>
                </div>
                {/* </Link> */}
            </div>
        </>
    );
}

export default CartProduct;



