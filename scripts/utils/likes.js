// Fonction pour compter le nombre de likes présent dans la galerie et l'ajouter dans le bloque en bas de la page
const countLikes = () => { 
    const likes = document.querySelectorAll(".galerie-like");
    const totalLikes = document.querySelector(".like-total");

    let total = 0;
    likes.forEach(like => {
        total += parseInt(like.textContent) || 0;
    });
    totalLikes.innerHTML = total;
}

// Fonction qui gère l'ajout ou le retrait d'un like
const handleLikeToggle = (like, index, likes) => {
    let currentLikes = parseInt(likes[index].textContent, 10) || 0;

    if (like.classList.contains("liked")) {
        // Retirer le like
        likes[index].textContent = Math.max(0, currentLikes - 1);
        like.classList.remove("liked", "fa-solid");
        like.classList.add("fa-regular");
    } else {
        // Ajouter le like
        likes[index].textContent = currentLikes + 1;
        like.classList.add("liked", "fa-solid");
        like.classList.remove("fa-regular");
    }

    countLikes();
};

// Fonction qui initialise les événements pour le like
const toggleLike = () => {
    const likes = document.querySelectorAll(".galerie-like");
    const likeButtons = document.querySelectorAll(".heart-container");
    const likeIcons = document.querySelectorAll(".heart-container i");

    likeButtons.forEach((button, index) => {
        // Ajout de l'événement click
        button.addEventListener("click", () => handleLikeToggle(likeIcons[index], index, likes));

        // Ajout de l'événement keydown pour Enter
        button.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") { // Ajout de la touche "Espace" pour l'accessibilité
                event.preventDefault(); // Empêche le scroll lors de l’appui sur "Espace"
                handleLikeToggle(likeIcons[index], index, likes);
            }
        });
    });
};

// Lancer les fonctions
document.addEventListener("galleryLoaded", () => {
    countLikes();
    toggleLike();
});

