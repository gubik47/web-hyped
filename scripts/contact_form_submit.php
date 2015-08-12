<?php

/* --------------------------------------------------------
-- contact_form_submit.php

- Zpracuje odeslany formular a odesla notifikaci na zvoleny mail v configu.

@author: Jakub Štefan
----------------------------------------------------------*/
require_once "../config.php";
require_once "../vendor/autoload.php";

// Kontrola odeslani formulare
if (isset($_POST)) {

	$mail = new PHPMailer;

	$mail->From = "form@hypedprg.com";
	$mail->addAddress(EMAIL);
	$mail->isHTML(true);
	$mail->Subject = "Odeslani weboveho formulare"
	$mail->Body = "<h1>Hello World!</h1>";

	if (!$mail->send()) {
		echo "Error!";
	}
}