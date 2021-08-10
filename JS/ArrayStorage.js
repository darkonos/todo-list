'use strict';/* Projet TODO Formation Javascript complète */ // Stockage local de nos taches dans le navigateur (Eviter que les tâches disparaissent à la fermeture du navigateur)
//On peut utiliser cette classe pour dautres projets pour gérer un stockage local qui utilise des tableaux
function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function _defineProperties(a,b){for(var c,d=0;d<b.length;d++)c=b[d],c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(a,c.key,c)}function _createClass(a,b,c){return b&&_defineProperties(a.prototype,b),c&&_defineProperties(a,c),a}var ArrayStorage=/*#__PURE__*/function(){//Appel du constructeur pour initialiser l'objet avec le nom de la cé et son contenu (valeur)
function a(b){_classCallCheck(this,a),this.name=b,this.list=this.get()}/*L'API web Storage ne permet d'enregistrer que des string en tant que valeur et non des tableaux. Il faudra transformer à
      chaque fois les données du tableau en string en utilisant l'objet JSON qui possède deux méthodes :
      - stringify() et parse() : permet de transformer n'importe quel entité Javascript en string et vice et versa */ /* Quand on crée un nouvelle instance de la class ArrayStorage, on utilise directement la méthode get() pour stocker au niveau
       de la propriété list le contenu qui se trouve actuellement stocké sur le navigateur du visiteur. On veut donc récupérer les
       taches deja présent sur le navigateur du visiteur avant que ce dernier quitte le site la dernière fois.
       1. On regarde s'il éxiste au niveau du stockage local une clé correspondant à la clé qui est sensé contenir les différentes
          valeurs. Si cette clé n'éxiste pas, ça veut dire que le visiteur n'a jamais enregistré de taches sur le site. Il faudra donc
          créé une nouvelle clé au niveau du stockage qui va contenir un string mais qui en réalité est un tableau vide tranformé en string. */ //Méthode get() pour récupérer un tableau de valeurs de notre liste de tâches ou par défaut, le créer pour stocker nos tâches  
return _createClass(a,[{key:"get",value:function get(){/* l'objet JSON permet de manipuler des données au format json et la méthode parse() permet de retransformer 
           le string '[]' en tableau javascript 
           On indique ensuite la clé this.name et ca va venir récupérer au niveau du stockage local la valeur associé à la clé this.name 
           et grace à la méthode parse() on va la transformé en tableau Javascript */return localStorage.getItem(this.name)||localStorage.setItem(this.name,"[]"),JSON.parse(localStorage.getItem(this.name))}//Méthode set() pour ajouter une nouvelle valeur dans le tableau(en cliquant sur le bouton ADD)
},{key:"set",value:function set(a){this.list.push(a),localStorage.setItem(this.name,JSON.stringify(this.list))}//Méthode remove() pour supprimer une valeur du tableau (en cliquant sur REMOVE)
},{key:"remove",value:function remove(a){var b=this.list.indexOf(a);//La méthode indexOf() permet de récupérer l'indice d'une valeur qu'on passera en paramètre
this.list.splice(b,1),localStorage.setItem(this.name,JSON.stringify(this.list))}//Méthode clear() pour vider tout le tableau
},{key:"clear",value:function clear(){localStorage.removeItem(this.name)}}]),a}();