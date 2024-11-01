<?php 
if(isset($moduleList) && $moduleList == true){return;}

$fallbackData = takeDefaultData($moduleVars);


//var_dump($fallbackData);

foreach ($fallbackData as $key => $value) {
    if(!isset($$key)){
        //echo $key.": ".$value."<br>";
        $$key = $value;
    }
}

function takeDefaultData($string) {
    $ymlData = Spyc::YAMLLoad(trim($string));
   return $ymlData['module']['data'];
}
