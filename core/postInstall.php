<?php
function copyDir($src, $dst) {
    $dir = opendir($src);
    @mkdir($dst, 0755, true);
    while (($file = readdir($dir)) !== false) {
        if ($file !== '.' && $file !== '..') {
            if (is_dir("$src/$file")) {
                copyDir("$src/$file", "$dst/$file");
            } else {
                copy("$src/$file", "$dst/$file");
            }
        }
    }
    closedir($dir);
}

// Arrays of folders and files to be copied
$folders = ['core', 'snippets', 'assets'];
$files = ['index.php', 'functions_controller.php'];

// Base paths for source and destination
$baseSrc = __DIR__;
$baseDst = __DIR__ . '/../../../';

// Copy each folder
foreach ($folders as $folder) {
    $src = $baseSrc . '/' . $folder;
    $dst = $baseDst . $folder;
    copyDir($src, $dst);
}

// Copy each file
foreach ($files as $file) {
    $src = $baseSrc . '/' . $file;
    $dst = $baseDst . $file;
    copy($src, $dst);
}

echo "Specified folders and files copied successfully.\n";
