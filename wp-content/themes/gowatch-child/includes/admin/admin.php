<?php
// Exit if accessed directly
if ( !defined( 'ABSPATH' ) ) exit;

/**
 * Public Class
 *
 * Manage Public Class

 */
class CONSTRUKTED_Admin {
    //class constructor
    function __construct() {
    }

    /**
     * Initialize settings api.
     */
    public function construkted_admin_init() {
        register_setting( 'construkted_amazon_s3_options', 'amazon_s3_options', array($this, '') );
    }

    /**
     * Create option page admin menu for frontend submission customization.
     */
    public function construkted_admin_menu() {
        $hook = add_options_page(
            'Construkted',
            'Construkted',
            'manage_options',
            'construkted_page',
            array($this,'construkted_settings_page')
        );

        add_action($hook, array($this, 'enqueue_custom_scripts_styles'));
    }

    /**
     * Create option page admin menu for tabbing set.
     */
    public function construkted_settings_page() {
        global $constructed_active_tab;
        $constructed_active_tab = isset( $_GET['tab'] ) ? $_GET['tab'] : 'amazon-s3-settings';

        ?>

        <h2 class="nav-tab-wrapper">
            <?php
            do_action( 'construkted_settings_tab' );
            ?>
        </h2>
        <?php
        do_action( 'construkted_settings_content' );
    }

    /**
     * Create option page admin menu for tabbing.
     */
    public function construkted_settings_tab(){
        global $constructed_active_tab;?>

        <a class="nav-tab <?php echo $constructed_active_tab == 'amazon-s3-settings' ? 'nav-tab-active' : ''; ?>"
             href="<?php echo admin_url( 'options-general.php?page=construkted_page&tab=amazon-s3-settings' ); ?>">
            <?php _e( 'Amazon S3 Settings', 'construkted' ); ?>
        </a>

        <a class="nav-tab <?php echo $constructed_active_tab == 'processing-state' ? 'nav-tab-active' : ''; ?>"
            href="<?php echo admin_url( 'options-general.php?page=construkted_page&tab=processing-state' ); ?>">
            <?php _e( 'Processing State', 'construkted' ); ?>
        </a>

        <?php
    }

    /**
     * Create option page admin menu for tabbing content.
     */
    public function construkted_settings_content() {
        global $constructed_active_tab;

        if ( $constructed_active_tab == 'amazon-s3-settings')
            require_once( CONSTRUKTED_PATH . '/includes/admin/forms/construkted-amazon-s3-settings.php' );
        else
            require_once( CONSTRUKTED_PATH . '/includes/admin/forms/tiling-state.php' );
    }

    /**
     * Adding Hooks
     */
    function add_hooks() {
        // Add settings option
        add_action( 'admin_init', array( $this, 'construkted_admin_init' ), 50, 1 );

        /*Settings in create option menu*/

        add_action( 'admin_menu', array( $this, 'construkted_admin_menu' ) );
        add_action( 'construkted_settings_tab', array( $this, 'construkted_settings_tab' ) );
        add_action( 'construkted_settings_content', array( $this, 'construkted_settings_content' ) );
    }

    function enqueue_custom_scripts_styles() {
        $js_path = '/wp-content/themes/gowatch-child/includes/admin/js/construkted.js';

        wp_enqueue_script( 'construkted-admin-script', $js_path, array('jquery'), false, true );
        wp_enqueue_style('construkted-admin-css', get_stylesheet_directory_uri() . '/includes/admin/css/gw3-admin-css.css' );

        wp_localize_script( 'construkted-admin-script', 'construktedAdminParam', array(
                'tilingStateEndPoint'       => admin_url("admin-ajax.php")
            )
        );
    }
}



// Create the AJAX functions for the processing state

function gw3_processing_retrieve_data() {
    $url = CONSTRUKTED_EC2_API_TASK_ALL;
    $ret = wp_remote_get( $url );

    // check error
    if(is_wp_error($ret)) {
        $body = "something wrong. failed to connect construkted API";
    }
    else {
        $body = array_reverse(json_decode($ret['body'], true));
    }

    return $body;
}

function gw3_processing_generateItem($item) {

    ob_start();
    ob_clean();

    ?>
    
    <div class="processing-item">
        
        <div class="item-title"><?php echo $item['name']; ?></div>

        <div class="item-content">
            <?php foreach( $item as $key => $attr ): ?>
                <div class="flex-item">
                    <div>
                        <?php echo $key; ?>: 
                    </div>
                    <div>
                        <?php echo is_array($attr) ? $attr['code'] : $attr; ?>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
        <span class="dashicons dashicons-arrow-down-alt2"></span>

    </div>

    <?php

    $output = ob_get_clean();

    return $output;

}

function gw3_processing_displayItems() {

    $items  = gw3_processing_retrieve_data();
    $output = '';

    foreach ($items as $item) {
        $output .= gw3_processing_generateItem($item);
    }

    if( isset($_POST['echo']) ) {
        echo $output;
        die();
    }

    return $output;
}
add_action( 'wp_ajax_gw3_processing_displayItems', 'gw3_processing_displayItems');