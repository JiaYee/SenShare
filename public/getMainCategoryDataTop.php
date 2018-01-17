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
	
    $dataArray = array();
	

	$result = $conn->query("SELECT *,Concat('http://203.223.131.51:81/between_v1/upload/optimize/',SUBSTRING_INDEX(image_path, '/', -1)) as opt_img  FROM main_category_data where type ='1' and topcategory between 1 and 10 order by topcategory asc");
	$lstdata = array();
	while($rows = mysqli_fetch_assoc($result)) {
		$lstdata[] = $rows;
	}
    
	echo json_encode(array("result" => $lstdata));
    $conn->close();
	
?>
