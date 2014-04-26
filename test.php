<?php



// time calculation
$time_start = microtime(true);



// function db_stack_trace()
// {
	 // $stack = array(); 
	// $trace = debug_backtrace();
	 // # we first remove any db_* functions, since those are # always at the end of the call chain 
	 // while (strstr( $trace[ 0]['function'], 'db_'))
	 // { array_shift( $trace); } 
	 // # next we push each function onto the stack 
	 // foreach( $trace as $t){ $stack[] = $t['function'].'()'; }
	  // # and finally we add the script name 
	 // $stack[] = $_SERVER[ PHP_SELF]; 
	 // $stack = array_reverse( $stack) ;
	 // # we replace *' s just incase we might escape # out of the SQL comment 
	 // return str_replace('*', '', implode(' > ', $stack));
 // }


function moayad()
{
	return "yo yo .. ";
}

	$x = debug_backtrace();
echo var_dump($x);

// time calculation
$time_end = microtime(true);
$time = $time_end - $time_start;

echo "Time = $time seconds\n";
?>