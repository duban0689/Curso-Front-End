import { useOutletContext, Link } from 'react-router-dom';
import { useState } from 'react';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function ProductListPage() {
  const { products, setProducts, loading, setLoading, error, setError } = useOutletContext();
  
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (productId) => {
    if (!window.confirm("¿Seguro que quieres eliminar este producto?")) {
      return;
    }

    try {
      setDeletingId(productId);
      setError(null); 
      setLoading(true); 
      
      await sleep(1500);
      
      const willFail = Math.random() < 0.4;
      if (willFail) {
        throw new Error("Error de red simulado! No se pudo conectar con el servidor.");
      }
      
      setProducts(prevProducts => 
        prevProducts.filter(p => p.id !== productId) 
      );
      
    } catch (err) {
      console.error("Error simulado:", err.message);
      setError(err);
    } finally {
      setLoading(false); 
      setDeletingId(null);
    }
  };

  if (loading && products === null) {
    return <div className="loading-message">Cargando productos iniciales...</div>;
  }
  
  if (error && products === null) {
    return <div className="error-message">Error: {error.message}. Intenta recargar la página.</div>;
  }

  return (
    <>
      <div className="page-header">
        <h2 className="page-title">Inventario de Productos ({products?.length || 0})</h2>
        <Link to="/new" className="btn btn-primary">
          Añadir Nuevo Producto
        </Link>
      </div>

      {error && <div className="alert alert-danger">Error al realizar la operación: {error.message}</div>}

      <div className="product-table-wrapper">
        <table className="product-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products && products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>
                  {}
                  <img 
                    src={product.thumbnail || 'placeholder.jpg'} 
                    alt={product.title} 
                    className="product-thumbnail" 
                  />
                </td>
                <td>{product.title}</td>
                <td>{product.category}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>
                  <Link 
                    to={`/edit/${product.id}`} 
                    className="btn btn-edit"
                  >
                    Editar
                  </Link>
                  <button
                    className="btn btn-delete"
                    onClick={() => handleDelete(product.id)}
                    disabled={deletingId === product.id}
                  >
                    {deletingId === product.id ? 'Eliminando...' : 'Eliminar'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ProductListPage;