//const URL_BASE = "http://192.168.0.7/personalBancaBack/acciones.php"
//const URL_BASE = "https://apparqueo.com/personalBancaBack/acciones.php"
const URL_BASE = "http://127.0.0.1:8000/api/"

$(function() {
    $("#recargar").on("click", function() {
        window.location.reload();
    });
})

function validarlocalStorage() {
    if (!localStorage.id && !localStorage.email && !localStorage.password && !localStorage.nombres && !localStorage.apellidos) {
        window.location.href = 'login.html';
    }
}

function onBackKeyDown() {
    navigator.app.exitApp();
}

function cerrarSesion() {
    localStorage.clear();
    window.location.href = "login.html";
}

function cerrarModalCargando() {
    setTimeout(function() {
        $("#cargando").modal("hide");
    }, 1000);
}