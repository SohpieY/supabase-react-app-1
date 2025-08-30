import React, { useState, useEffect } from 'react';
import { CartState } from '../Context/Context';
import shopQuantity from '../components/shopQuantity';
import './Cart.css';

const Cart = () => {
    const {
        state: { cart },
        dispatch,
    } = CartState();

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        setTotal(cart.reduce((acc, curr) => acc + (curr.price * (curr.qty || 1)), 0));
    }, [cart]);

    const getCartItemsCount = () => {
        return cart.reduce((total, item) => total + (item.qty || 1), 0);
    };

    const handleQuantityChange = (itemId, newQuantity) => {
        dispatch({
            type: "CHANGE_CART_QTY",
            payload: {
                id: itemId,
                qty: newQuantity
            },
        });
    };

    return (
        <>
            {/* Cart Toggle Button */}
            <button
                className="cart-toggle-btn"
                onClick={() => setIsCartOpen(!isCartOpen)}
            >
                🛒 Cart ({getCartItemsCount()})
            </button>

            {/* Cart Modal */}
            {isCartOpen && (
                <div className="cart-modal-overlay" onClick={() => setIsCartOpen(false)}>
                    <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="cart-header">
                            <h2>Shopping Cart ({getCartItemsCount()} items)</h2>
                            <button className="close-btn" onClick={() => setIsCartOpen(false)}>×</button>
                        </div>

                        <div className="cart-items">
                            {cart.length === 0 ? (
                                <p className="empty-cart">Your cart is empty</p>
                            ) : (
                                cart.map(item => (
                                    <div key={item.id} className="cart-item">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="cart-item-image"
                                        />
                                        <div className="cart-item-details">
                                            <h4>{item.name}</h4>
                                            <p className="cart-item-price">
                                                HKD {item.price.toFixed(2)} each
                                            </p>

                                            {/* Quantity Control */}
                                            <div className="quantity-section">
                                                <label>Quantity: </label>
                                                <shopQuantity
                                                    quantity={item.qty || 1}
                                                    onQuantityChange={(newQty) =>
                                                        handleQuantityChange(item.id, newQty)
                                                    }
                                                />
                                            </div>

                                            <p className="cart-item-subtotal">
                                                Subtotal: HKD {(item.price * (item.qty || 1)).toFixed(2)}
                                            </p>
                                        </div>
                                        <button
                                            className="remove-btn"
                                            onClick={() =>
                                                dispatch({
                                                    type: "REMOVE_FROM_CART",
                                                    payload: { id: item.id },
                                                })
                                            }
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>

                        {cart.length > 0 && (
                            <div className="cart-footer">
                                <div className="cart-total">
                                    Total: HKD {total.toFixed(2)}
                                </div>
                                <button className="checkout-btn">
                                    Proceed to Checkout
                                </button>
                                <button
                                    className="clear-cart-btn"
                                    onClick={() =>
                                        dispatch({ type: "CLEAR_CART" })
                                    }
                                >
                                    Clear Cart
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Cart;