<?php

if($_SERVER['SERVER_NAME'] == "demospital.ch"){
// if($_SERVER['SERVER_NAME'] == "kispro.lo"){
    checkDsToken();
}
$heute = date("d.m.Y");
$today = $heute;

function checkDsToken(){
    return;
    //Token wechselt jeden Tag, zudem ein Salt, damits nicht so offensichtlich reverse engineered werden kann.
    $neededToken = md5(date('Y-m-d'). "dgh3%h_" );

    // Falls es das richtige Cookie hat durchlassen
    if(isset($_COOKIE["dsToken"]) && $_COOKIE["dsToken"] == $neededToken){return;}

    // Falls das Token via GET Parameter mitkommt
    if(isset($_GET['dsToken'])):
        $dsToken = $_GET['dsToken'];
        if ($dsToken == $neededToken):
            //Cookie Setzen und durchlassen
            setcookie("dsToken", $dsToken, time()+8*3600);
            return;
        else:
            die("Zugriff nicht erlaubt " );
        endif;
    else:
        die("Zugriff nicht erlaubt " );
    endif;
}


Class App{

    public $userMainTabs = array();
    public $userPatTabs = array();
    public $activeUser = array();
    public $activePat = array();
    public $genderIcon = array("f"=>"female", "m"=>"male");
    public $genderLabel = array("f"=>"Weiblich", "m"=>"Männlich");
    public $patTabs = array();
    public $mainTabs = array();



    function __construct($users, $activeUser, $pats, $activePat){
        $this->setActiveUser($users, $activeUser);
        $this->patTabs = $GLOBALS['patTabs'];
        $this->mainTabs = $GLOBALS['mainTabs'];
        $this->setActivePat($pats, $activePat);
        $this->userMainTabs = $this->setTabs($this->activeUser, "user");
        $this->userPatTabs = $this->setTabs($this->activeUser, "patient");
    }


    function setActiveUser($users, $activeUser){
        foreach ($users['data'] as $key => $user):
            if($user['typ'] == $activeUser){
                $this->activeUser = $user;
                break;
            }
        endforeach;
    }

    function setActivePat($pats, $activePat){
        foreach ($pats['data'] as $key => $pat):
            if($pat['id'] == $activePat){
                $this->activePat = $pat;
                $this->activePat['datakey'] = $key;
                $this->activePat['fullname'] = $pat['name']." ".$pat['vorname'];
                $this->activePat['initials'] = substr($pat['name'],0,1).substr($pat['vorname'],0,1);
                $this->activePat['geburtsdatum'] = date("d.m.Y", strtotime($pat['geburtsdatum']));
                $this->activePat['alter'] = $this->getAge($pat['geburtsdatum']);
                $this->activePat['eintritt'] = $this->makeDateFromString($pat['eintritt']." days");
                $this->activePat['austritt'] = $this->makeDateFromString($pat['austritt']." days");
                $this->activePat['fallliste'] = $this->getFallliste($this->activePat['faelle']);
                $this->activePat['dauer'] = intval($pat['eintritt'])*-1;
                $pat['eintritt'] = intval($pat['eintritt'])*-1;
                switch ($pat['eintritt']) {
                    case 0:
                        $this->activePat['eintrittText'] = "Heute";
                        break;
                    case 1:
                        $this->activePat['eintrittText'] = "Gestern";
                        break;
                    
                    default:
                        $this->activePat['eintrittText'] = "Vor ". $pat['eintritt']. " Tagen";
                        break;
                }
                if($this->activePat['austritt'] == "unbekannt"):
                    $this->activePat['austrittText'] = "unbekannt";
                else:

                    $pat['austritt'] = intval($pat['austritt'])*-1;
                    switch ($pat['austritt']) {
                        case 0:
                            $this->activePat['austrittText'] = "Heute";
                            break;
                        case 1:
                            $this->activePat['austrittText'] = "Morgen";
                            break;
                        default:
                            $this->activePat['austrittText'] = "In ". $pat['austritt']. " Tagen";
                            break;
                    }
                endif;
                // Offene Leistungen
                $leistungen = explode("\n",$pat['offeneleistungen'] );
                $this->activePat['offeneLeistungen'] = array();
                foreach ($leistungen as $key => $leistung) {
                    $items = explode("|", $leistung);
                    $leistung = array("bezeichnung" => trim($items[0]),"status" => trim($items[1]),"bericht" => trim($items[2]),"erfasser" => trim($items[3]));
                    $this->activePat['offeneLeistungen'][] = $leistung;
                }

                break;
            }
        endforeach;
    }

    function setActiveTab($openpats, $activePat, $tab){
        foreach ($openpats as $key => $pat) {
            if($pat['patid'] == $activePat){
                $_SESSION['openpats'][$key]['activeTab'] = $tab;
                return;
            }
        }
    }

    function setTabs($user, $type){
            $trimmedTabs = $this->trimTabs($user['tabs_'.$type]);
            $tabs = array();
            switch ($type) {
                case 'user':
                    $pool = $this->mainTabs;
                    break;
                default:
                    $pool = $this->patTabs;
                    break;
            }
            foreach ($pool as $key => $pooltab) {
                if(in_array($key, $trimmedTabs)){
                    $tabs[$key] = $pooltab;
                }
            }
            return $tabs;
    }

    function figureFormat($num, $decimals = 2){
        $num = floatval($num);
       return number_format($num, $decimals, '.', '&rsquo;');
    }

    function trimTabs($tabsraw){
        $tabs = explode(",", $tabsraw);
        foreach ($tabs as $key => $tab) {
            $tabs[$key] = trim(strtolower($tab));
        }
        return $tabs;
    }

    function getAge($date){
        $dob = new DateTime($date);
        $now = new DateTime();
        return $now->diff($dob)->y;
    }


    function getFallliste($faelle){
        $tmpFallliste = explode("\n", $faelle);
        $fallliste  =  array();
        foreach ($tmpFallliste as $key => $fall) {
            $parts = explode("|", $fall);
            $fallliste[] = array("nr"=>$parts[0],"typ"=>$parts[2],);
        }
        return $fallliste;
    }

    public function makeDateFromString($str, $format = false){
        if($format == false){
            $format = "d.m.Y";
        }
        $datum = date($format, strtotime($str));
        if($datum == "01.01.1970"){
            $datum = "unbekannt";
        }
        return $datum;
    }

    public function getBMI($weight, $height){
        return number_format(round($weight/($height*$height),1),1,".","'");
    }
}

function makeDateFromString($str, $format = false){
    if($format == false){
        $format = "d.m.Y";
    }
    $datum = date($format, strtotime($str));
    if($datum == "01.01.1970"){
        $datum = "unbekannt";
    }

    $search  = array('Mon ', 'Tue ', 'Wed ', 'Thu ', 'Fri ', 'Sat ', 'Sun ' );
    $replace = array('Mo ', 'Di ', 'Mi ', 'Do ', 'Fr ', 'Sa ', 'So ');  

    $datum = str_replace($search, $replace, $datum);



    return $datum;
}

function stripDouble($text){
        $re = '/\s(\w+\s)\1/i';
        $subst = ' $1';

        $result = preg_replace($re, $subst, $text, 1);
        return $result;
    }



function buildK6Spektree($items){
    $markup = '<div class="grid-20n  gg0-10">';
    foreach($items as $key => $item):
        if(isset($item['sub'])){
            $lastUniqueId = getUniqueId();
            $markup .= '<div data-toggle="collapse" data-target="#collapse'. $lastUniqueId.'"><i class="icons icons8-chevron-right"></i></div>';
            $markup .= '<div>' ;
            $markup .= '<span  data-toggle="collapse" data-target="#collapse'. $lastUniqueId.'">'. $item['label'].'</span>' ;
            


            $markup .= '<div id="collapse'.$lastUniqueId.'" class="collapse">';
            $markup .= '<div class="micropadding"></div>';

            $markup .= buildK6Spektree($item['sub']);
            $markup .= '</div>';
        } else {
            $label = substr($item['typ'],0,1);
            $vorschau = "";
            switch($label){
                case 'p':

                    $html = "<b>Konsultation</b><br>";
                    $html .= "00.0010 Erste 5 Minuten<br>";
                    $html .= "00.0020 Weitere 5 Minuten<br>";
                    $html .= "00.0030 Letzte 5 Minuten<br>";
                    $vorschau = 'data-trigger="hover" data-placement="top" data-html="true" data-toggle="popover" title="Paket enthält" data-content="'.$html.'"';
                    $tmpInclude = "dummyleistungsgruppe";
                    break;
                case 'l':
                    $tmpInclude = "dummyeinzelleistung";

                    break;
            }


            $markup .= '<div></div>';
            $markup .= '<div>'. $item['label'] ;
        }
        $markup .= '</div>';
    endforeach;
    $markup .= '</div>';

    return $markup;
}

function buildSpektree($items){
    $markup = '<div class="grid-20n  gg0-10">';
    foreach($items as $key => $item):
        if(isset($item['sub'])){
            $lastUniqueId = getUniqueId();
            $markup .= '<div data-toggle="collapse" data-target="#collapse'. $lastUniqueId.'"><i class="icons icons8-chevron-down"></i></div>';
            $markup .= '<div>' ;
            $markup .= '<span  data-toggle="collapse" data-target="#collapse'. $lastUniqueId.'">'. $item['label'].'</span>' ;
            


            $markup .= '<div id="collapse'.$lastUniqueId.'" class="collapse">';
            $markup .= '<div class="micropadding"></div>';

            $markup .= buildSpektree($item['sub']);
            $markup .= '</div>';
        } else {
            $label = substr($item['typ'],0,1);
            $vorschau = "";
            switch($label){
                case 'p':

                    $html = "<b>Konsultation</b><br>";
                    $html .= "00.0010 Erste 5 Minuten<br>";
                    $html .= "00.0020 Weitere 5 Minuten<br>";
                    $html .= "00.0030 Letzte 5 Minuten<br>";
                    $vorschau = 'data-trigger="hover" data-placement="top" data-html="true" data-toggle="popover" title="Paket enthält" data-content="'.$html.'"';
                    $tmpInclude = "dummyleistungsgruppe";
                    break;
                case 'l':
                    $tmpInclude = "dummyeinzelleistung";

                    break;
            }


            $markup .= '<div><span class="spektrenlabel-'.$label.'">'.strtoupper($label).'</span></div>';
            $markup .= '<div> <span class="triggerCollapse" '. $vorschau .' data-target="#collapse'. getUniqueId().'">'. $item['label'] . "&nbsp;<i class=\"fa fa-caret-down\"></i></span>";
            
            $markup .= '<div id="collapse'. $GLOBALS['lastUniqueId'].'" class="collapse">';
            ob_start();
                $tmpLabel = $item['label'];
               include("./snippets/lerf-".$tmpInclude.".php");
               $markup .= ob_get_contents();
               ob_end_clean();
            $markup .= '</div>';
        }
        $markup .= '</div>';
    endforeach;
    $markup .= '</div>';

    return $markup;
}

function getContrastColor($hexColor) {
  $r = hexdec(substr($hexColor, 0, 2));
  $g = hexdec(substr($hexColor, 2, 2));
  $b = hexdec(substr($hexColor, 4, 2));

  $luminance = (0.2126 * $r + 0.7152 * $g + 0.0722 * $b) / 255;

  if ($luminance > 0.5) {
    return "black";
  } else {
    return "white";
  }
}



 //include(__DIR__."/data.php");