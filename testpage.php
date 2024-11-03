<?php
/** --- B A S E F U N C T I O N S ---
    This file sets up project-wide things like data handling -
    DO NOT REMOVE
**/
include('./core/lacekit.php');
?>
<!DOCTYPE html>
<html>
<head>
<?php
        // this includes all the markup that loads css files and similar stuff,
        // if you have to add more css, that's the place to do it.
        // DO NOT REMOVE
        include(snippet("meta_headTag"));?>
    <title>Test Page - Grid System & Components</title>
    <style>
        .grid-demo .col, .grid-demo div[class*="col-"] {
            background: #f0f0f0;
            border: 1px solid #ddd;
            padding: 15px;
            margin-bottom: 15px;
            text-align: center;
        }
        .section-title {
            margin: 40px 0 20px;
            padding-bottom: 10px;
            border-bottom: 1px solid #eee;
        }
    </style>
</head>
<body class="pb8">
    <div class="container p4">
        <h1 class="section-title">Grid System Demo</h1>
        
        <!-- Full width -->
        <div class="row grid-demo">
            <div class="col">
                <p>Full width</p>
            </div>
        </div>

        <!-- Two columns -->
        <div class="row grid-demo">
            <div class="col">
                <p>col 6 units wide</p>
            </div>
            <div class="col">
                <p>col 6 units wide</p>
            </div>
        </div>

        <!-- Three columns -->
        <div class="row grid-demo">
            <div class="col s4">
                <p>col s4</p>
            </div>
            <div class="col s4">
                <p>col s4</p>
            </div>
            <div class="col s4">
                <p>col s4</p>
            </div>
        </div>

        <!-- Four columns -->
        <div class="row grid-demo">
            <div class="col-1">
                <p>col 1 unit wide</p>
            </div>
            <div class="col-2 ">
                <p>col 2 units wide</p>
            </div>
            <div class="col-3">
                <p>col 3 units wide</p>
            </div>
            <div class="col-6">
                <p>col 6 units wide</p>
            </div>
        </div>

        <h1 class="section-title">Datepicker Demo</h1>
        <div class="row">
            <div class="col-3">
                <date-picker value="<?php echo date('d.m.Y'); ?>"></date-picker>
            </div>
        </div>
        <h1 class="section-title">Drawer Demo</h1>
        <sl-button class="open-drawer">Open Drawer</sl-button>
        <sl-drawer label="Drawer" class="drawer-overview">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            <sl-button slot="footer" variant="primary">Close</sl-button>
        </sl-drawer>
    </div>
    <?php
        // JAVASCRIPT
        // This includes the needed javascript files
        // DO NOT REMOVE
        include(snippet("meta_javascripts"));?>
    <!-- Custom Page specific JS -->
    <script>
        $(function () {
        $('.open-drawer').on('click', function() {
              const drawer = document.querySelector('.drawer-overview');
              drawer.show();
            });
          });
    </script>
</body>
</html> 