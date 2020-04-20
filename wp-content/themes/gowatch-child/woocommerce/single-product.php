<?php
/**
 * The Template for displaying all single products.
 *
 * Override this template by copying it to yourtheme/woocommerce/single-product.php
 *
 * @author 		WooThemes
 * @package 	WooCommerce/Templates
 * @version     4.4.0
 */

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

global $product;
if ( ! is_object( $product)) $product = wc_get_product( get_the_ID() );

get_header();

	
	/**
	 * woocommerce_before_main_content hook
	 *
	 * @hooked woocommerce_output_content_wrapper - 10 (outputs opening divs for the content)
	 * @hooked woocommerce_breadcrumb - 20
	 */
	do_action('woocommerce_before_main_content');

	$airkit_sidebar = airkit_Compilator::build_sidebar( 'product', $post->ID );

?>
	<?php do_action('woocommerce_main_breadcrumb'); ?>
	<div class="container">

		<?php if($product->get_type() != 'variable-subscription'): ?>
			<div class="row">
				<?php echo airkit_var_sanitize( $airkit_sidebar['left'], 'true' ); ?>
				<div id="primary" class="<?php echo esc_attr( $airkit_sidebar['content_class'] ); ?>">
					<?php while ( have_posts() ) : the_post(); ?>

						<?php wc_get_template_part( 'content', 'single-product' ); ?>

					<?php endwhile; // end of the loop. ?>
				</div>
				<?php

					echo airkit_var_sanitize( $airkit_sidebar['right'], 'true' );

				?>
			</div>
		<?php else: ?>
			<?php echo construkted_subscription_layout(); ?>
		<?php endif; ?>
	</div>
<?php
	
	do_action('woocommerce_after_main_content');

	get_footer();

?>