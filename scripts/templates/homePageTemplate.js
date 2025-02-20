//fonction pour créer le template de la card des photographes
export const photographerTemplate = (data) => {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographes/photos-photographes/${portrait}`;

    const getUserCardDOM = () => {
        //Créer les éléments
        const article = document.createElement('article');

        //Photographer card 
        const photogrpaherCard = `
          <a href="photographer.html?id=${id}" aria-label="Voir le profil du photographe ${name}">
            <img src="${picture}" alt="Photo de ${name}" aria-label="Portrait de ${name}">
            <h2>${name}</h2>
          </a>
          <div aria-label="Informations du photographe">
            <h3 aria-label="Ville et pays">${city}, ${country}</h3>
            <p aria-label="Slogan du photographe">${tagline}</p>
            <span aria-label="Prix du photographe">${price}€/jour</span>
          </div>
        `

        //Associer Photographer card à article
        article.innerHTML = photogrpaherCard;

        return (article);
    }
    return { name, picture, getUserCardDOM }
}