# WorkflowHub - Marketplace d'Automatisation

Une marketplace moderne pour les workflows d'automatisation prêts à l'emploi pour n8n, Make et Zapier.

## 🚀 Déploiement sur Vercel

### Méthode 1 : Déploiement via l'interface Vercel (Recommandé)

1. **Préparez votre projet** :
   - Assurez-vous que tous vos fichiers sont commités dans Git
   - Le projet doit être sur GitHub, GitLab ou Bitbucket

2. **Connectez-vous à Vercel** :
   - Allez sur [vercel.com](https://vercel.com)
   - Connectez-vous avec votre compte GitHub/GitLab/Bitbucket

3. **Importez votre projet** :
   - Cliquez sur "New Project"
   - Sélectionnez votre repository
   - Vercel détectera automatiquement qu'il s'agit d'un site statique

4. **Configurez le déploiement** :
   - Framework Preset : `Other`
   - Build Command : `npm run build` (ou laissez vide)
   - Output Directory : `.` (racine du projet)
   - Install Command : `npm install` (ou laissez vide)

5. **Déployez** :
   - Cliquez sur "Deploy"
   - Votre site sera accessible en quelques minutes

### Méthode 2 : Déploiement via CLI Vercel

1. **Installez Vercel CLI** :
   ```bash
   npm i -g vercel
   ```

2. **Connectez-vous** :
   ```bash
   vercel login
   ```

3. **Déployez** :
   ```bash
   vercel
   ```

4. **Pour les déploiements suivants** :
   ```bash
   vercel --prod
   ```

## 🛠️ Développement local

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Ou avec serve directement
npx serve .
```

## 📁 Structure du projet

```
site_workflow/
├── index.html          # Page d'accueil
├── catalog.html        # Catalogue des workflows
├── custom-order.html   # Commande personnalisée
├── blog.html          # Blog
├── faq.html           # FAQ
├── favicon.png        # Favicon PNG
├── favicon.svg        # Favicon SVG
├── vercel.json        # Configuration Vercel
├── package.json       # Configuration Node.js
└── README.md          # Documentation
```

## 🌟 Fonctionnalités

- **Design moderne** : Interface utilisateur responsive et moderne
- **Animations fluides** : Transitions et animations CSS avancées
- **SEO optimisé** : Métadonnées et structure HTML optimisées
- **Performance** : Chargement rapide et optimisation des ressources
- **Accessibilité** : Conforme aux standards d'accessibilité web

## 🔧 Configuration Vercel

Le fichier `vercel.json` configure :
- **Routes** : Redirection des URLs propres vers les fichiers HTML
- **Headers** : Sécurité et cache optimisés
- **Builds** : Configuration pour les fichiers statiques

## 📱 Responsive Design

Le site est entièrement responsive et optimisé pour :
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🎨 Technologies utilisées

- HTML5
- CSS3 (avec animations et transitions)
- JavaScript vanilla
- Font Awesome (icônes)
- Google Fonts (Inter)

## 📞 Support

Pour toute question ou problème :
- WhatsApp : [+212649557522](https://wa.me/212778630007)
- GitHub : [Abdelilah04116](https://github.com/Abdelilah04116)

---

**Développé avec ❤️ par Ourti Abdelilah** 
