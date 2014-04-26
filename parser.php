<?php
	//author: Moayad Alshangiti
	//date: March 06, 2014
	//purpose: Verfiy that all feeds in nyoozi service and running properly

	
	// taking the time to calculate execution time
	$time_start = microtime(true); 
	
	//initalizing varaibles BEGIN
		$headString = "";
		$bodyString = "";
		$broken_links_counter = 0;
		$working_links_counter = 0;
		// webservice:
		$web_service_link = "http://nyoozi.com/nyooziserver/get-newspaperNameandLogos.php";
		//saving the content to a an array
		$web_service_content = json_decode(file_get_contents($web_service_link), TRUE);
		$root_link = $web_service_content['Response'][0]['result']['rooturl'];
		$root_link = "../nyooziserver/";
	// initalizing variables END
	
	
	
	// building the body BEGIN
		// Sources Information
		foreach ($web_service_content['Response'][0]['result']['data'] as $key => $val) 
		{
			$bodyString .=  "<div style='border:1px dashed; width:90%; min-height:200px;;margin-left:4%;padding:10px;border-radius:20px;margin-bottom:20px;'>";
			$bodyString .=  "<h3 style='text-decoration:underline'>Source Basic Information</h3>";
			if(strlen($val['name'])>1)
				$imageLink =  $root_link. $val['selectedLogo'];
			else
				$imageLink = "http://www.wwubap.org/wp-content/uploads/2012/03/no-available-image.png";
			$bodyString .=  "<img src='" . $imageLink. "'  alt='newspaper source logo' width='100' height='100' />";
			$bodyString .=  "<br/><br/><span style='font-weight:bold'>- ID:</span> " . $val['id']. "";
			$bodyString .=  "<br/><span style='font-weight:bold'>- Source name:</span> " . $val['name']. "";
			$bodyString .=  "<br/><span style='font-weight:bold'>- Selected logo:</span> " . $root_link. $val['selectedLogo']. "";
			$bodyString .=  "<br/><span style='font-weight:bold'>- Unselected logo:</span> " .$root_link .$val['unselectedLogo']. "";
			$bodyString .=  "<hr/>";
			$bodyString .=  "<h3 style='text-decoration:underline'>Source Feeds:</h3>";
			if(strlen($val['name'])>1)
			{//we have a name so we have a content
				
				$counter = 0;
				for($i=0;$i<count($val['types']);$i++)
				{ 
					$bodyString .=  "<span style='font-weight:bold'>" . $val['types'][$counter]['type'] . "</span>";
					$bodyString .=  "<ul>";
					/*
					$link = $root_link. $val['types'][$counter]['link'];
					$bodyString .=  "<li>" .  $link . " - " . validate_feed($link) . " (<a href='$link' target='_blank'>check yourself?</a>)" . "</li>";
					$link = $root_link. $val['types'][$counter]['link1'];
					$bodyString .=  "<li>" .  $link . " - " . validate_feed($link) . " (<a href='$link' target='_blank'>check yourself?</a>)" . "</li>";
					$link = $root_link. $val['types'][$counter]['link2'];
					$bodyString .=  "<li>" .  $link . " - " . validate_feed($link) . " (<a href='$link' target='_blank'>check yourself?</a>)" . "</li>";
					$link = $root_link. $val['types'][$counter]['link3'];
					$bodyString .=  "<li>" .  $link . " - " . validate_feed($link) . " (<a href='$link' target='_blank'>check yourself?</a>)" . "</li>";
					*/
					$link = $root_link. $val['types'][$counter]['link_complete'];
					$bodyString .=  "<li>" .  $link . " - " . validate_feed($link) . " (<a href='$link' target='_blank'>check yourself?</a>)" . "</li>";
					$bodyString .=  "</ul>";
					$counter++;
				}
				
				
			}
			else
			{
				$bodyString .=  "No content!";	
			}
			
			$bodyString .=  "</div>";
			
		}
		
		// clock time to calculate execution time
		$time_end = microtime(true);
		$execution_time = ($time_end - $time_start);
	// building the body END
	
	
	
	
	// building the header BEGIN
		// Tool General Information
		$headString .=  "<div style='border:1px dashed; width:90%; min-height:150px;margin-left:4%;padding:10px;border-radius:20px;margin-bottom:20px;'>";
		$headString .=  "<h3 style='text-decoration:underline'>Tool Information</h3>";
		// tool information
		$headString .=  "<span style='font-weight:bold'>- Tool name:</span> SBA-TMALET (Shitty Backend Analyser - To Make Adnan's Life Easier Tool) lol =P";
		//execution time of the script
		$headString .=  "<br/><span style='font-weight:bold'>- Total execution time: </span>" . $execution_time . " seconds";
		$headString .= "<hr/>";
		// web service information
		$headString .=  "<span style='font-weight:bold'>- Web Service Link: </span> $web_service_link";
		$headString .=  "<br/><span style='font-weight:bold'>- Total sources count </span>= " . count($web_service_content['Response'][0]['result']['data']);
		$headString .= "<br/><span style='font-weight:bold; color:green'>- Working Feeds: </span> = " . $working_links_counter;
		$headString .= "<br/><span style='font-weight:bold; color:red'>- Broken Feeds: </span> = ". $broken_links_counter;
		$headString .=  "<br/><span style='font-weight:bold'>- Status</span> = " . $web_service_content['Message'];
		$headString .=  "<br/><span style='font-weight:bold'>- Errors</span> = " . $web_service_content['errorcode'];
		$headString .=  "<br/><span style='font-weight:bold'>- Root </span>= " . $root_link ;
		$headString .=  "</div>";
	// building the header END
	
	
	// printing results
	echo $headString . $bodyString;	
	

?>









<?php


	/**************
	 * Helper functions BEGIN
	 **************/
	 
	 	// This function returns a message that tells us the describes the condition of the RSS feed.
		function validate_feed($feed)
		{
			global $broken_links_counter, $working_links_counter;
		
			if(is_RSS_feed($feed))
			{
				$working_links_counter++;
				return "<span style='color:green'> Looks good.</span>";
			}
			else 
			{
				$broken_links_counter++;
				return "<span style='color:red'> Seems to be broken!</span>";
			}
		}
		
		// This function validates an RSS feed and returns true/false based on the result.
		function is_RSS_feed($feed)
		{
	   		$content = file_get_contents($feed); 
	    	try 
	    	{
	    		 $rss = new SimpleXmlElement($content); 
	    		 $rss = "";
				 return true;
			}
	    	catch(Exception $e)
	    	{
	    		return false;
			}
		}
	/**************
	 * Helper functions END
	 **************/
	
?>