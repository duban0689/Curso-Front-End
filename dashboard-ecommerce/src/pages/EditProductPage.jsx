import { useOutletContext, useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ProductForm from '../components/ProductForm.jsx';

function EditProductPage() {
  const { setProducts } = useOutletContext();
  const { productId } = useParams(); 
  const navigate = useNavigate();
  
  const [productData, setProductData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProductData() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://dummyjson.com/products/${productId}`);
        if (!response.ok) {
          throw new Error('Producto no encontrado o error de red.');
        }
        const data = await response.json();
        setProductData(data); 
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProductData();
  }, [productId]); 

  const handleUpdate = (formData) => {
    setProducts(prevProducts => 
      prevProducts.map(p => 
        p.id === Number(productId) 
          ? { ...p, ...formData }
          : p
      )
    );
    
    navigate('/'); 
  };

  if (error) {
    return <div className="error-message">Error: {error.message}</div>;
  }

  if (isLoading || productData === null) {
    return <div className="loading-message">Cargando datos del producto...</div>;
  }
  
  return (
    <>
      <div className="page-header">
        <h2 className="page-title">Editar Producto: {productData.title}</h2>
      </div>
      <ProductForm 
        onSubmit={handleUpdate} 
        initialData={productData}
      />
    </>
  );
}

export default EditProductPage;