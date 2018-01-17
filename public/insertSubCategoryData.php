<?php

if (isset($_POST["group_id"]) && isset($_POST["name"])) {
    
	require_once('config.ini.php');
    $conn = new mysqli(DB_SERVER, DB_USER, DB_PASS, DB_DATABASE);

    // check connection
    if ($conn->connect_error) {
        echo json_encode(array("Response" => array("responseCode" => -100,
                "responseTitle" => "Database Not Found",
                "responseMessage" => "Unable to locate database in server")));
        die();
    }
	
	$_POST["group_id"] = $conn->real_escape_string($_POST["group_id"]);
	$_POST["name"] = $conn->real_escape_string($_POST["name"]);

	$dataExist = 0;
	$result = $conn->query("SELECT * FROM sub_category WHERE id = '".$_POST["group_id"]."'");
    if ($result && $result->num_rows > 0) {
        while ($row = $result->fetch_object()) {
			$dataExist = 1;
        }
    }
	if ($dataExist == 1)
	{
		$result = $conn->query("INSERT INTO sub_category_data (name, sub_category_id) VALUES ('".$_POST["group_id"]."')");
		
		echo json_encode(array("Response" => array("responseCode" => 200, "responseMessage" => "Data successfully inserted.")));
	}
	else
		echo json_encode(array("Response" => array("responseCode" => -100, "responseMessage" => "Group id does not exist.")));
    
    $conn->close();
} else {
    echo json_encode(array("Response" => array("responseCode" => -100, "responseMessage" => "Field name cannot be empty")));
}
?>