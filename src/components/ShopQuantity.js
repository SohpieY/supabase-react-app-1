import React, { useState, useEffect } from 'react';
import Stack from './Stack';
import './ShopQuantity.css';

const ShopQuantity = ({ quantity, onQuantityChange, maxQuantity = 10 }) => {
    const [stack, setStack] = useState(new Stack(maxQuantity));

    // Initialize stack with current quantity
    useEffect(() => {
        const newStack = new Stack(maxQuantity);
        try {
            // Push items to match the current quantity
            for (let i = 0; i < quantity; i++) {
                newStack.push(i + 1);
            }
            setStack(newStack);
        } catch (error) {
            console.error("Error initializing stack:", error);
        }
    }, [quantity, maxQuantity]);

    // Push operation (increase quantity)
    const handlePush = () => {
        try {
            const newStack = new Stack(maxQuantity);
            // Copy current items
            stack.toArray().forEach(item => newStack.push(item));
            // Push new item
            newStack.push(newStack.size() + 1);

            setStack(newStack);
            onQuantityChange(newStack.size());
        } catch (error) {
            alert("🛒 Stack overflow! Your cart cannot hold more of this item.");
        }
    };

    // Pop operation (decrease quantity)
    const handlePop = () => {
        try {
            const newStack = new Stack(maxQuantity);
            // Copy all items except the last one
            const items = stack.toArray();
            items.pop(); // Remove last item

            items.forEach(item => newStack.push(item));

            setStack(newStack);
            onQuantityChange(newStack.size());
        } catch (error) {
            alert("🛒 Stack underflow! You must have at least 1 item.");
        }
    };

    // Handle direct input
    const handleInputChange = (e) => {
        const newQuantity = parseInt(e.target.value) || 1;

        if (newQuantity > maxQuantity) {
            alert("🛒 Stack overflow! Maximum quantity reached.");
            return;
        }

        if (newQuantity < 1) {
            alert("🛒 Stack underflow! Minimum quantity is 1.");
            return;
        }

        // Rebuild stack with new quantity
        const newStack = new Stack(maxQuantity);
        try {
            for (let i = 0; i < newQuantity; i++) {
                newStack.push(i + 1);
            }
            setStack(newStack);
            onQuantityChange(newQuantity);
        } catch (error) {
            alert("🛒 Error setting quantity: " + error.message);
        }
    };

    return (
        <div className="stack-quantity">
            <button
                className="stack-btn stack-pop"
                onClick={handlePop}
                disabled={stack.isEmpty()}
                title="Pop from stack (remove item)"
            >
                -
            </button>

            <div className="stack-info">
                <span className="stack-size">Qty: {stack.size()}</span>
                <input
                    type="number"
                    className="stack-input"
                    value={stack.size()}
                    onChange={handleInputChange}
                    min="1"
                    max={maxQuantity}
                />
            </div>

            <button
                className="stack-btn stack-push"
                onClick={handlePush}
                disabled={stack.isFull()}
                title="Push to stack (add item)"
            >
                +
            </button>
        </div>
    );
};

export default ShopQuantity;