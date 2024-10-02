<?php

/**
 * Requires the "PHP Email Form" library
 * The "PHP Email Form" library is available only in the pro version of the template
 * The library should be uploaded to: vendor/php-email-form/php-email-form.php
 * For more info and help: https://bootstrapmade.com/php-email-form/
 */

$name = $_POST['name'];
$email = $_POST['email'];
$subject = $_POST['subject'];
$message = $_POST['message'];

// Formatage des données à enregistrer dans le fichier
$date = date('d-m-Y H:i');
$data = "Date: $date\nNom : $name\nE-mail : $email\nObjet : $subject\nMessage : $message\n\n==========================================================================================================\n\n\n";

// Écriture des données dans le fichier
file_put_contents('data.txt', $data, FILE_APPEND);


// ini_set('SMTP', 'smtp.gmail.com');
// ini_set('smtp_port', 587);
// ini_set('username', '225juniorbrindou@gmail.com');
// ini_set('password', 'cgzbsjjhkxecplnh');
// ini_set('smtp_crypto', 'tls');

// $to = '225juniorbrindou@gmail.com';
// $subject = $_POST['subject'];
// $message = $_POST['message'];

// $headers = "From:" . $_POST['email'] . "\r\n";
// $headers .= "Reply-To:" . $_POST['email'] . "\r\n";
// $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
// mail($to, $subject, $message, $headers);



// // Replace contact@example.com with your real receiving email address
// $receiving_email_address = '225juniorbrindou@gmail.com';

// if (file_exists($php_email_form = '../assets/vendor/php-email-form/php-email-form.php')) {
// 	include($php_email_form);
// } else {
// 	die('Unable to load the "PHP Email Form" Library!');
// }

// $contact = new PHP_Email_Form;
// $contact->ajax = true;

// $contact->to = $receiving_email_address;
// $contact->from_name = $_POST['name'];
// $contact->from_email = $_POST['email'];
// $contact->subject = $_POST['subject'];

// // Uncomment below code if you want to use SMTP to send emails. You need to enter your correct SMTP credentials
// /*
//   $contact->smtp = array(
//     'host' => 'example.com',
//     'username' => 'example',
//     'password' => 'pass',
//     'port' => '587'
//   );
//   */

// $contact->add_message($_POST['name'], 'From');
// $contact->add_message($_POST['email'], 'Email');
// $contact->add_message($_POST['message'], 'Message', 10);

// echo $contact->send();
