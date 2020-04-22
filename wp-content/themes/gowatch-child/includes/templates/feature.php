<?php

/* Thumbnail view template below */
###########

// Get the options

$options = airkit_Compilator::$options;

// Get style for the feature blocks
if ( empty( $options['items'] ) ) return;

$columns_class = airkit_Compilator::get_column_class( $options['per-row'] );
$class_delay = '';
$effect = '';
$animate_parent = '';

$boxes = array();

foreach( $options['items'] as $feature ) :

	if ( 'none' !== $feature['reveal-effect'] ) {

		$animate_parent = ' animatedParent animateOnce';
		$class_delay = 'none' !== $feature['reveal-delay'] ? ' ' . $feature['reveal-delay'] : '';
		$effect = ' class="animated ' . $feature['reveal-effect'] . $class_delay .'"';
	}

	$rand_id = substr( str_shuffle('abcdefgras') , 0, 5);

	$feature['id'] = $rand_id;
	$boxes[] = $feature;

	?>
	<div class="<?php echo airkit_var_sanitize( $columns_class . ' ' . $animate_parent, 'esc_attr' ); ?>">
		<figure <?php echo airkit_var_sanitize( $effect, 'the_kses' ); ?> id="icon-box-<?php echo airkit_var_sanitize( $rand_id, 'esc_attr' ); ?>">	
			<header>
				<?php if ( ! empty( $feature['url'] ) ) : ?>
					<a href="<?php echo esc_url( $feature['url'] ); ?>" ></a>
				<?php endif; ?>
				<i class="<?php echo strip_tags( $feature['icon'] ); ?>"></i>

				<h4 class="title"><?php echo strip_tags( $feature['title'] ); ?></h4>
			</header>
			<figcaption>
				<?php echo apply_filters( 'the_content', $feature['text'] ); ?>
			</figcaption>
		</figure>
	</div>
<?php endforeach; ?>

<?php 
	$style = '';

	foreach ( $boxes as $feature ) {
		$style .= '
			#icon-box-' . $feature['id'] . '{
				background-color: '. $feature['bg-color'] .';
			}

			#icon-box-' . $feature['id'] . ' header > i {
				color: '. $feature['font-color'] .';
			}

			.airkit_icon-box #icon-box-' . $feature['id'] . ' h4.title ,
			.airkit_icon-box #icon-box-' . $feature['id'] . ':hover h4.title {
				color: '. $feature['title-color'] .' !important;
			}
			#icon-box-' . $feature['id'] . '{
				color: '. $feature['text-color'] .';
			}
		';
	}

	echo '<style scope>' . stripslashes( $style ) . '</style>';

?>
