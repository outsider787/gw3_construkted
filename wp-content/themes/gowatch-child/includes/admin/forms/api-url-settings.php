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
        settings_fields( 'construkted_api_options' );  // group name
        $api_urls = get_option( 'api_urls' );          // option 's name
        ?>
        <div class="postbox">
            <div class="inside">
                <table id = "construkted-api-url-settings-table" class="form-table">
                    <tbody>
                    <?php
                        foreach ($api_urls as $key => $url){
                            echo '<tr>';
                            echo '    <td colspan="2">';

                            echo '<input type="text" id="' . $key . '" name=api_urls[' . $key . ']" value="' . $url . '" size="63">';
                            echo '<input type="button" class="button-primary construkted-api-delete-button" value="Delete"/>';
                            echo '    </td>';
                            echo '</tr>';
                        }
                    ?>
                        <tr>
                            <td colspan="2">
                                <input type="button" id="add-new-construkted-url" class="button-primary" value="<?php echo __( 'ADD URL', 'construkted' ) ?>" />
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
