<?php

/**
 * Template Name: Delete Attachment API
 *
 */

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');
header('Access-Control-Allow-Headers: Content-Type');
header("Access-Control-Allow-Origin: *");

require_once ABSPATH . '/wp-admin/includes/image.php';

// http://localhost/gw3.construkted.com/publish-asset-api/?post_id=647

if(isset($_REQUEST['post_id'])) {
    $post_id = $_REQUEST['post_id'];
    $attachment_id = $_REQUEST['orig_asset_attachment_id'];

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