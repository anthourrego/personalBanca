document.addEventListener("deviceready", conexionInternet, false);
document.addEventListener('backbutton', onBackKeyDown, false);
$("#cargando").modal("show");

$(function() {
    validarlocalStorage();

    localStorage.removeItem('idAhorro');
    localStorage.removeItem('ahorrado');
    localStorage.removeItem('check');
    localStorage.removeItem('idIntervalo');
    localStorage.removeItem('intervalo');
    localStorage.removeItem('tipo');

    if (localStorage.tipoAhorro == 1) {
      $("#tipoAhorro").text("Ahorros");
    } else {
      $("#tipoAhorro").text("Deudas");
    }

    $("#btn-borrar").on("click", function() {
        $("#modalConfirmar").modal("hide");
        $("#cargando").modal("show");
        $.ajax({
            url: URL_BASE + 'borrarAhorro',
            type: "DELETE",
            data: { 
                idAhorro: $("#btn-borrar").val(), 
                tipo: $("#btn-borrar").data("tipo")
            },
            success: function(data) {
                if (data.success) {
                    window.location.reload();
                } else {
                    $("#errorTitulo").html("Error");
                    $("#errorContenido").html(data.msj);
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
        url: URL_BASE + 'traerAhorros/' + localStorage.id + '/' + localStorage.tipoAhorro,
        type: "GET",
        dataType: "json",
        success: function(data) {
            console.log(localStorage.tipoAhorro);
            if (data.length < 3 || localStorage.tipoAhorro == 2) {
                $("#btn-agregarAhorro").removeClass("disabled");
            }
            
            for (let i = 0; i < data.length; i++) {
                var tipo = '';
                if (localStorage.tipoAhorro == 1) {
                  if (data[i].tipo_ahorro == 1) {
                      tipo = '<p class="card-text">Tipo: Ahorro libre</p>';
                  } else {
                      tipo = '<p class="card-text">Tipo: Ahorro programado</p>';
                  } 
                }

                $("#ahorros").append(`<div class="card mb-4">
                    <div class="modal-header">
                      <h5 class="card-title">${data[i].nombre}</h5>
                      <button type="button" onClick="confirmarBorrar(${data[i].id}, ${data[i].tipo_ahorro});" class="close" data-dismiss="modal"><i class="fas fa-trash-alt"></i></button>
                    </div>
                    <div class="card-body">
                      <h6 class="card-subtitle mb-2 text-muted">Faltan: $ ${new Intl.NumberFormat("de-DE").format(data[i].objetivo - data[i].ahorrado)} </h6>
                      ${tipo}
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

function confirmarBorrar(idAhorro, tipo) {
    $("#btn-borrar").val(idAhorro);
    $("#btn-borrar").data("tipo", tipo);
    $("#modalConfirmar").modal("show");
}

function calcularPorcentaje(objetivo, ahorrado) {
    var porcentaje;
    objetivo = parseInt(objetivo, 10);
    ahorrado = parseInt(ahorrado, 10);

    porcentaje = parseFloat(Math.round(100 * ahorrado) / objetivo).toFixed(2);
    return porcentaje;

}

function irAhorro(id) {
    localStorage.idAhorro = id;
    window.location.href = "ahorro.html";
}

function conexionInternet() {
    $.ajax({
        url: URL_BASE  + 'conexion',
        type: "GET",
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

function onBackKeyDown(){
  window.location.href = "index.html";
}

