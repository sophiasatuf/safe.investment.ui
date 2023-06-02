function addUser(fullName, dataNascimento, senha, email, cpf, isProfesor) {
  let translateProfessor = false;
  isProfesor === 'on' && (translateProfessor = true);
  fetch(`http://localhost:6789/user/cadastro?dataNascimento=${dataNascimento}&cpf=${cpf}&email=${email}&senha=${senha}&fullName=${fullName}&isProfessor=${translateProfessor}`, {method:"POST"});
}

async function loginUser(email, senha) {
    let resposta = false;
    await fetch(`http://localhost:6789/user/login?email=${email}&senha=${senha}`, { method: "POST", mode: 'cors' })
    .then(T => T.text())
    .then(usuarioData => {
      if(parseInt(usuarioData.split("ID: ")[1][0]) == -1) {
        resposta = false;
      }
      else {
        resposta = true;
        localStorage.setItem("isLogged", true);
        localStorage.setItem("usuarioData", usuarioData);
        localStorage.setItem("isProfessor", usuarioData.split("ISPROFESSOR: ")[1].substring(0, 4) === "true" ? true : false);
      }
    })
    return resposta;
}