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

    $server_url = get_stylesheet_directory_uri();

    echo '
        <style>
            html, body, #cesiumContainer {
                width: 100%; height: 100%; margin: 0; padding: 0; overflow: hidden;
            }
        </style>
        ';

    echo '<link rel="stylesheet" href="https://cesiumjs.org/releases/' . CESIUMJS_VER . '/Build/Cesium/Widgets/widgets.css" type="text/css">';
    echo '<link rel="stylesheet" href="' . $server_url. '/css/construkted.css" type="text/css">';
    echo '<script type="text/javascript" src="' . $server_url . '/wp-includes/js/jquery/jquery.js"></script>';
    echo '<script type="text/javascript" src="https://cesiumjs.org/releases/' . CESIUMJS_VER . '/Build/Cesium/Cesium.js"></script>';
    echo '<script type="text/javascript" src="' . $server_url . '/js/cesium-ion-sdk-plugin.js"></script>';
    echo '<script type="text/javascript" src="' . $server_url . '/js/cs-camera-controller.js"></script>';

    // prepare javascript parameters
    echo '<script>';
    echo 'var CONSTRUKTED_AJAX = {};';
    echo 'CONSTRUKTED_AJAX.tile_server_url ="' . CONSTRUKTED_3D_TILE_SERVER_URL . '";';
    echo 'CONSTRUKTED_AJAX.post_slug ="' . $post_slug . '";';

    $default_camera_position_direction = get_post_meta( $post->ID, 'default_camera_position_direction', true);

    if($default_camera_position_direction != '')
        echo "CONSTRUKTED_AJAX.default_camera_position_direction = '" . $default_camera_position_direction . "';";

    echo '</script>';

    echo '<script type="text/javascript" src="' . $server_url . '/js/construkted.js"></script>';

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
        'preview' => array('ext' => 'zip,laz', 'label' => __('Previews', 'gowatch')),
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
