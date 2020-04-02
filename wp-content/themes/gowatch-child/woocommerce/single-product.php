<?php
/**
 * The Template for displaying all single products.
 *
 * Override this template by copying it to yourtheme/woocommerce/single-product.php
 *
 * @author 		WooThemes
 * @package 	WooCommerce/Templates
 * @version     3.8.0
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
			<div class="woocommerce">
				
				<?php 
					// Check if we are switching subcription
					if( isset($_GET['switch-subscription']) ) {
						$current_package = getDiskQuotaOfCurrentUser(wp_get_current_user()->ID);
					}

					function construkted_package_label($current_value, $package_value) {

						$upgrade_label   = esc_html__('Upgrade', 'gowatch-child');
						$downgrade_label = esc_html__('Downgrade', 'gowatch-child');
						$current_label   = esc_html__('Current', 'gowatch-child');

						if( $current_value < $package_value ) {
							$output = $upgrade_label;
						} elseif( $current_value > $package_value ) {
							$output = $downgrade_label;
						} else {
							$output = $current_label;

						}
						return $output;
					}

					do_action( 'woocommerce_before_single_product' );

				?>
				<h1 class="page-title text-center"><?php the_title(); ?></h1>
				<div class="flex-row" data-current="<?php echo $current_package; ?>">
				<?php
					$available_variations = $product->get_available_variations();
				    foreach ($available_variations as $key => $value) 
				    {
				    ?>
				        <div class="variation-column">
				        	<div class="variation-name"><?php echo $value['sku']; ?></div>
				        	<div class="variation-price"><?php echo $value['price_html']; ?></div>
				        	<div class="variation-specs"><?php echo $value['variation_description']; ?></div>
				        	<div class="variation-action" data-value="<?php echo $value['attributes']['attribute_disk_space'] ?>"><?php echo construkted_package_label($current_package, $value['attributes']['attribute_disk_space']); ?></div>
				        </div>
				    <?php }
				?>
				</div>
				<?php woocommerce_template_single_add_to_cart(); ?>
			</div>
		<?php endif; ?>
	</div>
<?php
	
	do_action('woocommerce_after_main_content');

	get_footer();

?>