import { useOutletContext, useNavigate } from 'react-router-dom';
import ProductForm from '../components/ProductForm.jsx';
import { useState } from 'react';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function NewProductPage() {
  const { setProducts } = useOutletContext();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = async (formData) => {
    setIsLoading(true);
    await sleep(1000);
    
    setProducts(prevProducts => {
      const newId = Math.max(...prevProducts.map(p => p.id)) + 1;
      const newProduct = {
        ...formData,
        id: newId,
      };
      return [newProduct, ...prevProducts];
    });

    setIsLoading(false);
    navigate('/');
  };

  return (
    <>
      <div className="page-header">
        <h2 className="page-title">Añadir Nuevo Producto</h2>
      </div>
      {}
      <ProductForm 
        onSubmit={handleCreate} 
        isLoading={isLoading} 
      />
    </>
  );
}

export default NewProductPage;