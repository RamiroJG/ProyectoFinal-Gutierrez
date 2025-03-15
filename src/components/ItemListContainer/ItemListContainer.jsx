import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Items from '../Items/Items'
import Tabs from '../Tabs/Tabs'
import fetchData from '../../fetchData'

import './ItemListContainer.css'

const ItemListContainer = () => {
    const { categoria } = useParams()
    const [activeTab, setActiveTab] = useState("all");
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData().then(data => {
            setProductos(data);
            setLoading(false);
        });
    }, []);


    // Si activeTab es "all", muestra todos, de lo contrario, filtra según category
    // de lo contrario, usamos el estado activeTab (por ejemplo, desde los Tabs)
    const productosFiltrados = categoria
        ? productos.filter(item => item.category.toLowerCase() === categoria.toLowerCase())
        : activeTab === "all"
            ? productos
            : productos.filter(item => item.category === activeTab)

    return (
        <div className='' style={{ paddingTop: "12rem" }}>
            <section className='contenedor'>
                <div className='flex-destacados-title'>
                    <h3>Productos destacados</h3>
                    <p>Descubre nuestra selección de productos más populares del mundo de Naruto</p>
                    <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
                </div>
                <div className='grid_items text-center '>
                    {loading ? (
                        <p>Cargando productos...</p>
                    ) : (
                        productosFiltrados.map((producto) => (
                            <Items
                                key={producto.id}
                                id={producto.id}
                                nombre={producto.name}
                                precio={producto.price}
                                imagen={producto.image}
                                rating={producto.rating}
                                stock={producto.stock}
                                isNew={producto.isNew}
                                isBestseller={producto.isBestseller}
                                discountPrice={producto.discountPrice}
                            />
                        ))
                    )}
                </div>
                <div className='btn-products'>
                    <button className='all-products'>
                        Ver todos los productos
                    </button>
                </div>
            </section>
        </div>
    )
}

export default ItemListContainer