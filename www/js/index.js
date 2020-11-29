document.addEventListener('backbutton', onBackKeyDown, false);
document.addEventListener("deviceready", conexionInternet, false);
document.addEventListener("deviceready", getVersion, false);
$("#cargando").modal("show");

$(function() {
    validarlocalStorage();
    actualizarVersion();

    $("#ahorros").on("click", function(event){
        event.preventDefault();
        localStorage.tipoAhorro = 1;
        window.location.href = "ahorros.html";
    });

    $("#deudas").on("click", function(event){
        event.preventDefault();
        localStorage.tipoAhorro = 2;
        window.location.href = "ahorros.html";
    });
});

function conexionInternet() {
    $.ajax({
        url: URL_BASE + 'conexion',
        type: "GET",
        success: function(data) {
            if (data == 1) {
                //traerAhorros();
            } else {
                cerrarModalCargando();
                $("#conexionInternet").modal("show");
            }
        },
        error: function() {
            cerrarModalCargando();
            $("#conexionInternet").modal("show");
        }
    })
}

function getVersion() {
    cordova.getAppVersion.getVersionNumber().then(function(version) {
        localStorage.setItem("version", version);
    });
};

function actualizarVersion() {
    $.ajax({
        url: URL_BASE + "versionActual",
        type: "GET",
        success: function(data) {
            if (data > localStorage.version) {
                $("#modalActualizarApp").modal("show");
                setTimeout(function() { var ref = window.open('https://play.google.com/store/apps/details?id=com.carenepeprojects.personabanca', '_system', 'location=no'); }, 1000);
                setTimeout(function() { exit(); }, 1500);
            }
        },
        error: function() {
            $("#conexionInternet").modal("show");
        }
    })
}
