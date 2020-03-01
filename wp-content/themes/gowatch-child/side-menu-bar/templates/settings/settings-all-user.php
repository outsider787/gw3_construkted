<?php 
$sliders['display_performance']=[
  'label'=>'Display performance',
  'label_min'=>'Performance',
  'label_max'=>'Quality',
];
$sliders['fpv_speed']=[
  'label'=>'FPV movement speed',
  'label_min'=>'Slow',
  'label_max'=>'Fast',
];
?>
<?php 
foreach ($sliders as $id => $sld){
  extract($sld);
  include dirname(__DIR__) . '/field/slider.php';
}
?>