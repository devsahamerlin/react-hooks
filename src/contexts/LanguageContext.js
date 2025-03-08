import { createContext } from 'react';

export const translations = {
  fr: {
    title: "Catalogue de Produits",
    searchPlaceholder: "Rechercher un produit...",
    loading: "Chargement...",
    error: "Erreur:",
    price: "Prix:",
    reload: "Recharger",
    previous: "Précédent",
    next: "Suivant",
    page: "Page",
    of: "sur",
    darkMode: "Mode sombre",
    lightMode: "Mode clair"
  },
  en: {
    title: "Product Catalog",
    searchPlaceholder: "Search for a product...",
    loading: "Loading...",
    error: "Error:",
    price: "Price:",
    reload: "Reload",
    previous: "Previous",
    next: "Next",
    page: "Page",
    of: "of",
    darkMode: "Dark mode",
    lightMode: "Light mode"
  }
};

export const LanguageContext = createContext({
  language: 'fr',
  setLanguage: () => {},
  t: (key) => translations.fr[key] || key
});