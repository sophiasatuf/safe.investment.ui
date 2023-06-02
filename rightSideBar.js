function handleSideBar() {
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
                return `
                  <div class="side-video-list" onclick="localStorage.setItem('publicacaoId', '${publicacao.codigo}')">
                    <a href="" class="small-thumbnail">
                      <img src="img/thumbnail${numeroAleatorio}.png" alt="thumbnail">
                    </a>
                    <div class="vid-info">
                      <a href="">${publicacao.titulo}</a>
                      <p>${professor.professorNome}</p>
                      <p>${publicacao.visualizacoes} Visualizações</p>
                    </div>
                  </div>
                `;
              })
          )
      );

      Promise.all(fetchPromises)
        .then((htmlArray) => {
          const html = htmlArray.join("");
          document.getElementById("right-sidebar").innerHTML = html;
        })
        .catch((error) => {
          console.error(error);
        });
    })
    .catch((error) => {
      console.error(error);
    });
}

handleSideBar();
