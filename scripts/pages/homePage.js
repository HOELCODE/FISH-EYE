import { photographerTemplate } from "../templates/homePageTemplate.js";

// fonction pour récupérer les datas
const getPhotographers = async () => {
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

// Fonction pour récupérer le template de display et associer les données récupérées
const displayData = async (photographers) => {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

//Fonction pour lancer le fetch et display les datas 
const init = async () => {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

init();