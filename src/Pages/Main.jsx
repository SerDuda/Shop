import React, { useEffect, useState } from 'react';

import { useGetProductsQuery } from '../API/MainApi';
import { useSelector, useDispatch } from 'react-redux/es/exports'

import Header from '../components/Header';
import CardProduct from '../components/CardProduct';


import { ClipLoader } from 'react-spinners';


const Main = () => {
    // const products = useSelector(state => state.main.main)
    // console.log(products)
    // const dispatch = useDispatch()

    const { data, error, isLoading } = useGetProductsQuery()

    return (
        <>
            <Header />
            <section className="py-5">
                <div className="container px-4 px-lg-5 mt-5">
                    <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                        {isLoading && <ClipLoader color={"#36d7b7"} size={'150px'} />}
                        {error && <p>Mistake</p>}
                        {data &&
                            data?.slice(0, 9).sort((a, b) => b.rating - a.rating).map((obj) =>
                                <CardProduct
                                    title={obj.title}
                                    key={obj.id}
                                    id={obj.id}
                                    price={obj.price}
                                    img={obj.thumbnail}
                                    rating={obj.rating}
                                    description={obj.description}
                                    discountPercent={obj.discountPercentage}
                                    category={obj.category}
                                />
                            )
                        }
                    </div>
                </div>
            </section>
        </>
    );
}

export default Main;
