'use strict'

/* Projet TODO Formation Javascript complète */

// Stockage local de nos taches dans le navigateur (Eviter que les tâches disparaissent à la fermeture du navigateur)

//On peut utiliser cette classe pour dautres projets pour gérer un stockage local qui utilise des tableaux

class ArrayStorage {
    //Appel du constructeur pour initialiser l'objet avec le nom de la cé et son contenu (valeur)
    constructor(name) { //On lui donne le nom de la clé qui correspond à l'élément qui est stocké localement pour notre liste de tâches
         this.name = name;
         this.list = this.get() //Utilisation de la méthode get() pour stocker au niveau de la propriété list le contenu (les taches) qui se trouve stocké sur le navigateur du visiteur 
    }

    
    /*L'API web Storage ne permet d'enregistrer que des string en tant que valeur et non des tableaux. Il faudra transformer à
      chaque fois les données du tableau en string en utilisant l'objet JSON qui possède deux méthodes :
      - stringify() et parse() : permet de transformer n'importe quel entité Javascript en string et vice et versa */

    /* Quand on crée un nouvelle instance de la class ArrayStorage, on utilise directement la méthode get() pour stocker au niveau
       de la propriété list le contenu qui se trouve actuellement stocké sur le navigateur du visiteur. On veut donc récupérer les
       taches deja présent sur le navigateur du visiteur avant que ce dernier quitte le site la dernière fois.
       1. On regarde s'il éxiste au niveau du stockage local une clé correspondant à la clé qui est sensé contenir les différentes
          valeurs. Si cette clé n'éxiste pas, ça veut dire que le visiteur n'a jamais enregistré de taches sur le site. Il faudra donc
          créé une nouvelle clé au niveau du stockage qui va contenir un string mais qui en réalité est un tableau vide tranformé en string. */

    //Méthode get() pour récupérer un tableau de valeurs de notre liste de tâches ou par défaut, le créer pour stocker nos tâches  
    get() {
        if (! localStorage.getItem(this.name)) { //La méthode getItem() permet de récupérer une valeur par rapport à la clé qu'on a renseigné en argument
            
            //Si on entre dans le if, c'est qu'il n'éxiste pas de clé (name) qu'on a renseigné au niveau du constructeur
            //La méthode setItem() permet de créer une clé (this.name) associé à une valeur '[]' un tableau transformé en string
            localStorage.setItem(this.name, '[]') 
        }
        /* l'objet JSON permet de manipuler des données au format json et la méthode parse() permet de retransformer 
           le string '[]' en tableau javascript 
           On indique ensuite la clé this.name et ca va venir récupérer au niveau du stockage local la valeur associé à la clé this.name 
           et grace à la méthode parse() on va la transformé en tableau Javascript */
        return JSON.parse(localStorage.getItem(this.name)) 
    }

    //Méthode set() pour ajouter une nouvelle valeur dans le tableau(en cliquant sur le bouton ADD)
    set(value) {
        this.list.push(value) //On ajoute au tableau une nouvelle valeur en utilisant la méthode push()
        localStorage.setItem(this.name, JSON.stringify(this.list)) //On écrase l'ancienne valeur par la nouvelle valeur grace à la propriété list
    }

    //Méthode remove() pour supprimer une valeur du tableau (en cliquant sur REMOVE)
    remove(value) {
        const index = this.list.indexOf(value) //La méthode indexOf() permet de récupérer l'indice d'une valeur qu'on passera en paramètre
        this.list.splice(index, 1) //La méthode splice() permet de supprimer des éléments
        localStorage.setItem(this.name, JSON.stringify(this.list)) //On met à jour et supprime la valeur du tableau
    }
    
    //Méthode clear() pour vider tout le tableau
    clear() {
        localStorage.removeItem(this.name)
    }
}