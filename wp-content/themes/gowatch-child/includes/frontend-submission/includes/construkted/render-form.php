<?php

class CONSTRUKTED_render_form_element {
    public static function file_upload( $attr, $post_id, $type, $form_id, $obj ) {
        $allowed_ext = '';
        $extensions = tszf_allowed_extensions();

        if ( is_array( $attr['extension'] ) ) {
            foreach ($attr['extension'] as $ext) {
                $allowed_ext .= $extensions[$ext]['ext'] . ',';
            }
        } else {
            $allowed_ext = '*';
        }

        $uploaded_items = $post_id ? $obj->get_meta( $post_id, $attr['name'], $type, false ) : array();
        ?>

        <div class="tszf-fields">
            <div class="tszf-label">
                <label>
                    <?php  echo 'Used Storage: ' . getTotalUploadedFileGBSizeOfCurrentUser() . ' GB | Total Quota: ' . getDiskQuotaOfCurrentUser() . ' GB'?>
                </label>
            </div>

            <div id="tszf-<?php echo airkit_var_sanitize( $attr['name'], 'true' ); ?>-upload-container">
                <div class="tszf-attachment-upload-filelist" data-type="file" data-required="<?php echo airkit_var_sanitize( $attr['required'], 'true' ); ?>">
                    <a id="tszf-<?php echo airkit_var_sanitize( $attr['name'], 'true' ); ?>-pickfiles"
                       data-form_id="<?php echo airkit_var_sanitize( $form_id, 'true' ); ?>"
                       class="button file-selector <?php echo ' tszf_'.$attr['name'].'_'.$form_id; ?>" href="#">
                        <i class="icon-upload"></i>
                        <?php _e( 'Select File(s)', 'gowatch' ); ?>
                    </a>

                    <ul class="tszf-attachment-list thumbnails">
                        <?php
                        if ( $uploaded_items ) {
                            foreach ($uploaded_items as $attach_id) {
                                echo TSZF_Upload::attach_html( $attach_id, $attr['name'] );
                            }
                        }
                        ?>
                    </ul>
                </div>
            </div><!-- .container -->

            <span class="tszf-help"><?php echo stripslashes( $attr['help'] ); ?></span>

        </div> <!-- .tszf-fields -->

        <?php echo '<script type="text/javascript">'; ?>
        jQuery(function($) {
        new TSZF_Uploader( 'tszf-<?php echo airkit_var_sanitize( $attr['name'], 'true' ); ?>-pickfiles',
        'tszf-<?php echo airkit_var_sanitize( $attr['name'], 'true' ); ?>-upload-container',
        <?php  echo airkit_var_sanitize( $attr['count'], 'true' ); ?>,
        '<?php echo airkit_var_sanitize( $attr['name'], 'true' ); ?>',
        '<?php echo airkit_var_sanitize( $allowed_ext, 'true' ); ?>',
        <?php  echo airkit_var_sanitize( $attr['max_size'], 'true' ); ?>);
        });
        <?php echo '</script>'; ?>
        <?php
    }
}
