function playVideo() {
  const publicacaoId = localStorage.getItem("publicacaoId");

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
        .map((hashtag) => `<a href="">${hashtag}</a> <a href="">#HTML</a>`)}
    </div>
    <h3>${publicacaoData.titulo}</h3>
    <div class="play-video-info">
      <p>1225 Visualizações &bull; há 3 dias</p>
      <div>
        <a href=""><img src="img/like.png" alt="like" />125</a>
        <a href=""><img src="img/dislike.png" alt="dislike" />1</a>
        <a href=""
          ><img src="img/share.png" alt="share" />Compartilhar</a
        >
        <a href=""><img src="img/save.png" alt="save" />Salvar</a>
      </div>
    </div>
    <hr />
    <div class="publisher">
      <img src="img/Jack.png" alt="Canal" />
      <div>
        <p>Safe Investment</p>
        <span>500k Inscritos</span>
      </div>
      <button type="button">Inscrever-se</button>
    </div>
    <div class="vid-description">
      <p>
        Se você ficou com alguma dúvida envie um e-mail para:
        <a href="" class="email">professorjacksparrow@gmail.com</a>
      </p>
      <p>
        Inscreva-se no nosso canal para mais conteúdos te ensinando a
        investir!
      </p>
      <hr />
      <h4>134 Comentários</h4>
      <div class="add-comment">
        <img src="img/Jack.png" alt="User" />
        <input type="text" placeholder="Adicione um comentário..." />
      </div>
      
      `;
      document.getElementById("video-gen").innerHTML = videoGen;
    });
}

playVideo();
