function addUser(fullName, age, senha, email, cpf, isProfesor) {

    fetch(`http://localhost:6789/user/cadastro?age=${age}&cpf=${cpf}&email=${email}&senha=${senha}&fullName=${fullName}&isProfessor=${isProfesor}`, {method:"POST"});

}

async function loginUser(email, senha) {
    let resposta = false;
    await fetch(`http://localhost:6789/user/login?email=${email}&senha=${senha}`, { method: "POST", mode: 'cors' })
    .then(T => T.text())
    .then(IDusuario => {
      console.log(IDusuario)
      if(IDusuario == -1) {
        resposta = false;
      }
      else {
        resposta = true;
        localStorage.setItem("isLogged", true);
        localStorage.setItem("IDusuario", IDusuario);
      }
    })
    return resposta;
}