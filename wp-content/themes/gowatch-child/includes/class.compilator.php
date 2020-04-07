<?php
/**
* This class is used for build a layout created in admin panel
*/
class construkted_Compilator
{
	public static $columns = array(
		1 => 'col-lg-1 col-md-1',
		2 => 'col-lg-2 col-md-2',
		3 => 'col-lg-3 col-md-3',
		4 => 'col-lg-4 col-md-4',
		5 => 'col-lg-5 col-md-5',
		6 => 'col-lg-6 col-md-6',
		7 => 'col-lg-7 col-md-7',
		8 => 'col-lg-8 col-md-8',
		9 => 'col-lg-9 col-md-9',
		10 => 'col-lg-10 col-md-10',
		11 => 'col-lg-11 col-md-11',
		12 => 'col-lg-12 col-md-12',
	);

	static $options;

	public static function builder_column_classes( $number = 12, $viewport = 'lg' ){
		return 'col-' . $viewport . '-' . $number;
	}

	public static function order_by($order_by = 'date', $args = array(), $featured = 'n')
	{
		$order_variants = array( 'date', 'comments', 'views', 'likes', 'start-date', 'rating' );

		$order_by = ( in_array( $order_by, $order_variants ) ) ? $order_by : 'date' ;

		if( $featured === 'y' ){

			$args['meta_query'] = array(
				array(
					'key' => 'featured',
					'value' => 'yes',
					'compare' => '=',
					),
				);

		}

		if( $order_by === 'comments' ){

			$args['orderby'] = 'comment_count';

		} elseif ( $order_by === 'views' ){

			$args['meta_key'] = 'airkit_views';
			$args['orderby']  = 'meta_value_num';

		} elseif ( $order_by === 'likes' ){

			$args['meta_key'] = 'airkit_likes';
			$args['orderby']  = 'meta_value_num';

		} elseif ( $order_by === 'date' ){

			$args['orderby'] = 'date';

		} elseif( $order_by == 'start-date' ){

			$args['meta_key'] = 'day';
			$args['orderby']  = 'meta_value_num';

		}  elseif( $order_by == 'rating' ){

			$touchrate = new TouchRate();
			$rating_args = array( 'posts_per_page' => $args['posts_per_page'], 'direction' => $args['order'] );

			$post_results = $touchrate->get_toprated_posts( $rating_args );
			$post_IDs = $touchrate->get_toprated_post_ids( $post_results );
			$args['post__in'] = $post_IDs;

		} 

		return $args;
	}

	public static function get_small_posts( $options = array() )
	{
		/*
		 * When small articles option is enabled, only the first post of the query will be displayed as in view, 
		 * All the following articles must be displayed as small articles
		 */

		// Defaults
		$options['small-posts'] = isset($options['small-posts']) ? $options['small-posts'] : 'n';

		if ( 'y' == $options['small-posts'] && $options['i'] > 1 ) {

			/*
  			 * Open small articles container when iterating to second post.
			 */
			if( $options['i'] == 2 ) {
				echo '<div class="small-articles-view small-articles-container replace-view">';
			}

			$options['element-type'] = 'small';

			self::$options = $options;

			get_template_part( 'includes/templates/small-articles-view' );	

			if( $options['i'] == $options['j'] ) {
				/*
 				 * Close small articles container when reaching end of the query.
				 */
				echo '</div>';

			}

		}

	}

	public static function get_single_related_posts( $post_ID = 0 )
	{
		$single_options = ( $o = get_option( 'gowatch_options' ) ) && ! empty( $o['single'] ) ? $o['single'] : array();
		$post_type = get_post_type( $post_ID );	
		$output = '';

		$args = array(
			'post__not_in'   => array( $post_ID ),
			'posts_per_page' => (int)$single_options['number_of_related_posts'],
			'post_type'    => $post_type,
		);

		if( 'thumbnail' === $single_options['related_posts_type'] ) {

			$title_position = $single_options['thumbnail-title-position'];

		} elseif( 'grid' === $single_options['related_posts_type'] ) {

			$title_position = isset( $single_options['grid-title-position'] ) ? $single_options['grid-title-position'] : 'title-below';

		} else {

			$title_position = '';
			
		}


		$options = array(
			'element-type'    => $single_options['related_posts_type'],
			'reveal-effect'   => 'none',
			'reveal-delay'    => 'none',
			'per-row'         => $single_options['related_posts_nr_of_columns'],
			'behavior'        => $single_options['related_posts_behavior'],
			'carousel-nav'	  => 'arrows',
			'carousel-autoplay'	=> 'false',
			'featimg'         => 'y',
			'title-position'  => $title_position,
			'excerpt'         => 'y',
			'small-posts'     => 'n',
			'meta'            => 'y',
			'gutter-space'    => '40',
		);

		if( 'big' === $single_options['related_posts_type'] ) {

			$options['image-position'] = $single_options['airkit_related_image_position'];
			$options['content-split']  = $single_options['airkit_related_content_split'];

		}


		$criteria = $single_options['related_posts_selection_criteria'];			

		if ( $criteria === 'by_tags' ) {

			$tag_id = wp_get_post_tags( $post_ID, array( 'fields' => 'ids' ) );

			if ( empty( $tag_id ) ) return;

			$args['tag__in'] = $tag_id;

		} else if ( $criteria === 'by_categs' ) {

			$term_list = wp_get_post_terms( $post_ID, self::get_tax( $post_type ), array( 'fields' => 'ids' ) );

			if ( is_wp_error( $term_list ) || empty( $term_list ) ) {

				return;
			}		

			$args['tax_query'] = array(
				'relation' => 'AND',
				array(
					'taxonomy' => self::get_tax( $post_type ),
					'field'    => 'id',
					'terms'    => $term_list,
					'operator' => 'IN'
				)
			);
		}

		$query = new WP_Query( $args );

		if ( $query->have_posts() ) {

			$output = self::view_articles( $options, $query );

		}

		return $output;

	}

	public static function get_single_featured_posts( $post_ID = 0 )
	{
		$single_options = ( $o = get_option( 'gowatch_options' ) ) && ! empty( $o['single'] ) ? $o['single'] : array();
		$post_type = get_post_type( $post_ID );
		$output = '';

		$args = array(
			'post__not_in'   => array( $post_ID ),
			'posts_per_page' => (int)$single_options['number_of_featured_posts'],
			'post_type'    	 => $post_type,
			'post_status'    => 'published',
            'order'          => 'DESC',
			'meta_query'	 => array(
				array(
					'key'		 => 'featured',
					'value'		 => 'yes',
					'compare' 	 => '='
				),
			)
		);

		if( 'thumbnail' === $single_options['featured_posts_type'] ) {

			$title_position = $single_options['featured_thumbnail-title-position'];

		} elseif( 'grid' === $single_options['featured_posts_type'] ) {

			$title_position = 'below-image';

		} else {

			$title_position = '';
			
		}


		$options = array(
			'element-type'    => $single_options['featured_posts_type'],
			'reveal-effect'   => 'none',
			'reveal-delay'    => 'none',
			'per-row'         => $single_options['featured_posts_nr_of_columns'],
			'behavior'        => $single_options['featured_posts_behavior'],
			'carousel-nav'	  => 'arrows',
			'carousel-autoplay'	=> 'false',
			'featimg'         => 'y',
			'title-position'  => $title_position,
			'excerpt'         => 'y',
			'small-posts'     => 'n',
			'meta'            => 'y',
			'gutter-space'    => '40',
		);

		$query = new WP_Query( $args );

		if ( $query->have_posts() ) {

			$output = self::view_articles( $options, $query );

		}

		return $output;

	}

	public static function get_single_same_category_posts( $post_ID = 0 )
	{
		$single_options 	= ( $o = get_option( 'gowatch_options' ) ) && ! empty( $o['single'] ) ? $o['single'] : array();
		$post_type 			= get_post_type( $post_ID );	
		$terms             	= wp_get_post_terms( $post_ID, self::get_tax( $post_type ) );
		$post_meta         	= get_post_meta( $post_ID, 'airkit_post_settings', true );
		$primary_category  	= isset($post_meta['primary_category']) ? $post_meta['primary_category'] : 'n';
		$output = '';

		$args = array(
			'post__not_in'   => array( $post_ID ),
			'posts_per_page' => (int)$single_options['number_of_same_category_posts'],
			'post_type'    => $post_type,
		);

		if(!is_array($terms)) return false;

		if ( 'n' != $primary_category ) {
		    $term_id = $primary_category;
		} else {
		    $term_id = $terms[0]->term_id;
		}

		$args['tax_query'] = array(
			'relation' => 'AND',
			array(
				'taxonomy' => self::get_tax( $post_type ),
				'field'    => 'id',
				'terms'    => $term_id,
				'operator' => 'IN'
			)
		);

		if( 'thumbnail' === $single_options['same_category_posts_type'] ) {

			$title_position = $single_options['same_category_thumbnail-title-position'];

		} elseif( 'grid' === $single_options['same_category_posts_type'] ) {

			$title_position = 'below-image';

		} else {

			$title_position = '';
			
		}


		$options = array(
			'element-type'    => $single_options['same_category_posts_type'],
			'reveal-effect'   => 'none',
			'reveal-delay'    => 'none',
			'per-row'         => $single_options['same_category_posts_nr_of_columns'],
			'behavior'        => $single_options['same_category_posts_behavior'],
			'carousel-nav'	  => 'arrows',
			'carousel-autoplay'	=> 'false',
			'featimg'         => 'y',
			'title-position'  => $title_position,
			'excerpt'         => 'y',
			'small-posts'     => 'n',
			'meta'            => 'y',
			'gutter-space'    => '40',
		);

		if( 'big' === $single_options['same_category_posts_type'] ) {

			$options['image-position'] = $single_options['airkit_same_category_image_position'];
			$options['content-split']  = $single_options['airkit_same_category_content_split'];

		}

		$query = new WP_Query( $args );

		if ( $query->have_posts() ) {

			$output = self::view_articles( $options, $query );

		}

		return $output;

	}

	public static function list_products_element( $options = array(), $post_ID = 0, $tags = array() ){
		
		$options['post-type'] = 'product';
		$options['featured'] = '';


		$ajax_load_more = ( isset($options['ajax-load-more'] ) && $options['ajax-load-more'] === true) ? true : false;

		if( !empty( $options['query'] ) ) {

			$query = $options['query'];

		} else {

			$args = self::query( $options );

			$query = new WP_Query( $args );

		}

		if ( $query->have_posts() ) {

			ob_start();
			ob_clean();

			self::$options = $options;

			while ( $query->have_posts() ) { $query->the_post();

				get_template_part('woocommerce/content-product');

			}

			$elements = ob_get_clean();

			wp_reset_postdata();
		}

		$args['options'] = $options;

		if( $ajax_load_more ) {

			return $elements;

		} else {

			return '
					<div class="woocommerce">
						<div class="product-view cols-by-'. $options['per-row'] .'">
							'. self::articles_behavior( $options, $elements ) .'
						</div>
						'. self::pagination( $query, $args ) .'
					</div>';

		}


	}

	public static function list_users_element( $options = array() )
	{

		$classes = $columns = array();
		$output = '';

		$args = array(
			'number'       	=> $options['posts-limit'],
			'count_total'  	=> false,
			'order'			=> 'DESC',
			'orderby'		=> 'ID',
		);

		$users = get_users($args);

		if ( 'most-posts' == $options['criteria'] ) {

			$args['orderby'] = 'post_count';
			$users = get_users($args);

		} elseif( 'most-liked' == $options['criteria'] ) {

			// Used to display rating criteria name in frontend.
			$criteria_key = ''; 
			// Will hold ordered / sorted array
			$sorted = [];
			// Float precision
			$precision = 0;

			foreach ($users as $user) {
				// Get user avg rating or total amount of received likes.
				global $wpdb;

				$criteria_key =  '<i class="icon-big-heart"></i>';

				$userQuery = $wpdb->prepare( "SELECT SUM(meta_value) 
										  		 FROM $wpdb->postmeta
												 WHERE meta_key  = 'airkit_likes'
												 	AND post_id
												 		IN (
												 			 SELECT ID FROM $wpdb->posts 
												 			 WHERE post_author  = %s 
												 			 	AND post_status = 'publish' )", 
											$user->ID);

				$criteria_value = $wpdb->get_var( $userQuery );
				// Create a field in user object for storing criteria value.
				$user->criteria_val = number_format( $criteria_value, $precision );

				$sorted[] = $user;
			}

			// Sort users by criteria_val (which can be rating average or number of likes ). DESC.
			usort($sorted, function($a, $b){

				return $a->criteria_val < $b->criteria_val;

			});

			// copy sorted array to users
			$users = $sorted;

		}		

		$classes[] = 'airkit_list-users clearfix';
		$classes[] = 'cols-by-' . $options['per-row'];
		$columns[] = self::get_column_class($options['per-row']);

		foreach ($users as $key => $user) {

			$criteria_output = '';

			$posts_count = count_user_posts( $user->ID, 'post' );

			if( isset( $user->criteria_val ) ){

				$criteria_output = '<span>' . $criteria_key . $user->criteria_val .'</span>';

			}

			$output .= '
				<article class="'. implode(' ', $columns) .'">
					<figure><a href="'. get_author_posts_url( $user->ID, $user->user_nicename ) .'">'. airkit_get_avatar( $user->ID, 150 ) .'</a></figure>
					<header>
						<h1><a href="'. get_author_posts_url( $user->ID, $user->user_nicename ) .'">'. $user->display_name .'</a></h1>
						<span>'. sprintf( _n( '%s post', '%s posts', $posts_count, 'gowatch' ), '<strong>' . number_format_i18n( $posts_count ) . '</strong>' ) .'</span>
						'. $criteria_output .'
					</header>
				</article>';

		}

		return '<div class="'. implode(' ', $classes) .'">' . $output . '</div>';

	}

	public static function get_splits($split1 = '1-3')
	{

		$split_variants = array(
			'1-3' => 'col-lg-4 col-md-4 col-sm-12',
			'1-2' => 'col-lg-6 col-md-6 col-sm-12',
			'3-4' => 'col-lg-8 col-md-8 col-sm-12'
			);

		$split1 = (array_key_exists($split1, $split_variants)) ?
		$split_variants[$split1] : 'col-lg-4 col-md-4 col-sm-12';

			// content split
		switch ($split1) {
			case 'col-lg-4 col-md-4 col-sm-12':
			$split2 = 'col-lg-8 col-md-8 col-sm-12';
			break;

			case 'col-lg-6 col-md-6 col-sm-12':
			$split2 = 'col-lg-6 col-md-6 col-sm-12';
			break;

			case 'col-lg-8 col-md-8 col-sm-12':
			$split2 = 'col-lg-4 col-md-4 col-sm-12';
			break;

			default:
			$split2 = 'col-lg-8 col-md-8 col-sm-12';
			break;
		}

		return array(
			'split1' => $split1,
			'split2' => $split2
			);
	}

	public static function get_column_class( $elements_per_row = 1, $behavior = 'normal' )
	{
		$class = 'col-lg-12 col-md-12';
		$class_xs = ' col-xs-12';

		$columns_logic = array(
			/* Pair: elements per row => number of columns reserved for each element */
			'1' => 12,
			'2' => 6,
			'3' => 4,
			'4' => 3,
			'6' => 2,
		);


		switch ($elements_per_row) {

			case '1':
				$class = 'col-lg-12 col-md-12';
			break;

			case '2':
				$class = 'col-lg-6 col-md-6';
			break;

			case '3':
				$class = 'col-lg-4 col-md-4';
			break;

			case '4':
				$class = 'col-lg-3 col-md-3';
			break;

			case '6':
				$class = 'col-lg-2 col-md-2';
			break;

			default:
				$class = 'col-lg-2 col-md-2';
			break;
		}

		/* For scroll or carousel behavior, we need to set same col-xs class as for lg & md to achieve floating */
		if( 'scroll' === $behavior || 'y' === $behavior ) {

			$class_xs = ' col-xs-' . $columns_logic[ $elements_per_row ];

		}

		$class .= $class_xs;

		return $class;
	}

	public static function view_articles( $options, $airkit_wp_query = null, $container = true )
	{
		$args = array();

		self::ads_update_total_posts( $options );

		if ( null === $airkit_wp_query ) {

			$args = self::query( $options );
			$query = new WP_Query( $args );
			$query->is_post_view = true;

		} else {
			$query = $airkit_wp_query;
			$args = $query->query_vars;
		}

		if ( $query->have_posts() ) {

			self::$options = $options;

			ob_start();
			ob_clean();

			self::$options['i'] = 1;
			self::$options['j'] = $query->post_count;
			self::$options['k'] = 1;
			
			self::$options['count'] = 0;
			self::$options['is-view-article'] = true;

			while ( $query->have_posts() ) { $query->the_post();

				$file = $options['element-type'];

				if ( 'list_view' == $options['element-type'] ) {
					$file = 'list';
				} elseif ( 'numbered_list_view' == $options['element-type'] ) {
					$file = 'numbered-list';
				}
				
				get_template_part( 'includes/templates/' . $file . '-view' );	

				self::$options['count']++;
			}

			$elements = ob_get_clean();

			wp_reset_postdata();

		} else {
			
			return airkit_no_results();
			
		}

		if ( ! $container ) {

			return $elements;

		} else {

			$args['options'] = $options;
			$next_prev_links = null === $airkit_wp_query ? self::pagination( $query, $args ) : self::archive_navigation( $args );

			return
				'<div ' . self::articles_classes( $options ) . self::articles_styling( $options ) . self::articles_attrs( $options ) . '>' .
					self::articles_behavior( $options, $elements ) .
				'</div>' .
				$next_prev_links;
		}
	}

	public static function playlists( $options, $airkit_wp_query = null, $container = true )
	{
		$args = array();

		if ( null === $airkit_wp_query ) {

			$args = self::query( $options );
			$query = new WP_Query( $args );

		} else {
			$query = $airkit_wp_query;
			$args = $query->query_vars;
		}

		if ( $query->have_posts() ) {

			self::$options = $options;

			ob_start();
			ob_clean();

			self::$options['i'] = 1;
			self::$options['j'] = $query->post_count;
			self::$options['k'] = 1;
			
			self::$options['count'] = 0;
			self::$options['is-view-article'] = true;

			while ( $query->have_posts() ) { $query->the_post();

				get_template_part( 'includes/templates/playlist' );	

				self::$options['count']++;
			}

			$elements = ob_get_clean();

			wp_reset_postdata();

		} else {
			
			return '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">' . esc_html__( 'Nothing Found', 'gowatch' ) . '</div>';
			
		}

		if ( ! $container ) {

			return  $elements;

		} else {

			$args['options'] = $options;
			$next_prev_links = null === $airkit_wp_query ? self::pagination( $query, $args ) : self::archive_navigation( $args );

			return
				'<div ' . self::articles_classes( $options ) . self::articles_styling( $options ) . self::articles_attrs( $options ) . '>' .
					self::articles_behavior( $options, $elements ) .
				'</div>' .
				$next_prev_links;
		}
	}

	public static function playlist_panel( $playlist_ID )
	{
		global $post;

		// Check url parameter
		if ( $playlist_ID == 0 )
			return;

		$output 	= '';
		$user_ID 	= get_current_user_id();
		$post_ids 	= get_post_meta( $playlist_ID, '_post_ids', true );
		$actions 	= get_user_meta( $user_ID, '_playlist_actions', true );
		$shuffle 	= 'false';
		$posts 		= array_reverse($post_ids);

		// fallback
		$actions 	= !empty($actions) ? $actions : array('repeat' => 'false', 'shuffle' => 'false');

		// Check shuffle action to prepare array
		if ( $actions['shuffle'] == 'true' ) {
			shuffle($posts);
		}

		// Check if playlist contains any posts added
		// or current post is part of the playlist
		if ( ! is_array($post_ids) || ! in_array($post->ID, $post_ids) )
			return;

		$output = '<aside class="playlist-panel">';
		$output .= '<h4 class="playlist-panel-title">'. get_the_title($playlist_ID) .'</h4>';
		$output .= '<div class="playlist-panel-actions">';
		$output .= '<span class="playlist-count"><i class="icon-list-add"></i> '. count($post_ids) .'</span>';
		$output .= '<button type="button" class="playlist-repeat'. ($actions['repeat'] == 'true' ? ' active' : '') .'" title="'. esc_html__('Repeat playlist', 'gowatch') .'" data-playlist-id="'. $playlist_ID .'" data-action-repeat="'. $actions['repeat'] .'"><i class="icon-recursive"></i></button>';
		$output .= '<button type="button" class="playlist-shuffle'. ($actions['shuffle'] == 'true' ? ' active' : '') .'" title="'. esc_html__('Shuffle playlist', 'gowatch') .'" data-playlist-id="'. $playlist_ID .'" data-action-shuffle="'. $actions['shuffle'] .'"><i class="icon-shuffle"></i></button>';
		$output .= '</div><!-- /.playlist-panel-actions -->';
		$output .= '<div class="playlist-panel-content">';
		$output .= '<div class="playlist-panel-carousel">';

		foreach ($posts as $key => $post_ID) {

			$redirect_url = add_query_arg( array('playlist_ID' => $playlist_ID), get_permalink($post_ID) );

			// Current post active
			if ( $post->ID == $post_ID ) {
				$output .= '<div class="active playlist-item">';
			} else {
				$output .= '<div class="playlist-item">';
			}

			$output .= '<figure>';
			$output .= '<a class="post-link" href="'. esc_url($redirect_url) .'" title="'. get_the_title($post_ID) .'"></a>';
			$output .= '<a href="'. esc_url($redirect_url) .'" title="'. get_the_title($post_ID) .'">'. get_the_post_thumbnail($post_ID, array(180, 120, true)) .'</a>';
			$output .= '<figcaption><h2 class="title"><a href="'. esc_url($redirect_url) .'" title="'. get_the_title($post_ID) .'">'. get_the_title($post_ID) .'</a></h2></figcaption>';
			$output .= '</figure>';
			$output .= '</div>';
		}

		$output .= '</div><!-- /.playlist-panel-carousel -->';
		$output .= '<ul class="carousel-nav">
						<li class="carousel-nav-left"><i class="icon-left"></i></li>
						<li class="carousel-nav-right"><i class="icon-right"></i></li>
					</ul>';
		$output .= '</div><!-- /.playlist-panel-content -->';
		$output .= '</aside>';

		return force_balance_tags($output);
	}

	/**
	 * Get image size from registered image sizes for post views
	 */
	public static function view_get_image_size( $options = array() )
	{

	    $image_size = 'full';

	    if ( isset( $options['element-type'] ) ) {

	        switch ( $options['element-type'] ) {
	            case 'grid':
	                $image_size = 'gowatch_grid';

	                if ( isset($options['behavior']) && 'masonry' == $options['behavior'] ) {
	                    $image_size = 'gowatch_grid_masonry';
	                }
	            break;

	            case 'small-articles':
	                $image_size = 'gowatch_small';
	            break;

	            case 'thumbnail':

		            $image_size = 'gowatch_grid';
	            	if ( isset($options['behavior']) && 'masonry' == $options['behavior'] ) {
	            	    $image_size = 'gowatch_grid_masonry';
	            	}
	            	
            	break;

	            case 'big':
	            case 'list_view':
	            case 'super':
	            case 'timeline':
	                $image_size = 'gowatch_wide';
	            case 'featured-area':
	            	if ( isset( $options['style'] ) ) {
		            	switch ( $options['style'] ) {
		            		case 'style-1':
		            			$image_size = 'gowatch_wide';
		            			break;
		            		
		            		default:
		            			$image_size = 'gowatch_grid';
		            			break;
		            	}
	            	}
	            break;

	            default:
	                $image_size = 'gowatch_grid';
	            break;

	        }
	        
	    }

	    return $image_size;
	    
	}


	/**
	 * Get image size from registered image sizes for post views
	 */
	public static function view_excerpt_length( $options = array() )
	{

	    $length = 'grid_excerpt';

	    if ( isset( $options['element-type'] ) ) {

	        switch ( $options['element-type'] ) {
	            case 'big':
	            	$length = 'bigpost_excerpt';
	            break;
	            
	            case 'super':
	                $length = 'super_view_excerpt';
	            break;
	            
	            case 'list_view':
	                $length = 'list_excerpt';
	            break;

	            case 'mosaic':
	                $length = 'featured_area_excerpt';
	            break;

	        }
	        
	    }

	    return $length;
	    
	}


	/**
	 * Get post views that has allowed post_thumbnail as a img element not as background image for figure
	 */
	public static function view_get_allowed_post_thumbnail( $options = array() )
	{

	    $allow = array('grid', 'category-grids', 'list_view', 'super', 'accordion', 'grease', 'playlist');

	    return $allow;
	    
	}


	/**
	 * Render attributes
	 */
	public static function render_atts($attributes = array()) {

	    $atts = '';

	    if ( !empty($attributes) ) {

	    	// Filter attributes
	    	$attributes = array_filter( $attributes );

	    	$i = 0;

	        foreach ($attributes as $key => $attr) {
	            
	            if ( is_array($attr) ) {

	            	// Filter attributes
			    	$attr = array_filter( $attr );

	                $atts .= $key . '="';

	                $i = 0;

	                foreach ($attr as $key => $sub_attr) {
	                    $atts .= '' . $sub_attr . ' ';

	                    // Is last loop, so we need to remove before/after empty spaces of attributes
	                    if ( $i == count($attr) - 1 ) {
	                    	$atts = trim($atts);
	                    }

	                    $i++;
	                }

	                // Inline CSS Filter
	                if ( 'style' === $key ) {
	                	$atts .= safecss_filter_attr($atts);
	                }

	                $atts .= '"';

	            } else {

	                if ( !is_numeric($key) ) {

	                	// Inline CSS Filter
	                	if ( 'style' === $key ) {
	                		$atts .= safecss_filter_attr($attr);
	                	}

	                    $atts .= ' ' . $key . '="' . $attr .'" ';

	                } else {

	                    $atts .= ' ' . $attr . ' ';

	                }

	                // Is last loop, so we need to remove before/after empty spaces of attributes
	            	if ( $i == count($attributes) - 1 ) {
	            		$atts = trim($atts);
	            	}

	            }

	            $i++;
	        }

	    }

	    return $atts;
	}

	public static function articles_classes( $options )
	{
		$classes = array( 'airkit_article-views' );

		if ( isset( $options['behavior'] ) && 'masonry' == $options['behavior'] ) {

			$classes[] = 'ts-masonry-container';
		}

		if ( isset( $options['behavior'] ) && 'scroll' == $options['behavior'] ) {

			$classes[] = 'horizontal-scroll';
		}

		if ( ! empty( $options['per-row'] ) ) {

			$classes[] = self::get_clear_class( $options['per-row'] );
		}

		/*
		 * Add gutter classes
		 */

		if ( isset( $options['gutter-space'] ) ) {

			$classes[] = 'airkit_gutter-' . $options['gutter-space'];
		}

		/*
		 * View has styling for border or background
		 */

		if ( isset( $options['styling'] ) && $options['styling'] != 'none' ) {

			$classes[] = 'airkit_styling-' . $options['styling'];
		}

		if ( 'mosaic' == $options['element-type'] ) {

			$classes[] = 'mosaic-' . $options['layout'];

			//gutter classes
			$classes[] = 'n' == $options['gutter'] ? 'mosaic-no-gutter' : 'mosaic-with-gutter';

			//scroll classes
			$classes[] = 'scroll' !== $options['behavior'] ? 'mosaic-no-scroll' : 'mosaic-scroll';
		}

		/*
		 * Tell us that animations are enabled for this view
		 */
		if( 'none' !== $options['reveal-effect'] ) {

			$classes[] = 'has-animations';

		}

		if( 'list_view' === $options['element-type'] ) {

			$classes[] = 'list-view';

		} elseif ( 'small-articles' === $options['element-type'] ) {

			$classes[] = 'small-articles-view small-articles-container';

		} elseif ( 'category' === $options['element-type'] ) {

			$classes[] = 'category-view category-view-' . $options['style'];

		} else {

			$classes[] =  $options['element-type'] . '-view';

		}

		$classes[] = self::classes( $options );

		$output = self::render_atts( array( 'class' => $classes ) );

		return $output;
	}

	public static function articles_styling( $options )
	{
		if ( ! isset( $options['styling'] ) || 'none' == $options['styling'] ) return;

		if ( 'bg-color' == $options['styling'] ) {

			$css = 'background-color:' . $options['bg-color'] . ';';

		} elseif( 'border' == $options['styling'] ) {

			$css = 'border: 2px solid ' . $options['border-color'] . ';';
		}

		return ' style="' . $css . '"';
	}

	public static function articles_behavior( $options, $elements )
	{
		if ( ! isset( $options['behavior'] ) || 'normal' == $options['behavior'] ) return $elements;

		if ( 'carousel' === $options['behavior'] ) {

			$arrows = '	<ul class="carousel-nav">
							<li class="carousel-nav-left icon-left">
								<span class="hidden_btn">' . esc_html__('prev','gowatch') . '</span>
							</li>
							<li class="carousel-nav-right icon-right">
								<span class="hidden_btn">' . esc_html__('next','gowatch') . '</span>
							</li>
						</ul>';

			if( 'dots' === $options['carousel-nav'] ) {
				$arrows = '';
			}

			$scroll_by = 'by-col';

			if( isset( $options['carousel-scroll'] ) ) {
				$scroll_by = $options['carousel-scroll'];
			}

			$per_row = isset( $options['per-row'] ) ? $options['per-row'] : 1;

			return
				'<div id="'. airkit_rand_string() .'" class="carousel-wrapper arrows-above" data-nav-type="' . $options['carousel-nav'] . '">
					'. $arrows .'
					<div class="carousel-overview">
						<div class="carousel-container" 
							 data-cols="'. $per_row .'" 
							 data-scroll="'. $scroll_by .'"
							 data-autoplay="'. $options['carousel-autoplay'] .'" >' .
							$elements .
						'</div>
					</div>
				</div>';

		} elseif ( 'scroll' === $options['behavior'] ) {

			return
				'<div class="scroll-view">
					<div class="row">' .
						$elements .
					'</div>
				</div>';

		} elseif ( 'filters' === $options['behavior'] ) {

			$tax = self::get_tax( $options['post-type'] );

			$per_row = 1;

			if( isset( $options['per-row'] ) ) {

				$per_row = $options['per-row'];

			}

			$clear = self::get_clear_class( $per_row );

			$tab_category_html = '<div class="filter-tabs ts-tab-container display-horizontal col-lg-12">
									<div class="ts-tabs-nav">
									<ul class="nav nav-tabs ts-select-by-category">';

			$tab_div_category = '';

			$tab_category_html  .= '<li class="active" data-filter="*"> <a href="#">'. esc_html__( 'All', 'gowatch' ) .'</a> </li>';

			foreach ( $options[ $tax ] as $key => $slug_category ) {

				$category = get_term_by('slug', $slug_category, $tax );

				if ( ! is_object( $category ) ) continue;

				$tab_category_html .= 	'<li data-filter="' . $category->term_id . '">
											<a href="#">' . $category->name . '</a>
										</li>';
			}

			$tab_category_html .= '</ul></div></div>';

			return $tab_category_html . '<div class="filters-container '. $clear .'">' .  $elements . '</div>';
		}

		return $elements;
	}

	static function articles_attrs( $options )
	{
		$attrs = array();

		/*
		 * Add animation delay attribute to section.
		 */
		if( 'none' !== $options['reveal-effect'] ) {

			$attrs['data-delay'] = esc_attr( $options['reveal-delay'] );

		}

		return self::render_atts( $attrs );
	}

	public static function get_clear_class( $elements_per_row = 1 )
	{

		switch ( $elements_per_row ) {
			case '1':
			return 'cols-by-1';
			break;

			case '2':
			return 'cols-by-2';
			break;

			case '3':
			return 'cols-by-3';
			break;

			case '4':
			return 'cols-by-4';
			break;

			case '6':
			return 'cols-by-6';
			break;

			default:
			return 'cols-by-1';
			break;
		}
	}


	/**
	 * Layout compilation starts from tist method
	 * @return string
	 */
	public static function run()
	{
		global $post;

		if ( post_password_required() ) {

			echo apply_filters( 'the_content', get_the_content() );

			return;
		}

		$template        = get_post_meta( $post->ID, 'ts_template', true);
		$sidebar_options = get_post_meta( $post->ID, 'airkit_sidebar', true);

		$sidebar = airkit_Compilator::build_sidebar( 'page', $post->ID );

		$content = self::build_content( $template );

		if( self::builder_is_enabled() ) {
			
			$sidebar['content_class'] = '';

		}

		$content = '<div id="primary" class="' . $sidebar['content_class'] . '"><div id="content" role="main">' . $content . '</div></div>';

		// Check if sidebar is set we apply the container part
		if ( ( ! empty( $sidebar['left'] ) || ! empty( $sidebar['right'] ) ) && ! self::builder_is_enabled() ) {

			$use_padding = '';

			if ( 'n' == airkit_option_value( 'styles', 'boxed_layout' ) ) {

				$use_padding = ' no-pad ';
			}

			$content_wrapper_start = '<div class="container' . $use_padding . '">';
			$content_wrapper_end = '</div>';

		} else {

			$content_wrapper_start = '';
			$content_wrapper_end = '';
		}

		echo '<div id="main" class="row">' . $content_wrapper_start . $content . $content_wrapper_end . '</div>';
	}

	public static function builder_is_enabled()
	{
		global $post;

		if ( is_object( $post ) && '1' === get_post_meta( @$post->ID, 'ts_use_template', true ) ) {

			return true;

		} else {

			return false;
		}
	}

	/**
	 * Building sidebars
	 * @param  string $sidebar_id
	 * @return string
	 */
	public static function build_sidebar( $page_type, $post_ID = null, $build = true )
	{
		$out = array(
			'left'          => '',
			'right'         => '',
			'content_class' => self::$columns[12]
		);

		// Don't build sidebar
		if ( ! $build ) {
			return $out;
		}

		if ( 'single' == $page_type || 'product' == $page_type  || 'page' === $page_type ) {

			$post_set = get_post_meta( $post_ID, 'airkit_sidebar', true );
		}

		$options = airkit_option_value( 'layout', $page_type );

		$position = 'none';

		if ( isset( $post_set['position'] ) && 'std' !== $post_set['position'] ) {
			$position = $post_set['position'];
		} elseif ( isset( $options['position'] ) ) {
			$position = $options['position'];
		}

		// If position is none, don't build sidebar
		if ( 'none' == $position ) {
			return $out;
		}

		$size = isset( $post_set['size'] ) && 'std' !== $post_set['size'] ? $post_set['size'] : $options['size'];
		$sidebar_id = isset( $post_set['id'] ) && 'std' !== $post_set['id'] ? $post_set['id'] : $options['id'];

		// Checks if a given sidebar is active (in use)
		if ( ! is_active_sidebar( $sidebar_id ) ) {
			return $out;
		}

		ob_start();
			dynamic_sidebar( $sidebar_id );
		$sidebar = ob_get_clean();

		if ( '1-3' == $size ) {

			$sidebar_class = self::$columns[4];
			$content_class = self::$columns[8];

		} elseif ( '1-4' == $size ) {

			$sidebar_class = self::$columns[3];
			$content_class = self::$columns[9];

		} else {

			$sidebar_class = self::$columns[3];
			$content_class = self::$columns[9];
		}

		// Add the sidebar position class
		$sidebar_class .= ' sidebar-is-' . $position;

		// Add sticky class for archive pages
		if ( is_archive() && airkit_option_value( 'layout', 'sticky_sidebar' ) == 'y' ) {
			$sidebar_class .= ' archive-sticky-sidebar ';
		}

		$sidebar_content = '<aside id="secondary" class="secondary text-left ' . $sidebar_class . '">' . $sidebar . '</aside>';

		if ( is_page() && self::builder_is_enabled() ) {

			$content_class = 'ts-page-with-layout-builder col-lg-12 col-md-12 col-sm-12 col-xs-12';
		}

		return array(
			'left'          => 'left' == $position ? $sidebar_content : '',
			'right'         => 'right' == $position ? $sidebar_content : '',
			'content_class' => $content_class
		);
	}

	/**
	 * Parsing layout elements
	 * @param  array $rows
	 * @return string
	 */
	public static function build_content($rows = array())
	{
		$compiled_rows = array();

		if ( ! is_array( $rows ) || empty( $rows ) ) return '';

		foreach ( $rows as $row_index => $row ) {

			// For predefined template
			if ( isset($row['build-type']) && ! is_null( $row['build-type'] ) && 'custom' !== $row['build-type'] ) {

				ob_start();
				    get_template_part( 'templates/' . $row['head'], $row['head-style'] );
				    $compiled_rows[] = ob_get_contents();
			    ob_end_clean();

			    break;
				
			}

			// Add additional row classes if needed
			$classes = array('site-section');
			$scroll_btn = '';
			$div_mask = '';
			$slider_mask = '';
			$row_video_bg = '';
			$attrs = '';
			$row_slider = '';
			$columns = $classSize = array();
			$row_set =  $row['settings'];

			if ( 'y' == $row_set['fullscreen'] ) {

				$classes[] = 'airkit_fullscreen-row';
			}

			if ( 'y' == $row_set['equal-height'] ) {

				$classes[] = 'airkit_equal-height';
			}

			if ( 'y' == $row_set['sticky'] ) {

				$classes[] = 'airkit_row-sticky';

				if( 'y' == $row_set['smart-sticky'] ) {

					$classes[] = 'airkit_smart-sticky';

				}
			}

			if ( 'y' == $row_set['box-shadow'] ) {

				$classes[] = 'airkit_section-with-box-shadow';
			}

			if ( 'y' == $row_set['expand'] ) {

				$classes[] = 'airkit_expanded-row';
			}

			if( !empty( $row_set['vertical-align'] ) ) {

				$classes[] = 'airkit_vertical-' . $row_set['vertical-align'];

			}

			if( !empty( $row_set['custom-classes'] ) ) {

				$classes[] = $row_set['custom-classes'];

			}

			//Add responsive classes.
			$classes[] = self::responsive_classes( $row_set );


			if ( ! empty( $row_set['bg-video-mp'] ) ) {

				$classes[] = 'has-video-bg';

				$row_video_bg =
					'<div class="video-background">
						<video autoplay loop poster="' . self::get_attachment_field( $row_set['bg-img'], 'url', 'full' ) . '" id="bgvid-'. airkit_rand_string('5') .'">
							<source src="' . self::get_attachment_field( $row_set['bg-video-webm'], 'video-url' ) . '" type="video/webm">
							<source src="' . self::get_attachment_field( $row_set['bg-video-mp'], 'video-url' ) . '" type="video/mp4">
						</video>
					</div>';
			}

			// If scroll down type is on
			if ( 'y' === $row_set['scroll-button'] ) {

				$classes[] = 'has-scroll-btn';
				$attrs .= ' data-scroll-btn="y"';

				$scroll_btn =
						'<div class="ts-scroll-down-btn">
							<a href="#" data-target="site-section" data-action="scroll">
								<i class="icon-mouse-scroll"></i>
							</a>
						</div>';
			}

			// If mask type is color
			if (  'y' == $row_set['mask'] ) {

				$classes[] = 'has-row-mask';

				/*
				 * IF slider background is enabled, row mask should be added to each slide.
				 */

				$div_mask .= '<div class="row-mask" style="background-color:' . $row_set['mask-color'] . ';"></div>';
				
			}

			$classes[] = self::parent_effect( $row_set );
			// If mask type is gradient
			if ( 'gradient' == $row_set['mask'] ) {

				$gradient_color = $row_set['mask-gradient-color'];
				$gradient_mode = $row_set['gradient-type'];
				$cssGradientMask = '';

				if ( $gradient_mode == 'radial' ) {

					$cssGradientMask .= '
					background: '.$row_set['mask-color'].';
					background: -moz-radial-gradient(center, ellipse cover,  '.$row_set['mask-color'].' 0%,  '.$gradient_color.' 0%,  '.$row_set['mask-color'].' 100%, '.$row_set['mask-color'].' 100%);
					background: -webkit-gradient(radial, center center, 0px, center center, 100%, color-stop(0%,'.$row_set['mask-color'].'), color-stop(0%, '.$gradient_color.'), color-stop(100%, '.$row_set['mask-color'].'), color-stop(100%,'.$row_set['mask-color'].'));
					background: -webkit-radial-gradient(center, ellipse cover,  '.$row_set['mask-color'].' 0%, '.$gradient_color.' 0%, '.$row_set['mask-color'].' 100%,'.$row_set['mask-color'].' 100%);
					background: -o-radial-gradient(center, ellipse cover,  '.$row_set['mask-color'].' 0%, '.$gradient_color.' 0%, '.$row_set['mask-color'].' 100%,'.$row_set['mask-color'].' 100%);
					background: -ms-radial-gradient(center, ellipse cover,  '.$row_set['mask-color'].' 0%, '.$gradient_color.' 0%, '.$row_set['mask-color'].' 100%,'.$row_set['mask-color'].' 100%);
					background: radial-gradient(ellipse at center,  '.$row_set['mask-color'].' 0%, '.$gradient_color.' 0%, '.$row_set['mask-color'].' 100%,'.$row_set['mask-color'].' 100%);';

				} elseif ( $gradient_mode == 'top-to-bottom' ) {

					$cssGradientMask .= '
					background: '. $row_set['mask-color'] .';
					background: -moz-linear-gradient(top, '. $row_set['mask-color'] .' 0%,  '. $gradient_color .' 0%, '. $row_set['mask-color'] .' 30%, '. $gradient_color .' 100%);
					background: -webkit-gradient(linear, top, bottom, color-stop(0%,'.$row_set['mask-color'].'), color-stop(0%, '.$gradient_color.'), color-stop(30%,'.$row_set['mask-color'].'), color-stop(100%,'.$gradient_color.'));
					background: -webkit-linear-gradient(top, '.$row_set['mask-color'].' 0%, ' . $gradient_color . ' 30%);
					background: -o-linear-gradient(top, '.$row_set['mask-color'].' 0%, ' . $row_set['mask-color'].' 30%,'.$gradient_color.' 100%);
					background: -ms-linear-gradient(top, '.$row_set['mask-color'].' 0%, ' . $row_set['mask-color'].' 30%,'.$gradient_color.' 100%);
					background: linear-gradient(to bottom, '.$row_set['mask-color'].' 0%,' . $row_set['mask-color'].' 30%,'.$gradient_color.' 100%);
					';

				} elseif ( $gradient_mode == 'left-to-right' ) {

					$cssGradientMask .= '
					background: '.$row_set['mask-color'].';
					background: -moz-linear-gradient(left, '.$row_set['mask-color'].' 0%,  '.$gradient_color.' 0%, '.$row_set['mask-color'].' 30%, '.$gradient_color.' 100%);
					background: -webkit-gradient(linear, left top, right top, color-stop(0%,'.$row_set['mask-color'].'), color-stop(0%, '.$gradient_color.'), color-stop(30%,'.$row_set['mask-color'].'), color-stop(100%,'.$gradient_color.'));
					background: -webkit-linear-gradient(left, '.$row_set['mask-color'].' 0%, ' . $gradient_color . ' 30%);
					background: -o-linear-gradient(left, '.$row_set['mask-color'].' 0%, ' . $row_set['mask-color'].' 30%,'.$gradient_color.' 100%);
					background: -ms-linear-gradient(left, '.$row_set['mask-color'].' 0%, ' . $row_set['mask-color'].' 30%,'.$gradient_color.' 100%);
					background: linear-gradient(to right, '.$row_set['mask-color'].' 0%,' . $row_set['mask-color'].' 30%,'.$gradient_color.' 100%);
					';

				} elseif ( $gradient_mode == 'corner-top' ) {

					$cssGradientMask .= '
					background: '.$row_set['mask-color'].';
					background: -moz-linear-gradient(-45deg, '.$row_set['mask-color'].' 0%, ' . $gradient_color . ' 100%);
					background: -webkit-gradient(linear, left top, right bottom, color-stop(0%,'.$row_set['mask-color'].'), color-stop(100%, '.$gradient_color.'));
					background: -webkit-linear-gradient(-45deg, '.$row_set['mask-color'].' 0%, ' . $gradient_color . ' 100%);
					background: -o-linear-gradient(-45deg, '.$row_set['mask-color'].' 0%,' . $gradient_color . ' 100%);
					background: -ms-linear-gradient(-45deg, '.$row_set['mask-color'].' 0%, ' . $gradient_color . ' 100%);
					background: linear-gradient(135deg, '.$row_set['mask-color'].' 0%, ' . $gradient_color . ' 100%);
					';

				} elseif ( $gradient_mode == 'corner-bottom' ) {

					$cssGradientMask .= '
					background: '.$row_set['mask-color'].';
					background: -moz-linear-gradient(45deg, '.$row_set['mask-color'].' 0%,  ' . $gradient_color . ' 100%);
					background: -webkit-gradient(linear, left bottom, right top, color-stop(47%, '.airkit_rgba_opacity($row_set['mask-color'], 1).'), color-stop(100%, '.$gradient_color.'));
					background: -webkit-linear-gradient(45deg, '.$row_set['mask-color'].' 0%,' . $gradient_color . ' 100%);
					background: -o-linear-gradient(45deg, '.$row_set['mask-color'].' 0%,' . $gradient_color . ' 100%);
					background: -ms-linear-gradient(45deg, '.$row_set['mask-color'].' 0%, ' . $gradient_color . ' 100%);
					background: linear-gradient(45deg, '.$row_set['mask-color'].' 0%, ' . $gradient_color . ' 100%);
					';

				}


				$classes[] = 'has-row-mask';
				$div_mask .= '<div class="row-mask" style="' . $cssGradientMask . '"></div>';

			}

			// check if slider is enabled
			if ( isset($row_set['slider-bg']) && 'y' == $row_set['slider-bg'] && $row_set['items'] != '' ) {

				$classes[] = 'has-row-slider';

				$row_slides = $row_set['items'];

				//move row mask to each slide
				$slider_mask = $div_mask;
				//remove mask to prevent from being added above slider.
				$div_mask = '';

				$slider_bg_attributes = '';

				$slider_arrows = '	<ul class="carousel-nav">
								<li class="carousel-nav-left icon-left-arrow">
									<span class="hidden_btn">' . esc_html__('prev','gowatch') . '</span>
								</li>
								<li class="carousel-nav-right icon-right-arrow">
									<span class="hidden_btn">' . esc_html__('next','gowatch') . '</span>
								</li>
							</ul>';

				if( isset( $row_set['slider-nav'] ) ) {

					$slider_bg_attributes .= ' data-nav-type="' . $row_set['slider-nav'] . '"';

					if( 'dots' === $row_set['slider-nav'] || 'none' === $row_set['slider-nav'] ) {

						$slider_arrows = '';
						
					}
				}

				if( isset( $row_set['slider-autoplay'] ) ) {

					$slider_bg_attributes .= ' data-autoplay="' . $row_set['slider-autoplay'] . '"';
				}

				$row_slider = '<div class="slider-is-row-bg" '. $slider_bg_attributes .'>
									'. $slider_arrows .'
									<ul class="row-bg-slides">';

				foreach ($row_slides as $key => $slide) {

					// Start the slide
					$slide['image'] = explode('|', $slide['image']);
					$row_slider .= '<li style="text-align:'. $slide['text-align'] .' ; color:'. $slide['text-color'] .';background-image: url(' . esc_url( wp_get_attachment_url( $slide['image'][0] ) ) .');">';

					// Add Row mask to slide

					$row_slider .= $slider_mask;

					// Add container class for slider content
					$row_slider .= '<div class="container">';
					
					// Add slider title
					if ( $slide['title'] != '' ) {

						$row_slider .= '<h2>' . esc_html($slide['title']) .'</h2>';
					}

					// Add slider text
					if ( $slide['text'] ) {

						$row_slider .= '<div class="slider-caption">' . esc_html($slide['text']) .'</div>';
					}

					// Add slider button 1
					if ( $slide['url1'] ) {

						$colors = 'style="background-color: ' . esc_html($slide['button-bg-color']) . ';border-color: ' . esc_html($slide['button-bg-color']) . ';color:' . esc_html($slide['text-color']) . '"';
						$mouseOut = 'backgroundColor=\'' . $slide['button-bg-color'] . '\';this.style.borderColor=\'' . $slide['button-bg-color'] . '\';this.style.color=\'' . $slide['text-color'] . '\'"';
						$mouseOver = 'backgroundColor=\'transparent\';this.style.borderColor=\'' . $slide['button-bg-color'] . '\';this.style.color=\'' . $slide['button-bg-color'] . '\'"';

						// Set the new styles to the button
						$row_slider .= '<a ' . $colors . ' onMouseOver="this.style.'. $mouseOver .' onMouseOut="this.style.'. $mouseOut .' href="' . esc_url($slide['url1']) . '" target="_blank" class="slider-button ts-button background-button">' . esc_html($slide['button1']) .'</a>';
					}

					// Add slider button 2
					if ( $slide['url2'] ) {

						$colors = 'style="background-color: transparent;border-color: ' . esc_html($slide['button-bg-color']) . ';color:' . esc_html($slide['button-bg-color']) . '"';
						$mouseOver = 'backgroundColor=\'' . $slide['button-bg-color'] . '\';this.style.borderColor=\'' . $slide['button-bg-color'] . '\';this.style.color=\'' . $slide['text-color'] . '\'"';
						$mouseOut = 'backgroundColor=\'transparent\';this.style.borderColor=\'' . $slide['button-bg-color'] . '\';this.style.color=\'' . $slide['button-bg-color'] . '\'"';

						$row_slider .= '<a ' . $colors . ' onMouseOver="this.style.'. $mouseOver .' onMouseOut="this.style.'. $mouseOut .' href="' . esc_url($slide['url2']) . '" target="_blank" class="slider-button ts-button outline-button">' . esc_html($slide['button2']) .'</a>';
					}

					// End of container
					$row_slider .= '</div>';

					// End of slide
					$row_slider .= '</li>';

					
				}
				$row_slider .= '</ul></div>';

			}			

			// Check if parallax is enabled
			if ( 'y' == $row_set['parallax'] ) {

				$attrs .= ' data-parallax="y"';
			}


			// Check if parallax images are enabled

			$parallax_images = '';
			if ( isset( $row_set['parallax-images'] ) && 'y' == $row_set['parallax-images'] ) {

				$classes[] = 'has-parallax-images';

				$parallax_slides = $row_set['parallax-images-items'];

				foreach ($parallax_slides as $key => $item) {

					if ( '' != $item['image'] ) {

						$item['image'] 		= self::get_attachment_field( $item['image'], 'url', 'full' );
						$item['speed'] 		= isset( $item['parallax-speed'] ) ? $item['parallax-speed'] : 1.5;
						$item['direction']  = isset( $item['parallax-direction'] ) ? $item['parallax-direction'] : 'vertical';

						$item['styles'] 	= 'style="left:' . $item['parallax-position-x'] . ';top:' . $item['parallax-position-y'] . ';"';

						$parallax_images .= '<img src="' . $item['image'] . '" ' . $item['styles'] . ' data-enllax-direction="' . $item['direction'] . '" data-enllax-ratio="' . $item['speed'] . '" data-enllax-type="foreground" class="airkit_image_parallax" />';
					}
					
				}
				
			}

			if ( ! empty( $row_set['name'] ) ) {

				$attrs .= ' id="airkit_' . sanitize_html_class( $row_set['name'] ) . '"';
			}

			$attrs .= self::row_settings( $row_set );

			if ( isset( $row['columns'] ) && is_array( $row['columns'] ) && ! empty( $row['columns'] ) ) {

				foreach ( $row['columns'] as $column_index => $column ) {

					$elements = '';

					if ( ! empty( $column['elements'] ) && is_array( $column['elements'] ) ) {

						foreach ( $column['elements'] as $element_id => $element ) {

							$elements .= self::compile_element( self::quotes( $element ), $row_set['reveal-effect'] );
						}
					}

					$idColumn = isset( $column['settings']['name'] ) && ! empty( $column['settings']['name'] ) ? ' id="ts_' . esc_attr( $column['settings']['name'] ) . '"' : '';

					$classSize['col-size'] = self::builder_column_classes( $column['settings']['size'], 'lg' );
					$classSize['col-size'] .= ' ' . self::builder_column_classes( $column['settings']['columns-medium'], 'md' );
					$classSize['col-size'] .= ' ' . self::builder_column_classes( $column['settings']['columns-small'], 'sm' );
					$classSize['col-size'] .= ' ' . self::builder_column_classes( $column['settings']['columns-xsmall'], 'xs' );

					// Add the column custom classes set by the user
					$classSize['col-size'] .= ' ' . self::classes( $column['settings'] );

					$columns[] = self::addStyleColumn( $idColumn, $classSize, $column['settings'], $elements );

				}
			}

			$compiled_rows[] =
							'<div' . (!empty($classes) ? ' class="'. trim( implode( ' ', $classes ) ) .'"' : '') . ' ' . $attrs . '>' .
								$row_video_bg .
								$row_slider .
								$div_mask .
								$scroll_btn .
								$parallax_images .
								( 'n' == $row_set['expand'] ? '<div class="container">' : '' ) .
									'<div class="row '. self::child_effect( $row_set ) .'">' .
										self::wrapp_carousel( $row_set['carousel'], implode( "\n", $columns ), $row_set ) .
									'</div>' .
								( 'n' == $row_set['expand'] ? '</div>' : '' ) .
							'</div>';

		}

		return implode( "\n", $compiled_rows );
	}

	/**
	 * Rendering style attribute for the row
	 * @param  array  $settings Row settings
	 * @return string
	 */
	public static function row_settings( $settings = array() )
	{

		$css = 'background-color: ' . $settings['bg-color'] . ';text-align: ' . $settings['text-align'] . ';';


		if ( 'y' == $settings['border-top'] ) {

			$css .= 'border-top: ' . $settings['border-top-width'] . 'px solid ' . $settings['border-top-color'] . ';';
		}

		if ( 'y' == $settings['border-bottom'] ) {

			$css .= 'border-bottom: ' . $settings['border-bottom-width'] . 'px solid ' . $settings['border-bottom-color'] . ';';
		}

		if ( 'y' == $settings['border-left'] ) {

			$css .= 'border-left: ' . $settings['border-left-width'] . 'px solid ' . $settings['border-left-color'] . ';';
		}

		if ( 'y' == $settings['border-right'] ) {

			$css .= 'border-right: ' . $settings['border-right-width'] . 'px solid ' . $settings['border-right-color'] . ';';
		}
		/* end style row border */

		if ( ! empty( $settings['bg-img'] ) ) {

			$css .= 'background-image: url('. esc_url( self::get_attachment_field( $settings['bg-img'], 'url', 'full' ) ) .');';


			$css .= 'background-position: ' . $settings['bg-x'] . ' ' . $settings['bg-y'] . ';';

			$css .= 'background-size:' . $settings['bg-size'] . ';';

			$css .= 'background-attachment: ' . $settings['bg-attachement'] . ';';

			$css .= 'background-repeat:' . $settings['bg-repeat'] . ';';
		}

		$css .= 'margin-top: ' . $settings['margin-top'] . 'px;';
		$css .= 'margin-bottom: ' . $settings['margin-bottom'] . 'px;';
		$css .= 'padding-top: ' . $settings['padding-top'] . 'px;';
		$css .= 'padding-bottom: ' . $settings['padding-bottom'] . 'px;';

		$css .= $settings['custom-css'];

		return 'style="' . $css . '"';
	}

static function classes( $settings )
{
	return ! empty( $settings['custom-classes'] ) ? ' ' . $settings['custom-classes'] : '';
}

static function wrapp_carousel( $enable, $content, $options = array() )
{
	$classes = isset( $options['class'] ) ? $options['class'] : '';

	if ( 'y' == $enable ) {


		$arrows = '	<ul class="carousel-nav">
						<li class="carousel-nav-left icon-left">
							<span class="hidden_btn">' . esc_html__('prev','gowatch') . '</span>
						</li>
						<li class="carousel-nav-right icon-right">
							<span class="hidden_btn">' . esc_html__('next','gowatch') . '</span>
						</li>
					</ul>';


		if( 'dots' === $options['carousel-nav'] || 'none' === $options['carousel-nav'] ) {

			$arrows = '';
			
		}

		$scroll_by = 'by-col';

		if( isset( $options['carousel-scroll'] ) ) {

			$scroll_by = $options['carousel-scroll'];

		}

		$adaptive = '';

		if( isset( $options['adaptive'] ) && 'y' == $options['adaptive'] ) {

			$adaptive = ' data-adaptive="y" ';

		}

		if( isset( $options['infinite'] ) && 'y' == $options['infinite'] ) {

			$adaptive .= ' data-infinite="y" ';

		}

		$per_row = isset( $options['per-row'] ) ? $options['per-row'] : 1;		

			return
				'<div class="carousel-wrapper  ' . $classes . '" data-nav-type="' . $options['carousel-nav'] . '">
					'. $arrows .'
					<div class="carousel-overview">
						<div class="carousel-container" 
							 data-cols="'. $per_row .'" 
							 data-scroll="'. $scroll_by .'"
							 data-autoplay="'. $options['carousel-autoplay'] . '" '.$adaptive .' >' .
							$content .
						'</div>
					</div>
				</div>';
	}

	return $content;
}

public static function addStyleColumn( $idColumn, $classSize, $settings = array(), $elements ) 
{


	$css = 'background-color: ' . $settings['bg-color'] . '; text-align: ' . $settings['text-align'] . ';';

	$css .= 'color: ' . $settings['text-color'] . '; ';

	if ( 'y' == $settings['border-top'] ) {

		$css .= 'border-top: ' . $settings['border-top-width'] . 'px solid ' . $settings['border-top-color'] . ';';
	}

	if ( 'y' == $settings['border-bottom'] ) {

		$css .= 'border-bottom: ' . $settings['border-bottom-width'] . 'px solid ' . $settings['border-bottom-color'] . ';';
	}

	if ( 'y' == $settings['border-left'] ) {

		$css .= 'border-left: ' . $settings['border-left-width'] . 'px solid ' . $settings['border-left-color'] . ';';
	}

	if ( 'y' == $settings['border-right'] ) {

		$css .= 'border-right: ' . $settings['border-right-width'] . 'px solid ' . $settings['border-right-color'] . ';';
	}

	if ( ! empty( $settings['bg-img'] ) ) {

		$css .= 'background-image: url('. esc_url( self::get_attachment_field( $settings['bg-img'] ) ) .');';


		$css .= 'background-position: ' . $settings['bg-x'] . ' ' . $settings['bg-y'] . ';';

		$css .= 'background-size:' . $settings['bg-size'] . ';';

		$css .= 'background-attachment: ' . $settings['bg-attachement'] . ';';

		$css .= 'background-repeat:' . $settings['bg-repeat'] . ';';
	}

	$css .= 'margin-top: ' . $settings['margin-top'] . 'px;';
	$css .= 'margin-bottom: ' . $settings['margin-bottom'] . 'px;';
	$css .= 'padding-top: ' . $settings['padding-top'] . 'px;';
	$css .= 'padding-bottom: ' . $settings['padding-bottom'] . 'px;';
	$css .= 'padding-left: ' . $settings['padding-left'] . 'px;';
	$css .= 'padding-right: ' . $settings['padding-right'] . 'px;';

	$css .= $settings['custom-css'];


	$div_mask = '';
	$col_video_bg  = '';
	$classes = $attrs = array();

	// Check if parallax is enabled
	if ( 'y' == $settings['parallax'] ) {

		$attrs[] = 'data-parallax="y"';
	}

	if ( ! empty( $settings['name'] ) ) {

		$attrs[] = 'id="airkit_' . sanitize_html_class( $settings['name'] ) . '"';
	}

	if ( ! empty( $settings['bg-video-mp'] ) || ! empty( $settings['bg-video-webm'] ) ) {

		$classes[] = 'has-video-bg';

		$col_video_bg =
			'<div class="video-background">
				<video autoplay loop poster="' . self::get_attachment_field( $row_set['bg-img'], 'url', 'full' ) . '" id="bgvid-'. airkit_rand_string('5') .'">
					<source src="' . self::get_attachment_field( $row_set['bg-video-webm'], 'video-url' ) . '" type="video/webm">
					<source src="' . self::get_attachment_field( $row_set['bg-video-mp'], 'video-url' ) . '" type="video/mp4">
				</video>
			</div>';
	}

	if (  'y' == $settings['mask'] ) {

		$classes[] = 'has-row-mask';

		$div_mask .= '<div class="column-mask" style="background-color:' . $settings['mask-color'] . ';"></div>';
	}

	if ( 'gradient' == $settings['mask'] ) {

		$gradient_color = $settings['mask-gradient-color'];
		$gradient_mode = $settings['gradient-type'];
		$cssGradientMask = '';

		if ( $gradient_mode == 'radial' ) {

			$cssGradientMask .= '
			background: '.$settings['mask-color'].';
			background: -moz-radial-gradient(center, ellipse cover,  '.$settings['mask-color'].' 0%,  '.$gradient_color.' 0%,  '.$settings['mask-color'].' 100%, '.$settings['mask-color'].' 100%);
			background: -webkit-gradient(radial, center center, 0px, center center, 100%, color-stop(0%,'.$settings['mask-color'].'), color-stop(0%, '.$gradient_color.'), color-stop(100%, '.$settings['mask-color'].'), color-stop(100%,'.$settings['mask-color'].'));
			background: -webkit-radial-gradient(center, ellipse cover,  '.$settings['mask-color'].' 0%, '.$gradient_color.' 0%, '.$settings['mask-color'].' 100%,'.$settings['mask-color'].' 100%);
			background: -o-radial-gradient(center, ellipse cover,  '.$settings['mask-color'].' 0%, '.$gradient_color.' 0%, '.$settings['mask-color'].' 100%,'.$settings['mask-color'].' 100%);
			background: -ms-radial-gradient(center, ellipse cover,  '.$settings['mask-color'].' 0%, '.$gradient_color.' 0%, '.$settings['mask-color'].' 100%,'.$settings['mask-color'].' 100%);
			background: radial-gradient(ellipse at center,  '.$settings['mask-color'].' 0%, '.$gradient_color.' 0%, '.$settings['mask-color'].' 100%,'.$settings['mask-color'].' 100%);';

		} elseif ( $gradient_mode == 'left-to-right' ) {

			$cssGradientMask .= '
			background: '.$settings['mask-color'].';
			background: -moz-linear-gradient(left, '.$settings['mask-color'].' 0%,  '.$gradient_color.' 0%, '.$settings['mask-color'].' 100%, '.$gradient_color.' 100%);
			background: -webkit-gradient(linear, left top, right top, color-stop(0%,'.$settings['mask-color'].'), color-stop(0%, '.$gradient_color.'), color-stop(100%,'.$settings['mask-color'].'), color-stop(100%,'.$gradient_color.'));
			background: -webkit-linear-gradient(left, '.$settings['mask-color'].' 0%, '.$gradient_color.' 0%,'.$settings['mask-color'].' 100%,'.$gradient_color.' 100%);
			background: -o-linear-gradient(left, '.$settings['mask-color'].' 0%, '.$gradient_color.' 0%,'.$settings['mask-color'].' 100%,'.$gradient_color.' 100%);
			background: -ms-linear-gradient(left, '.$settings['mask-color'].' 0%, '.$gradient_color.' 0%,'.$settings['mask-color'].' 100%,'.$gradient_color.' 100%);
			background: linear-gradient(to right, '.$settings['mask-color'].' 0%, '.$gradient_color.' 0%,'.$settings['mask-color'].' 100%,'.$gradient_color.' 100%);
			';
		}elseif ( $gradient_mode == 'corner-top' ) {
			$cssGradientMask .= '
			background: '.$settings['mask-color'].';
			background: -moz-linear-gradient(-45deg, '.$settings['mask-color'].' 0%,  '.$gradient_color.' 100%);
			background: -webkit-gradient(linear, left top, right bottom, color-stop(0%,'.$settings['mask-color'].'), color-stop(100%, '.$gradient_color.'));
			background: -webkit-linear-gradient(-45deg, '.$settings['mask-color'].' 0%, '.$gradient_color.' 100%);
			background: -o-linear-gradient(-45deg, '.$settings['mask-color'].' 0%, '.$gradient_color.' 100%);
			background: -ms-linear-gradient(-45deg, '.$settings['mask-color'].' 0%, '.$gradient_color.' 100%);
			background: linear-gradient(135deg, '.$settings['mask-color'].' 0%, '.$gradient_color.' 100%);
			';
		}elseif ( $gradient_mode == 'corner-bottom' ) {
			$cssGradientMask .= '
			background: '.$settings['mask-color'].';
			background: -moz-linear-gradient(45deg, '.$settings['mask-color'].' 0%,'.$gradient_color.' 100%);
			background: -webkit-gradient(linear, left bottom, right top, color-stop(0%,'.$settings['mask-color'].'), color-stop(100%, '.$gradient_color.'));
			background: -webkit-linear-gradient(45deg, '.$settings['mask-color'].' 0%, '.$gradient_color.' 100%);
			background: -o-linear-gradient(45deg, '.$settings['mask-color'].' 0%, '.$gradient_color.' 100%);
			background: -ms-linear-gradient(45deg, '.$settings['mask-color'].' 0%, ' .$gradient_color.' 100%);
			background: linear-gradient(45deg, '.$settings['mask-color'].' 0%, '.$gradient_color.' 100%);
			';
		}


		$classes[] = 'has-row-mask';
		$div_mask .= '<div class="row-mask" style="' . $cssGradientMask . '"></div>';
	}

	$style_column = 'style=" padding-right:'. $settings['gutter-right'] .'px; padding-left: '. $settings['gutter-left'] .'px; position: relative;"';

	$attrs[] = 	'style="' . $css .'"';

	$classes[] = self::parent_effect( $settings );

	$attrs[] = !empty( self::child_effect( $settings ) ) ? 'class="'. self::child_effect( $settings ) .'"' : '';

	return 	'<div '. $style_column . $idColumn . ' class="' . trim( implode( ' ', array_merge($classSize, $classes) ) ) . self::responsive_classes( $settings ) . '">
				<div '. implode( ' ', $attrs ) . '>
					' . $div_mask . '
					' . $col_video_bg . '
					' . $elements . '
				</div>
			</div>';

}

public static function compile_element( $element = array() )
{
	$call = ( $call = str_replace( '-', '_', $element['element-type'] ) . '_element' ) && method_exists( 'airkit_Compilator', $call ) ? $call : 'view_articles';

	$e = call_user_func( array( __CLASS__, $call ), $element );

	$animated = self::animation_helpers( $element, $call );

	$e = $animated['before'] . $e . $animated['after'];

	return '<div class="row content-block' . $animated['class'] . self::classes( $element ) . self::responsive_classes( $element ) . '">' . $e . '</div>';
}


public static function animation_helpers( $element, $call ) {

	$helpers = array();

	$helpers['before'] = '';
	$helpers['after']= '';
	$helpers['class']= '';	

	if( isset( $element['reveal-effect'] ) && 'none' !== $element['reveal-effect'] ){

		/*
		 *	Elements that should be animated from template files or function.
		 *	Add function name here.
		 */

		$animate_from_template = array(
			'view_articles',
			'events_element',
			'teams_element',
			'gallery_element',
			'pricing_tables_element',
			'testimonials_element',
			'listed_featured_slement',
			'list_products_element',
			'clients_element',
		);

		if( !in_array( $call, $animate_from_template ) ) {

			/* If element is not animated from template file
			 *   Get animation classes and create animation wrapper.	
			 */
			$helpers['class'] = self::parent_effect( $element );
			$helpers['before'] = '<div class="' . self::child_effect( $element ) . '">';
			$helpers['after']  = '</div>';

		}
	}

	return $helpers;	
}

public static function responsive_classes( $element )
{
	$classes = array();

	$element['lg'] = isset( $element['lg'] ) ? $element['lg'] : 'y';
	$element['md'] = isset( $element['md'] ) ? $element['md'] : 'y';
	$element['sm'] = isset( $element['sm'] ) ? $element['sm'] : 'y';
	$element['xs'] = isset( $element['xs'] ) ? $element['xs'] : 'y';


	if ( 'n' == $element['lg'] ) {

		$classes[] = 'hidden-lg';
	}

	if ( 'n' == $element['md'] ) {

		$classes[] = 'hidden-md';
	}

	if ( 'n' == $element['xs'] ) {

		$classes[] = 'hidden-xs';
	}

	if ( 'n' == $element['sm'] ) {

		$classes[] = 'hidden-sm';
	}

	return ! empty( $classes ) ? ' ' . implode( ' ', $classes ) : '';
}

public static function get_head( $head )
{
	global $post;

	$style = airkit_option_value( $head . '_settings', 'predefined-style' );
	$header = array();

	$lang = defined( 'ICL_LANGUAGE_CODE' ) ? '_' . ICL_LANGUAGE_CODE : '';

	if ( 'custom' == $style ) {

		$header = get_option( 'gowatch_' . $head . $lang, array() );
		$header = defined( 'ICL_LANGUAGE_CODE' ) && empty( $header ) ? get_option( 'gowatch_' . $head, array() ) : $header;

	} else {

		$header[0]['head'] = $head;
		$header[0]['build-type'] = 'predefined';
		$header[0]['head-style'] = $style;

	}

	if ( isset( $post->post_type ) && 'page' === $post->post_type ) {

		$h = get_post_meta( $post->ID, 'airkit_header_and_footer', true );

		if ( $h && 1 === (int)$h['disable_' . $head ] ) return array();
	}

	return $header;
}

public static function logo_element( $options = array( ))
{
	$align = isset( $options['align'] ) ? strip_tags( $options['align'] ) : '';
	$column = isset( $options['columns'] ) && !empty( $options['columns'] ) ? $options['columns'] : 'col-lg-12';

	return 	'<div class="'. $column .' '. $align .'">
				' . airkit_get_logo() . '
			</div>';
}


public static function user_element( $options = array( ))
{
	$align = isset( $options['align'] ) ? strip_tags( $options['align'] ) : '';
	$column = isset( $options['columns'] ) && !empty( $options['columns'] ) ? $options['columns'] : 'col-lg-12';

	$dropdown = '';
	$links = '';

	// Generate output for logged in users.
	if( is_user_logged_in() ) {

		$userdata = wp_get_current_user();

		$dashboard_url = get_frontend_dashboard_url();
		$my_posts_url = add_query_arg( 'active_tab', 'posts', $dashboard_url );
		$my_playlists_url = add_query_arg( 'active_tab', 'playlists', $dashboard_url );
		$favorites_url = add_query_arg( 'active_tab', 'favorites', $dashboard_url );
		$settings_url = add_query_arg( 'active_tab', 'settings', $dashboard_url );
		$subscription_url = add_query_arg( 'active_tab', 'subscription', $dashboard_url );

		/*
		 | If BuddyPress is enabled, get BuddyPress URLs.
		 */
		if( method_exists('Airkit_BP_Extend', 'overwrite_user_permalinks') ) {

		 	$bp_extend = new Airkit_BP_Extend();

		 	/*
	  		 | List returned array fields to variables.
		 	 */
		 	list( $dashboard_url, $my_posts_url, $favorites_url, $settings_url ) = $bp_extend->overwrite_user_permalinks();

		}

		$image_with_link = '<a href="'. esc_url( $dashboard_url ) .'">'. airkit_get_avatar( $userdata->ID, 60 ) .'</a>';
		$username        = '<a href="'. esc_url( $dashboard_url ) .'" class="username">'. $userdata->display_name .'</a>';
		$role            = '<span class="role">'. $userdata->user_email .'</span>';
		
		// Build dropdown menu.

		$dropdown = '<div class="user-dropdown text-left">
						<div class="user-image">'. $image_with_link .'</div>
						<div class="user-info">
							'. $username . $role .'
						</div>
						<ul class="user-menu">
							<li class="add-post">
								<a href="'. esc_url( get_frontend_submit_url() ) .'"><i class="icon-small-upload-button-with-an-arrow"></i>'. esc_html__( 'Add new asset', 'gowatch' ) .'</a>
							</li>
							<li class="profile">
								<a href="'. esc_url( $dashboard_url ) .'"><i class="icon-user"></i>'. esc_html__( 'Profile', 'gowatch' ) .'</a>
							</li>
							<li class="profile">
								<a href="'. esc_url( $my_posts_url ) .'"><i class="icon-play"></i>'. esc_html__( 'My assets', 'gowatch' ) .'</a>
							</li>
							<li class="subscription">
								<a href="'. esc_url( $subscription_url ) .'"><i class="icon-money-1"></i>'. esc_html__( 'Subscription', 'gowatch' ) .'</a>
							</li>											
							<li class="settings">
								<a href="'. esc_url( $settings_url  ) .'"><i class="icon-settings"></i>'. esc_html__( 'Account Settings', 'gowatch' ) .'</a>
							</li>							
							<li class="logout">
								<a href="'. wp_logout_url() .'"><i class="icon-logout"></i>'. esc_html__( 'Sign out', 'gowatch' ) .'</a>
							</li>							
						</ul>
					</div>';

		$links 	= '<a href="'. esc_url( get_frontend_submit_url() ) .'" class="user-upload"><i class="icon-small-upload-button-with-an-arrow"></i></a><div class="user-image">'. $image_with_link .'<i class="icon-down"></i></div>';

	} else {

		$register_url = $login_url = get_frontend_registration_url();

		if( function_exists('bp_is_active') ){	
			// Only registration URL can ber overwritten
			$register_url = wp_registration_url();
			$login_url  = wp_login_url();

		}

		// Generate output for not logged in users.
		$links 			 = '<a href="'. esc_url( get_frontend_submit_url() ) .'" class="user-upload"><i class="icon-small-upload-button-with-an-arrow"></i></a>';
		$links 			.= '<a class="btn small btn-primary" href="'. esc_url( $login_url ) .'?action=login">'. esc_html__( 'Sign in', 'gowatch' ) .'</a>';
		$links 			.= '<a class="btn small" href="'. esc_url( $register_url ) .'?action=signup">'. esc_html__( 'Sign up', 'gowatch' ) .'</a>';
		$links 			.= '<a class="mini-user-login" href="'. esc_url( $login_url ) .'?action=login"><i class="icon-user-full"></i></a>';

	}

	$output  = '<div class="'. $column .'">
					<div class="user-element clearfix '. $align .'">
						'. $links .'
						'. $dropdown .'
					</div>
				</div>';

	return $output;

}


public static function cart_element($options = array())
{
	
	if ( class_exists('WooCommerce') ) {
		global $woocommerce;

		$align = isset($options['align']) && '' != $options['align'] ? 'text-' . $options['align'] : 'text-left';

		$cart_code = '<div class="col-lg-12 col-md-12 col-sm-12 '. $align .'">
			<div class="woocommerce gbtr_dynamic_shopping_bag">
				<div class="gbtr_little_shopping_bag_wrapper">
					<div class="gbtr_little_shopping_bag">
						<div class="overview">
							<div class="minicart_items ';
							if($woocommerce->cart->cart_contents_count == 0){ $cart_code .= 'no-items'; };
							$cart_code .= '"><i class="icon-shopping63"></i>';
							$cart_code .= '<span class="count">' .  sprintf(_n('%d', '%d', $woocommerce->cart->cart_contents_count, 'gowatch'), $woocommerce->cart->cart_contents_count).'</span>
							</div>
						</div>
					</div>
					<div class="gbtr_minicart_wrapper">
						<span class="ts-cart-close icon-close"></span>
						<h4 class="gbtr_minicart_title">'. esc_html__('My shopping basket','gowatch') . '</h4>
						<div class="gbtr_minicart">
							<ul class="cart_list">';
								if ( sizeof($woocommerce->cart->cart_contents) > 0 ) :
									foreach ($woocommerce->cart->cart_contents as $cart_item_key => $cart_item) :
										$_product = $cart_item['data'];
										if ($_product->exists() && $cart_item['quantity']>0) :
											$cart_code .='<li class="cart_list_product">
												<a class="cart_list_product_img" href="'.get_permalink($cart_item['product_id']).'"> ' . $_product->get_image().'</a>
												<div class="cart_list_product_title">';
													$gbtr_product_title = $_product->get_title();
													$gbtr_short_product_title = (strlen($gbtr_product_title) > 28) ? substr($gbtr_product_title, 0, 25) . '...' : $gbtr_product_title;
													$cart_code .= apply_filters( 'woocommerce_cart_item_remove_link', sprintf('<a href="%s" class="remove" title="%s">&times;</a>', esc_url( $woocommerce->cart->get_remove_url( $cart_item_key ) ), esc_html__('Remove this item', 'gowatch') ), $cart_item_key ) . '<a href="'.get_permalink($cart_item['product_id']). '" class="cart-item-title">' . apply_filters('woocommerce_cart_widget_product_title', $gbtr_short_product_title, $_product) . '</a><span class="cart_list_product_quantity"> ('.$cart_item['quantity'].')</span>' . '<span class="cart_list_product_price">'.woocommerce_price($_product->get_price()).'</span>
												</div>
												<div class="clr"></div>
											</li>';
										endif;
									endforeach;
									$cart_code .= ' <li class="minicart_total_checkout">
										<h5>'. esc_html__('Cart subtotal:','gowatch') .' <span>'. $woocommerce->cart->get_cart_total() .'</span></h5>
									</li>
									<li class="clr">
										<div class="row">
											<div class="col-lg-6 col-md-6 col-sm-6">
												<a href="'. esc_url( $woocommerce->cart->get_cart_url() ) .'" class="button gbtr_minicart_cart_btn">'. esc_html__('View Cart','gowatch') .'</a>
											</div>
											<div class="col-lg-6 col-md-6 col-sm-6">
												<a href="'. esc_url( $woocommerce->cart->get_checkout_url() ) .'" class="button gbtr_minicart_checkout_btn">'. __('Checkout','gowatch') .'</a>
											</div>
										</div>
									</li>';
								else:
									$cart_code .= '<li class="empty">' .__('No products in the cart.','gowatch').'</li>';
								endif;
							$cart_code .= '</ul>
						</div>
					</div>
				</div>
			</div>
		</div>';
		return $cart_code;
	}

}

public static function menu_element( $options = array() ) {
	$helpers = array();
	$menu = $css = $colors = $fonts = $before = $label = '';
	$column = isset( $options['columns'] ) && !empty( $options['columns'] ) ? $options['columns'] : 'col-lg-12 col-md-12 col-sm-12';

	$menu_class = 'menu-element-' . airkit_rand_string(5, 'a-b');

	/* Classes and additional elements for each menu style*/

	if( 'left' === $options['submenu-alignment'] ) {

		$helpers[] = 'left-dropdown';

	} 
	if( 'vertical' === $options['styles'] ) {

		$helpers[] = 'airkit_vertical-menu clickablemenu';

	} 

	if( 'logo' === $options['styles'] ) {

		$helpers[] = 'hovermenu airkit_menu-with-logo airkit_horizontal-menu';
		
	}

	if( 'horizontal' === $options['styles'] ) {

		$helpers[] = 'hovermenu airkit_horizontal-menu';
		
	}

	if ( isset($options['submenu-decoration']) && 'y' === $options['submenu-decoration'] ) {
		$helpers[] = 'has-submenu-decoration';
	}

	if( 'sidebar' === $options['styles'] || 'fullscreen' === $options['styles'] )	{

		$helpers[] = 'clickablemenu airkit_sidebar-menu';

	}

	/* This class is used to activate sidebar version of menu, on mobile devices */
	/* Styling classes are changed in scripting.js */
	if( 'vertical' !== $options['styles'] ) {

		$helpers[] = 'airkit_toggle-menu';

	}

	if ( isset( $options['label'] ) && 'y' == $options['label'] ) {
		$label = '<span class="hamburger-label">'. esc_html__('Menu','gowatch') .'</span>';
	}

	$before = '<span class="sb-menu-toggle">
					'. ( isset($options['text-align']) && 'right' == $options['text-align'] ? $label : '' ) .'
                    <span class="hamburger-box">
					    <span class="hamburger-inner"></span>
					</span>
					'. ( isset($options['text-align']) && 'left' == $options['text-align'] ? $label : '' ) .'
				</span>';		

	if( 'fullscreen' === $options['styles'] ) {

		$helpers[] = 'airkit_fullscreen-menu';

	}

	/* Hide icons */

	if( 'n' === $options['icons'] ) {

		$helpers[] = 'no-icons';
	}

	/* Hide description */

	if( 'n' === $options['description'] ) {

		$helpers[] = 'no-description';
	}		

	/* Menu custom colors. Each menu styles may have additional styling classes. */
	$helpers[] = 'custom-colors';

	$colors = '
		.airkit_horizontal-menu.'.$menu_class .' .navbar-default .navbar-collapse,
		.airkit_sidebar-menu.'.$menu_class .' .navbar-default{
			background-color: '. $options['bg-color'] .';
		}

		.airkit_sidebar-menu.'.$menu_class .' .navbar-default,
        .airkit_menu.'.$menu_class .' .navbar-default .navbar-nav > li,
		.airkit_menu.'.$menu_class .' .navbar-default .navbar-nav > li > a{
			color: '. $options['text-color'] .';
		}

		
		.airkit_menu.'.$menu_class .' .navbar-default .navbar-nav > li:hover,
		.airkit_menu.'.$menu_class .' .navbar-default .navbar-nav > li > a:hover{
			background-color: '. $options['bg-color-hover'] .';
			color: '. $options['text-color-hover'] .';
		}

		.airkit_menu.'.$menu_class .' .navbar-default .dropdown-menu{
			background-color: '. $options['submenu-bg-color'] .';
			color: '. $options['submenu-text-color'] .';
		}

		.airkit_menu.'.$menu_class .' .navbar-default .dropdown-menu li a{
			color: '. $options['submenu-text-color'] .';
		}

        .airkit_menu.'.$menu_class .' .nav-pills li.menu-item.active > a,
		.airkit_menu.'.$menu_class .' .navbar-default .dropdown-menu li > a:hover{
			background-color: '. $options['submenu-bg-color-hover'] .';
			color: '. $options['submenu-text-color-hover'] .';
		}

        .airkit_menu.'.$menu_class .' .navbar-default li.current-menu-item > a,
        .airkit_menu.'.$menu_class .' .navbar-default li.current-menu-ancestor > a {
            color: '. $options['text-color-hover'] .' !important;
        }

        .airkit_menu.'.$menu_class .' .navbar-default li.current-menu-item > a:hover,
        .airkit_menu.'.$menu_class .' .navbar-default li.current-menu-ancestor > a:hover {
            color: '. $options['text-color-hover'] .' !important;
        }

		.airkit_menu.'. $menu_class .' .mega-column-title {
			border-color: '. airkit_rgba_opacity( $options['submenu-text-color'], '0.3' ).';
		}

		.airkit_menu.'. $menu_class .' .sb-menu-toggle .hamburger-label {
			color: '. $options['text-color'] .';
		}

		.airkit_menu.'. $menu_class .' .mega-column-title {
			border-color: '. airkit_rgba_opacity( $options['submenu-text-color'], '0.08' ).';
		}

		.airkit_fullscreen-menu.'. $menu_class .' .sb-menu-close{
			border-color: '. airkit_rgba_opacity( $options['text-color'], '0.3' ).';
		}

		.airkit_fullscreen-menu.'. $menu_class .' .sb-menu-close.over-submenu{
			color: '. $options['submenu-text-color'] .';
		}

		@media only screen and (max-width : 768px){
			.airkit_sidebar-menu.'. $menu_class .' .navbar-default{
			    background-color: '. $options['submenu-bg-color'] .';	
			}
			.airkit_sidebar-menu.'.$menu_class .' .navbar-default,
	        .airkit_menu.'.$menu_class .' .navbar-default .navbar-nav > li,
			.airkit_menu.'.$menu_class .' .navbar-default .navbar-nav > li > a {
				color: '. $options['submenu-text-color'] .';
			}
		}
		';

		if( airkit_is_color_transparent( $options['bg-color'] ) ) {
			if( airkit_is_color_light( $options['text-color'] ) ) {
				$mobile_bg_color = '#000';
			} else {
				$mobile_bg_color = '#fff';
			}

			$colors .= '
				.airkit_sidebar-menu.'. $menu_class .' .navbar-default {
				    background-color: '. $mobile_bg_color .';	
				}
			';
		}


	/* Menu custom fonts */
	if( 'google' == $options['font-type'] ) {

		$line_height = 'inherit';
		if ( is_int($options['font']['line']) ) {

			$line_height = $options['font']['line'] .'px';

		} elseif ( $options['font']['line'] == 'inherit' ) {

			$line_height = $options['font']['size'] + 2 .'px';

		}

		$fonts = '
			.airkit_menu.'.$menu_class .' li[class*="menu-item-"] {
				font-family: "'. $options['font']['family'] .'";
				font-size: '. $options['font']['size'] .'px;
				font-weight: '. $options['font']['weight'] .';
				font-style: '. $options['font']['style'] .';
				letter-spacing: '. $options['font']['letter'] .'em;
				line-height: '. $line_height .';
				text-decoration: '. $options['font']['decor'] .';
				text-transform: '. $options['font']['transform'] .';
			};
		';

		// Include custom font for 'menu'.
		( new Airkit_Google_Fonts() )->add_dynamic_font( 'menu', $options['font'] );

	}

	/* Add styles for cutom colors or fonts to page */
	$css = 	'<style scoped>
				'. $colors .'
				'. $fonts .'
			</style>';

	$after = '';

	/*
	 * !IMPORTANT Add elements to menu
	 * Define class names in the following order:
	 * < airkit_add-to-menu > | Tells that item must be added to menu as <li>.
	 * < airkit_menu-elementType > | Define element type.
	 * Next classes may be added in any order.
	 */

	
	/*
	 * Add logo element to menu
	 */

	if( isset( $options['add-logo'] ) && 'y' === $options['add-logo'] ) {

		$options['append-logo'] = isset( $options['append-logo'] ) ? $options['append-logo'] : '';

		$helpers[] = 'add-logo';

		$after .= '<div class="airkit_add-to-menu airkit_menu-logo menu-item airkit_' . $options['append-logo'] .'" >' . self::logo_element()  . '</div>';

	}

	/*
	 * Add search element to menu
	 */

	if( isset( $options['add-search'] ) && 'y' === $options['add-search'] ) {

		$options['append-search'] = isset( $options['append-search'] ) ? $options['append-search'] : '';

		$after .= '<div class="airkit_add-to-menu airkit_menu-search menu-item airkit_' . $options['append-search'] .'" >' . self::searchbox_element( array('live_results' => 'n') )  . '</div>';

	}

	/*
	 * Add cart element to menu
	 */

	if( isset( $options['add-cart'] ) && 'y' === $options['add-cart'] ) {

		$options['append-cart'] = isset( $options['append-cart'] ) ? $options['append-cart'] : '';

		$after .= '<div class="airkit_add-to-menu airkit_menu-cart menu-item airkit_' . $options['append-cart'] .'" >' . self::cart_element()  . '</div>';

	}



	$helpers[] = isset( $options['text-align'] ) ? ' nav-'. $options['text-align'] : ' nav-left';

	$helpers[] = $menu_class;
	
	$helpers = implode( ' ', $helpers );

	// Add the custom logo image for menu with logo in the middle option
	$custom_logo_image = '';
	if ( isset( $options['custom-logo'] ) && $options['custom-logo'] != '' ) {
		$custom_logo_image = '<div class="hidden custom-logo-image">' . self::get_attachment_field( $options['custom-logo'], 'url', 'full' ) . '</div>';
	}

	if ( isset( $options['menu-id'] ) && $options['menu-id'] != '' ) {

		$locations = get_theme_mod( 'nav_menu_locations' );

		if ( !isset($locations['primary']) ) {
			$locations['primary'] = '';
		}

		$menu_by_id = isset( $menu_by_id ) && ! empty( $menu_by_id ) ? $menu_by_id : $locations['primary'];

		$menu .= 	'<div class=" airkit_menu '. $helpers .'">
						'. $before .'
						<div class="navbar navbar-default" role="navigation">
							<div class="navbar-collapse collapse">' .
								wp_nav_menu(
									array(
										'menu'            => $options['menu-id'],
										'echo'            => false,
										'container'       => '',
										'fallback_cb'	  => false
									)
								) .
							'</div>
							'. $after .'
						</div>
						' . $custom_logo_image . '
					</div>';

	} else {

		ob_start();		

		$menu .= 	'<div class=" airkit_menu airkit_page-menu '. $helpers .'">
						'. $before .'
						<div class="navbar navbar-default" role="navigation">
							<div class="navbar-collapse collapse">' .
								wp_nav_menu(
										array(
											'menu'            => '',
											'echo'            => false,
											'container'       => '',
											'fallback_cb'     => 'wp_page_menu'
										)
								    ) .
							'</div>
							'. $after .'
						</div>
						' . $custom_logo_image . '
					</div>';


	}

	return 	'<div class="'. $column .'">' .
				$menu .
				$css  .
			'</div>';
}

public static function delimiter_element($options = array())
{
	$delimiters = array(
		'dotsslash',
		'doubleline',
		'lines',
		'squares',
		'gradient',
		'line',
		'iconed icon-close',
		'small-line'
		);

	$style = (in_array($options['type'], $delimiters))? $options['type'] : 'line';
	$color = (isset($options['color']) && is_string($options['color'])) ? $options['color'] : '';

		// Set styles for each delimiter type

	if ( $style == 'dotsslash' || $style == 'doubleline' || $style == 'line' || $style == 'iconed icon-close' ) {
		$css_styles = 'style="color: '.$color.'; border-color:'.$color.'"';
	} elseif ( $style == 'lines' ) {
		$css_styles = 'style="background: repeating-linear-gradient(to right,'.$color.','.$color.' 1px,#fff 1px,#fff 2px);"';
	} elseif( $style == 'squares' ) {
		$css_styles = 'style="background: repeating-linear-gradient(to right,'.$color.','.$color.' 4px,#fff 4px,#fff 8px);"';
	} elseif( $style == 'gradient' ) {
		$css_styles = 'style="
		background: -moz-linear-gradient(left,  rgba(0, 0, 0, 0) 0%,  '.$color.' 50%, rgba(0, 0, 0, 0) 100%);
		background: -webkit-gradient(linear, left top, right top, color-stop(0%,rgba(0, 0, 0, 0)), color-stop(50%, '.$color.'), color-stop(100%,rgba(0, 0, 0, 0)));
		background: -webkit-linear-gradient(left,  rgba(0, 0, 0, 0) 0%, '.$color.' 50%,rgba(0, 0, 0, 0) 100%);
		background: -o-linear-gradient(left,  rgba(0, 0, 0, 0) 0%, '.$color.' 50%,rgba(0, 0, 0, 0) 100%);
		background: -ms-linear-gradient(left,  rgba(0, 0, 0, 0) 0%, '.$color.' 50%,rgba(0, 0, 0, 0) 100%);
		background: linear-gradient(to right,  rgba(0, 0, 0, 0) 0%, '.$color.' 50%,rgba(0, 0, 0, 0) 100%);"';

	} elseif($style == 'small-line'){
		$css_styles = 'style="background:'.$color.'"';
	}else{
		$css_styles =  'style="'.$color.'"';
	}

	return '<div class="col-lg-12"><div class="delimiter ' . $style . '" '.$css_styles.'></div></div>';
}

public static function title_element($options = array())
{
	$styles = array(
		'lineariconcenter',
		'2lines',
		'simpleleft',
		'lineafter',
		'linerect',
		'leftrect',
		'simplecenter',
		'smallcenter',
		'with-subtitle-above',
		'align-right',
		'brackets',
		'with-subtitle-over',
		'with-small-line-below',
		'with-double-line',
		'with-bold-line-after',
		'border-square-left',
		'border-square-center',
		'kodak'
	);

	$sizes = array( 'h1', 'h2', 'h3', 'h4', 'h5', 'h6' );

	// Declare variables
	$title = $description = $additional = $title_attr = $subtitle_attr = '';
	$heading_atts = $subtitle_atts = $attr = array();

	$the_title 		= isset($options['title']) ? stripslashes($options['title']) : '';
	$heading_color 	= isset($options['title-color']) ? $options['title-color'] : 'inherit';
	$subtitle 		= isset($options['subtitle']) ? stripslashes($options['subtitle']) : '';
	$subtitle_color	= isset($options['subtitle-color']) ? $options['subtitle-color'] : 'inherit';
	$subtitle_size 	= isset($options['subtitle-size']) ? $options['subtitle-size'].'px' : 'inherit';
	$icon 			= isset($options['icon']) ? '<i class="' . $options['icon'] . '"></i>' : '';
	$style 			= isset($options['style']) && in_array($options['style'], $styles) ? $options['style'] : 'simpleleft';
	$heading_size 	= isset($options['size']) && in_array($options['size'], $sizes) ? $options['size'] : 'h1';
	$link 			= isset($options['link']) && !empty($options['link']) ? esc_url($options['link']) : '';
	$link_target 	= isset($options['target']) && ($options['target'] == '_blank' || $options['target'] == '_self') ? $options['target'] : '_blank';
	$letter_spacer 	= isset($options['letter-spacer']) && (int)$options['letter-spacer'] !== 0 ? (int)$options['letter-spacer'] : '';
	$attr['class']  = isset($options['class']) ? $options['class'] : array();

	// Attributes for Headint title
	if ( !empty($heading_color) ) {
		$heading_atts[] = 'color: ' . esc_attr($heading_color) . ';';
	}

	if ( !empty($letter_spacer) ) {
		$heading_atts[] = 'letter-spacing: ' . esc_attr($letter_spacer) . 'px;';
	}

	if ( !empty($heading_atts) ) {
		$attr['class'][] = 'the-title';
		$attr['style'] = $heading_atts;
		$title_attr = self::render_atts( $attr );
	}


	// Attributes for subtitle
	if ( !empty($subtitle_color) ) {
		$subtitle_atts[] = 'color: ' . esc_attr($subtitle_color) . ';';
	}

	if ( !empty($subtitle_size) ) {
		$subtitle_atts[] = 'font-size: ' . esc_attr($subtitle_size) . ';';
	}

	if ( !empty($subtitle_atts) ) {
		$attr['class'][] = 'block-title-description';
		$attr['style'] = $subtitle_atts;
		$subtitle_attr = self::render_atts( $attr );
	}


	if( !empty( $the_title ) && 'lineariconcenter' !== $style ){

		if( !empty($link) ) {

			$title = '<' . $heading_size . ' '. $title_attr .'>'. $icon .'<a target="'. $link_target .'" href="'. $link . '">' . $the_title . '</a>'. ( $style == 'kodak' ? '<span class="corner-line"></span>' : '' ) .'</' . $heading_size . '>';

		} else {

			$title = '<' . $heading_size . ' '. $title_attr .'>'. $icon . $the_title . ( $style == 'kodak' ? '<span class="corner-line"></span>' : '' ) .'</' . $heading_size . '>';
		}

	}

	if( !empty($subtitle) && 'lineariconcenter' !== $style ) {

		$description = '<span '. $subtitle_attr .'>' . $subtitle . '</span>';

	}

	if( !empty($the_title) && 'lineariconcenter' == $style ) {

		if ( !empty($subtitle) ) {
			$description = '<span '. $subtitle_attr .'>' . $subtitle . '</span>';
		}

		$additional = '<'.$heading_size . ' '. $title_attr .'>' . $the_title . '</' . $heading_size.'>' . $description . $icon;
	}

	if( $style != 'with-subtitle-above' ) {
		$output = $title . $description . $additional;
	}

	if( $style == 'with-subtitle-above' ) {
		$output = $description . $title . $additional;
	}

	return	'<div class="col-lg-12">
				<div class="block-title block-title-'. $style . '">
					<div class="block-title-container">'. $output .'</div>
				</div>
			</div>';
}

public static function social_buttons_element($options = array())
{
	$elements = array();

	$align = ( isset( $options['text-align'] ) ) ? $options['text-align'] : '';

	$labels = ( isset( $options['labels'] ) && $options['labels'] == 'y' ) ? ' ts-has-label' : '';

	$style  = isset( $options['style'] ) ? $options['style'] : 'background';

	$show_rss = isset( $options['rss'] ) ? $options['rss'] : 'y';

	// Icon => Label pairs
	$icons = array(
		'skype'     => esc_html__( 'Skype', 'gowatch' ),
		'github'    => esc_html__( 'Github', 'gowatch' ),
		'gplus'     => esc_html__( 'Google+', 'gowatch' ),
		'dribbble'  => esc_html__( 'Dribbble', 'gowatch' ),
		'lastfm'    => esc_html__( 'Lastfm', 'gowatch' ),
		'linkedin'  => esc_html__( 'LinkedIn', 'gowatch' ),
		'tumblr'    => esc_html__( 'Tumblr', 'gowatch' ),
		'twitter'   => esc_html__( 'Twitter', 'gowatch' ),
		'vimeo'     => esc_html__( 'Vimeo', 'gowatch' ),
		'wordpress' => esc_html__( 'WordPress', 'gowatch' ),
		'yahoo'     => esc_html__( 'Yahoo', 'gowatch' ),
		'youtube'   => esc_html__( 'Youtube', 'gowatch' ),
		'facebook'  => esc_html__( 'Facebook', 'gowatch' ),
		'flickr'    => esc_html__( 'Flickr', 'gowatch' ),
		'pinterest' => esc_html__( 'Pinterest', 'gowatch' ),
		'instagram' => esc_html__( 'Instagram', 'gowatch' ),
		'snapchat' 	=> esc_html__( 'Snapchat', 'gowatch' ),
		'reddit' 	=> esc_html__( 'Reddit', 'gowatch' ),
		'vk' 	=> esc_html__( 'Vkontakte', 'gowatch' ),
	);

	$rss_label = '<span class="label-icon">' . esc_html__( 'RSS', 'gowatch' ) . '</span>';

	foreach ( $icons as $icon => $label ) {

		$url = airkit_option_value( 'social', $icon );

		if( $url !== '' ) {

			if( 'y' !== $options['labels'] ) {

				$label = '';
				$rss_label = '';

			} else {

				$label = '<span class="label-icon">' . $label . '</span>';
			}

			//yt
			if( 'youtube' == $icon ) {

				$icon = 'video';
			}

			$elements[] = '<li>
			                   <a href="'. esc_url( $url ) .'" target="_blank" class="'. esc_attr( $icon ) .'">
				                   	<i class="icon-'. esc_attr( $icon ) .'"></i>'
				                   	. $label .
			                   	'</a>
			               </li>';			

		}
	}

	if( 'y' == $show_rss ) {

		$elements[] = ' <li>
							<a href="'. get_bloginfo('rss2_url') .'" class="rss"><i class="icon-rss"></i>'. $rss_label .'</a>
						</li>';
						
	}	

	$elements = trim( implode("\n", $elements) );

	$columns_class = isset($options['columns']) ? $options['columns'] : 'col-lg-12 col-md-12 col-sm-12 col-xs-12';

	if ( $elements ) {

		return '<div class="'. esc_attr( $columns_class ) .'">
					<div class="airkit_social-icons ' . $labels . ' ' . $style . '">
						<ul class="text-'. $align .'">
							'.$elements.'
						</ul>
					</div>
				</div>';
	} else {

		return '';
	}
}

public static function post_navigation() {

	if ( get_previous_posts_link() != '' && get_next_posts_link() !='' ) {
		return '
		<div class="col-lg-12">
			<div class="post-navigator">
				<ul class="row">
					<li class="col-lg-6">'.get_previous_posts_link().'
					</li>
					<li class="col-lg-6">'.get_next_posts_link().'
					</li>
				</ul>
			</div>
		</div>
		';
	}
}

public static function archive_navigation( $options, $args = array() ) {
	global $wp_query;

	$rewrite_options = array(
		'options' => array(
			'pagination' => 'numeric'
		)
	);

	// Array merge on multidimensional array
	$_options = array();
	foreach ($options as $key => $option){
		if ( isset($rewrite_options[$key]) ) {
		    $_options['options'] = array_merge((array)$rewrite_options[$key], (array)$option);
		}
	}

	return self::pagination($wp_query, $_options, $args);
}


public static function searchbox_element( $options = array() )
{
	$output = $live_results = '';
	$align = isset($options['align']) ? $options['align'] : 'center';
	$style = isset($options['style']) ? $options['style'] : 'icon';
	$xs_icon = isset($options['xs_icon']) ? $options['xs_icon'] : 'y';
	$random_ID = airkit_rand_string();
	$columns_class = isset($options['columns']) ? $options['columns'] : 'col-lg-12 col-md-12 col-sm-12';

	if ( isset($options['live_results']) && 'y' == $options['live_results'] ) {

		$data = isset($options['data']) ? $options['data'] : array();

		// Add AJAX nonce
		$ajax_nonce = wp_create_nonce( 'ajax_airkit_search_live_results' );

		$output .= '
			<div class="searchbox text-' . $align . ' style-' . $style . ' ">
				'. (( 'icon' == $style || 'y' == $xs_icon ) ? '<a href="#" class="search-trigger" data-target="#header-form-search-'. $random_ID .'"><i class="icon-search"></i></a>' : '') .'
				<div id="header-form-search-'. $random_ID .'" class="hidden-form-search">
					<form method="get" id="'. esc_attr($random_ID) .'" class="searchbox-live-results-form" role="search" action="'. home_url( '/' ) .'">
						<input type="hidden" name="wpnonce" value="' . esc_attr($ajax_nonce) .'">
						<div class="input-group">
							<input  class="input" 
									name="s" 
									type="text" 
									id="keywords'. $random_ID .'" 
									value="'.esc_html__( 'Search here', 'gowatch' ).'" 
									onfocus="if (this.value == \''.esc_html__( 'Search here', 'gowatch' ).'\') {this.value = \'\';}" 
									onblur="if (this.value == \'\') {this.value = \''.esc_html__( 'Search here', 'gowatch' ).'\';}" />
							<div class="input-group-btn">
								<span class="ajax-loader"><img src="'. get_template_directory_uri() . '/images/ajax-loader.gif" alt="Loader"></span>
								<button type="submit" class="searchbutton" name="search"><i class="icon-search"></i></button>
							</div>
						</div>
					</form>
					'. (( 'icon' == $style ) ? '<a href="#" data-target="#header-form-search-'. $random_ID .'" class="search-close"><i class="icon-close"></i></a>' : '') .'
					<div class="ajax-live-results"></div>
				</div>
			</div>
		';

	} else {

		$output .= '
			<div class="searchbox text-' . $align . ' style-' . $style . ' ">
				'. (( 'icon' == $style ) ? '<a href="#" class="search-trigger" data-target="#header-form-search-'. $random_ID .'"><i class="icon-search"></i></a>' : '') .'
				<div id="header-form-search-'. $random_ID .'" class="hidden-form-search">
					<form role="search" method="get" class="search-form" action="' . home_url( '/' ) . '">
						<div class="input-group">
							<input  class="input" 
									name="s" 
									type="text" 
									id="keywords'. $random_ID .'" 
									value="'.esc_html__( 'Search here', 'gowatch' ).'" 
									onfocus="if (this.value == \''.esc_html__( 'Search here', 'gowatch' ).'\') {this.value = \'\';}" 
									onblur="if (this.value == \'\') {this.value = \''.esc_html__( 'Search here', 'gowatch' ).'\';}" />
							<div class="input-group-btn">
								<span class="ajax-loader"><img src="'. get_template_directory_uri() . '/images/ajax-loader.gif" alt="Loader"></span>
								<button type="submit" class="searchbutton" name="search"><i class="icon-search"></i></button>
							</div>
						</div>
					</form>
					'. (( 'icon' == $style ) ? '<a href="#" data-target="#header-form-search-'. $random_ID .'" class="search-close"><i class="icon-close"></i></a>' : '') .'
				</div>
			</div>
		';

	}


	return '<div class="'. esc_attr( $columns_class ) .'">' . $output . '</div>';
}


public static function teams_element( $options = array(), $query = NULL )
{
	$elements_per_row = (isset($options['per-row'])) ? (int)$options['per-row'] : 3;

	$remove_gutter = $options['remove-gutter'];

	$categories = $options['category'];

	$posts_limit = isset( $options['posts-limit'] ) ? $options['posts-limit'] : -1;

	$args = array(
		'post_type' => 'ts_teams',
		'posts_per_page' => $posts_limit,
		'orderby' => 'DATE',
		'order' => 'DESC'
		);

	if ( is_array($categories) && count($categories) > 0 ) {
		$args['tax_query'] = array(
			array(
				'taxonomy' => 'teams',
				'field'    => 'slug',
				'terms'    => $categories
				)
			);
	} else {
		$args['category__in'] = array(0);
	}

	if( !isset($query) ){
		$query = new WP_Query($args);
	}

	if ( $query->have_posts() ) {
		ob_start();
		ob_clean();

		self::$options = $options;

		while ( $query->have_posts() ) {
			$query->the_post();
			get_template_part('includes/templates/team');
		}

		$elements = ob_get_clean();

		wp_reset_postdata();

	} else {
		return esc_html__('No Results', 'gowatch');
	}

	/* Restore original Post Data */
	wp_reset_postdata();
	
	if( $remove_gutter == 'y' ){

		$gutter_class = ' no-gutter ';

	} else{

		$gutter_class = '';

	}

	/* @dev- style for arrows */
	$options['class'] = 'arrows-above';

	return
	'<div class="teams ' . $gutter_class . ' cols-by-' . $elements_per_row .'">'
		. self::wrapp_carousel( $options['carousel'], $elements, $options ) . 
	'</div>';
}

public static function pricing_tables_element( $options = array() )
{
	$items = $options['items'];
	$el_classes = array('ts-pricing-view');
	$el_classes[] = 'cols-by-'. $options['per-row'] .'';
	$el_classes[] = 'airkit_gutter-'. $options['gutter-space'] .'';

	ob_start();
	ob_clean();

	foreach ( $items as $item ) {

		self::$options = $options;
		self::$options['item'] = $item;
		$el_classes['parent_effect'] = self::parent_effect( $item );

		get_template_part('includes/templates/pricing-tables');

	}

	$element = ob_get_clean();
	wp_reset_postdata();
	
	return '<div class="'. implode( ' ', $el_classes ) .'">'. $element .'</div>';
}

public static function pricelist_element( $options = array() ) 
{
	$element = '';
	$el_classes = array('airkit_pricelist');
	$classes = array();
	$i = 0;

	if ( $options['per-row'] > 1 ) {
		$el_classes[] = 'cols-by-' . $options['per-row'];
	}

    $columns_class = self::get_column_class( $options['per-row'] );

    $style = isset( $options['style'] ) ? $options['style'] : 'image';

    if( !empty( $options['items'] ) && is_array( $options['items'] ) ) {

    	foreach ( $options['items'] as $item ) {

    		/* get the effects */
    		$el_classes['parent_effect'] = self::parent_effect( $item );
    		$classes[] = self::child_effect( $item );

    		if ( 'none' == $style ) {
				$el_classes[] = 'row';
    		}

    		// First loop iteration
    		if ( 0 == $i ) {
    			$element = '<div class="'. implode( ' ', $el_classes) .'">';
    		}

    		/* Render image or icon */
    		if ( 'image' == $style && !empty( $item['image'] ) ) {

    			/* Get image URL */
    			$image_url = self::get_attachment_field( $item['image'], 'url', 'gowatch_small' );

    			/* Add lazy attributes, crop image to provided size */
    			$image = '<img '. Airkit_Images::lazy_img( $image_url, ['size' => 'gowatch_small'] ) .' alt="'. esc_attr( $item['title'] ) .'">';

    			$classes['image'] = 'has-image';

    		} elseif ( 'icon' == $style ) {
    			/* Create i tag for icon */
    			$image = '<i class="'. $item['icon'] .'"></i>';
    			$classes['image'] = 'has-icon';

    		} else {
    			/* Nothing must be displayed as image. */
    			$image = '';
    			$classes['image'] = 'text-only';


    		}

    		$title       = isset( $item['title'] ) ? '<h4 class="title">' . $item['title'] . '</h4>' : '';
    		$description = isset( $item['text'] )  ? '<div class="description">' . $item['text'] . '</div>' : '';
    		$price       = isset( $item['price'] ) ? '<span class="price">' . $item['price'] . '</span>' : '';

    		/* If we have URL, wrap title and image in <a> */
    		if( !empty( $item['url'] ) ) {

    			$title = !empty( $title ) ? '<a href="'. esc_url( $item['url'] ) .'">'. $title .'</a>' : $title;
    			$image = !empty( $image ) ? '<a href="'. esc_url( $item['url'] ) .'">'. $image .'</a>' : $image;

    		}

    		/* If modal for item is enabled */

    		$extended_content = $content_img = $overlay_modal = '';

    		if ( isset($item['modal']) && 'y' == $item['modal'] && '' !== $item['extended-text'] ) {

    			$rand_id = airkit_rand_string('5');

    			if ( 'image' == $style && !empty( $item['image'] ) ) {
	    			/* Get image URL */
	    			$image_url = self::get_attachment_field( $item['image'], 'url', 'gowatch_grid' );

	    			$content_img = '<div class="content-wrap-img lazy" style="background-image: url('. esc_url( $image_url ) .');"></div>';
    			}

    			$content = $title . $price . '<p>' . $item['extended-text'] . '</p>';

    			$overlay_modal = '
    				<a data-fancybox data-src="#hidden-content-'. $rand_id .'" href="javascript:;" class="overlay-modal-text">
    					<span>'. esc_html__('View details', 'gowatch') .'</span>
    				</a>';

    			$extended_content = '
    				<div class="pricelist-details" style="display: none" id="hidden-content-'. $rand_id .'">
    					<div class="inner-details">
							'. $content_img .'<div class="content-wrap-extended"><div>' . $content . '</div></div>
						</div>
    				</div>';

    			$classes[] = 'has-modal-enabled';
    		}
    		
    		$element .= '
    		<div class="'. $columns_class .'">
	    		<div class="pricelist-item '. implode( ' ', $classes ) .'">
		    		<div class="list-item-inner">
						'. ( isset($image) && '' !== $image ? '<div class="img-wrap">'. $image .'</div>' : '' ) .'
						<div class="content-wrap">
							'. $title .'
							'. $description .'
							'. $price .'
						</div>
						'. $overlay_modal .'
					</div>
					'. $extended_content .'
	    		</div>
    		</div>';

    		// Last loop iteration
    		if ( count( $options['items'] ) - 1 == $i ) {
    			$element .= '</div><!-- /.airkit_pricelist -->';
    		}

    		$i++;
    	}
    }

    return $element;

}


public static function testimonials_element( $options = array() )
{
	$per_row = self::get_column_class( $options['per-row'] );

	if ( empty( $options['items'] ) ) return;

	$testimonials = array();

	foreach ( $options['items'] as $option_element ) {

		$author_img = '';

		if( $options['style'] !== 'no-image'  ) {

			if ( !empty( $option_element['image'] ) ) {

				$img_url = self::get_attachment_field( $option_element['image'], 'url', 'thumbnail' );

				$author_img = '<img class="author-img" src="' . $img_url . '" alt="' . esc_attr( $option_element['name'] ) . '" />';

			} else {

				$img_url = esc_url( get_template_directory_uri() . '/images/noimage.jpg' );
				$author_img = '<img class="author-img" src="' . $img_url . '" alt="' . esc_attr( $option_element['name'] ) . '" />';

			}
		}

		/* get the effects */
		$per_row .= self::parent_effect( $options );
		$options['style'] .= self::child_effect( $options );


		$testimonials[] = '<div class="'. $per_row .'">
			<article class="testimonials-item '. $options['style'] .'">
				<figure>
					'. $author_img .'
				</figure>
				<header>
					<div class="entry-excerpt">'. apply_filters( 'the_content', $option_element['text'] ) .'</div>
					<h4 class="entry-author">
						<a href="'. esc_url( $option_element['url'] ) .'">'. $option_element['name'] .'</a>
					</h4>
					<span class="author-position">'. $option_element['company'] .'</span>
				</header>
			</article>
		</div>';
	}

	return '<div class="ts-testimonials cols-by-' . $options['per-row'] . '">' . self::wrapp_carousel( $options['carousel'], implode( "\n", $testimonials ), $options ) . ' </div>';
}

public static function slider_element( $options = array(), $add_container = true ) 
{
	$source = $options['source'];

	$slides = array();

	$type = isset( $options['type'] ) ? $options['type'] : 'flexslider';
	$options['enable_human_time'] = airkit_option_value('general', 'enable_human_time');

	//Sizes for large screens
	$width_lg = isset( $options['width'] ) ? (int)$options['width'] : 1000;
	$height_lg = isset( $options['height'] ) ? (int)$options['height'] : 650;

	//sizes for small screens
	$width_sm = isset( $options['width-sm'] ) ? (int)$options['width-sm'] : 400;
	$height_sm = isset( $options['height-sm'] ) ? (int)$options['height-sm'] : 350;	

	$crop = true;

	$post_type = 'post';

	if( $source == 'latest-posts' ) $post_type = 'post';
	if( $source == 'latest-videos' ) $post_type = 'video';
	if( $source == 'latest-galleries' ) $post_type = 'ts-gallery';
	if( $source == 'custom-slides' ) $post_type = 'ts_slider';		

	$posts_limit = isset( $options['posts-limit'] ) ? $options['posts-limit'] : -1;


	//Get posts slides
	if( $source !== 'custom-slides' ) {

		$args = array(
			'post_type' => $post_type,
			'posts_per_page' => $posts_limit,
		);

		if( 'y' === $options['featured'] ){

			$args['meta_query'] = array(
				array(
					'key' => 'featured',
					'value' => 'yes',
					'compare' => '=',
				),
			);

		}

		$query = new WP_Query( $args );
		global $post;


		if( $query->have_posts() ) {

			$i = 0;

			while( $query->have_posts() ) {

				$query->the_post();
				setup_postdata( $post );

				$slides[$i]['id'] = get_the_ID();
				$slides[$i]['date'] = (isset($options['enable_human_time']) && 'y' == $options['enable_human_time']) ? airkit_time_to_human_time(get_the_date()) : get_the_date();
				$slides[$i]['title'] = get_the_title();
				$slides[$i]['permalink'] = get_the_permalink();
				$slides[$i]['text'] = airkit_excerpt( 180, get_the_ID(), 'show-subtitle', false );
				$slides[$i]['likes'] = airkit_PostMeta::likes( get_the_ID() );
				$slides[$i]['text-align'] = '';
				$slides[$i]['meta'] = '<ul class="entry-meta">'.  airkit_PostMeta::date( $post->ID ) . '</ul>';
				$slides[$i]['post_class'] = implode( ' ', get_post_class("slider-item") );

				//Images
				$slides[$i]['featimage'] = Airkit_Images::featimage( get_the_ID(), array( 'resize' => 'y', 'w' => $width_lg, 'h' => $height_lg, 'c' => $crop ) );

				$slides[$i]['featimage_sm'] = Airkit_Images::featimage( get_the_ID(), array( 'resize' => 'y', 'w' => $width_sm, 'h' => $height_sm, 'c' => $crop, 'url' => 'y' ) );								
				$slides[$i]['featimage_lg'] = Airkit_Images::featimage( get_the_ID(), array( 'resize' => 'y', 'w' => $width_lg, 'h' => $height_lg, 'c' => $crop, 'url' => 'y' ) );


				if( 'vertical-slider' === $type ) {

					$slides[$i]['meta'] = '';
					$slides[$i]['meta'] = airkit_PostMeta::categories( get_the_ID(), array( 'wrap-class' => 'entry-categories' ));

					//Add cropped thumbnail

					$slides[$i]['thumb'] = Airkit_Images::featimage( get_the_ID(), array( 'url' => 'y', 'resize' => 'y', 'w' => 500, 'h' => 500, 'c' => true  ) );			
				}

				if( 'stream' === $type || 'bxslider' === $type || 'flexslider' === $type ) {
					$slides[$i]['meta'] = airkit_PostMeta::categories( get_the_ID(), array( 'wrap-class' => 'entry-categories' )) . '<ul class="entry-meta">' . airkit_PostMeta::date( $post->ID ) . '</ul>';
				}

				if( 'klein' === $type ) {

					$slides[$i]['meta'] = airkit_PostMeta::categories( get_the_ID(), array( 'wrap-class' => 'entry-categories' )); 
					$slides[$i]['text'] = airkit_excerpt( 80, get_the_ID(), 'show-subtitle', false );
					
					// Add alternation for caption aligns
					if ( $i % 2 == 0 ) {
						$slides[$i]['text-align'] = 'left';
					} else{
						$slides[$i]['text-align'] = 'right';
					}
				}


            	$i++;

			}
			wp_reset_postdata();
		}


	} elseif ( 'custom-slides' === $source && isset( $options['items'] ) ) {

		$i = 0;

		foreach ( $options['items'] as $item ) {
			
			$slides[$i]['id'] = self::get_attachment_field( $item['image-url'], 'id' );
			$slides[$i]['date'] = '';
			$slides[$i]['title'] = $item['title'];
			$slides[$i]['permalink'] = $item['url'];
			$slides[$i]['text'] = $item['text'];
			$slides[$i]['text-align'] = $item['text-align'];
			$slides[$i]['likes'] = '';
			$slides[$i]['meta'] = '';

			$slides[$i]['img_url'] = self::get_attachment_field( $item['image-url'], 'url', 'gowatch_wide' );
			$slides[$i]['featimage_sm'] = self::get_attachment_field( $item['image-url'], 'url', 'gowatch_wide' );							
			$slides[$i]['featimage_lg'] = self::get_attachment_field( $item['image-url'], 'url', 'gowatch_wide' );		

			//Images.
			$slides[$i]['featimage']  = '<img '. Airkit_Images::lazy_img( $slides[$i]['img_url'], array( 'resize' => 'y', 'w' => $width_lg, 'h' => $height_lg, 'c' => true ) ) .' alt="'. esc_attr( $item['title'] ) .'">';						

			if( 'vertical-slider' === $type ) {

				$slides[$i]['thumb'] = self::get_attachment_field( $item['image-url'], 'url', 'gowatch_grid' );
			}

			if( 'klein' === $type ) {

				$slides[$i]['meta'] = '<ul class="entry-categories"><li><a href="'. esc_url( $item['url'] ) .'">'. $item['url-title'] .'</a></li></ul>';

			}

			$i++;

		}

	}

	//Get slider classes and custom templates

	$class = 'airkit_slider ' . $type;

	$attr = $before = $navigation = $item_attr = $after = '';

	/* Custom classes, attributes, navigation */
	if( 'flexslider' === $type ) {

		$attr = 'data-animation="slide"';

	} elseif ( 'slicebox' === $type ) {

		$navigation = '
				<div id="nav-arrows" class="nav-arrows">
					<a href="#" class="icon-right sb-next"></a>
					<a href="#" class="icon-left sb-prev"></a>
				</div>';

	} elseif ( 'bxslider' === $type ) {

		$navigation = '
				<div class="controls-direction">
					<span id="slider-next"></span>
					<span id="slider-prev"></span>
				</div>';
				
	} elseif ( 'parallax' === $type ) {

		$class .= ' airkit_parallax-slider ';

		$navigation = '
                <ul class="sf-controls">
					<li class="previous"><a href="#"><i class="icon-left"></i></a></li>
					<li class="next"><a href="#"><i class="icon-right"></i></a></li>
				</ul>';

	} elseif ( 'stream' === $type ) {

		$class .= ' joyslider ';

		$before = '<div class="slider-container">';
		$after  = '</div>';

	} elseif ( 'corena' === $type ) {

		$class .= ' corena-slider ';

		$before = '<div class="slider-container">';
		$after  = '</div>';

	} elseif ( 'klein' === $type ) {

		$navigation = '
		              <ul class="nav-arrows">
						<li class="ar-left">
							<div class="arrow"><i class="icon-left"></i><span>'. esc_html__( 'Prev', 'gowatch' ) .'</span></div>
						</li>
						<li class="ar-right">
							<div class="arrow"><span>'. esc_html__( 'Next', 'gowatch' ) .'</span><i class="icon-right"></i></div>
						</li>
		              </ul>';

	} elseif ( 'mambo' === $type ) {

		$class .= ' mambo-slider ';

		$navigation = '<div class="container nav-slides-container"><ul class="navSlides">';

		// Add the small slides in here
		foreach ( $slides as $slide ) {

			$inner_content = '';

			if ( $post_type == 'video' ) {
				$inner_content = '
									<a class="post-format-link" href="' . $slide['permalink'] . '" title="' . $slide['title'] . '">
										<span class="post-type">
											<i class="icon-play-full"></i>
										</span>
									</a>
								 ';
			}

			$navigation .= 

								'<li class=" '. $slide['post_class'] .'" '. $item_attr .' ">
									<article>
										<figure class="image-holder has-background-img" style="background-image: url(' .$slide['featimage_sm'] . ');"></figure>
										<header class="nav-slide">
											' . $inner_content . '
											<h3>' . $slide['title'] . '</h3>
											<span class="entry-meta-date">' . $slide['date'] . '</span>
										</header>
									</article>
								</li>';
		}
		$navigation .= '</ul></div>';

	}

	//Subtle images overlay effect
	$subtle_overlay = airkit_overlay_effect_type(false);

	//Render the slider template

	if ( 'tilter-slider' === $type ) {
		ob_start();
		ob_clean();

		foreach ($slides as $slide) {

			self::$options = $options;
			self::$options['item'] = $slide;
			get_template_part('includes/templates/tilter-slider');

		}

		$slides = '<div class="tilter-slides">' . ob_get_clean() . '</div>';
		$element = '<div class="airkit_tilter-slider">'. $slides .'</div>';

	} else {

		$element = '
			<div class="'. esc_attr( $class ) .'" '. $attr .'> ' . $before . '
				<ul class="slides">';

			foreach ( $slides as $slide ) {
				// Build slide
				// Base structure + templates for eeach slider type

				if( 'stream' === $type || 'corena' === $type ) {

					$item_attr = ' data-slide-title="'. $slide['title'] .'" ';						
					$item_attr .= ' data-slide-meta-date="'. $slide['date'] .'" ';						

				}

				if( 'vertical-slider' === $type ) {

					$item_attr = 'data-thumb="'. $slide['thumb'] .'" data-title="'. $slide['title'] .'" data-time="'. $slide['date'] .'"';

				}
				/*
				 * Build slide. Common structure for all sliders.
				 */
				if ( 'klein' !== $type ) {

					$element .= '<li class="'. $slide['post_class'] .'" '. $item_attr .' 
					                 data-img-sm="'. esc_url( $slide['featimage_sm'] ) .'"
					                 data-img-lg="'. esc_url( $slide['featimage_lg'] ) .'">
									<a href="'. $slide['permalink'] .'"> '. $slide['featimage'] . $subtle_overlay .' </a>
									<div class="slider-caption-container '. $slide['text-align'] .'">
										<div class="container">
											<div class="slider-caption">
												'. $slide['meta'] .'
												<h3 class="slide-title">
													<a href="'. esc_url( $slide['permalink'] ) .'">' . $slide['title'] . '</a>
												</h3>
												<div class="excerpt">
													'. $slide['text'] .'
												</div>
											</div>
										</div>
									</div>
								</li>';

				} else {
					/*
						 * Build slide structure for klein slider.
					 */
					$element .= '
								<li class="'. $slide['post_class'] .'" '. $item_attr .'
					                data-img-sm="'. esc_url( $slide['featimage_sm'] ) .'"
					                data-img-lg="'. esc_url( $slide['featimage_lg'] ) .'">								
									<a href="'. $slide['permalink'] .'"> '. $slide['featimage'] . $subtle_overlay .' </a>
									<div class="slider-caption-container '. $slide['text-align'] .'">
									    <div class="side-lines"></div>
										<div class="slider-caption '.  $slide['text-align']  .'">
											<h3 class="slide-title">
												<a href="'. esc_url( $slide['permalink'] ) .'">' . $slide['title'] . '</a>
											</h3>
											'. (!empty($slide['text']) ? '<div class="excerpt">' . $slide['text'] . '</div>' : '') .'
										</div>
										'. $slide['meta'] .'
									</div>                                	
								</li>';

				}
				
			}
			
		$element .= '
				</ul>
				'. $navigation .'
				'. $after .'
			</div>';
	}

	return '<div class="col-lg-12">' . $element . '</div>';		
	
}

public static function callaction_element($options = array())
{
	ob_start();
	ob_clean();
		self::$options = $options;
		get_template_part('includes/templates/callaction');
	$element = ob_get_clean();
	wp_reset_postdata();
	
	return $element;
}

public static function advertising_element($options = array())
{
	$columns_class = isset($options['columns']) ? $options['columns'] : 'col-lg-12 col-md-12';

	return 	'<div class="'. $columns_class .'">
	<div class="ad-container">'
		. $options['advertising'] .
		'</div>
	</div>';
}

public static function empty_element($options = array())
{
	return '&nbsp;';
}

public static function text_element($options = array()) {

	$columns_class = isset($options['columns']) ? $options['columns'] : 'col-lg-12 col-md-12 col-sm-12';

	return '<div class="'. esc_attr( $columns_class ) .' text-element">'
				. do_shortcode( $options['text'] ) . '
			</div>';
}

public static function video_element($options = array())
{
	$enable_lightbox = isset($options['lightbox']) ? $options['lightbox'] : 'n';

	$fancybox = '';
	$fancybox_id = 'ts-video-' . rand(1, 10000);
	$style = ( $enable_lightbox == 'y' ) ? 'style="display: none;"' : '';

	if( $enable_lightbox == 'y' ){

		// If is iframe, show default fancybox
		// if is URL, show fancybox3 video

		if( !empty( $options['embed'] ) ) {

			if( strpos( $options['embed'], 'iframe' ) ) {

				$fancybox = '<a href="#'. $fancybox_id .'" class="ts-video-fancybox embed"> <span class="icon-play"></span>' . $options['title'] . '</a>';

			} else {

				$fancybox = '<a href="'. $options['embed'] .'" data-fancybox class="ts-video-fancybox url"> <span class="icon-play"></span>' . $options['title'] . '</a>';	
			}
		}		
	}

	return
		'<div class="col-lg-12">
			<div ' . $style . ' class="embedded_videos' . self::classes( $options ) . '" id="' . $fancybox_id . '">' .
				apply_filters( 'the_content', $options['embed'] ) . '
			</div>
			' . $fancybox .
		'</div>';
}

public static function image_element( $options = array() )
{
	if ( empty( $options['image-url'] ) ) return;

	$data = explode( '|', $options['image-url'] );
	$attr = array();

	if ( isset( $data[0] ) && ! empty( $data[0] ) ) {
		
		$image_details = wp_get_attachment_image_src( $data[0], 'full' );
		
		if ( isset( $image_details[1], $image_details[2] ) ) {
			$width = $image_details[1];
			$height = $image_details[2];
		}

		$attr['style'] = $options['retina'] === 'y' && isset( $width ) ? 'width: ' . $width / 2 . 'px;' : '';
		$attr['class'] = 'attachment-full size-full lazy-ignor';

		$image = wp_get_attachment_image( $data[0], 'full', false, $attr );
		
	}


	if( ! empty( $options['forward-url'] ) ){

		return 	'<div style="text-align:' . $options['align'] . '" class="col-lg-12">
					<a target="' . $options['target'] . '" href="' . $options['forward-url'] . '">
						'. $image .'
					</a>
				</div>';

	} else {

		return 	'<div style="text-align:' . $options['align'] . '" class="col-lg-12">
					'. $image .'
				</div>';
	}
}

public static function image_carousel_element($options = array())
{
	ob_start();
	ob_clean();
		self::$options = $options;
		get_template_part('includes/templates/image-carousel');
	$element = ob_get_clean();
	wp_reset_postdata();
	return $element;
}

public static function facebook_block_element( $options = array() ){

	$cover = isset($options['cover']) ? $options['cover'] : 'false';

	if ( isset($options['url']) && $options['url'] != '' ) {

		return '
		<div class="col-lg-12">
			<div class="fb-page" data-href="'. esc_url($options['url']) .'" data-width="'. (wp_is_mobile() ? '300' : '500') .'" data-height="350" data-small-header="false" data-adapt-container-width="true" data-hide-cover="'. $cover .'" data-show-facepile="true" data-show-posts="true">
				<div class="fb-xfbml-parse-ignore">
					<blockquote cite="'. esc_url($options['url']) .'">
						<a href="'. esc_url($options['url']) .'">'. esc_html__( 'Facebook', 'gowatch' ) .'</a>
					</blockquote>
				</div>
			</div>
			<div id="fb-root"></div>
		</div>
		<script>
			(function(d, s, id) {
				var js, fjs = d.getElementsByTagName(s)[0];
				if (d.getElementById(id)) return;
				js = d.createElement(s); js.id = id;
				js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.7";
				fjs.parentNode.insertBefore(js, fjs);
			}(document, "script", "facebook-jssdk"));
</script>';
}

}

public static function clients_element($options = array())
{
	$clients = $options['items'];

	if( empty( $clients ) ) {
		return;
	}

	$columns = self::get_column_class( $options['per-row'] );

	$items = '';

	foreach ( $clients as $client ) {
		$attr = '';

		$img_url = self::get_attachment_field( $client['image'], 'url', 'full' );

		if( !empty( $img_url ) ) {

			$brand = '<img '. Airkit_Images::lazy_img( $img_url ) .' alt="'. esc_attr( $client['title'] ) .'">';

		} else {

			$brand = '<h3 class="title">'. $client['title'] .'</h3>';

		}

		if( isset( $client['title'] ) ) {

			$attr = 'class="has-tooltip" data-tooltip="'. esc_attr( $client['title'] ) .'"';

		}

		$parent_effect = self::parent_effect( $client );
		$child_effect  = self::child_effect( $client );

		$items .= '<div class="item ' . $columns . $parent_effect . '">
			<div class="'. $child_effect .'" '. $attr .'>
				<a target="_blank" href="'. esc_url( $client['url'] ) .'">
				'. $brand .'
			</a>
			</div></div>';
	}

	return '<div data-show="'. $options['per-row'] .'" class="ts-clients-view cols-by-'. $options['per-row'] .'" >'. self::wrapp_carousel( $options['carousel'], $items, $options ) .'</div>';

}

	public static function features_block_element($options = array())
	{

		ob_start(); ob_clean();

			self::$options = $options;
			get_template_part( 'includes/templates/feature' );

		$elements = ob_get_clean();

		return '<div class="airkit_icon-box cols-by-' . $options['per-row'] . ' airkit_gutter-' . $options['gutter'] . '">' . $elements . '</div>';
	}

	public static function listed_features_element( $options = array() )
	{
		ob_start(); ob_clean();

			self::$options = $options;
			get_template_part( 'includes/templates/listed-feature' );

		$elements = ob_get_clean();

		$animation = false;

		return $elements ? '<div class="airkit_listed-features">' . $elements . '</div>' : esc_html__( 'Features are not added', 'gowatch' );
	}

	public static function spacer_element($options = array())
	{
		return '<div style="height: ' . esc_attr( $options['height'] ) . 'px;"></div>';
	}

	public static function icon_element($options = array())
	{
		$icon_name = (isset($options['icon'])) ? $options['icon'] : '';
		$icon_align = (isset($options['icon-align'])) ? $options['icon-align'] : '';
		$icon_color = (isset($options['font-color'])) ? $options['font-color'] : '';
		$icon_size = (isset($options['icon-size'])) ? $options['icon-size'] : '';

		$icon_styles = 'style="font-size: ' . $icon_size . 'px; color: ' . $icon_color . ';"';

		if ( isset( $options['shortcode'] ) ) {

			return '<i class="' . $icon_name . '" ' . $icon_styles . '></i>';

		} else {

			return '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" data-element="icon-element" style="text-align: '.esc_attr( $icon_align ).';">' . '<i class="' . $icon_name . '" ' . $icon_styles . '></i>' . '</div>';
		}

	}

	public static function counter_element($options = array())
	{
		$parent_effect = '';
		$effect = '';

		if ( 'with-track-bar' == $options['track-bar'] ) {

			$track_bar_color = $options['track-bar-color'];
			$icon = '';

		} else {

			$track_bar_color = 'transparent';
			$icon = '<div class="counter-icon"><i class="' . $options['icon'] . '"></i></div>';
		}

		if ( 'none' !== $options['reveal-effect'] ) {

			$parent_effect = ' animatedParent animateOnce';
			$effect = ' class="animated '. $options['reveal-effect'] . ' ' . $options['reveal-delay'] .'"';
		}

		$counter =
			'<div data-bar-color="' . $track_bar_color . '" data-counter-type="' . $options['track-bar'] . '" class="ts-counters' . $parent_effect . '" style="color:' . $options['text-color'] . '">
				<article' . $effect . '>
					'. $icon .'
					<div class="entry-box">
						<div class="chart" data-percent="' . $options['counters-precents'] . '">
							<span class="percent">0</span>
							<div class="entry-title"><span class="the-title">'. $options['counters-text'] .'</span></div>
						</div>
					</div>
				</article>
			</div>';

		return $counter;

	}

	public static function map_element( $options = array() )
	{
		$map_address = '';
		$map_width = '';
		$map_height = '';
		$map_lat = '';
		$map_lng = '';
		$map_type = '';
		$map_style = '';
		$map_zoom = '';
		$map_type_control = '';
		$map_zoom_control = '';
		$map_scale_control = '';
		$map_scroll_wheel = '';
		$map_draggable_dir = '';
		$map_marker = '';

			// Check map address
		if( isset($options['address']) ){
			$map_address = $options['address'];
		}
			// Check iframe map width
		if( isset($options['width']) ){
			$map_width = $options['width'];
		}
			// Check iframe map height
		if( isset($options['height']) ){
			$map_height = $options['height'];
		}
			// Check map latitude
		if( isset($options['latitude']) ){
			$map_lat = $options['latitude'];
		}
			// Check map longitude
		if( isset($options['longitude']) ){
			$map_lng = $options['longitude'];
		}
			// Check map type (roadmap, satellite, hybrid, terrain)
		if( isset($options['type']) ){
			$map_type = $options['type'];
		}
			// Check map style(Essence, Subtle grayscale, Shades of grey, Purple, Best ski pros or your custom style)
		if( isset($options['style']) ){
			$map_style = $options['style'];
		}
			// Check map zoom
		if( isset($options['zoom']) ){
			$map_zoom = (int)$options['zoom'];
		}
			// Check map type-control
		if( isset($options['type-control']) ){
			$map_type_control = $options['type-control'];
		}
			// Check map zoom-control
		if( isset($options['zoom-control']) ){
			$map_zoom_control = $options['zoom-control'];
		}
			// Check map scale-control
		if( isset($options['scale-control']) ){
			$map_scale_control = $options['scale-control'];
		}
			// Check map scroll-wheel
		if( isset($options['scroll-wheel']) ){
			$map_scroll_wheel = $options['scroll-wheel'];
		}
			// Check map draggable-direction
		if( isset($options['draggable-direction']) ){
			$map_draggable_dir = $options['draggable-direction'];
		}

		// Check map pin/marker image
		if ( ! empty( $options['marker-img'] ) ) {

			$map_marker = self::get_attachment_field( $options['marker-img'] );
		}

		$randId = rand();

		return '<div class="col-lg-12 col-md-12 col-sm-12">
					<div class="ts-map-create" id="ts-map-canvas-'. $randId .'" style="width: '.$map_width.'%; height: '.$map_height.'px;"
					data-address="'.$map_address.'"
					data-lat="'.$map_lat.'"
					data-lng="'.$map_lng.'"
					data-type="'.$map_type.'"
					data-style="'.$map_style.'"
					data-zoom="'.$map_zoom.'"
					data-type-ctrl="'.$map_type_control.'"
					data-zoom-ctrl="'.$map_zoom_control.'"
					data-scale-ctrl="'.$map_scale_control.'"
					data-scroll="'.$map_scroll_wheel.'"
					data-draggable="'.$map_draggable_dir.'"
					data-marker="'.$map_marker.'"></div>
				</div>';
	}

	public static function sidebar_element($options = array())
	{
		$stickySidebarClass = '';
		ob_start();
		dynamic_sidebar( @(string)$options['sidebar-id'] );
		if ($options['sidebar-sticky'] == 'y') {
			$stickySidebarClass = 'sidebar-is-sticky';
		}
		$sidebar = ob_get_contents();
		ob_end_clean();
		return '<div class="col-lg-12 col-md-12 col-sm-12"><div class="ts-sidebar-element ' . $stickySidebarClass . '">' . $sidebar . '</div></div>';
	}

	public static function contact_form_element($options = array())
	{
		ob_start();
		ob_clean();
			if ( class_exists( 'Ts_Layout_Compilator' ) ) {
				Ts_Layout_Compilator::touchcodes_contact_form($options);
			} else{
				echo "Please install gowatch Plugin for this feature";
			}
			
		$element = ob_get_clean();
		wp_reset_postdata();
		return $element;
	}

	public static function featured_area_element( $options = array() )
	{

		$args = array();
		$options['posts-limit'] = 10;

		if( 'style-2' === $options['style'] ) {
			$options['posts-limit'] = 5;

		}

		if( 'style-3' === $options['style'] ) {
			$options['posts-limit'] = 3;

		}

		if ( !isset( $airkit_wp_query ) || null === $airkit_wp_query ) {

			$args = self::query( $options );
			$query = new WP_Query( $args );

		} else {
			$query = $airkit_wp_query;
			$args = $query->query_vars;
		}

		if ( $query->have_posts() ) {
			ob_start();
			ob_clean();

				self::$options = $options;
				self::$options['posts_query'] = $query;
				self::$options['is-view-article'] = true;

				get_template_part('includes/templates/featured-area');

			$element = ob_get_clean();
			wp_reset_postdata();

		} else {
			wp_reset_postdata();
			return 'No posts found';
		}

		/* Restore original Post Data */
		wp_reset_postdata();


		return '<div class="col-lg-12 col-md-12 col-sm-12">'
				. $element .
				'
		</div>';
	}



	public static function category_grids_element( $options = array() )
	{

		$args = array();

		$element = '';
		$options['featured'] = '';
		$options['offset'] = '';
		$options['meta'] = 'y';

		$columns_class = airkit_Compilator::get_column_class( $options['per-row'] );

		$tax = self::get_tax( $options['post-type'] );

		if( !empty( $options[ $tax ] ) ) {

			ob_start();
			ob_clean();

			foreach ( $options[ $tax ] as $category ) {

				if ( !isset( $airkit_wp_query ) || null === $airkit_wp_query ) {

					$query_args = $options;

					$query_args[ $tax ] = array( $category );

					$args = self::query( $query_args ); 

					$query = new WP_Query( $args );

				} else {
					$query = $airkit_wp_query;
					$args = $query->query_vars;
				}	

				$title_args = array( 
					'style'          => $options['style'], 
					'size'           => $options['size'],
					'target'         => '_self',
					'title-color'    => $options['title-color'],
					'subtitle-color' => $options['subtitle-color'],
					'icon'           => '',
					'letter-sapcer'  => $options['letter-spacer']
				);

				if ( $query->have_posts() ) {

						$options['count'] = 0;
						$options['total_posts'] = count( $query->posts );

						// Get current category object.
						$category_object = get_term_by( 'slug', $category, airkit_Compilator::get_tax( $options['post-type'] ) );		
						
						$title_args['title'] = $category_object->name;
						$title_args['subtitle'] = $category_object->description;						
						$title_args['link'] = get_term_link( $category_object->slug, airkit_Compilator::get_tax( $options['post-type'] ) );

						echo '<div class="'. $columns_class .'">';
						if ( isset( $options['show-title'] ) && $options['show-title'] == 'y' ) {
							echo '<div class="row">' . self::title_element( $title_args ) . '</div>';
						}

						while( $query->have_posts() ) {

							$query->the_post();

							self::$options = $options;	
							self::$options['is-view-article'] = true;

							get_template_part('includes/templates/category-grids-view');
						
							$options['count']++;
						}

						echo '</div>';

				} else {

					wp_reset_postdata();
					return 'No posts found';

				}						


			}

			$element = ob_get_clean();

		}

		wp_reset_postdata();



		return '<div class="category-grids cols-by-'. $options['per-row'] .'">' . $element . '</div>';
	}



	public static function list_categories_element( $options = array() )
	{
		$element = $count_text = '';
		$attributes = array();

		$attributes['class'][] = 'item';

		$post_type = $options['post-type'];

		/* Get Columns class */
		$columns_class = self::get_column_class( $options['per-row'] );
		$attributes['class'][] = $options['layout-style'];

		$term_options = airkit_option_value( 'term_options' );

		/* Get taxonomy name depending on selected post type */
		$taxonomy  = self::get_tax( $post_type );

		if( !empty( $options[ $taxonomy ] ) ) {

			$categories = $options[ $taxonomy ];

			foreach ( $categories as $cat ) {

				/* Get term object for current category */	
				$term = get_term_by( 'slug', $cat, $taxonomy );

				if ( empty( $term ) ) continue;

				// Set count text depending on selected post type
				// Translates and retrieves the singular or plural form based on the supplied number
				if ( $post_type == 'post' ) {

					$count_text = sprintf( _n( '%s Post', '%s Posts', $term->count, 'gowatch' ), number_format_i18n( $term->count ) );

				} elseif ( $post_type == 'video' ) {

					$count_text = sprintf( _n( '%s Video', '%s Videos', $term->count, 'gowatch' ), number_format_i18n( $term->count ) );

				} elseif ( $post_type == 'ts-gallery' ) {

					$count_text = sprintf( _n( '%s Gallery', '%s Galleries', $term->count, 'gowatch' ), number_format_i18n( $term->count ) );

				} elseif ( $post_type == 'portfolio' ) {

					$count_text = sprintf( _n( '%s Portfolio', '%s Portfolios', $term->count, 'gowatch' ), number_format_i18n( $term->count ) );

				}

				/* Get term thumbnail */
				if( isset( $term_options[ $term->term_id ]['term-thumbnail'] ) ){

					$thumbnail = $term_options[ $term->term_id ]['term-thumbnail'];
					$thumbnail_url = self::get_attachment_field( $thumbnail, 'url', 'full' );

				}
				
				/* Get term link */
				$term_url = get_term_link( $term, $taxonomy );

				if ( !empty( $thumbnail_url ) ) {
					$attributes['class']['thumbnail'] = 'has-thumbnail';
					$attributes['style']['bg'] = "background-image: url({$thumbnail_url})";
				} else {
					$attributes['class']['thumbnail'] = 'no-thumbnail';
					$attributes['style']['bg'] = '';
				}

				/* Build the output for current category */
				$element .= '
        			<div class="'. $columns_class .'">
        				<figure '. airkit_element_attributes( $attributes, $options, $term->term_id, false ) .'>
        					<figcaption>
			        			<h4 class="entry-title">'. esc_attr( $term->name ) .'</h4>
			        			<div class="entry-content-footer">
				        			<span class="count">'. $count_text .'</span>
			        			</div>
			        		</figcaption>
			        		<a class="overlay-link" href="'. esc_url( $term_url ) .'"></a>
        				</figure>
        			</div>';
			}
		}

		return '<div class="airkit_list-categories cols-by-'. $options['per-row'] .'">' . $element . '</div>';
	}

	public static function buttons_element( $options = array() )
	{

		switch ($options['size']) {
			case 'big':
			$button_class = 'big';
			break;

			case 'medium':
			$button_class = 'medium';
			break;

			case 'small':
			$button_class = 'small';
			break;

			case 'xsmall':
			$button_class = 'xsmall';
			break;

			default:
			$button_class = 'medium';
			break;
		}

		$button_align = (isset($options['button-align'])) ? strip_tags($options['button-align']) : '';
		$button_icon = '';

		if ( isset($options['mode-display']) && $options['mode-display'] == 'background-button' ) {

			$class_mode_display = 'background-button';

		} elseif ( isset($options['mode-display']) && $options['mode-display'] == 'border-button') {

			$class_mode_display = 'border-button';

		} else{

			$class_mode_display = 'ghost-button';

		}


		$border_color = (isset($options['border-color']) && !empty($options['border-color']) && is_string($options['border-color'])) ? esc_attr($options['border-color']) : 'inherit';
		$background_color = (isset($options['bg-color']) && !empty($options['bg-color']) && is_string($options['bg-color'])) ? esc_attr($options['bg-color']) : 'inherit';
		$text_color = (isset($options['text-color']) && is_string($options['text-color'])) ? esc_attr($options['text-color']) : '';

		$effect = isset($options['effect']) && $options['effect'] !== 'none' ? $options['effect'] : 'none';
		$classDelay = isset($options['delay']) && $options['delay'] !== 'none' ? ' '. $options['delay'] : '';

		if ( isset( $options['icon'] ) && $options['icon'] !== 'icon-noicon' ) {

			$button_class .= ' button-has-icon';
			$button_icon = '<i class="'. $options['icon'] .'"></i>';
		}

		$options['url'] = esc_url($options['url']);
		$textColorHover = isset($options['text-hover-color']) ? $options['text-hover-color'] : '#fff';

		$colors = '';
		$bgHoverColor = isset($options['bg-hover-color']) ? $options['bg-hover-color'] : '#fff';

		if ( $options['mode-display'] == 'background-button' ) {

			$bgHoverColor = isset($options['bg-hover-color']) ? $options['bg-hover-color'] : '#fff';

			$colors = 'style="background-color: '. $background_color .'; color: '. $text_color .';"';
			$button_class .= ' bg-button ';

			$mouseOver = 'backgroundColor=\'' . $bgHoverColor . '\';this.style.color=\'' . $textColorHover . '\'"';
			$mouseOut = 'backgroundColor=\'' . $background_color .'\';this.style.color=\'' . $text_color . '\'"';

		} elseif ( 'ghost-button' == $options['mode-display'] ) {

			$button_class .= ' ghost-button ';

			$colors = 'style="border: 2px solid '. $border_color .'; color: '. $text_color .';"';
			$mouseOver = 'backgroundColor=\'' . $bgHoverColor . '\';this.style.borderColor=\'' . $bgHoverColor . '\';this.style.color=\'' . $textColorHover . '\'"';
			$mouseOut = 'backgroundColor=\'transparent\';this.style.borderColor=\'' . $border_color . '\';this.style.color=\'' . $text_color . '\'"';

		} else {
				//$borderColor
			$colors = 'style="border-color: '. $border_color .'; color: '. $text_color .';"';
			$button_class .= ' outline-button ';
			$borderHoverColor = isset($options['border-hover-color']) ? $options['border-hover-color'] : '#fff';
			$mouseOver = 'borderColor=\''. $borderHoverColor .'\';this.style.color=\''. $textColorHover .'\'"';
			$mouseOut = 'borderColor=\''. $border_color .'\';this.style.color=\''. $text_color .'\'"';
		}

		$randClass = uniqid( 'ts-' );

		if ( ! isset($options['target']) ) {

			$options['target'] = '_blank';
		}

		if ( isset( $options['shortcode'] ) ) {

	       	$start = '';

	       	$end = '';

	   	} else {

	   		$start = '<div class="col-lg-12 col-md-12 col-sm-12 ' . $button_align . '">';

	   		$end = '</div>';

	   	}
	   	
		return 	$start .
					'<a onMouseOver="this.style.'. $mouseOver .' onMouseOut="this.style.'. $mouseOut .' href="' . esc_url($options['url']) . '" target="' . esc_attr($options['target']) .'" class="ts-button ' . $button_class . ' ts-' . $options['icon-align']  . ' '. $randClass .'" ' . $colors . '>'

						. ($options['icon-align'] == 'left-of-text' || $options['icon-align'] == 'above-text' ? $button_icon : '') . '<span>' . stripslashes($options['text']) . '</span>' . ($options['icon-align'] == 'right-of-text' ? $button_icon : '') .

					'</a>' .
				$end;
	}

	public static function shortcodes_element($options = array()) {
		$paddings = (isset($options['paddings']) && ($options['paddings'] == 'y' || $options['paddings'] == 'n')) ? $options['paddings'] : 'n';
		$div_paddings_start = $paddings == 'n' ? '<div class="col-lg-12 col-md-12 col-sm-12">' : '';
		$div_paddings_end = $paddings == 'n' ? '</div>' : '';
		return $div_paddings_start . '<div class="ts-shortcode-element">
		' . apply_filters('the_content', stripslashes(@$options['shortcodes'])) . '
	</div>' . $div_paddings_end;
	}

	public static function banner_element( $options = array() )
	{
		$image = self::get_attachment_field( $options['img'] );

		$background = 'background: url(' . esc_url( $image ) . ') no-repeat center top;';
		$lazy_attr = '';

		if( 'y' == airkit_option_value( 'general', 'enable_imagesloaded' ) ) {
			$background = '';
			$lazy_attr = 'data-original="'. esc_url( $image ) .'"';
		}


		$banner_box =
			'<div class="col-lg-12 col-md-12">
				<div class="airkit_banner-box lazy text-' . $options['text-align'] . '" '. $lazy_attr .'
						 style="'. $background .'
						 		background-size: cover;
						 		background-color: '. $options['bg-color'] .';
						 		color: '. $options['text-color'] .';
						 		height: ' . $options['height'] . 'px;">
					<div class="banner-content">
						<h3 class="title">
							<a href=' . esc_url( $options['button-url'] ) . '>' . esc_html( $options['title'] ) . '</a>
						</h3>
						<div class="description">
							'. esc_html( $options['description'] ) .'
						</div>
						<span class="square big"></span>
						<span class="square small"></span>
						<a href=' . esc_url( $options['button-url'] ) . ' class="read-more" 
									style="background-color:' . $options['button-background'] . ';
										   color: ' . $options['button-text-color'] . '">' . esc_html( $options['button-title'] ) . 
						'</a>
					</div>
				</div>
			</div>';

		return $banner_box;
	}

public static function toggle_element( $options = array() ) {

	$element = '<div class="ts-toggle-box '. $options['state'] .'">
			<div class="toggle-heading">
				<h3 class="toggle-title"> <i class="icon-right"></i> '. $options['title'] .'</h3>
			</div>
			<div class="toggle-content">'. $options['description'] .'</div>

		</div>';

	return '<div class="col-lg-12">' . $element . '</div>';
}

public static function tab_element( $options = array() )
{
    $tabs =  isset( $options['items'] ) && is_array( $options['items'] ) ? $options['items'] : '';

    if ( empty( $tabs ) ) {

    	return '';
    }

    $mode = isset( $options['mode'] ) ? $options['mode'] : 'horizontal';

    $i = 0;

	$content = '';
	$li = '';

    foreach ( $tabs as $tab ) {

    	$id = md5( rand() );
        $active = $i == 0 ? ' active' : '';

        $li .= '<li class="ts-item-tab' . $active . '">
					<a href="#' . $id . '">' .
						esc_html( $tab['title'] ) .
					'</a>
				</li>';

        $content .= '<div class="tab-pane' . $active . '" id="' . $id . '">' . nl2br( $tab['text'] ) . '</div>';

        $i++;
    }

    return 	'<div class="col-lg-12 col-md-12">
    			<div class="ts-tab-container display-' . $mode . '">
    				<div class="ts-tabs-nav">
						<ul class="nav nav-tabs">' .
							$li .
						'</ul>
					</div>
					<div class="tab-content">' .
						$content .
					'</div>
				</div>
			</div>';
}

public static function breadcrumbs_element($options = array()){
	return '<div class="col-lg-12">' . airkit_breadcrumbs() . '</div>';
}

public static function timeline_features_element($options = array())
{
	ob_start();
	ob_clean();
		self::$options = $options;
		get_template_part('includes/templates/timeline-features');
	$elements = ob_get_clean();
	return $elements;
}

public static function ribbon_element( $options = array() )
{
	ob_start();
	ob_clean();
		self::$options = $options;
		get_template_part('includes/templates/ribbon');
	$elements = ob_get_clean();

	return $elements;
}

public static function count_down_element($options = array())
{
	ob_start();
	ob_clean();
		self::$options = $options;
		get_template_part('includes/templates/count-down');
	$elements = ob_get_clean();
	return $elements;
}

public static function powerlink_element($options = array())
{

	$src = !empty( $options['image'] ) ? esc_url( self::get_attachment_field( $options['image'], 'url', 'gowatch_grid' ) ) : '';

	$button_text = !empty($options['button-text']) ? esc_html($options['button-text']) : '';
	$button_url =  !empty($options['button-url']) ? esc_url($options['button-url']) : '';

	//Subtle images overlay effect
	$subtle_overlay = airkit_overlay_effect_type(false);

	$element = '<div class="col-md-12 col-lg-12 airkit_powerlink">
		<figure>
			<img src="'. $src .'" alt="'. esc_attr( $options['title'] )  .'">
			'. $subtle_overlay .'
			<figcaption>
				<div class="entry-content">
					<h4 class="title">'. $options['title'] .'</h4>
					<a href="'. $button_url .'" class="button">'. $button_text .'</a>
					<a href="'. $button_url .'"></a>
				</div>
				<a href="'. $button_url .'" class="overlay-link"></a>
			</figcaption>
		</figure>
	</div>';

	return $element;
}

public static function calendar_element( $options = array() )
{	
	$size = (isset($options['size']) && $options['size'] == 'small') ? 'ts-small-calendar' : 'ts-big-calendar';
	$nonce = wp_create_nonce( 'security' );

	return '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">' . airkit_draw_calendar_callback(date('m'), date('Y'), $size, $nonce) . '</div>';
}

public static function events_element( $options = array(), $airkit_wp_query = NULL )
{

	$options['post-type'] = 'event';

	$ajax_load_more = ( isset($options['ajax-load-more'] ) && $options['ajax-load-more'] === true) ? true : false;

	if ( null === $airkit_wp_query ) {

		$args = self::query( $options );
		$query = new WP_Query( $args );

	} else {
		$query = $airkit_wp_query;
		$args = $query->query_vars;
	}

	if( $query->have_posts() ){

		ob_start();
		ob_clean();

			self::$options = $options;
			while ( $query->have_posts() ) { $query->the_post();

				get_template_part('includes/templates/events');
			}

		$elements = ob_get_clean();

		$args['options'] = $options;

		$pagination_content = $options['pagination'] !== 'none' ? self::archive_navigation( $options ) : '';

		wp_reset_postdata();

		$load_more = self::pagination( $query, $args );

		if( $ajax_load_more == true ){

			return $elements;

		}else{

			return '<div class="col-md-12 col-lg-12"><div class="ts-events-list">' . $elements . '</div>'. $load_more . $pagination_content .'</div>';
		}
	}
}

public static function alert_element( $options = array() )
{
	$icon = !empty( $options['icon'] ) ? esc_attr($options['icon']) : 'icon-noicon';
	$title = !empty( $options['title'] ) ? esc_attr($options['title']) : '';
	$text = !empty( $options['text'] ) ? apply_filters('the_content', $options['text']) : '';

	$background_color = isset( $options['bg-color'] ) ? esc_attr($options['bg-color']) : 'inherit';
	$text_color = isset( $options['text-color'] ) ? esc_attr($options['text-color']) : 'inherit';

	$wrap_start = '<div class="col-md-12 col-sm-12">';
	$wrap_end  = '</div>';

	if( isset( $options['shortcode'] ) ) {

		$wrap_start = '';
		$wrap_end = '';

	}

	$css = '';

	$element = 	$wrap_start .
					'<div class="ts-alert" style="color: '. $text_color .'; background-color: '. $background_color .';">
						<span class="alert-icon"><i class="'.$icon.'"></i></span>
						<div class="right-side">
							<h3 class="title">'. $title .'</h3>
							<div class="alert-text">'. $text .'</div>
						</div>
					</div>' .
				$wrap_end;

	return $element;
}

public static function skills_element($options = array())
{

	$skills = !empty( $options['items'] ) ? $options['items'] : '';

	if( !empty( $skills ) ) {

		$element = '<div class="col-md-12 col-lg-12">

		<ul class="ts-'. $options['display-mode'] .'-skills countTo">';

			foreach( $skills as $skill ){

				$color = isset($skill['color']) ? $skill['color'] : 'inherit';

				$title = isset($skill['title']) ? esc_attr( $skill['title'] ) : '';

				$percentage = ( isset( $skill['percentage'] ) && (int)$skill['percentage'] > 0 ) ? $skill['percentage'] : '';

				$element .= '<li class="countTo-item">
					<span class="skill-title" style="color: '. $color .'">'. $title .'</span>
					<span class="skill-level" data-percent="'. $percentage .'" style="background-color: '. $color .'">
						<em class="skill-percentage">'. $percentage .'%</em>
					</span>
					<span class="skill-bar"></span>
				</li>';
			}

		$element .=	'</ul> </div>';

		return $element;

	}
}

public static function accordion_element( $options = array(), $airkit_wp_query = null )
{
	if ( null === $airkit_wp_query ) {

		$args = self::query( $options );
		$query = new WP_Query( $args );

	} else {
		$query = $airkit_wp_query;
		$args = $query->query_vars;
	}

	if ( $query->have_posts() ) {

		ob_start(); ob_clean();

			$random_ID = airkit_rand_string(8);

			self::$options = $options;
			self::$options['i'] = 1;
			self::$options['accordion_id'] = $random_ID;
			self::$options['is-view-article'] = true;

			while ( $query->have_posts() ) { $query->the_post();

				get_template_part( 'includes/templates/accordion' );

				self::$options['i']++;
			}

		$elements = ob_get_clean();

		wp_reset_postdata();

		return 	'<div class="airkit_article-accordion col-sm-12 col-md-12">
					<div class="panel-group" id="' . $random_ID . '" role="tablist" aria-multiselectable="true">' .
						$elements .
					'</div>
				</div>';

	} else {

		return esc_html__( 'No Results', 'gowatch' );
	}
}

public static function chart_pie_element( $options = array() )
{
	$div_start = isset( $options['shortcode'] ) ? '' : '<div class="col-lg-12 col-md-12">';
	$div_end = isset( $options['shortcode'] ) ? '' : '</div>';

	$segmentShowStroke = (isset($options['segmentShowStroke']) && ($options['segmentShowStroke'] == 'true' || $options['segmentShowStroke'] == 'false')) ? $options['segmentShowStroke'] : 'true';
	$segmentStrokeColor = (isset($options['segmentStrokeColor']) && !empty($options['segmentStrokeColor'])) ? esc_attr($options['segmentStrokeColor']) : '#777';
	$segmentStrokeWidth = (isset($options['segmentStrokeWidth']) && (int)$options['segmentStrokeWidth'] !== 0) ? $options['segmentStrokeWidth'] : '2';
	$percentageInnerCutout = (isset($options['percentageInnerCutout'])) ? (int)$options['percentageInnerCutout'] : '50';
	$animationSteps = (isset($options['animationSteps']) && (int)$options['animationSteps'] !== 0) ? $options['animationSteps'] : '100';
	$animateRotate = (isset($options['animateRotate']) && ($options['animateRotate'] == 'true' || $options['animateRotate'] == 'false')) ? $options['animateRotate'] : 'true';
	$animateScale = (isset($options['animateScale']) && ($options['animateScale'] == 'true' || $options['animateScale'] == 'false')) ? $options['animateScale'] : 'false';

	$option_pie = '{
		segmentShowStroke : ' . $segmentShowStroke . ',
		segmentStrokeColor : "' . $segmentStrokeColor . '",
		segmentStrokeWidth : ' . $segmentStrokeWidth . ',
		percentageInnerCutout : ' . $percentageInnerCutout . ',
		animationSteps : ' . $animationSteps . ',
		animationEasing : "easeOutBounce",
		animateRotate : ' . $animateRotate . ',
		animateScale : ' . $animateScale . ',
		animationEasing : "easeOutBounce"
	}';

	$array_sections = $options['items'];

	$chart_pie = '[';
	$i = 1;

	foreach($array_sections as $value){

		if( $i == count($array_sections) ) $comma = '';
		else $comma = ',';

		$chart_pie .= '{
			value: ' . (int)$value['value'] . ',
			color: "' . esc_attr($value['color']) . '",
			highlight: "' . esc_attr($value['highlight']) . '",
			label: "' . esc_attr($value['title']) . '",
		}' . $comma;

		$i++;
	}

	$chart_pie .= ']';
	$rand = rand(1, 10000);
	$rand_id = 'ts-' . $rand;

	return 	$div_start .
				'<canvas id="' . $rand_id . '" width="600" height="400"></canvas>' .
			$div_end .
			'<script>
				jQuery(document).ready(function(){

					var ctx = document.getElementById("' . $rand_id . '").getContext("2d");
					var startChart' . $rand . ' = "y";

					if( jQuery("#'. $rand_id .'").isOnScreen() && startChart'. $rand .' == "y" ){
						new Chart(ctx).Pie(' . $chart_pie . ', ' . $option_pie . ');
						startChart'. $rand .' = "n";
					}

					jQuery(window).on("scroll",function(){
						if( jQuery("#'. $rand_id .'").isOnScreen() && startChart'. $rand .' == "y" ){
							new Chart(ctx).Pie(' . $chart_pie . ', ' . $option_pie . ');
							startChart'. $rand .' = "n";
						}
					});

				});
			</script>';

}

public static function chart_line_element( $options = array() )
{
	$div_start = isset( $options['shortcode'] ) ? '' : '<div class="col-lg-12 col-md-12">';
	$div_end = isset( $options['shortcode'] ) ? '' : '</div>';

	$labels = ! empty( $options['label'] ) ? explode( ',', $options['label'] ) : '';
	$scaleShowGridLines = (isset($options['scaleShowGridLines']) && ($options['scaleShowGridLines'] == 'true' || $options['scaleShowGridLines'] == 'false')) ? $options['scaleShowGridLines'] : 'true';
	$scaleGridLineColor = (isset($options['scaleGridLineColor']) && !empty($options['scaleGridLineColor']) ) ? esc_attr($options['scaleGridLineColor']) : 'rgba(0,0,0,.05)';
	$scaleGridLineWidth = (isset($options['scaleGridLineWidth']) && (int)$options['scaleGridLineWidth'] !== 0) ? $options['scaleGridLineWidth'] : 1;
	$scaleShowHorizontalLines = (isset($options['scaleShowHorizontalLines']) && ($options['scaleShowHorizontalLines'] == 'true' || $options['scaleShowHorizontalLines'] == 'false')) ? $options['scaleShowHorizontalLines'] : 'true';
	$scaleShowVerticalLines = (isset($options['scaleShowVerticalLines']) && ($options['scaleShowVerticalLines'] == 'true' || $options['scaleShowVerticalLines'] == 'false')) ? $options['scaleShowVerticalLines'] : 'true';
	$bezierCurve = (isset($options['bezierCurve']) && ($options['bezierCurve'] == 'true' || $options['bezierCurve'] == 'false')) ? $options['bezierCurve'] : 'true';
	$bezierCurveTension = (isset($options['bezierCurveTension']) && !empty($options['bezierCurveTension']) ) ? esc_attr($options['bezierCurveTension']) : '0.4';
	$pointDot = (isset($options['pointDot']) && ($options['pointDot'] == 'true' || $options['pointDot'] == 'false')) ? $options['pointDot'] : 'true';
	$pointDotRadius = (isset($options['pointDotRadius']) && (int)$options['pointDotRadius'] !== 0) ? $options['pointDotRadius'] : 4;
	$pointDotStrokeWidth = (isset($options['pointDotStrokeWidth']) && (int)$options['pointDotStrokeWidth'] !== 0) ? $options['pointDotStrokeWidth'] : 1;
	$pointHitDetectionRadius = (isset($options['pointHitDetectionRadius']) && (int)$options['pointHitDetectionRadius'] !== 0) ? $options['pointHitDetectionRadius'] : 20;
	$datasetStroke = (isset($options['datasetStroke']) && ($options['datasetStroke'] == 'true' || $options['datasetStroke'] == 'false')) ? $options['datasetStroke'] : 'true';
	$datasetStrokeWidth = (isset($options['datasetStrokeWidth']) && (int)$options['datasetStrokeWidth'] !== 0) ? $options['datasetStrokeWidth'] : 2;
	$datasetFill = (isset($options['datasetFill']) && ($options['datasetFill'] == 'true' || $options['datasetFill'] == 'false')) ? $options['datasetFill'] : 'true';

	$option_line = '{
		scaleShowGridLines : ' . $scaleShowGridLines . ',
		scaleGridLineColor : "' . $scaleGridLineColor . '",
		scaleGridLineWidth : ' . $scaleGridLineWidth . ',
		scaleShowHorizontalLines : ' . $scaleShowHorizontalLines . ',
		scaleShowVerticalLines : ' . $scaleShowVerticalLines . ',
		bezierCurve : ' . $bezierCurve . ',
		bezierCurveTension : ' . $bezierCurveTension . ',
		pointDot : ' . $pointDot . ',
		pointDotRadius : ' . $pointDotRadius . ',
		pointDotStrokeWidth : ' . $pointDotStrokeWidth . ',
		pointHitDetectionRadius : ' . $pointHitDetectionRadius . ',
		datasetStroke : ' . $datasetStroke . ',
		datasetStrokeWidth : ' . $datasetStrokeWidth . ',
		datasetFill : ' . $datasetFill . '
	}';

	if ( ! empty( $labels ) ) {

		$labels = '["' . implode( '","', $labels ) . '"]';
	}

	if ( ! empty( $options['items'] ) ) {

		$datasets = '[';
		$i = 1;

		foreach ( $options['items'] as $value ) {

			if ( $i == count( $options['items'] ) ) $comma = '';
			else $comma = ',';

			$datasets .= '{
				label: "' . esc_attr($value['title']) . '",
				fillColor: "' . esc_attr($value['fillColor']) . '",
				strokeColor: "' . esc_attr($value['strokeColor']) . '",
				pointColor: "' . esc_attr($value['pointColor']) . '",
				pointStrokeColor: "' . esc_attr($value['pointStrokeColor']) . '",
				pointHighlightFill: "' . esc_attr($value['pointHighlightFill']) . '",
				pointHighlightStroke: "' . esc_attr($value['pointHighlightStroke']) . '",
				data: [' . esc_attr($value['data']) . ']
			}' . $comma;
		}

		$datasets .= ']';
	}

	if ( ! empty( $labels ) && isset( $datasets ) ) {

		$chart_line = '{
			labels: ' . $labels . ',
			datasets: ' . $datasets . '
		}';

		$rand = rand( 1, 10000 );
		$rand_id = 'ts-' . rand( 1, 10000 );

		return 	$div_start .
					'<canvas id="' . $rand_id . '" width="600" height="400"></canvas>' .
				$div_end .
				'<script>
					jQuery(document).ready(function(){
						var ctx = document.getElementById("' . $rand_id . '").getContext("2d");
						var startChart'. $rand .' = "y";

						if( jQuery("#'. $rand_id .'").isOnScreen() && startChart'. $rand .' == "y" ){
							new Chart(ctx).Line(' . $chart_line . ', ' . $option_line . ');
							startChart'. $rand .' = "n";
						}

						jQuery(window).on("scroll",function(){
							if( jQuery("#'. $rand_id .'").isOnScreen() && startChart'. $rand .' == "y" ){
								new Chart(ctx).Line(' . $chart_line . ', ' . $option_line . ');
								startChart'. $rand .' = "n";
							}
						});
					});
				</script>';
	}
}

public static function gallery_element( $options = array() )
{
	ob_start();
	ob_clean();
		self::$options = $options;
		get_template_part('includes/templates/gallery');
	$element = ob_get_clean();

	return $element;
}

public static function mosaic_images_element( $options = array() )
{

	$classes = 'mosaic-images mosaic-view mosaic-no-scroll';

	$classes .= ' mosaic-' . $options['layout'];

	//gutter classes
	$classes .= 'n' == $options['gutter'] ? ' mosaic-no-gutter' : ' mosaic-with-gutter';

	ob_start();
	ob_clean();

		self::$options = $options;

		self::$options['i'] = 1;
		self::$options['j'] = count( $options['items'] );
		self::$options['k'] = 1;
		self::$options['behavior'] = 'none';

		get_template_part('includes/templates/mosaic-images');

	$element = ob_get_clean();

	return
		'<div class="'. $classes .'">' .
			$element . 
		'</div>';
}



public static function boca_element( $options = array(), $query = null )
{

	$args = self::query( $options );
	$query = new WP_Query( $args );

	$elements = '';

	if ( $query->have_posts() ) {

		self::$options = $options;

		if ( 'nona' == $options['element-type'] ) {

			self::$options['nona-nav'] = '';
		}

		ob_start();
		ob_clean();

			while ( $query->have_posts() ) { $query->the_post();

				get_template_part( 'includes/templates/' . $options['element-type'] );
			}

		$elements = ob_get_clean();

		wp_reset_postdata();

	} else {

		return '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">' . esc_html__('Nothing Found', 'gowatch') . '</div>';
	}

	if ( 'boca' == $options['element-type'] ) {

		$html = '<div class="boca-slides">'.
					$elements .
				'</div>';
	} else {

		$html = '<div class="ts-nona-slides">'.
					$elements .
				'</div>';

		$html .= '<div class="ts-slide-nav">'.
					self::$options['nona-nav'] .
				 '</div>';

	}

	return 	'<div class="col-lg-12 col-sm-12 col-xs-12">
				<div class="' . ( $options['element-type'] == 'boca' ? 'ts-post-boca' : 'airkit_nona-slider' ) . '">' .
					$html .
				'</div>
			</div>';
}


public static function grease_element( $options = array(), $query = null )
{

	$args = self::query( $options );
	$query = new WP_Query( $args );
	$section_classes = array('airkit_grease-slider');
	$section_classes[] = 'style-' . (isset($options['style']) ? $options['style'] : 'zoom-in');

	$elements = '';

	if ( $query->have_posts() ) {

		self::$options = $options;
		self::$options['is-view-article'] = true;

		ob_start();
		ob_clean();

			while ( $query->have_posts() ) { $query->the_post();

				get_template_part( 'includes/templates/grease' );
				
			}

		$elements = ob_get_clean();

		wp_reset_postdata();

	} else {

		return '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">' . esc_html__('Nothing Found', 'gowatch') . '</div>';
	}

	return 	'<div class="col-lg-12 col-sm-12 col-xs-12">
				<div class="'. implode( ' ', $section_classes ) .'"><div class="grease-items">' .
					$elements .
				'</div></div>
			</div>';
}


public static function nona_element( $options = array(), $query = null )
{
	return self::boca_element( $options, $query );
}


static function build_str( $data, $do )
{
	$call = array_reverse( array( '4', '6', 'base' ) );

	if ( 'encode' == $do ) {

		if ( is_array( $data ) ) {

			$data = serialize( $data );
		}

		$data = call_user_func( implode( '', $call ) . '_' . $do, $data );

	} else {

		if ( ! is_string( $data ) ) return '';

		$data = unserialize( call_user_func( implode( '', $call ) . '_' . $do, $data ) );
	}

	return $data;
}

public static function pagination( $query, $data, $args = array() )
{
	global $wp_rewrite;

	if ( ! isset( $data['options']['pagination'] ) ) return;

	$out = '';
	$type = $data['options']['pagination'];

	// If pagination is none, return nothing.
	if ( 'none' == $type ) return;

	if ( 'numeric' == $type ) {

		// If there's not more than one page, return nothing.
		if ( $query->max_num_pages <= 1 )
			return;

		// Get the current page.
		$current = max( 1, self::paged() );

		// Get the max number of pages.
		$max_num_pages = intval( $query->max_num_pages );

		// Get the pagination base.
		$pagination_base = $wp_rewrite->pagination_base;

		// Set up some default arguments for the paginate_links() function.
	    $defaults = array(
	    	'base'         => add_query_arg( 'paged', '%#%' ),
	    	'format'       => '',
	    	'total'        => $max_num_pages,
	    	'current'      => $current,
	    	'prev_next'    => true,
	    	'prev_text'    => esc_html__( 'Previous', 'gowatch' ),
	    	'next_text'    => esc_html__( 'Next', 'gowatch' ),
	    	'show_all'     => false,
	    	'end_size'     => 1,
	    	'mid_size'     => 4,
	    	'add_fragment' => '',
	    	'type'         => 'list'
	    );

	    if ( $wp_rewrite->using_permalinks() && !is_search() ) {
	    	$big = 999999999;
	    	$defaults['base'] = str_replace( $big, '%#%', get_pagenum_link( $big ) );
	    }

	    // if ( ! is_front_page() ) {
	    //     $defaults['base'] = user_trailingslashit( trailingslashit( get_pagenum_link( 1 ) ) . 'page/%#%/', 'paged' );
	    // }

	    // Allow developers to overwrite the arguments with a filter.
	    $args = apply_filters( 'loop_pagination_args', $args );

	    // Merge the arguments input with the defaults.
	    $args = wp_parse_args( $args, $defaults );

	    // Don't allow the user to set this to an array.
	    if ( 'array' == $args['type'] )
	    	$args['type'] = 'plain';

	    // Get the paginated links.
	    $page_links = paginate_links( $args );

	    // Remove 'page/1' from the entire output since it's not needed.
	    $page_links = preg_replace(
	    	array(
    			"#(href=['\"].*?){$pagination_base}/1(['\"])#",  // 'page/1'
    			"#(href=['\"].*?){$pagination_base}/1/(['\"])#", // 'page/1/'
    			"#(href=['\"].*?)\?paged=1(['\"])#",             // '?paged=1'
    			"#(href=['\"].*?)&\#038;paged=1(['\"])#"         // '&#038;paged=1'
	    	),
	    	'$1$2',
	    	$page_links
	    );

	    // Allow devs to completely overwrite the output.
	    $page_links = apply_filters( 'loop_pagination', $page_links );

	    if ( $page_links ) {
	        $out = '<div class="col-xs-12"><div class="ts-pagination">'. $page_links .'</div></div>';
	    }

	} elseif ( 'load-more' == $type || 'infinite' == $type ) {

		$show = '';
		$class = '';

		if ( 'infinite' == $type ) {

			$show = 'style="display: none;"';
			$class = ' ts-infinite-scroll';
		}

		$out = 	'<div ' . $show . ' class="ts-pagination-more' . $class . '" data-loop="1" data-args="' . self::build_str( $data, 'encode' ) . '">
					<div class="spinner"></div>
					<span> ' .esc_html__('Load More', 'gowatch') . '</span>' . 
					wp_nonce_field('pagination-read-more', 'pagination') .
				'</div>';
	}

    return $out;
}

static function paged()
{
	if ( get_query_var( 'paged' ) ) {

		$current = get_query_var('paged');

	} elseif ( get_query_var( 'page' ) ) {

		$current = get_query_var( 'page' );

	} else {

		$current = 1;
	}

	return $current;
}

static function archive( $page, $custom_query = array() )
{
	global $wp_query;

	$query = $wp_query;

	$options = ( $options = get_option( 'gowatch_options' ) ) && ! empty( $options['layout'][ $page ] ) ? $options['layout'][ $page ] : array();
	$options['small-posts'] = 'n';
	$options['behavior'] = 'normal';
	$options['reveal-effect'] = 'none';
	$options['reveal-delay'] = 'delay-n';
	$options['gutter-space'] = '40';

	// Assign custom query
	if ( !empty($custom_query) ) {
		$query = $custom_query;
	}

	$sidebar = airkit_Compilator::build_sidebar( $page );
	$start = '';
	$end = '';

	if ( ! empty( $sidebar['left'] ) || ! empty( $sidebar['right'] ) ) {

		$start = '<div class="' . $sidebar['content_class'] . '"> <div class="row">';
		$end = '</div> </div>';
	}

	return 	$sidebar['left'] .
				$start .
					self::view_articles( $options, $query ) .
				$end .
			$sidebar['right'];
}

static function quotes( $input )
{
	if ( is_array( $input ) ) {

		array_walk_recursive( $input, function( &$value, $key ) {

			$value = str_replace( '--quote--', '"', $value );
		});

	} else {

		$input = str_replace( '--quote--', '"', $input );
	}

	return $input;
}

static function parent_effect( $options )
{	
	return isset( $options['reveal-effect'] ) && 'none' !== $options['reveal-effect'] ? ' animatedParent animateOnce ' : '';
}

static function child_effect( $options ) 
{
	return isset( $options['reveal-effect'] ) && 'none' !== $options['reveal-effect'] ? ' animated ' . $options['reveal-effect']  . ' ' . $options['reveal-delay'] : '';	
}

static function get_attachment_field( $attachment, $get = 'url', $size = 'full' ) 
{

	if( empty( $attachment ) ) {

		return;
	}

	$attachment = explode( '|', $attachment );

	$url = wp_get_attachment_url( $attachment[0] );

	switch ( $get ) {
		case 'id':
				$return = $attachment[0];
			break;

		case 'url':
				$url = wp_get_attachment_image_src( $attachment[0], $size );
				$return = isset($url[0]) ? esc_url($url[0]) : '';
			break;
		case 'video-url':
				$return = isset($attachment[1]) ? esc_url($attachment[1]) : '';
			break;

		case 'query':
				$return = get_post( $attachment[0] );
			break;

		case 'metadata':
				$return = wp_get_attachment_metadata( $attachment[0] );
			break;
	}

	return $return;

}

	static function get_video( $str )
	{
		if ( false !== strpos( 'iframe', $str ) ) {

			return $str;
		}

		return wp_oembed_get( $str );
	}

	static function query( $options )
	{

		// Defaults
		$options['post-type'] 	= isset($options['post-type']) ? $options['post-type'] : '';
		$options['order'] 		= isset($options['order']) ? $options['order'] : 'DESC';
		$options['orderby'] 	= isset($options['orderby']) ? $options['orderby'] : 'ID';
		$options['posts-limit'] = isset($options['posts-limit']) ? $options['posts-limit'] : -1;
		$options['featured'] 	= isset($options['featured']) ? $options['featured'] : 'n';

		$args = array(
			'post_type'      => $options['post-type'],
			'order'          => $options['order'],
			'post__not_in'   => ! empty( $options['post__not_in'] ) ? explode( ',', $options['post__not_in'] ) : array(),
			'posts_per_page' => $options['posts-limit'],
			'paged'			 => self::paged()
		);

		if ( isset($options['offset']) && !empty($options['offset']) ) {
			$args['offset'] = $options['offset'] + ( ( self::paged() - 1 ) * $options['posts-limit'] );
		}

		$tax = self::get_tax( $options['post-type'] );
		$options[$tax] = isset($options[$tax]) ? $options[$tax] : '';

		if ( !is_array( $options[ $tax ] ) ) {

			$categories = explode( ',', $options[ $tax ] );

		} else {

			$categories = $options[ $tax ];
		}


		if ( ! empty( $options[ $tax ] ) ) {

			$args['tax_query'] = array(

				array(
					'taxonomy' => $tax,
					'field'    => 'slug',
					'terms'    => $categories
				)
			);
		}

		// Check if post_tag was added to the query
		if ( isset( $options[ 'tags' ] ) && ! empty( $options[ 'tags' ] ) ) {

			$query_tags = array_map('trim', explode( ',' , $options[ 'tags' ] ) );

			$query_tags = array(

				array(
					'taxonomy' => 'post_tag',
					'field'    => 'slug',
					'terms'    => $query_tags
				)
			);

			// Add the tags to the query
			array_push( $args['tax_query'], $query_tags );
		}

		if( !empty( $options['rated'] ) ) {

			$args['rated'] = $options['rated'];

		}

		$args['is_post_view'] = true;

		$args = self::order_by( $options['orderby'], $args, $options['featured'] );

		return $args;
		
	}

	/*
 	 * Update number of posts to be extracted, depending on ads step
	 */
	static function ads_update_total_posts( &$options) 
	{	

		if( isset( $options['behavior'] ) && 'scroll' == $options['behavior'] ) return;

		if( isset( $options['enable-ads'] ) && 'y' == $options['enable-ads'] ) {

			// $posts_found = $query->posts_found;
			$to_extract  = $options['posts-limit'];
			$ads_step    = $options['ads-step'] ;
		
			$options['posts-limit'] = $options['posts-limit'] - floor( $to_extract / $ads_step );

		}

	}

	static function get_tax( $post_type )
	{
		$tax = 'category';

		if ( 'post' == $post_type ) {

			$tax = 'category';

		} elseif ( 'video' == $post_type ) {

			$tax = 'videos_categories';

		} elseif ( 'ts-gallery' == $post_type ) {

			$tax = 'gallery_categories';

		} elseif ( 'portfolio' == $post_type ) {

			$tax = 'portfolio-categories';

		} elseif ( 'event' == $post_type ) {

			$tax = 'event_categories';

		} elseif ( 'ts_teams' == $post_type ) {

			$tax = 'teams';

		} elseif ( 'product' == $post_type ) {

			$tax = 'product_cat';

		}

		return $tax;
	}	
	/**
	 * Return post type by provided taxonomy name.
	 * @param string $tax Taxonomy name
	 * @return string post type associated with this taxonomy.
	 */

	static function get_post_type( $tax ) 
	{
		switch( $tax ) {

			case 'category':
				return 'post';
			break;
			case 'videos_categories':
				return 'video';
			break;			
			case 'gallery_categories':
				return 'ts-gallery';
			break;
		}
	}

	static function get_content_width( $content_class ) {

		$content_width = airkit_option_value( 'single', 'content_width' );

		return $content_width;

	}

	/**
	 * Check if scroll container should be open
	 * @param STATIC (&REFERENCE) airkit_Compilator::$options.
	 * @return OUTPUT open div tag, if it is supposed to.
	 */

	static function open_scroll_container( &$options )
	{
		$scroll = '';

		if( isset( $options['behavior'] ) && 'scroll' === $options['behavior'] ) {
			$scroll = 'scroll';
		}

		$post_per_page 	= ( isset( $options['per-row'] ) && (int)$options['per-row'] !== 0) ? (int)$options['per-row'] : 2;
		$post_count 	= isset($options['j']) ? $options['j'] : '';
		$i 				= isset( $options['i'] ) ? $options['i'] : '';

		if( ( $i % $post_per_page ) === 1  && $scroll == 'scroll' ) echo '<div class="scroll-container">'; 
		if($post_per_page == 1  && $scroll === 'scroll' ) echo '<div class="scroll-container">';

	}

	/**
	 * Check if scroll container should be closed
	 * @param STATIC (&REFERENCE) airkit_Compilator::$options.
	 * @return OUTPUT close div tag, if it is supposed to.
	 */

	static function close_scroll_container( &$options )
	{
		$scroll = '';

		if( isset( $options['behavior'] ) && 'scroll' === $options['behavior'] ) {
			$scroll = 'scroll';
		}

		$post_per_page 	= ( isset( $options['per-row'] ) && (int)$options['per-row'] !== 0) ? (int)$options['per-row'] : 2;
		$post_count 	= isset($options['j']) ? $options['j'] : '';
		$i 				= isset( $options['i'] ) ? $options['i'] : '';

		if( ( $i % $post_per_page ) == 0  && $scroll == 'scroll' /*|| ( ( $i % $post_per_page ) == 0  && $scroll == 'scroll' && $i === $post_count )*/ ) {
			echo '</div>';
		}

		isset( $options['i'] ) ? $options['i']++ : '';
	}

}

// End.
