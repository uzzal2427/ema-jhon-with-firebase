import React from 'react';
import './ReviewItem.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashArrowUp } from '@fortawesome/free-solid-svg-icons'

const ReviewItem = ({ product, removeFromCart }) => {
    console.log(product)
    const { img, name, price, shipping, _id } = product
    return (
        <div className='item-container'>
            <div className='item'>
                <img src={img} alt="" />
                <div>
                    <h5>{name}</h5>
                    <p>Price: {price}</p>
                    <p>Shipping: {shipping}</p>
                </div>
            </div>
            <div>
                <button onClick={()=> removeFromCart(_id)}><FontAwesomeIcon icon={faTrashArrowUp} /></button>
            </div>
        </div>
    );
};

export default ReviewItem;