<?php

if (isset($_POST["content_id"]) && isset($_POST["name_list"]) && isset($_POST["description_list"]) && isset($_POST["image_path_list"])) {
    
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
	$_POST["name_list"] = $conn->real_escape_string($_POST["name_list"]);
	$_POST["description_list"] = $conn->real_escape_string($_POST["description_list"]);
	$_POST["image_path_list"] = $conn->real_escape_string($_POST["image_path_list"]);
	
	//If recipient contains more than 1 image split by "|"
    if (strpos($_POST["image_path_list"], '|||') !== FALSE) {
        $nameList = explode("|||", $_POST["name_list"]);
        $descriptionList = explode("|||", $_POST["description_list"]);
        $imagePathList = explode("|||", $_POST["image_path_list"]);
        for($x = 0; $x < count($imagePathList); $x++) {			
			$result = $conn->query("INSERT INTO image (name, description, image_path) VALUES ('".$nameList[$x]."', '".$descriptionList[$x]."', '".$imagePathList[$x]."')");
			$result = $conn->query("INSERT INTO content_image_link (content_id, image_id) VALUES ('".$_POST["content_id"]."', LAST_INSERT_ID())");
        }
    }
	else
	{
		$result = $conn->query("INSERT INTO image (name, description, image_path) VALUES ('".$_POST["name_list"]."', '".$_POST["description_list"]."', '".$_POST["image_path_list"]."')");
		$result = $conn->query("INSERT INTO content_image_link (content_id, image_id) VALUES ('".$_POST["content_id"]."', LAST_INSERT_ID())");
    } 
		
	echo json_encode(array("Response" => array("responseCode" => 200, "responseMessage" => "Data successfully inserted.")));
    $conn->close();
} else {
    echo json_encode(array("Response" => array("responseCode" => -100, "responseMessage" => "Field name cannot be empty")));
}
?>