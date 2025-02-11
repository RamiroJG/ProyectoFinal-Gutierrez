import Widgets from "../Widgets/Widgets"

import './Header.css'

const NavBar = () => {
    return (
        <>
            <header className="header contenedor text-center">
                <div className="logo">
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

            </header>
        </>
    )
}

export default NavBar