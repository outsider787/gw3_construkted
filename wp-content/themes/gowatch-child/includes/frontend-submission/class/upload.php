<?php

/**
 * Attachment Uploader class
 *
 * @package TouchSize Frontend Submission
 */
class TSZF_Upload {

    function __construct() {

        add_action( 'wp_ajax_tszf_file_upload', array($this, 'upload_file') );
        add_action( 'wp_ajax_nopriv_tszf_file_upload', array($this, 'upload_file') );

        add_action( 'wp_ajax_tszf_file_del', array($this, 'delete_file') );
        add_action( 'wp_ajax_nopriv_tszf_file_del', array($this, 'delete_file') );

        add_action( 'wp_ajax_tszf_insert_image', array( $this, 'insert_image' ) );
        add_action( 'wp_ajax_nopriv_tszf_insert_image', array( $this, 'insert_image' ) );

    }

    /**
     * Validate if it's coming from WordPress with a valid nonce
     *
     * @return void
     */
    function validate_nonce() {
        $nonce = isset( $_GET['nonce'] ) ? $_GET['nonce'] : '';

        if ( ! wp_verify_nonce( $nonce, 'tszf-upload-nonce' ) ) {
            die( 'error' );
        }
    }

    function upload_file( $image_only = false ) {
        $this->validate_nonce();

        // a valid request will have a form ID
        $form_id = isset( $_POST['form_id'] ) ? intval( $_POST['form_id'] ) : false;

        if ( ! $form_id ) {
            die( 'error' );
        }

        // check if guest post enabled for guests
        if ( ! is_user_logged_in() ) {

            $guest_post    = false;
            $form_settings = tszf_get_form_settings( $form_id );

            if ( isset( $form_settings['guest_post'] ) && $form_settings['guest_post'] == 'true' ) {
                $guest_post = true;
            }

            //if it is registration form, let the user upload the file
            if ( get_post_type( $form_id ) == 'tszf_profile' ) {
                $guest_post = true;
            }


            if ( ! $guest_post ) {
                die( 'error' );
            }
        }

        $upload = array(
            'name'     => $_FILES['tszf_file']['name'],
            'type'     => $_FILES['tszf_file']['type'],
            'tmp_name' => $_FILES['tszf_file']['tmp_name'],
            'error'    => $_FILES['tszf_file']['error'],
            'size'     => $_FILES['tszf_file']['size']
        );

        header('Content-Type: text/html; charset=' . get_option('blog_charset'));

        $attach = $this->handle_upload( $upload );

        if ( $attach['success'] ) {

            $response = array( 'success' => true );

            if ($image_only) {
                $image_size = tszf_get_option( 'insert_photo_size', 'tszf_general', 'thumbnail' );
                $image_type = tszf_get_option( 'insert_photo_type', 'tszf_general', 'link' );

                if ( $image_type == 'link' ) {
                    $response['html'] = wp_get_attachment_link( $attach['attach_id'], $image_size );
                } else {
                    $response['html'] = wp_get_attachment_image( $attach['attach_id'], $image_size );
                }

            } else {
                $response['html'] = $this->attach_html( $attach['attach_id'] );
            }

            echo airkit_var_sanitize( $response['html'], 'true' );
        } else {
            // send response to frontend
             echo json_encode( $attach );
        }

        exit;
    }

    function custom_upload_dir( $dir ) {
        return array(
            'path'   => $dir['basedir'] . '/assets',
            'url'    => $dir['baseurl'] . '/assets',
            'subdir' => '/assets',
        ) + $dir;
    }

    /**
     * Generic function to upload a file
     *
     * @param string $field_name file input field name
     * @return bool|int attachment id on success, bool false instead
     */
    function handle_upload( $upload_data ) {
        if($upload_data['size'] + getTotalUploadedFileSizeOfCurrentUser() >= getDiskQuotaOfCurrentUser() * 1024 * 1024 *1024)
            return array('success' => false, 'error' => 'disk quota exceed the 2GB limit!');

        if(!self::is_allowed_upload_file_type($upload_data['name'])){
            return array('success' => false, 'error' => 'only one zip or laz file is allowed!');
        }

        add_filter( 'upload_dir', array($this, 'custom_upload_dir') );

        $uploaded_file = wp_handle_upload( $upload_data, array('test_form' => false) );

        remove_filter( 'upload_dir', array($this, 'custom_upload_dir') );

        // If the wp_handle_upload call returned a local path for the image
        if ( isset( $uploaded_file['file'] ) ) {
            $file_loc = $uploaded_file['file'];
            $file_name = basename( $upload_data['name'] );
            $file_type = wp_check_filetype( $file_name );

            $attachment = array(
                'post_mime_type' => $file_type['type'],
                'post_title' => preg_replace( '/\.[^.]+$/', '', basename( $file_name ) ),
                'post_content' => '',
                'post_status' => 'inherit'
            );

            $attach_id = wp_insert_attachment( $attachment, $file_loc );
            $attach_data = wp_generate_attachment_metadata( $attach_id, $file_loc );
            wp_update_attachment_metadata( $attach_id, $attach_data );

            return array('success' => true, 'attach_id' => $attach_id);
        }

        return array('success' => false, 'error' => $uploaded_file['error']);
    }

    public static function attach_html( $attach_id, $type = NULL ) {
        if ( !$type ) {
            $type = isset( $_GET['type'] ) ? $_GET['type'] : 'image';
        }

        $attachment = get_post( $attach_id );

        if ( ! $attachment ) {
            return;
        }

        if (wp_attachment_is_image( $attach_id)) {
            $image = wp_get_attachment_image_src( $attach_id, 'thumbnail' );
            $image = $image[0];
        } else {
            $image = wp_mime_type_icon( $attach_id );
        }

        $html = '<li class="tszf-image-wrap thumbnail">';
        $html .= sprintf( '<div class="attachment-name"><img src="%s" alt="%s" /></div>', $image, esc_attr( $attachment->post_title ) );

        if ( tszf_get_option( 'image_caption', 'tszf_general', 'off' ) == 'on' ) {
            $html .= '<div class="tszf-file-input-wrap">';
            $html .= sprintf( '<input type="text" name="tszf_files_data[%d][title]" value="%s" placeholder="%s">', $attach_id, esc_attr( $attachment->post_title ), __( 'Title', 'gowatch' ) );
            $html .= sprintf( '<textarea name="tszf_files_data[%d][caption]" placeholder="%s">%s</textarea>', $attach_id, __( 'Caption', 'gowatch' ), esc_textarea( $attachment->post_excerpt ) );
            $html .= sprintf( '<textarea name="tszf_files_data[%d][desc]" placeholder="%s">%s</textarea>', $attach_id, __( 'Description', 'gowatch' ), esc_textarea( $attachment->post_content ) );
            $html .= '</div>';
        }

        // Show the video in the admin panel
        if ( is_admin() && wp_attachment_is( 'video', $attach_id ) ) {
            $html .=  wp_video_shortcode( array( 'src' => wp_get_attachment_url( $attach_id ) ) );
        }

        $download_link = '';

        if ( is_admin() ) {
            $download_link = sprintf( '<a href="%s" class="dl-link">%s</a>', wp_get_attachment_url( $attach_id ), __( 'Download File', 'gowatch' ) );
        }        

        $html .= sprintf( '<input type="hidden" name="tszf_files[%s][]" value="%d">', $type, $attach_id );
        $html .= sprintf( '<div class="caption"><a href="#" class="attachment-delete" data-attach_id="%d">%s</a> %s</div>', $attach_id, '<i class="icon-close"></i>', $download_link );
        $html .= '</li>';

        return $html;
    }

    function delete_file() {
        check_ajax_referer( 'tszf_nonce', 'nonce' );

        $attach_id = isset( $_POST['attach_id'] ) ? intval( $_POST['attach_id'] ) : 0;
        $attachment = get_post( $attach_id );

        //post author or editor role
        if ( get_current_user_id() == $attachment->post_author || current_user_can( 'delete_private_pages' ) ) {
            wp_delete_attachment( $attach_id, true );
            echo 'success';
        }

        exit;
    }

    function associate_file( $attach_id, $post_id ) {
        wp_update_post( array(
            'ID' => $attach_id,
            'post_parent' => $post_id
        ) );
    }

    static function is_allowed_upload_file_type($filename) {
        $mime = wp_check_filetype($filename);

        if($mime['type'] == 'application/zip') {
            return true;
        }

        if($mime['type'] == 'application/laz') {
            return true;
        }

        if($mime['type'] == 'application/rar') {
            return true;
        }

        if($mime['type'] == 'application/x-7z-compressed') {
            return true;
        }

        return false;
    }

    function insert_image() {
        $this->upload_file( true );
    }
}