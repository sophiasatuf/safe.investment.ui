document
  .getElementById("add-classe-form")
  .addEventListener("submit", addClasse);

function handleButtonClasse() {
  const uploadButton = document.getElementById("add-classe-btn");
  const isProfessor = localStorage.getItem("isProfessor");
  console.log(isProfessor);
  if (isProfessor === "false") {
    uploadButton.setAttribute("class", "block-btn-aluno");
  }
}

function openModalClasse() {
  const uploadBkg = document.getElementById("modal-classe-bkg");
  if (uploadBkg.getAttribute("class") == "modal-bkg") {
    closeModal();
  }
  if (uploadBkg.getAttribute("class") == "modal-classe-bkg") {
    closeModalClasse();
  } else {
    uploadBkg.setAttribute("class", "modal-classe-bkg");
    const modalContent = document.getElementById("modal-classe-content");
    modalContent.setAttribute("class", "modal-classe-content");
  }
}

function closeModalClasse() {
  const uploadBkg = document.getElementById("modal-classe-bkg");
  uploadBkg.setAttribute("class", "");
  const modalContent = document.getElementById("modal-classe-content");
  modalContent.setAttribute("class", "modal-classe-content-off");
}

function addClasse(e) {
  e.preventDefault();
  const titulo = document.getElementById("titulo-classe").value;
  const descricao = document.getElementById("descricao").value;
  const professorId = localStorage
    .getItem("usuarioData")
    .split("PROFESSORID: ")[1];

  fetch(
    `http://localhost:6789/classe/cadastro?titulo=${titulo}&descricao=${descricao}&professorId=${professorId}`,
    { method: "POST" }
  ).then(() => {
    closeModalClasse();
    document.getElementById("titulo-classe").value = "";
    document.getElementById("descricao").value = "";
  });
}

handleButtonClasse();
