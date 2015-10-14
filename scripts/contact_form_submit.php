<?php
/* --------------------------------------------------------
-- contact_form_submit.php

- Processes submitted form and sends an notification email to specified e-mail address in config.php

@author: Jakub Štefan
----------------------------------------------------------*/
require_once "../config.php";
require_once "../vendor/autoload.php";

/* Returns true if form is valid else false */
function isFormValid(&$result) {
	// validation flag
	$isValid = true;

	if (empty($_POST["full-name"])) {
		$result["error"]["name"] = true;
		$isValid = false;
	}

	if (empty($_POST["email"]) || !preg_match( "/^[_\.0-9a-zA-Z-]+@([0-9a-zA-Z][0-9a-zA-Z-]+\.)+[a-zA-Z]{2,4}$/i", trim($_POST["email"]))) {
		$result["error"]["email"] = true;
		$isValid = false;
	}

	return $isValid;
}

// Form submission check
if (isset($_POST)) {

	$result = array();

	// Validate form
	if (isFormValid($result)) {

		$mail = new PHPMailer();

		$mail->From = "form@hypedprg.com";
		$mail->FromName = "Kontaktní formulář";
		$mail->addAddress(EMAIL);
		$mail->isHTML(true);
		$mail->CharSet = 'UTF-8';
		$mail->Subject = "Odeslání webového formuláře.";
		$mail->Body = "
			<p>Byla odeslán kontaktní formulář</p>
			<ul>
				<li><b>Datum odeslání:</b> " . date ("d. m. Y H:i:s") . "</li>
				<li><b>Jméno:</b> " . $_POST["full-name"] . "</li>
				<li><b>E-mail:</b> " . $_POST["email"] . "</li>
				<li><b>Služba:</b> " . ((empty($_POST["service"])) ? "Nevyplněno" :$_POST["service"]) . "</li>
				<li><b>Poznámka:</b> " . ((empty($_POST["info"])) ? "Nevyplněno" : $_POST["info"]) . "</li>
			</ul>
		";

		if (!$mail->send()) {
			// failure
			$result["res"] = "f";
		} else {
			// success
			$result["res"] = "s";
		}

		/* Customer confirmation email */
		$mail->From = "hello@hypedrprg.com";
		$mail->FromName = "Hyped Prague";
		$mail->addAddress($_POST["email"]);
		$mail->Subject = "Contact form submission";
		$mail->Body = "
			<p>
				Hello,
				<br>
				Few moments ago you initiated your hype curve on <a href=\"hypedprg.com\">hypedprg.com</a>.
				We will get back to you pretty soon so we can get started...
			</p>

			<p>
				Have a good day,
				<br>
				Hyped Prague
			</p>
		";

		if (!$mail->send()) {
			// failure
			$result["res"] = "f";
		} else {
			// success
			$result["res"] = "s";
		}
	} else {
		$result["res"] = "form_invalid";
	}

	echo json_encode($result);
}