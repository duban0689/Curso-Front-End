import { useState, useEffect } from 'react';


const EMPTY_PRODUCT_DATA = {
  title: '',
  description: '',
  price: 0,
  category: '',
  thumbnail: '',
};

function ProductForm({ initialData = EMPTY_PRODUCT_DATA, onSubmit, isLoading = false }) {

  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'price' ? Number(value) : value, 
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); 
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        
        {}
        <div className="form-group">
          <label htmlFor="title">Nombre del Producto:</label>
          <input
            id="title"
            name="title"
            type="text"
            className="form-control"
            value={formData.title}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
        </div>

        {}
        <div className="form-group">
          <label htmlFor="description">Descripción:</label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            disabled={isLoading}
          />
        </div>

        {}
        <div className="form-group">
          <label htmlFor="price">Precio ($):</label>
          <input
            id="price"
            name="price"
            type="number"
            className="form-control"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            disabled={isLoading}
          />
        </div>

        {}
        <div className="form-group">
          <label htmlFor="category">Categoría:</label>
          <input
            id="category"
            name="category"
            type="text"
            className="form-control"
            value={formData.category}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
        </div>

        {}
        <div className="form-group">
          <label htmlFor="thumbnail">URL de Imagen (Thumbnail):</label>
          <input
            id="thumbnail"
            name="thumbnail"
            type="url"
            className="form-control"
            value={formData.thumbnail}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>

        {}
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={isLoading}
        >
          {isLoading ? 'Guardando...' : 'Guardar Producto'}
        </button>
      </form>
    </div>
  );
}

export default ProductForm;