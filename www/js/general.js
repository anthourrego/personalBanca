const URL_BASE = "http://localhost/personalBancaBack/acciones.php"
//const URL_BASE = "http://apparqueo.com/personalBancaBack/acciones.php"

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