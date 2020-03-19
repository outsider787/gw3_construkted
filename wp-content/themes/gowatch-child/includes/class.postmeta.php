<?php

/*
 * Class containg common templates used in posts.
 *
 */
if ( !class_exists('construkted_PostMeta') ) {
    class construkted_PostMeta
    {

        /**
         * Methods take post id as first parameters. Second parameters is an array containing any customizations.
         */

        public static $term_slugs = array();

        static function categories( $post_ID, $options = array() )
        {
            /* Get categories */
            $taxonomy = airkit_Compilator::get_tax( get_post_type( $post_ID ) );
            $meta = get_post_meta( $post_ID, 'airkit_post_settings', true );
            $primary_category = isset( $meta['primary_category'] ) ? $meta['primary_category'] : '';

            $terms = wp_get_post_terms( $post_ID, $taxonomy );

            $wrap_class = isset( $options['wrap-class'] ) ? $options['wrap-class'] : 'entry-categories';

            $list = '';
            $filters = array();
            $slugs = array();

            foreach ( $terms as $term ) {

                $filters[] = $term->term_id;

                $slugs[] = 'term-' . $term->slug;

                if( ! in_array( $term->slug ,  self::$term_slugs ) ){

                    self::$term_slugs[] = $term->slug;

                }

                if ( ( !isset($options['single']) || 'y' !== $options['single'] ) && $term->term_id == $primary_category ) {

                    $list = '<li class="term-'. $term->slug .'">
								<a href="'. get_term_link( $term->slug, $taxonomy ) .'">'. $term->name .'</a>
							</li>';
                    break;

                } else {

                    $list .= '<li class="term-'. $term->slug .'">
								<a href="'. get_term_link( $term->slug, $taxonomy ) .'">'. $term->name .'</a>
							 </li>';

                }

            }

            /**/

            $filters = implode(',', $filters );
            $slugs = implode(' ', $slugs );

            $additional_stuff = '<i class="icon-gallery"></i>';

            /*
             * Return an array containing id's, slugs and meta list
             */

            if( isset( $options['get-array'] ) && 'y' === $options['get-array'] ) {

                $categories = array(
                    'slugs' => $slugs,
                    'ids'   => $filters,
                    'list'  => $list,
                    'terms' => $terms,
                    'primary' => $primary_category
                );

                return $categories;

            }

            /*
             * Return taxs id's as string separed by comma
             */

            if( isset( $options['filters'] ) && 'y' === $options['filters']  ) {

                return $filters;

            }

            /*
             * Return taxs slugs as string separed by space
             */

            if( isset( $options['slugs'] ) && 'y' === $options['slugs']  ) {

                return $slugs;

            }

            /*
             * Return cateogories meta list
             */
            return self::wrap_ul( $list, $wrap_class );

        }
        /**
         * filter_attr
         * @param int $post_ID | Post ID.
         * @param Array $options | Array containing any additional helpers.
         * Returns  a data attribute with post categories ID's, separed by comma (,) which is then used for filters behavior.
         */
        static function filter_attrs( $post_ID, $options = array() ){

            $atts = array();

            /* Add filters parameter to options, and pass updated array to @categories */
            if( isset( $options['behavior'] ) && $options['behavior'] == 'filters' ) {

                $options['filters'] = 'y';

                $atts['data-filter-by'] = esc_attr( self::categories( $post_ID, $options ) );

            }

            return airkit_Compilator::render_atts( $atts );
        }

        /*
         * Wraps in a <ul> with $wrap_class provided $list.
         */
        static function wrap_ul( $list, $wrap_class ) {

            return '<ul class="'. esc_attr( $wrap_class ) .'">' . $list . '</ul>';

        }

        /**
         * Wraps meta raw value in provided tag with provided class (default = <li class="entry-meta-{$key}")
         *
         * @param string $meta_data Raw meta value
         * @param array $options Options container
         */

        static function wrap_meta( $meta_data, $options = array() )
        {
            /*
            * Check passed arguments, set defaults if missing.
             */
            $classes = array();

            $wrap = isset( $options['wrap'] ) ? $options['wrap'] : 'li';// Must be a tag name
            $classes[] = isset( $options['class'] ) ? $options['class'] : ''; //must be a class-name
            $prefix = isset( $options['prefix'] ) ? $options['prefix'] : ''; //content-type: text/html
            $postfix = isset( $options['postfix'] ) ? $options['postfix'] : '';//content-type: text/html

            if( isset( $options['key'] ) ) {

                /*
                 * Buffer the key. $key variable may be changed if there is a hardcoded key given.
                 */
                $key = $options['key'];

                if( isset( $options['hardcoded-key'] ) ) {
                    /*
                     * If we should search in a parent-key, wrap $key in parent.
                     */
                    $key = $options['hardcoded-key'];

                    if( isset( $options['is-single'] ) && 'n' === airkit_single_option( $options['key'], '', $key ) ) {
                        //is single post and options is false
                        //don't return meta
                        return;

                    }

                }

                /*
                 * If key is set, we must check for option value.
                 */
                if( self::is_singular( $options ) && 'n' === airkit_single_option( $options['key'], '' ) ) {
                    //is single post and options is false
                    //don't return meta
                    return;

                }

                //set meta-class according to key (option name)
                $classes[] = 'entry-meta-' . $options['key'];

            }

            /*
             * Wrap and return meta.
             * By default returns smh like
             * <li class="entry-meta-$key"> $meta_value </li>
             */
            return '<'. $wrap . ' ' . airkit_Compilator::render_atts( array( 'class' => $classes ) ) .'>'. $prefix . $meta_data . $postfix . '</'. $wrap .'>';

        }


        static function date( $post_ID, $options = array() )
        {

            $date = get_the_date();
            $options['key'] = 'date';
            $options['enable_human_time'] = airkit_option_value('general', 'enable_human_time');

            if ( isset($options['enable_human_time']) && 'y' === $options['enable_human_time'] ) {
                $date = airkit_time_to_human_time(get_the_date('Y-m-d'));
            }

            if ( isset($options['element']) && 'tilter-slider' == $options['element'] ) {
                $meta = '<li>
					<i class="icon-calendar"></i>
					<p>'. esc_html__( 'Date', 'gowatch' ) .'</p>
					<span><time class="date updated published" datetime="'. get_the_date('c') .'">' . $date . '</time></span>
				</li>';

                return airkit_var_sanitize($meta, 'the_kses');
            }

            $meta = '<a href="' . get_the_permalink( $post_ID ) . '"><time class="date updated published" datetime="'. get_the_date('c') .'">' . $date . '</time></a>';


            return self::wrap_meta( $meta, $options );

        }

        static function post_rating( $post_ID, $options = array() )
        {

            $rating = airkit_get_rating( $post_ID );

            $html = '';

            if( isset( $rating ) ) {
                $html = '<div class="post-rating-circular">
								<div class="circular-content">
									<div class="counted-score"> '. esc_attr( $rating )  . '/10</div>
								</div>
							</div>';
            }

            return $html;

        }

        static function likes( $post_ID, $options = array() )
        {

            $meta_data = airkit_likes( $post_ID, '', '', false );

            $options['key'] = 'likes';

            return self::wrap_meta( $meta_data, $options );
        }

        static function rating( $post_ID, $options = array() )
        {

            // Check TouchRate Plugin activation
            if ( ! class_exists('TouchRate') ) {

                // Show likes if the TouchRate plugin is not installed
                $meta_data = self::likes( $post_ID );
                $options['key'] 	= 'likes';
                $options['class']   = 'airkit-single-likes';

            } else {

                // If the TouchRate plugin is installed and active, show the rating
                $type = isset($options['type']) ? $options['type'] : 'number';

                $meta_data = touch_rate( $post_ID, $type );

                $options['key'] = 'rating';
            }

            return self::wrap_meta( $meta_data, $options );
        }

        static function views( $post_ID, $options = array() )
        {

            if ( isset($options['element']) && 'tilter-slider' == $options['element'] ) {
                $meta = '<li>
					<i class="icon-views-1"></i>
					<p>'. esc_html__( 'Views', 'gowatch' ) .'</p>
					<span>'. airkit_get_views( $post_ID, false ) .'</span>
				</li>';

                return airkit_var_sanitize($meta, 'the_kses');
            }

            $meta = airkit_get_views( $post_ID, false );

            $options['key'] = 'views';
            $options['prefix'] = (isset($options['prefix']) && !empty($options['prefix'])) ? $options['prefix'] : '';
            $options['postfix'] =  esc_html__( ' views', 'gowatch' );

            return self::wrap_meta( $meta, $options );
        }

        static function reading_time( $post_ID, $options = array() )
        {

            $readingTime = airkit_get_reading_time( $post_ID );

            if ( isset($options['element']) && 'tilter-slider' == $options['element'] ) {
                $meta = '<li>
					<i class="icon-time"></i>
					<p>'. esc_html__( 'Reading time', 'gowatch' ) .'</p>
					<span>'. airkit_convert_to_hours($readingTime) .'</span>
				</li>';

                return airkit_var_sanitize($meta, 'the_kses');
            }

            $meta = airkit_convert_to_hours($readingTime);
            $options['key'] = 'reading_time';

            $options['prefix'] = (isset($options['prefix']) && !empty($options['prefix'])) ? $options['prefix'] : '';
            $options['postfix'] =  esc_html__( ' read', 'gowatch' );

            return self::wrap_meta( $meta, $options );
        }

        static function comments( $post_ID, $options = array() )
        {

            $meta = airkit_get_comment_count( $post_ID );

            $options['prefix']  = isset($options['prefix'] ) ? $options['prefix']  : '';
            $options['postfix'] = isset($options['postfix']) ? $options['postfix'] :  esc_html__( ' comments', 'gowatch' );

            $options['key'] = 'comments';

            return self::wrap_meta( $meta, $options );

        }

        static function author( $post_ID, $options = array() )
        {
            $author = get_post_field('post_author', $post_ID);

            $author_desc = '';
            $options['key'] = 'author';
            $is_single = isset($options['is-single']) ? $options['is-single'] : false;


            $options['prefix'] = (isset($options['prefix']) && !empty($options['prefix'])) ? $options['prefix'] : '';

            $meta = '<a href="' .  get_author_posts_url( $author ) . '" rel="author">
						<span class="vcard author author_name"><span class="fn">' . get_the_author_meta( 'display_name', $author ) . '</span></span>
					</a>';

            return self::wrap_meta( $meta, $options );
        }

        static function title( $post_ID, $options = array() )
        {

            if( self::is_singular( $options ) && 'n' === airkit_single_option( 'title' ) ) {
                return;
            }

            $wrap = isset( $options['wrap'] ) ? $options['wrap'] : 'h4';
            $class = isset( $options['class'] ) ? $options['class'] : 'entry-title';
            $url  = isset( $options['url'] ) ? $options['url'] : 'y';
            $url_link = isset($options['url_link']) ? $options['url_link'] : get_the_permalink($post_ID);

            $prefix = (isset($options['prefix']) && !empty($options['prefix'])) ? $options['prefix'] : '';
            $postfix = (isset($options['postfix']) && !empty($options['postfix'])) ? $options['postfix'] : '';

            $title = '<'. $wrap .' class="'. esc_attr( $class ) .'" itemprop="name headline">' . $prefix . get_the_title($post_ID) . $postfix . '</'. $wrap .'>';

            // Crop the title if the option is enabled

            $title_char_size = airkit_option_value('styles', 'title_char_size');

            if ( $title_char_size == 'n' || $title_char_size == '' ) {

                $cropped_title = get_the_title($post_ID);

            } else {

                $cropped_title = strlen( get_the_title($post_ID) ) >= $title_char_size ? substr( get_the_title($post_ID), 0, $title_char_size ) . '...' : get_the_title($post_ID);

            }

            if ( 'y' === $url ) {

                $title = '<'. $wrap .' class="'. esc_attr( $class ) .'" itemprop="name headline"><a href="'. esc_url($url_link) .'" title="'. sanitize_text_field( get_the_title($post_ID) ) .'">' . $prefix . $cropped_title . $postfix . '</a></'. $wrap .'>';

            }

            return $title;

        }

        static function subtitle( $post_ID, $options = array() )
        {

            $html = '';

            if ( ( $meta_data = get_post_meta( $post_ID, 'airkit_post_settings', true ) ) && ! empty( $meta_data['subtitle'] ) ) {
                $html = '	<p class="post-subtitle" itemprop="description">
								 ' . airkit_var_sanitize( $meta_data['subtitle'], 'the_kses' ) . '
							</p>';
            }

            return $html;
        }

        // Microdata schema.org
        static function microdata( $options = array(), $echo = false, $atts = array() )
        {
            global $post;

            $data = array();
            $output = '';
            $views = array('grid', 'list_view', 'thumbnail', 'super', 'big', 'small-articles');

            $thumbnail_attr = wp_get_attachment_image_src( get_post_thumbnail_id( get_the_ID() ), 'large' );
            $logo_attr = airkit_get_logo('', true);

            $data['article'] 		= 'itemscope';

            $data['author'] 		= '<span class="author-name" itemprop="author">' . get_the_author() . '</span>';
            $data['mainEntityOfPage'] = '<span itemscope itemprop="mainEntityOfPage" itemtype="https://schema.org/WebPage" itemid="'. get_the_permalink( get_the_ID() ) .'"></span>';
            $data['publisher'] 		=
                '<span itemprop="publisher" itemscope itemtype="https://schema.org/Organization">
					<span itemprop="name">gowatch</span>
				'.
                ( !empty($logo_attr[0]) ? '
					<span itemprop="logo" itemscope itemtype="https://schema.org/ImageObject">
						<img src="'. $logo_attr[0] .'" alt="'. get_the_title( get_the_ID() ) .'"/>
						<span itemprop="url">'. $logo_attr[0] .'</span>
						<span itemprop="width">'. $logo_attr[1] .'</span>
						<span itemprop="height">'. $logo_attr[2] .'</span>
					</span>' : ''
                ) .'</span>';
            $data['datePublished'] 	= '<time datetime="'. get_the_date('c') .'" itemprop="datePublished">' . get_the_date() . '</time>';
            $data['dateModified'] 	= '<time datetime="'. get_the_modified_date('c') .'" itemprop="dateModified">' . get_the_modified_date() . '</time>';
            $data['imageObject'] 	=
                '<span itemscope itemprop="image" itemtype="http://schema.org/ImageObject">
				  	<span itemprop="url">'. $thumbnail_attr[0] .'</span>
				  	<span itemprop="width">'. $thumbnail_attr[1] .'</span>
				  	<span itemprop="height">'. $thumbnail_attr[2] .'</span>
				</span>';

            switch ( get_post_type( get_the_ID() ) ) {
                case 'post':
                    $data['article'] .= ' itemtype="http://schema.org/Article"';
                    break;

                case 'portfolio':
                    $data['article'] .= ' itemtype="http://schema.org/CreativeWork"';
                    break;

                case 'ts-gallery':
                    $data['article'] .= ' itemtype="http://schema.org/Article"';
                    break;

                case 'event':
                    $data['article'] .= ' itemtype="http://schema.org/Event"';
                    break;

                case 'video':
                    $data['article'] .= ' itemtype="http://schema.org/Article"';
                    break;

                case 'ts_teams':
                    $data['article'] .= ' itemtype="http://schema.org/Person"';
                    break;

            }

            // Hardcoded attributes
            $atts = array('author', 'datePublished', 'dateModified', 'imageObject', 'publisher', 'mainEntityOfPage');

            $hidden = isset($options['hidden']) ? $options['hidden'] : true;

            // Specific properties
            if ( !empty( $atts ) ) {
                // Include all properties inside the hidden span element
                if ( $hidden ) $output .= '<span class="hidden">';

                foreach ($data as $key => $property) {
                    if ( in_array( $key, $atts ) ) {
                        $output .= airkit_var_sanitize( $property, 'the_kses' );
                    }
                }

                if ( $hidden ) $output .= '</span>';

            }


            if ( isset($options['data']) && $options['data'] === true ) {
                return $data;

            } else {

                if ( $echo ) {
                    echo airkit_var_sanitize($output, 'the_kses');
                } else {
                    return $output;
                }
            }

        }

        static function copyright( $options = array() )
        {
            $copyright = airkit_option_value( 'general', 'copyright' );
            $columns_class = isset($options['columns']) ? $options['columns'] : 'col-lg-12 col-md-12';

            $default_atts = array(
                'id' 	=> array(),
                'class' => array(),
                'style' => array(),
                'title' => array(),
                'href'  => array(),
                'target'=> array(),
            );

            $allowed_tags = array(
                'p'		=> $default_atts,
                'a'		=> $default_atts,
                'b'		=> $default_atts,
                'strong'=> $default_atts,
                'u'		=> $default_atts,
                'i'		=> $default_atts,
                'em'	=> $default_atts,
                'sub'	=> $default_atts,
                'sup'	=> $default_atts,
            );

            if ( strpos( $copyright, '%year' ) !== false ) {
                $copyright = str_replace( '%year', date('Y'), $copyright );
            }

            if ( strpos( $copyright, '%site_title' ) !== false ) {
                $copyright = str_replace( '%site_title', get_bloginfo('name'), $copyright );
            }

            $output = wp_kses( $copyright, $allowed_tags );

            return '<div class="'. $columns_class .'">' . $output . '</div>';
        }


        static function read_more( $post_ID, $options = array() )
        {
            $text = isset($options['text']) ? $options['text'] : esc_html__( 'Read more', 'gowatch' );
            $classes = isset($options['class']) ? $options['class'] : array('read-more');

            return '<a href="'. get_the_permalink() .'" class="'. implode(' ', $classes) .'" itemprop="url"><span>'. $text .'</span></a>';

        }

        /*
         * Generates post sharing HTML.
         */
        static function sharing( $post_ID, $options = array() )
        {
            /*
             * Avoid using is_singular(),
             * because on single post pages we usually have 'related posts',
             * to avoid disabling sharing for related posts too, we should explicit tell when to return output for single.
             */

            $output = '';
            $classes = array();

            // Defaults
            $options['heading'] = ( isset( $options['heading'] ) && !empty( $options['heading'] ) ) ? $options['heading'] : 'n';
            $options['single'] = ( isset( $options['single'] ) && !empty( $options['single'] ) ) ? $options['single'] : 'y';
            $options['tooltip-popover'] = ( isset( $options['tooltip-popover'] ) && !empty( $options['tooltip-popover'] ) ) ? $options['tooltip-popover'] : 'y';
            $options['label'] = ( isset( $options['label'] ) && !empty( $options['label'] ) && $options['tooltip-popover'] != 'y' ) ? $options['label'] : false;

            $classes['style'] = isset($options['style']) ? $options['style'] : 'normal-sharing';

            if ( isset( $options['single'] ) && 'n' == airkit_single_option( 'sharing' ) ) {

                return;

            } else {

                $sharing = self::social_sharing( $post_ID, $options );

                /*
                 * Generate output for single sharing or sharing from views.
                 */

                $sharing_items = airkit_option_value( 'social', 'social_sharing_items' );
                $total = get_post_meta( $post_ID, 'airkit_social_count', true );

                if ( 'y' === $options['tooltip-popover'] ) {

                    $classes['style'] = 'tooltip-sharing';

                    $output = '
		            	<div class="airkit_sharing">
							<a class="btn-share" href="#" title="'. esc_html__( 'Share', 'gowatch' ) .'" data-toggle="popover" data-placement="bottom">
								<span class="btn-icon-wrap">
									<i class="toggle-sharing icon-share"></i>
									<i class="share-count">'. $total .'</i>
								</span>
								'. ( $options['label'] === true ? '<span class="entry-meta-description">'. esc_html__( 'Share', 'gowatch' ) .'</span>' : '' ) .'
							</a>
							<div class="popover">
								<div class="popover-content">
									<span class="entry-meta-description">'. esc_html__( 'Share', 'gowatch' ) .'</span>
									' . $sharing . '
									<div class="popover-content-footer">
										<a href="#" class="embed-code-link" data-action="show-embed-code-link">'. esc_html__('Embed', 'gowatch') .'</a>
										<a href="#" class="post-link" data-action="show-post-link">'. esc_html__('Link', 'gowatch') .'</a>
										<div class="embed-content hidden show-embed-code-link">
											<textarea id="video-embed-code">' . self::video_embed_code( $post_ID ) . '</textarea>
										</div>
										<div class="embed-content hidden show-post-link">
											<textarea id="video-url-code">' . get_the_permalink() . '</textarea>
										</div>
									</div>
								</div>
							</div>
						</div>';

                } else {

                    $output = '<div class="airkit_sharing">'. $sharing .'</div>';

                }

                if ( 'y' === $options['single'] ) {

                    $classes[] = 'single-sharing';
                    $classes[] = 'airkit_add-to-sharing';

                    if ( 'y' === $options['heading'] ) {

                        $post_type 	= get_post_type( $post_ID );

                        $titles = array(
                            'post' => esc_html__( 'post', 'gowatch' ),
                            'attachment' => esc_html__( 'attachment', 'gowatch' ),
                            'event' => esc_html__( 'event', 'gowatch' ),
                            'portfolio' => esc_html__( 'project', 'gowatch' ),
                            'ts-gallery' => esc_html__( 'gallery', 'gowatch' ),
                            'ts_teams' => esc_html__( 'member', 'gowatch' ),
                            'video' => esc_html__( 'video', 'gowatch' ),
                            'product' => esc_html__( 'product', 'gowatch' ),
                        );

                        if ( ! array_key_exists( $post_type , $titles ) ) {
                            $post_type = 'post';
                        }

                        $output = '<h5>' . sprintf( esc_html__( 'Share %s with:', 'gowatch' ), $titles[$post_type] ) . '</h5>' . $output;
                    }

                    $output = '<div class="'. implode( ' ', $classes ) .'" data-action="hover">'. $output .'</div>';
                }

                return $output;

            }

        }

        static function video_embed_code ( $post_ID, $options = array() ) {
            if( isset( $videometa['type'] ) && 'embed' === $videometa['type'] ) {

                return airkit_var_sanitize( $videometa['video'] );

            } else {

                return '<iframe src="'. esc_url( get_home_url() . '/embed/' . get_post_field( 'post_name') ) .'" width="680" height="480"></iframe>';

            }
        }

        /*
         * Contains Social sharing URL's for each network, and text for tooltip.
         */
        static function social_sharing( $post_ID, $options = array() ) {

            $output 		 = '';
            $sharing_items 	 = airkit_option_value( 'social', 'social_sharing_items' );
            $post_url 		 = ( isset($options['is_attachment']) && $options['is_attachment'] === true ) ? wp_get_attachment_url($post_ID) : get_the_permalink( $post_ID );
            $post_title 	 = get_the_title( $post_ID );
            $current_user 	 = wp_get_current_user();
            $email_receive   = airkit_option_value( 'social', 'email' ) !== '' ? airkit_option_value( 'social', 'email' ) : $current_user->user_email;

            // Check if in views and add wrappers and classes SOF
            if ( isset( $options['classes'] ) && isset( $options['wrap'] ) ) {
                $output .= '<div class="airkit_sharing ' . $options['classes'] . '">';
            }

            $social_urls = array(

                'facebook' => array(
                    'url'     => 'http://www.facebook.com/sharer/sharer.php?u=' . $post_url,
                    'tooltip' => esc_html__( 'Share on facebook', 'gowatch' ),
                    'label' => esc_html__( 'Facebook', 'gowatch' ),
                ),

                'twitter' => array(
                    'url'     => 'http://twitter.com/home?status='. urlencode( sanitize_text_field( $post_title ) ). '>+'. esc_url( $post_url ),
                    'tooltip' => esc_html__( 'Share on twitter', 'gowatch' ),
                    'label' => esc_html__( 'Twitter', 'gowatch' ),
                ),

                'linkedin' => array(
                    'url'     => 'http://www.linkedin.com/shareArticle?mini=true&url='. esc_url( $post_url ) .'&title='. $post_title,
                    'tooltip' => esc_html__( 'Share on LinkedIn', 'gowatch' ),
                    'label' => esc_html__( 'LinkedIn', 'gowatch' ),
                ),

                'tumblr' => array(
                    'url'     => 'http://www.tumblr.com/share/link?url='. esc_url( $post_url ).'&name='. $post_title,
                    'tooltip' => esc_html__( 'Share on Tumblr', 'gowatch' ),
                    'label' => esc_html__( 'Tumblr', 'gowatch' ),
                ),

                'pinterest' => array(
                    'url'     => 'http://pinterest.com/pin/create/button/?url='. esc_url( $post_url ) .'&amp;media='. wp_get_attachment_url(get_post_thumbnail_id( $post_ID ) ).'&amp;description='. urlencode(sanitize_text_field( $post_title )),
                    'tooltip' => esc_html__( 'Share on Pinterest', 'gowatch' ),
                    'label' => esc_html__( 'Pinterest', 'gowatch' ),
                ),

                'mail' => array(
                    'url'     => '#',
                    'tooltip' => esc_html__( 'Send email', 'gowatch' ),
                    'label' => '',
                    'atts'	=> array(
                        'data-title' => get_the_title($post_ID),
                        'data-subject' => get_bloginfo('name') . ' : ' . get_the_title($post_ID),
                        'data-permalink' => get_the_permalink($post_ID),
                        'data-button-action' => 'send-email',
                    )
                ),
            );

            /*
             * Loop through social items array as it was set in theme options.
             */

            $output .= '<ul class="share-options ">';

            // Check if in views and add wrappers and classes EOF
            if ( isset( $options['classes'] ) ) {
                $output .= '<li><a href="#" class="views-share-opener icon-share"></a></li>';
            }

            foreach ( $sharing_items as $key => $value ) {

                if ( !isset($value['show']) ) {
                    continue;
                }

                /*
                 * remove 'sharing_' prefix from every item
                 */
                $key = str_replace('sharing_', '', $key);

                $display[ $key ] = $value[ 'show' ];
                if(!isset($social_urls[ $key ])) continue;
                $item = $social_urls[ $key ];

                if( 'y' === $value['show'] ) {

                    $atts = isset($item['atts']) ? airkit_Compilator::render_atts($item['atts']) : '';

                    $output .= '
			    		<li class="share-menu-item" data-social="'. esc_attr( $key ) .'" data-post-id="'. esc_attr( $post_ID ) .'">
					        <a class="icon-'. esc_attr( $key ) .'" target="_blank" href="'. esc_url( $item['url'] ) .'" '. $atts .'>
						        '. ( isset($options['label']) && 'y' == $options['label'] && !empty($item['label']) ? '<span>' . $item['label'] . '</span>' : '' ) .'
					        </a>
					    </li>';

                }
            }

            $output .= '</ul>';

            // Check if in views and add wrappers and classes EOF
            if ( isset( $options['classes'] ) ) {
                $output .= '</div>';
            }

            return $output;
        }

        /*
         * Generate add to favorite HTML.
         */
        static function add_to_favorite( $post_ID, $options = array() )
        {
            $btn_classes 	= $wrap_classes = array();
            $favorites 		= ''; $href = '#';
            $user_id 		= get_current_user_id();
            $ajax_nonce 	= wp_create_nonce( 'ajax_airkit_add_to_favorite' );

            $favorites 		= get_user_meta( $user_id, 'favorites', true );

            $label_text  	= esc_html__( 'Favorite', 'gowatch' );
            $icon 			= 'icon-heart';

            if ( '' !== $favorites ) {

                $aFavs = explode('|', $favorites);

                if ( in_array( $post_ID, $aFavs ) ) {
                    $btn_classes[] 	= 'active';
                    $icon 			= 'icon-big-heart';
                    $label_text 	= esc_html__( 'Unfavorite', 'gowatch' );
                }

            }

            if ( !is_user_logged_in() ) {
                $href = get_frontend_registration_url();
                $btn_classes[] = 'user-not-logged-in';
            }

            // Check if label is set true, show it right of icon
            $favorites_label = '';
            $options['label'] = isset( $options['label'] ) ? $options['label'] : false;

            if ( $options['label'] == true ){
                $favorites_label = '<span class="entry-meta-description">' . $label_text . '</span>';
            }

            return '<div class="airkit_add-to-favorite '. implode( ' ', $wrap_classes ) .'">
						<a class="btn-add-to-favorite '. implode( ' ', $btn_classes ) .'" href="'. esc_url( $href ) .'" title="'. $label_text .'" data-post-id="'. $post_ID .'" data-ajax-nonce="'. $ajax_nonce .'">
							<span class="btn-icon-wrap"><i class="'. $icon .'"></i></span>
							' . $favorites_label . '
						</a>
					</div>';

        }

        static function add_to_playlist( $post_ID, $options = array() )
        {

            // Don't show button if user is not logged in
            if ( !is_user_logged_in() )
                return;

            $label 			= '';
            $modal			= '';
            $icon 			= 'icon-list-add';
            $btn_classes 	= array();
            $user_ID 		= get_current_user_id();
            $ajax_nonce 	= wp_create_nonce( 'ajax_airkit_playlist_nonce' );
            $label_text  	= esc_html__( 'Choose a playlist', 'gowatch' );
            $video_embed 	= get_post_meta( $post_ID, 'video_embed', true );

            // Don't show button if video post is embedded
            if ( ! empty($video_embed) )
                return;

            // Check if label is set true, show it right of icon
            $options['label'] = isset( $options['label'] ) ? $options['label'] : false;

            if ( $options['label'] == true ){
                $label = '<span class="entry-meta-description">' . $label_text . '</span>';
            }

            // Allow devs to show modal wherever he wants
            if ( isset($options['show_modal']) && $options['show_modal'] == 'y' ) {

                $args = array(
                    'post_type' => 'playlist',
                    'posts_per_page' => -1,
                    'author' => $user_ID
                );

                $query = new WP_Query($args);

                if ( $query->have_posts() ) {

                    $modal_body = '<ul>';

                    while ( $query->have_posts() ) {
                        $query->the_post();

                        $playlist_ID = get_the_ID();
                        $playlist_title = get_the_title();

                        $post_ids = get_post_meta( $playlist_ID, '_post_ids', true );

                        if ( is_array($post_ids) && in_array($post_ID, $post_ids) ) {
                            $modal_body .= '<li class="active"><label><input type="radio" name="playlist_item" value="'. $playlist_ID .'"><i class="icon-tick"></i> '. $playlist_title .'</label></li>';
                        }
                        else {
                            $modal_body .= '<li><label><input type="radio" name="playlist_item" value="'. $playlist_ID .'"><i class="icon-square-outline"></i> '. $playlist_title .'</label></li>';
                        }
                    }

                    wp_reset_postdata();

                    $modal_body .= '</ul>';

                } else {
                    $modal_body = esc_html__('You don\'t have created any playlists yet!', 'gowatch');
                }

                $modal = '<div id="add-to-playlist-modal" class="add-to-playlist-modal modal fade" tabindex="-1" role="dialog" aria-hidden="false">
					<div class="modal-dialog" role="document">
						<div class="modal-content">
							<div class="modal-header">
								<button type="button" class="close" data-dismiss="modal" aria-label="'. esc_html__('Close', 'gowatch') .'">
								<span aria-hidden="true">×</span></button><strong class="modal-title">'. esc_html__('Choose a playlist', 'gowatch') .'</strong>
							</div>
							<div class="modal-body">'. $modal_body .'</div>
							<div class="modal-footer" style="text-align: left">
								<a href="#" id="airkit-create-playlist"><i class="icon-add"></i> '. esc_html__('Create new playlist', 'gowatch') .'</a>
								<div id="create-playlist-form" class="hidden"><label>'. esc_html__('Playlist title', 'gowatch') .'</label><input type="text" name="playlist_title"><button type="button" id="create-playlist-button"><i class="icon-plus"></i> '. esc_html__('Create', 'gowatch') .'</button></div>
								<span aria-response></span>
							</div>
						</div>
					</div>
				</div>';

                return $modal;

            }

            return '<div class="airkit_add-to-playlist">
						<a class="btn-add-to-playlist '. implode( ' ', $btn_classes ) .'" href="#" title="'. $label_text .'" data-post-id="'. $post_ID .'" data-ajax-nonce="'. $ajax_nonce .'" data-toggle="modal" data-target="#add-to-playlist-modal">
							<span class="btn-icon-wrap"><i class="'. $icon .'"></i></span>' . $label . '
						</a>
					</div>';

        }

        static function post_is_sticky( $post_ID, $options = array() )
        {

            $html = '';

            if( is_sticky( $post_ID ) ) {

                $html = '<div class="is-sticky-div">' . esc_html__('is sticky','gowatch') . '</div>';

            }

            return $html;
        }

        static function post_is_featured( $post_ID, $options = array() )
        {

            $output = $html = $icon = '';
            $post_type = get_post_type( $post_ID );

            $options['element'] = isset( $options['element'] ) ? $options['element'] : 'view';

            if ( $options['element'] == 'view' ) {

                $html = '<span class="is-featured"><i class="icon-star-full"></i></span>';

            } elseif ( $options['element'] == 'tilter-slider' ) {

                $html = '<span class="is-featured"><i class="icon-star-full"></i><small>'. esc_html__('Recommended', 'gowatch') .'</small><strong>'. esc_html__('For you', 'gowatch') .'</strong></span>';
            }

            if ( $post_type == 'video' || $post_type == 'ts-gallery' || $post_type == 'post' ) {

                $is_featured = get_post_meta( $post_ID, 'featured', true );

                if ( $is_featured == 'yes' ) {
                    $output = $html;
                }

            }


            // Check if item has geolocated information and add the badge on the top-right corner
            $asset_geolocation = get_post_meta($post_ID, 'asset_geo-location', true);

            // Decode the data we have in place
            $asset_geolocation = json_decode( $asset_geolocation, true );

            // Check if position exists in the metadata before checking the position values
            if( !empty($asset_geolocation['position']) ) {
                if( isset($asset_geolocation['position']['x']) && $asset_geolocation['position']['x'] != 0 && isset($asset_geolocation['position']['y']) && $asset_geolocation['position']['y'] != 0 && isset($asset_geolocation['position']['z']) && $asset_geolocation['position']['z'] != 0 ) {

                    // Create the HTML for the badge
                    $html = '<span class="has-geolocation"><i class="gwicon-global"></i></span>';

                    // Add the badge here
                    $output .= $html;
                } 
            }

            return $output;
        }

        static function post_format( $post_ID, $options = array() )
        {

            $html = $icon = '';
            $post_type = get_post_type( $post_ID );
            $post_format = get_post_format( $post_ID );

            if ( $post_type == 'post' ) {

                if ( $post_format == 'video' ) {
                    $icon = 'icon-play-full';
                } elseif ( $post_format == 'gallery' ) {
                    $icon = 'icon-images-gallery';
                } elseif ( $post_format == 'audio' ) {
                    $icon = 'icon-audio';
                } elseif ( $post_format == '0' ) {
                    $icon = 'icon-page';
                }

            } elseif ( 'video' == $post_type ) {
                $icon = 'icon-play-full';
            } elseif ( 'ts-gallery' == $post_type ) {
                $icon = 'icon-images-gallery';
            }

            if ( '' != $icon && 'post' == $post_type ) {

                $html = '<span class="post-format"><i class="'. esc_attr( $icon ) .'"></i></span>';

            } elseif ( '' != $icon && ('video' == $post_type || 'ts-gallery' == $post_type ) ) {

                $html = '<span class="post-type"><i class="'. esc_attr( $icon ) .'"></i></span>';

            }

            if ( isset($options['url']) && 'y' == $options['url'] ) {
                $html = sprintf('<a class="post-format-link" href="%s" title="%s">%s</a>', get_the_permalink($post_ID), get_the_title($post_ID), $html);
            }

            return $html;
        }

        static function rating_single( $post_ID, $options = array() )
        {

            $rating_items = get_post_meta( $post_ID, 'ts_post_rating', TRUE );
            $random_ID = airkit_rand_string();
            $html = '';

            if( !empty( $rating_items ) && is_array( $rating_items ) ) {

                $final_score = ''; $i = 0;

                $html = '<div id="post-rating-'. esc_attr($random_ID) .'" class="post-rating" itemprop="reviewRating" itemscope itemtype="http://schema.org/Rating">
							<ul class="rating-items">';

                foreach ( $rating_items as $rating ) {

                    $final_score += $rating['rating_score'];
                    $i++;

                    $html .= '	<li itemprop="itemReviewed" itemscope>
									<h4 class="rating-title" itemprop="name">' . sanitize_text_field( $rating['rating_title'] ) . '</h4>
									<span class="rating-score">
										<i class="note" itemprop="ratingValue">
											' . absint( $rating['rating_score'] ) . '
										</i>&frasl;
										<i class="limit">10</i>
									</span>
									<div class="rating-bar">
										<span class="bar-progress" data-bar-size="'. absint($rating['rating_score']) * 10 .'"></span>
									</div>
								</li>';
                }

                $html .= '	</ul>
								<div class="rating-result text-right">
									<div class="counted-score">
										<span>' . esc_html__( 'Final Score', 'gowatch' ) . '</span>
										<strong class="score" itemprop="ratingValue">' . round( $final_score / $i, 1 ) . '/10</strong>
									</div>
								</div>
							</div>';
            }

            return $html;

        }

        static function tags( $post_ID, $options = array() )
        {

            if( self::is_singular( $options ) && 'n' === airkit_single_option( 'post-tags' ) || !has_tag() ) {

                return;

            }

            if( has_tag() ) {
                echo '	<div class="single-post-tags">
						<h5>' . esc_html__( 'Tagged in:', 'gowatch' ) . '</h5>';
                the_tags('<ul itemprop="keywords" class="tags-container"><li>','</li><li>','</li></ul>') ;
                echo '</div>';
            }
        }

        static function author_box( $post, $options = array() )
        {

            if ( self::is_singular( $options ) && 'n' == airkit_single_option( 'author-box' ) ) {

                return;

            }

            airkit_author_box( $post, $options );
        }

        static function single_pagination( $post_ID, $options = array() )
        {

            if ( 'y' == airkit_single_option( 'pagination' ) ) {

                airkit_get_pagination_next_previous();

            }

        }

        static function single_related( $post_ID, $options = array() )
        {

            if( !is_single() ) {
                return;
            }

            $html = '';

            if ( 'y' == airkit_single_option( 'related' ) ) {

                $related_posts 	= airkit_Compilator::get_single_related_posts( $post_ID );
                $post_type 	= get_post_type( $post_ID );

                $titles = array(
                    'post' => esc_html__( 'Related posts', 'gowatch' ),
                    'event' => esc_html__( 'Related events', 'gowatch' ),
                    'portfolio' => esc_html__( 'Related portfolios', 'gowatch' ),
                    'ts-gallery' => esc_html__( 'Related galeries', 'gowatch' ),
                    'ts_teams' => esc_html__( 'Related members', 'gowatch' ),
                    'video' => esc_html__( 'Related videos', 'gowatch' ),
                );

                if ( ! array_key_exists( $post_type , $titles ) ) {
                    $post_type = 'post';
                }

                if( !empty( $related_posts ) ) {

                    $html = '<div class="post-related single-related-posts">
								<div class="row">
									'. airkit_Compilator::title_element( array('size' => 'h3', 'title' => $titles[$post_type], 'style' => 'smallcenter') ) . $related_posts . '
								</div>
							</div>';
                }
            }

            return $html;
        }


        static function single_featured( $post_ID, $options = array() )
        {

            if( !is_single() ) {
                return;
            }

            $html = '';

            if ( 'y' == airkit_single_option( 'featured' ) ) {

                $featured_posts = airkit_Compilator::get_single_featured_posts( $post_ID );
                $title = '<i class="icon-star-full"></i>'. esc_html__('Recommended', 'gowatch') .'<i class="icon-star-full"></i>';

                if( !empty( $featured_posts ) ) {

                    $html = '<div class="post-related single-featured-posts">
								<div class="inner-posts">
									<div class="row">
										'. airkit_Compilator::title_element( array('size' => 'h4', 'title' => $title, 'style' => 'simplecenter') ) . $featured_posts . '
									</div>
								</div>
							</div>';
                }
            }

            return $html;
        }


        static function single_posts_from_same_category( $post_ID, $options = array() )
        {

            if( !is_single() ) {
                return;
            }

            $html = '';

            if ( 'y' == airkit_single_option( 'same_category' ) ) {

                $related_posts 		= airkit_Compilator::get_single_same_category_posts( $post_ID );
                $post_type 		   	= get_post_type( $post_ID );
                $taxonomy			= airkit_Compilator::get_tax( $post_type );
                $terms             	= wp_get_post_terms( $post_ID, $taxonomy );
                $post_meta         	= get_post_meta( $post_ID, 'airkit_post_settings', true );
                $primary_category  	= isset($post_meta['primary_category']) ? $post_meta['primary_category'] : 'n';
                $term 				= get_term( $primary_category, $taxonomy );

                if ( empty( $terms ) ) return;

                if ( 'n' != $primary_category && $term ) {
                    $term_name = $term->name;
                    $term_slug = $term->slug;
                } else {
                    $term_name = $terms[0]->name;
                    $term_slug = $terms[0]->slug;
                }

                $term_url = get_term_link($term_slug, $taxonomy);

                $title = '<small>'. esc_html__('More from', 'gowatch') .'</small> <a href="'. esc_url($term_url) .'">'. $term_name .'</a>';

                if( !empty( $related_posts ) ) {

                    $html = '<div class="post-related single-from-same-cat-posts">
								<div class="row">
									'. airkit_Compilator::title_element( array('size' => 'h3', 'title' => $title, 'style' => 'smallcenter') ) . $related_posts . '
								</div>
							</div>';
                }
            }

            return $html;
        }

        /**
         * Returns cropped images, depending on $options['i']. $options['k'].
         *
         * @param array  $options Element options.
         * return Array  $item['image_size'] string image_size id
         *				 $item['class'] 	 string Item classes.
         *
         */

        static function mosaic_sizes( $options = array() )
        {
            global $post;

            // Define variables
            $item = array();
            $scroll = 'n';
            $image_size = 'gowatch_grid';
            $class_random = $size = '';
            $layout_mosaic = (isset($options['layout'])) ? $options['layout'] : 'rectangles';

            //loop variables
            $i = $options['i'];
            $j = $options['j'];
            $k = $options['k'];

            if( 'scroll' === $options['behavior'] || 'carousel' === $options['behavior'] ) {

                $scroll = 'y';

            }

            /**
             * Get image sizes and classes for rectangle style.
             */

            if( $layout_mosaic === 'rectangles' ) {

                if( $k == 1 || $k == 5 || $k == 9 ){

                    $class_random = 'col-lg-6 col-md-6 col-sm-6 is-big';
                    $class_random .= self::add_xs_class( $options, 6 );

                    $image_size = 'gowatch_wide';
                }

                if( $k == 2 || $k == 3 || $k == 4 || $k == 6 || $k == 7 || $k == 8 ) {

                    $class_random = 'col-lg-3 col-md-3 col-sm-3 is-small';
                    $class_random .= self::add_xs_class( $options, 3 );

                    $image_size = 'gowatch_grid';

                }

            }

            /**
             * Get image sizes and classes for rectangle style.
             */
            if( $layout_mosaic === 'square' ) {

                if( ( $i % 2 ) == 0 && $scroll == 'n' ){

                    if( $k == 1 || $k == 2 || $k == 4 || $k == 5  ){

                        $class_random = 'col-lg-3 col-md-3 is-small';
                        $class_random .= self::add_xs_class( $options, 3 );

                        $image_size = 'gowatch_grid';

                    }

                    if( $k == 3 ){

                        $class_random = 'col-lg-6 col-md-6 pull-right is-big';
                        $class_random .= self::add_xs_class( $options, 6 );

                        $image_size = 'gowatch_wide';

                    }

                } else {

                    if( $k == 1 ){

                        $class_random = 'col-lg-6 col-md-6 is-big';
                        $class_random .= self::add_xs_class( $options, 6 );

                        $image_size = 'gowatch_wide';

                    }

                    if( $k == 2 || $k == 3 || $k == 4 || $k == 5 ){

                        $class_random = 'col-lg-3 col-md-3 is-small';
                        $class_random .= self::add_xs_class( $options, 3 );

                        $image_size = 'gowatch_grid';
                    }

                }
            }

            /**
             * Get image sizes and classes for style-3.
             */

            if( $layout_mosaic === 'style-3' ) {

                // Second loop
                if( ( $i % 2 ) == 0 && $scroll == 'n' ){
                    //First and third articles will be small
                    if( $k == 1 || $k == 3 ){

                        $class_random = 'col-lg-5 col-md-5 pull-left is-small';
                        $class_random .= self::add_xs_class( $options, 5 );

                        $image_size = 'gowatch_grid';

                    }
                    //second article will be big
                    if( $k == 2 ){

                        $class_random = 'col-lg-7 col-md-7 pull-right is-big';
                        $class_random .= self::add_xs_class( $options, 7 );

                        $image_size = 'gowatch_wide';

                    }

                } else {
                    //First loop
                    //first article will be big
                    if( $k == 1 ){

                        $class_random = 'col-lg-7 col-md-7  pull-left is-big';
                        $class_random .= self::add_xs_class( $options, 7 );

                        $image_size = 'gowatch_wide';

                    }
                    //second and third articles will be small.
                    if( $k == 2 || $k == 3 ){

                        $class_random = 'col-lg-5 col-md-5  pull-right is-small';
                        $class_random .= self::add_xs_class( $options, 5 );

                        $image_size = 'gowatch_grid';

                    }

                }
            }

            if( $layout_mosaic === 'style-4' ) {

                // Second loop
                if( ( $i % 2 ) == 0 && $scroll == 'n' ){
                    //First and third articles will be small
                    if( $k == 1 || $k == 3 ){

                        $size = 'small';

                        $class_random = 'col-lg-6 col-md-6 pull-left is-small';
                        $class_random .= self::add_xs_class( $options, 6 );

                        $image_size = 'gowatch_grid';

                    }
                    //second article will be big
                    if( $k == 2 ){

                        $size = 'big';

                        $class_random = 'col-lg-6 col-md-6 pull-right is-big';
                        $class_random .= self::add_xs_class( $options, 6 );

                        $image_size = 'gowatch_wide';

                    }

                } else {
                    //First loop
                    //first article will be big
                    if( $k == 1 ){

                        $size = 'big';

                        $class_random = 'col-lg-6 col-md-6  pull-left is-big';
                        $class_random .= self::add_xs_class( $options, 6 );

                        $image_size = 'gowatch_wide';

                    }
                    //second and third articles will be small.
                    if( $k == 2 || $k == 3 ){

                        $size = 'small';

                        $class_random = 'col-lg-6 col-md-6  pull-right is-small';
                        $class_random .= self::add_xs_class( $options, 6 );

                        $image_size = 'gowatch_grid';

                    }

                }
            }
            if( $layout_mosaic === 'style-5' ) {

                $size = 'small';

                $class_random = 'col-lg-4 col-md-4  pull-left is-small';
                $class_random .= self::add_xs_class( $options, 4 );

                $image_size = 'gowatch_grid';

            }


            $item['image_size'] = $image_size;
            $item['class'] = $class_random;
            $item['size']  = $size;

            return $item;

        }

        /*
         * Small helper used in @self::mosaic_sizes to add col-xs-$cols class if we have scroll or carousel behavior.
         */
        static function add_xs_class( $options, $cols )
        {
            $class_xs = ' col-xs-12';

            if( isset( $options['behavior'] ) && 'scroll' === $options['behavior'] ) {
                $class_xs = ' col-xs-' . $cols;
            }

            return $class_xs;
        }


        /**
         * Get post meta for posts listings.
         *
         * @param int post id.
         * @param array options [ optional ] Options array that will be passed to called method.
         * @param array exclude [ optional ] Array of meta fields that should not be displayed.
         */

        static function the_meta( $post_ID, $options = array(), $exclude = array() )
        {
            /*
             * Get meta fields ooptions.
             */
            $theme_options = get_option( 'gowatch_options' );

            /*
             * Contains meta items ordered as set in theme options.
             * 'show' key is used to hide or show meta item.
             */
            $meta_items = array(
                'rating' => array(
                    'show' => 'n',
                ),
                'author' => array(
                    'show' => 'y',
                ),
                'date' => array(
                    'show' => 'y',
                ),
                'views' => array(
                    'show' => 'y',
                ),
            );

            // Check if Plugin TouchRate is activated
            if ( class_exists('TouchRate') ) {
                $meta_items['rating']['show'] = 'y';
                $meta_items['author']['show'] = 'n';
            }

            $meta = '';

            foreach ( $meta_items as $meta_key => $value ) {

                /*
                 * Remove 'meta_' prefix used for storing option in database.
                 */
                $func_name = strrpos( $meta_key, 'meta_' ) ? str_replace( 'meta_', '', $meta_key ) : $meta_key;

                /*
                 * If meta key is in array of excluded items, move to the next one.
                 */
                if( in_array( $func_name, $exclude ) )
                    continue;

                /*
                 * If meta item should be displayed, Call the method for meta key, by its name. Pass the $post_ID and $options parameters.
                 */
                if( isset($value['show']) && 'y' == $value['show'] ) {
                    $options['hardcoded-key'] = 'meta_items['. $meta_key .'][show]';
                    $meta .= call_user_func_array( array( __CLASS__, $func_name ), array( $post_ID, $options ) );
                }

            }
            /*
             * Return wrapped meta.
             */
            return '<ul class="entry-meta">' . airkit_var_sanitize( $meta, 'the_kses' ) . '</ul>';

        }


        /**
         * Get post meta in single posts.
         *
         * @param int post id.
         * @param array options [ optional ] Options array that will be passed to called method.
         * @param array exclude [ optional ] Array of meta fields that should not be displayed.
         */

        static function single_meta( $post_ID, $options = array(), $exclude = array() )
        {

            /*
             * Contains meta items ordered as set in theme options.
             * 'show' key is used to hide or show meta item.
             */
            $meta_items = array(
                'author' => array(
                    'show' => 'y',
                ),
                'date' => array(
                    'show' => 'y',
                ),
                'views' => array(
                    'show' => 'y',
                ),
                'likes' => array(
                    'show' => 'y',
                ),
                'reading_time' => array(
                    'show' => 'y',
                ),
                'comments' => array(
                    'show' => 'y',
                ),
            );

            $meta = '';

            foreach ( $meta_items as $meta_key => $value ) {

                /*
                 * Remove 'single_meta_' prefix used for storing option in database.
                 */
                $func_name = strpos( $meta_key , 'single_meta_' ) ? str_replace( 'single_meta_', '', $meta_key ) : $meta_key;

                /*
                 * If meta key is in array of excluded items, move to the next one.
                 */
                if( in_array( $func_name, $exclude ) ) {

                    continue;

                }

                /*
                 * Options for sortable meta items are located in 'single_meta_items' key, in options array.
                 */
                $options['is-single'] = true;
                $options['hardcoded-key'] = 'single_meta_items['. $meta_key .'][show]';
                $meta .= call_user_func_array( array( __CLASS__, $func_name ), array( $post_ID, $options ) );

            }
            /*
             * Return wrapped meta, ready for single post.
             */
            return '<ul class="entry-meta">' . airkit_var_sanitize( $meta, 'the_kses' ) . '</ul>';

        }

        public static function get_std( $input, $values, $default = '' )
        {

            if ( strpos( $input, '[' ) !== false ) {

                // Clean key of '[';
                $ex = explode( '[', $input );


                // Clean values of ']'
                array_walk( $ex, function( &$value, $key ) {

                    $value = str_replace( ']', '', $value );

                });

                $search = '';
                $make = false;

                foreach ( $ex as $key ) {


                    if ( isset( $values[ $key ] ) ) {

                        $search = $values[ $key ];
                        $make = true;

                    }

                    if ( isset( $search[ $key ] )  ) {

                        $search = $search[ $key ];

                    }

                }


                $default = $make ? $search : $default;

            } else {

                $default = isset( $values[ $input ] ) ? $values[ $input ] : $default;
            }

            return $default;
        }

        /**
         * Check if is singular or is page with page builder disabled.
         * Use in Loop.
         */

        public static function is_singular( $options = array() )
        {

            if(  isset( $options['single'] ) || ( get_post_type( get_the_ID() ) == 'page' && !airkit_Compilator::builder_is_enabled() ) )  {

                return true;

            }

            return false;

        }

    }
}