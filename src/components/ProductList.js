import React, { useContext } from 'react';
import { ThemeContext } from '../App';
import { LanguageContext } from '../contexts/LanguageContext';
import useProductSearch from '../hooks/useProductSearch';

const ProductList = ({ searchTerm }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  // Exercice 2.1 - Utiliser le LanguageContext pour les traductions
  const { t } = useContext(LanguageContext);
  
  const { 
    products, 
    loading, 
    error,
    // Exercice 4.1 - Récupérer la fonction de rechargement
    reloadProducts,
    // Exercice 4.2 - Récupérer les fonctions et états de pagination
    currentPage,
    totalPages,
    nextPage,
    previousPage
  } = useProductSearch(searchTerm);
  
  if (loading) return (
    <div className="text-center my-4">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">{t('loading')}</span>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="alert alert-danger" role="alert">
      {t('error')} {error}
    </div>
  );
  
  return (
    <div>
      {/* Exercice 4.1 - Ajouter le bouton de rechargement */}
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-primary" onClick={reloadProducts}>
          {t('reload')}
        </button>
      </div>
      
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {products.map(product => (
          <div key={product.id} className="col">
            <div className={`card h-100 ${isDarkTheme ? 'bg-dark text-light' : ''}`}>
              {product.thumbnail && (
                <img 
                  src={product.thumbnail} 
                  className="card-img-top" 
                  alt={product.title}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">
                  <strong>{t('price')} </strong>
                  {product.price}€
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Exercice 4.2 - Ajouter les contrôles de pagination */}
      <nav className="mt-4">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={previousPage}>
              {t('previous')}
            </button>
          </li>
          <li className="page-item">
            <span className="page-link">
              {t('page')} {currentPage} {t('of')} {totalPages}
            </span>
          </li>
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button className="page-link" onClick={nextPage}>
              {t('next')}
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ProductList;