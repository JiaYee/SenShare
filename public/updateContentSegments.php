<?php

if (isset($_POST["id"]) && isset($_POST["segment"])) {
    
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
	$_POST["segment"] = $conn->real_escape_string($_POST["segment"]);

	$result = $conn->query("UPDATE content SET segment = '".$_POST["segment"]."' WHERE id = '".$_POST["id"]."'");
			
    echo json_encode(array("Response" => array("responseCode" => 200, "responseMessage" => "Data successfully inserted.")));
    
    $conn->close();
} else {
    echo json_encode(array("Response" => array("responseCode" => -100, "responseMessage" => "Field name cannot be empty")));
}
?>