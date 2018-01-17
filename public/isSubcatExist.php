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

	$dataExist = 0;
	$result = $conn->query("SELECT * FROM sub_category WHERE main_category_id = '".$_POST["id"]."' AND name = 'Location'");
    if ($result && $result->num_rows > 0) {
        while ($row = $result->fetch_object()) {
			$dataExist = 1;
        }
    }
	if ($dataExist == 0)
		echo json_encode(array("Response" => array("responseCode" => 200, "responseMessage" => "Data not exist.")));
	else
		echo json_encode(array("Response" => array("responseCode" => -100, "responseMessage" => "Data existed.")));
    
    $conn->close();
} else {
    echo json_encode(array("Response" => array("responseCode" => -100, "responseMessage" => "Field name cannot be empty")));
}
?>