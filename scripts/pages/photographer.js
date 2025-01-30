// fonction pour récupérer les datas
async function getPhotographers() {
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
async function getMedia() {
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
async function getGalerie() {
    const media = await getMedia();
    const { photographers } = await getPhotographers();
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');


    media.forEach(element => {
        if (element.photographerId === parseInt(id)) {
            var lid = element.photographerId;
            for (i = 0; i < photographers.length; i++) {
                if (photographers[i].id === lid && element.hasOwnProperty('image') && element.image !== undefined) {
                    createDomGalerie(element, photographers[i].name)
                }
            }
        }
    });

}

// fonction pour associer le photographe en fonction de l'id dans l'url 
async function getUrl() {
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
async function init() {
    await getUrl();  // Assure que les fonctions asynchrones sont bien exécutées
    await getGalerie();
}

init();