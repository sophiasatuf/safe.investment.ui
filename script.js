var menuIcon = document.querySelector(".menu-icon");
var sidebar = document.querySelector(".sidebar");
var container = document.querySelector(".container");
let server = "safeinvestment.postgres.database.azure.com";

// Transforma a sidebar numa menor ao clicar e vice-versa
menuIcon.onclick = function(){
    sidebar.classList.toggle("small-sidebar");
    container.classList.toggle("large-container");
}

function checkLogin() {
    const isLogged = localStorage.getItem("isLogged");
    
    if(!isLogged) {
        console.log(isLogged);
        window.location.href = "\login.html";
    }
}
checkLogin();

//chatbot
function addUser(fullName, dataNascimento, senha, email, cpf, isProfesor) {
    let translateProfessor = false;
    isProfesor === 'on' && (translateProfessor = true);
    fetch(`http://localhost:6789/user/cadastro?dataNascimento=${dataNascimento}&cpf=${cpf}&email=${email}&senha=${senha}&fullName=${fullName}&isProfessor=${translateProfessor}`, {method:"POST"});
}

/Função que remove o acento/
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
/--------------------------------------/


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

    let fullName = '';
    let age = '';
    let senha = '';
    let email = '';
    let cpf = '';
    let isProfesor = false;

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