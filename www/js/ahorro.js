document.addEventListener("deviceready", conexionInternet, false);
$("#cargando").modal("show");

$(function() {
    validarlocalStorage();

    $('#input-search').on('keyup', function() {
        var rex = new RegExp($(this).val(), 'i');
        $('.searchable-container .items').hide();
        $('.searchable-container .items').filter(function() {
            return rex.test($(this).text());
        }).show();
    });
});

function cambiarCheck(id, intervalo) {
    if ($("#int_" + id).val() == 0) {
        localStorage.check = 1;
        localStorage.intervalo = Number(localStorage.ahorrado) + Number(intervalo);
        localStorage.idIntervalo = id
        actualizarMonto();
    } else {
        localStorage.check = 0;
        localStorage.intervalo = Number(localStorage.ahorrado) - Number(intervalo);
        localStorage.idIntervalo = id
        $("#modalConfirmar").modal("show");
        $("#montoConfirmacion").html(new Intl.NumberFormat("de-DE").format(intervalo));
    }

}

function actualizarMonto() {
    localStorage.ahorrado = localStorage.intervalo;
    $.ajax({
        url: URL_BASE,
        type: "GET",
        dataType: "json",
        data: { accion: 'actualizarMonto', id: localStorage.idIntervalo, chec: localStorage.check, idAhorro: localStorage.idAhorro, ahorrado: localStorage.ahorrado },
        success: function(data) {
            if (data == 1) {
                if ($("#int_" + localStorage.idIntervalo).val() == 0) {
                    $("#icon" + localStorage.idIntervalo).removeClass("d-none");
                    $("#int_" + localStorage.idIntervalo).val(1);
                } else {
                    $("#icon" + localStorage.idIntervalo).addClass("d-none");
                    $("#int_" + localStorage.idIntervalo).val(0);
                }

                $("#ahorrado").html(new Intl.NumberFormat("de-DE").format(localStorage.ahorrado));
            } else {
                $("#errorTitulo").html("Error en el check");
                $("#errorContenido").html("Error al intentar actualizar.");
                $("#modalError").modal("show");
            }
            localStorage.removeItem('check');
            localStorage.removeItem('idIntervalo');
            localStorage.removeItem('intervalo');
        },
        error: function() {
            $("#errorTitulo").html("Error en el check");
            $("#errorContenido").html("Error al intentar actualizar.");
            $("#modalError").modal("show");
        }
    });
}

function generarTabla() {
    $.ajax({
        url: URL_BASE,
        type: "GET",
        dataType: "json",
        data: { accion: 'datosMontos', idAhorro: localStorage.idAhorro },
        success: function(data) {
            $('#montos').empty();
            for (let i = 0; i < data.cantidad_registros; i++) {
                if (data[i].chec == 1) {
                    $('#montos').append('<div class="col-4 text-center border items"><button id="int_' + data[i].id + '" onClick="cambiarCheck(' + data[i].id + ', ' + data[i].intervalo + ')" class="btn btn-light w-100" value="' + data[i].chec + '">' + new Intl.NumberFormat("de-DE").format(data[i].intervalo) + ' <span id="icon' + data[i].id + '">✔<span></button></div>');
                } else {
                    $('#montos').append('<div class="col-4 text-center border items"><button id="int_' + data[i].id + '" onClick="cambiarCheck(' + data[i].id + ', ' + data[i].intervalo + ')" class="btn btn-light w-100" value="' + data[i].chec + '">' + new Intl.NumberFormat("de-DE").format(data[i].intervalo) + ' <span id="icon' + data[i].id + '" class="d-none">✔<span></button></div>');
                }
            }
        },
        error: function() {
            $("#errorTitulo").html("Error al traer datos");
            $("#errorContenido").html("No se ha realizado la conexión para los montos.");
            $("#modalError").modal("show");
        },
        complete: function() {
            cerrarModalCargando();
        }
    });
}

function datosAhorro() {
    $.ajax({
        url: URL_BASE,
        type: "GET",
        dataType: "json",
        data: { accion: 'datosAhorro', idAhorro: localStorage.idAhorro },
        success: function(data) {
            localStorage.ahorrado = data[0].ahorrado;
            $("#tituloAhorro").html(data[0].nombre);
            $("#objetivoAhorro").html(new Intl.NumberFormat("de-DE").format(data[0].objetivo));
            $("#ahorrado").html(new Intl.NumberFormat("de-DE").format(data[0].ahorrado));
            generarTabla();
        },
        error: function() {
            cerrarModalCargando();
            $("#errorTitulo").html("Error al traer datos");
            $("#errorContenido").html("No se ha realizado la conexión.");
            $("#modalError").modal("show");
        }
    })
}

function conexionInternet() {
    $.ajax({
        url: URL_BASE,
        type: "GET",
        data: { accion: 'conexion' },
        success: function(data) {
            if (data == 1) {
                datosAhorro();
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