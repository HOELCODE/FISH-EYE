//Fonction pour cacher ou afficher la liste déroulante
const dropDown = () => {
    const button = document.querySelector('.btn-drop');
    const list = document.querySelector('.dropdown-content');
    const chevron = document.querySelector('.chevron');

    button.addEventListener('click', () => {
        if (list.style.display === 'none') {
            list.style.display = 'flex';
            chevron.classList.remove('fa-chevron-down');
            chevron.classList.add('fa-chevron-up');
        } else if (list.style.display === 'flex') {
            list.style.display = 'none';
            chevron.classList.remove('fa-chevron-up');
            chevron.classList.add('fa-chevron-down');
        }
    });
}

// Fonction pour filtrer par date
const filterDate = () => {
    const galerie = document.querySelector(".galerie");
    if (!galerie) return;

    // Récupère tous les articles et les convertit en tableau
    const articles = Array.from(galerie.getElementsByClassName("galerie-article"));

    // Trie les articles du plus récent au plus ancien
    articles.sort((a, b) => {
        const dateA = new Date(a.querySelector(".img-photo").dataset.date);
        const dateB = new Date(b.querySelector(".img-photo").dataset.date);
        return dateB - dateA; // Tri décroissant (du plus récent au plus ancien)
    });

    // Réorganise les articles dans la div "galerie"
    articles.forEach(article => galerie.appendChild(article));
};


//fonction pour filter par popularitérité
const filterPopularite = () => {
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
const filterTitre = () => {
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

//fonction pour fermer la liste déroulante après un click
const cacherDropdown = () => {
    const list = document.querySelector('.dropdown-content');
    const chevron = document.querySelector('.chevron');
    
    list.style.display = 'none';
    chevron.classList.remove('fa-chevron-up');
    chevron.classList.add('fa-chevron-down');
}

//Fonction affichage au chargement
const affichageChargement = () => {
    const option = document.getElementById('current-filter');
    const dropdown = document.querySelector('.dropdown-content');
    option.innerHTML = 'Popularité';
    dropdown.style.display = 'none';
    filterPopularite();
}

//Fonction pour afficher en fonction de l'élément cliqué dans la liste déroulante
// Fonction pour afficher en fonction de l'élément cliqué dans la liste déroulante
const filterPar = () => {
    const bouton = document.getElementById("current-filter");
    const filtres = document.querySelectorAll(".dropdown-content button");

    filtres.forEach(filtre => {
        filtre.addEventListener("click", () => {
            const filterType = filtre.textContent.trim();

            if (filterType === "Popularité") {
                bouton.innerHTML = "Popularité";
                filterPopularite();
            } else if (filterType === "Titre") {
                bouton.innerHTML = "Titre";
                filterTitre();
            } else if (filterType === "Date") {
                bouton.innerHTML = "Date";
                filterDate();
            }

            cacherDropdown();
        });
    });
};


//Lancement des fonctions
dropDown();
document.addEventListener("galleryLoaded", affichageChargement);
filterPar();