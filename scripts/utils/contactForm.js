// Ouvrir le modal

function displayModal() {
    const modal = document.getElementById("contact-modal");
    const main = document.querySelector("main");
	modal.style.display = "block";
    modal.style.marginTop = "-118%";
    main.style.opacity = "0.3";
}

// Fermer le modal

function closeModal() {
    const modal = document.getElementById("contact-modal");
    modal.style.display = "none";
    const main = document.querySelector("main");
    main.style.opacity = "1";
}

// Vider le formulaire
function resetForm() {
    const form = document.getElementById("contact-form");
    const inputs = form.querySelectorAll("input, textarea");

    inputs.forEach(input => {
        input.value = "";
    });
}

// Envoyer le formulaire
function sendForm(event) {

        // Récupérer les éléments du formulaire
        const form = document.getElementById("contact-form");
        const firstName = form.querySelector("#prenom").value;
        const lastName = form.querySelector("#nom").value;
        const email = form.querySelector("#email").value;
        const message = form.querySelector("#texte").value;

        // Afficher les données dans la console
        console.log(firstName);
        console.log(lastName);
        console.log(email);
        console.log(message);

        // Empecher le rechargement de la page
        event.preventDefault();

        //Vider le formulaire
        resetForm();

        // Fermer le modal
        closeModal();
}
