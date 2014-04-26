/*
 * Author: Moayad Alshangiti
 * Date: 
 */

/* ==========================================================================
   Table of Contents
   ========================================================================== 
   
	00. onload function
		- Slider
		- back stretch
		- click event for the menu items: (both arabic and english pages)
			- home.
			- jobs.
			- contact us form.
			- Canceling the anchor click event for android and windows store links.
	01. modal object that represents all the pop up windows 
	02. onclick event for the video tutorial
	03. contact us form processing, ajax, and validation
   
   ========================================================================== */
   


/* ==========================================================================
   00. Onload function
   ========================================================================== */ 

$(window).load(function() 
{
	
	// Flex Slider
    $('.flexslider1').flexslider({
      animation: 'slide', // Change Animation Type to fade
      animationLoop: true,
      touch: true,
      directionNav: false,
      slideshowSpeed: 5000, // Slide Intervals
      animationSpeed: 600, // Animation Speeds/times
      slideshow: true,
      pauseOnAction: false,
      controlsContainer: '.flex-container'
    });
 	
 	// Flex Slider Quote
    $('.flexslider2').flexslider({
      animation: 'fade', // Change Animation Type to slide
      smoothHeight: false,
      animationLoop: true,
      touch: true,
      directionNav: false,
      slideshowSpeed: 7000, // Slide Intervals
      animationSpeed: 300, // Animation Speeds/times
      slideshow: true,
      pauseOnAction: false, 
      controlsContainer: '.flex-container'
    });
    
    
    // Back Stretch 
    $("#masthead").backstretch("img/bg_1.jpg");
				
	$("#nyoozi_overlay").on("click", function(e){
   		console.log('closing');
   		modal.close();
   	});			
   	// menu click handlers
   	//jobs english
  	 $("#menu_jobs_en").on("click", function(e){
   		var html = "<div class='menu_jobs'><h2>Jobs Listing</h2><hr/><p>Sorry, we currently don't have any openings.</p></div>";
 	 	modal.open({content: $(html)});
 	 	return false;
   	});
   	//jobs arabic
   	 $("#menu_jobs_ar").on("click", function(e){
   		var html = "<div class='menu_jobs' style='text-align:right'><h2>الوظائف المطلوبة</h2><hr/><p>.للأسف ليس لدينا أي وظائف متاحه حالياً</p></div>";
 	 	modal.open({content: $(html)});
 	 	return false;
   	});

	// home button
	 $("#menu_home").on("click", function(e){
	 	console.log("alive?");
 	 	$('html,body').animate({scrollTop:0},"slow");
 	 	 return false;
	 	
	 });
	 
	 //contact us english:
	  $("#menu_contact_us_en").on("click", function(e){
	  	
   		var html = "<div class='contactus_container' style='opacity:0.8;' >";
		   		//top section
		   		html += "<div class'contactus_header' style='text-align:center;' ><div class='contactus_image'> <img src='./img/logo/nyoozi_clean.png' width='80' height='80'/></div><div class='contactus_title'> <h1>Contact us</h1></div></div><hr/>";
		   		//form section
		   		html += "<div class='contactus_boxes contactus_en' id='contactus_boxes'>";
		   			//name row	
		   			html += "<div class='contactus_row'><label>Name (*):</label><input type='text' placeholder='Your Name...'  maxlength='100'  /></div>";
		   			// email row
		   			html += "<div class='contactus_row'><label>Email (*):</label><input type='text' placeholder='Your email...'  maxlength='100'  /></div>";
		   			// message row
		   			html += "<div class='contactus_row'><label>Message (*):</label><textarea rows='5' cols='38' placeholder='Your Message...'  maxlength='5000' class='form-control'></textarea></div>";
		   			html += "<div style='margin-left:35%; margin-top:-10px' class='contactus_note'><p style='font-size:0.8em;' >* Mandatory field.</p></div>";
		   			html+= "<div id='contactus_message' style='height:20px;margin-top:5px;text-align:center;'></div>";
		   			html+= "<div style='margin-top:10px;text-align:center;margin-left:30%'><button class='sendButton' onclick='send_message()'>Send</button></div>";
		   		html += "</div>";
	   		// closing container div
   			html += "</div>";
   			
	   	//openning the modal
 	 	modal.open({content: $(html)});
 	 	return false;
   	});
   	
	//contact us ARABIC:
	  $("#menu_contact_us_ar").on("click", function(e){
		var html = "<div class='contactus_container' style='opacity:0.8;text-align:right;' >";
		
			//top section margin-right:25%
			html += "<div class'contactus_header' style='text-align:center;' ><div class='contactus_title'> <h1>اتصل بنا</h1></div><div class='contactus_image' style='' > <img src='./img/logo/nyoozi_clean.png' width='80' height='80'/></div></div><hr/>";
			html += "<div class='contactus_boxes contactus_ar' id='contactus_boxes'>";
		   			//name row	
		   			html += "<div class='contactus_row'><input type='text' placeholder='إسمك هنا ...' style='direction: rtl; text-align: right;' maxlength='100' /><label>:(*) الإسم</label></div>";
		   			// email row
		   			html += "<div class='contactus_row'><input type='text' placeholder='بريدك الإلكتروني هنا ...' style='direction: rtl; text-align: right;'  maxlength='100' /><label>:(*) البريد</label></div>";
		   			// message row
		   			html += "<div class='contactus_row'><textarea rows='5'  placeholder='رسالتك هنا ...' style='direction: rtl; text-align: right;'  maxlength='5000' class='form-control'></textarea><label>:(*) الرسالة</label></div>";
		   			html += "<div style='margin-left:35%; margin-top:-10px' class='contactus_note'><p  style='font-size:0.8em;margin-right:5px;margin-right:45%;'>. حقل إلزامي *</p></div>";
		   			html+= "<div id='contactus_message' style=''></div>";
		  		 	html+= "<div  style='margin-top:10px;text-align:center;margin-right:18%' ><button class='sendButton' type='button' onclick='send_message()' >أرسل</button></div>";
		   	html += "</div>";

		// closing container div
		html += "</div>";
		
		// openning the modal
	 	modal.open({content: $(html)});
	 	return false;
	});
	
	
	// cancel anchor
	 $(".stopDefault").on("click", function(e){
			return false;
	});
		
 });//end of page load method
 	 



/* ==========================================================================
   01. Modal object
   ========================================================================== */ 
	// variable that represents the modal
	var modal = (function(){
				var 
				method = {},
				$overlay,
				$modal,
				$content,
				$close;

				// Center the modal in the viewport
				method.center = function () {
					var top, left;

					top = Math.max($(window).height() - $modal.outerHeight(), 0) / 2;
					left = Math.max($(window).width() - $modal.outerWidth(), 0) / 2;

					$modal.css({
						top:top + $(window).scrollTop(), 
						left:left + $(window).scrollLeft()
					});
				};

				// Open the modal
				method.open = function (settings) {
					$content.empty().append(settings.content);

					$modal.css({
						width: settings.width || 'auto', 
						height: settings.height || 'auto'
					});

					method.center();
					$(window).bind('resize.modal', method.center);
					$modal.show();
					$overlay.show();
				};

				// Close the modal
				method.close = function () {
					$modal.hide();
					$overlay.hide();
					$content.empty();
					$(window).unbind('resize.modal');
				};

				// Generate the HTML and add it to the document
				$overlay = $('<div id="nyoozi_overlay"></div>');
				$modal = $('<div id="modal"></div>');
				$content = $('<div id="content"></div>');
				$close = $('<a id="close" href="#">close</a>');

				$modal.hide();
				$overlay.hide();
				$modal.append($content, $close);

				$(document).ready(function(){
					$('body').append($overlay, $modal);						
				});

				$close.click(function(e){
					e.preventDefault();
					method.close();
				});
				
				return method;
			}());

	
	
	/* =========================================================================
   02. onclick event for the video tutorial
   ========================================================================== */ 
   
	 // method used to open the modal
 	 function nyoozi_overlay()
 	 {
 	 	//var html = '<iframe width="560" height="315" src="//www.youtube.com/embed/bJiX4PVof14?rel=0&autoplay=1&controls=1&showinfo=0&color=white&fs=1&theme=light" frameborder="0" allowfullscreen></iframe>';
 	 	//&title=0&byline=0
 	 	//var html = '<iframe src="//player.vimeo.com/video/87908673?color=ffffff" width="800" height="451" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
 	 	var html = '<iframe src="//player.vimeo.com/video/87908673?title=0&amp;byline=0&amp;portrait=0&amp;color=ffffff&amp;autoplay=1" width="770" height="430" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
 	 	modal.open({content: $(html)});
 	 	return false;
 	 }
 	 
 	 

/* ==========================================================================
   03. contact us form processing, ajax, and validation
   ========================================================================== */ 
   
 	function send_message()
	{
		// reading user entry.
		var name = $('.contactus_boxes input:eq(0)').val().trim();
		var email = $('.contactus_boxes input:eq(1)').val().trim();
		var message = $('.contactus_boxes textarea:eq(0)').val().trim();	
		
		//check that something was entered
		if( (name.length>0) && (email.length>0) && (message.length>0) )
		{
			// no message less than 30 chars is accepted
			if(message.length>30)
			{
				//validate email
				if(validateEmail(email))
				{
					//validating name and message
					if(validateText(name, 100) && validateText(message, 5000))
						ajaxProcessingMessage(name,email,message);	// sending ajax request
					else
						showContactUsMessage(5);
				}
				else
				{
					showContactUsMessage(4);
				}
				
			}
			else
			{
				showContactUsMessage(3);
			}
			
		}
		else
		{
			showContactUsMessage(0);
		}
		
		
	}
 	 
 	 

	function ajaxProcessingMessage(name, email, message)
	{	
		// disabling the button and text boxes
		disableControls(true);
		
		//showing message to user
		showContactUsMessage(1);
		
		var ajaxData = {};
		ajaxData["name"] = name;
		ajaxData["email"] = email;
		ajaxData["message"] = message;
		ajaxCall("POST", {data:ajaxData},processMessageCallback, null);
		return false;
	}
	
	/*
 * Purpose: This is the callback method for processLogin which will check user creditials and if correct will load lobby
 * Parameters: ajax data.
 * Returned Data:none.
 */
function processMessageCallback(data, status)
{
	console.log("status = " + status);
	console.log("data = " + data);
	if(status == "success")
	{
		console.log("Message is back!");
		
		if( data != null && data['status'] == "true")
		{//message was sent
			
			console.log("message was sent");
			
		 	// clear all input and text areas
		 	$('.contactus_boxes input:eq(0)').val("");
		    $('.contactus_boxes input:eq(1)').val("");
		    $('.contactus_boxes textarea:eq(0)').val("");
		
			//showing message to user
			showContactUsMessage(2);
		}
		else
		{
			console.log("message was not sent");
			//showing message to user
			showContactUsMessage(-2);
		}
	}
	else
	{ // something wrong with ajax or message was not sent
		
		console.log('something went wrong with the ajax call.')
		//showing message to user
		showContactUsMessage(-2);
	}

			
	// enabling controls
	disableControls(false);
}


function disableControls(value)
{
	// disabling/enabling the button and text boxes
		$('.contactus_boxes button:eq(0)').prop('disabled', value);
		$('.contactus_boxes input:eq(0)').prop('disabled', value);
		$('.contactus_boxes input:eq(1)').prop('disabled', value);
		$('.contactus_boxes textarea:eq(0)').prop('disabled', value);
}

// sends the ajax call to the backend script
function ajaxCall(type,d,callback, id)
{
		$.ajax({
  			type: type,
  			async: true,
  			cache:false,
  			url: "./server_side_scripts/email_processing.php",
  			data: d,  
  			dataType: "json",
  			beforeSend: function(){if(id!=null)showLoadingAnimation(id);},
  			success: callback,
  			error: callback,
  			complete: function(){if(id!=null)hideLoadingAnimation(id);}
		});
}

function showContactUsMessage(message_state)
{
	
	//removing any existing messages
	$('#contactus_message').empty();
	
	//detecting user language
	var lang = $('input#lang').val();
	console.log("show message = " + lang);
	if(lang=='ar')
	{//arabic
		
		if(message_state == 0)//form incomplete
			message = '<p style="color:red">.الرجاء تعبئة النموذج كاملاً</p>';
		else if(message_state == 1 )//processing
			message = '<p>...جاري الإرسال</p>';
		else if(message_state == 2)// message sent
			message = '<p style="color:green">!تم الإرسال. شكراً لك</p>';
		else if(message_state == 3)
			message = '<p style="color:red">.يجب أن تحتوي الرسالة على أكثر من ٣٠ حرفاً</p>';//message is too short
		else if(message_state == 4)
			message = '<p style="color:red">.الرجاء إدخال بريد الكتروني صحيح</p>';// email is not valid
		else if(message_state == 5)
			message = '<p style="color:red">الرجاء إستخدام حروف او ارقام فقط</p>';// some chars  are illegal
		else // message was not sent
			message = '<p style="color:red">.عفواً, حصل خطأ في الإرسال</p>';
			
	}
	else
	{//english
		
		if(message_state == 0)//form incomplete
			message = '<p style="color:red">Please complete the form.</p>';
		else if(message_state == 1 )//processing
			message = '<p>Sending message...</p>';
		else if(message_state == 2)// message sent
			message = '<p style="color:green">Message sent. Thank you!</p>';
		else if(message_state == 3)
			message = '<p style="color:red">Message has to be at least 30 chars.</p>';//message is too short
		else if(message_state == 4)
			message = '<p style="color:red">Please use a valid email.</p>';// email is not valid
		else if(message_state == 5)
			message = '<p style="color:red">Please only used letters and/or numbers.</p>'; //some chars  are illegal

		else // message was not sent
			message = '<p style="color:red">Ops, something went wrong...</p>';
	}
	
	// message
	$('#contactus_message').html(message);
	
}






/*****************************
 * Forms validation
 ****************************/
function validateText(text, maxLength)
{
	// step one: check that something was typed >0
	if(text.length >0 && text.length< maxLength)
	{
		 // return true
		 return true;
	}
	
	//text is not valid (less than 100 chars or contains illegal chars)
	return false;
}


function validateEmail(email)
{
	var errorMessage ="";

	// step one: check that something was typed >0
	if(email.length >0 && email.length<100)
	{
		// step two: check the email format
		var pattern = new RegExp("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$");
		 if(email.match(pattern))
		 {//email is valid
		 	// return true
		 	return true;
		 }
	}
	
	//email is too short/long or invalid
	return false;
}


  