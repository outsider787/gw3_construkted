;(function($) {

    /**
     * Upload handler helper
     *
     * @param string {browse_button} browse_button ID of the pickfile
     * @param string {container} container ID of the wrapper
     * @param int {max} maximum number of file uplaods
     * @param string {type}
     */

    var Total_file_size_to_upload, startSeconds,currentSeconds,diffSeconds,ETA,keepTrack;
    Total_file_size_to_upload = 0;
    keepTrack = 1;
    ETA = 0;
            

    window.TSZF_Uploader = function (browse_button, container, max, type, allowed_type, max_file_size) {
        this.removed_files = [],
        this.container = container;
        this.browse_button = browse_button;
        this.max = max || 1;
        this.count = $('#' + container).find('.tszf-attachment-list > li').length; //count how many items are there
        this.perFileCount = 0; //file count on each upload

        //if no element found on the page, bail out
        if( !$('#'+browse_button).length ) {
            return;
        }

        //instantiate the uploader
        this.uploader = new plupload.Uploader({
            runtimes: 'html5,html4',
            browse_button: browse_button,
            container: container,
            multipart: true,
            multipart_params: {
                action: 'tszf_file_upload',
                form_id: $( '#' + browse_button ).data('form_id')
            },
            max_file_count : 2,
            multiple_queues: false,
            multi_selection: ( ( browse_button == 'tszf-avatar-pickfiles' || browse_button == 'tszf-featured_image-pickfiles' ) ? false : true ),
            urlstream_upload: true,
            file_data_name: 'tszf_file',
            max_file_size: max_file_size + 'kb',
            url: tszf_frontend_upload.plupload.url + '&type=' + type,
            flash_swf_url: tszf_frontend_upload.flash_swf_url,
            filters: [{
                title: 'Allowed Files',
                extensions: allowed_type
            }]
        });
        //attach event handlers
        this.uploader.bind('Init', $.proxy(this, 'init'));
        this.uploader.bind('FilesAdded', $.proxy(this, 'added'));
        this.uploader.bind('QueueChanged', $.proxy(this, 'upload'));
        this.uploader.bind('UploadProgress', $.proxy(this, 'progress'));
        this.uploader.bind('Error', $.proxy(this, 'error'));
        this.uploader.bind('FileUploaded', $.proxy(this, 'uploaded'));

        this.uploader.init();

        $('#' + container).on('click', 'a.attachment-delete', $.proxy(this.removeAttachment, this));
    };

    TSZF_Uploader.prototype = {

        init: function (up, params) {
            this.showHide();
            $('#' + this.container).prepend('<div class="tszf-file-warning"></div>');
            $('#' + this.container).find('.moxie-shim').show();
        },

        showHide: function () {

            if ( this.count >= this.max) {

                var warning = 'Maximum number of files reached! ';

                if ( this.count > this.max ) {
                    $('#' + this.container + ' .tszf-file-warning').html( warning );
                } else {
                    $('#' + this.container + ' .tszf-file-warning').html( warning );
                }

                $('#' + this.container).find('.file-selector').hide();

                return;
            };
            $('#' + this.container + ' .tszf-file-warning').html( '' );
            $('#' + this.container).find('.file-selector').show();
            $('#' + this.container).find('.moxie-shim').show();
        },

        startUploading: function(up, files) {
            var $container = $('#' + this.container).find('.tszf-attachment-upload-filelist');
            $container.append(
                    '<div class="upload-timing"></div><div class="upload-speed"></div>');

            this.showHide();

            $.each(files, function(i, file) {
                $container.append(
                    '<div class="upload-item" id="' + file.id + '"><div class="progress progress-striped active"><div class="bar"></div></div><div class="filename original">' +
                    file.name + ' (' + plupload.formatSize(file.size) + ') <b></b>' +
                    '</div></div>');
            });

            up.refresh(); // Reposition Flash/Silverlight
            up.start();
        },

        added: function (up, files) {
            var ajaxurl = tszf_frontend_upload.plupload.construkted_ec2_api_task_all_url;

            var self = this;

            $.ajax({
                url: ajaxurl,
                type: 'GET',
                dataType: 'json',
                data: {}
            }).done( function( data ) {
                self.startUploading(up, files);
            }).fail( function() {
                alert( 'Something wrong. Please contact support@construkted.com' );

                self.count = 0;
                self.showHide();
                self.uploader.refresh();
            });

            plupload.each(files, function(file){
                Total_file_size_to_upload +=file.size;
            });
        },

        upload: function (uploader) {

            this.count = uploader.files.length - this.removed_files.length ;
            this.showHide();

        },

        progress: function (up, file) {
            var item = $('#' + file.id);

            function rectime(sec) {
                var hr = Math.floor(sec / 3600);
                var min = Math.floor((sec - (hr * 3600))/60);
                sec -= ((hr * 3600) + (min * 60));
                sec += ''; min += '';

                while (min.length < 2) {
                    min = '0' + min;
                }
                while (sec.length < 2) {
                    sec = '0' + sec;
                }

                hr = (hr)?':'+hr:'';

                return hr + min + ':' + sec;
            }
             
            function bytesConvert(bytes,to){
                if(to=="kb"){
                    return Math.round((bytes/1024)*1)/1;
                }else if(to=="mb"){
                    return Math.round((bytes/1024/1024)*1)/1;
                }else if(to=="gb"){
                    return Math.round((bytes/1024/1024/1024)*1)/1;
                }
            }

            $('.bar', item).css({ width: file.percent + '%' });
            $('.percent', item).html( file.percent + '%' );

            

            if( keepTrack == 1 ){             
                startSeconds = new Date();
                setInterval(function() {
                    currentSeconds = new Date();
                    diffSeconds = currentSeconds.getTime() - startSeconds.getTime();
                    ETA = parseInt(bytesConvert(Total_file_size_to_upload,'kb')/bytesConvert(up.total.bytesPerSec,'kb') - parseInt(diffSeconds/1000, 10), 10);
                }, 1000);
                keepTrack = 0;
            }
            jQuery('.upload-timing').html('Remaining ' + rectime(ETA));
            jQuery('.upload-speed').html('Uploading at ' + bytesConvert(up.total.bytesPerSec,'mb') + ' mb/s');
        },

        error: function (up, error) {

            $('#' + this.container).find('#' + error.file.id).remove();
            jQuery('.upload-timing').remove();
            jQuery('.upload-speed').remove();

            Total_file_size_to_upload = 0;
            keepTrack = 1;
            ETA = 0;

            var msg = '';
            switch(error.code) {
                case -600:
                    msg = 'The file you have uploaded exceeds the file size limit. Please try again.';
                    break;

                case -601:
                    msg = 'You have uploaded an incorrect file type. Please try again.';
                    break;

                default:
                    msg = 'Error #' + error.code + ': ' + error.message;
                    break;
            }

            alert(msg);

            this.count -= 1;
            this.showHide();
            this.uploader.refresh();
        },

        uploaded: function (up, file, response) {
            // var res = $.parseJSON(response.response);
            var self = this;

            $('#' + file.id + " b").html("100%");
            $('#' + file.id).remove();
            jQuery('.upload-timing').remove();
            jQuery('.upload-speed').remove();

            var realResponseString = response.response;

            var isError = true;
            var realResponse;

            try {
                realResponse = JSON.parse(realResponseString);

                if(realResponse.success)
                    isError = false;
            }
            catch(err) {
                isError = false;
            }

            if(!isError) {
                this.perFileCount++;
                var $container = $('#' + this.container).find('.tszf-attachment-list');
                $container.append(response.response);

                Total_file_size_to_upload = 0;
                keepTrack = 1;
                ETA = 0;

                if ( this.perFileCount > this.max ) {
                    var attach_id = $('.tszf-image-wrap:last a.attachment-delete',$container).data('attach_id');
                    self.removeExtraAttachment(attach_id);
                    $('.tszf-image-wrap',$container).last().remove();
                    this.perFileCount--;
                }
                this.showHide();

            } else {
                alert(realResponse.error);

                this.count -= 1;
                this.showHide();
            }
        },

        removeAttachment: function(e) {
            e.preventDefault();

            var self = this,
            el = $(e.currentTarget);

            if ( confirm(tszf_frontend_upload.confirmMsg) ) {
                var data = {
                    'attach_id' : el.data('attach_id'),
                    'nonce' : tszf_frontend_upload.nonce,
                    'action' : 'tszf_file_del'
                };
                this.removed_files.push(data);
                jQuery.post(tszf_frontend_upload.ajaxurl, data, function() {
                    self.perFileCount--;
                    el.parent().parent().remove();

                    self.count -= 1;
                    self.showHide();
                    self.uploader.refresh();
                });
            }
        },

        removeExtraAttachment : function( attach_id ) {


            var self = this;

            var data = {
                'attach_id' : attach_id,
                'nonce' : tszf_frontend_upload.nonce,
                'action' : 'tszf_file_del'
            };
            this.removed_files.push(data);
            jQuery.post(tszf_frontend_upload.ajaxurl, data, function() {
                self.count -= 1;
                self.showHide();
                self.uploader.refresh();
            });
        }

    };
})(jQuery);