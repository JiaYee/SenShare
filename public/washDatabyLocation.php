<?php
	
	if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 200');    // cache for 1 day
    }

    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

        exit(0);
    }

	require_once('config.ini.php');
    $conn = new mysqli(DB_SERVER, DB_USER, DB_PASS, DB_DATABASE);
	// check connection
    if ($conn->connect_error) {
        echo json_encode(array("Response" => array("responseCode" => -100,
                "responseTitle" => "Database Not Found",
                "responseMessage" => "Unable to locate database in server")));
        die();
    }
	
$sql = "SELECT * FROM content WHERE id IN (SELECT content_id FROM content_location WHERE location = '".$_POST["location"]."' and main_category_id = '".$_POST["main_category_id"]."') ORDER BY id DESC limit ".$_POST['start'].",".$_POST['end']."";
$result = $conn->query($sql);

foreach($conn->query("SELECT count(id) as total FROM content WHERE id IN (SELECT content_id FROM content_location WHERE location = '".$_POST["location"]."' and main_category_id = '".$_POST["main_category_id"]."')") as $rowtoal)
{
$total = $rowtoal["total"];
}

	while ($row = $result->fetch_object()) {
	$dataArray[] = array("category_id" => $row->category_id, "content_id" => $row->id, "content_name" => $row->name, "image_path" => $row->image_path, "count" => $result->num_rows);
	}

 echo json_encode(array("Response" => array("responseCode" => 200, "responseMessage" => "Success"),
	"Data" => $dataArray,"total"=>$total,"start"=>$_POST["start"],"end"=>$_POST["end"]));
$conn->close();
?>