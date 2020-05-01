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
        settings_fields( 'construkted_api_options' );
        $api_options = get_option( 'api_options' );
        ?>
        <div class="postbox">
            <div class="inside">
                <table class="form-table">
                    <tbody>
                    <tr>
                        <th scope="row">
                            <label><strong><?php echo __( 'API URL:', 'construkted' ) ?></strong></label>
                        </th>
                        <td>
                            <input type="text" id="construkted-api-url" name="api_options[construkted-api-url]" value="<?php echo !empty($api_options['construkted-api-url']) ? $api_options['construkted-api-url'] : '' ?>" size="63" /><br />
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
