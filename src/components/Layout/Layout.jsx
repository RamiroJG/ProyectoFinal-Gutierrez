import React from 'react'
import NavBar from '../NavBar/NavBar'

const Layout = ({ children }) => {
    return (
        <div className="bg-patron">
            <div className="cloud-pattern"></div>
            <div className="floating-clouds"></div>
            <div className="blur-effect"></div>
            <div className="main-content">
                {/* NavBar va aquí si quieres que aparezca en todas las rutas */}
                <NavBar/>

                {/* El contenido dinámico de cada ruta se inyecta acá */}
                {children}
            </div>
        </div>
    )
}

export default Layout
