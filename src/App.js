import React, { createContext, useState, useCallback } from 'react';
import ProductList from './components/ProductList';
import ProductSearch from './components/ProductSearch';
import ThemeToggle from './components/ThemeToggle';
import LanguageSelector from './components/LanguageSelector';

// Exercice 2.1 - Créer le LanguageContext
import { LanguageContext, translations } from './contexts/LanguageContext';

export const ThemeContext = createContext();

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  // Exercice 2.2 - Ajouter l'état pour la langue
  const [language, setLanguage] = useState('fr');

  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  // Fonction pour obtenir la traduction
  const t = useCallback((key) => {
    return translations[language][key] || key;
  }, [language]);

  return (
    <ThemeContext.Provider value={{ isDarkTheme, setIsDarkTheme }}>
      <LanguageContext.Provider value={{ language, setLanguage, t }}>
        <div className={`container ${isDarkTheme ? 'bg-dark text-light' : 'bg-light'}`}>
          <header className="my-4">
            <h1 className="text-center">{t('title')}</h1>
            <div className="d-flex justify-content-end gap-2">
              <ThemeToggle />
              {/* Exercice 2.2 - Ajouter le sélecteur de langue */}
              <LanguageSelector />
            </div>
          </header>
          <main>
            <ProductSearch onSearch={handleSearch} />
            <ProductList searchTerm={searchTerm} />
          </main>
        </div>
      </LanguageContext.Provider>
    </ThemeContext.Provider>
  );
};

export default App;