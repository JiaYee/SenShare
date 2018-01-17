<?php
if (isset($_POST["json_sub_category"]) && isset($_POST["category_id"])) {
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
	
	$filter = "";
	$jsonArray = json_decode($_POST["json_sub_category"], true);
	$filterCounter = 0;
	for($x = 0; $x <count($jsonArray); $x++)
	{
		//echo $jsonArray[$x]["sub_category_id"]
		//echo $jsonArray[$x]["sub_category_data_id"]
		if($jsonArray[$x]["sub_category_data_id"] != "all")
		{
			$filterCounter += 1;
			if($filter != "")
				$filter .= " OR";
			$filter .= " (sub_category_group_id = '".$jsonArray[$x]["sub_category_id"]."' AND sub_category_data_id = '".$jsonArray[$x]["sub_category_data_id"]."')";
		}
	}
    
	$queryString = "SELECT COUNT(content_id) AS count, content_id FROM content_sub_category_link WHERE category_id = '".$_POST["category_id"]."'";
	
	if($filterCounter != 0)
		$queryString .= " AND ".$filter." GROUP BY content_id ORDER BY id DESC";
	else
		$queryString = "SELECT content.id, content.name, content.image_path FROM content WHERE category_id = '".$_POST["category_id"]."' ORDER BY id DESC";
	
	
	$result = $conn->query($queryString);
    if ($result && $result->num_rows > 0) {
        while ($row = $result->fetch_object()) {
			if($filterCounter == 0)
				$dataArray[] = array("id" => $row->id, "name" => $row->name, "image_path" => $row->image_path);
			else
			{
				if($row->count == $filterCounter)
				{
					$contentResult = $conn->query("SELECT id, name, image_path FROM content WHERE id = '".$row->content_id."' AND category_id = '".$_POST["category_id"]."'");
					if ($contentResult && $contentResult->num_rows > 0) {
						while ($contentResultRow = $contentResult->fetch_object()) {
							$dataArray[] = array("id" => $contentResultRow->id, "name" => $contentResultRow->name, "image_path" => $contentResultRow->image_path);
						}
					}
				}
			}
        }
	}
		
    echo json_encode(array("Response" => array("responseCode" => 200, "responseMessage" => "Query result"), "data" => $dataArray));
		
    $conn->close();
} else {
    echo json_encode(array("Response" => array("responseCode" => -100, "responseMessage" => "Field name cannot be empty")));
}
?>