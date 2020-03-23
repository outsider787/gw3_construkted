<?php

// Exit if accessed directly
if ( !defined( 'ABSPATH' ) ) exit;

/**
 * Tiling State Page
 */
?>
<div class="wrap">
    <h2><?php esc_html_e('Processing State', 'gowatch-child'); ?></h2>
    <p>
	    <input id="refresh-tiling-state" type="button" class="button-primary" value="Click to Refresh" />
    </p>
    <div id="tiling-state-info">
        <?php
            // Show the data 
            echo gw3_processing_displayItems();
        ?>
    </div>
</div>

