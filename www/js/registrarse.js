document.addEventListener("deviceready", conexionInternet, false);
$("#cargando").modal("show");

$(function() {
    $("#formRegistro").validate({
        debug: true,
        rules: {
            nombres: "required",
            apellidos: "required",
            pass: "required",
            email: {
                required: true,
                email: true
            },
            rePass: {
                equalTo: "#pass"
            }
        },
        errorElement: 'span',
        errorPlacement: function(error, element) {
            error.addClass('invalid-feedback');
            element.closest('.form-group').append(error);
        },
        highlight: function(element, errorClass, validClass) {
            $(element).addClass('is-invalid');
            $(element).removeClass('is-valid');
        },
        unhighlight: function(element, errorClass, validClass) {
            $(element).removeClass('is-invalid');
            $(element).addClass('is-valid');
        }
    });

    $("#formRegistro").submit(function(event) {
        event.preventDefault();
        if ($("#formRegistro").valid()) {
            $("#cargando").modal("show");
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
                        $("#cargando").modal("show");
                        datosUsuario();
                    } else {
                        $("#errorTitulo").html("Error");
                        $("#errorContenido").html(data.msj);
                        $("#modalError").modal("show");
                    }
                },
                error: function() {
                    $("#errorTitulo").html("Error al envio");
                    $("#errorContenido").html("Ha ocurrido un error al enviar los datos");
                    $("#modalError").modal("show");
                },
                complete: function() {
                    cerrarModalCargando();
                }
            });
        }
    });
});

function datosUsuario() {
    $.ajax({
        url: URL_BASE,
        type: "GET",
        dataType: "json",
        data: { accion: "iniciarSesion", email: $("#email").val(), password: $("#pass").val() },
        success: function(data) {
            if (data.cantidad_registros == 1) {
                localStorage.id = data[0].id;
                localStorage.nombres = data[0].nombres;
                localStorage.apellidos = data[0].apellidos;
                localStorage.email = data[0].email;
                localStorage.pass = $("#pass").val();
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

function conexionInternet() {
    $.ajax({
        url: URL_BASE,
        type: "GET",
        data: { accion: 'conexion' },
        success: function(data) {
            if (data == 1) {
                $("#nombres").removeAttr("disabled");
                $("#apellidos").removeAttr("disabled");
                $("#email").removeAttr("disabled");
                $("#pass").removeAttr("disabled");
                $("#rePass").removeAttr("disabled");
                $("#btn-registrar").removeAttr("disabled");
                $("#btn-registrar").removeClass("disabled");
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