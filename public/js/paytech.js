async function processPayment() {
  const btn = document.getElementById("payerBtn");
  const submitText = document.getElementById("submitText");
  const spinner = document.getElementById("spinner");

  // Désactiver bouton et montrer spinner
  btn.disabled = true;
  submitText.textContent = "Traitement...";
  spinner.classList.remove("d-none");

  try {
    // Récupérer les valeurs du formulaire
    const genreInput = document.querySelector('input[name="genre"]:checked');

    const formData = {
      nom: document.getElementById("name").value.trim(),
      email: document.getElementById("email").value.trim(),
      telephone: document.getElementById("phone").value.trim(),
      paroisse: document.getElementById("paroisse").value.trim(),
      age: document.getElementById("age").value.trim(),
      genre: genreInput ? genreInput.value : "",
      date_inscription: new Date().toLocaleString("fr-FR"),
    };

    // Validation de base
    for (const [key, value] of Object.entries(formData)) {
      if (!value) {
        alert(`Veuillez remplir le champ: ${key}`);
        resetButton();
        return;
      }
    }

    // Appel API
    const response = await fetch("/api/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Erreur lors de l'inscription.");
    }

    if (data.redirect_url) {
      window.location.href = data.redirect_url;
    } else {
      throw new Error("Lien de paiement introuvable.");
    }
  } catch (error) {
    alert("Erreur: " + error.message);
    resetButton();
  }
}

function resetButton() {
  const btn = document.getElementById("payerBtn");
  const submitText = document.getElementById("submitText");
  const spinner = document.getElementById("spinner");

  btn.disabled = false;
  submitText.textContent = "Payer et s'inscrire";
  spinner.classList.add("d-none");
}

// Attacher l’événement quand le DOM est prêt
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("payerBtn");
  if (btn) {
    btn.addEventListener("click", processPayment);
  }
});
