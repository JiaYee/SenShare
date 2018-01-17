<?php

if (isset($_POST["id"])) {
    
	require_once('config.ini.php');
    $conn = new mysqli(DB_SERVER, DB_USER, DB_PASS, DB_DATABASE);

    // check connection
    if ($conn->connect_error) {
        echo json_encode(array("Response" => array("responseCode" => -100,
                "responseTitle" => "Database Not Found",
                "responseMessage" => "Unable to locate database in server")));
        die();
    }
	
	$_POST["id"] = $conn->real_escape_string($_POST["id"]);

			$deleteResult = $conn->query("DELETE FROM main_location WHERE id = '".$_POST["id"]."'");
			echo json_encode(array("Response" => array("responseCode" => 200, "responseMessage" => "Sub Category data deleted successfully.")));
    $conn->close();
} else {
    echo json_encode(array("Response" => array("responseCode" => -100, "responseMessage" => "Field name cannot be empty")));
}
?>