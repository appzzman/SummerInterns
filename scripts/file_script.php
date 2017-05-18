<?php
header('Access-Control-Allow-Origin: *');
$file = file_get_contents('file_script.js', FILE_USE_INCLUDE_PATH);
print_r($file);
