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

	$mail = new PHPMailer();

	$mail->From = "form@hypedprg.com";
	$mail->FromName = "Kontaktní formulář";
	$mail->addAddress(EMAIL);
	$mail->isHTML(true);
	$mail->CharSet = 'UTF-8';
	$mail->Subject = "Odeslání webového formuláře.";
	$mail->Body = "
	<html>
		<head>
			<title>Nové odeslání kontaktního formuláře</title>
		</head>
		<body>
			<p>Byla odeslán kontaktní formulář</p>
			<ul>
				<li><b>Datum odeslání:</b> " . date ("d. m. Y H:i:s") . "</li>
				<li><b>Jméno:</b> " . $_POST["full-name"] . "</li>
				<li><b>E-mail:</b> " . $_POST["email"] . "</li>
				<li><b>Služba:</b> " . $_POST["service"] . "</li>
				<li><b>Poznámka:</b> " . ((empty($_POST["info"])) ? "Nevyplněno" : $_POST["info"]) . "</li>
			</ul>
		</body>
	</html>
	";

	if (!$mail->send()) {
		echo "Error!";
	} else {
		var_dump($_POST);
	}
}