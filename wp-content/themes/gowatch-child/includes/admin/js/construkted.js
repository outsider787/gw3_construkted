(function($) {
    jQuery('#refresh-tiling-state').click(function () {
        jQuery('#construkted-api-state').html('<p>Refreshing ...</p>');

        jQuery('#refresh-tiling-state').prop('disabled', true);

        $.ajax({
            url : construktedAdminParam.ajaxUrl,
            type : 'post',
            data : {
                action: 'gw3_processing_displayItems'
            },
            success : function( response ) {
                response = JSON.parse(response);

                const countOfTasksBeingProcessed = parseInt(response.count_of_tasks_being_processed);
                const countOfTasksInQueue = parseInt(response.count_of_tasks_in_queue);
                const countOfTasksFailed = parseInt(response.count_of_tasks_failed);

                if(countOfTasksBeingProcessed > 0 ) {
                    $('#tasks-being-processed').show();
                    $('#tasks-being-processed-title').show();
                }
                else {
                    $('#tasks-being-processed').hide();
                    $('#tasks-being-processed-title').hide();
                }

                if(countOfTasksInQueue > 0 ) {
                    $('#tasks-in-queue').show();
                    $('#tasks-in-queue-title').show();
                }
                else {
                    $('#tasks-in-queue').hide();
                    $('#tasks-in-queue-title').hide();
                }

                if(countOfTasksFailed > 0 ) {
                    $('#tasks-failed').show();
                    $('#tasks-failed-title').show();
                }
                else {
                    $('#tasks-failed').hide();
                    $('#tasks-failed-title').hide();
                }

                $('#tasks-being-processed').html(response.html_for_tasks_being_processed);
                $('#tasks-in-queue').html(response.html_for_tasks_in_queue);
                $('#tasks-failed').html(response.html_for_tasks_failed);

                $('#count-of-tasks-being-processed').html(response.count_of_tasks_being_processed);
                $('#count-of-tasks-in-queue').html(response.count_of_tasks_in_queue);
                $('#count-of-tasks-failed').html(response.count_of_tasks_failed);

                $('#construkted-api-state').html(response.construkted_api_state);

                connectClickDetail();

                jQuery('#refresh-tiling-state').prop('disabled', false);
            },
            error: function(xhr, status, error) {
                jQuery('#refresh-tiling-state').prop('disabled', false);
                alert(error);
            }
        });
    });

    jQuery('#add-new-construkted-url').click(function () {
        var rowCount = jQuery('#construkted-api-url-settings-table tr').size();

        console.log(rowCount);

        // last row : for "Save Changes" button
        // just before last row : for "ADD URL" button
        if(rowCount < 2) {
            console.error('construkted-api-url-settings-table must have 2 row at least');
            return;
        }

        const index = (rowCount - 2);

        const newRowHtml = '<tr>' +
                               '<td>' +
                                    ' <input type="text" id = "' + 'construkted-api-url'  + index + '" name="api_options[construkted-api-url' + index  +']" size="63"/> ' +
                                    '<input type="button" class="button-primary construkted-api-delete-button" value="Delete"/> ' +
                                '</td>' +
                            '</tr>';

        if(rowCount == 2) {
            jQuery('#construkted-api-url-settings-table tr:first').before(newRowHtml);
        }
        else
            jQuery('#construkted-api-url-settings-table > tbody > tr').eq(rowCount - 3).after(newRowHtml);

        jQuery('.construkted-api-delete-button').click(function () {
            var trParent = $(this).parent().parent();

            trParent.remove();
        });
    });

    jQuery('.construkted-api-delete-button').click(function () {
        var trParent = $(this).parent().parent();

        trParent.remove();
    });

    connectClickDetail();

    function connectClickDetail() {
        jQuery('.processing-item .item-title').on('click', function(){
            jQuery(this).parent().toggleClass('opened');
        });

        jQuery('.processing-item .dashicons').on('click', function(){
            jQuery(this).parent().toggleClass('opened');
        });
    }
})(jQuery);
