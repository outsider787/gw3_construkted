jQuery(function ($) {
    var openBtn = $('.bst4-wrapper li.nav-item span.btn');
    var closeBtn = $('.popup-wrapper .close-btn');

    function hideAllPopup() {
        jQuery('.popup-wrapper').hide();
        jQuery('#end-measurement').trigger('click');
    }

    openBtn.click(function () {
        hideAllPopup();
        if( !jQuery(this).parent().hasClass('active') ) {
            let itemDivID = jQuery(this).attr('id');
            let popupID = itemDivID.replace('-btn', '');
            jQuery('#' + popupID).show();
        }
        $(this).parent().toggleClass('active').siblings().not(this).removeClass('active');

    });


    closeBtn.click(function () {
        jQuery(this).parents('.popup-wrapper').hide();
        jQuery('#end-measurement').trigger('click')
    });

});

jQuery('#scroll-down-btn').on('click', function(){
    var toScroll = jQuery('.post-meta').offset().top - jQuery('.featured-image').height() - jQuery('#header').height() + jQuery('.post-meta').height();

    $("html, body").animate({ scrollTop: toScroll }, 600);
});