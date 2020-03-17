<?php
function enqueue_styles_for_side_bar(){
    $css_dir = '/wp-content/themes/gowatch-child/includes/construkted/assets/css/';

    wp_enqueue_style(
        'bootstrap-4.1.3', $css_dir . 'bootstrap-4.1.3.css',
        array('gowatch-child-style')
    );

}

function render_construkted_side_bar() {
    enqueue_styles_for_side_bar();

    echo '<div id="side-menu-bar-wrapper">';
        require_once __DIR__ . '/side-bar/side-bar-content.php';
    echo '</div>';
}