<?php
if (isset($_POST["category_id"]) && isset($_POST["content_id"])) {
	require_once('config.ini.php');
    $conn = new mysqli(DB_SERVER, DB_USER, DB_PASS, DB_DATABASE);
    
	// check connection
    if ($conn->connect_error) {
        echo json_encode(array("Response" => array("responseCode" => -100,
                "responseTitle" => "Database Not Found",
                "responseMessage" => "Unable to locate database in server")));
        die();
    }
    
	$_POST["category_id"] = $conn->real_escape_string($_POST["category_id"]);
	$_POST["content_id"] = $conn->real_escape_string($_POST["content_id"]);
	
	$data = array();
	$queryString = "SELECT * FROM voucher WHERE category_id = '".$_POST["category_id"]."' AND content_id = '".$_POST["content_id"]."'";
	
	$result = $conn->query($queryString);
    if ($result && $result->num_rows > 0) {
        while ($row = $result->fetch_object()) {
			$data[] = $row;
        }
	}
		
    echo json_encode(array("Response" => array("responseCode" => 200, "responseMessage" => "Query result"), "Data" => $data));
		
    $conn->close();
} else {
    echo json_encode(array("Response" => array("responseCode" => -100, "responseMessage" => "Field name cannot be empty")));
}
?>