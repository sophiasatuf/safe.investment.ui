let isLiked = false;
let isDisliked = false;
let isComentarioLiked = false;
let isComentarioDisliked = false;

function like(publicacaoId) {
  if (!isLiked) {
    fetch(`http://localhost:6789/publicacao/like/${publicacaoId}`, {
      method: "POST",
    });
    isLiked = true;
  }
}

function dislike(publicacaoId) {
  if (!isDisliked) {
    fetch(`http://localhost:6789/publicacao/dislike/${publicacaoId}`, {
      method: "POST",
    });
    isDisliked = true;
  }
}

function comentarioLike(comentarioId) {
  if (!isComentarioLiked) {
    fetch(`http://localhost:6789/comentario/like/${comentarioId}`, {
      method: "POST",
    });
    isComentarioLiked = true;
  }
}

function comentarioDislike(comentarioId) {
  if (!isComentarioDisliked) {
    fetch(`http://localhost:6789/comentario/dislike/${comentarioId}`, {
      method: "POST",
    });
    isComentarioDisliked = true;
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

function comentar(publicacaoId) {
  const userId = localStorage.getItem("usuarioData").split("ID: ")[1][0];
  const descricao = document.getElementById("comentario-input").value;
  fetch(
    `http://localhost:6789/comentario/cadastro?publicacaoId=${publicacaoId}&userId=${userId}&descricao=${descricao}`,
    { method: "POST" }
  ).then(() => {
    document.getElementById("comentario-input").value = "";
    genComentarios(publicacaoId);
  });
}

function genComentarios(publicacaoId) {
  const numeroAleatorioAvatar = Math.floor(Math.random() * 6) + 1;
  let comentarios = "";
  fetch(`http://localhost:6789/comentarios/${publicacaoId}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) => {
      res.forEach((comentario) => {
        comentarios =
          comentarios +
          `
      <div class="old-comment">
        <img src="img/user${numeroAleatorioAvatar}.png" alt="User" />
        <div>
          <h3>Sophia Satuf <span>há 2 dias</span></h3>
          <p>
            ${comentario.descricao}
          </p>
          <div class="comment-action">
            <img onclick="comentarioLike('${comentario.codigo}')" src="img/like.png" alt="like" />
            <span>${comentario.likes}</span>
            <img onclick="comentarioDislike('${comentario.codigo}')" src="img/dislike.png" alt="dislike" />
            <span>${comentario.dislikes}</span>
            <span>Responder</span>
            <a href="">Todas as respostas</a>
          </div>
        </div>
      </div>
      
      `;
      });
      document.getElementById("comments").innerHTML = comentarios;
    });
}

function handleNumComentarios(publicacaoId) {
  fetch(`http://localhost:6789/comentarios/contar/${publicacaoId}`, {
    method: "GET",
  })
    .then((res) => res.text())
    .then((res) => {
      document.getElementById("n-comentarios").innerHTML = `<h4>${Number(
        res
      )} Comentários</h4>`;
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
      const numeroAleatorioAvatar = Math.floor(Math.random() * 6) + 1;
      const numeroAleatorio2Avatar = Math.floor(Math.random() * 6) + 1;

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
        <a><img onclick="openModalRating()" src="img/save.png" alt="save" />Avaliar</a>
      </div>
    </div>
    <hr />
    <div class="publisher">
      <img src="img/user${numeroAleatorioAvatar}.png" alt="Canal" />
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
      <h4 id="n-comentarios"><h4>Comentários</h4></h4>
      <div class="add-comment">
        <img src="img/user${numeroAleatorio2Avatar}.png" alt="User" />
        <input id="comentario-input" type="text" placeholder="Adicione um comentário..." />
        <button type="button" onclick="comentar('${
          publicacaoData.codigo
        }')">Comentar</button>
      </div>
      <div id="comments"></div>
      `;
      document.getElementById("video-gen").innerHTML = videoGen;

      isInscrito(publicacaoData.classeId);
      setProfessorInscritos(publicacaoData.classeId);
      genComentarios(publicacaoData.codigo);
      handleNumComentarios(publicacaoData.codigo);
    });
}

playVideo();
