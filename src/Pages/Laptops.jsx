import React from 'react';
import CardProduct from '../components/CardProduct';
import { useGetAllLaptopsQuery } from '../API/MainApi';

import { ClipLoader } from 'react-spinners'

const Laptops = () => {
    const {data, error, isLoading} = useGetAllLaptopsQuery()


    return (
        <>
        <section className="py-5">
            <div className="container px-4 px-lg-5 mt-5">
                <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                    {isLoading && <ClipLoader color={"#36d7b7"} size={'150px'} />}
                    {data &&
                            data?.map((obj) =>
                                <CardProduct
                                    title={obj.title}
                                    key={obj.id}
                                    id={obj.id}
                                    price={obj.price}
                                    img={obj.thumbnail}
                                    rating={obj.rating}
                                    description={obj.description}
                                />
                            )
                    }
                    {error && <p>Mistake</p>}
                </div>
            </div>
        </section>
    </>
    );
}

export default Laptops;
