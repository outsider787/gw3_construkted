<?php 
$checkes['asset']=[
  'checked'=>'yes',
  'label'=>'Asset that is displayed'
];
$checkes['terrian_data']=[
  'checked'=>'yes',
  'label'=>'Terrian data(Cesium World)'
];
$checkes['map_data']=[
  'checked'=>'yes',
  'label'=>'Map data(Bing Maps)'
];

?>
<?php 
foreach ($checkes as $id => $check){
  extract($check);
  include dirname(__DIR__) . '/field/checkbox.php';
}
?>
