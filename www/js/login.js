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
                url: URL_BASE,
                type: "GET",
                dataType: "json",
                data: { accion: "iniciarSesion", email: $("#email").val(), password: $("#password").val() },
                success: function(data) {
                    if (data.cantidad_registros == 1) {
                        localStorage.id = data[0].id;
                        localStorage.nombres = data[0].nombres;
                        localStorage.apellidos = data[0].apellidos;
                        localStorage.email = data[0].email;
                        localStorage.pass = $("#password").val();
                        localStorage.pin = data[0].pin;
                        window.location.href = "index.html"
                    } else {
                        $("#errorTitulo").html("Inicio de sesion");
                        $("#errorContenido").html("Usuario Y/O Contraseña Incorrectos");
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
        url: URL_BASE,
        type: "GET",
        data: { accion: 'conexion' },
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