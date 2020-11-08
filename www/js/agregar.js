document.addEventListener("deviceready", conexionInternet, false);
$("#cargando").modal("show");

$(function() {
    validarlocalStorage();

    $("#fk_id_usuario").val(localStorage.id);

    $("#formAgregar").validate({
        debug: true,
        rules: {
            nombreAhorro: "required",
            objetivo: "required",
            intervalo: "required"
        },
        errorElement: 'span',
        highlight: function(element, errorClass, validClass) {
            $(element).addClass('is-invalid');
            $(element).removeClass('is-valid');
        },
        unhighlight: function(element, errorClass, validClass) {
            $(element).removeClass('is-invalid');
            $(element).addClass('is-valid');
        }
    });

    $("#formAgregar").submit(function(event) {
        event.preventDefault();
        objetivo = parseInt($("#objetivo").val());
        intervalo = parseInt($("#intervalo").val());
        if (objetivo > intervalo) {
            if ($("#formAgregar").valid()) {
                $("#cargando").modal("show");
                $("#index").addClass("disabled");
                $("#index").attr("disabled", true);
                $("#cerrarSesion").addClass("disabled");
                $("#cerrarSesion").attr("disabled", true);
                $("#btn-agregar").addClass("disabled");
                $("#btn-agregar").attr("disabled", true);
                $.ajax({
                    url: URL_BASE,
                    type: "POST",
                    cache: false,
                    contentType: false,
                    processData: false,
                    dataType: "json",
                    data: new FormData(this),
                    success: function(data) {
                        if (data.success) {
                            window.location.href = "index.html";
                        } else {
                            $("#errorTitulo").html("Error al crear");
                            $("#errorContenido").html(data.msj);
                            $("#modalError").modal("show");
                        }
                    },
                    error: function() {
                        $("#index").removeClass("disabled");
                        $("#index").removeAttr("disabled");
                        $("#cerrarSesion").removeClass("disabled");
                        $("#cerrarSesion").removeAttr("disabled");
                        $("#btn-agregar").removeClass("disabled");
                        $("#btn-agregar").removeAttr("disabled");
                        $("#errorTitulo").html("Error en el envio de datos");
                        $("#errorContenido").html("Ha ocurrido un error con al conexión.");
                        $("#modalError").modal("show");
                    },
                    complete: function() {
                        cerrarModalCargando();
                    }
                });
            }
        } else {
            $("#errorTitulo").html("El intervalo es mayor");
            $("#errorContenido").html("El intervalo es mayor al objectivo, debes de colocar un intervalo menor");
            $("#modalError").modal("show");
        }
    });
});

function conexionInternet() {
    $.ajax({
        url: URL_BASE,
        type: "GET",
        data: { accion: 'conexion' },
        success: function(data) {
            if (data == 1) {
                $("#nombreAhorro").removeAttr("disabled");
                $("#objetivo").removeAttr("disabled");
                $("#intervalo").removeAttr("disabled");
                $("#proposito").removeAttr("disabled");
                $("#btn-agregar").removeAttr("disabled");
            } else {
                $("#conexionInternet").modal("show");
            }
        },
        error: function() {
            $("#conexionInternet").modal("show");
        },
        complete: function() {
            cerrarModalCargando();
        }
    })
}