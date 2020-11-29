document.addEventListener('backbutton', onBackKeyDown, false);
document.addEventListener("deviceready", conexionInternet, false);
$("#cargando").modal("show");

$(function() {
    $("#formLogin").validate({
        debug: true,
        rules: {
            email: { // <- this is the NAME attribute
                required: true,
                email: true
            },
            password: "required"
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

    $("#formLogin").submit(function(event) {
        event.preventDefault();
        if ($("#formLogin").valid()) {
            $("#cargando").modal("show");
            $.ajax({
                url: URL_BASE + 'login/' + $("#email").val() + '/' + $("#password").val(),
                type: "GET",
                dataType: "json",
                success: function(data) {
                    if (data.success) {
                        localStorage.id = data.msj.id;
                        localStorage.nombres = data.msj.nombres;
                        localStorage.apellidos = data.msj.apellidos;
                        localStorage.email = data.msj.email;
                        localStorage.pass = $("#pass").val();
                        localStorage.pin = data.msj.pin;
                        window.location.href = "index.html"
                    } else {
                        $("#errorTitulo").html("Inicio de sesion");
                        $("#errorContenido").html(data.msj);
                        $("#modalError").modal("show");
                    }
                },
                error: function() {
                    $("#errorTitulo").html("Inicio de sesion");
                    $("#errorContenido").html("Error al iniciar sesión.");
                    $("#modalError").modal("show");
                },
                complete: function() {
                    cerrarModalCargando();
                }
            });
        }
    });
});

function conexionInternet() {
    $.ajax({
        url: URL_BASE  + 'conexion',
        type: "GET",
        success: function(data) {
            if (data == 1) {
                $("#email").removeAttr("disabled");
                $("#password").removeAttr("disabled");
                $("#btn-login").removeAttr("disabled");
                $("#btn-login").removeClass("disabled");
                $("#registro").removeClass("d-none");
                $("#old-contra").removeClass("d-none");
            } else {
                $("#conexionInternet").modal("show");
            }
        },
        error: function(data) {
            $("#conexionInternet").modal("show");
        },
        complete: function() {
            cerrarModalCargando();
        }

    })
}