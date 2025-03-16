import { Link } from "react-router-dom"
import narutoConfundido from "../../assets/img/narutoconfundido.jpg"
import "./NotFound.css"

const NotFound = () => {
    return (
        <div className="not-found-content">
            <div className="error-code">404</div>

            <div className="error-image">
                <img src={narutoConfundido} alt="Naruto confundido" className="naruto-image" />
            </div>

            <h1 className="error-title">¡Jutsu de página no encontrada!</h1>

            <p className="error-message">
                Parece que te has perdido en el camino ninja. La página que buscas no existe o ha sido movida a otra aldea.
            </p>

            <div className="error-actions">
                <Link to="/" className="home-button">
                    Volver al inicio
                </Link>

                <button onClick={() => window.history.back()} className="back-button">
                    Regresar
                </button>
            </div>

            <div className="ninja-quote">
                "Aquellos que abandonan a sus amigos son peor que escoria, pero aquellos que abandonan una página 404 sin
                volver al inicio son aún peores." - Kakashi Hatake (probablemente)
            </div>
        </div>
    )
}

export default NotFound