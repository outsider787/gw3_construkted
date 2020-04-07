<?php 
/**
 * Localized Variables:
 * $post_type       => Post type to retrieve.
 * $userdata        => WP User data object.
 * $dashboard_query => Contains posts query for displaying posts in dashboard .
 * $popular_query   => Contains most popular posts query.
 * $favorites_query => Contains posts query for displaying favorite posts.
 * $playlists_query => Contains posts query for displaying playlists.
 * $post_type_obj   => Post type object.
 * $post            => Global $post.
 * $pagenum         => Page numberr for pagination.
 * $is_my_profile   => bool, Tells whether users are viewing their profile, or someone else's profile.
 * $social_icons    => string, Contains HTML for user's social accounts.
 * $member_since    => string, Contains how much time ago user was registered.
 * $active_tab      => string, Contains name of tab that must be set to active.
 *
 */

/*
 * Configure options for posts listings.
 */

$home_active_tab      = ( 'home' == $active_tab )      ? 'active' : '';
$posts_active_tab     = ( 'posts' == $active_tab )     ? 'active' : '';
$favorites_active_tab = ( 'favorites' == $active_tab ) ? 'active' : '';
$settings_active_tab  = ( 'settings' == $active_tab )  ? 'active' : '';
$subscription_active_tab   = ( 'subscription' == $active_tab )    ? 'active' : '';

$edit_profile = new TSZF_Edit_Profile();
$frontend_dashboard = new TSZF_Frontend_Dashboard();
$view_options = $frontend_dashboard->views_options();


$playlist_view_options = $frontend_dashboard->playlist_view_options();

/*
 * Get Sidebar options
 */
$airkit_sidebar = airkit_Compilator::build_sidebar( 'page', get_the_ID() );

global $shown_ids;
$shown_ids = array();

// Get rid of the favorites and playlists for this specific setup
unset($frontend_dashboard->profile_tabs['favorites']);
unset($frontend_dashboard->profile_tabs['playlists']);

// Create a new tab for the subscription
$subscription = array('subscription' => array('title' => 'Subscription', 'class' => 'subscription ' . $subscription_active_tab, 'url' => remove_query_arg( 'sortby', add_query_arg( array('active_tab' => 'subscription') ) )));

function array_insert_after( array $array, $key, array $new ) {
    $keys = array_keys( $array );
    $index = array_search( $key, $keys );
    $pos = false === $index ? count( $array ) : $index + 1;

    return array_merge( array_slice( $array, 0, $pos ), $new, array_slice( $array, $pos ) );
}
$frontend_dashboard->profile_tabs = array_insert_after($frontend_dashboard->profile_tabs, 'posts', $subscription);

?>

<div class="tszf-author" itemscope itemtype="https://schema.org/ProfilePage">
    <?php $frontend_dashboard->user_cover(); ?>
    <div class="tszf-author-inside">
        <div class="container">
            <div class="inner-container">
                <div class="tszf-author-body">
                    <div class="tszf-user-image"><?php $frontend_dashboard->user_avatar(); ?></div>
                    <div class="tszf-user-name">
                        <h4 itemprop="name"><?php echo esc_attr($userdata->display_name) ?></h4>
                        <ul class="social"><?php echo airkit_var_sanitize( $social_icons, 'the_kses' ); ?></ul>
                    </div>
                </div><div class="tszf-author-tabs">
                    <ul class="nav">
                        <?php foreach ($frontend_dashboard->profile_tabs as $key => $tab): ?>
                            <?php
                            if($key == 'posts')
                                $tab['title'] = 'assets';

                            if($key == 'playlists')
                                $tab['title'] = 'collections';

                            ?>

                            <?php if ( 'settings' != $key ): ?>
                                <li class="<?php echo esc_attr($tab['class']); ?>">
                                    <a href="<?php echo esc_url($tab['url']); ?>"><?php echo airkit_var_sanitize($tab['title'], 'the_kses'); ?></a>
                                </li>
                            <?php else: ?>
                                <?php if ( $is_my_profile ): ?>
                                    <li class="<?php echo esc_attr($tab['class']); ?>">
                                        <a href="<?php echo esc_url($tab['url']); ?>"><?php echo airkit_var_sanitize($tab['title'], 'the_kses') . esc_html__('Settings', 'gowatch-child');; ?></a>
                                    </li>
                                <?php endif ?>
                            <?php endif ?>
                        <?php endforeach ?>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="tszf-author-content">
        <div class="container">
            <div class="row">
                <?php echo airkit_var_sanitize( $airkit_sidebar['left'], 'true' );  ?>
                <div class="<?php echo esc_attr( $airkit_sidebar['content_class'] ); ?> ">
                    <div class="tab-content">
                        <?php foreach ($frontend_dashboard->profile_tabs as $key => $tab): ?>

                            <div class="tab-pane <?php echo esc_attr($tab['class']); ?>" id="<?php echo esc_attr($key) ?>">
                                <?php if ( 'home' == $key ): ?>
                                    <h3 class="tszf-section-title"><?php echo esc_html__('Most popular', 'gowatch'); ?></h3>
                                    <div class="row">
                                        <?php
                                            if ( is_object($popular_query) ) {
                                                echo airkit_Compilator::view_articles( $view_options, $popular_query );
                                            }
                                        ?>
                                    </div>
                                    <h3 class="tszf-section-title"><?php echo esc_html__('Latest posts', 'gowatch'); ?></h3>
                                    <div class="row">
                                        <?php
                                            if ( is_object($dashboard_query) ) {
                                                echo airkit_Compilator::view_articles( $view_options, $dashboard_query );
                                            }
                                        ?>
                                    </div>
                                    <!-- This for removing favorites and playlists for this specific setup -->
                                    <?php if( 1 == 2  ): ?>
                                        <h3 class="tszf-section-title"><?php echo esc_html__('Favorites', 'gowatch'); ?></h3>
                                        <div class="row">
                                            <?php
                                                if ( is_object($favorites_query) ) {
                                                    echo airkit_Compilator::view_articles( $view_options, $favorites_query );
                                                }
                                            ?>
                                        </div>
                                        <h3 class="tszf-section-title"><?php echo esc_html__('Created playlists', 'gowatch'); ?></h3>
                                        <div class="row">
                                            <?php
                                                if ( is_object($playlists_query) ) {
                                                    echo airkit_Compilator::playlists( $playlist_view_options, $playlists_query );
                                                }
                                            ?>
                                        </div>
                                    <?php endif; ?>
                                
                                <?php elseif ( 'subscription' == $key ): ?>
                                    <div class="woocommerce">
                                    <?php
                                        $subscription = 0;
                                        $subscriptions = wcs_get_users_subscriptions($current_user->ID);
                                        foreach ($subscriptions as $key => $item) {
                                            if( $item->status == 'active' || $item->status == 'pending-cancel' ){
                                                $subscription = wc_get_order($item->ID);
                                            }
                                        }

                                        wc_print_notices();
                                    ?>
                                    <?php if( $subscription != 0): ?>
                                        <h4><?php esc_html_e( 'Subscription details', 'woocommerce-subscriptions' ); ?></h4>
                                        <table class="shop_table subscription_details">
                                            <tbody>
                                                <tr>
                                                    <td><?php esc_html_e( 'Status', 'woocommerce-subscriptions' ); ?></td>
                                                    <td><?php echo esc_html( wcs_get_subscription_status_name( $subscription->get_status() ) ); ?></td>
                                                </tr>
                                                <?php do_action( 'wcs_subscription_details_table_before_dates', $subscription ); ?>
                                                <?php
                                                $dates_to_display = apply_filters( 'wcs_subscription_details_table_dates_to_display', array(
                                                    'start_date'              => _x( 'Start date', 'customer subscription table header', 'woocommerce-subscriptions' ),
                                                    'last_order_date_created' => _x( 'Last order date', 'customer subscription table header', 'woocommerce-subscriptions' ),
                                                    'next_payment'            => _x( 'Next payment date', 'customer subscription table header', 'woocommerce-subscriptions' ),
                                                    'end'                     => _x( 'End date', 'customer subscription table header', 'woocommerce-subscriptions' ),
                                                    'trial_end'               => _x( 'Trial end date', 'customer subscription table header', 'woocommerce-subscriptions' ),
                                                ), $subscription );
                                                foreach ( $dates_to_display as $date_type => $date_title ) : ?>
                                                    <?php $date = $subscription->get_date( $date_type ); ?>
                                                    <?php if ( ! empty( $date ) ) : ?>
                                                        <tr>
                                                            <td><?php echo esc_html( $date_title ); ?></td>
                                                            <td><?php echo esc_html( $subscription->get_date_to_display( $date_type ) ); ?></td>
                                                        </tr>
                                                    <?php endif; ?>
                                                <?php endforeach; ?>
                                                <?php do_action( 'wcs_subscription_details_table_after_dates', $subscription ); ?>
                                                <?php if ( WCS_My_Account_Auto_Renew_Toggle::can_subscription_auto_renewal_be_changed( $subscription ) ) : ?>
                                                    <tr>
                                                        <td><?php esc_html_e( 'Auto renew', 'woocommerce-subscriptions' ); ?></td>
                                                        <td>
                                                            <div class="wcs-auto-renew-toggle">
                                                                <?php

                                                                $toggle_classes = array( 'subscription-auto-renew-toggle', 'subscription-auto-renew-toggle--hidden' );

                                                                if ( $subscription->is_manual() ) {
                                                                    $toggle_label     = __( 'Enable auto renew', 'woocommerce-subscriptions' );
                                                                    $toggle_classes[] = 'subscription-auto-renew-toggle--off';

                                                                    if ( WC_Subscriptions::is_duplicate_site() ) {
                                                                        $toggle_classes[] = 'subscription-auto-renew-toggle--disabled';
                                                                    }
                                                                } else {
                                                                    $toggle_label     = __( 'Disable auto renew', 'woocommerce-subscriptions' );
                                                                    $toggle_classes[] = 'subscription-auto-renew-toggle--on';
                                                                }?>
                                                                <a href="#" class="<?php echo esc_attr( implode( ' ' , $toggle_classes ) ); ?>" aria-label="<?php echo esc_attr( $toggle_label ) ?>"><i class="subscription-auto-renew-toggle__i" aria-hidden="true"></i></a>
                                                                <?php if ( WC_Subscriptions::is_duplicate_site() ) : ?>
                                                                        <small class="subscription-auto-renew-toggle-disabled-note"><?php echo esc_html__( 'Using the auto-renewal toggle is disabled while in staging mode.', 'woocommerce-subscriptions' ); ?></small>
                                                                <?php endif; ?>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                <?php endif; ?>
                                                <?php do_action( 'wcs_subscription_details_table_before_payment_method', $subscription ); ?>
                                                <?php if ( $subscription->get_time( 'next_payment' ) > 0 ) : ?>
                                                    <tr>
                                                        <td><?php esc_html_e( 'Payment', 'woocommerce-subscriptions' ); ?></td>
                                                        <td>
                                                            <span data-is_manual="<?php echo esc_attr( wc_bool_to_string( $subscription->is_manual() ) ); ?>" class="subscription-payment-method"><?php echo esc_html( $subscription->get_payment_method_to_display( 'customer' ) ); ?></span>
                                                        </td>
                                                    </tr>
                                                <?php endif; ?>
                                                <?php do_action( 'woocommerce_subscription_before_actions', $subscription ); ?>
                                                <?php $actions = wcs_get_all_user_actions_for_subscription( $subscription, get_current_user_id() ); ?>
                                                <?php if ( ! empty( $actions ) ) : ?>
                                                    <tr>
                                                        <td><?php esc_html_e( 'Actions', 'woocommerce-subscriptions' ); ?></td>
                                                        <td>
                                                            <?php foreach ( $actions as $key => $action ) : ?>
                                                                <?php
                                                                    if( $key == 'cancel' ) {
                                                                        $action['url'] = str_replace('change_subscription_to','cancel_subscription' , $action['url']);
                                                                    }

                                                                    if( $key == 'reactivate' ) {
                                                                        $action['url'] = str_replace('change_subscription_to','reactivate_subscription' , $action['url']);
                                                                    }
                                                                ?>
                                                                <a href="<?php echo esc_url( $action['url'] ); ?>" class="button <?php echo sanitize_html_class( $key ) ?>"><?php echo esc_html( $action['name'] ); ?></a>
                                                            <?php endforeach; ?>
                                                        </td>
                                                    </tr>
                                                <?php endif; ?>
                                                <?php do_action( 'woocommerce_subscription_after_actions', $subscription ); ?>
                                            </tbody>
                                        </table>

                                        <?php if ( $notes = $subscription->get_customer_order_notes() ) : ?>
                                            <h4><?php esc_html_e( 'Subscription updates', 'woocommerce-subscriptions' ); ?></h4>
                                            <ol class="woocommerce-OrderUpdates commentlist notes">
                                                <?php foreach ( $notes as $note ) : ?>
                                                <li class="woocommerce-OrderUpdate comment note">
                                                    <div class="woocommerce-OrderUpdate-inner comment_container">
                                                        <div class="woocommerce-OrderUpdate-text comment-text">
                                                            <p class="woocommerce-OrderUpdate-meta meta"><?php echo esc_html( date_i18n( _x( 'l jS \o\f F Y, h:ia', 'date on subscription updates list. Will be localized', 'woocommerce-subscriptions' ), wcs_date_to_time( $note->comment_date ) ) ); ?></p>
                                                            <div class="woocommerce-OrderUpdate-description description">
                                                                <?php echo wp_kses_post( wpautop( wptexturize( $note->comment_content ) ) ); ?>
                                                            </div>
                                                            <div class="clear"></div>
                                                        </div>
                                                        <div class="clear"></div>
                                                    </div>
                                                </li>
                                                <?php endforeach; ?>
                                            </ol>
                                        <?php endif; ?>

                                        <?php
                                        $include_switch_links       = true;
                                        $include_item_removal_links = wcs_can_items_be_removed( $subscription );
                                        $totals                     = $subscription->get_order_item_totals();

                                        // Don't display the payment method as it is included in the main subscription details table.
                                        unset( $totals['payment_method'] );
                                        ?>
                                        <h4><?php esc_html_e( 'Subscription totals', 'woocommerce-subscriptions' ); ?></h4>

                                        <?php do_action( 'woocommerce_subscription_totals', $subscription, $include_item_removal_links, $totals, $include_switch_links ); ?>
                                    <?php else: ?>
                                        <h4><?php esc_html_e( 'No subscription found.', 'gowatch-child' ); ?></h4>
                                        <p><?php esc_html_e( 'We could not find any active subscriptions. If you want to activate a subscription please click the button below.', 'gowatch-child' ); ?></p>
                                        <a class="button" href="<?php echo get_the_permalink( construkted_subscription_product() ); ?>"><?php esc_html_e( 'Upgrade now!', 'gowatch-child' ); ?></a>
                                    <?php endif; ?>
                                    </div>
                                <?php elseif ( 'posts' == $key ): ?>
                                    <div class="row">
                                        <div class="col-md-8 col-sm-8">Used Storage: <?php echo getTotalUploadedFileGBSizeOfCurrentUser()?> GB | Total Quota: <?php echo getDiskQuotaOfCurrentUser()?>GB <a href="/pricing"><?php esc_html_e( 'Get more storage space.', 'gowatch-child' ); ?></a></div>
                                        <div class="col-md-4 col-sm-4"><?php $frontend_dashboard->sortby(); ?></div>
                                    </div>
                                    <?php
                                        if ( is_object($dashboard_query) && $dashboard_query->post_count > 0 ) {
                                            if ( $dashboard_query->have_posts() ) {
                                                $custom_options['is-single'] = false;
                                                $custom_options['is-view-article'] = true;
                                                $custom_options['element-type'] = 'list';
                                                $custom_options['pagination'] = 'load-more';
                                                $custom_options['exclude_meta'] = array('author');

                                                // Create the array for the AJAX request
                                                $custom_query['posts_per_page'] = $dashboard_query->query_vars['posts_per_page'];
                                                $custom_query['author']         = $dashboard_query->query_vars['author'];
                                                $custom_query['post_type']      = $dashboard_query->query_vars['post_type'];
                                                $custom_query['post_status']    = $dashboard_query->query_vars['post_status'];
                                                $custom_query['offset']         = 0;
                                                ?>
                                                <div class="onsen-table">
                                                    <div class="onsen-thead">
                                                        <div class="onsen-th">
                                                            <?php esc_html_e('Asset', 'gowatch-child'); ?>
                                                        </div>
                                                        <div class="onsen-th">
                                                            <?php esc_html_e('Processing Status', 'gowatch-child'); ?>
                                                        </div>
                                                        <div class="onsen-th">
                                                            <?php esc_html_e('Actions', 'gowatch-child'); ?>
                                                        </div>
                                                    </div>
                                                    <?php
                                                        while ( $dashboard_query->have_posts() ) { $dashboard_query->the_post();
                                                           onsen_article($custom_options);
                                                           $shown_ids[] = get_the_ID();
                                                        }
                                                        wp_reset_postdata();
                                                    ?>
                                                </div>
                                                <div class="do-pagination" data-loop="1" data-options="<?php echo airkit_Compilator::build_str($custom_options, 'encode'); ?>" data-args="<?php echo airkit_Compilator::build_str($custom_query, 'encode' );?>">
                                                    <div class="spinner"></div>
                                                    <span><?php  esc_html_e('Load More', 'gowatch'); ?></span>
                                                    <?php wp_nonce_field('pagination-read-more', 'pagination') ?>
                                                </div>
                                                <script>
                                                    jQuery(document).on('click', '.do-pagination', function(){
                                                        console.log('Hello');
                                                        var element         = jQuery(this);
                                                        var loop            = parseInt( element.attr('data-loop') );
                                                        var args            = element.attr('data-args');
                                                        var options         = element.attr('data-options');
                                                        var paginationNonce = element.find('input[type="hidden"]').val();
                                                        var loadmoreButton  = element;
                                                        var $container_wrap = element.prev();

                                                        element.addClass('loading');

                                                        jQuery('#airkit_loading-preload').addClass('shown');

                                                        loadmoreButton.attr('data-loop', loop + 1);

                                                        jQuery.post(gowatch.ajaxurl, {
                                                                action         : 'onsen_pagination',
                                                                args           : args,
                                                                options        : options,
                                                                paginationNonce: paginationNonce,
                                                                loop           : loop

                                                            },  function(data){
                                                                if( data !== '0' ){
                                                                    if( $container_wrap.hasClass('ts-masonry-container') ){
                                                                        var data_content = jQuery(data).appendTo($container_wrap);
                                                                        $container_wrap.isotope('appended', jQuery(data_content));

                                                                        setTimeout(function(){
                                                                            $container_wrap.isotope('layout');
                                                                            AIRKIT.lazyLoad.control( $container_wrap );
                                                                            AIRKIT.init();
                                                                        },1200);
                                                                    } else {
                                                                        setTimeout(function(){
                                                                            jQuery(data).css('opacity', 0).appendTo($container_wrap).css('opacity', 1);
                                                                            AIRKIT.lazyLoad.control( $container_wrap );
                                                                            AIRKIT.init();
                                                                        }, 1000);
                                                                    }
                                                                } else {
                                                                    loadmoreButton.remove();
                                                                }

                                                                jQuery('#airkit_loading-preload').removeClass('shown');

                                                                // Hide the preloader
                                                                setTimeout(function(){
                                                                    element.addClass('loading-out');
                                                                },800);

                                                                setTimeout(function(){
                                                                    element.removeClass('loading-out loading');
                                                                }, 1500)
                                                            }
                                                        );
                                                    });
                                                </script>
                                            <?php
                                            }
                                        }
                                    ?>
                                    
                                <?php elseif ( 'favorites' == $key ): ?>

                                    <?php $frontend_dashboard->sortby(); ?>
                                    
                                    <div class="row">
                                        <?php
                                            if ( is_object($favorites_query) ) {
                                                $view_options = $frontend_dashboard->views_options(array('pagination' => 'load-more'));
                                                echo airkit_Compilator::view_articles( $view_options, $favorites_query );
                                            }
                                        ?>
                                    </div>

                                <?php elseif ( 'playlists' == $key ): ?>

                                    <?php $frontend_dashboard->sortby(array('most_popular', 'top_rated')); ?>
                                    
                                    <div class="row">
                                        <?php
                                            if ( is_object($playlists_query) ) {
                                                $view_options = $frontend_dashboard->views_options(array('pagination' => 'load-more'));
                                                echo airkit_Compilator::playlists( $playlist_view_options, $playlists_query );
                                            }
                                        ?>
                                    </div>

                                <?php elseif ( 'about' == $key ): ?>

                                    <div class="cols-by-2 row">
                                        <div class="col-md-4"><span class="author-label"><?php esc_html_e('Description', 'gowatch'); ?></span></div>
                                        <div class="col-md-8"><p class="author-description" itemprop="about"><?php echo airkit_var_sanitize( $userdata->description, 'the_kses' ); ?></p></div>
                                        <div class="col-md-4"><span class="author-label"><?php esc_html_e('Stats', 'gowatch'); ?></span></div>
                                        <div class="col-md-8">
                                            <ul class="author-stats">
                                                <li>
                                                    <span><?php esc_html_e('Uploaded posts', 'gowatch') ?></span>
                                                    <strong><?php echo esc_html($dashboard_query->found_posts); ?></strong>
                                                </li>
                                                <li>
                                                    <span><?php esc_html_e('Total views', 'gowatch') ?></span>
                                                    <strong><?php echo esc_html($frontend_dashboard->get_total_posts_views()); ?></strong>
                                                </li>
                                                <li>
                                                    <span><?php esc_html_e('Favorites', 'gowatch') ?></span>
                                                    <strong><?php echo esc_html($favorites_query->found_posts); ?></strong>
                                                </li>
                                                <li>
                                                    <span><?php esc_html_e('Playlists', 'gowatch') ?></span>
                                                    <strong><?php echo esc_html($playlists_query->found_posts); ?></strong>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                <?php elseif ( 'settings' == $key && $is_my_profile ): ?>

                                    <?php echo airkit_var_sanitize( $edit_profile->build(), 'true' ); ?>

                                <?php endif ?>
                            </div>

                        <?php endforeach ?>
                    </div>
                </div>
                <?php echo airkit_var_sanitize( $airkit_sidebar['right'], 'true' ); ?>
            </div>
        </div>
    </div>
</div><!-- .author -->

<?php if( $post_type_obj ) { do_action( 'tszf_dashboard_top', $userdata->ID, $post_type_obj ); } ?>

<?php

wp_enqueue_script( 'dashboard-js', get_stylesheet_directory_uri() . '/includes/frontend-submission/assets/js/dashboard.js', array('jquery'), false, true );
?>


