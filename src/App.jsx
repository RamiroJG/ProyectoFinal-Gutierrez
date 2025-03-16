import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Hero from './components/Hero/Hero'
import ItemListContainer from './components/ItemListContainer/ItemListContainer'
import ItemDetail from './components/ItemDetail/ItemDetail'
import './App.css'
import NotFound from './components/NotFound/NotFound'

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Hero />
            <ItemListContainer />
          </Layout>
        }
      />
      <Route
        path="/categoria/:categoria"
        element={
          <Layout>
            <Hero />
            <ItemListContainer />
          </Layout>
        }
      />
      <Route
        path="/detalle/:id"
        element={
          <Layout>
            <ItemDetail />
          </Layout>
        }
      />
      <Route
        path="*"
        element={
          <Layout>
            <NotFound />
          </Layout>
        }
      />
    </Routes>
  )
}

export default App
