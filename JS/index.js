'use strict'

// Notre application TODO LIST


// 1. DOM selection des id dans le html

const list = document.getElementById('list');
const input = document.getElementById('input');
const add = document.getElementById('add');
const clear = document.getElementById('clear');
const url = document.getElementById('url');
const load = document.getElementById('load');

// 5. Création nouvelle instance pour la clé 'tasks' à partir de la class ArrayStorage
const storage = new ArrayStorage('tasks')

// 5.1. On récupère le tableau des tâches deja existantes ou un tableau vide
const tasks = storage.list

// 3. Fonction qui ajoute les tâches au DOM avec un boutton(REMOVE) de suppression auquel on attache un évènement
function taskToDOM(task) {
 
     //On vérifie si on a une chaine de caractère non-vide dans task
     if(typeof task === 'string' && task)
     {
         // 3.1 Création des éléments html (li) pour les ajouter dans notre ul (id= list)
         const li = document.createElement('li'); //Création d'un élément de liste
         const remove = document.createElement('button'); //Création d'un button pour supprimer la tâche créé
        
 
         li.textContent = task;  //Ajout du texte à li
         remove.textContent = 'REMOVE'; //On nomme le button

         // 3.2 Ajout d'un évènement au bouton (remove)
         remove.addEventListener('click', () => {
            const value = remove.parentNode.firstChild.textContent
            storage.remove(value)
            list.removeChild(remove.parentNode); //On supprime l'élément parent de remove (li)
         });
 
         li.appendChild(remove); //Ajout de remove en tant enfant à li
         list.insertBefore(li, list.firstChild); //Ajout de li devant le premier enfant de list

         return true //Si tout s'est passé correctement
     }

        return false //Return une erreur Si task n'est pas un string ou bien si elle est vide
}

// 2. On ajoute chaque tâches à la liste à puces (méthode traditionelle)
// for(let i = 0; i < tasks.length; i++) 
// {
//    taskToDOM(tasks[i]); //Envoi comme argument tasks[i] en paramètre à la fonction taskToDOM()

// }

// 2. On ajoute chaque tâches à la liste à puces  (méthode foreach) pour optimiser le code
tasks.forEach(task => taskToDOM(task));

// 4. Gestion des évènements pour ajouter une nouvelle tâche à l'aide du bouton ADD

//Fonction qui gère l'ajout de tâche avec le bouton ADD et la touche 'Enter'
function newTask() {
    if (storage.list.indexOf(input.value) === -1 && taskToDOM(input.value)) {
        storage.set(input.value)
        input.value = '' //on vide le champ input
    }
    input.focus(); //La méthode focus() permet à un élément de prendre le focus et le garder
}

//4.1 Ajout d'un évènement pour ajouter une tâche à l'aide du bouton ADD
add.addEventListener('click', newTask)
input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        newTask();
    }
})

//On supprime la liste du DOM et du navigateur
clear.addEventListener('click', () => {
    storage.clear()
    list.innerHTML = ''
})

//On gère l'importation des taches
load.addEventListener('click', () => {
    fetch(url.value)
    .then(response => {
        if (response.ok) {
            return response.json()
        }
        throw new Error(`${response.statusText} (${response.status})`)
    })
    .then(tasks => {
        if (Array.isArray(tasks)) {
          tasks.forEach(task => {
            if (storage.list.indexOf(task) === -1 && taskToDOM(task)) {
                storage.set(task)
               
            }
          })  
          return 
        }
        throw new TypeError(`La réponse n'est pas un tableau JSON (type : `)
    })
})