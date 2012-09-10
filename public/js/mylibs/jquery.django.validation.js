/* From django-ajax-validation fork     
 https://github.com/ltvolks/django-ajax-validation

 jQuery ajax validation plugin
 url: URL to POST validation requests
 settings:
    type: table|p|ul|inline|div - The type of rendered errorlist output
    callback: optional callback on successful ajax post. Callback will be called
              with the json response and the wrapped jquery form object. Use
              this to completely customize validation behavior if none of the
              types match the rendered errorlist output
    fields: list of fields which should be validated
    dom: DOM element to bind the validation event
    event: the jquery event that starts validation of `fields`
    form_filter: object containing a mapping of filters to find validation fields
                 in the document
    submitHandler: Receives the form DOM object on submit. Returning true will
                   allow the form to be submitted. Returning false will not.
    ifSuccess: optional callback to be called if there are no validation errors
               called with the json response and wrapped jquery form object
    ifError: optional callback to be called if there are validation errors.
             called with the json response and wrapped jquery form object
             Somewhat redundant w/ callback, except it will always be called
             even if a callback is provided
*/
(function($) {
    function inputs(form) {
        return form.find(":input:visible:not(:button)");
    }
    errorlist_selector = {
        'p': 'ul.errorlist',
        'table': 'tr:has(ul.errorlist)',
        'ul': 'li:has(ul.errorlist)',
        'inline': 'ul.errorlist',
        'div': 'div.errorlist'
    }
    $.fn.validate = function(url, settings) {
        settings = $.extend({
            type: 'table',
            callback: false,
            fields: false,
            dom: this,
            event: 'submit',
            form_filter: {
              '__all__': function(form, key) {return inputs(form).filter(':first').parent()},
              '*': function(form, key) {return inputs(form).filter(':first[id^=id_' + key.replace('__all__', '') + ']').parent()}
            },
            submitHandler: null,
            ifSuccess: null,
            ifError: null
        }, settings);

        return this.each(function() {
            var form = $(this);
            settings.dom.bind(settings.event, function()  {
                var is_valid = false;
                var data = form.serialize();
                if (settings.fields) {
                    data += '&' + $.param({fields: settings.fields}, true);
                }
                $.ajax({
                    async: false,
                    data: data,
                    dataType: 'json',
                    traditional: true,
                    error: function(XHR, textStatus, errorThrown)   {
                        is_valid = true;
                    },
                    success: function(data, textStatus) {
                        is_valid = data.valid;
                        if (!is_valid)    {
                            if (settings.callback)  {
                                settings.callback(data, form);
                            }
                            else    {
                                var get_form_error_position = function(key) {
                                    key = key || '__all__';
                                    if (key in settings.form_filter) {
                                      $e = settings.form_filter[key](form, key);
                                    } else {
                                      $e = settings.form_filter['*'](form, key);
                                    }
                                    return $e;
                                };
                                if (settings.type == 'p')    {
                                    form.find('ul.errorlist').remove();
                                    $.each(data.errors, function(key, val)  {
                                        if (key.indexOf('__all__') >= 0)   {
                                            var error = get_form_error_position(key);
                                            if (error.prev().is('ul.errorlist')) {
                                                error.prev().before('<ul class="errorlist all"><li>' + val + '</li></ul>');
                                            }
                                            else    {
                                                error.before('<ul class="errorlist"><li>' + val + '</li></ul>');
                                            }
                                        }
                                        else    {
                                            $('#' + key).parent().before('<ul class="errorlist"><li>' + val + '</li></ul>');
                                        }
                                    });
                                }
                                if (settings.type == 'table')   {
                                    inputs(form).prev('ul.errorlist').remove();
                                    form.find('tr:has(ul.errorlist)').remove();
                                    $.each(data.errors, function(key, val)  {
                                        if (key.indexOf('__all__') >= 0)   {
                                            get_form_error_position(key).parent().before('<tr><td colspan="2"><ul class="errorlist all"><li>' + val + '.</li></ul></td></tr>');
                                        }
                                        else    {
                                            $('#' + key).before('<ul class="errorlist"><li>' + val + '</li></ul>');
                                        }
                                    });
                                }
                                if (settings.type == 'ul')  {
                                    inputs(form).prev().prev('ul.errorlist').remove();
                                    form.find('li:has(ul.errorlist)').remove();
                                    $.each(data.errors, function(key, val)  {
                                        if (key.indexOf('__all__') >= 0)   {
                                            get_form_error_position(key).before('<li><ul class="errorlist all"><li>' + val + '</li></ul></li>');
                                        }
                                        else    {
                                            $('#' + key).prev().before('<ul class="errorlist"><li>' + val + '</li></ul>');
                                        }
                                    });
                                }
                                if (settings.type == 'inline') {
                                    form.find('ul.errorlist').remove();
                                    $.each(data.errors, function(key, val)  {
                                        if (key.indexOf('__all__') >= 0)   {
                                            get_form_error_position(key).before('<ul class="errorlist all"><li>' + val + '</li></ul>');
                                        }
                                        else    {
                                            $('#' + key).before('<ul class="errorlist"><li>' + val + '</li></ul>');
                                        }
                                    });
                                }
                                if (settings.type == 'div') {
                                    // Remove entire errorlist
                                    form.find(errorlist_selector[settings.type]).remove();
                                    $.each(data.errors, function(key, val)  {
                                        if (key.indexOf('__all__') >= 0)   {
                                            get_form_error_position(key).before('<div class="errorlist all"><div class="error">' + val + '</div></div>');
                                        }
                                        else    {
                                            $('#' + key).after('<div class="errorlist"><div class="error">' + val + '</div></div>');
                                        }
                                    });
                                }
                            }
                            
                            if (settings.ifError)
                                settings.ifError(data, form);
                        } else {
                            // No validation errors, remove any remaining errors
                            form.find(errorlist_selector[settings.type]).remove();
                            
                            if (form.find('ul.errorlist').size() == 0) {
                                if (settings.ifSuccess)
                                    settings.ifSuccess(data, form);
                            }
                        }
                    },
                    type: 'POST',
                    url: url
                });
                if (is_valid && settings.submitHandler) {
                    return settings.submitHandler.apply(this);
                }
                return is_valid;
            });
        });
    };
})(jQuery);
