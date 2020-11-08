document.addEventListener('backbutton', onBackKeyDown, false);
document.addEventListener("deviceready", conexionInternet, false);
//document.addEventListener("deviceready", getVersion, false);
$("#cargando").modal("show");

$(function() {
    validarlocalStorage();
    //actualizarVersion();

    localStorage.removeItem('idAhorro');
    localStorage.removeItem('ahorrado');
    localStorage.removeItem('check');
    localStorage.removeItem('idIntervalo');
    localStorage.removeItem('intervalo');


    $("#btn-borrar").on("click", function() {
        $("#cargando").modal("show");
        $.ajax({
            url: URL_BASE,
            type: "GET",
            data: { accion: 'borrarAhorro', idAhorro: $("#btn-borrar").val() },
            success: function(data) {
                if (data == 1) {
                    window.location.reload();
                } else {
                    $("#errorTitulo").html("Error");
                    $("#errorContenido").html("No se ha borrado el ahorro");
                    $("#modalError").modal("show");
                }
            },
            error: function() {
                $("#errorTitulo").html("Error");
                $("#errorContenido").html("Error al intentar borrar");
                $("#modalError").modal("show");
            },
            complete: function() {
                cerrarModalCargando();
            }
        })
    });
});

function traerAhorros() {
    $.ajax({
        url: URL_BASE,
        type: "GET",
        dataType: "json",
        data: { accion: "traerAhorros", idUsuario: localStorage.id },
        success: function(data) {
            delete data["cantidad_columnas"];
            delete data["sql"];

            if (data.cantidad_registros < 3) {
                $("#btn-agregarAhorro").removeClass("disabled");
            }

            for (let i = 0; i < data.cantidad_registros; i++) {
                $("#ahorros").append(`<div class="card mb-4">
                    <div class="modal-header">
                      <h5 class="card-title">${data[i].nombre}</h5>
                      <button type="button" onClick="confirmarBorrar(${data[i].id});" class="close" data-dismiss="modal"><i class="fas fa-trash-alt"></i></button>
                    </div>
                    <div class="card-body">
                      
                      <h6 class="card-subtitle mb-2 text-muted">Objetivo: $${new Intl.NumberFormat("de-DE").format(data[i].objetivo)}</h6>
                      <p class="card-text">Ahorrado: $${new Intl.NumberFormat("de-DE").format(data[i].ahorrado)} </p>
                      <div class="progress">
                        <div class="progress-bar" role="progressbar" style="width: ${calcularPorcentaje(data[i].objetivo,data[i].ahorrado)}%;" aria-valuenow="" aria-valuemin="0" aria-valuemax="100">${calcularPorcentaje(data[i].objetivo,data[i].ahorrado)}%</div>
                      </div>
                      <br>
                      <button onClick="irAhorro(${data[i].id})" class="btn btn-block btn-info text-white"><i class="far fa-eye"></i> Ver</button>
                    </div>
                  </div>`);
            }
        },
        error: function() {
            $("#errorTitulo").html("Error");
            $("#errorContenido").html("No se han traido los ahorros");
            $("#modalError").modal("show");
        },
        complete: function() {
            cerrarModalCargando();
        }
    });
}

function confirmarBorrar(idAhorro) {
    $("#btn-borrar").val(idAhorro);
    $("#modalConfirmar").modal("show");
}

function calcularPorcentaje(objetivo, ahorrado) {
    var porcentaje;
    objetivo = parseInt(objetivo, 10);
    ahorrado = parseInt(ahorrado, 10);

    porcentaje = (100 * ahorrado) / objetivo;
    return porcentaje;

}

function irAhorro(id) {
    localStorage.idAhorro = id;
    window.location.href = "ahorro.html";
}

function conexionInternet() {
    $.ajax({
        url: URL_BASE,
        type: "GET",
        data: { accion: 'conexion' },
        success: function(data) {
            if (data == 1) {
                traerAhorros();
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
        url: URL_BASE,
        type: "GET",
        data: { accion: 'versionActual' },
        success: function(data) {
            if (data != localStorage.version) {
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