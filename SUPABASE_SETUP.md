# 🗄️ Configuration Supabase pour WorkflowHub

## 📋 **Étapes pour configurer la base de données**

### 1. **Créer un compte Supabase**
- Allez sur [supabase.com](https://supabase.com)
- Cliquez sur "Start your project"
- Connectez-vous avec GitHub ou créez un compte

### 2. **Créer un nouveau projet**
- Cliquez sur "New Project"
- Choisissez votre organisation
- Donnez un nom : `workflowhub-db`
- Créez un mot de passe fort pour la base de données
- Choisissez une région proche (Europe)
- Cliquez sur "Create new project"

### 3. **Créer la table users**
- Dans votre projet Supabase, allez dans **SQL Editor**
- Cliquez sur **"New query"**
- Copiez et collez le contenu du fichier `database/schema.sql`
- Cliquez sur **"Run"**

### 4. **Récupérer les clés API**
- Allez dans **Settings** → **API**
- Copiez :
  - **Project URL** (ex: `https://abcdefghijklmnop.supabase.co`)
  - **anon public** key (commence par `eyJ...`)

### 5. **Configurer les variables d'environnement Vercel**

#### Option A : Via l'interface Vercel
1. Allez sur [vercel.com](https://vercel.com)
2. Sélectionnez votre projet `site-workflow`
3. Allez dans **Settings** → **Environment Variables**
4. Ajoutez ces variables :
   - `SUPABASE_URL` = votre Project URL
   - `SUPABASE_ANON_KEY` = votre anon public key

#### Option B : Via Vercel CLI
```bash
vercel env add SUPABASE_URL
vercel env add SUPABASE_ANON_KEY
```

### 6. **Tester l'API**
- Déployez votre projet : `vercel --prod`
- Testez l'API : `https://votre-site.vercel.app/api/users`
- Vous devriez voir : `{"success":true,"users":[]}`

## 🔍 **Vérifier que tout fonctionne**

### 1. **Dans Supabase Dashboard**
- Allez dans **Table Editor**
- Vous devriez voir la table `users`
- Elle sera vide au début

### 2. **Sur votre site**
- Visitez votre site
- Entrez un email dans la popup d'authentification
- Allez dans **Table Editor** de Supabase
- Vous devriez voir l'utilisateur apparaître !

### 3. **API Endpoints disponibles**
- `POST /api/users` - Créer/mettre à jour un utilisateur
- `GET /api/users` - Récupérer tous les utilisateurs

## 📊 **Données collectées**

Chaque utilisateur aura :
- **ID** : Identifiant unique
- **Email** : Adresse email
- **Joined at** : Date d'inscription
- **Last visit** : Dernière visite
- **Visit count** : Nombre de visites
- **Created at** : Date de création
- **Updated at** : Date de mise à jour

## 🔒 **Sécurité**

- Les emails sont stockés de manière sécurisée
- Row Level Security (RLS) est activé
- Seules les opérations autorisées sont permises

## 🚨 **En cas de problème**

1. **Vérifiez les variables d'environnement** dans Vercel
2. **Vérifiez que la table existe** dans Supabase
3. **Consultez les logs** dans Vercel Dashboard
4. **Testez l'API** directement avec Postman ou curl

## 📞 **Support**

Si vous avez des questions, consultez :
- [Documentation Supabase](https://supabase.com/docs)
- [Documentation Vercel](https://vercel.com/docs)
