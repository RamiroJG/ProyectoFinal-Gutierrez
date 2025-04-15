import { useState } from 'react';
import './ItemCount.css';
import { Link } from 'react-router-dom';

const ItemCount = ({ stock, initial = 1, onAdd }) => {
    const [count, setCount] = useState(initial);

    const handleIncrement = () => {
        if (count < stock) setCount(prev => prev + 1);
    };

    const handleDecrement = () => {
        if (count > 1) setCount(prev => prev - 1);
    };

    return (
        <div className="item-count">
            <div className="quantity-selector">
                <button className='quantity-btn' onClick={handleDecrement}>-</button>
                <span>{count}</span>
                <button className='quantity-btn' onClick={handleIncrement}>+</button>
            </div>
            <div className="quick-view-actions">
                <button className="add-to-cart-btn">
                    <span onClick={() => onAdd(count)} className="cart-icon">🛒 Añadir al carrito</span> 
                </button>
            </div>
        </div>
    );
};

export default ItemCount;
