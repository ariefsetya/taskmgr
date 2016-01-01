<?php 
date_default_timezone_set("Asia/Jakarta");
header("Content-Type: text/html; charset=UTF-8");
mysql_query("set character_set_server='utf8'");
mysql_query("set names 'utf8'");
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="product" content="KlikJakarta Notes">
    <meta name="description" content="Save your note and to do list at KlikJakarta ">
    <meta name="author" content="Arief Setya">
    <meta name="keywords" content="klikjakarta, klik jakarta, jakarta, notes management, list management, to do list, notes">
    <meta name="title" content="klikjakarta">
    <meta name="keywords tag" content="klikjakarta, klik jakarta, jakarta, notes management, list management, to do list, notes">

    <link href="<?php echo base_url();?>assets/css/metro-bootstrap.css" rel="stylesheet">
    <!--link href="<?php echo base_url();?>assets/css/metro-bootstrap-responsive.css" rel="stylesheet"-->
    <link href="<?php echo base_url();?>assets/css/docs.css" rel="stylesheet">
    <link href="<?php echo base_url();?>assets/js/prettify/prettify.css" rel="stylesheet">
    <link href="<?php echo base_url();?>assets/css/mine.css" rel="stylesheet">
    <link rel="icon" type="image/x-icon" href="<?php echo base_url();?>assets/favicon.ico">

    <title>KlikJakarta</title>
    <style type="text/css">
    label{
        font-size: 12pt;
    }
    </style>
</head>
    <BODY class="metro" style="height:100%;">
        <header class=""><?php include "menu.php";?></header>
        <div id="bodybody" class="" style="">