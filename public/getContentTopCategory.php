
<?php
	$mysegment=1;
	if (isset($_POST["segment"]) ) $mysegment=$_POST["segment"]; 
	
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
	
	$dataArray = array();
	// Image path 
	$imgPath="";
	$Tsql = "SELECT `SettingValue` FROM `settings` WHERE `SettingCode`='ImgPath'";
	$Tresult =$conn->query($Tsql);
	if ($Tresult) {
        while ($row = $Tresult->fetch_object()) {
			$imgPath = $row->SettingValue;
        }
    }
	// 
	$result = $conn->query("SELECT distinct `content`.name name,`content`.id,`content`.category_id , Concat( '".$imgPath."','optimize/',SUBSTRING_INDEX(`content`.image_path, '/', -1)) as Opt_Path ,content.segment FROM  `content` where content.segment in ('".$mysegment."') order by `content`.name ASC");
			if ($result && $result->num_rows > 0) {
				while ($row = $result->fetch_object()) {
					$dataArray[] = array("content_id" => $row->id, "name" => $row->name, "image_path" => $row->Opt_Path, "segment" => $row->segment, "category_id" => $row->category_id);			
				}
			}
			
	// check connection
	
	header('Content-Type: application/json');	
	
    if ($conn->connect_error) {
	
        echo json_encode(array("Response" => array("responseCode" => -100,
                "responseTitle" => "Database Not Found",
                "responseMessage" => "Unable to locate database in server")));
        die();
    }
	
    echo json_encode(array("Response" => array("responseCode" => 200, "responseMessage" => "Success"),
	"Data" => $dataArray));
	
    $conn->close();
	
?>

