<?php

if (isset($_POST["group_id"]) && isset($_POST["data_id"])) {
    
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
	$_POST["data_id"] = $conn->real_escape_string($_POST["data_id"]);

	$categoryExist = 0;
	$result = $conn->query("SELECT * FROM sub_category_data WHERE id = '".$_POST["data_id"]."'");
    if ($result && $result->num_rows > 0) {
        while ($row = $result->fetch_object()) {
			$categoryExist = 1;
        }
    }
	if ($categoryExist == 0)
		echo json_encode(array("Response" => array("responseCode" => 200, "responseMessage" => "Sub Category does not exist.")));
	else
	{
		$dataExist = 0;
		$result = $conn->query("SELECT * FROM content_sub_category_link WHERE sub_category_group_id = '".$_POST["group_id"]."' AND sub_category_data_id = '".$_POST["data_id"]."'");
		if ($result && $result->num_rows > 0) {
			while ($row = $result->fetch_object()) {
				$dataExist = 1;
			}
		}
		
		if($dataExist)
			echo json_encode(array("Response" => array("responseCode" => -100, "responseMessage" => "Unable to delete sub category data. Make sure your sub category data does have any data")));
		else
		{
			$deleteResult = $conn->query("DELETE FROM sub_category_data WHERE id = '".$_POST["data_id"]."'");
			echo json_encode(array("Response" => array("responseCode" => 200, "responseMessage" => "Sub Category data deleted successfully.")));
		}
	}
    $conn->close();
} else {
    echo json_encode(array("Response" => array("responseCode" => -100, "responseMessage" => "Field name cannot be empty")));
}
?>