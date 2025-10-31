import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import ProductListPage from './pages/ProductListPage.jsx';
import NewProductPage from './pages/NewProductPage.jsx';
import EditProductPage from './pages/EditProductPage.jsx';
import './App.css';

function App() {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('https://dummyjson.com/products?limit=100');
        if (!response.ok) {
          throw new Error('Error al cargar los productos');
        }
        const data = await response.json();
        setProducts(data.products); 
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const contextValue = { products, setProducts, loading, setLoading, error, setError };

  return (
    <BrowserRouter>
      <Routes>
        {}
        {}
        <Route path="/" element={<Layout contextValue={contextValue} />}>
          
          {}
          <Route index element={<ProductListPage />} /> {}
          <Route path="new" element={<NewProductPage />} /> {}
          <Route path="edit/:productId" element={<EditProductPage />} /> {}
          
          {}
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;