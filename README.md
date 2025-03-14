# TP React Hooks - Application de Gestion de Produits

Ce TP a pour objectif de mettre en pratique l'utilisation des Hooks React (useState, useEffect, useContext) ainsi que la création de Hooks personnalisés.

## Installation et configuration initiale

1. Cloner le dépôt :
```bash
git clone https://github.com/pr-daaif/tp-react-hooks.git
cd tp-react-hooks
```

2. Créer votre propre dépôt sur Github et changer le remote :
```bash
# Supprimer le remote origine
git remote remove origin

# Ajouter votre nouveau remote
git remote add origin https://github.com/[votre-username]/tp-react-hooks.git

# Premier push
git push -u origin main
```

3. Installer les dépendances :
```bash
npm install
```

4. Lancer l'application :
```bash
npm start
```

## Instructions pour le TP

Pour chaque exercice :
1. Lisez attentivement l'énoncé
2. Implémentez la solution
3. Testez votre implémentation (pensez à faire des copies d'écran)
4. Mettez à jour la section correspondante dans ce README avec :
   - Une brève explication de votre solution
   - Des captures d'écran montrant le fonctionnement
   - Les difficultés rencontrées et comment vous les avez résolues
5. Commitez vos changements avec un message descriptif

### Exercice 1 : État et Effets 
#### Objectif : Implémenter une recherche en temps réel

- [ ] 1.1 Modifier le composant ProductSearch pour utiliser la recherche
- [ ] 1.2 Implémenter le debounce sur la recherche
- [ ] 1.3 Documenter votre solution ici

_Votre réponse pour l'exercice 1 :_
```
Expliquez votre solution ici:
Documentation de la solution
1-Ajouté un système de recherche qui filtre les produits en fonction du terme saisi
2- Implémenté un hook personnalisé useDebounce pour éviter de déclencher trop de recherches pendant la saisie
3- Connecté le composant ProductSearch au reste de l'application via les props et useEffect
4- Ajouté une fonction pour filtrer les produits dans le hook useProductSearch

Le debounce permet d'améliorer les performances en attendant que l'utilisateur finisse de taper avant de lancer la recherche.

[Ajoutez vos captures d'écran]
```
<img src="images/recherche-1.png" width="260"/><img src="images/recherche-2.png" width="260"/><img src="images/recherche-3.png" width="260"/>

### Difficultés rencontrées :

1. **Communication entre composants** : La difficulté principale était de faire communiquer le composant `ProductSearch` avec le reste de l'application pour que le terme de recherche puisse filtrer les produits. **Solution** : J'ai utilisé une fonction de callback `onSearch` depuis le composant parent (`App`) vers `ProductSearch`. 

2. **Mise à jour excessive lors de la saisie** : Chaque frappe de clavier déclenchait une mise à jour du filtre, ce qui pouvait causer des problèmes de performance. **Solution** : Implémentation du hook `useDebounce` qui retarde l'exécution de la recherche jusqu'à ce que l'utilisateur ait arrêté de taper, réduisant ainsi le nombre de rendus inutiles.

3. **Logique de filtrage des produits** : Déterminer où placer la logique de filtrage entre le composant et le hook. **Solution** : J'ai placé la logique de filtrage dans le hook `useProductSearch` plutôt que dans le composant, ce qui maintient une meilleure séparation des préoccupations et rend le code plus modulaire.

   

### Exercice 2 : Context et Internationalisation

#### Objectif : Gérer les préférences de langue

- [ ] 2.1 Créer le LanguageContext
- [ ] 2.2 Ajouter le sélecteur de langue
- [ ] 2.3 Documenter votre solution ici

_Votre réponse pour l'exercice 2 :_
```
Documentation de la solution
1- J'ai créé un LanguageContext qui contient:
   - La langue actuelle
   - La fonction pour changer de langue
   - Un helper de traduction t()
   - Un objet de traductions pour français et anglais

2- Ajouté un sélecteur de langue permettant de basculer entre français et anglais
3- Implémenté les traductions dans les composants à l'aide du hook useContext
4- Traduit les éléments textuels comme les titres, les messages d'erreur, et les placeholders

Cette solution permet une gestion centralisée des traductions et facilite l'ajout de nouvelles langues dans le futur.

[Ajoutez vos captures d'écran]
```
<img src="images/french.png" width="400"/><img src="images/english.png" width="400"/>

### Difficultés rencontrées :

1. **Structure des traductions** : Organiser les traductions de manière à les rendre facilement accessibles et maintenables. **Solution** : J'ai créé un objet de traductions structuré par langue puis par clé, facilitant l'ajout de nouvelles langues ou textes à traduire.
2. **Accès aux traductions dans les composants imbriqués** : Comment rendre les traductions disponibles à travers toute l'application sans passer par les props. **Solution** : Utilisation de l'API Context de React (`createContext`, `useContext`) pour fournir les traductions à tous les composants sans avoir à passer des props à travers tous les niveaux intermédiaires.
3. **Mise à jour dynamique de la langue** : Assurer que tous les composants sont réactifs au changement de langue. **Solution** : J'ai encapsulé la fonction de traduction `t()` dans un `useCallback` qui dépend de la langue sélectionnée, garantissant que tous les composants utilisant cette fonction se mettront à jour automatiquement lors d'un changement de langue.



### Exercice 3 : Hooks Personnalisés

#### Objectif : Créer des hooks réutilisables

- [ ] 3.1 Créer le hook useDebounce
- [ ] 3.2 Créer le hook useLocalStorage
- [ ] 3.3 Documenter votre solution ici

_Votre réponse pour l'exercice 3 :_
```
Documentation de la solution:
1- Implémenté le hook useDebounce(nous l'avions deja fais a l'excercice 1) qui permet de retarder l'exécution d'une action (ici la recherche) jusqu'à ce que l'utilisateur ait fini de taper
2- Créé le hook useLocalStorage qui:
   - Persiste les valeurs dans localStorage
   - Fournit une API similaire à useState
   - Gère la synchronisation entre les onglets/fenêtres
   - Gère les erreurs de sérialisation/désérialisation

3- Utilisé useLocalStorage pour persister les préférences utilisateur (thème et langue)

Ces hooks personnalisés améliorent l'expérience utilisateur en:
   - Réduisant les requêtes inutiles avec useDebounce
   - Conservant les préférences entre les sessions avec useLocalStorage

[Ajoutez vos captures d'écran]
```
<img src="images/localstorage.png" width="500"/>

### Difficultés rencontrées :

1. **Conception du hook useDebounce** : Déterminer la bonne approche pour implémenter le debounce avec les hooks React. **Solution** : J'ai utilisé une combinaison de `useState` et `useEffect` avec `setTimeout` et `clearTimeout` pour créer un mécanisme qui retarde la mise à jour d'une valeur.
2. Persistance et synchronisation dans useLocalStorage: Gérer à la fois la persistance des données et la synchronisation entre différents onglets ou fenêtres. **Solution**:
   - Pour la persistance : Utilisation de `window.localStorage` avec parsing JSON
   - Pour la synchronisation : Utilisation de l'événement `storage` de window pour détecter les changements dans d'autres onglets



### Exercice 4 : Gestion Asynchrone et Pagination

#### Objectif : Gérer le chargement et la pagination

- [ ] 4.1 Ajouter le bouton de rechargement
- [ ] 4.2 Implémenter la pagination
- [ ] 4.3 Documenter votre solution ici

_Votre réponse pour l'exercice 4 :_
```
Documentation de la solution:
1- Ajouté un bouton de rechargement pour rafraîchir les données:
   - Création d'une fonction reloadProducts qui réinitialise l'état et relance la requête
   - Ajout d'un bouton dans l'interface qui appelle cette fonction
   - Traduction du bouton selon la langue sélectionnée

2- Implémenté la pagination:
   - Ajout des états pour la page courante et le nombre total de pages
   - Modification de la requête API pour inclure les paramètres de pagination
   - Ajout des fonctions nextPage et previousPage pour la navigation
   - Création des contrôles de pagination dans l'interface
   - Désactivation des boutons quand on atteint la première ou dernière page
   - Traduction des éléments de pagination

3- Cette implémentation permet:
   - Une meilleure gestion des grands ensembles de données
   - Une réduction du temps de chargement initial
   - Une navigation intuitive entre les pages de résultats
   - La possibilité de recharger les données en cas de mise à jour côté serveur

[Ajoutez vos captures d'écran]
```
<img src="images/page-1-avec-bouton-recharger-french.png" width="260"/><img src="images/page-4-avec-bouton-reload-english.png" width="260"/><img src="images/derniere-page.png" width="260"/>

### Difficultés rencontrées :

1. **Fonction de rechargement** : Permettre le rechargement des données sans dupliquer la logique de récupération. **Solution** : J'ai extrait la récupération des données dans une fonction `fetchProducts` à l'aide de `useCallback`, puis j'ai exposé cette fonction via `reloadProducts` pour permettre un rechargement manuel.

2. Implémentation de la pagination : Gérer correctement les états locaux de pagination et les synchroniser avec les requêtes API. **Solution** :

   - Ajout d'états pour gérer la page courante et le nombre total de pages
   - Mise à jour de l'URL de l'API pour inclure les paramètres de pagination
   - Création de fonctions de navigation (`nextPage`, `previousPage`) avec gestion des limites

   

## Rendu

- Ajoutez l'URL de votre dépôt Github dans  **Classroom** et envoyer la réponse dès le démarage de votre projet.
- Les push doivent se faire au fûr et à mesure que vous avancez dans votre projet.
- Le README.md doit être à jour avec vos réponses et captures d'écran. 
- Chaques exercice doit faire l'objet d'au moins un commit avec un message mentionnant le numéro de l'exercice.