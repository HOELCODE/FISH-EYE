//fonction pour afficher le header photographe, le prenom dans le formulaire et le prix du photographe
export const createDomHeader = async (photographe) => {
  // Récupérer l'élément contenant le header
  const headerContainer = document.querySelector(".photograph-header");
  const contactButton = headerContainer.querySelector(".contact_button");

  // Créer dynamiquement la div `.photograph-description`
  const descriptionDiv = document.createElement("div");
  descriptionDiv.classList.add("photograph-description");
  descriptionDiv.innerHTML = `
      <h1 class="photograph-name">${photographe.name}</h1>
      <p class="photograph-localisation">${photographe.city}, ${photographe.country}</p>
      <span class="photograph-slogan">${photographe.tagline}</span>
  `;

  // Créer dynamiquement l'image
  const imgElement = document.createElement("img");
  imgElement.classList.add("image-photographe");
  imgElement.src = `assets/photographes/photos-photographes/${photographe.portrait}`;
  imgElement.alt = `photo de ${photographe.name}`;

  // Ajouter la div avant le bouton
  headerContainer.insertBefore(descriptionDiv, contactButton);

  // Ajouter l'image après le bouton
  contactButton.insertAdjacentElement("afterend", imgElement);

  // Ajouter le prénom dans le formulaire
  const form = document.getElementById("contact-modal");
  form.querySelector("h2").innerHTML = `Contactez-moi<br>${photographe.name}`;

  // Ajouter le prix du photographe 
  const priceDiv = document.querySelector(".price");
  priceDiv.innerHTML = photographe.price;


  return headerContainer;
};


// Fonction pour afficher la galerie
export const createDomGalerie = async (collection, artiste) => {
  // Récupérer les éléments du DOM
  const sectionGalerie = document.querySelector(".galerie");

  // Créer le bloc HTML
  const photographeGalerie = `
        <article class="galerie-article">
          <div class="galerie-link">
          <img class="img-photo" src="assets/photographes/${artiste}/${collection.image}" alt="${collection.title}">
          </div>
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
export const createDomGalerieVideo = (collection, artiste) => {
  const sectionGalerie = document.querySelector(".galerie");

  const photographeGalerieVideo = `
    <article class="galerie-article">
      <div class="galerie-link">
        <video class="img-photo" preload="metadata" data-title="${collection.title}">
          <source src="assets/photographes/${artiste}/${collection.video}" "type="video/mp4">
        </video>
      </div>
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





