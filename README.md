# TP Angular - Formulaires
## Gestion des étudiants et intervenants

**1. Créer un nouveau site Angular baptisé *angular-form***

**2. Créer 2 composants :**
* *FormComponent* : qui contiendra le formulaire pour créer ou modifier une personne
* *ListComponent* : qui contiendra la liste des personnes

Ces 2 composants seront intégrés au sein du composant *AppComponent*

**3. Créer un service *PersonsService* contenant :**
* La liste des personnes (étudiants et intervenants)
* Une méthode pour récupérer la liste des personnes
* Une méthode pour ajouter une nouvelle personne dans la liste
* Une méthode pour modifier une personne
* Une méthode pour supprimer une personne

Ce service sera injecté au sein des 2 composants *FormComponent* et *ListComponent*

**4. Formulaire de gestion des personnes (*FormComponent*)**
* A l’aide des [Reactive Forms](https://angular.io/guide/reactive-forms#reactive-forms) et notamment du service [FormBuilder](https://angular.io/guide/reactive-forms#generating-form-controls-with-formbuilder), créer le formulaire qui contiendra 4 champs
  * Nom : requis, entre 3 et 50 caractères
  * Prénom : requis, entre 3 et 50 caractères
  * Rôle : requis
  * Promotion : facultatif

* Le champ Promotion sera affiché si, et seulement si, le champ radio Elève est coché

* Un bouton Ajouter permet à l’utilisateur d’ajouter une nouvelle personne dans la liste

* Ce bouton doit être désactivé si les règles ci-dessus ne sont pas respectées

* Au niveau du template HTML,
  * Rôle : choix possible entre « Etudiant » et « Intervenant »
  * Promotion : facultatif, choix possible entre « L1 », « L2 », « L3 », « M1 », « M2 »

**5. Liste des personnes (*ListComponent*)**
* Créer un tableau ayant 5 colonnes :
  * Une colonne avec un en-tête « Nom Prénom »
  * Une colonne avec un en-tête « Rôle »
  * Une colonne avec un en-tête « Promotion »
  * 1 bouton qui permettra d’éditer un étudiant
  * 1 bouton qui permettra de supprimer un étudiant

* Si l’utilisateur souhaite modifier les informations d’un étudiant,
  * Les informations de ce dernier seront reprises dans les champs de saisie
  * Le bouton Ajouter changera de libellé pour devenir Modifier
  * Les modifications seront sauvegardées uniquement quand l’utilisateur cliquera sur le bouton Modifier

* Le bouton Effacer permettra de retirer un étudiant de la liste
