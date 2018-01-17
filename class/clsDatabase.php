<?php
class Database {
	
	public function connectDB($DB_HOST,$DB_USERNAME,$DB_PASSWORD,$DB_NAME)
	{
		$connection = mysql_connect ($DB_HOST,$DB_USERNAME,$DB_PASSWORD);
		if(!$connection)
		{
			die('Not connected : ' . mysql_error());
		}
		else
		{
			mysql_select_db(DB_NAME) or die ("cannot select DB!");
		}
	}	
	
	public function escapeValues($value)
	{
		$value = trim($value);
		
		//stripslashes
		if(get_magic_quotes_gpc())
		{
			$values = stripslashes($values);
		}
		
		// convert all &lt, &gt to normal html and then strip them
		$value = strtr($value,array_flip(get_html_translation_table(HTML_ENTITIES)));
		
		// quote the value
		$value = mysql_real_escape_string($value);
		$value = htmlspecialchars($value);
		
		return $value;
	}	
}


?>