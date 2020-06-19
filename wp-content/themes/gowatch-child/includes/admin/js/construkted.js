(function($) {
    function getIdSuffix(apiUrl) {
        let temp = apiUrl;

        let idSuffix = temp.replace('//', '');
        idSuffix = idSuffix.replace(/:/g, '');

        // remove dot
        idSuffix = idSuffix.replace(/\./g, '');

        return idSuffix;
    }


    for(const key in construktedAdminParam.apiUrls) {
        const apiUrl = construktedAdminParam.apiUrls[key];
        const idSuffix = getIdSuffix(apiUrl);

        const refreshButtonId = 'refresh-tiling-state-' + idSuffix;

        const jQRefreshButton = jQuery('#' + refreshButtonId);

        jQRefreshButton.click(function () {
            // because of Syntax Error, unrecognized expression'

            onClickRefreshButton(apiUrl);
        });
    }

    function onClickRefreshButton(apiUrl) {
        const idSuffix = getIdSuffix(apiUrl);

        jQuery('#construkted-api-state-' + idSuffix).html('<p>Refreshing ...</p>');

        jQuery('#refresh-tiling-state-' + idSuffix).prop('disabled', true);

        $.ajax({
            url : construktedAdminParam.ajaxUrl,
            type : 'post',
            data : {
                action: 'gw3_processing_displayItems',
                apiUrl: apiUrl
            },
            success : function( response ) {
                response = JSON.parse(response);

                const countOfTasksBeingProcessed = parseInt(response.count_of_tasks_being_processed);
                const countOfTasksInQueue = parseInt(response.count_of_tasks_in_queue);
                const countOfTasksFailed = parseInt(response.count_of_tasks_failed);
                const countOfTasksCompleted = parseInt(response.count_of_tasks_completed);

                if(countOfTasksBeingProcessed > 0 ) {
                    $('#tasks-being-processed-' + idSuffix).show();
                    $('#tasks-being-processed-title-' + idSuffix).show();
                }
                else {
                    $('#tasks-being-processed-' + idSuffix).hide();
                    $('#tasks-being-processed-title-' + idSuffix).hide();
                }

                if(countOfTasksInQueue > 0 ) {
                    $('#tasks-in-queue-' + idSuffix).show();
                    $('#tasks-in-queue-title-' + idSuffix).show();
                }
                else {
                    $('#tasks-in-queue-' + idSuffix).hide();
                    $('#tasks-in-queue-title-' + idSuffix).hide();
                }

                if(countOfTasksFailed > 0 ) {
                    $('#tasks-failed-' + idSuffix).show();
                    $('#tasks-failed-title-' + idSuffix).show();
                }
                else {
                    $('#tasks-failed-' + idSuffix).hide();
                    $('#tasks-failed-title-' + idSuffix).hide();
                }

                if(countOfTasksCompleted > 0 ) {
                    $('#tasks-completed-' + idSuffix).show();
                    $('#tasks-completed-title-' + idSuffix).show();
                }
                else {
                    $('#tasks-completed-' + idSuffix).hide();
                    $('#tasks-completed-title-' + idSuffix).hide();
                }

                $('#tasks-being-processed-' + idSuffix).html(response.html_for_tasks_being_processed);
                $('#tasks-in-queue-' + idSuffix).html(response.html_for_tasks_in_queue);
                $('#tasks-failed-' + idSuffix).html(response.html_for_tasks_failed);
                $('#tasks-completed-' + idSuffix).html(response.html_for_tasks_completed);

                $('#count-of-tasks-being-processed-' + idSuffix).html(response.count_of_tasks_being_processed);
                $('#count-of-tasks-in-queue-' + idSuffix).html(response.count_of_tasks_in_queue);
                $('#count-of-tasks-failed-' + idSuffix).html(response.count_of_tasks_failed);
                $('#count-of-tasks-completed-' + idSuffix).html(response.count_of_tasks_completed);

                let apiState = response.construkted_api_state;

                apiState = '<strong>' + apiState + '</strong>';
                apiState += "(";
                apiState += apiUrl;
                apiState += ")";

                $('#construkted-api-state-' + idSuffix).html(apiState);

                connectClickDetail();

                jQuery('#refresh-tiling-state-' + idSuffix).prop('disabled', false);
            },
            error: function(xhr, status, error) {
                jQuery('#refresh-tiling-state-' + idSuffix).prop('disabled', false);
                alert(error);
            }
        });
    }


    jQuery('#add-new-construkted-url').click(function () {
        const rowCount = jQuery('#construkted-api-url-settings-table tr').size();

        // last row : for "Save Changes" button
        // just before last row : for "ADD URL" button
        if(rowCount < 2) {
            console.error('construkted-api-url-settings-table must have 2 row at least');
            return;
        }

        const index = (rowCount - 1);

        const newRowHtml = '<tr>' +
                               '<td>' +
                                    ' <input type="text" id = "' + 'construkted-api-url'  + index + '" name="api_urls[construkted-api-url' + index  +']" size="63"/> ' +
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
