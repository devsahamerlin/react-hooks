import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../App';
import { LanguageContext } from '../contexts/LanguageContext';
import useDebounce from '../hooks/useDebounce';

const ProductSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { isDarkTheme } = useContext(ThemeContext);
  // Exercice 2.1 - Utiliser le LanguageContext
  const { t } = useContext(LanguageContext);
  
  // Exercice 1.2 - Utiliser le hook useDebounce
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  
  useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch]);
  
  return (
    <div className="mb-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={t('searchPlaceholder')}
        className={`form-control ${isDarkTheme ? 'bg-dark text-light' : ''}`}
      />
    </div>
  );
};

export default ProductSearch;