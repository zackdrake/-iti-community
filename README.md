# ItiSocialApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.5.

## Démarrage
- installer la Angular CLI `npm install -g @angular/cli`
- exécuter `npm install` pour installer les modules
- exécuter `ng serve` pour lancer le serveur de développement
- lancer le serveur node iti-network-server ainsi que la base de données Neo4j
- ouvrir chrome à l'adresse [`http://localhost:4200`](http://localhost:4200)

## Outils
- installer le plugin chrome [augury](https://chrome.google.com/webstore/detail/augury/elgalmkoelokbchhkhacckoklkejnhcd)
- installer le plugin VS CODE [angular2-snipet](https://marketplace.visualstudio.com/items?itemName=johnpapa.Angular2)

## Documentation
- [Angular](https://angular.io/docs)
- [Librairie de composant](https://ng.ant.design/docs/introduce/en)
- [Icones](https://fontawesome.com/icons?d=gallery&m=free)

## TP

### Register

#### Level I

1. Faire le formulaire pour l'ajout d'un user
2. Rendre username et le mot de passe obligatoire
3. En cas de succès, rediriger l'utilisateur sur /login

#### Level II
4. Afficher les messages d'erreurs de validation pour le mot de passe
5. Vérifier si le username est disponible. Informer l'utilisateur de l'indisponibilité d'un username.


### Login

#### Level I

1. Faire le formulaire de login
2. Rendre username et le mot de passe obligatoire
3. Rediriger l'utilisateur sur "/" en cas de succès

#### Level II

4. Afficher les messages d'erreurs de validation pour chaque champs
5. Afficher un message si le login à échoué


### Channel

#### Level I

1. Afficher la liste des channels dans le menu
2. Naviguer sur un channel au clic dans le menu

#### Level II

3. Pouvoir créer un nouveau channel
4. Sélectionner par défaut le premier channel de la liste
5. Ajouter ajouter les nouveaux channels dynamiquement

### Post

### Level I

1. Afficher les posts reçues pour le channel courant
2. Afficher l'auteur des messages
3. Afficher la date du posts
4. Insérer les nouveaux posts reçues via WebSocket
5. Afficher une image si le message contient une url vers une image
6. Afficher une video si le message contient une url vers une vidéo (https://www.html5rocks.com/en/tutorials/video/basics/devstories.mp4)
7. Afficher le player de youtube si le message contient un lien youtube
8. Ajouter le bouton like

### Level II
9. Retirer les urls des messages parsés pour ne restituer que son contenu

### Level III
10. Pouvoir parser plusieurs type de contenus dans un seul post
11. Remplacer les liens http par des balises <a>...</a>.

### Commentaires

### Level I
1. Pouvoir commenter un post
2. Afficher les commentaires d'un post 
3. Afficher l'auteur du commentaires
4. Insérer les nouveaux commentaires reçues via WebSocket

### Level II
5. Parser les commentaires comme les posts : extraire les images, vidéos...

### Activités et notifications 

### Level I
1. Créer un NotificationService
2. Lister les activités dans le menu à droite
3. Ajouter une activté lors d'un nouveau post via le NotificationService
4. Ajouter une activté lors d'un commentaire sur un post via le NotificationService
5. Ajouter une activté lorsqu'un membre se connecte via le NotificationService
6. Ajouter une activité lors d'un like via le NotificationService
7. Ajouter une activité lors de l'ajout d'un channel via le NotificationService

### Level II
8. Afficher [une popup de notification](https://ng.ant.design/components/notification/en) pour chaque nouvelle activité
9. Persister les activités dans le [localStorage](https://developer.mozilla.org/fr/docs/Web/API/Window/localStorage) de façon à pouvoir les récupérer au realod de la page

### Level III
10. Créer un service permettant de poster des [notifications web](https://developer.mozilla.org/fr/docs/Web/API/notification/Using_Web_Notifications) 
11. N'afficher les notifications Web que si la page n'est pas visible grâce à l'évènement [visibilitychange](https://developer.mozilla.org/en-US/docs/Web/Events/visibilitychange)
12. Si l'activité concerne un post (nouveau post, commentaire sur un post, like d'un post) rendre l'activité clicable. 
Le clic doit rediriger sur le bon channel et scroller jusqu'au post concerné

## Aide 

> Internal Server Error => APIError: connect ECONNREFUSED 127.0.0.1:7474
La base de donnée Neo4j n'a pas été lancée

> Failed to load resource: net::ERR_CONNECTION_REFUSED
Le serveur ```node-social-server``` n'a pas été lancé

> EXCEPTION: Uncaught (in promise): Response with status: 401 Unauthorized
Le client n'a pas été authentifié

> Uncaught Error: Template parse errors: 'nom du composant' is not a known element
Le composant n'a probablement pas été importé dans le module, dans la section "declarations"

> Pour tout autre problème : appeler le prof