import { getMedia, getPhotographers } from "../pages/photographer.js";

let carouselData = [];
let currentIndex = 0;

// Fonction pour récupérer et stocker les médias dans un tableau
const getImages = async () => {
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
};

// Mettre à jour le carrousel
const updateCarousel = (index) => {
    const mediaContainer = document.querySelector(".img-title-carousel-container");
    mediaContainer.innerHTML = ""; // Vider le conteneur avant d'ajouter un nouvel élément

    if (carouselData.length === 0) return;

    const item = carouselData[index];
    currentIndex = index;

    let mediaElement = item.type === "image"
        ? `<img class="img-carousel" src="${item.src}" alt="${item.title}">`
        : `<video class="video-carousel" controls autoplay><source src="${item.src}" type="video/mp4"></video>`;

    mediaContainer.innerHTML = `
        ${mediaElement}
        <span class="title-carousel">${item.title}</span>
    `;
};

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

// Écoute des touches du clavier pour la navigation et fermeture
const keyboardNavigation = (event) => {
    if (carouselData.length === 0) return;

    switch (event.key) {
        case "ArrowLeft":
            currentIndex = (currentIndex - 1 + carouselData.length) % carouselData.length;
            updateCarousel(currentIndex);
            break;

        case "ArrowRight":
            currentIndex = (currentIndex + 1) % carouselData.length;
            updateCarousel(currentIndex);
            break;

        case "Escape":
            closeLightBox();
            break;
    }
};

// Fonction pour fermer la lightbox et désactiver le clavier
const closeLightBox = () => {
    const lightBox = document.querySelector("#lightbox");
    const carousel = document.querySelector(".carousel");

    lightBox.classList.remove("lightbox-open");
    carousel.classList.remove("carousel-open");
    carousel.classList.add("carousel-close");

    // Retirer l'écouteur clavier pour éviter les conflits
    document.removeEventListener("keydown", keyboardNavigation);
};

// Fonction pour ouvrir la lightbox avec l'image cliquée et activer le clavier
const openLightBox = (index) => {
    const carousel = document.querySelector(".carousel");
    const lightBox = document.querySelector("#lightbox");

    lightBox.classList.add("lightbox-open");
    carousel.classList.remove("carousel-close");
    carousel.classList.add("carousel-open");
    updateCarousel(index);

    // Ajouter l'écouteur clavier quand la lightbox est ouverte
    document.addEventListener("keydown", keyboardNavigation);
};


// Ajouter l'écouteur d'événements aux images de la galerie
const setupImageClickEvents = () => {
    const articleItems = document.querySelectorAll(".galerie-link");

    articleItems.forEach((element) => {
        ["click", "keydown"].forEach(eventType => {
            element.addEventListener(eventType, (event) => {
                if (eventType === "click" || (eventType === "keydown" && (event.key === "Enter" || event.key === " "))) {
                    event.preventDefault(); // Empêche le défilement avec la barre espace

                    // Vérifier si c'est une image ou une vidéo
                    const mediaElement = element.querySelector("img, video");
                    const titre = mediaElement.tagName === "IMG" ? mediaElement.alt : mediaElement.getAttribute("data-title");

                    // Trouver l'index correspondant dans le tableau
                    const index = carouselData.findIndex(item => item.title === titre);
                    if (index !== -1) {
                        openLightBox(index);
                    }
                }
            });
        });
    });
};

// Lancer les fonctions
document.addEventListener("galleryLoaded", () => {
    getImages().then(setupImageClickEvents);
});
document.querySelector(".close-btn").addEventListener("click", closeLightBox);

