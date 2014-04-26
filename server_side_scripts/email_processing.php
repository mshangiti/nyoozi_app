<?php

/* 
 * Author: Moayad Alshangiti
 * Date: Feb 15, 2014
 * Last Update: Feb 21, 2014
 * Purpose: Send an email with data from the contact us form
 */
 
 
 
// checking if something was post
$post = (!empty($_POST)) ? true : false;
if($post && isset($_POST['data']) )
{
	// reading data submitted from contact us form
	$data = $_POST['data'];
	$name =   sanitize($data['name']) ;
	$email = sanitize($data['email']);
	$message = sanitize($data['message']);

	// errors string
	$error = '';
	
	// Check name
	if(!$name && strlen($name) >0 && strlen($name) < 100)
		$error .= 'Please enter your name.<br />';

	// Check email
	if($email && !ValidateEmail($email) && strlen($email) >0 && strlen($email) <100)
		$error .= 'Please enter a valid e-mail address.<br />';
	
	// checking message
	if(!$message && strlen($message) >0 && strlen($message) <5000)
		$error .= 'Please enter a message.<br />';
	
	if(!$error)
	{
		// sending mail
		$to = "info@nyoozi.com";
		$subject = "Nyoozi.com: New message from " . $name;
		$alias = "mshangiti@nyoozi.com";
		$headers = 'Reply-To:' . $email . "\r\n" .'X-Mailer: PHP/' . phpversion();
		$body = "<p>Dear admin,</p><p>You received a new message through the contact us form in nyoozi.com:</p><p style='text-decoration:underline'>( " . $name . " - "  . $email . " ) said:</p>";
		$body .= $message;
		$mail = mail_utf8($to, $subject, $body, $headers);

		// check if mail was sent
		if($mail)
			$reply = array('status' => 'true');			
		else
			$reply = array('status' => 'false');
		
		// send reply
		echo json_encode($reply);
	}
	else
	{
		$reply = array('status' => 'false', "message" => $error);
	}
		

}


 	/*
	 * Purpose: This function validates an email address
	 */
function ValidateEmail($value)
{
	$regex = '/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i';

	if($value == '') { 
		return false;
	} else {
		$string = preg_replace($regex, '', $value);
	}

	return empty($string) ? true : false;
}

 	/*
	 * Purpose: This function trims  and sanitizes a string that is sent to it removing all whitespace, tags, and special characters.
	 * Expected data: 
	 * 		$val: The string to be trimmed and sanitized.	
	 * Returned data:
	 * 		$val: The clean trusted string.
	 */
	 
	function sanitize($val) 
	{
		$val = trim($val);
		$val = strip_tags($val);
		$val = htmlspecialchars($val, ENT_QUOTES, "UTF-8");
		$val = stripslashes($val);
		return $val;
	}
  
  /** 
   * Simple UTF-8 mail sender function. This function also encode subject and  
   * plain-text message to UTF-8. If you need HTML mail sender, change the code  
   * in line 2 from text/plain to text/html, but this function is usable the  
   * most cases without any modification. 
   */ 
         
  function mail_utf8($to, $subject = '(No subject)', $message = '', $header = '') { 
      $_header = "MIME-Version: 1.0\r\nContent-type: text/html; charset=UTF-8\r\n"; 
      return mail($to, '=?UTF-8?B?'.base64_encode($subject).'?=', $message, $_header . $header); 
  }
?>