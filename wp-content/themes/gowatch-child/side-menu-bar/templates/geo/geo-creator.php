<?php 
$btns['edit']=[
  'desc'=>'',
  'label'=>'Edit',
];

$btns['save']=[
  'desc'=>'',
  'label'=>'Save',
];
?>
<?php 
$textes['latitude']=[
  'label'=>'Latitude:',
  'value'=>'',
  'readonly'=>'',
  'placeholder'=>'75.12345678',
];
$textes['longitude']=[
  'label'=>'Longitude:',
  'value'=>'75.12345678',
  'readonly'=>'',
  'placeholder'=>'75.12345678',
];
$textes['altitude']=[
  'label'=>'Altitude:',
  'value'=>'1534.56',
  'readonly'=>'',
  'placeholder'=>'1423.24',
];
?>
<div>Adjust the position of the asset.</div>
<?php 
  $id='edit';
  extract($btns[$id]);
  include dirname(__DIR__) . '/field/button.php';
?>
<?php 
foreach ($textes as $id => $txt){
  extract($txt);
  include dirname(__DIR__) . '/field/text.php';
}
?>
<?php 
  $id='save';
  extract($btns[$id]);
  include dirname(__DIR__) . '/field/button.php';
?>
