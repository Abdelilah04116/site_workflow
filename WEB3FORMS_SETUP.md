# Configuration Web3Forms pour l'envoi d'emails

## 🚀 Guide de configuration

### Étape 1 : Obtenir une clé d'accès Web3Forms

1. **Allez sur [Web3Forms](https://web3forms.com/)**
2. **Cliquez sur "Get Access Key"**
3. **Entrez votre email** (abdelilahourti@gmail.com)
4. **Copiez la clé d'accès** générée

### Étape 2 : Configurer l'email de réception

1. **Dans votre boîte email** (abdelilahourti@gmail.com)
2. **Vérifiez l'email de confirmation** de Web3Forms
3. **Cliquez sur le lien de confirmation**

### Étape 3 : Mettre à jour le code

Remplacez `YOUR_WEB3FORMS_KEY` dans le fichier `custom-order.html` par votre vraie clé :

```html
<input type="hidden" name="access_key" value="VOTRE_CLE_REELLE_ICI">
```

### Étape 4 : Test du formulaire

1. **Déployez le site** sur Vercel
2. **Testez le formulaire** de commande personnalisée
3. **Vérifiez que l'email arrive** dans votre boîte

## 📧 Configuration avancée

### Personnalisation de l'email

Vous pouvez personnaliser le format de l'email en modifiant le template dans le JavaScript :

```javascript
formData.append('message', `
    Nouvelle demande de workflow personnalisé

    Nom : ${name}
    Email : ${email}
    Plateforme : ${platform}
    Description du besoin : ${description}
    Budget estimé : ${budget}
    Date de demande : ${new Date().toLocaleString('fr-FR')}
`);
```

### Ajout de champs supplémentaires

Pour ajouter de nouveaux champs, ajoutez-les dans le HTML et dans le message :

```html
<div class="form-group">
    <label for="telephone">Téléphone</label>
    <input type="tel" id="telephone" name="telephone">
</div>
```

## 🔧 Alternative : Solution mailto

Si vous préférez une solution plus simple, vous pouvez utiliser le protocole `mailto` :

```javascript
const mailtoLink = `mailto:abdelilahourti@gmail.com?subject=Nouvelle demande workflow - ${platform}&body=${encodeURIComponent(message)}`;
window.location.href = mailtoLink;
```

Cette solution ouvre le client email par défaut de l'utilisateur.

## 📞 Support

Pour toute question :
- Email : abdelilahourti@gmail.com
- WhatsApp : +212778630007
- GitHub : [Abdelilah04116](https://github.com/Abdelilah04116)

---

**Note :** Web3Forms est gratuit pour jusqu'à 250 emails par mois. Pour plus d'emails, des options payantes sont disponibles.
