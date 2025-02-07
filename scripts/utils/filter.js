//Fonction affichage au chargement
const affichageChargement = () => {
    const option = document.getElementById('current-filter');
    const dropdown = document.querySelector('.dropdown-content');
    option.innerHTML = 'Popularité';
    dropdown.style.display = 'none';
    filterPopularite();
}

window.onload = function () {
    affichageChargement();
};

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
            console.log("rentré dans if");
        } else if (list.style.display === 'flex') {
            console.log("rentré dans else")
            list.style.display = 'none';
            chevron.classList.remove('fa-chevron-up');
            chevron.classList.add('fa-chevron-down');
        }
    });
}

dropDown();

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

//Fonction pour afficher en fonction de l'élément cliqué dans la liste déroulante
const filterPar = () => {
    const bouton = document.querySelector("#current-filter");
    const filtre = document.querySelector(".dropdown-content button");

    //ecouter le click sur filtre
    filtre.addEventListener("click", () => {

        if (bouton.textContent.includes("Popularité")) {
            bouton.innerHTML = "Titre";
            filtre.innerHTML = "Popularité";
            filterTitre();
            cacherDropdown();
        } else {
            bouton.innerHTML = "Popularité";
            filtre.innerHTML = "Titre";
            filterPopularite();
            cacherDropdown();
        }
    });
}

filterPar();