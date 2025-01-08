# Prompts ChatGPT (ordre chronologique)
- https://chatgpt.com/share/677ea35c-81cc-800f-898f-a5f906081a5f
- https://chatgpt.com/share/677ea3a3-5b28-800f-8c59-6d7726990d58
- https://chatgpt.com/share/677ea3b7-4978-800f-aedb-0ad3007d8ccd
# Demandes initiales au LLM :
## Créer un spalsh screen
Demande à partir de "rien", en expliquant le contexte (app React Native), mais uniquement le splash screen (pas mentionné le reste)
- Résultat moyen, mais ça vient sûrement du tel / build
    - Le temps de chargement après le build de l'app dépasse parfois le temps d'affichage du splash, et ne l'affiche donc pas ou trop peu.
    - Le llm avait un bon début avec le app.json, mais il a fallu remplacer les images par défaut par l'image souhaitée (solution non proposée par LLM)
## Affichage de la couleur en fonction de la batterie
En conservant le contexte précédent, demande de l'utilisation d'une couleur en fonction du pourcentage de batterie restant.
- En premier, utilisation d'un useState avec une valeur fixe (c'est pas une solution)
- Après explications supplémentaires, récupération de la batterie et condition OK. Problème de passer la couleur dans les enfants -> Solutions proposés par Chat bien plus tard : props (compliqué) ou dans le contexte (plus simple et mis en place)
## Création de la navbar
Dans une nouvelle conv à cause de GPT 4 -> Redonner le minimum de contexte (Appli React Native)
Demander de créer une navbar avec les trois éléments (chat, chien, quitter), mais sans implémenter ces éléments.
- Problème avec Expo qui ne trouvait plus index.tsx -> Pas de solution de Chat, donc chat.tsx est renommé index.tsx
## Onglet Chat (image)
Demande de création d'une vue simple avec une image de chat en local.
- L'import de l'image ne fonctionnait pas directement, mais une petite modification de l'import et l'image s'affiche
## Onglet Chien (image)
Demande de création d'une vue simple avec une image de chien depuis une API (choix libre)
- Tout fonctionne directement.
## Onglet Quit
Demande d'une vue simple permettant de quitter l'app
- OK, mais demande une confirmation, mais après tout why not ?
## Onglet Chat (Son)
Demande d'ajouter un son (en local) au clic sur l'image du chat.
- En quelques prompts, utilisation d'Expo-av avec TouchableOpacity + un son rejouable plusieurs fois
## Onglet Chien (SMS)
Demande d'envoyer (seulement préparer) un SMS à un tel
- Très fluide, fonctionne directement sans vraie retouche
## Onglet map
Demande de créer une carte qui affiche la pos de l'utilisateur centrée, et d'inclure deux points (Paris et Nice => Toulon s'est transformé en Nice)
- Au début : Affiche trois points au lieu de deux points 'invisibles' et la localisation
- Ensuite : Affiche les deux points et la loc correctement.
    - N'arrive pas à centrer la carte sur l'utilisateur
## Onglet compteur
Dans un nouveau Chat (encore 4o), redéfinition du contexte minimal (React Native / Expo - Vue chat et chien avec trigger existant), demande de prendre en compte le nombre de click sur les images et de les afficher dans une autre page.
- LLM à proposé l'utilisation d'un contexte pour passer des useState aux vues concernées. Mis à jour plus tard pour inclure la couleur de fond
## SafeArea
Demande d'ajouter une safeArea pour toutes les pages
- Ajout dans le _layout.tsx principal
## Persistance clicks
Demande de persister les clicks (fichier appContext.tsx donné en 'contexte')
- Mauvaise utilisation de l'async storage -> Correction manuelle.
## Carte
Nouvelle tentative pour la carte (centrer sur l'utilisateur)
- Sans succès
## Couleurs (batterie)
Tentative d'utilisation des props, sans succès
