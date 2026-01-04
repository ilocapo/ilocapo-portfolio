# Portfolio - Emefa Capo

**Data Analyst Portfolio** | IA & Big Data

Portfolio professionnel interactif présentant les compétences, projets et expériences d'Emefa Capo, alternante Data Analyst spécialisée en Intelligence Artificielle et Big Data.

**Site en ligne :** [https://ilocapo.github.io/ilocapo-portfolio/](https://ilocapo.github.io/ilocapo-portfolio/)

---

## Table des matières

1. [Fonctionnalités](#fonctionnalités)
2. [Technologies](#technologies)
3. [Structure du projet](#structure-du-projet)
4. [Installation locale](#installation-locale)
5. [Déploiement](#déploiement)
6. [Personnalisation](#personnalisation)
7. [Contact](#contact)

---

## Fonctionnalités

### Interface utilisateur
- Design moderne type "Data Explorer" avec thème cyberpunk/tech
- Navigation intuitive avec ancres et smooth scroll
- Responsive design optimisé pour desktop, tablette et mobile
- Animations CSS fluides et effets visuels

### Sections principales
- **Dashboard** : Page d'accueil avec statistiques animées
- **Profil** : Présentation narrative et professionnelle
- **Expériences** : Timeline interactive des expériences professionnelles
- **Projets** : Case studies détaillés avec filtres par catégorie
- **Compétences** : Graphiques interactifs et barres de progression
- **Contact** : Formulaire et liens directs

### Fonctionnalités interactives
- Compteurs animés au scroll
- Visualisation de données avec Canvas (réseau de points)
- Graphique circulaire Chart.js pour répartition des compétences
- Filtres dynamiques pour les projets (Data Analysis / IA)
- Terminal animé avec code Python
- Bouton scroll to top
- Menu hamburger mobile

---

## Technologies

### Frontend
- **HTML5** : Structure sémantique
- **CSS3** : Variables CSS, Grid, Flexbox, Animations
- **JavaScript (ES6+)** : Interactivité et animations

### Bibliothèques
- **Chart.js** : Graphiques interactifs
- **Font Awesome 6.4** : Icônes vectorielles

### Hébergement
- **GitHub Pages** : Déploiement automatique
- **Git** : Contrôle de version

---

## Structure du projet

```
Portfolio/
│
├── index.html          # Page principale
├── styles.css          # Feuille de styles CSS
├── script.js           # Scripts JavaScript
├── .nojekyll          # Désactive Jekyll pour GitHub Pages
└── README.md          # Documentation
```

---

## Installation locale

### Prérequis
- Navigateur web moderne (Chrome, Firefox, Edge, Safari)
- Éditeur de code (VS Code recommandé)

### Étapes

1. Cloner le repository
```bash
git clone https://github.com/ilocapo/ilocapo-portfolio.git
cd ilocapo-portfolio
```

2. Ouvrir le fichier `index.html` dans votre navigateur

Aucune installation de dépendances n'est nécessaire, le site utilise des CDN pour les bibliothèques externes.

---

## Déploiement

### Déploiement sur GitHub Pages

1. **Créer un repository GitHub**
   - Nom suggéré : `[username].github.io` ou `portfolio`

2. **Pousser le code**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/[username]/[repo-name].git
git push -u origin main
```

3. **Activer GitHub Pages**
   - Aller dans `Settings` > `Pages`
   - Source : `Deploy from a branch`
   - Branch : `main`
   - Folder : `/ (root)`
   - Sauvegarder

4. **Accéder au site**
   - URL : `https://[username].github.io/[repo-name]/`
   - Déploiement : 1-2 minutes

---

## Personnalisation

### Modifier les couleurs

Les couleurs sont définies dans les variables CSS au début de `styles.css` :

```css
:root {
    --primary: #00d9ff;        /* Cyan */
    --secondary: #ff006e;      /* Rose */
    --accent: #8338ec;         /* Violet */
    --bg-dark: #0a0e27;        /* Fond principal */
    --text-light: #e0e0e0;     /* Texte principal */
}
```

### Modifier le contenu

#### Informations personnelles
Fichier : `index.html`
- Section `#about` : Profil, formation, disponibilité
- Section `#experience` : Expériences professionnelles
- Section `#projects` : Projets et case studies
- Section `#skills` : Compétences techniques
- Section `#contact` : Coordonnées

#### Graphique des compétences
Fichier : `script.js` (ligne ~225)

```javascript
data: {
    labels: ['Data Analysis', 'IA & ML', 'Big Data', 'DevOps', 'Full Stack'],
    datasets: [{
        data: [30, 25, 20, 15, 10]  // Modifier les pourcentages
    }]
}
```

#### Barres de progression
Fichier : `index.html` (section Skills)

```html
<div class="skill-progress" data-progress="90"></div>  <!-- Modifier la valeur -->
```

### Ajouter des projets

Dupliquer une card `.project-card` existante et modifier :
- Icône (`project-icon`)
- Titre et description
- Case study (objectifs, méthodologie, résultats)
- Technologies (`project-tech`)
- Liens GitHub

---

## Responsive Design

### Breakpoints

- **Desktop** : > 768px
- **Mobile** : ≤ 768px

### Adaptations mobiles
- Menu hamburger
- Colonnes en vertical
- Images redimensionnées
- Textes adaptés

---

## Optimisations SEO

- Meta tags (description, keywords, Open Graph)
- Structure sémantique HTML5
- Alt text pour accessibilité
- URL canoniques
- Sitemap automatique (GitHub Pages)

---

## Contact

**Emefa Capo**  
Alternante Data Analyst | IA & Big Data

- **Email** : emefa.capo@gmail.com
- **LinkedIn** : [linkedin.com/in/emefacapo](https://www.linkedin.com/in/emefacapo/)
- **GitHub** : [github.com/ilocapo](https://github.com/ilocapo)
- **Portfolio** : [ilocapo.github.io/ilocapo-portfolio](https://ilocapo.github.io/ilocapo-portfolio/)

---

## Licence

Ce projet est libre d'utilisation pour un usage personnel et éducatif.

**Développé avec passion par Emefa Capo** | 2026
# ilocapo-portfolio
# ilocapo-portfolio
