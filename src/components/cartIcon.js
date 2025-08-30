import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { Badge, Dropdown, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CartState } from "../Context/Context"; // Adjust path as needed
import "./cartIcon.css";

const CartIcon = () => {
    const {
        state: { cart },
        dispatch,
    } = CartState();

    const [showDropdown, setShowDropdown] = useState(false);

    const getCartItemsCount = () => {
        return cart.reduce((total, item) => total + (item.qty || 1), 0);
    };

    const getCartTotal = () => {
        return cart.reduce((total, item) => total + (item.price * (item.qty || 1)), 0);
    };

    return (
        <div className="cart-icon-container">
            <Dropdown
                show={showDropdown}
                onToggle={(isOpen) => setShowDropdown(isOpen)}
                align="end"
            >
                <Dropdown.Toggle variant="success" className="cart-toggle-btn">
                    <FaShoppingCart className="cart-icon" />
                    {cart.length > 0 && (
                        <Badge bg="danger" className="cart-badge">
                            {getCartItemsCount()}
                        </Badge>
                    )}
                </Dropdown.Toggle>

                <Dropdown.Menu className="cart-dropdown-menu">
                    {cart.length > 0 ? (
                        <>
                            <div className="cart-dropdown-header">
                                <h6>Your Cart ({getCartItemsCount()} items)</h6>
                            </div>
                            <div className="cart-items-container">
                                {cart.map((prod) => (
                                    <div className="cart-item" key={prod.id}>
                                        <img
                                            src={prod.image}
                                            className="cart-item-img"
                                            alt={prod.name}
                                        />
                                        <div className="cart-item-details">
                                            <span className="cart-item-name">{prod.name}</span>
                                            <span className="cart-item-price">HKD {prod.price}</span>
                                        </div>
                                        <AiFillDelete
                                            className="cart-item-delete"
                                            onClick={() =>
                                                dispatch({
                                                    type: "REMOVE_FROM_CART",
                                                    payload: prod,
                                                })
                                            }
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="cart-total">
                                Total: HKD {getCartTotal().toLocaleString()}
                            </div>
                            <div className="cart-actions">
                                <Link to="/cart">
                                    <Button variant="primary" className="w-100">
                                        Go To Cart
                                    </Button>
                                </Link>
                            </div>
                        </>
                    ) : (
                        <div className="cart-empty">
                            <span>Cart is Empty!</span>
                        </div>
                    )}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
};

export default CartIcon;