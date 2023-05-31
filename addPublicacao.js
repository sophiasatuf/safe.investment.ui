document.getElementById("add-publi-form").addEventListener("submit", publicar);

function handleButton() {
  const uploadButton = document.getElementById("upload-btn");
  const isProfessor = localStorage.getItem("isProfessor");
  if (isProfessor === "false") {
    uploadButton.setAttribute("class", "camera-btn-aluno");
  } else {
    const professorId = localStorage
      .getItem("usuarioData")
      .split("PROFESSORID: ")[1];
    const select = document.getElementById("classe-select");
    fetch(
      `http://localhost:6789/classe/buscaProfessor?professorId=${professorId}`
    )
      .then((res) => res.json())
      .then((res) => {
        let options = "";
        res.forEach((option) => {
          options =
            options +
            `<option value=${option.codigo}>${option.titulo}</option>`;
        });
        select.innerHTML = options;
      });
  }
}

function openModal() {
  const uploadBkg = document.getElementById("modal-bkg");
  if (uploadBkg.getAttribute("class") == "modal-bkg") {
    closeModal();
  } else {
    uploadBkg.setAttribute("class", "modal-bkg");
    const modalContent = document.getElementById("modal-content");
    modalContent.setAttribute("class", "modal-content");
  }
}

function closeModal() {
  const uploadBkg = document.getElementById("modal-bkg");
  uploadBkg.setAttribute("class", "");
  const modalContent = document.getElementById("modal-content");
  modalContent.setAttribute("class", "modal-content-off");
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  return `${day}/${month + 1}/${year}`;
}

function publicar(e) {
  e.preventDefault();
  const urlvideo = document.getElementById("urlvideo").value;
  const hashtags = encodeURIComponent(
    document.getElementById("hashtags").value
  );
  const titulo = document.getElementById("titulo").value;
  const classeId = document.getElementById("classe-select").value;
  const dataPostagem = formatDate(new Date());
  console.log(urlvideo, hashtags, titulo, classeId, dataPostagem);
  fetch(
    `http://localhost:6789/publicacao/cadastro?urlVideo=${urlvideo}&titulo=${titulo}&classeId=${classeId}&dataPostagem=${dataPostagem}&hashtags=${hashtags}`,
    { method: "POST" }
  ).then(() => {
    closeModal();
    document.getElementById("urlvideo").value = "";
    document.getElementById("hashtags").value = "";
    document.getElementById("titulo").value = "";
    document.getElementById("classe-select").value = "";
  });
}

handleButton();
