function busca() {
  const stringBusca = document.getElementById("search-box-field").value;
  const container = document.getElementById("container-id");

  fetch(`http://localhost:6789/publicacao/busca?stringBusca=${stringBusca}`)
    .then((res) => res.json())
    .then((response) => {
      const publicacoes = response;

      if (publicacoes.length > 0) {
        let res = "";
        publicacoes.forEach((publicacao) => {
          res =
            res +
            `
          <div class="vid-list">
            <a href="play-video.html"
              ><img onclick="localStorage.setItem('publicacaoId', '${publicacao.codigo}')" src="img/thumbnail1.png" alt="vid1" class="thumbnail"
            /></a>
            <div class="flex-div">
              <img src="img/Jack.png" alt="user" />
              <div class="vid-info">
                <a href="play-video.html"
                  >${publicacao.titulo}</a
                >
                <p>Safe Investment</p>
                <p>${
                  publicacao.visualizacoes
                } Visualizaçõe(s) &bull; há ${Math.floor(
              (new Date() - new Date(publicacao.datapostagem)) /
                (24 * 60 * 60 * 1000)
            )} dia(s)</p>
              </div>
            </div>
          </div>
        `;
        });
        container.innerHTML = "<div class='list-container'>" + res + "</div>";
      }
    });
}
