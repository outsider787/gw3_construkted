<?php
function enqueue_scripts_and_styles_for_side_bar(){
    $css_dir = '/wp-content/themes/gowatch-child/includes/side-bar/assets/css/';

    wp_enqueue_style(
        'bootstrap-4.1.3', $css_dir . 'bootstrap-4.1.3.css'
    );

    wp_enqueue_style(
        'construkted-side-bar-css', $css_dir . 'side-bar.css'
    );

    $script_dir = '/wp-content/themes/gowatch-child/includes/side-bar/assets/js/';

    wp_enqueue_script('side-bar-script',  $script_dir . 'side-bar.js', array('jquery'), CS_LIB_VER, true);
}

function render_construkted_side_bar() {
    enqueue_scripts_and_styles_for_side_bar();

    echo '<div id="side-menu-bar-wrapper">';
        require_once __DIR__ . '/side-bar-content.php';
    echo '</div>';


}