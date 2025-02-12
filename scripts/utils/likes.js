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

// Fonction pour ajouter ou retirer un like sur une image de la galerie
const toggleLike = () => {
    const boutonLike = document.querySelectorAll(".galerie-likes .fa-solid");
    const likes = document.querySelectorAll(".galerie-like");

    boutonLike.forEach((like, index) => {
        like.addEventListener("click", () => {
            let currentLikes = parseInt(likes[index].textContent, 10) || 0;
            
            if (like.classList.contains("liked")) {
                // Retirer le like
                likes[index].textContent = Math.max(0, currentLikes - 1);
                like.classList.remove("liked");
            } else {
                // Ajouter le like
                likes[index].textContent = currentLikes + 1;
                like.classList.add("liked");
            }

            countLikes();
        });
    });
}

// Lancer les fonctions
document.addEventListener("galleryLoaded", () => {
    countLikes();
    toggleLike();
});

