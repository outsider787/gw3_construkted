<?php
$btns['distance'] = [
    'desc' => '',
    'label' => 'Distance',
];

$btns['polyline'] = [
    'desc' => '',
    'label' => 'Polyline',
];

$btns['area'] = [
    'desc' => '',
    'label' => 'Area',
];

$btns['point'] = [
    'desc' => '',
    'label' => 'Point',
];

?>
<?php
foreach ($btns as $id => $btn) {
    extract($btn);
    include dirname(__DIR__) . '/field/button.php';
}
?>

<?php
$checkes['display'] = [
    'checked' => 'yes',
    'label' => 'Display'
];
$checkes['polyline'] = [
    'checked' => 'yes',
    'label' => 'Polyline'
];
$checkes['area'] = [
    'checked' => 'yes',
    'label' => 'Area'
];
?>
<?php
foreach ($checkes as $id => $check) {
    extract($check);
    include dirname(__DIR__) . '/field/checkbox.php';
}
?>

