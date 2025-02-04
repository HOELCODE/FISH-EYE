

//Template par image
function imageView(collection, artiste) {
    const photo = `
        <div class="img-title-carousel-container">
            <img class="img-carousel" src="assets/photographes/${artiste}/${collection.image}" alt="${collection.title}">
            <span class="title-carousel">${collection.title}</span>
        </div>
    `
}