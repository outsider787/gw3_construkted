<?php 
$textes['latitude']=[
  'label'=>'Latitude:',
  'value'=>'',
  'readonly'=>'yes',
  'placeholder'=>'75.12345678',
];
$textes['longitude']=[
  'label'=>'Longitude:',
  'value'=>'75.12345678',
  'readonly'=>'yes',
  'placeholder'=>'75.12345678',
];
$textes['altitude']=[
  'label'=>'Altitude:',
  'value'=>'1534.56',
  'readonly'=>'yes',
  'placeholder'=>'1423.24',
];
?>
<?php 
foreach ($textes as $id => $txt){
  extract($txt);
  include dirname(__DIR__) . '/field/text.php';
}
?>
