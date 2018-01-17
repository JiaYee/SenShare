<?php

if (isset($_POST["content_id"]) && isset($_POST["category_id"]) && isset($_POST["name"]) && isset($_POST["description"]) && isset($_POST["image_path"]) && isset($_POST["voucher_code"]) && isset($_POST["expiry_date"])) {
    
	require_once('config.ini.php');
    $conn = new mysqli(DB_SERVER, DB_USER, DB_PASS, DB_DATABASE);

    // check connection
    if ($conn->connect_error) {
        echo json_encode(array("Response" => array("responseCode" => -100,
                "responseTitle" => "Database Not Found",
                "responseMessage" => "Unable to locate database in server")));
        die();
    }
	
	$_POST["content_id"] = $conn->real_escape_string($_POST["content_id"]);
	$_POST["category_id"] = $conn->real_escape_string($_POST["category_id"]);
	$_POST["name"] = $conn->real_escape_string($_POST["name"]);
	$_POST["description"] = $conn->real_escape_string($_POST["description"]);
	$_POST["image_path"] = $conn->real_escape_string($_POST["image_path"]);
	$_POST["voucher_code"] = $conn->real_escape_string($_POST["voucher_code"]);
	$_POST["expiry_date"] = $conn->real_escape_string($_POST["expiry_date"]);
	
	$result = $conn->query("INSERT INTO voucher (content_id, category_id, image_path, voucher_code, expiry_date, name, description) VALUES ('".$_POST["content_id"]."', '".$_POST["category_id"]."', '".$_POST["image_path"]."', '".$_POST["voucher_code"]."', '".$_POST["expiry_date"]."', '".$_POST["name"]."', '".$_POST["description"]."')");
		
	echo json_encode(array("Response" => array("responseCode" => 200, "responseMessage" => "Data successfully inserted.")));
    $conn->close();
} else {
    echo json_encode(array("Response" => array("responseCode" => -100, "responseMessage" => "Field name cannot be empty")));
}
?>