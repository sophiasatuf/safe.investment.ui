document
  .getElementById("add-rating-form")
  .addEventListener("submit", addRating);

function openModalRating() {
  const uploadBkg = document.getElementById("modal-rating-bkg");
  if (uploadBkg.getAttribute("class") == "modal-rating-bkg") {
    closeRatingModal();
  } else {
    uploadBkg.setAttribute("class", "modal-rating-bkg");
    const modalContent = document.getElementById("modal-rating-content");
    modalContent.setAttribute("class", "modal-rating-content");
  }
}

function closeRatingModal() {
  const uploadBkg = document.getElementById("modal-rating-bkg");
  uploadBkg.setAttribute("class", "");
  const modalContent = document.getElementById("modal-rating-content");
  modalContent.setAttribute("class", "modal-rating-content-off");
}

function addRating(e) {
  e.preventDefault();
  const rating = document.getElementById("rating").value;
  if (rating < 1 || rating > 5) {
    alert('Rating fora dos padroes!')
  } else {
  const userId = localStorage.getItem("usuarioData").split("ID: ")[1][0];
  const publicacaoId = localStorage.getItem("publicacaoId");

  fetch(
    `http://localhost:6789/rating?userId=${userId}&publicacaoId=${publicacaoId}&rating=${rating}`,
    { method: "POST" }
  ).then(() => {
    closeRatingModal();
    document.getElementById("rating").value = "";
  });

  }
}

handleButtonClasse();
