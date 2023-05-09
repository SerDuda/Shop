import React from 'react';
import {FaStar, FaStarHalfAlt, FaRegStar} from 'react-icons/fa'

const Raiting = ({rating}) => {
    const ratingStar = Array.from({length: 5}, (_, idx) => {
        let number = idx + 0.5

        return (
            <span key={idx}>
                {rating >= idx + 1 ? (
                <FaStar/>
                ) : rating >= number ? (
                    <FaStarHalfAlt/>
                ) : (
                    <FaRegStar/>
                )}
            </span>
        );
    })
    
    return (
        <div>
            {ratingStar}
        </div>
    );
}

export default Raiting;
