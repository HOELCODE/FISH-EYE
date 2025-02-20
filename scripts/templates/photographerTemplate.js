//fonction pour afficher le header photographe, le prenom dans le formulaire et le prix du photographe
export const createDomHeader = async (photographe) => {
  // Récupérer l'élément contenant le header
  const headerContainer = document.querySelector(".photograph-header");
  const contactButton = headerContainer.querySelector(".contact_button");

  // Créer dynamiquement la div `.photograph-description`
  const descriptionDiv = document.createElement("div");
  descriptionDiv.classList.add("photograph-description");
  descriptionDiv.setAttribute("aria-label", `Description du photographe ${photographe.name}`);

  // Ajouter dynamiquement le contenu de la description
  descriptionDiv.innerHTML = `
      <h1 class="photograph-name" aria-label="Nom du photographe">${photographe.name}</h1>
      <p class="photograph-localisation" aria-label="Localisation">${photographe.city}, ${photographe.country}</p>
      <span class="photograph-slogan" aria-label="Slogan">${photographe.tagline}</span>
  `;

  // Créer dynamiquement l'image
  const imgElement = document.createElement("img");
  imgElement.classList.add("image-photographe");
  imgElement.src = `assets/photographes/photos-photographes/${photographe.portrait}`;
  imgElement.alt = `Portrait du photographe ${photographe.name}`;
  imgElement.setAttribute("aria-label", `Portrait du photographe ${photographe.name}`);

  // Ajouter la div avant le bouton
  headerContainer.insertBefore(descriptionDiv, contactButton);

  // Ajouter l'image après le bouton
  contactButton.insertAdjacentElement("afterend", imgElement);

  // Ajouter le prénom dans le formulaire avec une meilleure accessibilité
  const form = document.getElementById("contact-modal");
  form.querySelector("h2").innerHTML = `Contactez-moi<br>${photographe.name}`;
  form.setAttribute("aria-label", `Formulaire de contact pour ${photographe.name}`);

  // Ajouter le prix du photographe avec un aria-label
  const priceDiv = document.querySelector(".price");
  priceDiv.innerHTML = photographe.price;
  priceDiv.setAttribute("aria-label", `Tarif journalier du photographe : ${photographe.price} euros par jour`);

  return headerContainer;
};



// Factory pour créer une image ou une vidéo
class MediaFactory {
  constructor(collection, artiste) {
    this.collection = collection;
    this.artiste = artiste;
  }

  createMediaElement() {
    if (this.collection.image) {
      return this.createImage();
    } else if (this.collection.video) {
      return this.createVideo();
    } else {
      throw new Error("Format de média non pris en charge");
    }
  }

  createImage() {
    return `
      <button class="galerie-link" aria-label="Cliquez pour voir l'image">
        <img class="img-photo" src="assets/photographes/${this.artiste}/${this.collection.image}" 
          alt="${this.collection.title}" aria-label="Image de ${this.collection.title}" data-date="${this.collection.date}" data-likes="${this.collection.likes}">
      </button>
    `;
  }

  createVideo() {
    return `
      <button class="galerie-link" aria-label="Cliquez pour voir la video">
        <video class="img-photo" preload="metadata" data-title="${this.collection.title}" style="pointer-events: none;" data-date="${this.collection.date}">
          <source src="assets/photographes/${this.artiste}/${this.collection.video}" type="video/mp4">
        </video>
      </button    >
    `;
  }
}

// Fonction pour afficher la galerie
export const createDomGalerie = (collection, artiste) => {
  const sectionGalerie = document.querySelector(".galerie");

  // Utilisation de la Factory pour créer le bon type de média
  const mediaFactory = new MediaFactory(collection, artiste);
  const mediaElement = mediaFactory.createMediaElement();

  const photographeGalerie = `
    <article class="galerie-article" aria-label="Article de galerie présentant une image ou une vidéo">
      ${mediaElement}
      <div class="div-description" aria-label="Description de l'œuvre">
        <p class="galerie-description" aria-label="Titre de l'œuvre">${collection.title}</p>
        <div class="galerie-likes" aria-label="Nombre de likes">
          <span class="galerie-like" aria-label="Nombre de likes">${collection.likes}</span>
          <button class="heart-container" role="button" tabindex="0" aria-label="Cliquez pour aimer l'œuvre">
            <i class="fa-regular fa-heart" aria-label="Icône de cœur pour les likes"></i>
          </button> 
        </div>
      </div>    
    </article>
  `;

  // Ajouter l'article à la galerie
  sectionGalerie.insertAdjacentHTML('beforeend', photographeGalerie);
};






