import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { CartContext } from "../../context/CartContext"
import "./Cart.css"

const Cart = () => {
    const { cart, removeItem, clearCart, totalPrecio } = useContext(CartContext)

    if (cart.length === 0) {
        return (
            <div className="cart-empty">
                <div className="cart-empty-content">
                    <div className="cart-empty-icon">🛒</div>
                    <h2>Tu carrito está vacío</h2>
                    <p>Parece que aún no has añadido productos a tu carrito.</p>
                    <Link to="/" className="back-to-shop-btn">
                        Volver a la tienda
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="cart-page">
            <div className="cart-container">
                <div className="cart-header">
                    <h1>Tu Carrito</h1>
                    <button onClick={clearCart} className="clear-cart-btn">
                        Vaciar carrito
                    </button>
                </div>

                <div className="cart-content">
                    <div className="cart-items">
                        <div className="cart-items-header">
                            <div className="cart-item-product">Producto</div>
                            <div className="cart-item-price">Precio</div>
                            <div className="cart-item-quantity">Cantidad</div>
                            <div className="cart-item-subtotal">Subtotal</div>
                            <div className="cart-item-actions">Acciones</div>
                        </div>

                        <ul className="cart-items-list">
                            {cart.map((item) => {
                                // Si existe descuento, úsalo; si no, usa el price regular
                                const realPrice = item.discountPrice ?? item.price
                                return (
                                    <li key={item.id} className="cart-item">
                                        <div className="cart-item-product">
                                            <div className="cart-item-image">
                                                <img src={item.image || "/placeholder.svg?height=80&width=80"} alt={item.name} />
                                            </div>
                                            <div className="cart-item-details">
                                                <h3 className="cart-item-name">{item.name}</h3>
                                                {item.size && <span className="cart-item-size">Talla: {item.size}</span>}
                                            </div>
                                        </div>

                                        <div className="cart-item-price">${realPrice.toFixed(2)}</div>

                                        <div className="cart-item-quantity">
                                            <div className="quantity-display">{item.cantidad}</div>
                                        </div>

                                        <div className="cart-item-subtotal">${(realPrice * item.cantidad).toFixed(2)}</div>

                                        <div className="cart-item-actions">
                                            <button onClick={() => removeItem(item.id)} className="remove-item-btn">
                                                <span className="remove-icon">×</span>
                                            </button>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>

                    <div className="cart-summary">
                        <h2>Resumen del pedido</h2>

                        <div className="cart-summary-row">
                            <span>Subtotal</span>
                            <span>${totalPrecio.toFixed(2)}</span>
                        </div>

                        <div className="cart-summary-row">
                            <span>Envío</span>
                            <span>Calculado en el checkout</span>
                        </div>

                        {totalPrecio >= 50 && (
                            <div className="cart-summary-discount">
                                <span>¡Envío gratis!</span>
                                <span>En pedidos superiores a $50</span>
                            </div>
                        )}

                        <div className="cart-summary-total">
                            <span>Total</span>
                            <span>${totalPrecio.toFixed(2)}</span>
                        </div>

                        <div className="cart-summary-actions">
                            <Link to="/checkout" className="checkout-btn">
                                Finalizar compra
                            </Link>
                            <Link to="/" className="continue-shopping-btn">
                                Seguir comprando
                            </Link>
                        </div>

                        <div className="cart-summary-info">
                            <div className="cart-summary-info-item">
                                <span className="info-icon">🔒</span>
                                <span>Pago seguro garantizado</span>
                            </div>
                            <div className="cart-summary-info-item">
                                <span className="info-icon">🚚</span>
                                <span>Envío gratis en pedidos +$50</span>
                            </div>
                            <div className="cart-summary-info-item">
                                <span className="info-icon">🔄</span>
                                <span>30 días para devoluciones</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart


