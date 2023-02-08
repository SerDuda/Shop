import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGetProductsQuery } from '../API/MainApi';
import Rating from './Rating/Rating';

import {discount} from '../Helper/discount';



const CardProduct = ({ title, price, img, rating, id, description, discountPercent, category}) => {

    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate(`/productpage/${id}`, { state: { price, img, rating, title, description, discountPercent, id, category} })
        // sessionStorage.setItem(id)
    }

    const discountPrice = discount(price, discountPercent)

   


    return (
        <>
            <div className="col mb-5">
                {/* <Link to={'/productpage'} style={{textDecoration: 'none', color: '#212529'}}> */}
                <div className="card h-100" onClick={handleRedirect} style={{ cursor: 'pointer' }}>
                    {/* Product image*/}
                    <div
                        className="badge bg-dark text-white position-absolute"
                        style={{ top: "0.5rem", right: "0.5rem" }}
                    >
                        Sale
                    </div>
                    <img
                        className="card-img-top card-img__el"
                        src={img}
                        alt="Picture"
                    />
                    {/* Product details*/}
                    <div className="card-body p-4">
                        <div className="text-center">
                            {/* Product name*/}
                            <h5 className="fw-bolder">{title}</h5>
                            {/* Product price*/}
                            <Rating rating={rating}/>
                            <br />
                            <span className="text-muted text-decoration-line-through pe-2">
                                {`$${price}`}
                            </span>
                            {`$${discountPrice}`}
                        </div>
                    </div>
                    {/* Product actions*/}
                    <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                        <div className="text-center">
                            <a className="btn btn-outline-secondary mt-auto" href="#">
                                Add to basket
                            </a>
                        </div>
                    </div>
                </div>
                {/* </Link> */}
            </div>
        </>
    );
}

export default CardProduct;
