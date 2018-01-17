<?php

if (isset($_POST["name"])) {
    
	require_once('config.ini.php');
    $conn = new mysqli(DB_SERVER, DB_USER, DB_PASS, DB_DATABASE);

    // check connection
    if ($conn->connect_error) {
        echo json_encode(array("Response" => array("responseCode" => -100,
                "responseTitle" => "Database Not Found",
                "responseMessage" => "Unable to locate database in server")));
        die();
    }
	
	$_POST["name"] = $conn->real_escape_string($_POST["name"]);

	$result = $conn->query("INSERT INTO sub_category (name) VALUES ('".$_POST["name"]."')");
	$queryString = "SELECT id, category_id FROM content";
	$result = $conn->query($queryString);
	if ($result && $result->num_rows > 0) {
		while ($row = $result->fetch_object()) {
			$resultInsertDefault = $conn->query("INSERT INTO content_sub_category_link (content_id, sub_category_group_id, sub_category_data_id, category_id) VALUES ('".$row->id."', '".$row->$_POST["id"]."', 'all', '".$row->category_id."')");
		}
	}

	echo json_encode(array("Response" => array("responseCode" => 200, "responseMessage" => "Data successfully inserted.")));
	
    $conn->close();
} else {
    echo json_encode(array("Response" => array("responseCode" => -100, "responseMessage" => "Field name cannot be empty")));
}
?>