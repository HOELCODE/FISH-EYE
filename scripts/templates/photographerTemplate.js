//fonction pour afficher les éléments dans le dom 
async function createDomHeader(photographe) {
    //Récupérer les éléments du DOM
    const headerContainer = document.querySelector(".photograph-header");

    //Créer le bloque html 
    const photographerHeader = `
        <div class="photograph-description">
            <h1 class="photograph-name">${photographe.name}</h1>
            <p class="photograph-localisation">${photographe.city}, ${photographe.country}</p>
            <span class="photograph-slogan">${photographe.tagline}</span>
        </div>
        <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
        <img class="image-photographe" src="assets/photographes/photos-photographes/${photographe.portrait}" alt="photo de ${photographe.name}">
    `

    //Ajouter le prénom dans h2 du formulaire
    const form = document.getElementById("contact-modal");
    form.querySelector("h2").innerHTML = `Contactez-moi<br>${photographe.name}`; 

    
    //Associer le header
    headerContainer.innerHTML = photographerHeader;

    return (headerContainer);
}

// Fonction pour afficher la galerie
async function createDomGalerie(collection, artiste) {
    // Récupérer les éléments du DOM
    const sectionGalerie = document.querySelector(".galerie");

    // Créer le bloc HTML
    const photographeGalerie = `
        <article class="galerie-article">
          <ahref="" class="galerie-link">
          <img class="img-photo" src="assets/photographes/${artiste}/${collection.image}" alt="${collection.title}">
          </a>
          <div class="div-description">
            <p class="galerie-description">${collection.title}</p>
            <div class="galerie-likes">
              <span class="galerie-like">${collection.likes}</span>
              <div class="heart-container"><i class="fa-solid fa-heart"></i></div>
            </div>
          </div>
        </article>
    `;

    // Ajouter l'article à la galerie sans remplacer le contenu existant
    sectionGalerie.insertAdjacentHTML('beforeend', photographeGalerie);
}

// Fonction pour afficher la galerie pour les vidéos
function createDomGalerieVideo(collection, artiste) {
  const sectionGalerie = document.querySelector(".galerie");

  const photographeGalerieVideo = `
    <article class="galerie-article">
      <video class="video-photo" preload="metadata">
        <source src="assets/photographes/${artiste}/${collection.video}" type="video/mp4">
        Votre navigateur ne supporte pas la vidéo.
      </video>
      <div class="div-description">
        <p class="galerie-description">${collection.title}</p>
        <div class="galerie-likes">
          <span class="galerie-like">${collection.likes}</span>
          <div class="heart-container"><i class="fa-solid fa-heart"></i></div>
        </div>
      </div>
    </article>
  `;

  // Insérer l'article dans la galerie
  sectionGalerie.insertAdjacentHTML('beforeend', photographeGalerieVideo);

  // Récupérer l'élément vidéo qu'on vient d'insérer
  const videoElement = sectionGalerie.lastElementChild.querySelector('video');

  // Désactiver toute interaction sur la vidéo pour empêcher sa lecture
  videoElement.style.pointerEvents = 'none';
}





