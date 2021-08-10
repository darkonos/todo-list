'use strict';// Notre application TODO LIST
// 1. DOM selection des id dans le html
var list=document.getElementById("list"),input=document.getElementById("input"),add=document.getElementById("add"),clear=document.getElementById("clear"),url=document.getElementById("url"),load=document.getElementById("load"),storage=new ArrayStorage("tasks"),tasks=storage.list;// 3. Fonction qui ajoute les tâches au DOM avec un boutton(REMOVE) de suppression auquel on attache un évènement
function taskToDOM(a){//On vérifie si on a une chaine de caractère non-vide dans task
if("string"==typeof a&&a){// 3.1 Création des éléments html (li) pour les ajouter dans notre ul (id= list)
var b=document.createElement("li"),c=document.createElement("button");//Création d'un élément de liste
//Ajout de li devant le premier enfant de list
return b.textContent=a,c.textContent="REMOVE",c.addEventListener("click",function(){var a=c.parentNode.firstChild.textContent;storage.remove(a),list.removeChild(c.parentNode)}),b.appendChild(c),list.insertBefore(b,list.firstChild),!0;//Si tout s'est passé correctement
}return!1;//Return une erreur Si task n'est pas un string ou bien si elle est vide
}// 2. On ajoute chaque tâches à la liste à puces (méthode traditionelle)
// for(let i = 0; i < tasks.length; i++) 
// {
//    taskToDOM(tasks[i]); //Envoi comme argument tasks[i] en paramètre à la fonction taskToDOM()
// }
// 2. On ajoute chaque tâches à la liste à puces  (méthode foreach) pour optimiser le code
tasks.forEach(function(a){return taskToDOM(a)});// 4. Gestion des évènements pour ajouter une nouvelle tâche à l'aide du bouton ADD
//Fonction qui gère l'ajout de tâche avec le bouton ADD et la touche 'Enter'
function newTask(){-1===storage.list.indexOf(input.value)&&taskToDOM(input.value)&&(storage.set(input.value),input.value=""),input.focus()}//4.1 Ajout d'un évènement pour ajouter une tâche à l'aide du bouton ADD
//On supprime la liste du DOM et du navigateur
//On gère l'importation des taches
add.addEventListener("click",newTask),input.addEventListener("keydown",function(a){"Enter"===a.key&&newTask()}),clear.addEventListener("click",function(){storage.clear(),list.innerHTML=""}),load.addEventListener("click",function(){fetch(url.value).then(function(a){if(a.ok)return a.json();throw new Error("".concat(a.statusText," (").concat(a.status,")"))}).then(function(a){if(Array.isArray(a))return void a.forEach(function(a){-1===storage.list.indexOf(a)&&taskToDOM(a)&&storage.set(a)});throw new TypeError("La r\xE9ponse n'est pas un tableau JSON (type : ")})});