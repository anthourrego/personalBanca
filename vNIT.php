<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="description" content="">
	<meta name="author" content="">
	<?php
		header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
		header('Cache-Control: no-store, no-cache, must-revalidate');
		header('Cache-Control: post-check=0, pre-check=0', FALSE);
		header('Pragma: no-cache');
	?>
	<title>Cocora Club - Prosof</title>

	<link rel="shortcut icon" type="image/x-icon" href="<?=base_url()?>assets/img/ico/favicon.ico">
	<link rel="stylesheet" type="text/css" href="<?= base_url() ?>assets/css/alertify/alertify.min.css" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="<?= base_url() ?>assets/css/alertify/themes/bootstrap.min.css" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="<?= base_url();?>assets/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="<?= base_url();?>assets/css/font-awesome/css/all.min.css">
	<link rel="stylesheet" type="text/css" href="<?= base_url();?>assets/css/personalizados/login.css">
</head>
<body>
<div href="javascript:void(0);" id="overlay"></div>
	<div class="limiter">
		<div class="container-login100" style="background-image: url('<?= base_url();?>assets/img/login/bgClub.jpg');">
			<div class="wrap-login100 px-0 py-0">
                <div class="col-md-12 py-4 px-4" style="background-color: #fff; border-radius:5px 5px 0px 60px;">
                    <span class="login100-form-logo">
                        <img src="<?= base_url();?>assets/img/ClubControl.png" style="width: 100px;">
                    </span>
                </div>
                <div class="col-md-12 py-2 px-4">
					<form class="login100-form validate-form" id="login" action="<?= base_url('login/validarAccion') ?>" method="post" autocomplete="off">
                        <span class="login100-form-title p-t-27">
                            Cocora Club
                        </span>
                        <p class="text-center pb-3 txt1" style="font-size: 15px;font-family: Poppins-Medium;line-height: 14px;">
                        	Reserva, actualiza, controla.
                        </p>

						<div class="form-valid">
							<div class="wrap-input100 validate-input" data-validate = "* Ingresa tu usuario">
								<input class="input100" type="text" id="NroDocumento" name="NroDocumento" required onkeypress="return soloNumeros(event)">
								<span class="focus-input100" data-placeholder="&#xf2c2; &nbsp; Nro Documento"></span>
							</div>
						</div>

						<div class="row justify-content-center mt-4">
							<div class="col-12 col-md-8 container-login100-form-btn">
								<input class="login100-form-btn" type="submit" name="Submit" value="Ingresar" type="submit">
							</div>
						</div>

                        <div class="text-center py-3">
                            <a class="txt1" href="<?php echo base_url();?>">
                                ¿Conexión imposible?
                            </a>
                        </div>
                    </form>
                </div>    
            </div>
            <div class="col-md-12">
                <p class="text-center py-3 txt1" style="font-size: 13px;font-family: Poppins-Medium;color:#383838;">
                    Software desarrollado en Pereira - Colombia, para LatinoAmerica.
                </p>
            </div>
		</div>
	</div>	
</body>
</html>
<script type="text/javascript" src="<?= base_url(); ?>assets/js/jquery.min.js"></script>
<script type="text/javascript" src="<?= base_url();?>assets/js/bootstrap.bundle.min.js"></script>
<script type="text/javascript" src="<?= base_url(); ?>assets/js/alertify/alertify.min.js"></script>
<script type="text/javascript" src="<?= base_url(); ?>assets/js/jquery-validate/jquery.validate.min.js"></script>
<script type="text/javascript" src="<?= base_url(); ?>assets/js/jquery-validate/messages_es.min.js"></script>
<script type="text/javascript" src="<?= base_url(); ?>assets/js/inputmask/jquery.inputmask.bundle.min.js"></script>
<script type="text/javascript" src="<?= base_url();?>assets/js/personalizados/jsLogin.js"></script>
<script type="text/javascript">
	(function() {
		document.addEventListener('DOMContentLoaded', function (e) {

			setTimeout(function(){
				$('#NroDocumento').focus();
			},0);

			$('form').submit(function(e){
				e.preventDefault();
				if($(this).valid()){
					$.ajax({
						type: 'POST',
						url: "<?=base_url()?>Login/validarUsuarioDocumento",
						data: {
							Documento: $('#NroDocumento').val()
						},
						success:function(res){
							switch(res){
								case '1':
									location.reload();
									break;
								default:
									alertify.alert("Advertencia", "El numero de cedula ingresado no coincide con los registrados en el sistema o se encuentra en estado Inactiva.", function(){
										setTimeout(function(){
											$('#NroDocumento').focus();
										},400);
									});	
									break;
							}
						}
					});
				}

			});
		});
	})();
</script>

function soloLetrasNumeros(e, input){
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toLowerCase();
    letras = "abcdefghijklmnopqrstuvwxyz1234567890-+/";
    especiales = "8-37-39-46";

    tecla_especial = false;
    
    for (var i in especiales) {
        if (key == especiales[i]) {
            tecla_especial = true;
            break;
        }
    }

    if (letras.indexOf(tecla)==-1 && !tecla_especial) {
        return false;
    }
}
