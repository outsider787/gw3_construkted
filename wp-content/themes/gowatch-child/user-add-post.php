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

<section id="main" class="ts-single-post add-new-page <?php echo ($action == 'edit') ? 'editing' : '' ?> ts-single-page airkit_frontend-forms">
	<div class="container">

		<?php
			// Get current user used storage
			$user_used_storage = getTotalUploadedFileGBSizeOfCurrentUser();

			// Get current user total storage
			$user_total_storage = getDiskQuotaOfCurrentUser();
		?>


		<?php if( $user_total_storage <= $user_used_storage ): ?>
			<div class="upload-notification">
				<i class="icon-attention"></i>
				<?php esc_html_e('You exceeded the disk quote available for your subscription. Please upgrade to a package with more disk space.', 'gowatch-child'); ?> <button class="button" onClick="window.location.href = '<?php echo get_the_permalink(construkted_subscription_product()); ?>';"><?php esc_html_e( 'Upgrade now', 'gowatch-child' ); ?></button>
			</div>
		<?php else: ?>
		
			<div class="row">
				<?php echo airkit_var_sanitize( $airkit_sidebar['left'], 'true' ); ?>
				<div class="<?php echo esc_attr( $airkit_sidebar['content_class'] ); ?>">
					<div id="content" role="main">
						
						<?php if( $action != 'edit' ): ?>
							<div class="api-verify">
								<?php echo construkted_preloader(); ?>
								<?php esc_html_e('Checking API, please wait...'); ?>
							</div>
						<?php endif; ?>
						<div class="add-new-contents <?php echo ($action != 'edit') ? 'hidden' : '' ?>">
							<?php
								// Render active form.
								if( 'submit' === $action ) {

									echo '<h1 class="page-title text-left">'. esc_html__( 'Add new asset', 'gowatch-child' ) .'</h1>';
									echo airkit_var_sanitize( $frontend_form->add_post_form_build( array( 'id' => $active_submit_form_id ) ), 'true' );

								} elseif( 'edit' === $action ) {

									echo '<h1 class="page-title text-left">'. esc_html__( 'Now editing:', 'gowatch-child' ) .' <a href="'. get_permalink( $edit_id ) .'" class="now-editing">'. get_the_title( $edit_id ) .'</a></h1>';
									echo airkit_var_sanitize( $frontend_form->edit_post_form_build( array() ), 'true' );

								}
							?>
						</div>
					</div>
				</div>
				<?php echo airkit_var_sanitize( $airkit_sidebar['right'], 'true' ); ?>
			</div>
		<?php endif; ?>
	</div>
</section>

<div class = "tszf-form-add-screen"></div>
<div class="form-waiting-spinner"></div>
<?php
get_footer(); 

