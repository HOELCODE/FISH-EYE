//Fonction pour cacher ou afficher la liste déroulante
const dropDown = () => {
    const button = document.querySelector('.btn-drop');
    const list = document.querySelector('.dropdown-content');
    const chevron = document.querySelector('.chevron');

    button.addEventListener('click', () => {
        if (list.style.display === 'none') {
            console.log('entrez dans dropdown pour afficher la liste');
            list.style.display = 'flex';
            chevron.classList.remove('fa-chevron-down'); 
            chevron.classList.add('fa-chevron-up');       
        } else if (list.style.display === 'flex') {
            console.log('entrez dans dropdown pour cacher la liste');
            list.style.display = 'none';
            chevron.classList.remove('fa-chevron-up');
            chevron.classList.add('fa-chevron-down');    
        }
    });
};


// Fonction pour filtrer par date
const filterDate = () => {
    const galerie = document.querySelector(".galerie");
    if (!galerie) return;

    const articles = Array.from(galerie.getElementsByClassName("galerie-article"));

    // Trie
    articles.sort((a, b) => {
        const dateA = new Date(a.querySelector(".img-photo").dataset.date);
        const dateB = new Date(b.querySelector(".img-photo").dataset.date);
        return dateB - dateA; 
    });

    // Réorganise les articles
    articles.forEach(article => galerie.appendChild(article));
};


//fonction pour filter par popularitérité
const filterPopularite = () => {
    const galerie = document.querySelector(".galerie");
    if (!galerie) return;

    const articles = Array.from(galerie.getElementsByClassName("galerie-article"));

    // Trie
    articles.sort((a, b) => {
        const likesA = parseInt(a.querySelector(".galerie-like").textContent, 10);
        const likesB = parseInt(b.querySelector(".galerie-like").textContent, 10);
        return likesB - likesA;
    });

    // Réorganise les articles
    articles.forEach(article => galerie.appendChild(article));

}

//fonction pour filter par Titre
const filterTitre = () => {
    const galerie = document.querySelector(".galerie");
    if (!galerie) return;

    const articles = Array.from(galerie.getElementsByClassName("galerie-article"));

    // Trie les articles
    articles.sort((a, b) => {
        const titleA = a.querySelector(".galerie-description").textContent.trim().toLowerCase();
        const titleB = b.querySelector(".galerie-description").textContent.trim().toLowerCase();
        return titleA.localeCompare(titleB);
    });

    // Trie
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

// Fonction pour mettre à jour la liste déroulante en masquant l'élément sélectionné
const updateFilterDropdown = () => {
    const bouton = document.getElementById("current-filter");
    const dropdown = document.querySelector("#filter-options");

    // Réinitialiser la liste des options et exclure l'élément sélectionné
    dropdown.innerHTML = `
        <li role="option"><button type="button" tabindex="-1">Popularité</button></li>
        <li role="option"><button type="button" tabindex="-1">Titre</button></li>
        <li role="option"><button type="button" tabindex="-1">Date</button></li>
    `;

    const selectedFilter = bouton.innerHTML.trim();
    const options = dropdown.querySelectorAll('button');
    options.forEach(option => {
        if (option.textContent.trim() === selectedFilter) {
            option.style.display = 'none';
        }
    });

    // Réattacher les événements aux nouveaux boutons générés
    filterPar();
};

// Fonction qui applique le filtre en fonction de l'élément cliqué
const filterBy = (filterType) => {
    const bouton = document.getElementById("current-filter");

    // Appliquer le bon filtre en fonction du texte du bouton cliqué
    if (filterType === "Popularité") {
        filterPopularite();
    } else if (filterType === "Titre") {
        filterTitre();
    } else if (filterType === "Date") {
        filterDate();
    }

    // Mettre à jour le texte du bouton principal
    bouton.innerHTML = filterType;

    // Mettre à jour la liste déroulante
    updateFilterDropdown();

    // Fermer le menu déroulant
    cacherDropdown();
};

// Fonction pour afficher en fonction de l'élément cliqué dans la liste déroulante
const filterPar = () => {
    const filtres = document.querySelectorAll(".dropdown-content button");

    filtres.forEach(filtre => {
        filtre.addEventListener("click", () => {
            const filterType = filtre.textContent.trim();
            filterBy(filterType);
        });
    });
};




//Lancement des fonctions
dropDown();
document.addEventListener("galleryLoaded", affichageChargement);
filterPar();