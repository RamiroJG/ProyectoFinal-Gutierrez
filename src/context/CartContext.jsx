import { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Agrega un producto al carrito, sumando cantidad si ya existe.
    const addItem = (producto, cantidad) => {
        setCart(prev => {
            const exist = prev.find(item => item.id === producto.id);
            if (exist) {
                return prev.map(item =>
                    item.id === producto.id
                        ? { ...item, cantidad: item.cantidad + cantidad }
                        : item
                );
            } else {
                return [...prev, { ...producto, cantidad }];
            }
        });
    };

    const removeItem = (id) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };

    const clearCart = () => {
        setCart([]);
    };

    // Calcula el total usando el mismo criterio de precio que en el Cart
    const totalPrecio = cart.reduce((acc, item) => {
        const realPrice = item.discountPrice ?? item.price;
        return acc + realPrice * item.cantidad;
    }, 0);

    return (
        <CartContext.Provider value={{ cart, addItem, removeItem, clearCart, totalPrecio }}>
            {children}
        </CartContext.Provider>
    );
};
