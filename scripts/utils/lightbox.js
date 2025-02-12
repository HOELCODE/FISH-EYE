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

    // Afficher le premier élément
    if (carouselData.length > 0) {
        updateCarousel(0);
    }
}

// Mettre à jour le carrousel
const updateCarousel = (index) => {
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
const closeLightBox = () => {
    const bouton = document.querySelector(".close-btn");
    const lightbox = document.querySelector(".carousel");

    bouton.addEventListener("click", () => { 
        lightbox.classList.remove("carousel-open");
        lightbox.classList.add("carousel-close");
    });
}

// Fonction pour ouvrir la lightbox
const openLightBox = () => {
    const carousel = document.querySelector(".carousel");
    const articleImages = document.querySelectorAll(".galerie-link");

    articleImages.forEach((element) => {
        element.addEventListener('click', () => {
            carousel.classList.remove("carousel-close");
            carousel.classList.add("carousel-open");
        });
    });
};

// Lancer les fonctions
document.addEventListener("galleryLoaded", () => {
    openLightBox();
});
getImages();
closeLightBox();

