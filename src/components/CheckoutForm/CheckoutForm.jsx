import { useState, useContext, useEffect } from "react"
import { CartContext } from "../../context/CartContext"
import { createOrder } from "../../services/firebaseService"
import { Link } from "react-router-dom"
import "./CheckoutForm.css"

const CheckoutForm = () => {
    const { cart, clearCart, totalPrecio: cartTotal } = useContext(CartContext)
    const [totalPrecio, setTotalPrecio] = useState(0)
    const [step, setStep] = useState(1)
    const [buyer, setBuyer] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
    })
    const [paymentMethod, setPaymentMethod] = useState("creditCard")
    const [orderId, setOrderId] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [formErrors, setFormErrors] = useState({})

    // Al montar la página, fijamos el total actual del carrito
    useEffect(() => {
        setTotalPrecio(cartTotal)
        // Se ejecuta solo una vez al montar el componente.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Redirigir al inicio si el carrito está vacío y no hay una orden generada
    useEffect(() => {
        if (cart.length === 0 && !orderId) {
            window.location.href = "/"
        }
    }, [cart, orderId])

    const handleChange = (e) => {
        setBuyer({ ...buyer, [e.target.name]: e.target.value })
        // Limpiar error del campo cuando el usuario escribe
        if (formErrors[e.target.name]) {
            setFormErrors({ ...formErrors, [e.target.name]: null })
        }
    }

    const validateStep1 = () => {
        const errors = {}
        if (!buyer.name.trim()) errors.name = "El nombre es obligatorio"
        if (!buyer.email.trim()) errors.email = "El email es obligatorio"
        else if (!/\S+@\S+\.\S+/.test(buyer.email)) errors.email = "Email inválido"
        if (!buyer.phone.trim()) errors.phone = "El teléfono es obligatorio"
        else if (!/^\d{9,10}$/.test(buyer.phone.replace(/\D/g, ""))) errors.phone = "Teléfono inválido"

        setFormErrors(errors)
        return Object.keys(errors).length === 0
    }

    const validateStep2 = () => {
        const errors = {}
        if (!buyer.address.trim()) errors.address = "La dirección es obligatoria"
        if (!buyer.city.trim()) errors.city = "La ciudad es obligatoria"
        if (!buyer.state.trim()) errors.state = "La provincia/estado es obligatoria"
        if (!buyer.zipCode.trim()) errors.zipCode = "El código postal es obligatorio"

        setFormErrors(errors)
        return Object.keys(errors).length === 0
    }

    const nextStep = () => {
        if (step === 1 && validateStep1()) {
            setStep(2)
        } else if (step === 2 && validateStep2()) {
            setStep(3)
        }
    }

    const prevStep = () => {
        setStep(step - 1)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        // Capturamos el total actual antes de vaciar el carrito
        const finalTotal = cartTotal

        const orderData = {
            buyer,
            items: cart,
            total: finalTotal,
            paymentMethod,
            date: new Date(),
        }

        try {
            const id = await createOrder(orderData)
            setOrderId(id)
            // Fijamos el total de la orden para que se muestre luego
            setTotalPrecio(finalTotal)
            // Después de generar la orden, vaciamos el carrito.
            clearCart()
        } catch (err) {
            console.error("Error al crear la orden:", err)
            setError("Error al crear la orden. Intenta nuevamente.")
        } finally {
            setLoading(false)
        }
    }

    if (orderId) {
        return (
            <div className="order-confirmation">
                <div className="order-confirmation-content">
                    <div className="order-success-icon">✓</div>
                    <h2>¡Gracias por tu compra!</h2>
                    <p>
                        Tu pedido ha sido procesado correctamente. Hemos enviado un correo electrónico con los detalles de tu compra.
                    </p>
                    <div className="order-details">
                        <div className="order-detail-item">
                            <span>ID de orden:</span>
                            <span>{orderId}</span>
                        </div>
                        <div className="order-detail-item">
                            <span>Total:</span>
                            <span>${totalPrecio.toFixed(2)}</span>
                        </div>
                        <div className="order-detail-item">
                            <span>Método de pago:</span>
                            <span>
                                {paymentMethod === "creditCard"
                                    ? "Tarjeta de crédito"
                                    : paymentMethod === "paypal"
                                        ? "PayPal"
                                        : "Transferencia bancaria"}
                            </span>
                        </div>
                    </div>
                    <Link to="/" className="back-to-shop-btn">
                        Volver a la tienda
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="checkout-page">
            <div className="checkout-container">
                <div className="checkout-header">
                    <h1>Finalizar compra</h1>
                    <div className="checkout-steps">
                        <div className={`checkout-step ${step >= 1 ? "active" : ""}`}>
                            <div className="step-number">1</div>
                            <span className="step-name">Información personal</span>
                        </div>
                        <div className="step-divider"></div>
                        <div className={`checkout-step ${step >= 2 ? "active" : ""}`}>
                            <div className="step-number">2</div>
                            <span className="step-name">Dirección de envío</span>
                        </div>
                        <div className="step-divider"></div>
                        <div className={`checkout-step ${step >= 3 ? "active" : ""}`}>
                            <div className="step-number">3</div>
                            <span className="step-name">Pago</span>
                        </div>
                    </div>
                </div>

                <div className="checkout-content">
                    <div className="checkout-form-container">
                        <form onSubmit={handleSubmit}>
                            {/* Paso 1: Información personal */}
                            {step === 1 && (
                                <div className="checkout-step-content">
                                    <h2>Información personal</h2>
                                    <div className="form-group">
                                        <label htmlFor="name">Nombre completo</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={buyer.name}
                                            onChange={handleChange}
                                            className={formErrors.name ? "error" : ""}
                                        />
                                        {formErrors.name && <span className="error-message">{formErrors.name}</span>}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email">Correo electrónico</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={buyer.email}
                                            onChange={handleChange}
                                            className={formErrors.email ? "error" : ""}
                                        />
                                        {formErrors.email && <span className="error-message">{formErrors.email}</span>}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="phone">Teléfono</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={buyer.phone}
                                            onChange={handleChange}
                                            className={formErrors.phone ? "error" : ""}
                                        />
                                        {formErrors.phone && <span className="error-message">{formErrors.phone}</span>}
                                    </div>

                                    <div className="form-actions">
                                        <button type="button" onClick={nextStep} className="next-step-btn">
                                            Continuar
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Paso 2: Dirección de envío */}
                            {step === 2 && (
                                <div className="checkout-step-content">
                                    <h2>Dirección de envío</h2>
                                    <div className="form-group">
                                        <label htmlFor="address">Dirección</label>
                                        <input
                                            type="text"
                                            id="address"
                                            name="address"
                                            value={buyer.address}
                                            onChange={handleChange}
                                            className={formErrors.address ? "error" : ""}
                                        />
                                        {formErrors.address && <span className="error-message">{formErrors.address}</span>}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="city">Ciudad</label>
                                        <input
                                            type="text"
                                            id="city"
                                            name="city"
                                            value={buyer.city}
                                            onChange={handleChange}
                                            className={formErrors.city ? "error" : ""}
                                        />
                                        {formErrors.city && <span className="error-message">{formErrors.city}</span>}
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="state">Provincia/Estado</label>
                                            <input
                                                type="text"
                                                id="state"
                                                name="state"
                                                value={buyer.state}
                                                onChange={handleChange}
                                                className={formErrors.state ? "error" : ""}
                                            />
                                            {formErrors.state && <span className="error-message">{formErrors.state}</span>}
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="zipCode">Código postal</label>
                                            <input
                                                type="text"
                                                id="zipCode"
                                                name="zipCode"
                                                value={buyer.zipCode}
                                                onChange={handleChange}
                                                className={formErrors.zipCode ? "error" : ""}
                                            />
                                            {formErrors.zipCode && <span className="error-message">{formErrors.zipCode}</span>}
                                        </div>
                                    </div>

                                    <div className="form-actions">
                                        <button type="button" onClick={prevStep} className="prev-step-btn">
                                            Volver
                                        </button>
                                        <button type="button" onClick={nextStep} className="next-step-btn">
                                            Continuar
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Paso 3: Método de pago */}
                            {step === 3 && (
                                <div className="checkout-step-content">
                                    <h2>Método de pago</h2>
                                    <div className="payment-methods">
                                        <div
                                            className={`payment-method ${paymentMethod === "creditCard" ? "selected" : ""}`}
                                            onClick={() => setPaymentMethod("creditCard")}
                                        >
                                            <div className="payment-method-radio">
                                                <input
                                                    type="radio"
                                                    id="creditCard"
                                                    name="paymentMethod"
                                                    checked={paymentMethod === "creditCard"}
                                                    onChange={() => setPaymentMethod("creditCard")}
                                                />
                                                <label htmlFor="creditCard">Tarjeta de crédito</label>
                                            </div>
                                            <div className="payment-method-icon">💳</div>
                                        </div>

                                        <div
                                            className={`payment-method ${paymentMethod === "paypal" ? "selected" : ""}`}
                                            onClick={() => setPaymentMethod("paypal")}
                                        >
                                            <div className="payment-method-radio">
                                                <input
                                                    type="radio"
                                                    id="paypal"
                                                    name="paymentMethod"
                                                    checked={paymentMethod === "paypal"}
                                                    onChange={() => setPaymentMethod("paypal")}
                                                />
                                                <label htmlFor="paypal">PayPal</label>
                                            </div>
                                            <div className="payment-method-icon">🅿️</div>
                                        </div>

                                        <div
                                            className={`payment-method ${paymentMethod === "bankTransfer" ? "selected" : ""}`}
                                            onClick={() => setPaymentMethod("bankTransfer")}
                                        >
                                            <div className="payment-method-radio">
                                                <input
                                                    type="radio"
                                                    id="bankTransfer"
                                                    name="paymentMethod"
                                                    checked={paymentMethod === "bankTransfer"}
                                                    onChange={() => setPaymentMethod("bankTransfer")}
                                                />
                                                <label htmlFor="bankTransfer">Transferencia bancaria</label>
                                            </div>
                                            <div className="payment-method-icon">🏦</div>
                                        </div>
                                    </div>

                                    {error && <div className="error-alert">{error}</div>}

                                    <div className="form-actions">
                                        <button type="button" onClick={prevStep} className="prev-step-btn">
                                            Volver
                                        </button>
                                        <button type="submit" disabled={loading} className="confirm-order-btn">
                                            {loading ? "Procesando..." : "Confirmar compra"}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </form>
                    </div>

                    <div className="checkout-summary">
                        <h2>Resumen del pedido</h2>
                        <div className="checkout-items">
                            {cart.map((item) => {
                                const realPrice = item.discountPrice ?? item.price
                                return (
                                    <div key={item.id} className="checkout-item">
                                        <div className="checkout-item-image">
                                            <img src={item.image || "/placeholder.svg?height=60&width=60"} alt={item.name} />
                                            <span className="checkout-item-quantity">{item.cantidad}</span>
                                        </div>
                                        <div className="checkout-item-details">
                                            <h3 className="checkout-item-name">{item.name}</h3>
                                            {item.size && <span className="checkout-item-size">Talla: {item.size}</span>}
                                        </div>
                                        <div className="checkout-item-price">${(realPrice * item.cantidad).toFixed(2)}</div>
                                    </div>
                                )
                            })}
                        </div>

                        <div className="checkout-summary-divider"></div>

                        <div className="checkout-summary-row">
                            <span>Subtotal</span>
                            <span>${totalPrecio.toFixed(2)}</span>
                        </div>

                        <div className="checkout-summary-row">
                            <span>Envío</span>
                            <span>{totalPrecio >= 50 ? "Gratis" : "Calculado en el siguiente paso"}</span>
                        </div>

                        <div className="checkout-summary-total">
                            <span>Total</span>
                            <span>${totalPrecio.toFixed(2)}</span>
                        </div>

                        <div className="checkout-summary-info">
                            <div className="checkout-summary-info-item">
                                <span className="info-icon">🔒</span>
                                <span>Pago seguro garantizado</span>
                            </div>
                            <div className="checkout-summary-info-item">
                                <span className="info-icon">🚚</span>
                                <span>Envío gratis en pedidos +$50</span>
                            </div>
                            <div className="checkout-summary-info-item">
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

export default CheckoutForm
