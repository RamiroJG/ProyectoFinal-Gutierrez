import './Items.css'

const Items = ({nombre, precio}) => {
    return (
        <section className="">
            <div className="card">
                <h2>{nombre || "NO DISPONIBLE"}</h2>
                <p className="precio">${precio || "SIN PRECIO"}</p>
                <button disabled={!nombre}>Agregar al carrito</button>
            </div>
        </section>
    )
}

export default Items