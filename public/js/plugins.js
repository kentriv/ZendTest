/* plugins.js

3rdparty libs and jQuery plugins 
*/

// remap jQuery to $
(function($){
/*-------------------------------------------------------------------- 
 * jQuery plugin: customInput()
 * by Maggie Wachs and Scott Jehl, http://www.filamentgroup.com
 * Copyright (c) 2009 Filament Group
 * Dual licensed under the MIT (filamentgroup.com/examples/mit-license.txt) and GPL (filamentgroup.com/examples/gpl-license.txt) licenses.
 * Article: http://www.filamentgroup.com/lab/accessible_custom_designed_checkbox_radio_button_inputs_styled_css_jquery/  
 *
 * Appends a class to each input onHover, onFocus, and onClick
 * Set CSS styles for custom-checkbox and custom-radio
--------------------------------------------------------------------*/

jQuery.fn.customInput = function(){
    $(this).each(function(i){   
        if($(this).is('[type=checkbox],[type=radio]')){
            var input = $(this);

            // get the associated label using the input's id
            var label = $('label[for='+input.attr('id')+']');

            //get type, for classname suffix 
            var inputType = (input.is('[type=checkbox]')) ? 'checkbox' : 'radio';

            // wrap the input + label in a div 
            $('<div class="custom-'+ inputType +'"></div>').insertBefore(input).append(input, label);

            // find all inputs in this set using the shared name attribute
            var allInputs = $('input[name='+input.attr('name')+']');

            // necessary for browsers that don't support the :hover pseudo class on labels
            label.hover(
                function(){ 
                    $(this).addClass('hover'); 
                    if(inputType == 'checkbox' && input.is(':checked')){ 
                        $(this).addClass('checkedHover'); 
                    } 
                },
                function(){ $(this).removeClass('hover checkedHover'); }
            );

            //bind custom event, trigger it, bind click,focus,blur events                   
            input.bind('updateState', function(){   
                if (input.is(':checked')) {
                    if (input.is(':radio')) {               
                        allInputs.each(function(){
                            $('label[for='+$(this).attr('id')+']').removeClass('checked');
                        });     
                    };
                    label.addClass('checked');
                }
                else { label.removeClass('checked checkedHover checkedFocus'); }

            })
            .trigger('updateState')
            .click(function(){ 
                $(this).trigger('updateState'); 
            })
            .focus(function(){ 
                label.addClass('focus'); 
                if(inputType == 'checkbox' && input.is(':checked')){ 
                    $(this).addClass('checkedFocus'); 
                } 
            })
            .blur(function(){ label.removeClass('focus checkedFocus'); });
        }
    });
};
                                   
})(this.jQuery);



// usage: log('inside coolFunc',this,arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function(){
  log.history = log.history || [];   // store logs to an array for reference
  log.history.push(arguments);
  if(this.console){
    console.log( Array.prototype.slice.call(arguments) );
  }
};


// catch all document.write() calls
(function(doc){
  var write = doc.write;
  doc.write = function(q){ 
    log('document.write(): ',arguments); 
    if (/docwriteregexwhitelist/.test(q)) write.apply(doc,arguments);  
  };
})(document);


