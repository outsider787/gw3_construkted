<?php

// Exit if accessed directly
if ( !defined( 'ABSPATH' ) ) exit;

/**
 * Tiling State Page
 */
?>
<div class="wrap">
    <form  method="post" action="options.php" enctype="multipart/form-data">
        <?php
        settings_fields( 'construkted_cesium_options' );
        $cesium_options = get_option( 'cesium_options' );
        ?>
        <div class="postbox">
            <div class="inside">
                <table class="form-table">
                    <tbody>
                    <tr>
                        <th scope="row">
                            <label><strong><?php echo __( 'Cesium Access Token:', 'construkted' ) ?></strong></label>
                        </th>
                        <td>
                            <input type="text" id="construkted-amazon-s3-access-key" name="cesium_options[construkted-cesium-access-token]" value="<?php echo !empty($cesium_options['construkted-cesium-access-token']) ? $cesium_options['construkted-cesium-access-token'] : '' ?>" size="63" /><br />
                        </td>
                    </tr>

                    <tr>
                        <td colspan="2">
                            <input type="submit" class="button-primary" value="<?php echo __( 'Save Changes', 'construkted' ) ?>" />
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </form>
</div>
