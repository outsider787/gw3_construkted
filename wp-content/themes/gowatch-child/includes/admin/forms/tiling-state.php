<?php

// Exit if accessed directly
if ( !defined( 'ABSPATH' ) ) exit;

/**
 * Tiling State Page
 */
?>


<?php
    $url = CONSTRUKTED_EC2_API_TASK_ALL;
    $ret = wp_remote_get( $url );

    // check error
    if(is_wp_error($ret)) {
        $body = "something wrong. failed to connect construkted API";
    }
    else {
        $body = $ret['body'];
    }

?>

<!-- . beginning of wrap -->

<div class="wrap">
    <div class="postbox">
        <div class="inside">
            <div id = "tiling-state-info">
                <?php
                    echo $body;
                ?>
            </div>
        </div>
    </div>

    <input id = 'refresh-tiling-state' type="button" class="button-primary" value="Refresh">
</div>

