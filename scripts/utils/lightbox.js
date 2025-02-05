let carouselData = [];
let currentIndex = 0;

// Fonction pour récupérer et stocker les médias dans un tableau
async function getImages() {
    const media = await getMedia();
    const { photographers } = await getPhotographers();
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    carouselData = media
        .filter(element => element.photographerId === parseInt(id))
        .map(element => {
            const photographer = photographers.find(p => p.id === element.photographerId);
            if (!photographer) return null;

            return {
                type: element.image ? "image" : "video",
                src: element.image ? `assets/photographes/${photographer.name}/${element.image}` : `assets/photographes/${photographer.name}/${element.video}`,
                title: element.title
            };
        })
        .filter(item => item !== null); // Supprimer les entrées nulles

    // Afficher le premier élément
    if (carouselData.length > 0) {
        updateCarousel(0);
    }
}

// Mettre à jour le carrousel
function updateCarousel(index) {
    const mediaContainer = document.querySelector(".img-title-carousel-container");
    mediaContainer.innerHTML = ""; // Vider le conteneur avant d'ajouter un nouvel élément

    if (carouselData.length === 0) return;

    const item = carouselData[index];

    let mediaElement = item.type === "image"
        ? `<img class="img-carousel" src="${item.src}" alt="${item.title}">`
        : `<video class="video-carousel" controls="false" autoplay="autoplay"><source src="${item.src}" type="video/mp4"></video>`;

    mediaContainer.innerHTML = `
        ${mediaElement}
        <span class="title-carousel">${item.title}</span>
    `;
}

// Gestion des boutons de navigation
document.querySelector(".prev-btn").addEventListener("click", () => {
    if (carouselData.length === 0) return;
    currentIndex = (currentIndex - 1 + carouselData.length) % carouselData.length;
    updateCarousel(currentIndex);
});

document.querySelector(".next-btn").addEventListener("click", () => {
    if (carouselData.length === 0) return;
    currentIndex = (currentIndex + 1) % carouselData.length;
    updateCarousel(currentIndex);
});

//Fonction pour fermer la lightbox
function closeLightBox() {
    const bouton = document.querySelector(".carousel")

    bouton.addEventListener("click", () => { // Fermer la lightbox
            bouton.style.display = "none";
    });
}

// Fonction pour ouvrir la lightbox
function openLightBox() {
    const bouton = document.querySelector(".img-title-carousel-container")

    bouton.addEventListener("click", () => { // Ouvrir la lightbox
        const lightbox = document.querySelector(".carousel");
        lightbox.style.display = "flex";
    });
}

// Charger les images au chargement de la page
getImages();
closeLightBox(); 
