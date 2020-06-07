;(function($) {
    var firstFoundValidAPIUrl = "";

    $.fn.listautowidth = function() {
        return this.each(function() {
            var w = $(this).width();
            var liw = w / $(this).children('li').length;
            $(this).children('li').each(function(){
                var s = $(this).outerWidth(true)-$(this).width();
                $(this).width(liw-s);
            });
        });
    };

    jQuery(document).on('click', '.autopost-checkbox input[type="checkbox"]', function(){
        if( jQuery(this).is(':checked') ){
            TSZF_User_Frontend.validateForm(jQuery('.tszf-form-add'));
        }
    });

    var TSZF_User_Frontend = {

        pass_val : '',
        retype_pass_val : '',

        init: function() {

            //enable multistep
            this.enableMultistep(this);

            // clone and remove repeated field
            $('.tszf-form').on('click', 'a.tszf-delete-avatar', this.deleteAvatar);
            $('.tszf-form').on('click', 'a#tszf-post-draft', this.draftPost);

            $('.tszf-form-add').on('submit', this.formSubmit);
            $('form#post').on('submit', this.adminPostSubmit);
            $( '.tszf-form').on('keyup', '#pass1', this.check_pass_strength );

            this.ajaxCategory();
            // image insert
            // this.insertImage();
        },

        check_pass_strength : function() {
            var pass1 = $('#pass1').val(), strength;

            $('#pass-strength-result').removeClass('short bad good strong');
            if ( ! pass1 ) {
                $('#pass-strength-result').html( '&nbsp;' );
                return;
            }

            if ( typeof wp.passwordStrength != 'undefined' ) {

                strength = wp.passwordStrength.meter( pass1, wp.passwordStrength.userInputBlacklist(), pass1 );

                switch ( strength ) {
                    case 2:
                        $('#pass-strength-result').addClass('bad').html( pwsL10n.bad );
                        break;
                    case 3:
                        $('#pass-strength-result').addClass('good').html( pwsL10n.good );
                        break;
                    case 4:
                        $('#pass-strength-result').addClass('strong').html( pwsL10n.strong );
                        break;
                    case 5:
                        $('#pass-strength-result').addClass('short').html( pwsL10n.mismatch );
                        break;
                    default:
                        $('#pass-strength-result').addClass('short').html( pwsL10n['short'] );
                }

            }
        },

        enableMultistep: function(o) {

            var js_obj = this;
            var step_number = 0;
            var progressbar_type = $(':hidden[name="tszf_multistep_type"]').val();

            if ( progressbar_type == null ) {
                return;
            }

            // first fieldset doesn't have prev button,
            // last fieldset doesn't have next button
            $('fieldset:first .tszf-multistep-prev-btn').remove();
            $('fieldset:last .tszf-multistep-next-btn').remove();

            // at first first fieldset will be shown, and others will be hidden
            $('.tszf-form fieldset').hide().first().show();

            if ( progressbar_type == 'progressive' && $('.tszf-form .tszf-multistep-fieldset').length != 0 ) {

                var firstLegend = $('fieldset.tszf-multistep-fieldset legend').first();
                $('.tszf-multistep-progressbar').html('<div class="tszf-progress-percentage"></div>' );

                var progressbar = $( ".tszf-multistep-progressbar" ),
                    progressLabel = $( ".tszf-progress-percentage" );

                $( ".tszf-multistep-progressbar" ).progressbar({
                    change: function() {
                        progressLabel.text( progressbar.progressbar( "value" ) + "%" );
                    }
                });

                $('.tszf-multistep-fieldset legend').hide();

            } else {
                $('.tszf-form').each(function() {
                    var this_obj = $(this);
                    var progressbar = $('.tszf-multistep-progressbar', this_obj);
                    var nav = '';

                    progressbar.addClass('wizard-steps');
                    nav += '<ul class="tszf-step-wizard">';

                    $('.tszf-multistep-fieldset', this).each(function(){
                        nav += '<li>' + $.trim( $('legend', this).text() ) + '</li>';
                        $('legend', this).hide();
                    });

                    nav += '</ul>';
                    progressbar.append( nav );

                    $('.tszf-step-wizard li', progressbar).first().addClass('active-step');
                    $('.tszf-step-wizard', progressbar).listautowidth();
                });
            }

            this.change_fieldset(step_number, progressbar_type);

            $('fieldset .tszf-multistep-prev-btn, fieldset .tszf-multistep-next-btn').click(function(e) {

                // js_obj.formSubmit();
                if ( $(this).hasClass('tszf-multistep-next-btn') ) {
                    var result = js_obj.formStepCheck( '', $(this).parent() );

                    if ( result != false ) {
                        o.change_fieldset(++step_number,progressbar_type);
                    }

                } else if ( $(this).hasClass('tszf-multistep-prev-btn') ) {
                    o.change_fieldset( --step_number,progressbar_type );
                }

                return false;
            });
        },

        change_fieldset: function(step_number, progressbar_type) {
            $('fieldset').hide().eq(step_number).show();

            $('.tszf-step-wizard li').each(function(){
                if ( $(this).index() <= step_number ){
                    progressbar_type == 'step_by_step'? $(this).addClass('passed-tszf-ms-bar') : $('.tszf-ps-bar',this).addClass('passed-tszf-ms-bar');
                } else {
                    progressbar_type == 'step_by_step'? $(this).removeClass('passed-tszf-ms-bar') : $('.tszf-ps-bar',this).removeClass('passed-tszf-ms-bar');
                }
            });

            $('.tszf-step-wizard li').removeClass('tszf-ms-bar-active active-step completed-step');
            $('.passed-tszf-ms-bar').addClass('completed-step').last().addClass('tszf-ms-bar-active');
            $('.tszf-ms-bar-active').addClass('active-step');

            var legend = $('fieldset.tszf-multistep-fieldset').eq(step_number).find('legend').text();
            legend = $.trim( legend );

            if ( progressbar_type == 'progressive' && $('.tszf-form .tszf-multistep-fieldset').length != 0 ) {
                var progress_percent = ( step_number + 1 ) * 100 / $('fieldset.tszf-multistep-fieldset').length ;
                var progress_percent = Number( progress_percent.toFixed(2) );
                $( ".tszf-multistep-progressbar" ).progressbar({value: progress_percent });
                $( '.tszf-progress-percentage' ).text( legend + ' (' + progress_percent + '%)');
            }
        },

        ajaxCategory: function () {

            var el = '.cat-ajax',
                wrap = '.category-wrap';

            $(wrap).on('change', el, function(){
                currentLevel = parseInt( $(this).parent().attr('level') );
                TSZF_User_Frontend.getChildCats( $(this), 'lvl', currentLevel+1, wrap, 'category');
            });
        },

        getChildCats: function (dropdown, result_div, level, wrap_div, taxonomy) {

            cat = $(dropdown).val();
            results_div = result_div + level;
            taxonomy = typeof taxonomy !== 'undefined' ? taxonomy : 'category';
            field_attr = $(dropdown).siblings('span').data('taxonomy');

            $.ajax({
                type: 'post',
                url: tszf_frontend.ajaxurl,
                data: {
                    action: 'tszf_get_child_cat',
                    catID: cat,
                    nonce: tszf_frontend.nonce,
                    field_attr: field_attr
                },
                beforeSend: function() {
                    $(dropdown).parent().parent().next('.loading').addClass('tszf-loading');
                },
                complete: function() {
                    $(dropdown).parent().parent().next('.loading').removeClass('tszf-loading');
                },
                success: function(html) {
                    //console.log( html ); return;
                    $(dropdown).parent().nextAll().each(function(){
                        $(this).remove();
                    });

                    if(html != "") {
                        $(dropdown).parent().addClass('hasChild').parent().append('<div id="'+result_div+level+'" level="'+level+'"></div>');
                        dropdown.parent().parent().find('#'+results_div).html(html).slideDown('fast');
                    }
                }
            });
        },

        cloneField: function(e) {
            e.preventDefault();

            var $div = $(this).closest('div');

            TSZF_User_Frontend.cloneThis( $div );

        },

        /**
         * Used to clone a given element, and set its fields values to empty.
         * @param DOM Object Given object that must be cloned.
         */
        cloneThis: function( domObject ) {
            var $clone = domObject.clone();

            var oldIndex = $clone.attr('data-label-index'),
                newIndex = parseInt( oldIndex ) + 1 ;

            $clone.attr('data-label-index', newIndex);

            domObject.after( $clone );
            domObject.hide();
            $clone.find('input').val('');
            $clone.find(':checked').attr('checked', '');

            //Focus on this input.
            $clone.find('input').focus();

            // Create the pill.
            TSZF_User_Frontend.createPill( domObject );
        },

        /**
         * Used to create a pill for given value for repeat field.
         * @param DOM Object Repeat field Input.
         */
        createPill: function( domObject ) {
            // Get actual input and its value.
            var $input = domObject.is('input') ? jQuery(domObject) : domObject.find('input'),
                value  = $input.val().replace(/(<([^>]+)>)/ig,"");

            //Where pill will be appended.
            var addTo = domObject.parents('.repeat-field-container'),
                pill  = TSZF_User_Frontend.renderPill( value, domObject.attr('data-label-index') );

            pill.appendTo( addTo );
        },

        /**
         * Renders pill output.
         * @param string text Pill text.
         */
        renderPill: function( text, index ) {
            return $( '<div class="repeat-pill" data-label-for="'+ index +'"><span class="value">'+ text +'</span> <span class="remove icon-close"></span></div>' );
        },

        /*
         * Delete pill and coresponding input.
         * @param DOM Object pill that was clicked.
         */
        removePill: function( domObject ) {
            var labelIndex = domObject.attr('data-label-for');
            domObject.fadeOut(400).remove();
            jQuery('div[data-label-index="'+ labelIndex +'"]').remove();
        },


        removeField: function() {
            //check if it's the only item
            var $parent = $(this).closest('tr');
            var items = $parent.siblings().andSelf().length;

            if( items > 1 ) {
                $parent.remove();
            }
        },

        adminPostSubmit: function(e) {
            e.preventDefault();

            var form = $(this),
                form_data = TSZF_User_Frontend.validateForm(form);

            if (form_data) {
                return true;
            }
        },

        draftPost: function (e) {
            e.preventDefault();

            var self = $(this),
                form = $(this).closest('form'),
                form_data = form.serialize() + '&action=tszf_draft_post',
                post_id = form.find('input[type="hidden"][name="post_id"]').val();

            var rich_texts = [],
                temp, val;

            // grab rich texts from tinyMCE
            $('.tszf-rich-validation').each(function (index, item) {
                temp = $(item).data('id');
                val = $.trim( tinyMCE.get(temp).getContent() );

                rich_texts.push(temp + '=' + encodeURIComponent( val ) );
            });

            // append them to the form var
            form_data = form_data + '&' + rich_texts.join('&');


            self.after(' <span class="tszf-loading"></span>');
            $.post(tszf_frontend.ajaxurl, form_data, function(res) {
                // console.log(res, post_id);
                if ( typeof post_id === 'undefined') {
                    var html = '<input type="hidden" name="post_id" value="' + res.post_id +'">';
                    html += '<input type="hidden" name="post_date" value="' + res.date +'">';
                    html += '<input type="hidden" name="post_author" value="' + res.post_author +'">';
                    html += '<input type="hidden" name="comment_status" value="' + res.comment_status +'">';

                    form.append( html );
                }

                self.next('span.tszf-loading').remove();

                self.after('<span class="tszf-draft-saved">&nbsp; Post Saved</span>');
                $('.tszf-draft-saved').delay(2500).fadeOut('fast', function(){
                    $(this).remove();
                });
            })
        },

        formStepCheck : function(e,fieldset) {
            var form = fieldset,
                submitButton = form.find('input[type=submit]');
            form_data = TSZF_User_Frontend.validateForm(form);
            if( form_data == false ) {
                TSZF_User_Frontend.addErrorNotice( self, 'bottom' );
            }
            return form_data;
        },

        formSubmit: function(e) {
            e.preventDefault();

            var form = $(this),
                submitButton = form.find('input[type=submit]'),
            form_data = TSZF_User_Frontend.validateForm(form);

            form_data += "&";
            form_data += 'first_found_valid_api_url=';
            form_data += firstFoundValidAPIUrl;

            console.log(form_data);

            if (form_data) {

                // send the request
                form.find('li.tszf-submit').append('<span class="tszf-loading"></span>');
                submitButton.attr('disabled', 'disabled').addClass('button-primary-disabled');

                TSZF_User_Frontend.showWaitingSpinner();

                $.post(tszf_frontend.ajaxurl, form_data, function(res) {
                    // var res = $.parseJSON(res);

                    if ( res.success) {

                        // enable external plugins to use events
                        $('body').trigger('tszf:postform:success', res);

                        if( res.show_message == true) {
                            form.before( '<div class="tszf-success airkit_alert alert-success">' + res.message + '</div>');
                            form.slideUp( 'fast', function() {
                                form.remove();
                            });

                            //focus
                            $('html, body').animate({
                                scrollTop: $('.tszf-success').offset().top - 100
                            }, 'fast');

                        } else {
                            window.location = res.redirect_to;
                        }

                    } else {

                        if ( typeof res.type !== 'undefined' && res.type === 'login' ) {

                            if ( confirm(res.error) ) {
                                window.location = res.redirect_to;
                            } else {
                                submitButton.removeAttr('disabled');
                                submitButton.removeClass('button-primary-disabled');
                                form.find('span.tszf-loading').remove();
                            }

                            return;
                        } else {
                            alert( res.error );
                        }

                        submitButton.removeAttr('disabled');
                    }

                    submitButton.removeClass('button-primary-disabled');
                    form.find('span.tszf-loading').remove();

                    TSZF_User_Frontend.hideSpinner();
                });
            }
        },

        validateForm: function( self ) {

            var temp,
                temp_val = '',
                error = false,
                error_items = [];
            error_type = '';

            // remove all initial errors if any
            TSZF_User_Frontend.removeErrors(self);
            TSZF_User_Frontend.removeErrorNotice(self);

            // ===== Validate: Text and Textarea ========
            var required = self.find('[data-required="yes"]:visible');

            required.each(function(i, item) {
                // temp_val = $.trim($(item).val());

                // console.log( $(item).data('type') );
                var data_type = $(item).data('type')
                val = '';

                switch(data_type) {
                    case 'rich':
                        var name = $(item).data('id')
                        val = $.trim( tinyMCE.get(name).getContent() );

                        if ( val === '') {
                            error = true;

                            // make it warn collor
                            TSZF_User_Frontend.markError(item);
                        }
                        break;

                    case 'textarea':
                    case 'text':

                        if ( $(item).hasClass('password') ) {
                            if ( TSZF_User_Frontend.pass_val == '' ) {
                                TSZF_User_Frontend.pass_val = $(item).val();
                            } else {
                                TSZF_User_Frontend.retype_pass_val = $(item).val();
                            }
                            if ( TSZF_User_Frontend.pass_val != '' && TSZF_User_Frontend.retype_pass_val != '' && TSZF_User_Frontend.pass_val !=  TSZF_User_Frontend.retype_pass_val ) {
                                error = true;
                                error_type = 'mismatch';

                                TSZF_User_Frontend.markError( item, error_type );
                                break;
                            }

                        }
                        val = $.trim( $(item).val() );

                        if ( val === '') {
                            error = true;
                            error_type = 'required';

                            // make it warn collor
                            TSZF_User_Frontend.markError( item, error_type );
                        }
                        break;

                    case 'select':
                        val = $(item).val();

                        // console.log(val);
                        if ( !val || val === '-1' ) {
                            error = true;
                            error_type = 'required';

                            // make it warn collor
                            TSZF_User_Frontend.markError( item, error_type );
                        }
                        break;

                    case 'multiselect':
                        val = $(item).val();

                        if ( val === null || val.length === 0 ) {
                            error = true;
                            error_type = 'required';

                            // make it warn collor
                            TSZF_User_Frontend.markError( item,  error_type );
                        }
                        break;

                    case 'tax-checkbox':
                        var length = $(item).children().find('input:checked').length;

                        if ( !length ) {
                            error = true;
                            error_type = 'required';

                            // make it warn collor
                            TSZF_User_Frontend.markError( item,  error_type );
                        }
                        break;

                    case 'radio':
                        var length = $(item).find('input:checked').length;

                        if ( !length ) {
                            error = true;
                            error_type = 'required';

                            // make it warn collor
                            TSZF_User_Frontend.markError( item,  error_type );
                        }
                        break;

                    case 'file':
                        var length = $(item).find('ul').children().length;
                        if( $(item).hasClass('is-uploading') ) break;
                        if ( !length ) {
                            error = true;
                            error_type = 'required';

                            // make it warn collor
                            TSZF_User_Frontend.markError( item,  error_type );
                        }
                        break;

                    case 'email':
                        var val = $(item).val();

                        if ( val !== '' ) {
                            //run the validation
                            if( !TSZF_User_Frontend.isValidEmail( val ) ) {
                                error = true;
                                error_type = 'validation';

                                TSZF_User_Frontend.markError( item,  error_type );
                            }
                        } else if( val === '' ) {
                            error = true;
                            error_type = 'required';

                            TSZF_User_Frontend.markError( item,  error_type );
                        }
                        break;


                    case 'url':
                        var val = $(item).val();

                        if ( val !== '' ) {
                            //run the validation
                            if( !TSZF_User_Frontend.isValidURL( val ) ) {
                                error = true;
                                error_type = 'validation';

                                TSZF_User_Frontend.markError( item,  error_type );
                            }
                        }
                        break;

                };

            });

            // if already some error found, bail out
            if (error) {
                // add error notice
                jQuery('.autopost-checkbox input[type="checkbox"]').prop('checked', false);
                TSZF_User_Frontend.addErrorNotice(self,'end');

                return false;
            }

            var form_data = self.serialize(),
                rich_texts = [];

            // grab rich texts from tinyMCE
            $('.tszf-rich-validation').each(function (index, item) {
                temp = $(item).data('id');
                val = $.trim( tinyMCE.get(temp).getContent() );

                rich_texts.push(temp + '=' + encodeURIComponent( val ) );
            });

            // append them to the form var
            form_data = form_data + '&' + rich_texts.join('&');
            return form_data;
        },
        /**
         *
         * @param form
         * @param position (value = bottom or end) end if form is onepare, bottom, if form is multistep
         */
        addErrorNotice: function( form, position ) {
            if( position == 'bottom' ) {
                $('.tszf-multistep-fieldset:visible').append('<div class="tszf-errors">' + tszf_frontend.error_message + '</div>');
            } else {
                $(form).find('li.tszf-submit').append('<div class="tszf-errors">' + tszf_frontend.error_message + '</div>');
            }

        },

        removeErrorNotice: function(form) {
            $(form).find('.tszf-errors').remove();
        },

        markError: function(item, error_type) {

            var error_string = '';
            $(item).closest('li').addClass('has-error');

            if ( error_type ) {
                error_string = $(item).closest('li').data('label');
                switch ( error_type ) {
                    case 'required' :
                        error_string = error_string + ' ' + error_str_obj[error_type];
                        break;
                    case 'mismatch' :
                        error_string = error_string + ' ' +error_str_obj[error_type];
                        break;
                    case 'validation' :
                        error_string = error_string + ' ' + error_str_obj[error_type];
                        break
                }
                $(item).siblings('.tszf-error-msg').remove();
                $(item).after('<div class="tszf-error-msg">'+ error_string +'</div>')
            }

            $(item).focus();
        },

        removeErrors: function(item) {
            $(item).find('.has-error').removeClass('has-error');
            $('.tszf-error-msg').remove();
        },

        isValidEmail: function( email ) {
            var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
            return pattern.test(email);
        },

        isValidURL: function(url) {
            var urlregex = new RegExp("^(http:\/\/www.|https:\/\/www.|ftp:\/\/www.|www.|http:\/\/|https:\/\/){1}([0-9A-Za-z]+\.)");
            return urlregex.test(url);
        },

        insertImage: function() {

            var button = 'tszf-insert-image',
                container = 'tszf-insert-image-container';
            if ( !$('#' + button).length) {
                return;
            };

            var imageUploader = new plupload.Uploader({
                runtimes: 'html5,html4',
                browse_button: button,
                container: container,
                multipart: true,
                multipart_params: {
                    action: 'tszf_insert_image',
                    form_id: $( '#' + button ).data('form_id')
                },
                multiple_queues: false,
                multi_selection: false,
                urlstream_upload: true,
                file_data_name: 'tszf_file',
                max_file_size: '2mb',
                url: tszf_frontend_upload.plupload.url,
                flash_swf_url: tszf_frontend_upload.flash_swf_url,
                filters: [{
                    title: 'Allowed Files',
                    extensions: 'jpg,jpeg,gif,png,bmp'
                }]
            });

            imageUploader.bind('Init', function(up, params) {
                // console.log("Current runtime environment: " + params.runtime);
            });

            imageUploader.bind('FilesAdded', function(up, files) {
                var $container = $('#' + container);

                $.each(files, function(i, file) {
                    $container.append(
                        '<div class="upload-item" id="' + file.id + '"><div class="progress progress-striped active"><div class="bar"></div></div></div>');
                });

                up.refresh();
                up.start();
            });

            imageUploader.bind('QueueChanged', function (uploader) {
                imageUploader.start();
            });

            imageUploader.bind('UploadProgress', function(up, file) {
                var item = $('#' + file.id);

                $('.bar', item).css({ width: file.percent + '%' });
                $('.percent', item).html( file.percent + '%' );
            });

            imageUploader.bind('Error', function(up, error) {
                alert('Error #' + error.code + ': ' + error.message);
            });

            imageUploader.bind('FileUploaded', function(up, file, response) {

                $('#' + file.id).remove();

                if(response.response !== 'error' ) {
                    var success = false;

                    if ( typeof tinyMCE !== 'undefined' ) {

                        if ( typeof tinyMCE.execInstanceCommand !== 'function' ) {
                            // tinyMCE 4.x
                            tinyMCE.get('post_content').insertContent(response.response);
                        } else {
                            // tinyMCE 3.x
                            tinyMCE.execInstanceCommand('post_content', 'mceInsertContent', false, response.response);
                        }
                    }

                    // insert failed to the edit, perhaps insert into textarea
                    var post_content = $('#post_content');
                    post_content.val( post_content.val() + response.response );

                } else {
                    alert('Something went wrong');
                }
            });

            imageUploader.init();
        },

        deleteAvatar: function(e) {
            e.preventDefault();

            if ( confirm( $(this).data('confirm') ) ) {
                $.post(tszf_frontend.ajaxurl, {action: 'tszf_delete_avatar', _wpnonce: tszf_frontend.nonce}, function() {
                    window.location.reload();
                });
            }
        },

        showWaitingSpinner: function() {
            $('.tszf-form-add-screen').width($(document).width());
            $('.tszf-form-add-screen').height($(document).height());

            $('.tszf-form-add-screen').show();
            $('.form-waiting-spinner').show();
        },

        hideSpinner: function() {
            $('.tszf-form-add-screen').hide();
            $('.form-waiting-spinner').hide();
        }
    };

    $(function() {
        TSZF_User_Frontend.init();
        TSZF_User_Frontend.insertImage();

        // payment gateway selection
        $('ul.tszf-payment-gateways').on('click', 'input[type=radio]', function(e) {
            $('.tszf-payment-instruction').slideUp(250);

            $(this).parents('li').find('.tszf-payment-instruction').slideDown(250);
        });

        if( !$('ul.tszf-payment-gateways li').find('input[type=radio]').is(':checked') ) {
            $('ul.tszf-payment-gateways li').first().find('input[type=radio]').click()
        } else {
            var el = $('ul.tszf-payment-gateways li').find('input[type=radio]:checked');
            el.parents('li').find('.tszf-payment-instruction').slideDown(250);
        }
    });
    $(window).on('load', function(){
        if ( jQuery('.add-new-page:not(.editing)').length > 0 ) {
            var url = tszf_frontend.construkted_api_url + "/task/all";

            var apiUrlsObject = tszf_frontend.construkted_api_urls;

            var apiUrls = [];

            for(const key in apiUrlsObject){
                var apiUrl = apiUrlsObject[key];

                apiUrls.push(apiUrl);
            }

            if(apiUrls.length === 0){
                jQuery('.add-new-page > .container').html('<div class="upload-notification"><i class="icon-attention"></i> Can not find any api url <button onClick="window.history.back()">Back</button></div>');
                return;
            }

            var checkedUrlCount = 0;
            var foundAnyValidAPIUrl = false;

            apiUrls.forEach(function (value) {
                var url = value + "/task/all";

                $.ajax({
                    url : url,
                    type : 'get',
                    data : {
                    },
                    timeout: 8000,
                    success: function(xhr, status, error) {
                        checkedUrlCount++;

                        if(foundAnyValidAPIUrl)
                            return;

                        jQuery('.api-verify').hide();
                        jQuery('.add-new-contents').removeClass('hidden');

                        foundAnyValidAPIUrl = true;

                        firstFoundValidAPIUrl = url;
                    },
                    error: function(xhr, status, error) {
                        checkedUrlCount++;

                        if(foundAnyValidAPIUrl)
                            return;

                        if(checkedUrlCount === apiUrls.length)
                            jQuery('.add-new-page > .container').html('<div class="upload-notification"><i class="icon-attention"></i> The processing server is currently down. Please return back later. <button onClick="window.history.back()">Back</button></div>');
                    }
                });
            });
        }
    });

})(jQuery);