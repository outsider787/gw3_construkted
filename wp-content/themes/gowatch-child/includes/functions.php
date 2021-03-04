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

    $user_quota = DEFAULT_DISK_QUOTA;

    // Get current user subscriptions
    $subscriptions = wcs_get_users_subscriptions($current_user->ID);
    foreach ($subscriptions as $key => $item) {
        if( $item->status == 'active' ){
            $subscription = wc_get_order($item->ID);
            $order_items = $subscription->get_items();
            foreach ($order_items as $k => $v) {
                $item_disk_space = $v->get_meta('disk_space');

                if( $user_quota < $item_disk_space ) {
                    $user_quota = $item_disk_space;
                }

            }
        }
    }

    return $user_quota;

    // // get user orders (COMPLETED + PROCESSING)
    // $customer_orders = get_posts( array(
    //     'numberposts' => -1,
    //     'meta_key'    => '_customer_user',
    //     'meta_value'  => $current_user->ID,
    //     'post_type'   => wc_get_order_types(),
    //     'post_status' => array_keys( wc_get_is_paid_statuses() ),
    // ) );

    // // LOOP THROUGH ORDERS AND GET PRODUCT IDS
    // if ( ! $customer_orders )
    //     return DEFAULT_DISK_QUOTA;

    // $product_ids = array();

    // foreach ( $customer_orders as $customer_order ) {
    //     $order = wc_get_order( $customer_order->ID );
    //     $items = $order->get_items();

    //     foreach ( $items as $item ) {
    //         $product_id = $item->get_product_id();
    //         $product_ids[] = $product_id;
    //     }
    // }

    // $product_ids = array_unique( $product_ids );

    // for ($i = 0; $i < count($product_ids); $i++) {
    //     $product = wc_get_product($product_ids[$i]);

    //     $sku = $product->get_sku();

    //     if (strpos($sku, 'disk_quota;') === false) {
    //         continue;
    //     }

    //     $pieces = explode(";", $sku);

    //     if(count($pieces) < 2)
    //         continue;

    //     $disk_quota = $pieces[1];

    //     return intval($disk_quota);
    // }

    return ;
}

function has_active_subscription( $user_id='' ) {
    // When a $user_id is not specified, get the current user Id
    if( '' == $user_id && is_user_logged_in() ) 
        $user_id = get_current_user_id();
    // User not logged in we return false
    if( $user_id == 0 ) 
        return false;

    return wcs_user_has_subscription( $user_id, '', 'active' );
}

/**
 * this function will be invoked from all page.
 *
 * example embed url: https://gw3.construkted.com/embed/ages9v7tfzu
 *
 * note that the url should not be trailed with slash.
 *
 * the length of the post slug can be 10 or 11
 */

function try_render_embed_cesium_viewer() {
    if( is_admin() )
        return;

    $current_url = esc_url( home_url( add_query_arg( NULL, NULL ) ) );

    /*
     .* any string
     \/ => /
     \w any word character
    */

    if ( !preg_match( "#^http.*\/embed\/\w{10}#i", $current_url ) ) {
        return;
    }

    $array_slug = explode( '/', $current_url );
    $post_slug = end( $array_slug );

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

    $server_url = get_stylesheet_directory_uri();

    $cesium_options = get_option( 'cesium_options' );

    $cesium_access_token = $cesium_options['construkted-cesium-access-token'];

    echo '
        <style>
            html, body, #cesiumContainer {
                width: 100%; height: 100%; margin: 0; padding: 0; overflow: hidden;
            }
            .cesium-viewer-measureContainer {
                display: none !important;
            }
        </style>
        ';

    echo '<link rel="stylesheet" href="https://cesiumjs.org/releases/' . CESIUMJS_VER . '/Build/Cesium/Widgets/widgets.css" type="text/css">' . PHP_EOL;
    echo '<link rel="stylesheet" href="' . $server_url. '/includes/construkted/assets/css/construkted.css" type="text/css">' . PHP_EOL;
    echo '<script type="text/javascript" src="' . get_site_url() . '/wp-includes/js/jquery/jquery.js"></script>' . PHP_EOL;
    echo '<script type="text/javascript" src="'.get_template_directory_uri() . '/js/jquery.cookie.js"></script>' . PHP_EOL;
    echo '<script type="text/javascript" src="https://cesiumjs.org/releases/' . CESIUMJS_VER . '/Build/Cesium/Cesium.js"></script>' . PHP_EOL;

    // prepare javascript parameters
    echo '<script>'  . PHP_EOL;
    echo 'var CONSTRUKTED_AJAX = {};' . PHP_EOL;
    echo 'CONSTRUKTED_AJAX.cesium_access_token = "' . $cesium_access_token . '";' . PHP_EOL;
    echo 'CONSTRUKTED_AJAX.post_slug ="' . $post_slug . '";'  . PHP_EOL;

    $default_camera_position_direction = get_post_meta( $post->ID, 'default_camera_position_direction', true);

    if($default_camera_position_direction != '')
        echo "CONSTRUKTED_AJAX.default_camera_position_direction = '" . $default_camera_position_direction . "';"  . PHP_EOL;

    $asset_geo_location = get_post_meta( $post->ID, 'asset_geo-location', true);

    if($asset_geo_location != '')
        echo "CONSTRUKTED_AJAX.asset_geo_location = '" . $asset_geo_location . "';"  . PHP_EOL;

    echo '</script>' . PHP_EOL;

    echo '<script type="text/javascript" src="' . $server_url . '/includes/construkted/assets/js/construkted.js"></script>'  . PHP_EOL;

    echo '<div id="cesiumContainer"></div>'  . PHP_EOL;
    echo '<div id="toolbar"><button id="exitFPVModeButton" style="display: none" class="cesium-button">EXIT FPV MODE</button></div>'  . PHP_EOL;
    echo '<canvas id="xr-canvas"></canvas>';

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
function construkted_search_where($where){
  global $wpdb;
  if (is_search())
    $where .= "OR (t.name LIKE '%" . get_search_query() . "%' AND {$wpdb->posts}.post_status = 'publish' AND {$wpdb->posts}.post_type != 'product')";
  return $where;
}

function construkted_search_join($join){
  global $wpdb;
  if ( is_search() )
    $join .= "LEFT JOIN {$wpdb->term_relationships} tr ON {$wpdb->posts}.ID = tr.object_id INNER JOIN {$wpdb->term_taxonomy} tt ON tt.term_taxonomy_id=tr.term_taxonomy_id INNER JOIN {$wpdb->terms} t ON t.term_id = tt.term_id";
  return $join;
}

function construkted_search_groupby($groupby){
  global $wpdb;

  // we need to group on post ID
  $groupby_id = "{$wpdb->posts}.ID";
  if( !is_search() || strpos($groupby, $groupby_id) !== false ) return $groupby;

  // groupby was empty, use ours
  if( !strlen(trim($groupby)) ) return $groupby_id;

  // wasn't empty, append ours
  return $groupby.", ".$groupby_id;
}

add_filter('posts_where','construkted_search_where');
add_filter('posts_join', 'construkted_search_join');
add_filter('posts_groupby', 'construkted_search_groupby');



/**
 * Change the default theme allowed extentions
 */

function tszf_allowed_extensions()
{
    $extesions = array(
        'images'  => array('ext' => 'jpg,jpeg,gif,png', 'label' => __('Images', 'gowatch')),
        'video'   => array('ext' => 'mp4,mpeg,mpeg4', 'label' => __('Videos', 'gowatch')),
        'compressed_mesh' => array('ext' => 'zip,rar,7z', 'label' => __('Compressed Mesh', 'gowatch')),
        'point_clouds' => array('ext' => 'las,laz', 'label' => __('Point Clouds', 'gowatch')),
    );

    return apply_filters('tszf_allowed_extensions', $extesions);
}

add_action( 'init', 'construkted_remove_products_from_search', 99 );

function construkted_remove_products_from_search() {
    global $wp_post_types;

    if ( post_type_exists( 'product' ) ) {

        // exclude from search results
        $wp_post_types['product']->exclude_from_search = true;
    }
}

/**
 * Function to overwrite the view featured image from base theme
 */

function airkit_featured_image( $options = array(), $exclude = array() )
{
    global $post;
    $output = '';

    // Only for single page
    if ( isset($options['is-single']) && $options['is-single'] ) {
        
        // Options
        $options['show-img']        = airkit_single_option( 'img' );
        $options['thumbnail-url']   = wp_get_attachment_url(get_post_thumbnail_id($post->ID));
        $video_embed = get_post_meta( $post->ID, 'video_embed', TRUE );
        $video_URL = airkit_extract_iframe_src($video_embed);
        $audio_embed = get_post_meta( $post->ID, 'audio_embed', TRUE );
        $caption_align = 'text-left';

        $post_format = get_post_format( $post->ID ) ? : 'standard';

        $figure_attributes['class'][] = 'featured-image';

        /**
         *
         * HTML for featured image
         *
        */
        
        // Post format: Standard & Image
        if ( 'standard' == $post_format || 'image' == $post_format ) {

            $output .= '<figure '. airkit_element_attributes( $figure_attributes, array(), $post->ID, false ) .'>';
                
                $output .= airkit_PostMeta::post_rating( $post->ID );

                // Start tag for lighbox anchor
                if ( 'y' === airkit_option_value( 'general', 'enable_lightbox' ) ) {
                    $output .= '<a href="' . esc_url( $options['thumbnail-url'] ) . '" data-fancybox="' . $post->ID . '">';
                }

                // Post thumbnail
                $output .= get_the_post_thumbnail( $post->ID, 'gowatch_single');
                // Overlay effect
                $output .= airkit_overlay_effect_type(false);

                // End tag for lightbox anchor
                if ( 'y' === airkit_option_value( 'general', 'enable_lightbox' ) ) {
                    $output .= '</a>';
                }

            $output .= '</figure>';
            
        }

        // Post format: Video
        if ( 'video' == $post_format ) {

            $output .= '<figure '. airkit_element_attributes( $figure_attributes, array(), $post->ID, false ) .'>';
                
                if ( empty($video_URL) ) {

                    $output .= airkit_PostMeta::post_rating( $post->ID );

                    // Start tag for lighbox anchor
                    if ( 'y' === airkit_option_value( 'general', 'enable_lightbox' ) ) {
                        $output .= '<a href="' . esc_url( $options['thumbnail-url'] ) . '" data-fancybox="' . $post->ID . '">';
                    }

                    // Post thumbnail
                    $output .= get_the_post_thumbnail( $post->ID, 'gowatch_single');
                    // Overlay effect
                    $output .= airkit_overlay_effect_type(false);

                    // End tag for lightbox anchor
                    if ( 'y' === airkit_option_value( 'general', 'enable_lightbox' ) ) {
                        $output .= '</a>';
                    }

                } else {
                    $output .= '<div class="embedded_videos">' . apply_filters( 'the_content', $video_embed ) . '</div>';
                }

            $output .= '</figure>';
            
        }

        // Post format: Gallery
        if ( 'gallery' == $post_format ) {

            if ( has_shortcode( $post->post_content, 'gallery' ) ) {
                
                $galleries = get_post_galleries( $post->ID, false );
                $gallery_ids = explode(',', $galleries[0]['ids']);

                $output .= '
                    <div id="post-format-galleryid-'. $post->ID .'" class="airkit_post-gallery format-gallery-carousel carousel-post-gallery">
                        <ul class="carousel-nav">
                            <li class="carousel-nav-left"><i class="icon-left"></i></li>
                            <li class="carousel-nav-right"><i class="icon-right"></i></li>
                        </ul>
                        <div class="gallery-items">';

                $i = 0;

                foreach ( $gallery_ids as $key => $id ) {

                    $attachment = get_post($id);
                    $caption = wptexturize($attachment->post_excerpt);
                    $description = wptexturize($attachment->post_content);
                    $title = get_the_title($id);
                    $image_full = wp_get_attachment_image_src( $id, 'full' );
                    $src_full = esc_attr($image_full[0]);

                    $link = '<a href="'. $src_full .'" title="'. $caption .'" data-fancybox="group">'. wp_get_attachment_image( $id, 'gowatch_single' ) .'</a>';

                    $output .= '<figure class="gallery-item">';
                    $output .= '<div class="gallery-icon">'. $link .'</div>';

                    if ( ( trim($attachment->post_excerpt) || $title ) ) {
                        $output .= '
                            <figcaption class="gallery-caption">
                                <h4 class="title">'. $title .'</h4>
                                '. (!empty($caption) ? '<p class="caption">' . $caption . '</p>' : '') .'
                                '. (!empty($description) ? '<p class="description">'. $description .'</p>' : '') .'
                            </figcaption>';
                    }

                    $output .= '</figure>';

                    $i++;
                }

                $output .= '
                        </div>
                    </div><!-- / post-format-galleryid-'. $post->ID .' -->';

            } else {

                $output .= '<figure '. airkit_element_attributes( $figure_attributes, array(), $post->ID, false ) .'>';
                    
                    $output .= airkit_PostMeta::post_rating( $post->ID );

                    // Start tag for lighbox anchor
                    if ( 'y' === airkit_option_value( 'general', 'enable_lightbox' ) ) {
                        $output .= '<a href="' . esc_url( $options['thumbnail-url'] ) . '" data-fancybox="' . $post->ID . '">';
                    }

                    // Post thumbnail
                    $output .= get_the_post_thumbnail( $post->ID, 'gowatch_single');
                    // Overlay effect
                    $output .= airkit_overlay_effect_type(false);

                    // End tag for lightbox anchor
                    if ( 'y' === airkit_option_value( 'general', 'enable_lightbox' ) ) {
                        $output .= '</a>';
                    }

                $output .= '</figure>';

            }

        }

        // Post format: Audio
        if ( 'audio' == $post_format ) {

            $output .= '<figure '. airkit_element_attributes( $figure_attributes, array(), $post->ID, false ) .'>';
                
                if ( empty( $audio_embed ) ) {
                    
                    $output .= airkit_PostMeta::post_rating( $post->ID );

                    // Start tag for lighbox anchor
                    if ( 'y' === airkit_option_value( 'general', 'enable_lightbox' ) ) {
                        $output .= '<a href="' . esc_url( $options['thumbnail-url'] ) . '" data-fancybox="' . $post->ID . '">';
                    }

                    // Post thumbnail
                    $output .= get_the_post_thumbnail( $post->ID, 'gowatch_single');
                    // Overlay effect
                    $output .= airkit_overlay_effect_type(false);

                    // End tag for lightbox anchor
                    if ( 'y' === airkit_option_value( 'general', 'enable_lightbox' ) ) {
                        $output .= '</a>';
                    }

                } else {
                    $output .= '<div class="embedded_audio">' . apply_filters( 'the_content', $audio_embed ) . '</div>';
                }

            $output .= '</figure>';
            
        }


        // Don't show featured image for password protected posts
        if( !post_password_required() ) {

            // If Show featured image from Single options is set to Yes
            // and post has thumbnail
            if ( 'y' === $options['show-img'] && has_post_thumbnail( $post->ID ) ) {

                echo force_balance_tags( $output );

            }

        }

    }

    // Only for view articles
    if ( isset($options['is-view-article']) && $options['is-view-article'] ) {

        // Define variables
        $figure_attributes = array();
        $element_type   = isset( $options['element-type'] ) ? $options['element-type'] : '';
        $title_position = isset( $options['title-position'] ) ? $options['title-position'] : 'below-image';
        $enable_featimg = isset( $options['featimg'] ) ? $options['featimg'] : 'y';
        $image_size     = airkit_Compilator::view_get_image_size( $options );
        $has_feat_img   = 'y' == $enable_featimg && has_post_thumbnail( $post->ID ) ? true : false;
        $allow_post_thumbnail = airkit_Compilator::view_get_allowed_post_thumbnail( $options );
        $ignore_element = array('playlist');

        // for mosaic view
        if ( 'mosaic' == $element_type ) {
            $layout_mosaic  = isset( $options['layout'] ) ? $options['layout'] : 'rectangles';

            if ( 'style-4' !== $layout_mosaic ) {
                $exclude[] = 'hover_style';
            }
        }

        if ( ! in_array($element_type, $ignore_element) && $has_feat_img ) {

            $output .= '
                <figure '. airkit_element_attributes( $figure_attributes, array_merge( $options, array('element' => 'figure') ), $post->ID, false ) . '>'

                    . ( ! in_array('post_format', $exclude) ? airkit_PostMeta::post_format ( $post->ID, array('url' => 'y') ) : '' )
                    . ( 'big' == $element_type ? '<div class="big-holder"></div>' : '' )
                    . ( ! in_array('post_is_featured', $exclude) ? construkted_PostMeta::post_is_featured( $post->ID ) : '' )
                    . ( ! in_array('post_rating', $exclude) ? airkit_PostMeta::post_rating( $post->ID ) : '' )

                    . ( in_array( $element_type, $allow_post_thumbnail ) ? sprintf( '<a href="%s" title="%s">%s</a>', get_the_permalink(), get_the_title(), get_the_post_thumbnail( $post->ID, $image_size ) ) : '')

                    . ( ! in_array('overlay_effect', $exclude) ? airkit_overlay_effect_type(false) : '' )
                    . ( ! in_array('post_link', $exclude ) ? '<a href="'. get_the_permalink() .'" class="post-link"></a>' : '' )
                    . ( ! in_array('hover_style', $exclude) ? airkit_hover_style( $post->ID, $options ) : '' )
                    . ( ! in_array('post_sticky', $exclude) ? airkit_PostMeta::post_is_sticky( $post->ID ) : '' )

                . '</figure>';
            
        }

        // For Playlist view articles
        if ( $element_type == 'playlist' ) {

            // Get posts from playlist
            $post_ids   = get_post_meta( $post->ID, '_post_ids', true );
            $ajax_nonce = wp_create_nonce( 'ajax_airkit_remove_playlist_nonce' );
            $playlist_posts_count = 0;

            if ( is_array($post_ids) ) {
                $playlist_posts_count = count($post_ids);
                // Get ID of last added post in playlist
                $last_post_ID = end($post_ids);
            }

            if ( isset($last_post_ID) ) {
                $redirect_url = add_query_arg( array('playlist_ID' => $post->ID), get_permalink($last_post_ID) );
            } else {
                $redirect_url = '#';
            }

            $output .= '
                <figure '. airkit_element_attributes( $figure_attributes, array_merge( $options, array('element' => 'figure') ), $post->ID, false ) . '>'

                    . ( ! in_array('post_link', $exclude ) ? '<a href="'. esc_url($redirect_url) .'" class="post-link"></a>' : '' )
                    . ( sprintf( '<span class="playlist-blur-img">%s</span>', get_the_post_thumbnail( $post->ID, $image_size ) ) )
                    . ( current_user_can('delete_post', $post->ID) ? sprintf( '<button id="button-remove-playlist-%1$s" class="playlist-remove" title="%2$s" data-playlist-id="%1$s" data-ajax-nonce="%3$s"><i class="icon-delete"></i></button>', $post->ID, esc_html__('Remove playlist', 'gowatch'), $ajax_nonce ) : '' )

                    . '<figcaption>'
                    . '<div class="playlist-caption">'

                        . ( sprintf( '<span class="playlist-count"><i class="icon-list-add"></i> %d</span>', (int)$playlist_posts_count ) )
                        . ( sprintf( '<a class="playlist-thumbnail" href="%s" title="%s">%s</a>', esc_url($redirect_url), get_the_title(), get_the_post_thumbnail( $post->ID, $image_size ) ) )

                    . '</div>'
                    . '</figcaption>'

                . '</figure>';
        }

        echo force_balance_tags( $output );
        
    }

}



/**
 * Function to get the  extra information for the assets
 */

function construkted_asset_info() {

    ob_start();
    ob_clean();

    $post_ID = get_the_ID();

    // Check if item has geolocated information and add the badge on the top-right corner
    $asset_geolocation = get_post_meta($post_ID, 'asset_geo-location', true);

    // Decode the data we have in place
    $asset_geolocation       = json_decode( $asset_geolocation, true );

    $asset_type              = get_post_meta($post_ID, 'asset_type', true);
    $polygon_count           = get_post_meta($post_ID, 'mesh_polygon_count', true);
    $point_cloud_size        = get_post_meta($post_ID, 'point_cloud_size', true);
    $date_capture            = get_post_meta($post_ID, 'date_capture', true);
    $photogrammetry_software = get_post_meta($post_ID, 'photogrammetry_software', true);
    $pointcloud_software     = get_post_meta($post_ID, 'pointcloud_software', true);
    $cad_software            = get_post_meta($post_ID, 'cad_software', true);

    // Process the data from the meta

    $photogrammetry_software = array_map('trim', array_filter(explode('|', $photogrammetry_software)));
    $pointcloud_software = array_map('trim', array_filter(explode('|', $pointcloud_software)));
    $cad_software = array_map('trim', array_filter(explode('|', $cad_software)));

    $processing_software = array_merge($photogrammetry_software ,$cad_software, $pointcloud_software);

    ?>

    <div class="asset-metadata">
        <div class="asset-metadata-inner">
            <h4><?php esc_html_e('Asset metadata', 'gowatch-child'); ?></h4>
            <div class="metadata-list">

                <?php if( !empty($date_capture) ): ?>
                <div class="metadata-item">
                    <strong><?php esc_html_e('Date of capture', 'gowatch-child'); ?></strong>
                    <?php echo esc_html($date_capture); ?>
                </div>
                <?php endif; ?>

                <?php if( !empty($asset_geolocation['latitude']) && !empty($asset_geolocation['longitude']) ): ?>
                    <div class="metadata-item">
                        <strong><?php esc_html_e('Asset location', 'gowatch-child'); ?></strong>
                        <?php esc_html_e('Lat', 'gowatch-child'); ?>: &nbsp;&nbsp;&nbsp;&nbsp;<?php echo number_format($asset_geolocation['latitude'],8); ?><br/>
                        <?php esc_html_e('Long', 'gowatch-child'); ?>: &nbsp;<?php echo number_format($asset_geolocation['longitude'], 8); ?>
                    </div>
                <?php endif; ?>

                <?php if( !empty($asset_type) ): ?>
                    <div class="metadata-item">
                        <strong><?php esc_html_e('Geometry Type', 'gowatch-child'); ?></strong>
                        <?php echo TSZF_Frontend_Form_Post::convert_asset_type_from_gowatch_to_edd6($asset_type); ?>
                    </div>
                <?php endif; ?>

                <?php if( $asset_type == 'polygon-mesh' && !empty($polygon_count) || $asset_type == '3d-cad-model' && !empty($polygon_count) ) : ?>
                    <div class="metadata-item">
                        <strong><?php esc_html_e('Polygon Count', 'gowatch-child'); ?></strong>
                        <?php echo number_format($polygon_count/1000000, 2, '.', ','); esc_html_e(' million', 'gowatch-child');?> 
                    </div>
                <?php endif; ?>

                <?php if( $asset_type == 'point-cloud' && !empty($point_cloud_size) && !empty($point_cloud_size) ) : ?>
                    <div class="metadata-item">
                        <strong><?php esc_html_e('Point Count', 'gowatch-child'); ?></strong>
                        <?php echo number_format($point_cloud_size/1000000, 2, '.', ','); esc_html_e(' million', 'gowatch-child');?>
                    </div>
                <?php endif; ?>

                <?php if( !empty($processing_software) ): ?>
                    <div class="metadata-item">
                        <strong><?php esc_html_e('Processing Software', 'gowatch-child'); ?></strong>
                        <?php
                            echo implode(', ', $processing_software);
                        ?>
                    </div>
                <?php endif; ?>
            </div>
        </div>
    </div>

    <?php

    $output = ob_get_clean();

    return $output;
}

/**
 * Function to retrieve the attachment by the title
 */
if( ! ( function_exists( 'wp_get_attachment_by_post_name' ) ) ) {
    function wp_get_attachment_by_post_name( $title ) {
        $attachment = get_page_by_title($title, OBJECT, 'attachment');

        if ( $attachment ){

            $attachment_url = $attachment->ID;

        }else{
            return false;
        }

        return $attachment_url;
    }
}


/**
 * Function to add specific products in cart and redirect to checkout
 */
function construkted_package_purchase() {

    // Check if the do purchase parameter is in URL and go
    if( !empty($_GET['construkted_do_purchase']) ) {

        $product_id = intval(sanitize_key($_GET['construkted_do_purchase']));

        // Double check if the product ID is integer and product is not in CART
        $product_cart_id = WC()->cart->generate_cart_id( $product_id );
        $in_cart = WC()->cart->find_product_in_cart( $product_cart_id );

        if( is_numeric($product_id) && !$in_cart ) {

            WC()->cart->add_to_cart( $product_id, 1 );

        }
        $location = wc_get_checkout_url();

        wp_redirect( $location, $status = 302 );

        return false;

    } else {
        return false;
    }

}
add_action('wp', 'construkted_package_purchase');

function construkted_subscription_product() {

    $tax_query   = WC()->query->get_tax_query();
    $tax_query[] = array(
        'taxonomy' => 'product_visibility',
        'field'    => 'name',
        'terms'    => 'featured',
        'operator' => 'IN',
        );

    $args = array(
        'post_type'   =>  'product',
        'orderby'     =>  'date',
        'order'       =>  'DESC',
        'tax_query'   =>  $tax_query
    );

    $products = new WP_Query( $args );
    
    if( $products->post_count > 0 ) {
        return $products->posts[0]->ID;
    } else {
        return false;
    }

}

add_filter( 'woocommerce_add_to_cart_redirect', 'construkted_redirect_checkout_add_cart' );
 
function construkted_redirect_checkout_add_cart() {
   return wc_get_checkout_url();
}

add_filter( 'wc_add_to_cart_message_html', 'empty_wc_add_to_cart_message');
function empty_wc_add_to_cart_message( $message ) { 
    return ''; 
}; 

function construkted_change_users_subscription() {

    if ( isset( $_GET['cancel_subscription'] ) && isset( $_GET['subscription_id'] ) && isset( $_GET['_wpnonce'] )  ) {

        $user_id      = get_current_user_id();
        $subscription = wcs_get_subscription( esc_attr($_GET['subscription_id']) );
        $new_status   = esc_attr($_GET['cancel_subscription']);
        $dashboard_url = get_frontend_dashboard_url();
        $billing_url = add_query_arg( 'active_tab', 'subscription', $dashboard_url );

        if ( WCS_User_Change_Status_Handler::validate_request( $user_id, $subscription, $new_status, $_GET['_wpnonce'] ) ) {
            WCS_User_Change_Status_Handler::change_users_subscription( $subscription, $new_status );

            wp_safe_redirect( $billing_url );
            exit;
        }
    }
    if ( isset( $_GET['reactivate_subscription'] ) && isset( $_GET['subscription_id'] ) && isset( $_GET['_wpnonce'] )  ) {

        $user_id      = get_current_user_id();
        $subscription = wcs_get_subscription( esc_attr($_GET['subscription_id']) );
        $new_status   = esc_attr($_GET['reactivate_subscription']);
        $dashboard_url = get_frontend_dashboard_url();
        $billing_url = add_query_arg( 'active_tab', 'subscription', $dashboard_url );

        if ( WCS_User_Change_Status_Handler::validate_request( $user_id, $subscription, $new_status, $_GET['_wpnonce'] ) ) {
            WCS_User_Change_Status_Handler::change_users_subscription( $subscription, $new_status );

            wp_safe_redirect( $billing_url );
            exit;
        }
    }
}

add_action( 'wp_loaded', 'construkted_change_users_subscription', 100);



function construkted_free_tier_on_registration($user_id){
    global $woocommerce;

    $subscription_product = construkted_subscription_product();
    
    // First make sure all required functions and classes exist
    if( ! function_exists( 'wc_create_order' ) || ! function_exists( 'wcs_create_subscription' ) || ! class_exists( 'WC_Subscriptions_Product' ) ){
        return false;
    }

    $order = wc_create_order( array( 'customer_id' => $user_id ) );

    if( is_wp_error( $order ) ){
        return false;
    }
    $parent_product = wc_get_product($subscription_product);

    $attributes = array(
        'attribute_disk_space' => '2',
    );

    $variation_id = $parent_product->get_matching_variation( $attributes );

    $product = wc_get_product($variation_id);

    $user = get_user_by( 'ID', $user_id );

    $fname     = $user->first_name;
    $lname     = $user->last_name;
    $email     = $user->user_email;
    $address_1 = get_user_meta( $user_id, 'billing_address_1', true );
    $address_2 = get_user_meta( $user_id, 'billing_address_2', true );
    $city      = get_user_meta( $user_id, 'billing_city', true );
    $postcode  = get_user_meta( $user_id, 'billing_postcode', true );
    $country   = get_user_meta( $user_id, 'billing_country', true );
    $state     = get_user_meta( $user_id, 'billing_state', true );

    $address         = array(
        'first_name' => $fname,
        'last_name'  => $lname,
        'email'      => $email,
        'address_1'  => $address_1,
        'address_2'  => $address_2,
        'city'       => $city,
        'state'      => $state,
        'postcode'   => $postcode,
        'country'    => $country,
    );

    $order->set_address( $address, 'billing' );
    $order->set_address( $address, 'shipping' );
    $order->add_product( $product, 1 );

    $sub = wcs_create_subscription(array(
        'order_id' => $order->get_id(),
        'status' => 'pending', // Status should be initially set to pending to match how normal checkout process goes
        'billing_period' => WC_Subscriptions_Product::get_period( $product ),
        'billing_interval' => WC_Subscriptions_Product::get_interval( $product )
    ));

    if( is_wp_error( $sub ) ){
        return false;
    }

    // Modeled after WC_Subscriptions_Cart::calculate_subscription_totals()
    $start_date = gmdate( 'Y-m-d H:i:s' );
    // Add product to subscription
    $sub->add_product( $product, 1 );

    $dates = array(
        'trial_end'    => WC_Subscriptions_Product::get_trial_expiration_date( $product, $start_date ),
        'next_payment' => WC_Subscriptions_Product::get_first_renewal_payment_date( $product, $start_date ),
        'end'          => WC_Subscriptions_Product::get_expiration_date( $product, $start_date ),
    );

    $sub->update_dates( $dates );
    $sub->calculate_totals();

    // Update order status with custom note
    $note = ! empty( $note ) ? $note : __( 'Programmatically added order and subscription.' );
    $order->update_status( 'completed', $note, true );
    // Also update subscription status to active from pending (and add note)
    $sub->update_status( 'active', $note, true );

}

add_action('user_register', 'construkted_free_tier_on_registration');


add_action( 'woocommerce_thankyou', 'construkted_redirectcustom');
  
function construkted_redirectcustom( $order_id ){
    $order = wc_get_order( $order_id );
    $dashboard_url = get_frontend_dashboard_url();
    $url = add_query_arg( 'active_tab', 'subscription', $dashboard_url );
    if ( ! $order->has_status( 'failed' ) ) {
        wp_safe_redirect( $url );
        exit;
    }
}



// WooCommerce re-arrange checkout fields
add_filter( 'woocommerce_checkout_fields' , 'custom_rename_wc_checkout_fields' );

// Change classes of the fields for the checkout page to look nice
function custom_rename_wc_checkout_fields( $fields ) {

  $fields['billing']['billing_company']['class'] = array('form-row-first');
  $fields['billing']['billing_country']['class'] = array('form-row-last');
  
  $fields['billing']['billing_address_1']['class'] = array('form-row-first');
  $fields['billing']['billing_address_2']['class'] = array('form-row-last');
  $fields['billing']['billing_address_2']['label'] = esc_attr__( 'Address 2', 'gowatch-child' );

  $fields['billing']['billing_city']['class'] = array('form-row-first');
  $fields['billing']['billing_state']['class'] = array('form-row-last');
  
  $fields['billing']['billing_postcode']['class'] = array('form-row-first');
  $fields['billing']['billing_phone']['class'] = array('form-row-last');

  return $fields;
}

function construkted_subscription_layout() {

    ob_start();
    ob_clean();

    global $product;

    ?>
    <div class="woocommerce subscription-product">
        
        <?php 
            // Check if we are switching subcription
            if( isset($_GET['switch-subscription']) ) {
                $current_package = getDiskQuotaOfCurrentUser(wp_get_current_user()->ID);
            }

            function construkted_package_label($current_value, $package_value) {

                $upgrade_label   = esc_html__('Upgrade', 'gowatch-child');
                $downgrade_label = esc_html__('Downgrade', 'gowatch-child');
                $current_label   = esc_html__('Current', 'gowatch-child');

                if( $current_value < $package_value ) {
                    $output = $upgrade_label;
                } elseif( $current_value > $package_value ) {
                    $output = $downgrade_label;
                } else {
                    $output = $current_label;

                }
                return $output;
            }

            do_action( 'woocommerce_before_single_product' );

        ?>
        <div class="flex-row" data-current="<?php echo $current_package; ?>">
        <?php
            $available_variations = $product->get_available_variations();
            foreach ($available_variations as $key => $value) 
            {
            ?>
                <div class="variation-column">
                    <div class="variation-name"><?php echo $value['sku']; ?></div>
                    <div class="variation-price"><?php echo $value['price_html']; ?></div>
                    <div class="variation-specs"><?php echo $value['variation_description']; ?></div>
                    <div class="variation-action" data-value="<?php echo $value['attributes']['attribute_disk_space'] ?>"><?php echo construkted_package_label($current_package, $value['attributes']['attribute_disk_space']); ?></div>
                </div>
            <?php }
        ?>
        </div>
        <?php woocommerce_template_single_add_to_cart(); ?>
    </div>
    <?php
    $output = ob_get_clean();

    return $output;
}


function construkted_product_shortcode() {

    // Get subscruption product id
    $product_id = construkted_subscription_product();

    global $product, $woocommerce;

    $woocommerce->cart->empty_cart(); 
    $product = wc_get_product($product_id);

    $output = construkted_subscription_layout();

    return $output;

}

add_shortcode( 'subscription_packages', 'construkted_product_shortcode' );




function construkted_asset_modal() {

    $svg_arrow_up = '<svg width="65" height="65" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.45117 5.24982L2.45117 59.2498C2.45117 60.9067 3.79432 62.2498 5.45117 62.2498L59.4512 62.2498C61.108 62.2498 62.4512 60.9067 62.4512 59.2498L62.4512 5.24982C62.4512 3.59297 61.108 2.24982 59.4512 2.24982L5.45117 2.24982C3.79432 2.24982 2.45117 3.59297 2.45117 5.24982Z" stroke="white" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M33.5118 16.7185C32.926 16.0937 31.9763 16.0937 31.3905 16.7185L20.8905 27.9185C20.3047 28.5433 20.3047 29.5564 20.8905 30.1812C21.4763 30.8061 22.426 30.8061 23.0118 30.1812L30.9512 21.7126V46.6499C30.9512 47.5335 31.6227 48.2499 32.4512 48.2499C33.2796 48.2499 33.9512 47.5335 33.9512 46.6499V21.7126L41.8905 30.1812C42.4763 30.8061 43.426 30.8061 44.0118 30.1812C44.5976 29.5564 44.5976 28.5433 44.0118 27.9185L33.5118 16.7185Z" fill="white"/>
</svg>';
    ?>

    <div class="fpv-navigation">
        <div class="fpv-nav-btn fpv-up"><?php echo $svg_arrow_up; ?></div>
        <div class="fpv-nav-btn fpv-left"><?php echo $svg_arrow_up; ?></div>
        <div class="fpv-nav-btn fpv-right"><?php echo $svg_arrow_up; ?></div>
        <div class="fpv-nav-btn fpv-down"><?php echo $svg_arrow_up; ?></div>
    </div>
    <button id="exitFPVModeButton">EXIT FPV MODE</button>


    <div class="fly-navigation hidden">
        <div id="fly-forward" class="fpv-nav-btn fly-forward"><?php echo $svg_arrow_up; ?></div>
        <div id="fly-left" class="fpv-nav-btn fly-left"><?php echo $svg_arrow_up; ?></div>
        <div id="fly-right" class="fpv-nav-btn fly-right"><?php echo $svg_arrow_up; ?></div>
        <div id="fly-back" class="fpv-nav-btn fly-back"><?php echo $svg_arrow_up; ?></div>
        <div id="fly-up" class="fpv-nav-btn fly-up"><?php echo $svg_arrow_up; ?></div>
        <div id="fly-down" class="fpv-nav-btn fly-down"><?php echo $svg_arrow_up; ?></div>
    </div>
        
    <div class="ck-asset-modal" style="display: none;">
        <i class="icon-close"></i>
        <h4><?php esc_html_e('First Person View Navigation', 'gowatch-child'); ?></h4>
        <div class="flexer">
            <div class="ck-col">
                <div class="ck-modal-item">
                    <img src="<?php echo get_stylesheet_directory_uri(); ?>/images/double-click.svg" alt="" />
                    <div class="ck-modal__item-details">
                        <strong><?php esc_html_e('Enable First Person View', 'gowatch-child'); ?></strong>
                        <span><?php esc_html_e('Double-click on the asset to choose start location.', 'gowatch-child'); ?></span>
                    </div>
                </div>
                <div class="ck-modal-item">
                    <img src="<?php echo get_stylesheet_directory_uri(); ?>/images/mouse-drag.svg" alt="" />
                    <div class="ck-modal__item-details">
                        <strong><?php esc_html_e('Look around', 'gowatch-child'); ?></strong>
                        <span><?php esc_html_e('Click and drag an any direction to look around ', 'gowatch-child'); ?></span>
                    </div>
                </div>
                <div class="ck-modal-item">
                    <img src="<?php echo get_stylesheet_directory_uri(); ?>/images/key-arrows.svg" alt="" />
                    <div class="ck-modal__item-details">
                        <strong><?php esc_html_e('Movement', 'gowatch-child'); ?></strong>
                        <span><?php esc_html_e('Use keyboard arrows keys or WASD keys to move around', 'gowatch-child'); ?></span>
                    </div>
                </div>
                <div class="ck-modal-item">
                    <img src="<?php echo get_stylesheet_directory_uri(); ?>/images/double-click.svg" alt="" />
                    <div class="ck-modal__item-details">
                        <strong><?php esc_html_e('Jump to new location', 'gowatch-child'); ?></strong>
                        <span><?php esc_html_e('Double-click on the asset to choose new location.', 'gowatch-child'); ?></span>
                    </div>
                </div> 
            </div>
            <div class="ck-col">
                <div class="ck-modal-item">
                    <img src="<?php echo get_stylesheet_directory_uri(); ?>/images/double-tap.svg" alt="" />
                    <div class="ck-modal__item-details">
                        <strong><?php esc_html_e('Enable First Person View', 'gowatch-child'); ?></strong>
                        <span><?php esc_html_e('Double-tap on the asset to choose start location.', 'gowatch-child'); ?></span>
                    </div>
                </div>
                <div class="ck-modal-item">
                    <img src="<?php echo get_stylesheet_directory_uri(); ?>/images/finger-drag.svg" alt="" />
                    <div class="ck-modal__item-details">
                        <strong><?php esc_html_e('Look around', 'gowatch-child'); ?></strong>
                        <span><?php esc_html_e('Tap and drag an any direction to look around.', 'gowatch-child'); ?></span>
                    </div>
                </div>
                <div class="ck-modal-item">
                    <img src="<?php echo get_stylesheet_directory_uri(); ?>/images/key-arrows.svg" alt="" />
                    <div class="ck-modal__item-details">
                        <strong><?php esc_html_e('Movement', 'gowatch-child'); ?></strong>
                        <span><?php esc_html_e('Use arrows keys to move around', 'gowatch-child'); ?></span>
                    </div>
                </div>
                <div class="ck-modal-item">
                    <img src="<?php echo get_stylesheet_directory_uri(); ?>/images/double-tap.svg" alt="" />
                    <div class="ck-modal__item-details">
                        <strong><?php esc_html_e('Jump to new location', 'gowatch-child'); ?></strong>
                        <span><?php esc_html_e('Double-tap on the asset to choose start location.', 'gowatch-child'); ?></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="ck-asset-modal-footer">
            <a href="#" class="gw3-button"><?php esc_html_e('Ok, thank you.', 'gowatch-child'); ?></a>
            <label for="ck-asset-modal-close">
                <input type="checkbox" name="ck-asset-modal-close" id="ck-asset-modal-close" />
                <span>
                    <?php esc_html_e('Don’t show this window any more.', 'gowatch-child'); ?>
                </span>
            </label>

            <div class="cesium-widget-credits">
                <div class="cesium-credit-logoContainer" style="display: inline;">
                    <div style="display: inline;">
                        <a href="https://cesium.com/" target="_blank">
                            <img title="Cesium ion" src="https://cesiumjs.org/releases/1.78/Build/CesiumUnminified/Assets/Images/ion-credit.png">
                        </a>
                    </div>
                </div>
                <div class="cesium-credit-textContainer" style="display: inline;">
                    <div style="display: inline;">
                        <a href="https://cesium.com/pricing/" target="_blank">Upgrade for commercial use. </a>
                    </div>
                </div>
                <a class="cesium-credit-expand-link" style="display: inline;">Data attribution</a>
            </div>
        </div>
    </div>
    <span class="ck-modal-toggler"><i class="icon-help"></i></span>
    <?php
}


function ck_get_assets() {

    $data = array();

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

    if ( $query->have_posts() ) {
        while ( $query->have_posts() ) {
            $query->the_post();
            $location = get_post_meta( get_the_ID(), 'asset_geo-location', true );
            $data[] = array('post_title' => get_the_title(), 'post_slug' => get_post_field( 'post_name', get_the_ID() ), 'coordinates' => $location);
        }
    }

    return new WP_REST_Response( $data, 200 );
}
add_action( 'rest_api_init', function () {
  register_rest_route( 'ck/v1', '/get_items', array(
    'methods' => 'GET',
    'callback' => 'ck_get_assets',
  ) );
} );
