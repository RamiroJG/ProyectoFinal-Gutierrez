import { Link } from 'react-router-dom'
import './Items.css'

const Items = ({
    nombre,
    precio,
    imagen,
    stock = 20,
    isNew = false,
    isBestseller = false,
    discountPrice = null,
    id
}) => {
    return (
        <div className="product-card-container">
            <div className="card">
                <div className="product-image-container">
                    <img src={imagen} alt={nombre} className="product-image" />

                    {discountPrice ? (
                        <span className="badge sale">Oferta</span>
                    ) : isBestseller ? (
                        <span className="badge bestseller">Bestseller</span>
                    ) : isNew ? (
                        <span className="badge new">Nuevo</span>
                    ) : null}
                </div>

                <div className="product-info">
                    <h2 className="product-name">{nombre || "NO DISPONIBLE"}</h2>

                    <div className="product-price">
                        {discountPrice ? (
                            <>
                                <span className="current-price">${discountPrice}</span>
                                <span className="original-price">${precio}</span>
                            </>
                        ) : (
                            <p className="precio current-price">${precio || "SIN PRECIO"}</p>
                        )}
                    </div>

                    <div className="product-stock">
                        {stock < 10 ? <span className="low-stock">¡Solo quedan {stock}!</span> : <span>Disponible: {stock}</span>}
                    </div>
                </div>

                <div className='flex-carrito-detalle'>
                    <button className="add-to-cart-button" disabled={!nombre}>
                        🛒 Añadir al carrito
                    </button>
                    <Link to={`/detalle/${id}`} className="add-to-cart-button" disabled={!nombre}>
                        👀 Ver detalle
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Items