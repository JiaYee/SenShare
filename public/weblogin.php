<?php
require ("../configure.php");
require ("../class/clsDatabase.php");

$DB = new Database;
$DB->connectDB(DB_HOST,DB_USERNAME,DB_PASSWORD,DB_NAME);

sleep(2);

if(true)
{
	$email    = $_POST["email"];
	$pwd      = $_POST['pwd'];
	
	
	$check_query = "SELECT id, password, member_name FROM webmember WHERE  email = '$email'";
	$check_result = mysql_query($check_query);
	
	if(!$check_result)
	{
		die ('Invalid query : ' . mysql_error());
	}
	else
	{
		$result_row = mysql_num_rows($check_result);
		
		
		if($result_row !=0)
		{
			$row = mysql_fetch_row($check_result);
			
			$hash = $row[1];
			
			if (password_verify($pwd, $hash)) {
			
				if (password_needs_rehash($hash, PASSWORD_DEFAULT)) {
					
					$hash = password_hash($pwd, PASSWORD_DEFAULT);
					
					$check_query = "UPDATE webmember set password = '$pwd' WHERE  email = '$email'";
					$check_result = mysql_query($check_query);
					
					if(!$check_result)
					{
						die ('Invalid query : ' . mysql_error());
					}
				}
				
						$return[0]['Status'] = '0';
						$return[0]['userid'] = $row[0];
						$return[0]['name']= $row[2];
			}else
			{
				$return[0]['Status'] = '2';
				$return[0]['userid'] = $row[0];
				$return[0]['name']= $row[2];
			}
				
		}
		else
		{
			$return[0]['Status'] = '1';
			$return[0]['userid'] = '';
			$return[0]['name']= '';
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