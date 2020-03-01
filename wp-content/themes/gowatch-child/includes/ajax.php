<?php

function save_thumbnail_from_request($post_id) {
    $image = $_REQUEST['capturedJpegImage'];
    $image = str_replace('data:image/jpeg;base64,', '', $image);
    $image = str_replace(' ', '+', $image);
    $imageData = base64_decode($image);

    $post = get_post($post_id);
    $slug = $post->post_name;
    $thumbnailFileName = 'thumbnail_' . $slug . '.jpg';

    $wordpress_upload_dir = wp_upload_dir();

    $file_path = $wordpress_upload_dir['path'] . '/' . $thumbnailFileName;

    file_put_contents($file_path, $imageData);

    return $file_path;
}

function do_set_thumbnail($post_id, $thumbnail_file_path) {
    $attachment = array(
        'post_author' => 1,
        'post_date' => current_time('mysql'),
        'post_date_gmt' => current_time('mysql'),
        'post_title' => preg_replace( '/\.[^.]+$/', '', basename(  $thumbnail_file_path) ),
        'post_status' => 'inherit',
        'comment_status' => 'open',
        'ping_status' => 'closed',
        'post_name' => sanitize_title_with_dashes(str_replace("_", "-", $thumbnail_file_path)),
        'post_modified' => current_time('mysql'),
        'post_modified_gmt' => current_time('mysql'),
        'post_parent' => $post_id,
        'post_type' => 'attachment',
        'guid' => $thumbnail_file_path,
        'post_mime_type' => 'image/jpeg',
        'post_excerpt' => '',
        'post_content' => ''
    );

    //insert the database record
    $attachment_id = wp_insert_attachment( $attachment, $thumbnail_file_path, $post_id );

    if($attachment_id == 0) {
        return array(
            'success' => false,
            'message' => 'failed to insert attachment!!'
        );
    }

    $attachment_meta_data = wp_generate_attachment_metadata( $attachment_id, $thumbnail_file_path);

    wp_update_attachment_metadata($attachment_id, $attachment_meta_data);

    $ret = update_post_meta( $post_id, '_thumbnail_id', $attachment_id );

    if($ret == true)
        return array(
            'success' => true,
            'message' => 'successfully update thumbnail!'
        );
    else
        return array(
            'success' => false,
            'message' => 'failed to update post meta!'
        );
}

function set_thumbnail_from_request($post_id) {
    $thumbnail_file_path = save_thumbnail_from_request($post_id);
    $ret = do_set_thumbnail($post_id, $thumbnail_file_path);

    echo $ret['message'];

    wp_die();
}

add_action( 'wp_ajax_nopriv_post_set_thumbnail', 'post_set_thumbnail' );
add_action( 'wp_ajax_post_set_thumbnail', 'post_set_thumbnail' );

function post_set_thumbnail() {
    $post_id = $_REQUEST['post_id'];
    $thumbnail_id = get_post_meta( $post_id, '_thumbnail_id', true );

    // check old thumbnail and delete
    if($thumbnail_id != "")
        if( ! wp_delete_attachment( $thumbnail_id, true )) {
            echo "failed to delete old thumbnail!";
            wp_die();
        }

    set_thumbnail_from_request($post_id);
}

add_action( 'wp_ajax_nopriv_post_set_current_view', 'post_set_current_view' );
add_action( 'wp_ajax_post_set_current_view', 'post_set_current_view' );

function post_set_current_view() {
    $post_id = $_REQUEST['post_id'];
    $view_data = $_REQUEST['view_data'];

    $ret = update_post_meta( $post_id, 'default_camera_position_direction', $view_data );

    if($ret == true)
        echo "successfully updated!";
    else {
        echo "failed to updated!";
    }

    wp_die();
}

add_action( 'wp_ajax_nopriv_post_reset_current_view', 'post_reset_current_view' );
add_action( 'wp_ajax_post_reset_current_view', 'post_reset_current_view' );

function post_reset_current_view() {
    $post_id = $_REQUEST['post_id'];

    $ret = update_post_meta( $post_id, 'default_camera_position_direction', '' );

    if($ret == true)
        echo "successfully updated!";
    else {
        echo "failed to updated!";
    }

    wp_die();
}

function construkted_delete_asset( $post_id ) {
    $post = get_post($post_id);
    $author_id = $post->post_author;
    $user_name = get_the_author_meta( 'display_name' , $author_id );
    $slug = $post->post_name;
    $original_3d_file_base_name = get_post_meta($post_id, 'original_3d_file_base_name', true);

    if($original_3d_file_base_name == '') {
        return array('success' => false, 'error' => 'failed to find original zip file name!');
    }

    $server_url = CONSTRUKTED_EC2_API_DELETE_ASSET;

    error_log($server_url);

    $url = $server_url . '?userName=' . $user_name . '&slug=' . $slug . '&original3DFileBaseName=' . $original_3d_file_base_name;

    $ret = wp_remote_get( $url );

    if( is_wp_error( $ret ) ) {
        $error_string = $ret->get_error_message();

        return array('success' => false, 'error' => $error_string);
    }

    $body = wp_remote_retrieve_body( $ret );

    $data = json_decode( $body );

    if($data->errCode != 0) {
        $error_string = 'delete asset api have sent error!' . ' Error message: ' . $data->errMsg;

        return array('success' => false, 'error' => $error_string);
    }

    return array('success' => true, 'error' => '');
}

function construkted_remove_post() {
    $nonce = $_POST['security'];

    if ( !wp_verify_nonce( $nonce, 'ajax_delete_video' ) ) return false;

    $post_ID = sanitize_text_field( $_POST['post_id'] );
    $post_title = get_the_title( $post_ID );

    $ret = construkted_delete_asset($post_ID);

    if($ret['success'] == false) {
        $return['alert'] = 'error';
        $return['label'] = esc_html__( 'Delete', 'gowatch' );
        $return['icon'] = 'icon-error';
        $return['message'] = sprintf( esc_html__( 'There was an error deleting %s', 'gowatch' ), '<strong>' . esc_html( $post_title ) . '</strong>' );
        $return['redirect'] = home_url() . '/profile/?active_tab=posts';

        wp_send_json( $return, false );

        die();
    }

    $deleted_post = wp_delete_post( $post_ID, false );

    if ( !is_wp_error( $deleted_post ) ) {

        $return['alert'] 	= 'success';
        $return['label'] 	= esc_html__( 'Deleted', 'gowatch' );
        $return['icon'] 	= 'icon-flag';
        $return['message']  = sprintf( esc_html__( 'You have successfully deleted %s', 'gowatch' ), '<strong>' . esc_html( $post_title ) . '</strong>' );
        $return['redirect'] = home_url() . '/profile/?active_tab=posts';

    } else {

        $return['alert'] = 'error';
        $return['label'] = esc_html__( 'Delete', 'gowatch' );
        $return['icon'] = 'icon-error';
        $return['message'] = sprintf( esc_html__( 'There was an error deleting %s', 'gowatch' ), '<strong>' . esc_html( $post_title ) . '</strong>' );

    }

    wp_send_json( $return, false );

    die();
}