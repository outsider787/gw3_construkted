<?php

// byte
function getTotalUploadedFileSizeOfCurrentUser() {
    global $current_user;

    $args = array(
        'author'        =>  $current_user->ID,
        'post_status' => 'any',
        'post_type' => 'video',
        'orderby'       =>  'post_date',
        'order'         =>  'ASC',
        'posts_per_page' => -1 // no limit
    );

    $current_user_posts = get_posts( $args );

    $total = 0;

    foreach ($current_user_posts as $post) {
        $post_id = $post->ID;

        $uploaded_file_size = get_post_meta( $post_id, 'uploaded_file_size', true);

        if($uploaded_file_size == '')
            continue;

        $total += (float)$uploaded_file_size;
    }

    return $total;

}

// GB format
function getTotalUploadedFileGBSizeOfCurrentUser() {
    $total = getTotalUploadedFileSizeOfCurrentUser();

    $total = $total / (1024*1024*1024) ;

    return number_format($total, 2);
}

// return value will have the GB format

function getDiskQuotaOfCurrentUser() {
    $current_user = wp_get_current_user();

    if ( $current_user->ID == 0) {
        return 0;
    }

    // get user orders (COMPLETED + PROCESSING)
    $customer_orders = get_posts( array(
        'numberposts' => -1,
        'meta_key'    => '_customer_user',
        'meta_value'  => $current_user->ID,
        'post_type'   => wc_get_order_types(),
        'post_status' => array_keys( wc_get_is_paid_statuses() ),
    ) );

    // LOOP THROUGH ORDERS AND GET PRODUCT IDS
    if ( ! $customer_orders )
        return DEFAULT_DISK_QUOTA;

    $product_ids = array();

    foreach ( $customer_orders as $customer_order ) {
        $order = wc_get_order( $customer_order->ID );
        $items = $order->get_items();

        foreach ( $items as $item ) {
            $product_id = $item->get_product_id();
            $product_ids[] = $product_id;
        }
    }

    $product_ids = array_unique( $product_ids );

    for ($i = 0; $i < count($product_ids); $i++) {
        $product = wc_get_product($product_ids[$i]);

        $sku = $product->get_sku();

        if (strpos($sku, 'disk_quota;') === false) {
            continue;
        }

        $pieces = explode(";", $sku);

        if(count($pieces) < 2)
            continue;

        $disk_quota = $pieces[1];

        return intval($disk_quota);
    }

    return DEFAULT_DISK_QUOTA;
}

function try_render_embed_cesium_viewer() {
    if( is_admin() )
        return;

    $current_url = esc_url( home_url( add_query_arg( NULL, NULL ) ) );

    // .* any string
    // \/ => /
    // \w any word character
    if ( !preg_match( "#^http.*\/embed\/\w{10}#i", $current_url ) )
        return;

    $array_slug = explode( '/', $current_url );
    $post_slug = end( $array_slug );

    if(strlen($post_slug) > 10)
        $post_slug = substr($post_slug, 0, 10);

    $args = array(
        'name'        => $post_slug,
        'post_type'   => 'video',
        'post_status' => 'publish',
        'numberposts' => 1
    );

    $posts = get_posts($args);

    if(!$posts) {
        echo 'failed to find post : ' . $post_slug;
        exit;
    }

    $post = $posts[0];

    $server_url = home_url();

    echo '
        <style>
            html, body, #cesiumContainer {
                width: 100%; height: 100%; margin: 0; padding: 0; overflow: hidden;
            }
        </style>
        ';

    echo '<link rel="stylesheet" href="https://cesiumjs.org/releases/' . CESIUMJS_VER . '/Build/Cesium/Widgets/widgets.css" type="text/css">';
    echo '<link rel="stylesheet" href="' . $server_url. '/wp-content/themes/gowatch-child/css/construkted.css" type="text/css">';
    echo '<script type="text/javascript" src="' . $server_url . '/wp-includes/js/jquery/jquery.js"></script>';
    echo '<script type="text/javascript" src="https://cesiumjs.org/releases/' . CESIUMJS_VER . '/Build/Cesium/Cesium.js"></script>';
    echo '<script type="text/javascript" src="' . $server_url . '/wp-content/themes/gowatch-child/js/cesium-ion-sdk-plugin.js"></script>';
    echo '<script type="text/javascript" src="' . $server_url . '/wp-content/themes/gowatch-child/js/cs-camera-controller.js"></script>';

    // prepare javascript parameters
    echo '<script>';
    echo 'var CONSTRUKTED_AJAX = {};';
    echo 'CONSTRUKTED_AJAX.tile_server_url ="' . CONSTRUKTED_3D_TILE_SERVER_URL . '";';
    echo 'CONSTRUKTED_AJAX.post_slug ="' . $post_slug . '";';

    $default_camera_position_direction = get_post_meta( $post->ID, 'default_camera_position_direction', true);

    if($default_camera_position_direction != '')
        echo "CONSTRUKTED_AJAX.default_camera_position_direction = '" . $default_camera_position_direction . "';";

    echo '</script>';

    echo '<script type="text/javascript" src="' . $server_url . '/wp-content/themes/gowatch-child/js/construkted.js"></script>';

    echo '<div id="cesiumContainer"></div>';
    echo '<div id="toolbar"><button id="exitFPVModeButton" style="display: none" class="cesium-button">EXIT FPV MODE</button></div>';

    exit;
}

add_action('init', 'try_render_embed_cesium_viewer');

if ( !function_exists( 'construkted_single_sharing' ) ) {

    function construkted_single_sharing( $options = array() ) {

        if ( 'n' !== airkit_single_option( 'sharing' ) && is_singular() && ! is_page() || is_page() && 'n' !== airkit_single_option( 'page_sharing' ) ) {

            echo construkted_PostMeta::sharing( get_the_ID(), $options );

        }

    }

}


/**
 * Code to include tags in the website search
 */
function custom_search_where($where){
  global $wpdb;
  if (is_search())
    $where .= "OR (t.name LIKE '%" . get_search_query() . "%' AND {$wpdb->posts}.post_status = 'publish')";
  return $where;
}

function custom_search_join($join){
  global $wpdb;
  if ( is_search() )
    $join .= "LEFT JOIN {$wpdb->term_relationships} tr ON {$wpdb->posts}.ID = tr.object_id INNER JOIN {$wpdb->term_taxonomy} tt ON tt.term_taxonomy_id=tr.term_taxonomy_id INNER JOIN {$wpdb->terms} t ON t.term_id = tt.term_id";
  return $join;
}

function custom_search_groupby($groupby){
  global $wpdb;

  // we need to group on post ID
  $groupby_id = "{$wpdb->posts}.ID";
  if( !is_search() || strpos($groupby, $groupby_id) !== false ) return $groupby;

  // groupby was empty, use ours
  if( !strlen(trim($groupby)) ) return $groupby_id;

  // wasn't empty, append ours
  return $groupby.", ".$groupby_id;
}

add_filter('posts_where','custom_search_where');
add_filter('posts_join', 'custom_search_join');
add_filter('posts_groupby', 'custom_search_groupby');



/**
 * Change the default theme allowed extentions
 */

function tszf_allowed_extensions()
{
    $extesions = array(
        'images'  => array('ext' => 'jpg,jpeg,gif,png', 'label' => __('Images', 'gowatch')),
        'video'   => array('ext' => 'mp4,mpeg,mpeg4', 'label' => __('Videos', 'gowatch')),
        'preview' => array('ext' => 'zip,laz', 'label' => __('Previews', 'gowatch')),
    );

    return apply_filters('tszf_allowed_extensions', $extesions);
}


function construkted_modify_search_query( $query ) {
  // Make sure this isn't the admin or is the main query
  if( is_admin() || ! $query->is_main_query() ) {
    return;
  }

  // Make sure this isn't the WooCommerce product search form
  if( isset($_GET['post_type']) && ($_GET['post_type'] == 'product') ) {
    return;
  }

  if( $query->is_search() ) {
    $in_search_post_types = get_post_types( array( 'exclude_from_search' => false ) );

    // The post types you're removing (example: 'product' and 'page')
    $post_types_to_remove = array( 'product' );

    foreach( $post_types_to_remove as $post_type_to_remove ) {
      if( is_array( $in_search_post_types ) && in_array( $post_type_to_remove, $in_search_post_types ) ) {
        unset( $in_search_post_types[ $post_type_to_remove ] );
        $query->set( 'post_type', $in_search_post_types );
      }
    }
  }

}
add_action( 'pre_get_posts', 'construkted_modify_search_query' );