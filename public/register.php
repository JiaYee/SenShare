<?php
require ("../configure.php");
require ("../class/clsDatabase.php");

$DB = new Database;
$DB->connectDB(DB_HOST,DB_USERNAME,DB_PASSWORD,DB_NAME);

sleep(2);

if(true)
{
	$phone    = $_POST["phone"];
	
	//$phone = isset($_POST['phone']) ? mysql_real_escape_string($_POST['phone']) : "";
 
    //echo "phone number = '$phone' </br>";
	
	$check_query = "SELECT id FROM mstmember WHERE  phone_number = '$phone' AND status=1";
	$check_result = mysql_query($check_query);
	
	if(!$check_result)
	{
		die ('Invalid query : ' . mysql_error());
	}
	else
	{
		$result_row = mysql_num_rows($check_result);
		//echo $result_row;
		if($result_row==0)
		{
			//Generating a 6 Digits OTP or verification code for sms 
			//$otp = rand(1000, 9999);
			$otp = 1111;
			$response = sendOtp($otp, $phone);
			
			if($response != "0")
			{
				$query = "INSERT INTO mstmember (member_name, phone_number, gender, email, password, status, MobileAuthCode,MobileAuthStatus,hash,created_date)
						VALUES ('', '$phone', '', '', '', 1, '$otp',0,'', now())";
			
				$result = mysql_query($query);
			
				if(!$result)
				{
					die ('Invalid query : ' . mysql_error());
				}
				else
				{
					$user_id = mysql_insert_id();
					$return[0]['User_ID'] = $user_id;
					$return[0]['Status'] = "0";
					echo json_encode($return[0]);
				}
			}	
			else{
				$return[0]['User_ID'] = '';
				$return[0]['Status'] = "1";
				echo json_encode($return[0]);
			}		
		}
		else
		{
			$return[0]['User_ID'] = '';
			$return[0]['Status'] = "2";
			echo json_encode($return[0]);
		}
	}
}
else
{
	echo "N";
}

 
 //This function will send the otp 
 function sendOtp($otp, $phone){
	 
 //This is the sms text that will be sent via sms 
 $sms_content = "Your Activation code $otp";
 
 //Encoding the text in url format
 $sms_text = urlencode($sms_content);
 
 //This is the Actual API URL concatnated with required values 
 $api_url = 'http://blast2u.com/bin/singleSMS_API.php?username=chrysasys&hash=5f021ef3219e8d2b24aa590429ced6d1&msisdn='.$phone.'&lang=1&message='.$sms_text.'';
 
 //Envoking the API url and getting the response 
 $response = file_get_contents($api_url,null,null,80,10);
 
 return $response;
 }
 
?>