<?php

/**
 * File to control different server actions which come from external triggers
 * @requires post_id = int
 * @requires action  = string
 */

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');
header('Access-Control-Allow-Headers: Content-Type');
header("Access-Control-Allow-Origin: 158.106.136.192");

$allow = array('158.106.136.192', '::1'); //allowed IPs

if(!isset($_SERVER['REMOTE_ADDR']) || (isset($_SERVER['REMOTE_ADDR']) && !in_array($_SERVER['REMOTE_ADDR'], $allow)) ) {

    echo json_encode( array('errCode' => 1, 'errMsg' => 'Not allowed!'), 405 );

    exit();

}


/**
 * Function which sets the default thumbnail with the "no-thumbnail" preset
 */
function set_default_thumbnail_of_no_thumbnail($post_id, $slug) {

    // Check if we have the ID of the thumbnail stored in the object cache
    $noimage_thumbnail_id = wp_cache_get('construkted_noimage', 'construkted');

    if( !empty($noimage_thumbnail_id) && $noimage_thumbnail_id == true ) {
        // Found something in object cache
        $attachment_id = $noimage_thumbnail_id;

    } else {

        // If nothing was found in object cache, try to get it by the post title
        $default_image = wp_get_attachment_by_post_name('default_nothumbnail_image');
        if( $default_image ) {
            $default_image = wp_get_attachment_by_post_name('default_nothumbnail_image');
            $attachment_id = $default_image;

        } else {


            // If nothing is found in object cache and no media ID with that title if found, upload a new one
            $thumbnailFileName = 'thumbnail_' . $slug . '.png';
            $wordpress_upload_dir = wp_upload_dir();
            $thumbnail_file_path = $wordpress_upload_dir['path'] . '/' . $thumbnailFileName;
            $orig_thumbnail_file_path = get_stylesheet_directory() . '/images/default_image-noThumbnail-flat.png';

            $ret = copy($orig_thumbnail_file_path, $thumbnail_file_path);

            if($ret == false)
                wp_die('failed to copy image');

            $attachment = array(
                'post_author' => 1,
                'post_date' => current_time('mysql'),
                'post_date_gmt' => current_time('mysql'),
                'post_title' => 'default_nothumbnail_image',
                'post_status' => 'inherit',
                'comment_status' => 'open',
                'ping_status' => 'closed',
                'post_name' => sanitize_title_with_dashes(str_replace("_", "-", $thumbnail_file_path)),
                'post_modified' => current_time('mysql'),
                'post_modified_gmt' => current_time('mysql'),
                'post_parent' => $post_id,
                'post_type' => 'attachment',
                'guid' => $thumbnail_file_path,
                'post_mime_type' => 'image/png',
                'post_excerpt' => '',
                'post_content' => ''
            );

            //insert the database record
            $attachment_id = wp_insert_attachment( $attachment, $thumbnail_file_path, $post_id );

            if($attachment_id == 0) {
                wp_die('failed to insert attachment!');
            }

            $attachment_meta_data = wp_generate_attachment_metadata( $attachment_id, $thumbnail_file_path);

            wp_update_attachment_metadata($attachment_id, $attachment_meta_data);

        }
        wp_cache_set('construkted_noimage', $attachment_id, 'construkted');
    }
    

    $ret = update_post_meta( $post_id, '_thumbnail_id', $attachment_id );

    if($ret == false)
        wp_die('failed to update post meta!');
}


if( 'delete_attachment' == $_REQUEST['action'] ) {


	// Do whatever necessary for the delete_attachment action
	if(isset($_REQUEST['post_id']) && !empty($_REQUEST['post_id'])) {

	    // Actually load the WP environment only if all tests are passed and WP is needed
	    require( '../../../wp-load.php' );
		require_once ABSPATH . '/wp-admin/includes/image.php';


	    $post_id = esc_attr($_REQUEST['post_id']);
	    $attachment_id = esc_attr($_REQUEST['orig_asset_attachment_id']);

	    if($attachment_id == null) {
	        echo json_encode(array('errCode' => 1, 'errMsg' => 'orig_asset_attachment_id!'));
	        exit;
	    }

	    if ( !get_post ( $post_id ) ) {
	        echo json_encode(array('errCode' => 1, 'errMsg' => 'specified post ' . $post_id . ' does not exist!'));
	        exit;
	    }

	    $attached_file = get_attached_file($attachment_id, false);



	    $ret = wp_delete_attachment( $attachment_id, true );

	    if($ret == false || $ret == null) {
	        echo json_encode(array('errCode' => 1, 'errMsg' => 'failed to delete!'));
	        exit;
	    }
	    else {
	        echo json_encode(array('errCode' => 0, 'errMsg' => 'successfully deleted!'));
	        exit;
	    }
	}
	else {
	    echo json_encode(array('errCode' => 1, 'errMsg' => 'please specify post id!'));
	    exit;
	}
} elseif( 'publish_asset' == $_REQUEST['action'] ) {

	// Do whatever needs to be done to publish an asset
	if( isset($_REQUEST['post_id']) && !empty($_REQUEST['post_id']) ) {


	    require( '../../../wp-load.php' );
		require_once ABSPATH . '/wp-admin/includes/image.php';
		
	    $post_id = esc_attr($_REQUEST['post_id']);

	    if ( !get_post ( $post_id ) ) {
	        echo json_encode(array('errCode' => 1, 'errMsg' => 'specified post ' . $post_id . ' does not exist!'));
	        exit;
	    }

	    wp_publish_post($post_id);

	    // update thumbnail
	    $post = get_post($post_id);
	    $slug = $post->post_name;

	    $thumbnail_id = get_post_meta( $post_id, '_thumbnail_id', true );

	    // check old thumbnail and delete
	    if($thumbnail_id != "")
	        if( ! wp_delete_attachment( $thumbnail_id, true )) {
	            echo json_encode(array('errCode' => 0, 'errMsg' => 'failed to delete old thumbnail!'));
	            exit;
	        }

	    set_default_thumbnail_of_no_thumbnail($post_id, $slug);

	    echo json_encode(array('errCode' => 0, 'errMsg' => 'successfully published!'));
	    exit;
	}
	else {
	    echo json_encode(array('errCode' => 1, 'errMsg' => 'please specify post id!'));
	    exit;
	}

}