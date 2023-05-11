function addUser(fullName, age, senha, email, cpf) {

    fetch(`http://localhost:6789/user/cadastro?age=${age}&cpf=${cpf}&email=${email}&senha=${senha}&fullName=${fullName}`, {method:"POST"});

}

function loginUser(email, senha) {
    
    fetch(`http://localhost:6789/user/login?email=${email}&senha=${senha}`, { method: "POST", mode: 'cors' })
    .then(T => T.text())
    .then(usuario => {
      console.log(usuario)
    })

}