<?php
/**
 * The template for displaying Header Style 5
 *
 * @package WordPress
 * @subpackage goWatch
 * @since goWatch 1.0
 */

$menu_name = 'primary';
$locations = get_theme_mod( 'nav_menu_locations' );
$menu_id = isset($locations[ $menu_name ]) ? $locations[ $menu_name ] : '';
$menu = wp_get_nav_menu_object($menu_id);
$menu_slug = is_object($menu) ? $menu->slug : '';
$random_ID = airkit_rand_string();
$ajax_nonce = wp_create_nonce( 'ajax_airkit_search_live_results' );

$header_options = airkit_option_value('header_settings', 'options');
$class = '';

// Custom menu options
$menu_options = array(
	'styles' => 'sidebar',
	'bg-color' => '#fff',
	'bg-color-hover' => 'transparent',
	'text-color' => '#6b747d',
	'text-color-hover' => airkit_get_color('primary_color'),
	'submenu-bg-color' => '#FFF',
	'submenu-bg-color-hover' => '#f5f5f5',
	'submenu-text-color' => '#6b747d',
	'submenu-text-color-hover' => '#444444',
	'font-type' => 'std',
	'icons' => 'y',
	'description' => 'y',
	'text-align' => 'left',
	'add-search' => 'n',
	'submenu-alignment' => 'left',
	'menu-id' => $menu_slug,
	'columns' => 'cell-item',
);

if ( isset($header_options['header5_sticky']) && 'y' == $header_options['header5_sticky'] ) {
	$class = 'is-sticky';
}

echo '<h1 class="hidden">'. get_bloginfo('name') .'</h1>';
?>
<div class="airkit_header-style5 <?php echo esc_attr($class); ?>">
	<div class="container">
		<div class="row">
			<div class="airkit_table-content">
				<?php
					echo airkit_Compilator::menu_element( $menu_options );
					echo airkit_Compilator::logo_element( array('align' => 'text-left', 'columns' => 'cell-item') );
					echo airkit_Compilator::searchbox_element( array('style' => 'input', 'live_results' => 'y', 'align' => 'center', 'columns' => 'col-md-4 col-sm-4 cell-item') );
					echo construkted_Compilator::user_element( array('align' => 'right', 'columns' => 'col-md-4 col-sm-4 cell-item') );
				?>
			</div>
			<?php  ?>
		</div>
	</div>
</div>