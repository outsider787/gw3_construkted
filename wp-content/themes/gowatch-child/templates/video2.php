<?php
/**
 * The template for displaying video post
 *
 * @package WordPress
 * @subpackage goWatch
 * @since goWatch 1.0
 */

global $airkit_is_ajax_loading;

$airkit_video 			= '';
$button					= false;
$article_classes 		= array('ts-single-video');
$section_classes 		= array();
$figure_attributes 		= array();

$airkit_sidebar 		= airkit_Compilator::build_sidebar( 'single', $post->ID );
$airkit_content_width 	= airkit_Compilator::get_content_width( $airkit_sidebar['content_class'] );
$airkit_sidebar_position = airkit_has_sidebar( $post->ID );
$airkit_is_img 			= airkit_single_option( 'img' );
$airkit_img_src 		= wp_get_attachment_url( get_post_thumbnail_id( $post->ID ) );
$lazyload_enabled 		= airkit_option_value( 'general', 'enable_imagesloaded' );

$article_classes[] 		= $airkit_content_width;
$section_classes[] 		= 'sidebar-'.$airkit_sidebar_position;
$section_classes[] 		= $airkit_sidebar['content_class'];

$airkit_video_type 		= get_post_meta( $post->ID, 'video_type', true );
$airkit_external_video 	= get_post_meta( $post->ID, 'video_url', true );
$airkit_embedded_video 	= get_post_meta( $post->ID, 'video_embed', true );
$airkit_uploaded_video 	= get_post_meta( $post->ID, 'video_upload', true );

$playlist_ID 			= isset($_GET['playlist_ID']) ? $_GET['playlist_ID'] : 0;

if( airkit_option_value( 'single', 'video_content_limit' ) == 'n' || strlen( get_the_content() ) < 200 && count( wp_get_post_terms($post->ID, 'post_tag') ) < 10 ) {
	$content_size_class = 'full-content';
} else{
	$content_size_class = 'less-content';
}

if( 'external' === $airkit_video_type && !empty( $airkit_external_video ) ){
	$button = true;
} elseif( 'embedded' === $airkit_video_type && !empty( $airkit_embedded_video ) ){
	$button = true;
} elseif ( 'uploaded' === $airkit_video_type && !empty( $airkit_uploaded_video ) ) {
	$button = true;
}

/*
 * Get categories ['list', 'slugs', 'ids' ]
 */
$airkit_categories = airkit_PostMeta::categories( $post->ID, array( 'get-array' => 'y', 'single' => 'y' ) );	

// Add class if post has sidebar set
if ( $airkit_sidebar_position != 'none' ) {
	$article_classes[] = 'has-post-sidebar ';
}

$figure_attributes['class'][] = 'featured-image';
$figure_attributes['class'][] = 'video-style-2';
$figure_attributes['class'][] = 'video-style-2-custom';
$figure_attributes['class'][] = 'fullwidth-player';

if ( 'y' == airkit_option_value( 'single', 'article_progress' ) ) {
	$article_classes[] = 'article-progress-enabled';
}

$article_atts['class'] = get_post_class( $article_classes );
?>

<?php
	if( !post_password_required() ) {
		echo '<figure '. airkit_element_attributes( $figure_attributes, array(), $post->ID, false ) .'>';
			echo '<div class="video-figure-content is-extended">';
				echo '<div class="container-fluid">';
              		render_construkted_cesium_viewer();
				echo '</div>';

				if ( 'y' === airkit_option_value( 'general', 'enable_lightbox' ) && !$button ) {
					echo '<a href="' . esc_url( $airkit_img_src ) . '" data-fancybox="' . $post->ID . '">';
				}

				// echo get_the_post_thumbnail( $post->ID, 'gowatch_single');
				airkit_overlay_effect_type();

				if ( 'y' === airkit_option_value( 'general', 'enable_lightbox' ) && !$button ) {
					echo '</a>';
				}
			echo '</div>';

			render_construkted_side_bar();

		echo '</figure>';

		echo airkit_Compilator::playlist_panel($playlist_ID);
	}
?>

<div <?php airkit_element_attributes( array(), array('element' => 'post-row'), $post->ID ); ?>>

	<div class="container">
		<?php
			if ( 'y' == airkit_single_option( 'breadcrumbs' ) ) {

				echo '<div class="airkit_breadcrumbs breadcrumbs-single-post">' . airkit_breadcrumbs() . '</div>';

			}
		?>

		<?php
			if ( isset($airkit_is_ajax_loading) && true === $airkit_is_ajax_loading ) {
				if( airkit_option_value('advertising', 'ad_area_next_loaded') != '' ) {
					echo '<div class="text-center airkit_advertising-container">' . airkit_option_value('advertising', 'ad_area_next_loaded') . '</div>';
				}
			}

			if ( $airkit_sidebar_position !== 'none' ) {
				echo '<div class="row">'. airkit_var_sanitize( $airkit_sidebar['left'], 'true' ) .'<div class="'. implode(' ', $section_classes) .'">';
			}
		?>

		<article <?php airkit_element_attributes( $article_atts, array('element' => 'article', 'is-single' => true), $post->ID ) ?>>

			<?php airkit_progress_scroll(); ?>
			
			<header class="post-header">
				<?php
					echo airkit_PostMeta::categories( $post->ID, array( 'wrap-class' => 'post-categories entry-categories' ) );
					echo airkit_PostMeta::title( $post->ID, array( 'wrap' => 'h2', 'class' => 'post-title single-video-title', 'url' => 'n', 'single' => 'y' ) );
				?>
				<?php if ( 'y' == airkit_option_value('single', 'video_meta') && 'n' != airkit_single_option('views') ) : ?>
					<div class="entry-meta entry-meta-views">
						<span><?php esc_html_e('Views', 'gowatch') ?></span>
						<strong><?php airkit_get_views($post->ID) ?></strong>
					</div>
				<?php endif; ?>
			</header>

			<aside class="post-meta">
				<div class="post-meta-author">
					<?php
						$date_published = airkit_PostMeta::date( $post->ID, array('wrap' => 'span', 'prefix' => esc_html__('Published', 'gowatch') ) );
						if ( 'y' == airkit_option_value('single', 'video_meta') ) {
							echo airkit_PostMeta::author( $post->ID, array('wrap' => 'div', 'prefix' => '<span class="post-author-avatar">' . airkit_get_avatar( get_the_author_meta('ID'), 50 ) . '</span>', 'postfix' => $date_published ) );
						}
					?>
				</div>
                <div class="post-meta-actions">
                    <?php
                        echo html_for_asset_download_button( $post->ID, array( 'single' => 'y' ) );
                    ?>
                </div>
				<div class="post-meta-actions">
					<?php
						echo airkit_PostMeta::add_to_favorite( $post->ID, array( 'label' => true, 'single' => 'y' ) );
						echo airkit_PostMeta::add_to_playlist( $post->ID, array( 'label' => false, 'single' => 'y' ) );
						construkted_single_sharing( array('label' => 'y', 'tooltip-popover' => 'y') );
						if ( 'y' == airkit_option_value('single', 'video_meta') ) {
							echo airkit_PostMeta::rating( $post->ID, array( 'type' => 'form', 'wrap' => 'div' ) );
						}
					?>
				</div>
			</aside>

			<aside class="post-container">

				<div class="post-content <?php echo $content_size_class; ?>">
					<?php

						echo airkit_PostMeta::subtitle( $post->ID, array( 'single' => 'y' ) );

						do_action( 'airkit_above_single_content' );

						$content = apply_filters( 'the_content', get_the_content() );
						airkit_check_subscribers_only($content);

						do_action( 'airkit_below_single_content' );

						airkit_post_user_actions();
					?>
				</div>
				
				<?php if ( $content_size_class == 'less-content' ): ?>
					<div class="content-toggler"><span><em><?php echo esc_html__('Show more', 'gowatch') ?></em> <i class="icon-down"></i></span></div>
				<?php endif ?>

				<div class="post-footer">
				<?php 
					echo airkit_PostMeta::rating_single( $post->ID );

					if( !isset( $airkit_is_ajax_loading ) || false == $airkit_is_ajax_loading ) {
						airkit_PostMeta::single_pagination( $post->ID );
					}

					//  SOF Ad area 2 -->
					if( airkit_option_value('advertising','ad_area_2') != '' ) {
						echo '<div class="container airkit_advertising-container">' . airkit_option_value('advertising','ad_area_2') . '</div>';
					}
					// EOF Ad area 2 -->

					airkit_PostMeta::author_box( $post, array('single' => true) );

					//comments and relates posts should not be displayed when ajax loading
					if( !isset( $airkit_is_ajax_loading ) || false == $airkit_is_ajax_loading ) {

						comments_template( '', true );
						
						do_action( 'airkit_related_posts' );
						
					}
				?>
				</div>
			</aside>

			<?php echo airkit_PostMeta::add_to_playlist( $post->ID, array( 'show_modal' => 'y', 'single' => 'y' ) ); ?>

		</article>

		<?php
			if ( $airkit_sidebar_position !== 'none' ) {
				echo '</div>'. airkit_var_sanitize( $airkit_sidebar['right'], 'true' ) .'</div><!-- end .row -->';
			}
		?>
		
	</div>
</div>
