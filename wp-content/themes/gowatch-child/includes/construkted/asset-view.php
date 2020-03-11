<?php

function enqueue_styles_for_asset_view(){
    // add cesiumjs cdn js and css

    wp_enqueue_style( 'cesiumjs-style',  'https://cesiumjs.org/releases/' . CESIUMJS_VER . '/Build/Cesium/Widgets/widgets.css', array(), CESIUMJS_VER );
    wp_enqueue_script('cesiumjs', 'https://cesiumjs.org/releases/' . CESIUMJS_VER .'/Build/Cesium/Cesium.js', array('jquery'), CESIUMJS_VER, true);

    $css_dir = $script_dir = '/wp-content/themes/gowatch-child/includes/construkted/assets/css/';

    wp_enqueue_style(
        'construkted-css', $css_dir . 'construkted.css'
    );
}

function render_construkted_cesium_viewer() {
    echo '<div id="cesiumContainer"></div>';
    echo '<div id="toolbar" ><button id="exitFPVModeButton" style="display: none" class="cesium-button">EXIT FPV MODE</button></div>';

    global $post;

    if($post->post_author == get_current_user_id()) {
        echo '<button id="capture_thumbnail" class="cesium-button">Capture Thumbnail</button>';
        echo '<button id="save_current_view" class="cesium-button">Save Current View</button>';
        echo '<button id="reset_camera_view" class="cesium-button">Reset Camera View</button>';
    }

    enqueue_styles_for_asset_view();
}