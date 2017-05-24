<?php
header('Access-Control-Allow-Origin: *');
$file = file_get_contents('si_script.js', FILE_USE_INCLUDE_PATH);
print_r($file);
