// fonction pour afficher au chargement Popularité
function affichageChargement() {
    const option = document.getElementById('current-filter');
    const dropdown = document.querySelector('.dropdown-content');
    option.innerHTML = 'Popularité';
    dropdown.style.display = 'none';
}

// fonction pour afficher et cacher la liste déroulante
function affichaggeDropdown() {
    const button = document.querySelector('.btn-drop');
    const list = document.querySelector('.dropdown-content');
    const chevron = document.querySelector('.chevron');

    //condition pour verifier si chevron contient la classe fa-chevron-up
    button.addEventListener('click', () => {

        if (chevron.classList.contains('fa-chevron-up')) {
            list.style.display = 'flex';
            button.classList.add('down');
            chevron.classList.remove('fa-chevron-up');
            chevron.classList.add('fa-chevron-down');
        } else {
            list.style.display = 'none';
            button.classList.remove('down');
            chevron.classList.remove('fa-chevron-down');
            chevron.classList.add('fa-chevron-up');
        }
    });
}

//Fonction pour afficher en fonction de l'élément cliqué dans la liste déroulante
function filterPar() {
    const bouton = document.querySelector("")
}

//fonction pour filter par popularitérité
function filterPopularite() {
    const galerie = document.querySelector(".galerie");
    if (!galerie) return;

    // Récupère les articles et convertit la collection en tableau
    const articles = Array.from(galerie.getElementsByClassName("galerie-article"));

    // Trie les articles du plus populaire au moins populaire
    articles.sort((a, b) => {
        const likesA = parseInt(a.querySelector(".galerie-like").textContent, 10);
        const likesB = parseInt(b.querySelector(".galerie-like").textContent, 10);
        return likesB - likesA;
    });

    // Réorganise les articles dans la div en les réinsérant dans le nouvel ordre
    articles.forEach(article => galerie.appendChild(article));
}

//fonction pour filter par Titre
function filterTitre() {
    const galerie = document.querySelector(".galerie");
    if (!galerie) return;

    // Récupère tous les articles et les convertit en tableau
    const articles = Array.from(galerie.getElementsByClassName("galerie-article"));

    // Trie les articles par ordre alphabétique en se basant sur la description
    articles.sort((a, b) => {
        const titleA = a.querySelector(".galerie-description").textContent.trim().toLowerCase();
        const titleB = b.querySelector(".galerie-description").textContent.trim().toLowerCase();
        return titleA.localeCompare(titleB);
    });

    // Réorganise les articles dans la div "galerie"
    articles.forEach(article => galerie.appendChild(article));
}


//déclaration des fonctions
setTimeout(filterPopularite, 1500);
setTimeout(filterTitre, 10000);
affichageChargement();
affichaggeDropdown();