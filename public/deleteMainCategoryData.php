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

	$categoryExist = 0;
	$result = $conn->query("SELECT * FROM main_category_data WHERE id = '".$_POST["id"]."'");
    if ($result && $result->num_rows > 0) {
        while ($row = $result->fetch_object()) {
			$categoryExist = 1;
        }
    }
	if ($categoryExist == 0)
		echo json_encode(array("Response" => array("responseCode" => 200, "responseMessage" => "Main Category does not exist.")));
	else
	{
		$dataExist = 0;
		$result = $conn->query("SELECT * FROM content WHERE category_id = '".$_POST["id"]."'");
		if ($result && $result->num_rows > 0) {
			while ($row = $result->fetch_object()) {
				$dataExist = 1;
			}
		}
		
		if($dataExist)
			echo json_encode(array("Response" => array("responseCode" => -100, "responseMessage" => "Unable to delete main category. Make sure your main category does have any content")));
		else
		{
			$deleteResult = $conn->query("DELETE FROM main_category_data WHERE id = '".$_POST["id"]."'");
			echo json_encode(array("Response" => array("responseCode" => 200, "responseMessage" => "Main Category deleted successfully.")));
		}
	}
    $conn->close();
} else {
    echo json_encode(array("Response" => array("responseCode" => -100, "responseMessage" => "Field name cannot be empty")));
}
?>