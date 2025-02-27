import CartWidget from "../CartWidget/CartWidget"

import './Header.css'
import DevImge from "../../assets/img/logoakatsuki.png"

const NavBar = () => {
    return (
        <>
            <header className="contenedor separacion-header">
                <div className="header contenedor-header">
                    <div className="logo">
                        <h1>AKATASUKI</h1>
                        <img src={DevImge} alt="" />
                    </div>

                    <div className="nav-widget-flex">

                        <nav>
                            <ul className="nav-principal">
                                <li>Inicio</li>
                                <li>Productos</li>
                                <li>Sobre Nosotros</li>
                                <li>Contacto</li>
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