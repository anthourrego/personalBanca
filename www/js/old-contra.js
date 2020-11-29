document.addEventListener("deviceready", conexionInternet, false);
$("#cargando").modal("show");

$(function(){
  $("#formCorreo").validate({
    debug: true,
    rules: {
      email: "required",
    },
    errorElement: 'span',
    errorPlacement: function (error, element) {
      error.addClass('invalid-feedback');
      element.closest('.form-group').append(error);
    },
    highlight: function (element, errorClass, validClass) {
      $(element).addClass('is-invalid');
      $(element).removeClass('is-valid');
    },
    unhighlight: function (element, errorClass, validClass) {
      $(element).removeClass('is-invalid');
      $(element).addClass('is-valid');
    }
  });

  $("#formCorreo").submit(function(event){
    event.preventDefault();
    if($("#formCorreo").valid()){
      $("#cargando").modal("show");
      $.ajax({
        url: URL_BASE + "enviarPin/" + $("#email").val(),
        type: "GET",
        dataType: "json",
        success: function(data){
          if(data.success){
            console.log('se envia pin correctamente');
            $("#menu").addClass("d-none");
            $("#menuPin").removeClass("d-none");
          }else{
            $("#errorTitulo").html("Recuperaciòn de clave");
            $("#errorContenido").html("Corrreo No Existe");
            $("#modalError").modal("show");
          }
        },
        error: function(){
          $("#errorTitulo").html("Envio de datos");
          $("#errorContenido").html("Error al enviar los datos.");
          $("#modalError").modal("show");
        },
        complete: function(){
          cerrarModalCargando();
        }
      });
    }
  });

  $("#formPin").validate({
    debug: true,
    rules: {
      pin: "required",
    },
    errorElement: 'span',
    errorPlacement: function (error, element) {
      error.addClass('invalid-feedback');
      element.closest('.form-group').append(error);
    },
    highlight: function (element, errorClass, validClass) {
      $(element).addClass('is-invalid');
      $(element).removeClass('is-valid');
    },
    unhighlight: function (element, errorClass, validClass) {
      $(element).removeClass('is-invalid');
      $(element).addClass('is-valid');
    }
  });

  $("#formPin").submit(function(event){
    event.preventDefault();
    if($("#formPin").valid()){
      $("#cargando").modal("show");
      $.ajax({
        url: URL_BASE + "validarPin/" + $("#email").val() + "/" + $("#pin").val(),
        type: "GET",
        dataType: "json",
        success: function(data){
          console.log(data);
          if (data.success) {
            $("#menu").addClass("d-none");
            $("#menuContra").removeClass("d-none");
            $("#menuPin").addClass("d-none");
          }else{
            $("#errorTitulo").html("Validación de pin");
            $("#errorContenido").html("Pin Incorrecto");
            $("#modalError").modal("show");
            // cordova.plugins.snackbar.create('Pin Invalido', 'INDEFINITE', "Cerrar");
          }
        },
        error: function(){
          $("#errorTitulo").html("Envio de datos");
          $("#errorContenido").html("Error al enviar los datos.");
          $("#modalError").modal("show");
        },
        complete: function(){
          cerrarModalCargando();
        }
      });
    }
  });

  $("#formContra").validate({
    debug: true,
    rules: {
      password: "required",
      rePassword:{
        equalTo: "#password"
      }
    },
    errorElement: 'span',
    errorPlacement: function (error, element) {
      error.addClass('invalid-feedback');
      element.closest('.form-group').append(error);
    },
    highlight: function (element, errorClass, validClass) {
      $(element).addClass('is-invalid');
      $(element).removeClass('is-valid');
    },
    unhighlight: function (element, errorClass, validClass) {
      $(element).removeClass('is-invalid');
      $(element).addClass('is-valid');
    }
  });

  $("#formContra").submit(function(event){
    event.preventDefault();
    if($("#formContra").valid()){
      $("#cargando").modal("show");
      $.ajax({
        url: URL_BASE + "nuevaPassword",
        type: "PUT",
        dataType: "json",
        data: { 
          email: $("#email").val(), 
          pass: $("#password").val() 
        },
        success: function(data){
          if (data.success) {
            $("#errorTitulo").html("Cambio de clave");
            $("#errorContenido").html("Clave actualizada correctamente");
            $("#modalError").modal("show");
            setTimeout(function(){ window.location.href = "login.html"  }, 3000);
          }else{
            $("#errorTitulo").html("Contraseña");
            $("#errorContenido").html("No se pudo cambiar contraseña.");
            $("#modalError").modal("show");
          }
        },
        error: function(){
          $("#errorTitulo").html("Transaccion");
          $("#errorContenido").html("error al enviar data");
          $("#modalError").modal("show");
        },
        complete: function(){
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
    success: function(data){
      if(data == 1){
        
      }else{
        $("#conexionInternet").modal("show");
      }
    },
    error: function(){
      $("#conexionInternet").modal("show");
    },
    complete: function(){
      cerrarModalCargando();
    }
  })
}