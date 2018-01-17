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
	
	
	//
	//$result = $conn->query("SELECT distinct `sub_category`.main_category_id category_id ,`sub_category`.name sub_category_name ,`content`.id content_id,`content`.name content_name,`content`.image_path,Concat('http://203.223.131.51:81/between_v1/upload/optimize/',SUBSTRING_INDEX(`content`.image_path, '/', -1)) opt_img FROM `main_category_data` INNER JOIN `sub_category` on `sub_category`.main_category_id = `main_category_data`.id Inner join `sub_category_data` on `sub_category_data`.sub_category_id = `sub_category`.id inner join `content_sub_category_link` on `content_sub_category_link`.sub_category_data_id = `sub_category_data`.id Inner join `content` on `content`.id = `content_sub_category_link`.content_id where `main_category_data`.id ='".$_POST["id"]."' and ('".$_POST["subid"]."'='0' or sub_category_data.id='".$_POST["subid"]."') LIMIT 0 , 50;");
	$result = $conn->query("SELECT category_id,'' sub_category_name,content.id content_id, content.name content_name, Concat('http://betweenlifestyle.com/senshare/upload/optimize/',SUBSTRING_INDEX(`content`.image_path, '/', -1)) opt_img FROM content WHERE name LIKE '%".$_POST["search_string"]."%'  ORDER BY id DESC  limit ".$_POST['start'].",".$_POST['end']);
//$result = $conn->query("SELECT distinct `main_category_data`.id category_id,`content`.id content_id,`content`.name content_name,`content`.image_path,Concat('http://203.223.131.51:81/between_v1/upload/optimize/',SUBSTRING_INDEX(`content`.image_path, '/', -1)) opt_img FROM `content` on `content`.Category_Id = `main_category_data`.id where `main_category_data`.id ='".$_POST["id"]."' LIMIT 0 , 50;");

		foreach($conn->query("SELECT count(id) as total FROM `content` where  name LIKE '%".$_POST["search_string"]."%'") as $rowtoal)
{
$total = $rowtoal["total"];
}
 
	
	
    if ($result && $result->num_rows > 0) {
        while ($row = $result->fetch_object()) {
			$dataArray[] = array("category_id" => $row->category_id, "sub_category_name" => $row->sub_category_name, "content_id" => $row->content_id, "content_name" => $row->content_name, "image_path" => $row->opt_img);
        }
    }
header('Content-Type: application/json');
    echo json_encode(array("Response" => array("responseCode" => 200, "responseMessage" => "Success"),
	"Data" => $dataArray,"total"=>$total,"start"=>$_POST["start"],"end"=>$_POST["end"]));
	
    $conn->close();
	
?>
