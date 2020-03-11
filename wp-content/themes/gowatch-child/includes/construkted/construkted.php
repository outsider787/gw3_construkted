<?php
require_once __DIR__ . '/asset-view.php';
require_once __DIR__ . '/side-bar.php';

function enqueue_construkted_scripts(){
    $script_dir = $script_dir = '/wp-content/themes/gowatch-child/includes/construkted/assets/js/';

    wp_enqueue_script('cesium-ion-sdk-plugin-script',  $script_dir . 'cesium-ion-sdk-plugin.js', array('jquery', 'cesiumjs'), CS_LIB_VER, true);
    wp_enqueue_script('cs-camera-controller-script',  $script_dir . 'cs-camera-controller.js', array('jquery', 'cesiumjs'), CS_LIB_VER, true);
    wp_enqueue_script('side-bar-script',  $script_dir . 'side-bar.js', array('jquery'), CS_LIB_VER, true);

    // frontend starting point
    wp_register_script('construkted-script', $script_dir . 'construkted.js',
        array('jquery',
            'cesiumjs',
            'cesium-ion-sdk-plugin-script',
            'cs-camera-controller-script'
        ), CS_LIB_VER, true);

    wp_enqueue_script('construkted-script');

    global $post;

    $post_id = $post->ID;

    $post_slug = get_post_field( 'post_name', $post_id );
    $default_camera_position_direction = get_post_meta( $post_id, 'default_camera_position_direction', true);
    $tileset_model_matrix_json = get_post_meta( $post_id, 'asset_geo-location', true);

    // pass parameter to starting script: construkted-scrip.js

    wp_localize_script( 'construkted-script', 'CONSTRUKTED_AJAX',
        array(
            'cesium_access_token' => CONSTRUKTED_CESIUM_ACCESS_TOKEN,
            'ajaxurl' => admin_url( 'admin-ajax.php' ),
            'post_id' => $post_id,
            'post_slug' => $post_slug,
            'default_camera_position_direction' => $default_camera_position_direction,
            'tile_server_url' => CONSTRUKTED_3D_TILE_SERVER_URL,
            'asset_geo-location' => $tileset_model_matrix_json
        )
    );
}
