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
$btns['update_thumbnail']=[
  'desc'=>'Update thumbnail from current display',
  'label'=>'Update thumbnail',
];
$btns['set_default_view']=[
  'desc'=>'Set default camera view to current view',
  'label'=>'Set default view',
];
$btns['reset_camera_view']=[
  'desc'=>'Use if dispaly is not showing in the asset',
  'label'=>'Reset camera view',
];
?><?php 
  $id='display_performance';
  extract($sliders[$id]);
  include dirname(__DIR__). '/field/slider.php';
?>
<?php 
foreach ($btns as $id => $btn){
  extract($btn);
  include dirname(__DIR__) . '/field/button.php';
}
?>
<?php 
  $id='fpv_speed';
  extract($sliders[$id]);
  include dirname(__DIR__) . '/field/slider.php';
?>