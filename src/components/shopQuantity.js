import React from 'react';
import './shopQuantity.css';

const shopQuantity = ({ quantity, onQuantityChange, maxQuantity = 10 }) => {
    const handleIncrement = () => {
        if (quantity < maxQuantity) {
            onQuantityChange(quantity + 1);
        }
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            onQuantityChange(quantity - 1);
        }
    };

    const handleInputChange = (e) => {
        const newQuantity = parseInt(e.target.value) || 1;
        if (newQuantity >= 1 && newQuantity <= maxQuantity) {
            onQuantityChange(newQuantity);
        }
    };

    return (
        <div className="quantity-control">
            <button
                className="quantity-btn"
                onClick={handleDecrement}
                disabled={quantity <= 1}
            >
                −
            </button>

            <input
                type="number"
                className="quantity-input"
                value={quantity}
                onChange={handleInputChange}
                min="1"
                max={maxQuantity}
            />

            <button
                className="quantity-btn"
                onClick={handleIncrement}
                disabled={quantity >= maxQuantity}
            >
                +
            </button>
        </div>
    );
};

export default shopQuantity;