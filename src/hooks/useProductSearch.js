import { useState, useEffect, useCallback } from 'react';

// TODO: Exercice 3.1 - Créer le hook useDebounce
// TODO: Exercice 3.2 - Créer le hook useLocalStorage

const useProductSearch = (searchTerm = '') => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Exercice 4.2 - Ajouter l'état pour la pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(9); // Nombre de produits par page

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Exercice 4.2 - Modifier l'URL pour inclure les paramètres de pagination
      const response = await fetch(`https://api.daaif.net/products?delay=1000&page=${currentPage}&limit=${limit}`);
      if (!response.ok) throw new Error('Erreur réseau');
      const data = await response.json();
      setProducts(data.products);
      setTotalPages(Math.ceil(data.total / limit));
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, [currentPage, limit]); // Exercice 4.2 - Ajouter les dépendances pour la pagination

  // Charger les produits au montage du composant et quand la page change
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Filtrer les produits en fonction du terme de recherche
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => 
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

  // Exercice 4.1 - Ajouter la fonction de rechargement
  const reloadProducts = () => {
    fetchProducts();
  };
  
  // Exercice 4.2 - Ajouter les fonctions pour la pagination
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return { 
    products: filteredProducts, 
    loading, 
    error,
    // Exercice 4.1 - Retourner la fonction de rechargement
    reloadProducts,
    // Exercice 4.2 - Retourner les fonctions et états de pagination
    currentPage,
    totalPages,
    nextPage,
    previousPage
  };
};

export default useProductSearch;