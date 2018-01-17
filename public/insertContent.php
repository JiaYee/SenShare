<?php

if (isset($_POST["user_id"]) && isset($_POST["name"]) && isset($_POST["desc"]) && isset($_POST["type"]) && isset($_POST["address"]) && isset($_POST["phone_office"]) && isset($_POST["phone_mobile"]) && isset($_POST["weekday_business_hour"]) && isset($_POST["weekend_business_hour"]) && isset($_POST["latitude"]) && isset($_POST["longitude"]) && isset($_POST["image_path"]) && isset($_POST["category_id"])) {

	require_once('config.ini.php');
    $conn = new mysqli(DB_SERVER, DB_USER, DB_PASS, DB_DATABASE);

    // check connection
    if ($conn->connect_error) {
        echo json_encode(array("Response" => array("responseCode" => -100,
                "responseTitle" => "Database Not Found",
                "responseMessage" => "Unable to locate database in server")));
        die();
    }

  $_POST["user_id"] = $conn->real_escape_string($_POST["user_id"]);
	$_POST["name"] = $conn->real_escape_string($_POST["name"]);
	$_POST["desc"] = $conn->real_escape_string($_POST["desc"]);
	$_POST["type"] = $conn->real_escape_string($_POST["type"]);
	$_POST["address"] = $conn->real_escape_string($_POST["address"]);
	$_POST["phone_office"] = $conn->real_escape_string($_POST["phone_office"]);
	$_POST["phone_mobile"] = $conn->real_escape_string($_POST["phone_mobile"]);
	$_POST["weekday_business_hour"] = $conn->real_escape_string($_POST["weekday_business_hour"]);
	$_POST["weekend_business_hour"] = $conn->real_escape_string($_POST["weekend_business_hour"]);
	$_POST["latitude"] = $conn->real_escape_string($_POST["latitude"]);
	$_POST["longitude"] = $conn->real_escape_string($_POST["longitude"]);
	$_POST["image_path"] = $conn->real_escape_string($_POST["image_path"]);
	$_POST["category_id"] = $conn->real_escape_string($_POST["category_id"]);
	$websiteUrl = "";
	if (isset($_POST["website_url"]))
		$websiteUrl = $_POST["website_url"];

    $result = $conn->query("INSERT INTO content (name, description, type, address, phone_office, phone_mobile, weekday_business_hour, weekend_business_hour, website_url, image_path, latitude, longitude, category_id, user_id) VALUES ('".$_POST["name"]."', '".$_POST["desc"]."', '".$_POST["type"]."', '".$_POST["address"]."', '".$_POST["phone_office"]."', '".$_POST["phone_mobile"]."', '".$_POST["weekday_business_hour"]."', '".$_POST["weekend_business_hour"]."', '".$websiteUrl."', '".$_POST["image_path"]."', '".$_POST["latitude"]."', '".$_POST["longitude"]."', '".$_POST["category_id"]."', '".$_POST["user_id"]."')");

	$result = $conn->query("SELECT * FROM sub_category");
    if ($result && $result->num_rows > 0) {
        while ($row = $result->fetch_object()) {
			$resultInsertDefault = $conn->query("INSERT INTO content_sub_category_link (content_id, sub_category_group_id, sub_category_data_id, category_id) VALUES (LAST_INSERT_ID(), '".$row->id."', 'all', '".$_POST["category_id"]."')");
        }
    }

    echo json_encode(array("Response" => array("responseCode" => 200, "responseMessage" => "Data successfully inserted.")));

    $conn->close();
} else {
    echo json_encode(array("Response" => array("responseCode" => -100, "responseMessage" => "Field name cannot be empty")));
}
?>
