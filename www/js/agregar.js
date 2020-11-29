document.addEventListener("deviceready", conexionInternet, false);
document.addEventListener('backbutton', onBackKeyDown, false);
$("#cargando").modal("show");

$(function() {
    validarlocalStorage();

    $(":input[name='fk_id_usuario']").val(localStorage.id);

    if (localStorage.tipoAhorro == 1) {
        $("#ahorro").removeClass("d-none");
        $("#deudas").addClass("d-none");
    } else {
        $("#ahorro").addClass("d-none");
        $("#deudas").removeClass("d-none");
    }

    $('#fechaLimite, #fechaLimite2').datetimepicker({
        format: 'L',
        defaultDate: new Date(),
        minDate: new Date()
    });

    $("#intervalo, #objetivo, #formAgregarDeuda :input[name='deuda']").keyup(function(event){
        $(this).val(function(index, value){
            return value
                .replace(/\D/g, "")
                .replace(/([0-9])([0-9]{2})$/, '$1$2')
                .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ".")
        });
    });

    $("#formAgregar :input[name='tipoAhorro']").on("change", function(){
        if ($(this).val() == 2) {
            $("#intervalo").prop("disabled", false).closest(".form-group").removeClass("d-none");
        } else {
            $("#intervalo").prop("disabled", true).closest(".form-group").addClass("d-none");
        }
    });

    $("#checkFecha").on("click", function(){
        if ($(this).is(":checked")) {
            $("#formfechaLimite").prop("disabled", true);
            $("#fechaLimite").addClass("d-none");
        } else {
            $("#formfechaLimite").prop("disabled", false);
            $("#fechaLimite").removeClass("d-none");
        }
    });

    $("#checkFecha2").on("click", function(){
        if ($(this).is(":checked")) {
            $("#formfechaLimite2").prop("disabled", true);
            $("#fechaLimite2").addClass("d-none");
        } else {
            $("#formfechaLimite2").prop("disabled", false);
            $("#fechaLimite2").removeClass("d-none");
        }
    });

    $("#formAgregar").validate({
        debug: true,
        errorElement: 'span',
        errorPlacement: function (error, element) {
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

    $("#formAgregarDeuda").validate({
        debug: true,
        errorElement: 'span',
        errorPlacement: function (error, element) {
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

    $("#formAgregarDeuda").submit(function(event){
        event.preventDefault();

        if ($("#formAgregarDeuda").valid()) {
            $("#cargando").modal("show");
            $("#index").addClass("disabled").prop("disabled", true);
            $("#cerrarSesion").addClass("disabled").prop("disabled", true);
            $("#formAgregarDeuda :input[name='btn-agregar']").addClass("disabled").prop("disabled", true);

            $.ajax({
                url: URL_BASE + "agregarDeuda",
                type: "POST",
                cache: false,
                contentType: false,
                processData: false,
                dataType: "json",
                data: new FormData(this),
                success: function(data) {
                    if (data.success) {
                        window.location.href = "ahorros.html";
                    } else {
                        $("#errorTitulo").html("Error al crear");
                        $("#errorContenido").html(data.msj);
                        $("#modalError").modal("show");
                    }
                },
                error: function() {
                    $("#errorTitulo").html("Error en el envio de datos");
                    $("#errorContenido").html("Ha ocurrido un error con al conexión.");
                    $("#modalError").modal("show");
                },
                complete: function() {
                    $("#index").removeClass("disabled").prop("disabled", false);
                    $("#cerrarSesion").removeClass("disabled").prop("disabled", false);
                    $("#formAgregarDeuda :input[name='btn-agregar']").removeClass("disabled").prop("disabled", false);
                    cerrarModalCargando();
                }
            });
        }
    });

    $("#formAgregar").submit(function(event) {
        event.preventDefault();
        objetivo = parseInt($("#objetivo").val().replace(/\./g, ''));
        intervalo = parseInt($("#intervalo").val().replace(/\./g, ''));
        validacion = true;

        if ($("#formAgregar :input[name='tipoAhorro']").val() == 2) {
            if (objetivo < intervalo) {
                validacion = false;
            }
        }

        if (validacion) {
            if ($("#formAgregar").valid()) {
                $("#cargando").modal("show");
                $("#index").addClass("disabled").prop("disabled", true);
                $("#cerrarSesion").addClass("disabled").prop("disabled", true);
                $("#btn-agregar").addClass("disabled").prop("disabled", true);

                $.ajax({
                    url: URL_BASE + 'agregarAhorro',
                    type: "POST",
                    cache: false,
                    contentType: false,
                    processData: false,
                    dataType: "json",
                    data: new FormData(this),
                    success: function(data) {
                        if (data.success) {
                            window.location.href = "ahorros.html";
                        } else {
                            $("#errorTitulo").html("Error al crear");
                            $("#errorContenido").html(data.msj);
                            $("#modalError").modal("show");
                        }
                    },
                    error: function() {
                        $("#errorTitulo").html("Error en el envio de datos");
                        $("#errorContenido").html("Ha ocurrido un error con al conexión.");
                        $("#modalError").modal("show");
                    },
                    complete: function() {
                        $("#index").removeClass("disabled").prop("disabled", false);
                        $("#cerrarSesion").removeClass("disabled").prop("disabled", false);
                        $("#btn-agregar").removeClass("disabled").prop("disabled", false);
                        cerrarModalCargando();
                    }
                });
            }
        } else {
            $("#errorTitulo").html("El intervalo es mayor");
            $("#errorContenido").html("El intervalo es mayor al objetivo, debes de colocar un intervalo menor.");
            $("#modalError").modal("show");
        }
    });
});

function conexionInternet() {
    $.ajax({
        url: URL_BASE  + 'conexion',
        type: "GET",
        success: function(data) {
            if (data == 1) {
                $("#formAgregarDeuda :input[name='nombreDeuda']").prop("disabled", false);
                $("#formAgregarDeuda :input[name='deuda']").prop("disabled", false);
                $("#formAgregarDeuda :input[name='btn-agregar']").prop("disabled", false);

                $("#nombreAhorro").prop("disabled", false);
                $("#objetivo").prop("disabled", false);
                $("#btn-agregar").prop("disabled", false);
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

function onBackKeyDown(){
    window.location.href = "ahorros.html";
}