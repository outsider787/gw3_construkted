<?php
require_once __DIR__ . '/asset-view.php';
require_once __DIR__ . '/side-bar.php';

function enqueue_construkted_scripts(){
    $script_dir = get_stylesheet_directory_uri() . '/includes/construkted/assets/js/';

    wp_enqueue_script('cesium-ion-sdk-plugin-script',  $script_dir . 'cesium-ion-sdk-plugin.js', array('jquery', 'cesiumjs'), CS_LIB_VER, true);
    wp_enqueue_script('cs-camera-controller-script',  $script_dir . 'cs-camera-controller.js', array('jquery', 'cesiumjs'), CS_LIB_VER, true);
    wp_enqueue_script('construkted-xr-dependencies-script',  $script_dir . 'construkted-xr-dependencies.js', array('jquery', 'cesiumjs'), CS_LIB_VER, true);

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
    $asset_geo_location_json = get_post_meta( $post_id, 'asset_geo-location', true);

    $bg_color_css_string = get_post_meta( $post_id, 'bg_color', true);

    // for test
    $bg_color_css_string = "#FFF8DC";

    // pass parameter to starting script: construkted-scrip.js

    error_log('saved asset_geo_location :' . $asset_geo_location_json);

    // Get Cesium Settings from the admin panel
    $cesium_options = get_option( 'cesium_options' );

    wp_localize_script( 'construkted-script', 'CONSTRUKTED_AJAX',
        array(
            'cesium_access_token' => $cesium_options['construkted-cesium-access-token'],
            'ajaxurl' => admin_url( 'admin-ajax.php' ),
            'post_id' => $post_id,
            'post_slug' => $post_slug,
            'default_camera_position_direction' => $default_camera_position_direction,
            'asset_geo_location' => $asset_geo_location_json,
            'is_owner' => $post->post_author == get_current_user_id(),
            'bg_color_css_string' => $bg_color_css_string
        )
    );
}