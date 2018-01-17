<?php
ini_set('display_errors', 1);
if (isset($_GET["id"]) && isset($_GET["content_id"])) {
	require_once('config.ini.php');
    $conn = new mysqli(DB_SERVER, DB_USER, DB_PASS, DB_DATABASE);
    
	// check connection
    if ($conn->connect_error) {
        echo json_encode(array("Response" => array("responseCode" => -100,
                "responseTitle" => "Database Not Found",
                "responseMessage" => "Unable to locate database in server")));
        die();
    }
	
	$dataId = "";
	$dataName = "";
	$dataDescription = "";
	$dataType = "";
	$dataAddress = "";
	$dataPhoneOffice = "";
	$dataPhoneMobile = "";
	$dataWeekdayBusinessHour = "";
	$dataWeekendBusinessHour = "";
	$dataWebsiteUrl = "";
	$dataImagePath = "";
	$dataLatitude = "";
	$dataLongitude = "";
	$dataCategoryId = "";
	$dataCategoryName = "";
	$dataMonth = "";
	$dataYear = "";
	$queryString = "SELECT content.id, content.name, content.description, content.type, content.address, content.phone_office, content.phone_mobile, content.weekday_business_hour, content.weekend_business_hour, content.website_url, content.image_path, content.latitude, content.longitude, content.category_id, main_category_data.name AS category_name, MONTH(content.timestamp) AS month, YEAR(content.timestamp) AS year FROM content, main_category_data WHERE content.category_id = '".$_GET["id"]."' AND content.id = '".$_GET["content_id"]."' AND content.category_id = main_category_data.id";
	
	$result = $conn->query($queryString);
    if ($result && $result->num_rows > 0) {
        while ($row = $result->fetch_object()) {
			$dataId = $row->id;
			$dataName = $row->name;
			$dataDescription = $row->description;
			$dataType = $row->type;
			$dataAddress = $row->address;
			$dataPhoneOffice = $row->phone_office;
			$dataPhoneMobile = $row->phone_mobile;
			$dataWeekdayBusinessHour = $row->weekday_business_hour;
			$dataWeekendBusinessHour = $row->weekend_business_hour;
			$dataWebsiteUrl = $row->website_url;
			$dataImagePath = $row->image_path;
			$dataLatitude = $row->latitude;
			$dataLongitude = $row->longitude;
			$dataCategoryId = $row->category_id;
			$dataCategoryName = $row->category_name;
			$dataMonth = $row->month;
			$dataYear = $row->year;
        }
	}
	
	$imageIdArray = array();
	$imageNameArray = array();
	$imageDescriptionArray = array();
	$imagePathArray = array();
	
	$queryString = "SELECT image.id, image.name, image.description, image.image_path FROM image, content_image_link WHERE content_image_link.content_id = '".$_GET["content_id"]."' AND content_image_link.image_id = image.id";
	
	$result = $conn->query($queryString);
    if ($result && $result->num_rows > 0) {
        while ($row = $result->fetch_object()) {
			$imageIdArray[] = $row->id;
			$imageNameArray[] = $row->name;
			$imageDescriptionArray[] = $row->description;
			$imagePathArray[] = $row->image_path;
        }
	}

$playIdArray = array();
	$playImagePathArray = array();
	$playVideoPathArray = array();
	$playNameArray = array();
	$playDescriptionArray = array();
	
	$queryString = "SELECT * FROM play WHERE category_id = '".$_GET["category_id"]."' AND content_id = '".$_GET["content_id"]."'";
	$result = $conn->query($queryString);
    if ($result && $result->num_rows > 0) {
        while ($row = $result->fetch_object()) {
			$playIdArray[] = $row->play_id;
			$playImagePathArray[] = $row->image_path;
			$playVideoPathArray[] = $row->video_path;
			$playNameArray[] = $row->name;
			$playDescriptionArray[] = $row->description;
        }
	}
    $conn->close();
} else {
    echo json_encode(array("Response" => array("responseCode" => -100, "responseMessage" => "Field name cannot be empty")));
	die();
}
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="SHIELD - Free Bootstrap 3 Theme">
    <meta name="author" content="Carlos Alvarez - Alvarez.is - blacktie.co">

    <title><?php echo $dataName; ?></title>

    <!-- Bootstrap core CSS -->
    <link href="assets/css/bootstrap.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="assets/css/main.css" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/icomoon.css">
    <link href="assets/css/animate-custom.css" rel="stylesheet">
    
    <link href='http://fonts.googleapis.com/css?family=Lato:300,400,700,300italic,400italic' rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=Raleway:400,300,700' rel='stylesheet' type='text/css'>
    
    <script src="assets/js/jquery.min.js"></script>
	<script type="text/javascript" src="assets/js/modernizr.custom.js"></script>
    
    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="assets/js/html5shiv.js"></script>
      <script src="assets/js/respond.min.js"></script>
    <![endif]-->
  </head>

  <body>
	    <div>
			<img class="img-responsive" src="<?php echo $dataImagePath;?>" style="width:100%">	    
	    </div><!-- /headerwrap -->

		<!-- ==== ABOUT ==== -->
		<div class="container" id="about" name="about">
			<div class="row white">
			<br>
				<h1 class="centered"><?php echo $dataName?></h1>
				<hr>
				<div class="col-lg-6">
					<h4><b>Main Category</b></h4>
					<span><?php echo $dataCategoryName ?></span>
					<h4><b>Description</b></h4>
					<span><?php echo nl2br($dataDescription) ?></span>
					<h4><b>Address</b></h4>
					<span><?php echo nl2br($dataAddress) ?></span>
					<?php if ($dataPhoneOffice != "") :?>
					<h4><b>Phone (Office)</b></h4>
					<span><?php echo $dataPhoneOffice ?></span>
					<?php endif;?>
					<?php if ($dataPhoneMobile != "") :?>
					<h4><b>Phone (Mobile)</b></h4>
					<span><?php echo $dataPhoneMobile ?></span>
					<?php endif;?>
				</div><!-- col-lg-6 -->
				
				<div class="col-lg-6">
					<h4><b>Business Hour</b></h4>
					<h4><b>Weekday</b></h4>
					<span><?php echo $dataWeekdayBusinessHour ?></span>
					<h4><b>Weekend</b></h4>
					<span><?php echo $dataWeekendBusinessHour ?></span>
					<?php if ($dataWebsiteUrl != "－－－" && $dataWebsiteUrl != "" && $dataWebsiteUrl != "- - -") :?>
					<h4><b>Website Url</b></h4>
					<span><?php echo $dataWebsiteUrl ?></span>
					<?php endif;?>
					<h4><b>Created On</b></h4>
					<span><?php echo $dataMonth." ".$dataYear ?></span>
				</div><!-- col-lg-6 -->
			</div><!-- row -->
		</div><!-- container -->
		
		<!-- ==== GREYWRAP ==== -->
		<div id="greywrap">
			<div class="row">
				<div class="row">
					<br>
					<h1 class="centered">Gallery</h1>
					<hr>
					<br>
					<br>
				</div><!-- /row -->
				<div class="container">
				
				<?php
					for ($x = 0; $x < count($imageIdArray); $x++) {
						if(($x + 1) % 3 == 1 && $x != 0)
						{
							echo "</div>";
						}
						if(($x + 1) % 3 == 1)
						{
							echo "<div class=\"row\">";
						}
						
						echo "<div class=\"col-md-4\">";
							echo "<div class=\"grid mask\">";
								echo "<figure>";
									echo "<a data-toggle=\"modal\" href=\"#modalImageGallery".$x."\"><img class=\"img-responsive\" src=\"".$imagePathArray[$x]."\"></a>";
									echo "<figcaption>";
										echo "<h5>".$imageNameArray[$x]."</h5>";
										echo "<a data-toggle=\"modal\" href=\"#modalImageGallery".$x."\" class=\"btn btn-primary btn-lg\">View</a>";
									echo "</figcaption>";
								echo "</figure>";
							echo "</div>";
						echo "</div>";
											
							echo "<div class=\"modal fade\" id=\"modalImageGallery".$x."\" tabindex=\"".$x."\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">";
								echo "<div class=\"modal-dialog\" style=\"width:80%\">";
								    echo "<div class=\"modal-content\">";
										echo "<div class=\"modal-header\">";
											echo "<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>";
											echo "<h4 class=\"modal-title\">".$imageNameArray[$x]."</h4>";
										echo "</div>";
										echo "<div class=\"modal-body\">";
											echo "<p><img class=\"img-responsive\" src=\"".$imagePathArray[$x]."\" style=\"width:100%\"></p>";
											echo "<p>".$imageDescriptionArray[$x]."</p>";
										echo "</div>";
										echo "<div class=\"modal-footer\">";
											echo "<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>";
										echo "</div>";
								    echo "</div>";
								echo "</div>";
							echo "</div>";
						if(count($imageIdArray) - 1 == $x)
						{
							echo "</div>";
						}
					}
				?>
				<br>
				<br>
				</div>
			</div><!-- row -->
		</div><!-- greywrap -->
				
		<!-- ==== PORTFOLIO ==== -->
		<div class="container" id="portfolio" name="portfolio">
		<br>
			<div class="row">
				<div class="row">
					<br>
					<h1 class="centered">Play</h1>
					<hr>
					<br>
					<br>
				</div><!-- /row -->
				<div class="container">
				
				<?php
					for ($x = 0; $x < count($playIdArray); $x++) {
						if(($x + 1) % 3 == 1 && $x != 0)
						{
							echo "</div>";
						}
						if(($x + 1) % 3 == 1)
						{
							echo "<div class=\"row\">";
						}
						
						echo "<div class=\"col-md-4\">";
							echo "<div class=\"grid mask\">";
								echo "<figure>";
									echo "<a href=\"".$playVideoPathArray[$x]."\"><img class=\"img-responsive\" src=\"".$playImagePathArray[$x]."\"></a>";
									echo "<figcaption>";
										echo "<h5>".$playNameArray[$x]."</h5>";
										echo "<a data-toggle=\"modal\" href=\"#modalVideoGallery".$x."\" class=\"btn btn-primary btn-lg\">View</a>";
									echo "</figcaption>";
								echo "</figure>";
							echo "</div>";
						echo "</div>";
											
							echo "<div class=\"modal fade\" id=\"modalVideoGallery".$x."\" tabindex=\"".$x."\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">";
								echo "<div class=\"modal-dialog\" style=\"width:80%\">";
								    echo "<div class=\"modal-content\">";
										echo "<div class=\"modal-header\">";
											echo "<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>";
											echo "<h4 class=\"modal-title\">".$playNameArray[$x]."</h4>";
										echo "</div>";
										echo "<div class=\"modal-body\">";
											echo "<p><video src=\"".$playVideoPathArray[$x]."\" style=\"width:100%\" controls></video></p>";
											echo "<p>".$playDescriptionArray[$x]."</p>";
										echo "</div>";
										echo "<div class=\"modal-footer\">";
											echo "<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>";
										echo "</div>";
								    echo "</div>";
								echo "</div>";
							echo "</div>";
						if(count($imageIdArray) - 1 == $x)
						{
							echo "</div>";
						}
					}
				?>
				<br>
				<br>
				</div>
			</div><!-- row -->
		</div><!-- /row -->
	</div><!-- /container -->
		
		<div id="footerwrap">
			<div class="container">
				<h4>SenShare - Copyright 2016</h4>
			</div>
		</div>

    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
		

	<script type="text/javascript" src="assets/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="assets/js/retina.js"></script>
	<script type="text/javascript" src="assets/js/jquery.easing.1.3.js"></script>
    <script type="text/javascript" src="assets/js/smoothscroll.js"></script>
	<script type="text/javascript" src="assets/js/jquery-func.js"></script>
  </body>
</html>
