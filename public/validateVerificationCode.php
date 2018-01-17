<?php
if (isset($_POST["verification_code"])) {
	require_once('config.ini.php');
    $conn = new mysqli(DB_SERVER, DB_USER, DB_PASS, DB_DATABASE);
    
	// check connection
    if ($conn->connect_error) {
        echo json_encode(array("Response" => array("responseCode" => -100,
                "responseTitle" => "Database Not Found",
                "responseMessage" => "Unable to locate database in server")));
        die();
    }
    
	$verificationState = 0;
	$queryString = "SELECT code FROM verification_code WHERE code = '".$_POST["verification_code"]."'";
	$result = $conn->query($queryString);
    if ($result && $result->num_rows > 0) {
        while ($row = $result->fetch_object()) {
			$verificationState = 1;
        }
	}
	
    echo json_encode(array("Response" => array("responseCode" => 200, "responseMessage" => "Query result"), "data" => array("status" => $verificationState)));
		
    $conn->close();
} else {
    echo json_encode(array("Response" => array("responseCode" => -100, "responseMessage" => "Field name cannot be empty")));
}
?>