import React from 'react';

import Rating from './Rating/Rating'

import { useLocation } from 'react-router-dom';
import Suggest from './Suggest';

import { discount } from '../Helper/discount';
import { useGetProductsQuery } from '../API/MainApi';

const ChoseProduct = () => {
    window.scrollTo(0, 0)

    const location = useLocation()

    // console.log(location.state.id);
    // console.log(location.state.category);
    // console.log(location.state.rating)

    const {data} = useGetProductsQuery()
    console.log(location);
    
    const discountPrice = discount(location.state.price, location.state.discountPercent)

    
    return (
        <>
            <section className="py-5">
                <div className="container px-4 px-lg-5 my-5">
                    <div className="row gx-4 gx-lg-5 align-items-center">
                        <div className="col-md-6">
                            <img
                                className="card-img-top mb-5 mb-md-0"
                                src={location.state.img}
                                alt="Picture"
                            />
                        </div>
                        <div className="col-md-6">
                            <h1 className="display-5 fw-bolder">{location.state.title}</h1>
                            <div className="small mb-1"><Rating rating={location.state.rating}/></div>
                            <div className="fs-5 mb-5">
                                <span className="text-decoration-line-through me-2">${location.state.price}</span>
                                <span>${discountPrice}</span>
                            </div>
                            <p className="lead">
                                {location.state.description}
                            </p>
                            <div className="d-flex">
                                <input
                                    className="form-control text-center me-3"
                                    id="inputQuantity"
                                    type="num"
                                    defaultValue={1}
                                    style={{ maxWidth: "3rem" }}
                                />
                                <button className="btn btn-outline-secondary flex-shrink-0" type="button">
                                    <i className="bi-cart-fill me-1" />
                                    Add to basket
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Suggest id={location.state.id} category={location.state.category}/>
        </>
    );
}

export default ChoseProduct;
