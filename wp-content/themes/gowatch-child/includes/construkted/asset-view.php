<?php

function enqueue_styles_for_asset_view(){
    // add cesiumjs cdn js and css

    wp_enqueue_style( 'cesiumjs-style',  'https://cesiumjs.org/releases/' . CESIUMJS_VER . '/Build/Cesium/Widgets/widgets.css', array(), CESIUMJS_VER );
    wp_enqueue_script('cesiumjs', 'https://cesiumjs.org/releases/' . CESIUMJS_VER .'/Build/Cesium/Cesium.js', array('jquery'), CESIUMJS_VER, true);

    //$css_dir = $script_dir = '/wp-content/themes/gowatch-child/includes/construkted/assets/css/';
}

function render_construkted_cesium_viewer() {
    echo '<div id="cesiumContainer"></div>';
    // echo '<div id="toolbar">';
    // echo ' </br> ';
    // echo '<button id="moveLeftButton" style="display: none" class="cesium-button">MOVE LEFT</button> </br>';
    // echo '<button id="moveRightButton" style="display: none" class="cesium-button">MOVE RIGHT</button> </br>';
    // echo '<button id="moveFrontButton" style="display: none" class="cesium-button">MOVE FRONT</button> </br>';
    // echo '<button id="moveBackButton" style="display: none" class="cesium-button">MOVE BACK</button> </br>';
    // echo '</div>';


    enqueue_styles_for_asset_view();
}