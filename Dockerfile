# Utiliser une image Nginx légère
FROM nginx:alpine

# Copier les fichiers statiques dans le répertoire par défaut de Nginx
COPY . /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]