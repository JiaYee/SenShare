<?php
//print_r($_POST["image_path"]);
if (isset($_POST["user_id"]) && isset($_POST["type"]) && isset($_POST["name"]) && isset($_POST["valid_flag"]) && isset($_POST["image_path"])) {

	require_once('config.ini.php');
    $conn = new mysqli(DB_SERVER, DB_USER, DB_PASS, DB_DATABASE);

    // check connection
    if ($conn->connect_error) {
        echo json_encode(array("Response" => array("responseCode" => -100,
                "responseTitle" => "Database Not Found",
                "responseMessage" => "Unable to locate database in server")));
        die();
    }


	$_POST["valid_flag"] = $conn->real_escape_string($_POST["valid_flag"]);
	$_POST["name"] = $conn->real_escape_string($_POST["name"]);
    $_POST["image_path"] = $conn->real_escape_string($_POST["image_path"]);
    $_POST["user_id"] = $conn->real_escape_string($_POST["user_id"]);
	// $_POST["image_path"] = $conn->real_escape_string($target_path );
    $_POST["type"] = $conn->real_escape_string($_POST["type"]);
    // $_POST["rate"] = $conn->real_escape_string($_POST["rate"]);

    $result = $conn->query("INSERT INTO main_category_data (name, image_path, type, valid_flag, user_id) VALUES ('".$_POST["name"]."', '".$_POST["image_path"]."', '".$_POST["type"]."', '".$_POST["valid_flag"]."', '".$_POST["user_id"]."')");
	header('Content-Type: application/json');
    echo json_encode(array("Response" => array("responseCode" => 200, "responseMessage" => "Data successfully inserted.")));

    $conn->close();
} else {
header('Content-Type: application/json');
    echo json_encode(array("Response" => array("responseCode" => -100, "responseMessage" => "Field name cannot be empty")));
}
?>
