<?php
	require_once('config.ini.php');
    $conn = new mysqli(DB_SERVER, DB_USER, DB_PASS, DB_DATABASE);
    
	// check connection
    if ($conn->connect_error) {
        echo json_encode(array("Response" => array("responseCode" => -100,
                "responseTitle" => "Database Not Found",
                "responseMessage" => "Unable to locate database in server")));
        die();
    }
    
	$content = "";
	$queryString = "SELECT html_content FROM about_us LIMIT 1";
	$result = $conn->query($queryString);
    if ($result && $result->num_rows > 0) {
        while ($row = $result->fetch_object()) {
			$content = $row->html_content;
        }
	}
		header('Content-Type: application/json');	
    echo json_encode(array("Response" => array("responseCode" => 200, "responseMessage" => "Query result"), "data" => $content));
		
    $conn->close();
?>