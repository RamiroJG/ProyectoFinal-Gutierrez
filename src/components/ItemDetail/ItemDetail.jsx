import React, { useState, useEffect, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProductos } from '../../services/firebaseService'
import { CartContext } from '../../context/CartContext'
import ItemCount from '../ItemCount/ItemCount'
import Loader from '../Loader/Loader'
import NotFound from '../NotFound/NotFound'
import "./ItemDetail.css"

const ItemDetail = () => {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [activeImage, setActiveImage] = useState(0)
    const [selectedSize, setSelectedSize] = useState(null)
    const [added, setAdded] = useState(false)
    const [addedQuantity, setAddedQuantity] = useState(0)

    const { addItem } = useContext(CartContext)

    useEffect(() => {
        getProductos()
            .then((data) => {
                const prod = data.find(item => item.id === id)
                setProduct(prod)
                setLoading(false)
            })
            .catch(err => {
                console.error("Error al obtener el producto:", err)
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
        return <NotFound />
    }

    const handleAdd = (cantidad) => {
        addItem(product, cantidad)
        setAddedQuantity(cantidad) // Guardamos la cantidad elegida
        setAdded(true)
    }

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
                            {product.isBestseller && (
                                <span className="quick-view-badge bestseller">Bestseller</span>
                            )}
                            {product.discountPrice && (
                                <span className="quick-view-badge sale">Oferta</span>
                            )}
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
                                        <span className="low-stock">
                                            ¡Solo quedan {product.stock}!
                                        </span>
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
                            <h3>Cantidad: {addedQuantity}</h3>
                            {!added ? (
                                <ItemCount stock={product.stock} onAdd={handleAdd} />
                            ) : (
                                <p className="added-msg">
                                    Producto agregado al carrito.
                                </p>
                            )}
                        </div>

                        <div className="quick-view-actions">
                            <Link to="/" className="view-details-btn">
                                Volver al inicio
                            </Link>
                            {added && (
                                <Link to="/cart" className="view-details-btn">
                                    Ir al carrito
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemDetail
