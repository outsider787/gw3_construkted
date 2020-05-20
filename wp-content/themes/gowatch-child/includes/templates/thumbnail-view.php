<?php
/**
 * Thumbnail view template
 */

// Declare variables

// if($post->post_status == 'private')
//     return;

// if($post->post_password != "")
//     return;

// $view_access = get_post_meta( $post->ID, 'view_access', true );

// if($view_access == 'private')
//     return;

// if($view_access == 'password')
//     return;

$options 			= airkit_Compilator::$options; // Get the options
$categories 		= airkit_PostMeta::categories( $post->ID, array( 'get-array' => 'y' ) ); //Get categories
$article_classes 	= array();
$columns_class		= array();
$title_position 	= isset( $options['title-position'] ) ? $options['title-position'] : 'below-image';
$i 					= isset( $options['i'] ) ? $options['i'] : '';
$scroll 			= isset($options['behavior']) && $options['behavior'] == 'scroll' ? 'scroll' : '';

$columns_class[] 	= airkit_Compilator::parent_effect( $options );

/* Get article columns by elements per row */
$columns_class[] = airkit_Compilator::get_column_class( $options['per-row'], $scroll );

//Show content on hover / always.
if( 'over-image' === $options['title-position'] ) {
	if( isset( $options['content-hover'] ) ) {
		$article_classes[] = $options['content-hover'];
	}
}

$article_atts['class'] = get_post_class( $article_classes );

/**
 * Open scroll container if needed.
 */

airkit_Compilator::open_scroll_container( airkit_Compilator::$options );

/*  
 * If small articles are disabled, display all posts as grid.
 * If small articles are enablerd, display first post as grid, all the following will be displayed as small posts. See 
 * @airkit_Compilator::get_small_posts() call below.
 */
if( 'n' === $options['small-posts']  || ( 'y' === $options['small-posts'] && $i == 1  ) ): ?>

<div class="item <?php echo trim(implode( ' ', $columns_class )); ?>" data-filter-by="<?php echo esc_attr( $categories['ids'] ); ?>">

	<article <?php airkit_element_attributes( $article_atts, array_merge( $options, array('element' => 'article') ), $post->ID ) ?>>

		<?php
			airkit_featured_image( $options );
			airkit_entry_content( $options, array( 'excerpt' ) );
		?>

	</article>
</div>

<?php endif; //is small posts enabled / disabled

/* 
 * Display all posts after first as small articles 
 */
airkit_Compilator::get_small_posts( $options );

/*
 * Close scroll container, if needed
 */
airkit_Compilator::close_scroll_container( airkit_Compilator::$options );

// Advertising
if( isset( $options['enable-ads'] ) && 'y' == $options['enable-ads'] ) {
	// set advertising type for this element
	airkit_Compilator::$options['ad-type'] = 'grid';
	// Show advertising
	airkit_advertising_loop( airkit_Compilator::$options );
	
}
