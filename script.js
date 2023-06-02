var menuIcon = document.querySelector(".menu-icon");
var sidebar = document.querySelector(".sidebar");
var container = document.querySelector(".container");

// Transforma a sidebar numa menor ao clicar e vice-versa
menuIcon.onclick = function(){
    sidebar.classList.toggle("small-sidebar");
    container.classList.toggle("large-container");
}

function checkLogin() {
    const isLogged = localStorage.getItem("isLogged");
    
    if(!isLogged) {
        window.location.href = "\login.html";
    }
}
checkLogin();