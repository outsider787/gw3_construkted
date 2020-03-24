<?php

/**
 * Template Name: Front-end - Add new post
 */

$airkit_sidebar = airkit_Compilator::build_sidebar( 'page', get_the_ID() ); 


/*
 * If user is not logged in, redirect to Register /  Login page.
 */

if( !is_user_logged_in() ) {

	$user_registration_url = get_frontend_registration_url();

	wp_redirect( $user_registration_url );
	exit();

}

// Action submit / edit.

$action = 'submit';

if( ( isset( $_GET['action'] ) && $_GET['action'] == 'edit' ) || isset( $_GET['pid'] ) ) {

	$action = 'edit';

	$edit_id = $_GET['pid'];

}

// Get the ID of active frontend submission form.
$active_submit_form_id  = airkit_option_value( 'general', 'frontend_submission_form' );

// Create render_form instance.
$frontend_form =  new TSZF_Frontend_Form_Post();

get_header();

$airkit_breadcrumbs = get_post_meta( $post->ID, 'airkit_header_and_footer', true );

if ( isset( $airkit_breadcrumbs['breadcrumbs'] ) && $airkit_breadcrumbs['breadcrumbs'] == 0 && airkit_option_value( 'single', 'page_breadcrumbs' ) == 'y' && ! is_front_page() ) : ?>
	<div class="airkit_breadcrumbs breadcrumbs-single-post container">
		<?php echo airkit_breadcrumbs(); ?>
	</div>
<?php endif; ?>

<section id="main" class="ts-single-post add-new-page ts-single-page airkit_frontend-forms">
	<div class="container">
		<div class="row">
			<?php echo airkit_var_sanitize( $airkit_sidebar['left'], 'true' ); ?>
			<div class="<?php echo esc_attr( $airkit_sidebar['content_class'] ); ?>">
				<div id="content" role="main">	
					<?php
						// Render active form.
						if( 'submit' === $action ) {

							echo '<h1 class="page-title text-left">'. esc_html__( 'Add new post', 'gowatch' ) .'</h1>';
							echo airkit_var_sanitize( $frontend_form->add_post_form_build( array( 'id' => $active_submit_form_id ) ), 'true' );

						} elseif( 'edit' === $action ) {

							echo '<h1 class="page-title text-left">'. esc_html__( 'Now editing:', 'gowatch' ) .' <a href="'. get_permalink( $edit_id ) .'" class="now-editing">'. get_the_title( $edit_id ) .'</a></h1>';
							echo airkit_var_sanitize( $frontend_form->edit_post_form_build( array() ), 'true' );

						}
					?>
				</div>
			</div>
			<?php echo airkit_var_sanitize( $airkit_sidebar['right'], 'true' ); ?>
		</div>
	</div>
</section>

<div class = "tszf-form-add-screen"></div>
<div class="form-waiting-spinner"></div>
<?php
get_footer(); 

