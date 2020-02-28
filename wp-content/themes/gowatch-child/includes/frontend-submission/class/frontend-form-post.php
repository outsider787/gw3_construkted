<?php

require(CONSTRUKTED_PATH . '/includes/frontend-submission/class/amazon-s3/class-edd-amazon-s3.php');

class TSZF_Frontend_Form_Post extends TSZF_Render_Form {

    private static $_instance;
    private $post_expiration_date    = 'tszf-post_expiration_date';
    private $expired_post_status     = 'tszf-expired_post_status';
    private $post_expiration_message = 'tszf-post_expiration_message';

    function __construct() {

        // ajax requests
        add_action( 'wp_ajax_tszf_submit_post', array($this, 'submit_post') );
        add_action( 'wp_ajax_nopriv_tszf_submit_post', array($this, 'submit_post') );
        add_action( 'wp_ajax_make_media_embed_code', array($this,'make_media_embed_code') );
        add_action( 'wp_ajax_nopriv_make_media_embed_code', array($this, 'make_media_embed_code') );

        // draft
        add_action( 'wp_ajax_tszf_draft_post', array($this, 'draft_post') );
    }

    public static function init() {
        if ( !self::$_instance ) {
            self::$_instance = new self;
        }

        return self::$_instance;
    }

    /**
     * Adds submit post form.
     *
     * @param array $atts
     * @return string
     */
    function add_post_form_build( $atts ) {
        $id = 0;
        extract( $atts );
        ob_start();

        $form_settings = tszf_get_form_settings( $id );
        $info          = apply_filters( 'tszf_addpost_notice', '', $id, $form_settings );
        $user_can_post = apply_filters( 'tszf_can_post', 'yes', $id, $form_settings );

        if ( $user_can_post == 'yes' ) {
            $this->render_form( $id );
        } else {
            echo '<div class="tszf-info">' . $info . '</div>';
        }

        $content = ob_get_contents();
        ob_end_clean();

        return $content;
    }

    /**
     * Adds edit post form.
     *
     * @param array $atts
     * @return string
     */
    function edit_post_form_build( $atts ) {
        global $userdata;

        ob_start();

        if ( !is_user_logged_in() ) {
            echo '<div class="tszf-message">' . __( 'You are not logged in', 'gowatch' ) . '</div>';
            wp_login_form();
            return;
        }

        $post_id = isset( $_GET['pid'] ) ? intval( $_GET['pid'] ) : 0;

        //is editing enabled?
        if ( tszf_get_option( 'enable_post_edit', 'tszf_dashboard', 'yes' ) != 'yes' ) {
            return '<div class="tszf-info">' . __( 'Post Editing is disabled', 'gowatch' ) . '</div>';
        }

        $curpost = get_post( $post_id );

        if ( ! $curpost ) {
            return '<div class="tszf-info">' . __( 'Invalid post', 'gowatch' );
        }

        // has permission?
        if ( ! current_user_can( 'delete_others_posts' ) && ( $userdata->ID != $curpost->post_author ) ) {
            return '<div class="tszf-info">' . __( 'You are not allowed to edit', 'gowatch' ) . '</div>';
        }

        $form_id       = get_post_meta( $post_id, self::$config_id, true );
        $form_settings = tszf_get_form_settings( $form_id );

        // fallback to default form
        if ( ! $form_id ) {
            // $form_id = tszf_get_option( 'default_post_form', 'tszf_general' );
            $form_id = airkit_option_value( 'general', 'frontend_submission_form' );
        }

        if ( ! $form_id ) {
            return '<div class="tszf-info">' . __( "I don't know how to edit this post, I don't have the form ID", 'gowatch' ) . '</div>';
        }

        $disable_pending_edit = tszf_get_option( 'disable_pending_edit', 'tszf_dashboard', 'on' );

        if ( $curpost->post_status == 'pending' && $disable_pending_edit == 'on' ) {
            return '<div class="tszf-info">' . __( 'You can\'t edit a post while in pending mode.', 'gowatch' );
        }

        if ( isset( $_GET['msg'] ) && $_GET['msg'] == 'post_updated' ) {
            echo '<div class="tszf-success airkit_alert alert-success">';
            echo airkit_var_sanitize( $form_settings['update_message'], 'true' );
            echo '</div>';
        }

        echo '<a href="'. get_permalink( $post_id ) .'" class="tszf-back"><i class="icon-left-arrow"></i>'. esc_html__( 'Back to post', 'gowatch' ) .'</a>';
        $this->render_form( $form_id, $post_id );

        $content = ob_get_contents();
        ob_end_clean();

        return $content;
    }

    /**
     * New/Edit post submit handler
     *
     * @return void
     */
    function submit_post() {

        check_ajax_referer( 'tszf_form_add' );

        @header( 'Content-Type: application/json; charset=' . get_option( 'blog_charset' ) );

        $form_id = isset( $_POST['form_id'] ) ? intval( $_POST['form_id'] ) : 0;
        $form_vars = $this->get_input_fields( $form_id );
        $form_settings = tszf_get_form_settings( $form_id );

        // Ignore values in this list when editing post.
        $edit_ignore = array();

        list( $post_vars, $taxonomy_vars, $meta_vars ) = $form_vars;

        // Build array of items that must be ignored on edit.
        foreach ( $post_vars as $key => $value ) {

            if( $value['show_edit'] == 'no' ) {

                $edit_ignore[] = $value['name'];

            }
            
        }

        foreach ( $taxonomy_vars as $key => $value ) {

            if( $value['show_edit'] == 'no' ) {

                $edit_ignore[] = $value['name'];

            }
            
        }    

        foreach ( $meta_vars as $key => $value ) {

            if( $value['show_edit'] == 'no' ) {

                $edit_ignore[] = $value['name'];

            }            
        }    

        $old_post = '';

        // don't check captcha on post edit
        if ( !isset( $_POST['post_id'] ) ) {

            // search if rs captcha is there
            if ( $this->search( $post_vars, 'input_type', 'really_simple_captcha' ) ) {

                $this->validate_rs_captcha();

            }

        }

        $is_update           = false;
        $post_author         = null;
        $default_post_author = tszf_get_option( 'default_post_owner', 'tszf_general', 1 );

        // Guest Stuffs: check for guest post
        if ( ! is_user_logged_in() ) {

            if ( $form_settings['guest_post'] == 'true' && $form_settings['guest_details'] == 'true' ) {

                $guest_name  = trim( $_POST['guest_name'] );
                $guest_email = trim( $_POST['guest_email'] );

                // is valid email?
                if ( ! is_email( $guest_email ) ) {

                    $this->send_error( __( 'Invalid email address.', 'gowatch' ) );

                }

                // check if the user email already exists
                $user = get_user_by( 'email', $guest_email );

                if ( $user ) {
                    // $post_author = $user->ID;
                    echo json_encode( array(
                        'success'     => false,
                        'error'       => __( "You already have an account in our site. Please login to continue.\n\nClicking 'OK' will redirect you to the login page and you will lost the form data.\nClick 'Cancel' to stay at this page.", 'gowatch'),
                        'type'        => 'login',
                        'redirect_to' => wp_login_url(  get_permalink( $_POST['page_id'] ) )
                    ) );

                    exit;

                } else {

                    // user not found, lets register him
                    // username from email address
                    $username  = $this->guess_username( $guest_email );
                    $user_pass = wp_generate_password( 12, false );

                    $errors = new WP_Error();
                    do_action( 'register_post', $username, $guest_email, $errors );

                    $user_id = wp_create_user( $username, $user_pass, $guest_email );

                    // if its a success and no errors found
                    if ( $user_id && !is_wp_error( $user_id ) ) {
                        update_user_option( $user_id, 'default_password_nag', true, true ); //Set up the Password change nag.

                        if ( class_exists( 'Theme_My_Login_Custom_Email') ) {
                            do_action( 'tml_new_user_registered', $user_id, $user_pass );
                        } else {
                            wp_send_new_user_notifications( $user_id );
                        }

                        // update display name to full name
                        wp_update_user( array('ID' => $user_id, 'display_name' => $guest_name) );

                        $post_author = $user_id;
                    } else {
                        //something went wrong creating the user, set post author to the default author
                        $post_author = $default_post_author;
                    }
                }

                // guest post is enabled and details are off
            } elseif ( $form_settings['guest_post'] == 'true' && $form_settings['guest_details'] == 'false' ) {
                $post_author = $default_post_author;
            }

            // the user must be logged in already
        } else {
            $post_author = get_current_user_id();
        }

        $postarr = array(
            'post_type'    => $form_settings['post_type'],
            'post_status'  => isset( $form_settings['post_status'] ) ? $form_settings['post_status'] : 'publish',
            'post_author'  => $post_author,
            'post_title'   => isset( $_POST['post_title']   ) ? trim( $_POST['post_title']   ) : '',
            'post_content' => isset( $_POST['post_content'] ) ? trim( $_POST['post_content'] ) : '',
            'post_excerpt' => isset( $_POST['post_excerpt'] ) ? trim( $_POST['post_excerpt'] ) : '',
        );

        //if date is set and assigned as publish date
        if ( isset ( $_POST['tszf_is_publish_time'] ) ) {

            if ( isset ( $_POST[$_POST['tszf_is_publish_time']] ) && !empty ( $_POST[$_POST['tszf_is_publish_time']] ) ) {
                $postarr['post_date'] = date( 'Y-m-d H:i:s', strtotime( str_replace( array(':','/'), '-', $_POST[$_POST['tszf_is_publish_time']]) ) );
            }

        }

        if ( isset( $_POST['category'] ) ) {

            $category = $_POST['category'];

            $postarr['post_category'] = is_array( $category ) ? $category : array($category);

            if ( !is_array( $category ) && is_string( $category ) ) {

                $category_strings = explode( ',', $category);

                $cat_ids = array();

                foreach ( $category_strings as $key => $each_cat_string ) {

                    $cat_ids[] = get_cat_ID( trim( $each_cat_string ) );
                    $postarr['post_category'] = $cat_ids;

                }

            }

        }

        if ( isset( $_POST['tags'] ) ) {

            $postarr['tags_input'] = explode( ',', $_POST['tags'] );

        }

        // if post_id is passed, we update the post
        if ( isset( $_POST['post_id'] ) ) {

            $old_post = get_post( $_POST['post_id'], ARRAY_A );

            // Write old psot values if field is ignored on edit.
            foreach ( $edit_ignore as $ignored ) {

                if( in_array( $ignored , $postarr ) || array_key_exists( $ignored, $postarr ) ) {

                    $postarr[ $ignored ] = $old_post[ $ignored ];

                } 
            }            

            // Filter meta fields, update only ones that are visible on edit.
            $meta_vars = self::filter_meta_vars_edit( $meta_vars );

            $is_update                 = true;
            $postarr['ID']             = $_POST['post_id'];
            $postarr['post_date']      = $_POST['post_date'];
            $postarr['comment_status'] = $_POST['comment_status'];
            $postarr['post_author']    = $_POST['post_author'];
            $postarr['post_parent']    = get_post_field( 'post_parent', $_POST['post_id'] );            

            if ( $form_settings['edit_post_status'] == '_nochange') {

                $postarr['post_status'] = get_post_field( 'post_status', $_POST['post_id'] );

            } else {

                $postarr['post_status'] = $form_settings['edit_post_status'];

            }


        } else {

            if ( isset( $form_settings['comment_status'] ) ) {

                $postarr['comment_status'] = $form_settings['comment_status'];

            }

        }

        // check the form status, it might be already a draft
        // in that case, it already has the post_id field
        // so, tszf's add post action/filters won't work for new posts
        if ( isset( $_POST['tszf_form_status'] ) && $_POST['tszf_form_status'] == 'new' ) {
            $is_update = false;
        }

        // set default post category if it's not been set yet and if post type supports
        if ( !isset( $postarr['post_category'] ) && isset( $form_settings['default_cat'] ) && is_object_in_taxonomy( $form_settings['post_type'], 'category' ) ) {
            $postarr['post_category'] = array( $form_settings['default_cat'] );
        }

        // validation filter
        if ( $is_update ) {

            $error = apply_filters( 'tszf_update_post_validate', '' );

        } else {

            $error = apply_filters( 'tszf_add_post_validate', '' );

        }

        if ( ! empty( $error ) ) {

            $this->send_error( $error );

        }

        // ############ It's Time to Save the World ###############
        if ( $is_update ) {

            $postarr = apply_filters( 'tszf_update_post_args', $postarr, $form_id, $form_settings, $form_vars );

        } else {

            $postarr = apply_filters( 'tszf_add_post_args', $postarr, $form_id, $form_settings, $form_vars );

        }

        if($is_update == false) {
            $post_slug = self::generate_slug();

            // after we will need to check if this is unique slug

            $postarr['post_name'] = $post_slug;
        }

        $post_id = wp_insert_post( $postarr );

        if ( $post_id ) {

            self::update_post_meta( $meta_vars, $post_id );

            // set the post form_id for later usage
            update_post_meta( $post_id, self::$config_id, $form_id );

            // save post formats if have any
            if ( isset( $form_settings['post_format'] ) && $form_settings['post_format'] != '0' ) {
                if ( post_type_supports( $form_settings['post_type'], 'post-formats' ) ) {
                    set_post_format( $post_id, $form_settings['post_format'] );
                }
            }

            // find our if any images in post content and associate them
            if ( !empty( $postarr['post_content'] ) ) {

                $dom = new DOMDocument();

                @$dom->loadHTML( $postarr['post_content'] );

                $images = $dom->getElementsByTagName( 'img' );

                if ( $images->length ) {

                    foreach ($images as $img) {

                        $url           = $img->getAttribute( 'src' );
                        $url           = str_replace(array('"', "'", "\\"), '', $url);
                        $attachment_id = tszf_get_attachment_id_from_url( $url );

                        if ( $attachment_id ) {

                            tszf_associate_attachment( $attachment_id, $post_id );

                        }

                    }
                }
            }

            // save any custom taxonomies
            $woo_attr = array();

            foreach ($taxonomy_vars as $taxonomy) {
                if ( isset( $_POST[$taxonomy['name']] ) ) {

                    if ( is_object_in_taxonomy( $form_settings['post_type'], $taxonomy['name'] ) ) {
                        $tax = $_POST[$taxonomy['name']];

                        // if it's not an array, make it one
                        if ( !is_array( $tax ) ) {
                            $tax = array($tax);
                        }

                        if ( $taxonomy['type'] == 'text' ) {

                            $hierarchical = array_map( 'trim', array_map( 'strip_tags', explode( ',', $_POST[$taxonomy['name']] ) ) );

                            wp_set_object_terms( $post_id, $hierarchical, $taxonomy['name'] );

                            // woocommerce check
                            if ( isset( $taxonomy['woo_attr']) && $taxonomy['woo_attr'] == 'yes' && !empty( $_POST[$taxonomy['name']] ) ) {
                                $woo_attr[sanitize_title( $taxonomy['name'] )] = $this->woo_attribute( $taxonomy );
                            }

                        } else {

                            if ( is_taxonomy_hierarchical( $taxonomy['name'] ) ) {
                                wp_set_post_terms( $post_id, $_POST[$taxonomy['name']], $taxonomy['name'] );

                                // woocommerce check
                                if ( isset( $taxonomy['woo_attr']) && $taxonomy['woo_attr'] == 'yes' && !empty( $_POST[$taxonomy['name']] ) ) {
                                    $woo_attr[sanitize_title( $taxonomy['name'] )] = $this->woo_attribute( $taxonomy );
                                }
                            } else {
                                if ( $tax ) {
                                    $non_hierarchical = array();

                                    foreach ($tax as $value) {
                                        $term = get_term_by( 'id', $value, $taxonomy['name'] );
                                        if ( $term && !is_wp_error( $term ) ) {
                                            $non_hierarchical[] = $term->name;
                                        }
                                    }

                                    wp_set_post_terms( $post_id, $non_hierarchical, $taxonomy['name'] );
                                }
                            } // hierarchical
                        } // is text

                    } // is object tax
                } // isset tax
            }

            // if a woocommerce attribute
            if ( $woo_attr ) {
                update_post_meta($post_id, '_product_attributes', $woo_attr);
            }

            if ( $is_update ) {

                // plugin API to extend the functionality
                do_action( 'tszf_edit_post_after_update', $post_id, $form_id, $form_settings, $form_vars );

                //send mail notification
                if ( isset( $form_settings['notification'] ) && $form_settings['notification']['edit'] == 'on' ) {
                    $mail_body = $this->prepare_mail_body( $form_settings['notification']['edit_body'], $post_author, $post_id );
                    wp_mail( $form_settings['notification']['edit_to'], $form_settings['notification']['edit_subject'], $mail_body );
                }
            } else {

                // plugin API to extend the functionality
                do_action( 'tszf_add_post_after_insert', $post_id, $form_id, $form_settings, $form_vars );

                // send mail notification
                if ( isset( $form_settings['notification'] ) && $form_settings['notification']['new'] == 'on' ) {
                    $mail_body = $this->prepare_mail_body( $form_settings['notification']['new_body'], $post_author, $post_id );
                    wp_mail( $form_settings['notification']['new_to'], $form_settings['notification']['new_subject'], $mail_body );
                }
            }

            //redirect URL
            $show_message = false;
            $redirect_to = false;

            if ( $is_update ) {
                if ( $form_settings['edit_redirect_to'] == 'page' ) {
                    $redirect_to = get_permalink( $form_settings['edit_page_id'] );

                } elseif ( $form_settings['edit_redirect_to'] == 'url' ) {
                    $redirect_to = $form_settings['edit_url'];

                } elseif ( $form_settings['edit_redirect_to'] == 'same' ) {
                    $redirect_to = add_query_arg( array(
                            'pid'      => $post_id,
                            '_wpnonce' => wp_create_nonce('tszf_edit'),
                            'msg'      => 'post_updated'
                        ), get_permalink( $_POST['page_id'] )
                    );
                } else {
                    $redirect_to = get_permalink( $post_id );
                }

            } else {
                if ( $form_settings['redirect_to'] == 'page' ) {
                    $redirect_to = get_permalink( $form_settings['page_id'] );
                } elseif ( $form_settings['redirect_to'] == 'url' ) {
                    $redirect_to = $form_settings['url'];
                } elseif ( $form_settings['redirect_to'] == 'same' ) {
                    $show_message = true;
                } else {
                    $redirect_to = get_permalink( $post_id );
                }
            }

            // send the response
            $response = array(
                'success'      => true,
                'redirect_to'  => $redirect_to,
                'show_message' => $show_message,
                'message'      => $form_settings['message']
            );

            if ( $is_update ) {

                $response = apply_filters( 'tszf_edit_post_redirect', $response, $post_id, $form_id, $form_settings );

            } else {

                $response = apply_filters( 'tszf_add_post_redirect', $response, $post_id, $form_id, $form_settings );

            }

            if ( function_exists('tszf_custom_post_submit_response') ) {
                $response = tszf_custom_post_submit_response($post_id);
            }

            tszf_clear_buffer();

            if($is_update == false) {
                $upload_data_type = $_POST['upload_data_type'];

                if($upload_data_type == 'Images for photogrammetry processing') {
                    $asset_type = 'polygon-mesh';
                }
                else
                    $asset_type = $_POST['asset_type'];

                $asset_type = self::convert_asset_type_from_gowatch_to_edd6($asset_type);
                $attachment_id = $_POST['tszf_files']['upload_asset'][0];

                self::set_default_thumbnail_of_being_processed_asset($post_id, $postarr['post_name']);
                self::start_upload_to_s3_and_tiling($post_id, $attachment_id, $postarr['post_name'], $upload_data_type, $asset_type);
            }

            $password = isset( $_POST['asset_view_password'] ) ? $_POST['asset_view_password'] : '';

            if($password != '') {
                wp_update_post( array(
                        'ID' => $post_id,
                        'post_password' => $password )
                );
            }

            echo json_encode( $response );
            exit;
        }

        $this->send_error( __( 'Something went wrong', 'gowatch' ) );
    }


    /**
     * Remove meta fields that are hidden on edit post so the post will not update their values.
     * @param array $meta_vars contains all custom fields for form.
     * @return arrau filtered $meta_vars
     */
    function filter_meta_vars_edit( $meta_vars )
    {
        
        $tab_started = false;
        $hide_tab_content = false;

        foreach ( $meta_vars as $key => $meta_var ) {

            if( $meta_var['show_edit'] === 'no' ) {

                unset( $meta_vars[ $key ] );

            }    

            /*
             * For tabbed content:
             * 1. If is tab container start and set to hide
             *      => Hide all items until 'tab_end' is met.
             * 2. If is new tab start
             *      => Hide items inside this tab until next 'new_tab' or 'end' is met.
             */    

             if( $meta_var['input_type'] == 'tab_content' && $meta_var['action'] == 'start' || $meta_var['action'] == 'new' ) {

                $tab_started = true;    

                if( $meta_var['show_edit'] == 'no' )  {

                    $hide_tab_content = true;

                }

             } elseif( $meta_var['input_type'] == 'tab_content' && $meta_var['action'] == 'end' ) {

                $tab_started = false;
                $hide_tab_content = false;

             }

             if( $tab_started && $hide_tab_content ) {

                unset( $meta_vars[ $key ] );

             }

            // if( $meta_var )
        }

        return $meta_vars;
    }


    /**
     * this will embed media to the editor
     */
    function make_media_embed_code(){
        if ( $embed_code = wp_oembed_get( $_POST['content'] ) ) {
            echo airkit_var_sanitize( $embed_code, 'true' );
        } else {
            echo '';
        }

        exit;
    }

    function draft_post() {
        check_ajax_referer( 'tszf_form_add' );

        @header( 'Content-Type: application/json; charset=' . get_option( 'blog_charset' ) );

        $form_id = isset( $_POST['form_id'] ) ? intval( $_POST['form_id'] ) : 0;
        $form_vars = $this->get_input_fields( $form_id );
        $form_settings = tszf_get_form_settings( $form_id );

        list( $post_vars, $taxonomy_vars, $meta_vars ) = $form_vars;

        // echo json_encode( $_POST );
        // print_r( $post_vars );
        // print_r( $taxonomy_vars );
        // print_r( $meta_vars );

        $postarr = array(
            'post_type'    => $form_settings['post_type'],
            'post_status'  => 'draft',
            'post_author'  => get_current_user_id(),
            'post_title'   => isset( $_POST['post_title'] ) ? trim( $_POST['post_title'] ) : '',
            'post_content' => isset( $_POST['post_content'] ) ? trim( $_POST['post_content'] ) : '',
            'post_excerpt' => isset( $_POST['post_excerpt'] ) ? trim( $_POST['post_excerpt'] ) : '',
        );

        if ( isset( $_POST['category'] ) ) {
            $category = $_POST['category'];
            $postarr['post_category'] = is_array( $category ) ? $category : array($category);
        }

        if ( isset( $_POST['tags'] ) ) {
            $postarr['tags_input'] = explode( ',', $_POST['tags'] );
        }

        // if post_id is passed, we update the post
        if ( isset( $_POST['post_id'] ) ) {
            $is_update = true;
            $postarr['ID'] = $_POST['post_id'];
            $postarr['comment_status'] = 'open';
        }

        $post_id = wp_insert_post( $postarr );

        if ( $post_id ) {
            self::update_post_meta($meta_vars, $post_id);

            // set the post form_id for later usage
            update_post_meta( $post_id, self::$config_id, $form_id );

            // save post formats if have any
            if ( isset( $form_settings['post_format'] ) && $form_settings['post_format'] != '0' ) {
                if ( post_type_supports( $form_settings['post_type'], 'post-formats' ) ) {
                    set_post_format( $post_id, $form_settings['post_format'] );
                }
            }

            // save any custom taxonomies
            foreach ($taxonomy_vars as $taxonomy) {
                if ( isset( $_POST[$taxonomy['name']] ) ) {

                    if ( is_object_in_taxonomy( $form_settings['post_type'], $taxonomy['name'] ) ) {
                        $tax = $_POST[$taxonomy['name']];

                        // if it's not an array, make it one
                        if ( !is_array( $tax ) ) {
                            $tax = array($tax);
                        }

                        wp_set_post_terms( $post_id, $_POST[$taxonomy['name']], $taxonomy['name'] );
                    }
                }
            }
        }

        //used to add code to run when the post is going to draft
        do_action( 'tszf_draft_post_after_insert', $post_id, $form_id, $form_settings, $form_vars );


        tszf_clear_buffer();

        echo json_encode( array(
            'post_id'        => $post_id,
            'action'         => $_POST['action'],
            'date'           => current_time( 'mysql' ),
            'post_author'    => get_current_user_id(),
            'comment_status' => get_option('default_comment_status'),
            'url'            => add_query_arg( 'preview', 'true', get_permalink( $post_id)  )
        ) );

        exit;
    }

    public static function update_post_meta( $meta_vars, $post_id ) {

        // prepare the meta vars
        list( $meta_key_value, $multi_repeated, $files ) = self::prepare_meta_fields( $meta_vars );

        // set featured image if there's any
        if ( isset( $_POST['tszf_files']['featured_image'] ) ) {
            $attachment_id = $_POST['tszf_files']['featured_image'][0];

            tszf_associate_attachment( $attachment_id, $post_id );
            set_post_thumbnail( $post_id, $attachment_id );

            $file_data = isset( $_POST['tszf_files_data'][$attachment_id] ) ? $_POST['tszf_files_data'][$attachment_id] : false;
            if ( $file_data ) {
                wp_update_post( array(
                    'ID'           => $attachment_id,
                    'post_title'   => $file_data['title'],
                    'post_content' => $file_data['desc'],
                    'post_excerpt' => $file_data['caption'],
                ) );

                update_post_meta( $attachment_id, '_wp_attachment_image_alt', $file_data['title'] );
            }
        }

        // save all custom fields
        foreach ( $meta_key_value as $meta_key => $meta_value ) {
            update_post_meta( $post_id, $meta_key, $meta_value );
        }

        // save any multicolumn repeatable fields
        foreach ( $multi_repeated as $repeat_key => $repeat_value ) {
            // first, delete any previous repeatable fields
            delete_post_meta( $post_id, $repeat_key );

            // now add them
            foreach ( $repeat_value as $repeat_field ) {
                add_post_meta( $post_id, $repeat_key, $repeat_field );
            }
        }

        // save any files attached
        foreach ( $files as $file_input ) {
            // delete any previous value
            delete_post_meta( $post_id, $file_input['name'] );

            //to track how many files are being uploaded
            $file_numbers = 0;

            foreach ($file_input['value'] as $attachment_id) {

                //if file numbers are greated than allowed number, prevent it from being uploaded
                if( $file_numbers >= $file_input['count'] ){
                    wp_delete_attachment( $attachment_id );
                    continue;
                }

                tszf_associate_attachment( $attachment_id, $post_id );
                add_post_meta( $post_id, $file_input['name'], $attachment_id );

                // file title, caption, desc update
                $file_data = isset( $_POST['tszf_files_data'][$attachment_id] ) ? $_POST['tszf_files_data'][$attachment_id] : false;

                if ( $file_data ) {

                    wp_update_post( array(
                        'ID'           => $attachment_id,
                        'post_title'   => $file_data['title'],
                        'post_content' => $file_data['desc'],
                        'post_excerpt' => $file_data['caption'],
                    ) );

                    update_post_meta( $attachment_id, '_wp_attachment_image_alt', $file_data['title'] );
                }

                $file_numbers++;
            }
        }
    }

    function prepare_mail_body( $content, $user_id, $post_id ) {
        $user = get_user_by( 'id', $user_id );
        $post = get_post( $post_id );

        // var_dump($post);

        $post_field_search = array( '%post_title%', '%post_content%', '%post_excerpt%', '%tags%', '%category%',
            '%author%', '%author_email%', '%author_bio%', '%sitename%', '%siteurl%', '%permalink%', '%editlink%' );

        $post_field_replace = array(
            $post->post_title,
            $post->post_content,
            $post->post_excerpt,
            get_the_term_list( $post_id, 'post_tag', '', ', '),
            get_the_term_list( $post_id, 'category', '', ', '),
            $user->display_name,
            $user->user_email,
            ($user->description) ? $user->description : 'not available',
            get_bloginfo( 'name' ),
            home_url(),
            get_permalink( $post_id ),
            admin_url( 'post.php?action=edit&post=' . $post_id )
        );

        $content = str_replace( $post_field_search, $post_field_replace, $content );

        // custom fields
        preg_match_all( '/%custom_([\w-]*)\b%/', $content, $matches);
        list( $search, $replace ) = $matches;

        if ( $replace ) {
            foreach ($replace as $index => $meta_key ) {
                $value = get_post_meta( $post_id, $meta_key );
                $new_value = implode( '; ', $value );

                if( get_post_mime_type( (int)$new_value ) ) {
                    $original_value = wp_get_attachment_url( $new_value );
                } else {
                    $original_value = $new_value;
                }

                $content = str_replace( $search[$index], $original_value, $content );
            }
        }

        return $content;
    }

    function woo_attribute( $taxonomy ) {
        return array(
            'name'         => $taxonomy['name'],
            'value'        => $_POST[$taxonomy['name']],
            'is_visible'   => $taxonomy['woo_attr_vis'] == 'yes' ? 1 : 0,
            'is_variation' => 0,
            'is_taxonomy'  => 1
        );
    }

    static function generate_slug() {
        $slug_length = 10;
        $characters = '0123456789abcdefghijklmnopqrstuvwxyz';
        $charactersLength = strlen($characters);
        $post_slug = '';

        for ($i = 0; $i < $slug_length; $i++) {
            $post_slug .= $characters[rand(0, $charactersLength - 1)];
        }

        return $post_slug;
    }

    static function start_upload_to_s3_and_tiling($post_id, $attachment_id, $post_slug, $upload_data_type, $asset_model_type) {
        $attached_file = get_attached_file($attachment_id, false);

        // save uploaded file size
        $file_size = filesize($attached_file);

        update_post_meta( $post_id, 'uploaded_file_size', $file_size);

        if($attached_file == '') {
            wp_die("file for attachment id: " . $attachment_id . ' is invalid');
        }

        $user = get_userdata( get_current_user_id() );
        $user_nice_name = $user->user_nicename;

        $amazon_s3_options = get_option( 'amazon_s3_options' );

        $s3_access_id      = $amazon_s3_options['construkted-amazon-s3-access-key'];
        $s3_secret_key     = $amazon_s3_options['construkted-amazon-s3-secret-key'];
        $s3_bucket         = $amazon_s3_options['construkted-amazon-s3-bucket'];
        $schema = is_ssl() ? 'https' : 'http';

        // start process

        $command = '/usr/local/bin/php ';
        $script_path =  get_stylesheet_directory() . '/includes/frontend-submission/class/start-upload-s3-tiling-request.php';

        $command = $command . '"' . $script_path . '" ';
        $command = $command . '"' . $post_id . '" ';
        $command = $command . '"' . $post_slug . '" ';
        $command = $command . '"' . $user_nice_name . '" ';
        $command = $command . '"' . $upload_data_type . '" ';
        $command = $command . '"' . $asset_model_type . '" ';
        $command = $command . '"' . $attached_file . '" ';
        $command = $command . '"' . $s3_access_id . '" ';
        $command = $command . '"' . $s3_secret_key . '" ';
        $command = $command . '"' . $s3_bucket . '" ';
        $command = $command . '"' . $schema . '" ';
        $command = $command . '"' . $attachment_id . '"';
        $command = $command . " > /dev/null 2>/dev/null &";

        shell_exec($command);
    }

    static function set_default_thumbnail_of_being_processed_asset($post_id, $slug) {
        $thumbnailFileName = 'thumbnail_' . $slug . '.png';
        $wordpress_upload_dir = wp_upload_dir();
        $thumbnail_file_path = $wordpress_upload_dir['path'] . '/' . $thumbnailFileName;
        $orig_thumbnail_file_path = CONSTRUKTED_PATH . '/images/default_image-assetIsBeingProcessed-flat.png';

        $ret = copy($orig_thumbnail_file_path, $thumbnail_file_path);

        if($ret == false)
            wp_die('failed to copy image');

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

        $ret = update_post_meta( $post_id, '_thumbnail_id', $attachment_id );

        if($ret == false)
           wp_die('failed to update post meta!');
    }

    static function convert_asset_type_from_gowatch_to_edd6($asset_type) {
        if($asset_type == 'polygon-mesh')
            return 'Polygon Mesh';
        else if($asset_type == 'point-cloud')
            return 'Point Cloud';
        else if($asset_type == '3d-cad-model')
            return '3D CAD Model';
        else
            wp_die('unrecognized asset type: ' . $asset_type);
    }
}
