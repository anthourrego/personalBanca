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

    $("#formAddMonto :input[name='monto']").keyup(function(event){
        $(this).val(function(index, value){
            return value
                .replace(/\D/g, "")
                .replace(/([0-9])([0-9]{2})$/, '$1$2')
                .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ".")
        });
    });

    $("#formAddMonto").validate({
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

    $("#formAddMonto").submit(function(event) {
        event.preventDefault();
        valor = $("#formAddMonto :input[name='monto']").val();
        if ($("#formAddMonto").valid()) {
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
                    if (data) {
                        localStorage.ahorrado = Number(localStorage.ahorrado) + Number(valor.replaceAll(".",""));
                        $("#ahorrado").html(new Intl.NumberFormat("de-DE").format(localStorage.ahorrado));
                        generarTabla();
                    } else {
                        $("#errorTitulo").html("Error al agregar monto");
                        $("#errorContenido").html("No se ha podido agregar el valor");
                        $("#modalError").modal("show");
                    }
                },
                error: function() {
                    $("#errorTitulo").html("Error en el envio de datos");
                    $("#errorContenido").html("Ha ocurrido un error con al conexión.");
                    $("#modalError").modal("show");
                },
                complete: function() {
                    $("#modalAddMonto").modal("hide");
                    $("#formAddMonto :input[name='monto']").val("").removeClass("disabled").prop("disabled", false);
                    cerrarModalCargando();
                }
            });
        }
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
            if (localStorage.tipo == 1) {
                $("#addMonto").removeClass("d-none");
                $("#input-search").addClass("d-none");
                if (data.cantidad_registros >= 1) {
                    $("#montos").append(`<ul class="list-group list-group-flush w-100">`);
                    for (let i = 0; i < data.cantidad_registros; i++) {
                        $("#montos").append(`<li class="w-100 list-group-item d-flex justify-content-between align-items-center">
                                                <span><b>$</b> ${new Intl.NumberFormat("de-DE").format(data[i].valor)}</span>
                                                <span>${moment(data[i].fecha).format("DD/MM/YYYY")}</span>
                                            </li>`);
                    }
                    $("#montos").append(`</ul>`);
                }
            } else {
                $("#addMonto").addClass("d-none");
                $("#input-search").removeClass("d-none");
                for (let i = 0; i < data.cantidad_registros; i++) {
                    if (data[i].chec == 1) {
                        $('#montos').append('<div class="col-4 text-center border items"><button id="int_' + data[i].id + '" onClick="cambiarCheck(' + data[i].id + ', ' + data[i].valor + ')" class="btn btn-light w-100" value="' + data[i].chec + '">' + new Intl.NumberFormat("de-DE").format(data[i].valor) + ' <span id="icon' + data[i].id + '">✔<span></button></div>');
                    } else {
                        $('#montos').append('<div class="col-4 text-center border items"><button id="int_' + data[i].id + '" onClick="cambiarCheck(' + data[i].id + ', ' + data[i].valor + ')" class="btn btn-light w-100" value="' + data[i].chec + '">' + new Intl.NumberFormat("de-DE").format(data[i].valor) + ' <span id="icon' + data[i].id + '" class="d-none">✔<span></button></div>');
                    }
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
            localStorage.tipo = data[0].tipo_ahorro;
            $("#tituloAhorro").html(data[0].nombre);
            $("#objetivoAhorro").html(new Intl.NumberFormat("de-DE").format(data[0].objetivo));
            $("#ahorrado").html(new Intl.NumberFormat("de-DE").format(data[0].ahorrado));
            $("#formAddMonto :input[name='idAhorro']").val(data[0].id)
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