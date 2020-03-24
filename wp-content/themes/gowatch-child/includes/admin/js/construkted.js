;(function($) {
    $('#refresh-tiling-state').click(function () {
        jQuery('#tiling-state-info').html('<p>Refreshing data...</p>');
        $.ajax({
            url : construktedAdminParam.tilingStateEndPoint,
            type : 'post',
            data : {
                action: 'gw3_processing_displayItems',
                echo: '1',
            },
            success : function( response ) {
                $('#tiling-state-info').html(response);
            },
            error: function(xhr, status, error) {
                alert(error);
            }
        });
    });
    $('.processing-item .item-title').on('click', function(){
        jQuery(this).parent().toggleClass('opened');
    });
})(jQuery);
