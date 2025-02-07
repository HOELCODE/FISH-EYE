//fonction pour créer le template de la card des photographes
export const photographerTemplate = (data) => {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographes/photos-photographes/${portrait}`;

    const getUserCardDOM = () => {
        //Créer les éléments
        const article = document.createElement( 'article' );

        //Photographer card 
        const photogrpaherCard = `
            <a href="photographer.html?id=${id}"> 
                <img src="${picture}" alt="photo de ${name}">
                <h2>${name}</h2>
            </a>
            <div>
                <h3>${city}, ${country} </h3>
                <p>${tagline}</p>
                <span>${price}€/jour</span>
            </div>
        `

        //Associer Photographer card à article
        article.innerHTML = photogrpaherCard;

        return (article);
    }
    return { name, picture, getUserCardDOM }
}