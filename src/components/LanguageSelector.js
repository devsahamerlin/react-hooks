import React, { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';
import { ThemeContext } from '../App';

const LanguageSelector = () => {
  const { language, setLanguage } = useContext(LanguageContext);
  const { isDarkTheme } = useContext(ThemeContext);
  
  return (
    <select 
      value={language}
      onChange={(e) => setLanguage(e.target.value)}
      className={`form-select form-select-sm ${isDarkTheme ? 'bg-dark text-light' : ''}`}
      style={{ width: 'auto' }}
    >
      <option value="fr">Français</option>
      <option value="en">English</option>
    </select>
  );
};

export default LanguageSelector;