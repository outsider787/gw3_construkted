<?php 
global $post;
function gw3_hook_side_menu_bar_user_state($state,$post)
{
    $state='creator';//all-user, creator
    //write your code here to decide it's creator or all-user
    return $state;
}
add_filter('side_menu_bar_user_state','gw3_hook_side_menu_bar_user_state',10,2);

$state='all-user';//all-user, creator
$state = apply_filters( 'side_menu_bar_user_state',$state, $post );

$menu_bar_root=get_stylesheet_directory_uri() . '/side-menu-bar/';
$assets_root=$menu_bar_root . 'assets/';
$icons_root=$menu_bar_root . 'assets/icons/';
$loadscript_root=$menu_bar_root . 'templates/';
$popup_top='0px';

$items['layers']=[
    'title'=>'Layers',
    'tooltip'=>'Layers of hover tips',
    'icon'=>'layers.png',
    'icon_hl'=>'layers_hl.png',
    'width'=>'300px',
    'height'=>'400px',
    'top'=>$popup_top,
    'loadscript'=>'layers/layers-'. $state .'.php',
    'disabled'=>'',// disabled
];
$items['geo']=[
    'title'=>'Geo-Location',
    'tooltip'=>'Geo-Location of hover tips',
    'icon'=>'geo.png',
    'icon_hl'=>'geo_hl.png',
    'width'=>'300px',
    'height'=>'400px',
    'top'=>$popup_top,
    'loadscript'=>'geo/geo-'. $state .'.php',
    'disabled'=>'',// disabled
];
$items['measurements']=[
    'title'=>'Measurements',
    'tooltip'=>'Measurements of hover tips',
    'icon'=>'measurements.png',
    'icon_hl'=>'measurements_hl.png',
    'width'=>'300px',
    'height'=>'400px',
    'top'=>$popup_top,
    'loadscript'=>'measurements/measurements-'. $state .'.php',
    'disabled'=>'',// disabled
];
$items['settings']=[
    'title'=>'Settings',
    'tooltip'=>'Settings of hover tips',
    'icon'=>'settings.png',
    'icon_hl'=>'settings_hl.png',
    'width'=>'300px',
    'height'=>'400px',
    'top'=>$popup_top,
    'loadscript'=>'settings/settings-'. $state .'.php',
    'disabled'=>'',// disabled
];
?>
<?php 
  require_once __DIR__ . '/templates/side-menu-bar.php';
?>
