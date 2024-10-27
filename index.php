<?php
/** --- B A S E F U N C T I O N S ---
    This file sets up project-wide things like authentication -
    DO NOT REMOVE
**/
include('./core/protostrap.php');
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
            <?php foreach ($myArray as $key => $value) { ?>
              <?php echo $value; ?><br>
            <?php } ?>
            
            <?php foreach ($pagearray as $key => $value) { ?>
              <?php echo $value; ?><br>
            <?php } ?>
            
            Text
            
             <sl-button>Click me</sl-button> <br><br>
             <date-picker value="12.01.2024" label="Date"></date-picker> <br><br>
             <date-picker value="2024-01-12"></date-picker>
            
            <sl-badge variant="primary" pill pulse>Primary</sl-badge>
            <sl-drawer label="Drawer" class="drawer-overview">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              <sl-button slot="footer" variant="primary">Close</sl-button>
            </sl-drawer>

            <sl-button class="open-drawer">Open Drawer</sl-button>
        </div> <!-- /container -->

        <?php
        // JAVASCRIPT
        // This includes the needed javascript files
        // DO NOT REMOVE
        include(snippet("meta_javascripts"));?>
        <script src="./assets/js/main.js"></script>
        <script>
          $(function () {
            $('html').addClass ( 'dom-loaded' );
            $('.open-drawer').on('click', function() {
              
              const drawer = document.querySelector('.drawer-overview');
              drawer.show();
            });
          });
        </script>
        
  </body>
</html>
