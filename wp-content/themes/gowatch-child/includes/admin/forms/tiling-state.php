<?php

// Exit if accessed directly
if ( !defined( 'ABSPATH' ) ) exit;

/**
 * Tiling State Page
 */
?>
<div class="wrap">
    <h2>Processing State</h2>
    <div id="tiling-state-info">
        <?php
            // Show the data 
            echo gw3_processing_displayItems();
        ?>
    </div>

    <input id ="refresh-tiling-state" type="button" class="button-primary" value="Refresh" />
</div>

