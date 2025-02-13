// Ouvrir le modal
export const displayModal = () => {
    const modal = document.getElementById("contact-modal");
    const main = document.querySelector("main");
    const button = document.querySelector(".contact_button");

    button.addEventListener("click", () => {
        modal.classList.remove("modal-close");
        modal.classList.add("modal-open");
        main.style.opacity = "0.3";
    });
}

// Fermer le modal
export const closeModal = () => {
    const modal = document.getElementById("contact-modal");
    const button = document.querySelector(".close-button");
    const main = document.querySelector("main");

    button.addEventListener("click", () => {
        modal.classList.remove("modal-open");
        modal.classList.add("modal-close");
        main.style.opacity = "1";
    })
}

// Vider le formulaire
export const resetForm = () => {
    const form = document.getElementById("contact-form");
    const inputs = form.querySelectorAll("input, textarea");

    inputs.forEach(input => {
        input.value = "";
    });
}

// Envoyer le formulaire
// Envoyer le formulaire
export const sendForm = () => {
    const form = document.querySelector("form");

    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Empêche le rechargement de la page

        // Récupérer les valeurs des champs
        const firstName = form.querySelector("#prenom").value;
        const lastName = form.querySelector("#nom").value;
        const email = form.querySelector("#email").value;
        const message = form.querySelector("#texte").value;

        // Afficher les données dans la console
        console.log(firstName);
        console.log(lastName);
        console.log(email);
        console.log(message);

        // Réinitialiser le formulaire après l'envoi
        resetForm();

        // Fermer le modal
        const modal = document.getElementById("contact-modal");
        const main = document.querySelector("main");

        modal.style.display = "none";
        main.style.opacity = "1";

    });
};

// Exécuter les fonction
displayModal();
closeModal();
sendForm();

