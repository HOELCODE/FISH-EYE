import { createDomHeader, createDomGalerie, createDomGalerieVideo } from '../templates/photographerTemplate.js';

// fonction pour récupérer les datas
export const getPhotographers = async () => {
    try {
        const response = await fetch('data/photographers.json');
        if (!response.ok) {
            throw new Error("Pas de réponse");
        }
        return await response.json();
    } catch (error) {
        console.error("Erreur lors du fetch", error);
    }
}

// fonction pour récupérer uniquement les medias
export const getMedia = async () => {
    try {
        const response = await fetch('data/photographers.json');
        if (!response.ok) {
            throw new Error("Pas de réponse");
        }
        const data = await response.json();
        return data.media;  // Retourner uniquement la partie media
    } catch (error) {
        console.error("Erreur lors du fetch", error);
    }
}

//Fonction pour associer la bonne galerie en fonction de l'id du photographe
export const getGalerie = async () => {
    const media = await getMedia();
    const { photographers } = await getPhotographers();
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    media.forEach(element => {
        if (element.photographerId === parseInt(id)) {
            // Récupérer le photographe correspondant
            const photographer = photographers.find(p => p.id === element.photographerId);
            if (!photographer) return;

            // Si c'est une image, on l'affiche normalement
            if (element.image && element.image !== undefined) {
                createDomGalerie(element, photographer.name);
            }
            // Si c'est une vidéo, on affiche la vidéo mais sans possibilité de lecture
            else if (element.video && element.video !== undefined) {
                createDomGalerieVideo(element, photographer.name);
            }
        }
    });
}



// fonction pour associer le photographe en fonction de l'id dans l'url 
export const getUrl = async () => {
    const { photographers } = await getPhotographers();
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    photographers.forEach(element => {
        if (element.id === parseInt(id)) {
            createDomHeader(element);
        }
    });
}

//fonction pour lancer les différentes fonctions
const init = async () => {
    await getUrl(); 
    await getGalerie();

    // Ajoute un evenement quand la galerie est chargée
    document.dispatchEvent(new Event("galleryLoaded"));
}

init();