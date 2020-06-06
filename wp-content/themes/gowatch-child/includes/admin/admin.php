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
        register_setting( 'construkted_cesium_options', 'cesium_options', array($this, '') );
        register_setting( 'construkted_api_options', 'api_urls', array($this, '') );
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

        <a class="nav-tab <?php echo $constructed_active_tab == 'cesium-settings' ? 'nav-tab-active' : ''; ?>"
            href="<?php echo admin_url( 'options-general.php?page=construkted_page&tab=cesium-settings' ); ?>">
            <?php _e( 'Cesium Settings', 'construkted' ); ?>
        </a>

        <a class="nav-tab <?php echo $constructed_active_tab == 'api-url-settings' ? 'nav-tab-active' : ''; ?>"
           href="<?php echo admin_url( 'options-general.php?page=construkted_page&tab=api-url-settings' ); ?>">
            <?php _e( 'API URL Settings', 'construkted' ); ?>
        </a>

        <?php
    }

    /**
     * Create option page admin menu for tabbing content.
     */
    public function construkted_settings_content() {
        global $constructed_active_tab;

        if ( $constructed_active_tab == 'amazon-s3-settings' )
            require_once( CONSTRUKTED_PATH . '/includes/admin/forms/construkted-amazon-s3-settings.php' );
        elseif ( $constructed_active_tab == 'processing-state' )
            require_once( CONSTRUKTED_PATH . '/includes/admin/forms/tiling-state.php' );
        elseif ( $constructed_active_tab == 'cesium-settings' )
            require_once( CONSTRUKTED_PATH . '/includes/admin/forms/cesium-settings.php' );
        elseif ( $constructed_active_tab == 'api-url-settings' )
            require_once( CONSTRUKTED_PATH . '/includes/admin/forms/api-url-settings.php' );
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

    function enqueue_custom_scripts_styles() {;
        wp_enqueue_script( 'construkted-admin-script', get_stylesheet_directory_uri() . '/includes/admin/js/construkted.js', array('jquery'), false, true );
        wp_enqueue_style('construkted-admin-css', get_stylesheet_directory_uri() . '/includes/admin/css/gw3-admin-css.css' );

        wp_localize_script( 'construkted-admin-script', 'construktedAdminParam', array(
                'ajaxUrl' => admin_url("admin-ajax.php")
            )
        );
    }
}



// Create the AJAX functions for the processing state

function construkted_get_all_task() {
    $url = CONSTRUKTED_EC2_API_TASK_ALL;
    $ret = wp_remote_get( $url );

    $tasks = [];

    // check error
    if(is_wp_error($ret)) {
        return null;
    }
    else {
        $body = array_reverse(json_decode($ret['body'], true));

        foreach ($body as $task) {
            $task['dateCreated'] = date('F j, Y, g:i a', $task['dateCreated'] / 1000);
            $task['processingTime'] = date("H:i:s", $task['processingTime'] / 1000);
            unset($task['uploadingProgress']);
            unset($task['downloadProgress']);
            // unset($task['status']);
            unset($task['runningStatus']);
            unset($task['progress']);

            array_push($tasks, $task);
        }
    }

    return $tasks;
}

function get_html_for_one_task($task) {
    ob_start();
    ob_clean();

    ?>

    <div class="processing-item">

        <div class="item-title"><?php echo $task['name']; ?></div>

        <div class="item-content">
            <?php foreach( $task as $key => $attr ): ?>
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

function get_html_for_tasks($tasks) {
    $output = '';

    foreach ($tasks as $task) {
        $output .= get_html_for_one_task($task);
    }

    if( isset($_POST['echo']) ) {
        echo $output;
        die();
    }

    return $output;
}

function gw3_processing_displayItems() {
    $all_tasks = construkted_get_all_task();

    $tasks_being_processed = [];
    $tasks_in_queue = [];
    $tasks_failed = [];

    if($all_tasks != null)
        foreach ($all_tasks as $task) {
            $status_code = $task['status']['code'];

            if($status_code == 10) // queued
                array_push($tasks_in_queue, $task);
            else if ($status_code == 20) // running
                array_push($tasks_being_processed, $task);
            else if ($status_code == 40) // failed
                array_push($tasks_failed, $task);
            else
                continue;
        };

    $ret = array(
        'construkted_api_state' => isset($all_tasks) ? 'Live' : 'Not Live',
        'count_of_tasks_being_processed' => count($tasks_being_processed),
        'count_of_tasks_in_queue' => count($tasks_in_queue),
        'count_of_tasks_failed' => count($tasks_failed),
        'html_for_tasks_being_processed' => get_html_for_tasks($tasks_being_processed),
        'html_for_tasks_in_queue' =>  get_html_for_tasks($tasks_in_queue),
        'html_for_tasks_failed' => get_html_for_tasks($tasks_failed)
    );

    echo json_encode($ret);

    wp_die();
}

add_action( 'wp_ajax_gw3_processing_displayItems', 'gw3_processing_displayItems');