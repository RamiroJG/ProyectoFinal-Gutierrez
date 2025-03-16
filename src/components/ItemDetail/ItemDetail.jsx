import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import fetchData from '../../fetchData'

import "./ItemDetail.css"
import Loader from '../Loader/Loader'

const ItemDetail = () => {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [activeImage, setActiveImage] = useState(0)
    const [selectedSize, setSelectedSize] = useState(null)

    useEffect(() => {
        fetchData().then((data) => {
            const prod = data.find(item => item.id === parseInt(id))
            setProduct(prod)
            setLoading(false)
        })
    }, [id])

    if (loading) {
        return (
            <div className='loader-container-detail'>
                <Loader />
            </div>
        )
    }

    if (!product) {
        return <p>Producto no encontrado</p>
    }

    console.log(product)

    return (
        <div className="quick-view-overlay">
            <div className="quick-view-modal">
                <button className="quick-view-close">
                    ×
                </button>

                <div className="quick-view-content">
                    {/* Galería de imágenes */}
                    <div className="quick-view-gallery">
                        <div className="quick-view-main-image">
                            <img src={product.image} alt={product.name} />
                            {product.isBestseller && <span className="quick-view-badge bestseller">Bestseller</span>}
                            {product.discountPrice && <span className="quick-view-badge sale">Oferta</span>}
                        </div>

                        {product.images && product.images.length > 1 && (
                            <div className="quick-view-thumbnails">
                                {product.images.map((image, index) => (
                                    <div
                                        key={index}
                                        className={`thumbnail ${activeImage === index ? "active" : ""}`}
                                        onClick={() => setActiveImage(index)}
                                    >
                                        <img
                                            src={image || "/placeholder.svg"}
                                            alt={`${product.name} - Vista ${index + 1}`}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Información del producto */}
                    <div className="quick-view-info">
                        <h2 className="quick-view-title">{product.name}</h2>

                        <div className="quick-view-meta">

                            <div className="quick-view-stock">
                                {product.stock > 0 ? (
                                    product.stock < 10 ? (
                                        <span className="low-stock">¡Solo quedan {product.stock}!</span>
                                    ) : (
                                        <span className="in-stock">En stock</span>
                                    )
                                ) : (
                                    <span className="out-of-stock">Agotado</span>
                                )}
                            </div>
                        </div>

                        <div className="quick-view-price">
                            {product.discountPrice ? (
                                <>
                                    <span className="current-price">${product.discountPrice}</span>
                                    <span className="original-price">${product.price}</span>
                                    <span className="discount-percentage">
                                        {Math.round((1 - product.discountPrice / product.price) * 100)}% OFF
                                    </span>
                                </>
                            ) : (
                                <span className="current-price">${product.price}</span>
                            )}
                        </div>

                        <div className="quick-view-description">
                            <p>{product.description}</p>
                        </div>

                        {product.sizes && product.sizes.length > 0 && (
                            <div className="quick-view-sizes">
                                <h3>Talla:</h3>
                                <div className="size-options">
                                    {product.sizes.map((size) => (
                                        <button
                                            key={size}
                                            className={`size-option ${selectedSize === size ? "selected" : ""}`}
                                            onClick={() => setSelectedSize(size)}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="quick-view-quantity">
                            <h3>Cantidad:</h3>
                            <div className="quantity-selector">
                                <button className="quantity-btn">-</button>
                                <input type="number" min="1" defaultValue="1" />
                                <button className="quantity-btn">+</button>
                            </div>
                        </div>

                        <div className="quick-view-actions">
                            <button className="add-to-cart-btn">
                                <span className="cart-icon">🛒</span> Añadir al carrito
                            </button>

                            <Link to="/" className="view-details-btn">
                                Volver al inicio
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemDetail
