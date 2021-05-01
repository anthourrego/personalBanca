<!DOCTYPE HTML>
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

	<link rel="stylesheet" type="text/css" href="<?= base_url() ?>assets/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="<?= base_url();?>assets/css/font-awesome/css/all.min.css">
	<link rel="stylesheet" type="text/css" href="<?= base_url() ?>assets/css/alertify/alertify.min.css">
	<link rel="stylesheet" type="text/css" href="<?= base_url() ?>assets/css/alertify/themes/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="<?= base_url() ?>assets/css/chosen/chosen.min.css">
	<!-- <link rel="stylesheet" type="text/css" href="<?= base_url() ?>assets/css/personalizados/login.css?<?= rand() ?>"> -->
	<link rel="stylesheet" type="text/css" href="<?= base_url();?>assets/css/personalizados/login.css?<?= rand() ?>">
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

				<form class="login100-form validate-form" id="login" action="<?= base_url('login/ingresar') ?>" method="post" autocomplete="off">
                        <span class="login100-form-title p-t-27">
                            Cocora Club
                        </span>
                        <p class="text-center pb-3 txt1" style="font-size: 15px;font-family: Poppins-Medium;line-height: 14px;">
                        Reserva, actualiza, controla.
                        </p>

						<div class="form-valid">
							<div class="wrap-input100 validate-input" data-validate = "* Ingresa tu usuario">
								<?php 
									if (count($Datos) > 0 && count($Datos) == 1) {
										echo '<input type="text" id="txtClub" title="'.$Datos[0]->Club.'" type="text" class="input100 has-val" name="'. rand() .'" required autocomplete="off" value="'.$Datos[0]->Club.'" data-nit="'.$Datos[0]->Nit.'" readonly/>';
									} else {
										echo '<select class="form-control input-sm chos-unit chosen-select ignore" required autofocus id="club" name="'. rand() .'" style="border-radius: 0;">
												<option selected value="" disabled>Seleccione</option>';
												if(count($Datos) > 0){
													foreach ($Datos as $club) {
														echo "<option data-user='".$club->CodigoUsuario."' data-nombre='".$club->Nombre."' value='".$club->Nit."'>".$club->Club."</option>";
													}
												}
										echo '</select>';
									}
								?>
								<span class="focus-input100" data-placeholder="&#xf594; &nbsp; Club"></span>
							</div>
						</div>
						
						<div class="form-valid">
							<div class="wrap-input100 validate-input" data-validate="* Ingresa tu contraseña">
								<?php 
									if (count($Datos) > 0 && count($Datos) == 1) {
										echo '<input id="usuario" data-user="'.$Datos[0]->CodigoUsuario.'" title="'.$Datos[0]->Nombre.'" type="text" class="input100 has-val" name="'. rand() .'" required autocomplete="off" value="'.$Datos[0]->Nombre.'" readonly/>';
									} else {
										echo '<input id="usuario" data-user="" title="" type="text" class="input100" name="'. rand() .'" required autocomplete="off" readonly/>';
									}
								?>
								<span class="focus-input100" data-placeholder="&#xf007; &nbsp; Usuario"></span>
							</div>
						</div>
						
						<div class="form-valid">
							<div class="wrap-input100 validate-input" data-validate="* Ingresa tu contraseña">
								<input id="password" type="password" class="input100" name="<?= rand() ?>" required autocomplete="off" disabled />
								<span class="focus-input100" data-placeholder="&#xf023; &nbsp; Contraseña"></span>
							</div>
						</div>
                        <!-- <div class="contact100-form-checkbox pb-3">
                            <input class="input-checkbox100" id="ckb1" type="checkbox" name="remember-me">
                            <label class="label-checkbox100" for="ckb1">
                                *Mantener conectado
                            </label>
                        </div> -->
						<div class="row mt-4">
							<div class="col-12 col-md-6 container-login100-form-btn">
								<button class="login100-form-btn">
									Acceder
								</button>
							</div>
							<div class="col-12 col-md-6 mt-3 mt-md-0 container-login100-form-btn">
								<button class="login100-form-btn" id="regresar">
									Regresar
								</button>
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
	

	<script type="text/javascript" src="<?= base_url(); ?>assets/js/jquery.min.js"></script>
	<script type="text/javascript" src="<?= base_url();?>assets/js/bootstrap.bundle.min.js"></script>
	<script type="text/javascript" src="<?= base_url(); ?>assets/js/alertify/alertify.min.js"></script>
	<script type="text/javascript" src="<?= base_url(); ?>assets/js/jquery-validate/jquery.validate.min.js"></script>
	<script type="text/javascript" src="<?= base_url(); ?>assets/js/jquery-validate/messages_es.min.js"></script>
	<script type="text/javascript" src="<?= base_url(); ?>assets/js/chosen/chosen.jquery.min.js"></script>
	<script type="text/javascript" src="<?= base_url(); ?>assets/js/libraries/jsRastreo.js"></script>
	<script type="text/javascript" src="<?= base_url();?>assets/js/personalizados/jsLogin.js"></script>
</body>
</html>
<script type="text/javascript">

	$dato = <?= json_encode($Datos) ?>;
	var prevValue = 0, val = 0;

	(function() {

		if ($dato.length == 1) {
			setTimeout(() => {
				$('#password').focus();
			}, 200);
		}

		document.addEventListener('DOMContentLoaded', function (e) {
			$('#club, #password').attr('disabled', false);
			
			$('#club').on('chosen:ready', function(){
				setTimeout(function(){
					$('.chosen-single').click();
				},0);
			}).chosen({
				placeholder_text_single: 'Clubs:'
				,width: '100%'
			}).on('change', function(){
				var datos = $(this).find("option:selected").data();
				
				$("#usuario").attr("data-user",datos.user).val(datos.nombre).addClass("has-val");
				$("#usuario").valid();

				setTimeout(function(){
					$('#password').focus();
				},0);
			});

			$('form').submit(function(e){
				e.preventDefault();

				if($(this).valid()) {
					var usuario = $("#usuario").attr('data-user');
					var nit 	= $("#txtClub").attr('data-nit') != undefined ? $("#txtClub").attr('data-nit') : $("#club").val();
	
					if(usuario == null || nit == null){
						alertify.error('Debe de diligenciar todos los campos.');
						return;
					}else{
						$.ajax({
							type: 'POST',
							url: "<?=base_url()?>Login/ingresoUsuario",
							data: {
								usuario : usuario,
								NIT 	: nit,
								clave 	: $('#password').val(),
								RASTREO : RASTREO('Ingresa al Sistema CLUBAPP', 'Ingreso Sistema')
							},
							success:function(res){
								switch(res){
									case '1':
										location.href = "<?= base_url() ?>";
									break;
									case 'error':
										alertify.alert('Advertencia', 'Contraseña no válida...', function(){
											setTimeout(function(){
												$('#password').val('').focus();
											},0);
										});
									break;
									default:
										try{
											res = JSON.parse(res);
	
											cantidad = res.cantidad[0];
	
											users = res.users;
	
											cad = `<center><h3>Usuarios Activos en el Sistema</h3></center>
											<table class="table table-bordered table-hover table-fixed table-striped table-condensed">
												<thead>
													<th style="text-align=center;">Código</th>
													<th style="text-align=center;">Usuario</th>
												</thead>
												<tbody>`;
	
													for (var i = 0; i < users.length; i++) {
														cad += `<tr>
														<td>`+users[i].codigo+`</td>
														<td>`+users[i].usuario+`</td>
													</tr>`;
												}
	
												cad += `</tbody>
												</table>`;
	
											if(cantidad == 1){
												alertify.alert("Advertencia", "Su Empresa Solo Tiene Licencia Para : "+cantidad+" Usuario"+cad+'.');
											}else{
												alertify.alert("Advertencia", "Su Empresa Solo Tiene Licencia Para : "+cantidad+" Usuarios"+cad+'.');
											}
										}catch(error){
											location.reload();
										}
									break;
								}
							}
						});
					}
				}
			});

			$('#regresar').click(function(e){
				e.preventDefault();
				$.ajax({
					type: 'POST',
					url: "<?=base_url()?>Login/Regresar",
					success:function(res){
						if(res == '1'){
							location.reload();
						}
					}
				});
			});
		});
	})();
</script>

encriptar(datos) {
	const salt = CryptoJS.lib.WordArray.random(256);
	const iv = CryptoJS.lib.WordArray.random(16);
	const key = CryptoJS.PBKDF2(this.llaveEncriptar, salt, { hasher: CryptoJS.algo.SHA512, keySize: 64 / 8, iterations: 999 });
	const encrypted = CryptoJS.AES.encrypt(JSON.stringify(datos), key, { iv: iv });
	const data = {
		ciphertext: CryptoJS.enc.Base64.stringify(encrypted.ciphertext),
		salt: CryptoJS.enc.Hex.stringify(salt),
		iv: CryptoJS.enc.Hex.stringify(iv)
	}
	return JSON.stringify(data);
}

desencriptar(encriptado) {
	const salt = CryptoJS.enc.Hex.parse(encriptado.salt);
	const iv = CryptoJS.enc.Hex.parse(encriptado.iv);
	const key = CryptoJS.PBKDF2(this.llaveEncriptar, salt, { hasher: CryptoJS.algo.SHA512, keySize: 64 / 8, iterations: 999 });
	const decrypted = CryptoJS.AES.decrypt(encriptado.ciphertext, key, { iv: iv });
	return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
}
