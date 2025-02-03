// Fonction pour compter le nombre de likes présent dans la galerie
function countLikes() { 
    const likes = document.querySelectorAll(".galerie-like");
    const totalLikes = document.querySelector(".like-total");

    let total = 0;
    likes.forEach(like => {
        total += parseInt(like.textContent);
    });
    totalLikes.innerHTML = total;
}

// Fonction pour ajouter un like sur une image de la galerie
function addLike() {
    const boutonLike = document.querySelectorAll(".galerie-likes .fa-solid");
    const likes = document.querySelectorAll(".galerie-like");

    boutonLike.forEach((like, index) => {
        like.addEventListener("click", () => {
            let currentLikes = parseInt(likes[index].textContent, 10);
            // Si currentLikes n'est pas un nombre, on initialise à 0
            if (isNaN(currentLikes)) {
                currentLikes = 0;
            }
            likes[index].textContent = currentLikes + 1;
            countLikes();
        });
    });
}


// Exécution de la fonction après un délai de 5 secondes
setTimeout(countLikes, 1500);
setTimeout(addLike, 1500);
