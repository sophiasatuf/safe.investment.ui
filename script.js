var menuIcon = document.querySelector(".menu-icon");
var sidebar = document.querySelector(".sidebar");
var container = document.querySelector(".container");
let server = "safeinvestment.postgres.database.azure.com";

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

//chatbot

function removeAcento(frase){
    comAcento = 'áãâàéèêíìîóòôõúùûü';
    semAcento = 'aaaaeeeiiioooouuuu';
    let novaFrase = '';
    for(i = 0;i<frase.length;i++){
        if(comAcento.includes(frase[i])){
            novaFrase += frase[i].replace(comAcento[comAcento.indexOf(frase[i])],semAcento[comAcento.indexOf(frase[i])]);
        }
        else{
            novaFrase+=frase[i];
        }                
    }
    return novaFrase;
}

var chatBotMem = [];

document.querySelector('main').innerHTML+= `
    <div id="chatbot_chat">
        <div class="container">
            <div class="chat">

                    <p class="miniaturaChatbot">Assistente virtual</p>

                    <div class="mensagens"></div>

                    <form id="chatbotInput" class="d-flex input" role="search">
                        <input class="form-control me-2" type="search" placeholder="Digite..." aria-label="Search">
                        <button class="btn btn-outline-success" type="submit">Enviar</button>
                    </form>

            </div>
        </div>
    </div>
    <div id="chatbot">
        <img src="img/logo-safe.jpeg" alt="">
    </div>`;

document.querySelector("#chatbot").addEventListener('click',()=>{
    let msg = document.querySelector('#chatbot_chat');
    if (msg.style.display == 'block') {
        msg.style.display = 'none';
    }
    else{
        msg.style.display = 'block';
        msg.style.bottom = 'calc(5% + 100px)'
    }
});

document.querySelector('#chatbotInput').addEventListener('submit',(evento) =>{

    let chatMsg = document.querySelector('#chatbot_chat .mensagens');
    console.log(chatMsg);
    let msg = document.querySelector('#chatbotInput input');

    if (msg.value.length > 0) {
        chatMsg.innerHTML += `<div class="msgBox darker msgRemetente">
                                <p>${msg.value}</p>
                                <span class="time-left">${new Date().getHours() + ":" + new Date().getMinutes()}</span>
                            </div>`;
        let string = msg.value;

        if (chatBotMem.length == 0) {
            if (string.includes('cadast') || string.includes('Cadast')) {
                chatBotAddMsg('Deseja cadastrar novo usuário?');
                chatBotMem.push('cadastro');
            }
            else if(string.includes('sair') || string.includes('Sair') || string.includes('logout') || string.includes('Logout') || string.includes('logoff') || string.includes('Logoff')){
                chatBotAddMsg('Deseja realmente sair?');
                chatBotMem.push('logout');
            }
            else if(string.includes('adicion') || string.includes('Adicio') || string.includes('publi') || string.includes('Publi')) {
                chatBotAddMsg('Quer adicionar uma publicação?');
                chatBotMem.push('publicar');
            }
            else if(string.includes('invest') || string.includes('Invest') || string.includes('dica') || string.includes('Dica')) {
                chatBotAddMsg('A Safe Investment é a plataforma perfeita para aprender a investir! Navegue pelos vídeos para aprender dicas e adquirir conhecimento.');
                chatBotMem = [];
            }
            else if(string.includes('obrigad') || string.includes('Obrigad') || string.includes('agrade') || string.includes('Agrade')) {
                chatBotAddMsg('Espero ter ajudado! Caso tenha mais dúvidas é só perguntar!');
                chatBotMem = [];
            }
            else if(string.includes('ola') || string.includes('Ola') || string.includes('olá') || string.includes('Olá') || string.includes('oi') || string.includes('Oi') || string.includes('boa') || string.includes('Boa') || string.includes('Bom') || string.includes('bom')) {
                chatBotAddMsg('Olá! Em que posso ajudar?');
                chatBotMem = [];
            }
            else{
                chatBotAddMsg('Não entendi');
                chatBotMem = [];
            }
        }
        else{
            if(chatBotMem[chatBotMem.length-1] == "logout"){
                if (string == 'sim' || string == 'Sim' || string == 's' || string == 'S') {
                    window.location.replace('/login.html');
                }
                else if (string == 'não' || string == 'nao' || string == 'Não' || string == 'não' || string == 'n' || string == 'N') {
                    chatBotMem = [];
                }
                else{
                    chatBotMem = [];
                    chatBotAddMsg('Não entendi, deseja cadastrar?');
                }
            }
            else if(chatBotMem[chatBotMem.length-1] == "publicar"){
                if (string == 'sim' || string == 'Sim' || string == 's' || string == 'S') {
                    chatBotAddMsg('Para adicionar uma publicação, clique no ícone de câmera no canto superior direito!');
                    chatBotAddMsg('Caso queira criar uma nova classe, clique no ícone de quadradinhos ao lado da câmera.');
                    chatBotMem = [];
                }
                else if (string == 'não' || string == 'nao' || string == 'Não' || string == 'não' || string == 'n' || string == 'N') {
                    chatBotMem = [];
                }
                else{
                    chatBotMem = [];
                    chatBotAddMsg('Não entendi, deseja publicar?');
                }
            }
            else if(chatBotMem[chatBotMem.length-1] == "cadastro"){

                chatBotAddMsg('Para cadastrar um novo usuário é necessário sair de sua conta primeiro. Deseja sair?');
                chatBotMem[chatBotMem.length-1] = "logout";

            }
            else{
                chatBotAddMsg('Não entendi, pode repetir por favor?');
            }
        }

        msg.value = '';
        document.querySelector('#chatbot_chat .mensagens').scroll(0,9999999999);
    }
    
    evento.preventDefault();
});


chatBotAddMsg('Bem vindo(a) à assistente virtual da Safe Investment!');

function chatBotAddMsg(string){
    document.querySelector('#chatbot_chat .mensagens').innerHTML += `
        <div class="msgBox darker msgDestinatario">
            <p>${string}</p>
            <span class="time-left">${new Date().getHours() + ":" + new Date().getMinutes()}</span>
        </div>`;
}
