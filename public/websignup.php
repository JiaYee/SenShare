<?php
require ("../configure.php");
require ("../class/clsDatabase.php");

$DB = new Database;
$DB->connectDB(DB_HOST,DB_USERNAME,DB_PASSWORD,DB_NAME);

sleep(2);

if(true)
{
	$name     = $_POST['name'];
	$email    = $_POST["email"];
	$pwd      = $_POST['pwd'];
	
	$check_query = "SELECT id FROM webmember WHERE  email = '$email'";
	$check_result = mysql_query($check_query);
	
	if(!$check_result)
	{
		die ('Invalid query : ' . mysql_error());
	}
	else
	{
		$result_row = mysql_num_rows($check_result);
		
		
		if($result_row ==0)
		{
			$hash = password_hash($pwd, PASSWORD_DEFAULT);
			
			$check_query = "INSERT INTO webmember (member_name, email, password, status, created_date) VALUES ('$name','$email','$hash',1,now())";
			$check_result = mysql_query($check_query);
			
			if(!$check_result)
			{
				die ('Invalid query : ' . mysql_error());
			}
			else
			{
				$user_id = mysql_insert_id();
				$return[0]['Status'] = '0';
				$return[0]['userid'] = $user_id;
			}
		}
		else
		{
			$return[0]['Status'] = '1';
			$return[0]['userid'] = '';
		}
	}
	
	 $return_01[0]['records']=$return;
	 echo json_encode($return_01[0]);
}
else
{
	echo "N";
}
?>