<?php

if ($_POST['g-recaptcha-response'] == '') {
echo "Captcha invalido";
} else {
$obj = new stdClass();
$obj->secret = "6LfRSNISAAAAACKaHw2e-JvgeG-3src_dRGpL-Ql";
$obj->response = $_POST['g-recaptcha-response'];
$obj->remoteip = $_SERVER['REMOTE_ADDR'];
$url = 'https://www.google.com/recaptcha/api/siteverify';

$options = array(
'http' => array(
'header' => "Content-type: application/x-www-form-urlencoded\r\n",
'method' => 'POST',
'content' => http_build_query($obj)
)
);
$context = stream_context_create($options);
$result = file_get_contents($url, false, $context);

$validar = json_decode($result);

/* FIN DE CAPTCHA */

if ($validar->success) {
$email = trim($_POST['email']);
$nombre = trim($_POST['nombre']);
$apellido = trim($_POST['apellido']);
$telefono = trim($_POST['telefono']);
$comentario = trim($_POST['comentario']);

$consulta = "E-mail: " . $email . " Nombre: " . $nombre . " Apellido: " . $apellido . "Comentario: " . $comentario;

mail("ejemplo@MiDominio.com", "Contacto desde Formulario", $consulta);
} else {
echo "Captcha invalido";
}
}
?>
