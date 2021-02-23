<?php
require_once __DIR__ . '/asset-view.php';
require_once __DIR__ . '/side-bar.php';

abstract class ConstruktedAjaxType
{
    const AssetExplorer = "AssetExplorer";
    const AssetViewer = "AssetViewer";
    const Admin = "";
}

function enqueue_construkted_scripts($ajaxType){
    $script_dir = get_stylesheet_directory_uri() . '/includes/construkted/assets/js/';

    // frontend starting point
    wp_register_script('construkted-script', $script_dir . 'construkted.js',
        array('jquery',
            'cesiumjs',
        ), CS_LIB_VER, true);

    wp_enqueue_script('construkted-script');

    global $post;

    $post_id = $post->ID;

    $post_slug = get_post_field( 'post_name', $post_id );
    $default_camera_position_direction = get_post_meta( $post_id, 'default_camera_position_direction', true);
    $asset_geo_location_json = get_post_meta( $post_id, 'asset_geo-location', true);

    $bg_color_css_string = get_post_meta( $post_id, 'bg_color', true);

    // pass parameter to starting script: construkted-scrip.js

    error_log('saved asset_geo_location :' . $asset_geo_location_json);

    // Get Cesium Settings from the admin panel
    $cesium_options = get_option( 'cesium_options' );

    if($ajaxType == ConstruktedAjaxType::AssetExplorer){
        $args = array(
            'post_type'   => 'video',
            'post_status' => 'publish',
            'posts_per_page' => -1,
            'meta_query' => array(
                array(
                    'key' => 'view_access',
                    'value' => 'public'
                )
            )
        );

        $query = new WP_Query($args);

        $data = array();

        if ( $query->have_posts() ) {
            while ( $query->have_posts() ) {
                $query->the_post();
                $location = get_post_meta( get_the_ID(), 'asset_geo-location', true );
                $data[] = array('post_title' => get_the_title(), 'post_slug' => get_post_field( 'post_name', get_the_ID() ), 'asset_geo_location' => $location);
            }
        }

        wp_localize_script( 'construkted-script', 'CONSTRUKTED_AJAX',
            array(
                'ajax_type' => $ajaxType,
                'cesium_access_token' => $cesium_options['construkted-cesium-access-token'],
                'ajaxurl' => admin_url( 'admin-ajax.php' ),
                'assets' => $data
            )
        );
    }
    else{
        wp_localize_script( 'construkted-script', 'CONSTRUKTED_AJAX',
            array(
                'ajax_type' => $ajaxType,
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
}