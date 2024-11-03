<?php
/** --- B A S E F U N C T I O N S ---
    This file sets up project-wide things like authentication -
    DO NOT REMOVE
**/
include('./core/lacekit.php');
?><!DOCTYPE html>
<html>
    <head>
        <title></title>
        <?php
        // this includes all the markup that loads css files and similar stuff,
        // if you have to add more css, that's the place to do it.
        // DO NOT REMOVE
        include(snippet("meta_headTag"));?>
        
</head>
    <body class="">
        <div class="container">
            <br><br><br>
             Datum
             <date-picker></date-picker> <br><br>
             <date-picker size="small"></date-picker> <br><br>
             <date-picker value="today"></date-picker> <br><br>
             <date-picker value="01.10.2024"></date-picker> <br><br>
              <!-- /container -->

        <?php
        // JAVASCRIPT
        // This includes the needed javascript files
        // DO NOT REMOVE
        include(snippet("meta_javascripts"));?>
  </body>
</html>







