// App.jsx
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import ItemListContainer from './components/ItemListContainer/ItemListContainer'
import Hero from './components/Hero/Hero'

import './App.css'

const App = () => {
  return (
    <>
      {/* Fondo con el patrón de nubes */}
      <div className="bg-patron">
        <div className="cloud-pattern"></div>
        <div className="floating-clouds"></div>
        <div className="blur-effect"></div>
        <div className="main-content">
          <NavBar />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <ItemListContainer />
                </>
              }
            />
            {/* <Route
              path="/categoria/:categoria"
              element={
                <>
                  <Hero />
                  <ItemListContainer />
                </>
              }
            /> */}
            <Route path="*" element={<h2>404 - Página no encontrada</h2>} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
