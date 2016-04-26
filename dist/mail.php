<?php

$recepient = "info@outsource-booster.com";
$sitename = "Outsource Booster";

$name = trim($_POST["fullname"]);
$email = trim($_POST["email"]);
$web = trim($_POST["web"]);
$text = trim($_POST["contact-massage"]);

$papostitle = "Новая заявка с сайта \"$sitename\"";
$message = "Имя: $name \nПочта: $email \nНомер телефона: $web \nТекст: $text";
mail($recepient, $papostitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");

?>