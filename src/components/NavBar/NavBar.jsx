import Widgets from "../Widgets/Widgets"

import './Header.css'
import DevImge from "../../assets/img/dev.png"

const NavBar = () => {
    return (
        <>
            <header className="text-center header-principal">
                <span className="barra-header-horizontal"></span>
                <span className="firma">RGJ</span>
                <span className="barra-header-vertical"></span>
                <div className="header contenedor-header">
                    <div className="logo">
                        <img src={DevImge} alt="" />
                        <h1>Mate & Code</h1>
                    </div>

                    <nav>
                        <ul className="nav-principal">
                            <li>Inicio</li>
                            <li>Productos</li>
                            <li>Sobre Nosotros</li>
                            <li>Contacto</li>
                        </ul>
                    </nav>

                    <Widgets />
                </div>
            </header>
        </>
    )
}

export default NavBar