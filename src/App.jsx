import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Hero from './components/Hero/Hero';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetail from './components/ItemDetail/ItemDetail';
import Cart from './components/Cart/Cart';
import CheckoutForm from './components/CheckoutForm/CheckoutForm';
import NotFound from './components/NotFound/NotFound';
import './App.css';

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
        path="/cart"
        element={
          <Layout>
            <Cart />
          </Layout>
        }
      />
      <Route
        path="/checkout"
        element={
          <Layout>
            <CheckoutForm />
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
  );
};

export default App;
