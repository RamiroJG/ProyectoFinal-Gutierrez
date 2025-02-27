import NavBar from './components/NavBar/NavBar'

import './App.css'
import ItemListContainer from './components/ItemListContainer/ItemListContainer'
import Hero from './components/Hero/Hero'

const App = () => {
  return (
    <>
      {/* Fondo con el patron de las nubes */}
      <div className="bg-patron">
        {/* Capa de patrón de nubes */}
        <div className="cloud-pattern"></div>

        {/* Nubes flotantes */}
        <div className="floating-clouds"></div>

        {/* Efecto de blur */}
        <div className="blur-effect"></div>

        {/* Contenido principal */}
        <div className="main-content">
          <NavBar />
          <Hero />
        </div>
        <ItemListContainer greetings={"Bienvenido a AKATSUKI!"} />
      </div>
    </>
  )
}

export default App