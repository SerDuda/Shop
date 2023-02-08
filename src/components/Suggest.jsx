import React from 'react';
import CardProduct from './CardProduct';
import { useGetProductsQuery } from '../API/MainApi';
import { useSelector } from 'react-redux';

const Suggest = ({ id, category }) => {
    
    const { main } = useSelector(state => state.main)
    const [filterSuggest, setFilterSuggest] = React.useState([])

    React.useEffect(() => {
        if (main) {
            const filterProducts = main.filter(product => product.id !== id).filter(product => product.category === category).sort((a, b) => b.rating - a.rating)
            setFilterSuggest(filterProducts)
            sessionStorage.setItem('filterProducts', JSON.stringify(filterProducts))
        }
    }, [id, category])

    React.useEffect(() => {
        if (filterSuggest.length === 0) {
            const filterProducts = JSON.parse(sessionStorage.getItem('filterProducts'))
            setFilterSuggest(filterProducts)
        }

    }, [])

    return (
        <section className="py-5 bg-light">
            <div className="container px-4 px-lg-5 mt-5">
                <h2 className="fw-bolder mb-4">Related products</h2>
                <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                    {filterSuggest.length > 0 && filterSuggest.slice(0, 3).map(obj => (<CardProduct
                        title={obj.title}
                        key={obj.id}
                        id={obj.id}
                        price={obj.price}
                        img={obj.thumbnail}
                        rating={obj.rating}
                        description={obj.description}
                        discountPercent={obj.discountPercentage}
                        category={obj.category}
                    />))}
                </div>
            </div>
        </section>
    );
}

export default Suggest;
