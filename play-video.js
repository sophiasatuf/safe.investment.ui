let isLiked = false;
let isDisliked = false;

function like(publicacaoId) {
  if (!isLiked) {
    fetch(`http://localhost:6789/publicacao/like/${publicacaoId}`, {
      method: "POST",
    });
    isLiked = true;
  }
}

function dislike(publicacaoId) {
  if (!isLiked) {
    fetch(`http://localhost:6789/publicacao/dislike/${publicacaoId}`, {
      method: "POST",
    });
    isDisliked = true;
  }
}

function inscrever(classeId) {
  const userId = localStorage.getItem("usuarioData").split("ID: ")[1][0];

  fetch(
    `http://localhost:6789/userclasse/inscrever?classeId=${classeId}&userId=${userId}`,
    { method: "POST" }
  );

  isInscrito(classeId);
}

function desinscrever(classeId) {
  const userId = localStorage.getItem("usuarioData").split("ID: ")[1][0];

  fetch(
    `http://localhost:6789/userclasse/desinscrever?classeId=${classeId}&userId=${userId}`,
    { method: "POST" }
  );

  isInscrito(classeId);
}

function isInscrito(classeId) {
  const userId = localStorage.getItem("usuarioData").split("ID: ")[1][0];

  fetch(
    `http://localhost:6789/userclasse/isInscrito?classeId=${classeId}&userId=${userId}`,
    { method: "GET" }
  )
    .then((res) => res.text())
    .then((res) => {
      if (res === "true") {
        document.getElementById("botao-inscrever").innerHTML = `
      <button id="botao-inscrever" type="button" onclick="desinscrever('${classeId}')">Inscrito - Desinscrever</button>`;
      } else {
        document.getElementById("botao-inscrever").innerHTML = `
        <button id="botao-inscrever" type="button" onclick="inscrever('${classeId}')">Inscrever-se</button>`;
      }
    });
}

function setProfessorInscritos(classeId) {
  let inscritos = "";
  fetch(`http://localhost:6789/classe/${classeId}`, { method: "GET" })
    .then((res) => res.json())
    .then((res) => {
      inscritos = res.nInscritos;
      document.getElementById(
        "classe-descricao"
      ).innerHTML = `<p>${res.descricao}</p>`;
      fetch(`http://localhost:6789/professor/${res.professorId}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((res) => {
          document.getElementById("professor-inscritos").innerHTML = `
                <p>${res.professorNome}</p>
                <span>${inscritos} Inscrito(s)</span>
              `;
        });
    });
}

function playVideo() {
  const publicacaoId = localStorage.getItem("publicacaoId");

  fetch(`http://localhost:6789/publicacao/visualizacao/${publicacaoId}`, {
    method: "POST",
  });

  fetch(`http://localhost:6789/publicacao/${publicacaoId}`)
    .then((res) => res.json())
    .then((publicacaoData) => {
      console.log(publicacaoData);

      const videoGen = `
      <iframe
      width="100%"
      height="450px"
      src="${publicacaoData.urlVideo}"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    ></iframe>
    <div class="tags">
      ${publicacaoData.hashtags
        .split(" ")
        .map((hashtag) => `<a href="">${hashtag}</a>`)}
    </div>
    <h3>${publicacaoData.titulo}</h3>
    <div class="play-video-info">
      <p>${publicacaoData.visualizacoes} Visualizações &bull; há ${Math.floor(
        (new Date() - new Date(publicacaoData.datapostagem)) /
          (24 * 60 * 60 * 1000)
      )} dia(s)</p>
      <div>
        <a><img onclick="like('${
          publicacaoData.codigo
        }')" src="img/like.png" alt="like" />${publicacaoData.likes}</a>
        <a><img onclick="dislike('${
          publicacaoData.codigo
        }')" src="img/dislike.png" alt="dislike" />${
        publicacaoData.dislikes
      }</a>
        <a href=""
          ><img src="img/share.png" alt="share" />Compartilhar</a
        >
        <a href=""><img src="img/save.png" alt="save" />Salvar</a>
      </div>
    </div>
    <hr />
    <div class="publisher">
      <img src="img/Jack.png" alt="Canal" />
      <div id="professor-inscritos">
        <p>Safe Investment</p>
        <span>500k Inscritos</span>
      </div>
      <div id="botao-inscrever">
        <button type="button" onclick="inscrever('${
          publicacaoData.classeId
        }')">Inscrever-se</button>
      </div>
    </div>
    <div class="vid-description">
      <p id="classe-descricao">
      </p>
      <hr />
      <h4>134 Comentários</h4>
      <div class="add-comment">
        <img src="img/Jack.png" alt="User" />
        <input type="text" placeholder="Adicione um comentário..." />
      </div>
      
      `;
      document.getElementById("video-gen").innerHTML = videoGen;

      isInscrito(publicacaoData.classeId);
      setProfessorInscritos(publicacaoData.classeId);
    });
}

playVideo();
