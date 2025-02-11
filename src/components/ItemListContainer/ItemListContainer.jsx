import Items from '../Items/Items'


import './ItemListContainer.css'

const ItemListContainer = ({greetings}) => {
    return (
        <div className=''>
            <h3>{greetings}</h3>
            <div className='grid_items text-center contenedor'>
                <Items nombre={"Producto 1"} precio={120}/>
                <Items nombre={"Producto 2"} precio={150}/>
                <Items nombre={"Producto 3"} precio={200} />
            </div>
        </div>
    )
}

export default ItemListContainer