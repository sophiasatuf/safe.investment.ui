var menuIcon = document.querySelector(".menu-icon");
var sidebar = document.querySelector(".sidebar");
var container = document.querySelector(".container");

// Transforma a sidebar numa menor ao clicar e vice-versa
menuIcon.onclick = function () {
  sidebar.classList.toggle("small-sidebar");
  container.classList.toggle("large-container");
};

function checkLogin() {
  const isLogged = localStorage.getItem("isLogged");

  if (!isLogged) {
    window.location.href = "login.html";
  }
}
function handlePublicacoes() {
  fetch("http://localhost:6789/publicacoes")
    .then((res) => res.json())
    .then((publicacoes) => {
      const fetchPromises = publicacoes.map((publicacao) =>
        fetch(`http://localhost:6789/classe/${publicacao.classeId}`)
          .then((res) => res.json())
          .then((classe) =>
            fetch(`http://localhost:6789/professor/${classe.professorId}`)
              .then((res) => res.json())
              .then((professor) => {
                const numeroAleatorio = Math.floor(Math.random() * 8) + 1;
                const numeroAleatorioAvatar = Math.floor(Math.random() * 6) + 1;
                return `
                    <div class="vid-list" onclick="localStorage.setItem('publicacaoId', '${
                      publicacao.codigo
                    }')">
                    <a href="play-video.html"
                      ><img src="img/thumbnail${numeroAleatorio}.png" alt="vid1" class="thumbnail"
                    /></a>
                    <div class="flex-div">
                      <img src="img/user${numeroAleatorioAvatar}.png" alt="user" />
                      <div class="vid-info">
                        <a href="play-video.html"
                          >${publicacao.titulo}</a
                        >
                        <p>${professor.professorNome}</p>
                        <p>1${
                          publicacao.visualizacoes
                        } Visualizações &bull; há ${Math.floor(
                  (new Date() - new Date(publicacao.datapostagem)) /
                    (24 * 60 * 60 * 1000)
                )} dia(s)</p>
                      </div>
                    </div>
                  </div>
                `;
              })
          )
      );

      Promise.all(fetchPromises)
        .then((htmlArray) => {
          const html = htmlArray.join("");
          document.getElementById("list-container").innerHTML = html;
        })
        .catch((error) => {
          console.error(error);
        });
    })
    .catch((error) => {
      console.error(error);
    });
}

function handleListaDeInscricoes() {
  const userId = localStorage.getItem("usuarioData").split("ID: ")[1][0];
  fetch(`http://localhost:6789/userclasse/${userId}`)
    .then((res) => res.json())
    .then((classes) => {
      const fetchPromises = classes.map((classe) =>
        fetch(`http://localhost:6789/professor/${classe.professorId}`)
          .then((res) => res.json())
          .then((professor) => {
            const numeroAleatorio = Math.floor(Math.random() * 6) + 1;
            return `
            <a href=""
            ><img src="img/user${numeroAleatorio}.png" alt="User" />
            <p>${professor.professorNome}</p>
          </a>
                `;
          })
      );

      Promise.all(fetchPromises)
        .then((htmlArray) => {
          const html = htmlArray.join("");
          document.getElementById("subscribed-list").innerHTML =
            "<h3>INSCRIÇÕES</h3>" + html;
        })
        .catch((error) => {
          console.error(error);
        });
    })
    .catch((error) => {
      console.error(error);
    });
}
handleListaDeInscricoes();

handlePublicacoes();

checkLogin();
