<?php
header('Access-Control-Allow-Origin: *');

if (isset($_POST["content_id"]) && isset($_POST["videofile"]) && isset($_POST["description"]))
{

require_once('config.ini.php');
    $conn = new mysqli(DB_SERVER, DB_USER, DB_PASS, DB_DATABASE);

    // check connection
    if ($conn->connect_error) {
        echo json_encode(array("Response" => array("responseCode" => -100,
                "responseTitle" => "Database Not Found",
                "responseMessage" => "Unable to locate database in server")));
        die();
    }
	
	

 $result = $conn->query("INSERT INTO `betweenlifestyle`.`videos` ( `content_id`, `videofile`, `description`) VALUES ('".$_POST["content_id"]."', '".$_POST["videofile"]."', '".$_POST["description"]."');");

 if($result)
{
 echo json_encode(array("Response" => array("responseCode" => 200, "responseMessage" => "Data successfully inserted.")));
    
    $conn->close();
} else {
    echo json_encode(array("Response" => array("responseCode" => -100, "responseMessage" => "First error here Field name cannot be empty")));
 }
}
else
{
    echo json_encode(array("Response" => array("responseCode" => -100, "responseMessage" => "Second error here Field name cannot be empty")));
}
 ?>

