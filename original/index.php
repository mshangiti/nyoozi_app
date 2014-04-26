<?php
	
	
	//detecting user's browser language
	$lang = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);
	
	//redirecting the user to the arabic version if his browser languages is arabic
	if($lang == "ar")
		 header( 'Location: ./index_ar.html' ) ;
	else
		 header( 'Location: ./index_en.html' ) ;
	
?>