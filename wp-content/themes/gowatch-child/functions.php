<?php

if (!defined('CONSTRUKTED_PATH')) {
    define('CONSTRUKTED_PATH', get_stylesheet_directory());
}

if (!defined('CS_LIB_VER')) {
    define('CS_LIB_VER', '1.0.0'); //library version of js and css
}

// GB format
if (!defined('DEFAULT_DISK_QUOTA')) {
    define('DEFAULT_DISK_QUOTA', 2);
}

$api_urls = get_option( 'api_urls' );

if (!defined('CONSTRUKTED_API_URLS')) {
    define('CONSTRUKTED_API_URLS', $api_urls);
}

define('CESIUMJS_VER', '1.78');

require(CONSTRUKTED_PATH . '/includes/functions.php');
require(CONSTRUKTED_PATH . '/includes/ajax.php');
require(CONSTRUKTED_PATH . '/includes/admin/admin.php');
require(CONSTRUKTED_PATH . '/includes/frontend-submission/includes/construkted/loader.php');
require(CONSTRUKTED_PATH . '/includes/class.compilator.php' );
require(CONSTRUKTED_PATH . '/includes/construkted/construkted.php');

// Post Meta
require(CONSTRUKTED_PATH . '/includes/class.postmeta.php' );

add_action('wp_enqueue_scripts', 'gowatch_child_enqueue_styles');

function gowatch_child_enqueue_styles()
{
    wp_enqueue_style('gowatch-child-style', get_stylesheet_directory_uri() . '/style.css', array('gowatch-style', 'gowatch-bootstrap', 'gowatch-widgets'));

    // Check if is single video page to enqueue the scripts
    if( is_singular() && get_post_type(get_the_ID()) == 'video' ) {
        enqueue_construkted_scripts(ConstruktedAjaxType::AssetViewer);
    }
}

/*
 * Generate Download Button HTML.
 */
function html_for_asset_download_button($post_ID, $options = array())
{
    $download_access = get_post_meta($post_ID, 'download_access', true);

    if($download_access != 'allow_download')
        return '';

    $btn_classes = $wrap_classes = array();

    $label_text = esc_html__('Download', 'gowatch');

    $download_label = '<span class="entry-meta-description">' . $label_text . '</span>';

    if (!is_user_logged_in()) {
        $btn_classes[] = 'user-not-logged-in';
    }

    // prepare download link
    //$s3_server_url = 'https://uploads-construkted.s3.us-east-2.amazonaws.com';  //OLD S3 path
    $s3_server_url = 'https://s3.us-east-2.wasabisys.com/construkted-uploads';  // New Wasabi path

    global $post;

    $author_id = $post->post_author;
    $author_display_name = get_the_author_meta( 'display_name' , $author_id );
    $post_slug = $post->post_name;

    $original_3d_file_base_name = get_post_meta($post_ID, 'original_3d_file_base_name', true);

    $href = $s3_server_url . '/' . $author_display_name . '/' . $post_slug . '-' . $original_3d_file_base_name;

    return '<a class="btn-download ' . implode(' ', $btn_classes) . '" href="' . esc_url($href) . '" title="' . $label_text . '">
        <i class="icon-download-full"></i> 
                        ' . $download_label . '
            </a>';
}

$construkted_admin = new CONSTRUKTED_Admin();
$construkted_admin->add_hooks();

add_action('after_setup_theme', function () {
    // remove parent theme 's default action.
    remove_filters_for_anonymous_class('tszf_render_pro_file_upload', 'TSZF_Pro_Loader', 'tszf_render_pro_file_upload_runner', 10);

    $ret = remove_action('init', 'airkit_embed_generate');

    if($ret == false)
        wp_die('failed remove airkit_embed_generate for init hook');

    override_remove_post();
    override_upload_script();

});

/**
 * Allow to remove method for an hook when, it's a class method used and class don't have variable, but you know the class name :)
 */
function remove_filters_for_anonymous_class( $hook_name = '', $class_name = '', $method_name = '', $priority = 0 ) {
    global $wp_filter;
    // Take only filters on right hook name and priority
    if ( ! isset( $wp_filter[ $hook_name ][ $priority ] ) || ! is_array( $wp_filter[ $hook_name ][ $priority ] ) ) {
        return false;
    }
    // Loop on filters registered
    foreach ( (array) $wp_filter[ $hook_name ][ $priority ] as $unique_id => $filter_array ) {
        // Test if filter is an array ! (always for class/method)
        if ( isset( $filter_array['function'] ) && is_array( $filter_array['function'] ) ) {
            // Test if object is a class, class and method is equal to param !
            if ( is_object( $filter_array['function'][0] ) && get_class( $filter_array['function'][0] ) && get_class( $filter_array['function'][0] ) == $class_name && $filter_array['function'][1] == $method_name ) {
                // Test for WordPress >= 4.7 WP_Hook class (https://make.wordpress.org/core/2016/09/08/wp_hook-next-generation-actions-and-filters/)
                if ( is_a( $wp_filter[ $hook_name ], 'WP_Hook' ) ) {
                    unset( $wp_filter[ $hook_name ]->callbacks[ $priority ][ $unique_id ] );
                } else {
                    unset( $wp_filter[ $hook_name ][ $priority ][ $unique_id ] );
                }
            }
        }
    }
}

//function generate the pagination read more
function onsen_pagination_callback() {

    if ( ! isset( $_POST['args'], $_POST['paginationNonce'], $_POST['loop'] ) ) die();
    check_ajax_referer( 'pagination-read-more', 'paginationNonce' );

    $args = airkit_Compilator::build_str( $_POST['args'], 'decode' );
    $loop = is_numeric( $_POST['loop'] ) ? (int)$_POST['loop'] : 0;

    if ( ! is_array( $args ) ) die();

   

    if ( 0 == $args['posts_per_page'] ) {

        $args['posts_per_page'] = get_option('posts_per_page');
    }

    if ( 0 < $loop ) {

        $args['offset'] = $offset + ( $args['posts_per_page'] * $loop );
    }

    if ( 0 == $loop ) {

        $args['offset'] = $offset + $args['posts_per_page'];
    }

    global $shown_ids;
    $args['post_not__in'] = $shown_ids;

    $query = new WP_Query( $args );

    $options = airkit_Compilator::build_str( $_POST['options'], 'decode' );

    if ( $query->have_posts() ) {

        while ( $query->have_posts() ) { $query->the_post();
           onsen_article($options);
           $shown_ids[] = get_the_ID();
        }
        wp_reset_postdata();

    } else {

       echo '0';
       
    }
    die();
}
add_action('wp_ajax_onsen_pagination', 'onsen_pagination_callback');
add_action('wp_ajax_nopriv_onsen_pagination', 'onsen_pagination_callback');


// Function showing an article row
function onsen_article( $options ) {
    global $post;
    ?>
    
    <div class="onsen-tr">
        <div class="onsen-td">
            <div class="list-view">
                <article class="listed-article">
                    <?php
                        airkit_featured_image( $options );
                        airkit_entry_content( $options );
                    ?>
                </article>
            </div>
        </div>
        <div id = "post-processing-state" data-post-id="<?php echo $post->ID; ?>" data-wp-state = "<?php echo get_post_status($post->ID); ?>" data-api-url ="<?php echo get_post_meta($post->ID, 'api_url', true)?>" class="onsen-td">
            <?php esc_html_e('Unknown' , 'gowatch-child'); ?>
        </div>
        <div class="onsen-td">
            <?php
                if ( get_current_user_id() == get_the_author_meta( 'ID' ) && 'yes' == tszf_get_option( 'enable_post_edit', 'tszf_dashboard' ) || is_admin() ) {

                    $url = get_frontend_submit_url();
                    $url = wp_nonce_url( $url . '?action=edit&pid=' . get_the_ID(), 'tszf_edit' );
                    echo '<a class="onsen-button icon-edit" href="'.$url.'">' . esc_html__('Edit', 'gowatch') . '</a>';

                }

                // Delete button
                if ( get_current_user_id() == get_the_author_meta( 'ID' ) && 'yes' == tszf_get_option( 'enable_post_del', 'tszf_dashboard' ) || is_admin() ) {
                    $delete_nonce = wp_create_nonce( 'ajax_delete_video' );
                    echo '<a class="onsen-button delete-video icon-delete" href="#" data-post-id="' . get_the_ID() . '" data-ajax-nonce="' . $delete_nonce . '">' . esc_html__('Delete', 'gowatch') . '</a>';

                }
            ?>
        </div>
    </div>

    <?php
}

function override_remove_post() {
    remove_action('wp_ajax_airkit_remove_post', 'airkit_remove_post');
    remove_action('wp_ajax_nopriv_airkit_remove_post', 'airkit_remove_post');

    add_action('wp_ajax_airkit_remove_post', 'construkted_remove_post');
    add_action('wp_ajax_nopriv_airkit_remove_post', 'construkted_remove_post');
}

function override_upload_script() {
    function dequeue_parent_script() {
        wp_dequeue_script( 'tszf-upload' );

        wp_enqueue_script( 'construkted-upload', get_stylesheet_directory_uri() . '/includes/frontend-submission/assets/js/upload.js', array('jquery', 'plupload-handlers'), false, true );

        wp_localize_script( 'construkted-upload', 'tszf_frontend_upload', array(
            'confirmMsg' => __( 'Are you sure?', 'gowatch' ),
            'nonce'      => wp_create_nonce( 'tszf_nonce' ),
            'ajaxurl'    => admin_url( 'admin-ajax.php' ),
            'plupload'   => array(
                'url'              => admin_url( 'admin-ajax.php' ) . '?nonce=' . wp_create_nonce( 'tszf-upload-nonce' ),
                'flash_swf_url'    => includes_url( 'js/plupload/plupload.flash.swf' ),
                'filters'          => array(array('title' => __( 'Allowed Files', 'gowatch' ), 'extensions' => '*')),
                'multipart'        => true,
                'urlstream_upload' => true,
            )
        ));


    }
    add_action( 'wp_print_scripts', 'dequeue_parent_script', 100 );
}

function make_ascii_filename($filename) {
    return preg_replace('/[[:^print:]]/', '', $filename);
}

add_filter('sanitize_file_name', 'make_ascii_filename', 10);

function construkted_upload_mimes($mime_types) {
    $mime_types['laz'] = 'application/laz';
    $mime_types['las'] = 'application/las';

    return $mime_types;
}

add_action('upload_mimes', 'construkted_upload_mimes');


function construkted_preloader(){
    return '<div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>';
}

/**
 * Function for excluding the private set posts from the post views
 */
function ck_exclude_private_posts($query) {
    if( $query->query['is_post_view'] == true || $query->query['is_widget_view'] == true ) {
        // Prepare the meta query to exclude private posts
        $meta_query = !empty($query->get('meta_query')) ? $query->get('meta_query') : array();

        //Add our meta query to the original meta queries
        $meta_query[] = array(
            array(
                'key' => 'view_access',
                'value' => 'private',
                'compare' => 'NOT LIKE',
                'type' => 'string'
            )
        );
        // Set the new query settings
        $query->set('has_password', false);
        $query->set('meta_query', $meta_query);
    }
    return $query;
}

add_action('pre_get_posts', 'ck_exclude_private_posts');


/**
 * Functions for creating a CRON job to remove the items from this server//WP
 */

function ck_asset_delete_action() {

    $args = array(
        'post_type' => 'attachment',
        'numberposts' => -1,
        'post_status' => null,
        'post_parent' => null, // any parent
        'date_query' => array(
            'before' => date('Y-m-d', strtotime('-2 days')) 
        )
        ); 
    $attachments = get_posts($args);
    if ($attachments) {
        foreach ($attachments as $post) {
            setup_postdata($post);
            if( in_array($post->post_mime_type, array('application/zip', 'application/laz', 'application/las') ) ) {
                wp_delete_attachment( $post->ID, true );
            }
        }
    }

}
add_action('ck_asset_delete_action', 'ck_asset_delete_action');
add_action('init', 'ck_asset_delete_cron');

function ck_asset_delete_cron() {
    if (!wp_next_scheduled('ck_asset_delete_action')) {
        wp_schedule_event(time(), 'daily', 'ck_asset_delete_action');
    }
}


function ck_change_author_url($url, $author_id, $author_nicename) {

    $profile_url = get_frontend_dashboard_url() . $author_nicename . '/';

    return  apply_filters('gowatch_profile_url', $profile_url);
}
add_filter( 'author_link', 'ck_change_author_url', 10, 3);

// Add Shortcode
function custom_shortcode() {
    wp_enqueue_style( 'cesiumjs-style',  'https://cesiumjs.org/releases/' . CESIUMJS_VER . '/Build/Cesium/Widgets/widgets.css', array(), CESIUMJS_VER );
    wp_enqueue_script('cesiumjs', 'https://cesiumjs.org/releases/' . CESIUMJS_VER .'/Build/Cesium/Cesium.js', array('jquery'), CESIUMJS_VER, true);

    enqueue_construkted_scripts(ConstruktedAjaxType::AssetExplorer);

    return
        '<div id = "cesiumContainer">
        </div> 
        ';
}

add_shortcode( 'asset-explorer', 'custom_shortcode' );