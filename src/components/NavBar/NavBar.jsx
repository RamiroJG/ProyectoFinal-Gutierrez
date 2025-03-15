import CartWidget from "../CartWidget/CartWidget"

import './Header.css'
import DevImge from "../../assets/img/logoakatsuki.png"
import { Link } from "react-router-dom"

const NavBar = () => {
    return (
        <>
            <header className="contenedor separacion-header">
                <div className="header contenedor-header">
                    <div className="logo">
                        <h1>AKATSUKI</h1>
                        <img src={DevImge} alt="" />
                    </div>

                    <div className="nav-widget-flex">

                        <nav>
                            <ul className="nav-principal">
                                <Link to='/'>Inicio</Link>
                                <Link to='/produtos'>Productos</Link>
                                <Link to='/nosotros'>Sobre Nosotros</Link>
                                <Link to='/contacto'>Contacto</Link>
                            </ul>
                        </nav>

                        <CartWidget />
                    </div>
                </div>
            </header>
        </>
    )
}

export default NavBar