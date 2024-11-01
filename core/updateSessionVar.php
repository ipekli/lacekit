<?php
include('protostrap.php');


$tmpType = false;
$tmpVarname = false;
$tmpVal = false;

$vars = array("type", "varname", "val");
foreach ($vars as $val) {
    if(isset($_GET[$val])){
        $varname = "tmp".ucfirst($val);
        $$varname = $_GET[$val];
    }
}



if($tmpType == false OR $tmpVarname  === false OR $tmpVal  === false){
    echo "Error: Missing Parameters";
    die();
}


// this allows to log in over ajax
if($tmpVarname == "login"){
    setcookie("loggedIn", $tmpVal );
    echo "Login on ".$_SERVER['HTTP_HOST'];
    die();
}

$tmpReturnVar = $tmpVarname;

if($tmpVal  == "false"){
    $tmpVal  = false;
}

if(!is_array($tmpVal)){
    if(intval($tmpVal) !== 0){
        $tmpVal = intval($tmpVal);
    }
    if($tmpVal == "0"){
        $tmpVal = 0;
    }
}

// if(strpos($tmpVarname, ".") === false && empty($_SESSION[$tmpVarname])){
//     echo "Error: Variable does not exist";
//     die();
// }


switch ($tmpType) {
    case 'set':
        if(strpos($tmpVarname, ".") !== false){
            $el = explode(".", $tmpVarname);
            $tmpReturnVar = $el[0];
            setSessionForValue($el, $tmpVal);

        } else {
            $_SESSION[$tmpVarname] = $tmpVal;
        }
        break;
    case 'pushArray':
        $tmpVal = json_decode($tmpVal);
        $tmpVal = (array) $tmpVal;
        if(strpos($tmpVarname, ".") !== false){
            $el = explode(".", $tmpVarname);
            $tmpReturnVar = $el[0];
            setSessionForArray($el, $tmpVal);
            break;
        }
    case 'push':
        array_push($_SESSION[$tmpVarname], $tmpVal);
        $_SESSION[$tmpVarname] = array_unique($_SESSION[$tmpVarname]);
        $_SESSION[$tmpVarname] = array_values($_SESSION[$tmpVarname]);
        break;
    case 'remove':
        foreach ($_SESSION[$tmpVarname] as $key => $value) {
            if($tmpVal == $value){
                unset($_SESSION[$tmpVarname][$key]);
            }
        }
        $_SESSION[$tmpVarname] = array_unique($_SESSION[$tmpVarname]);
        $_SESSION[$tmpVarname] = array_values($_SESSION[$tmpVarname]);
        break;
    case 'removeKey':
        unset($_SESSION[$tmpVarname][$tmpVal]);
        break;
    case 'removeValue':
        unset($_SESSION[$tmpVarname][$tmpVal]);
        if (($key = array_search($tmpVal, $_SESSION[$tmpVarname])) !== false) {
            unset($_SESSION[$tmpVarname][$key]);
        }
        break;

    case 'null':
        if(is_array($_SESSION[$tmpVarname])){
            $_SESSION[$tmpVarname] = array();
        } else {
            $_SESSION[$tmpVarname] = false;
        }
        break;
}

function setSessionForArray($el, $tmpVal){

  

    switch(count($el)){
        case 1:
            array_push($_SESSION[$el[0]], $tmpVal);
            break;
        case 2:
            array_push($_SESSION[$el[0]][$el[1]], $tmpVal);
            break;
        case 3:
            array_push($_SESSION[$el[0]][$el[1]][$el[2]], $tmpVal);
            break;
        case 4:
            array_push($_SESSION[$el[0]][$el[1]][$el[2]][$el[3]], $tmpVal);
            break;
        case 5:
            array_push($_SESSION[$el[0]][$el[1]][$el[2]][$el[3]][$el[4]], $tmpVal);
            break;
        case 6:
            array_push($_SESSION[$el[0]][$el[1]][$el[2]][$el[3]][$el[4]][$el[5]], $tmpVal);
            break;
        case 7:
            array_push($_SESSION[$el[0]][$el[1]][$el[2]][$el[3]][$el[4]][$el[5]][$el[6]], $tmpVal);
            break;
        default:
            die("Error: " . count($el) . " are too many levels");
            break;
    }
}

function setSessionForValue($el, $tmpVal){

    switch(count($el)){
        case 1:
            $_SESSION[$el[0]] = $tmpVal;
            break;
        case 2:
            $_SESSION[$el[0]] [$el[1]]= $tmpVal;
            break;
        case 3:
            $_SESSION[$el[0]][$el[1]][$el[2]] = $tmpVal;
            break;
        case 4:
            $_SESSION[$el[0]][$el[1]][$el[2]][$el[3]] = $tmpVal;
            break;
        case 5:
            $_SESSION[$el[0]][$el[1]][$el[2]][$el[3]][$el[4]] = $tmpVal;
            break;
        case 6:
            $_SESSION[$el[0]][$el[1]][$el[2]][$el[3]][$el[4]][$el[5]] = $tmpVal;
            break;
        case 7:
            $_SESSION[$el[0]][$el[1]][$el[2]][$el[3]][$el[4]][$el[5]][$el[6]] = $tmpVal;
            break;
        default:
            die("Error: " . count($el) . " are too many levels");
            break;
    }
}

echo json_encode($_SESSION[$tmpReturnVar]);