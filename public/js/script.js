/* Author: Sparrow Visual http://sparrowvisual.com/

*/

$(document).ready(function(){
	
	$("#sub-nav").each(function(){
		if ($(this).children().size() < 1) {
			$("#sub-nav-wrapper").remove();
		}
	});
	
	$(".ie7 br.clear, .ie6 br.clear").each(function(){
		$(this).after('<span class="clear"></span>');
		$(this).remove();
	});
	
	$("#secondary-column").each(function(){
		if ($("#primary-column").hasClass("full-width")) {
			$(this).remove();
		} else {
			var secondary_height = $(this).height();
			var primary_height = $("#primary-column").height();
			if (primary_height > secondary_height) {
				$(this).css("height",primary_height+"px");
			}
		}
	});
	
	$("img.zoom").each(function(){
		var classes = $(this).attr("class");
		var title = $(this).attr("alt");
		var img_src = $(this).attr("src");
		$(this).parent().attr("class",classes);
		$(this).parent().attr("rel","prettyPhoto[]");
		$(this).parent().css("background","url("+img_src+") top left no-repeat");
		$(this).parent().attr("title",title);
		$(this).attr("class","");
		$(this).attr("src","images/blank.png");
		$(this).css("background","url(images/zoom_ding.png) bottom right no-repeat");
	});
	
	$("a[rel^='prettyPhoto']").prettyPhoto({
		theme: 'light_square', /* light_rounded / dark_rounded / light_square / dark_square / facebook */
		show_title: false,
		overlay_gallery: false
	});
	

});

//---------------------------

$(function(){
    /* Search Bar active/inactive states */
    $('#main-nav input[type=text]').focus(function() {
        $(this).toggleClass('active');
        $('#main-nav input[type=reset]').toggleClass('active');
    }).blur(function() {
        $(this).toggleClass('active');
        $('#main-nav input[type=reset]').toggleClass('active');
    });
    
});

$(function() {
    $('#id_build_date').datepicker();
    $('#id_purchase_date').datepicker();

    /* Enable any chosen select fields */
    $('.chzn-select').chosen({no_results_text: 'No results matched'});
});

$(function() {
    $('.vehicle-profile').hover(
        function(){
            $(this).find('.vehicle-edit').toggle();
            $(this).find('.vehicle-title a').toggleClass('active');
        }
     );
});

$(document).ready(function(){

	//Hide (Collapse) the toggle containers on load
	$(".hidden").hide(); 

	//Switch the "Open" and "Close" state per click then slide up/down (depending on open/close state)
	$("h2.trigger").click(function(){
		$(this).toggleClass("active").next().slideToggle("slow");
		return false; //Prevent the browser jump to the link anchor
	});

});


$(function(){
    // Custom radio inputs
    $('input').customInput();
    
    // find all "other" inputs and hide the ones that are empty
    $("#vehicle_specs .other input").each(function() {
        if (this.value == '') {
            $(this).parent().hide();
        }
    });

    $("#vehicle_specs span.form-field select").change(function() {
        other_id = '#' + this.id.substring(3) + '_other';
        other = $(other_id);
        if (this.value == 'other') {
            if ($(other).is(':hidden')) {
                $(other).show();
            }
        }
        else {
            $(other).hide(); //slideUp("slow");
        }
    });
});


function copySpecs(name) {
  var fact = '#id_fact_' + name;
  var curr = '#id_curr_' + name;
  var fact_other = 'input#id_fact_' + name + '_other';
  var curr_other = 'input#id_curr_' + name + '_other';
  fact_value = $(fact).val();
  other_value = $(fact_other).val()
  $(curr).val(fact_value);
  $(curr_other).val(other_value);
  $(curr).trigger("liszt:updated");  // notify Chosen
  $(curr).trigger("change");         // notify plain select widget
};

// AJAX validation
$('#vehicle_specs').validate('/vehicles/xhr/validate-specs/',
    {type: 'div',
    fields: ['mileage', 'fact_displacement', 'curr_displacement'],
    event: 'change'
    }
);


jQuery(document).ready(function($) {

//qTips Jquery plugin creates custom tooltips on click or hover. http://craigsworks.com/projects/qtip2/
// Create the tooltips only on document load
$(document).ready(function() {
   // Make sure to only match links with the .reference class and 
   $('.reference[rel]').each(function()
   {
      // We make use of the .each() loop to gain access to each element via the "this" keyword...
      $(this).qtip(
      {
         content: {
            // Set the text to an image HTML string with the correct src URL to the loading image you want to use
            text: '<img class="throbber" src="/projects/qtip/images/throbber.gif" alt="Loading..." />',
            ajax: {
               url: $(this).attr('rel') // Use the rel attribute of each element for the url to load
            },
           
         },
         position: {
            at: 'top center', // Position the tooltip above the link
            my: 'bottom center',
            viewport: $(window), // Keep the tooltip on-screen at all times
            adjust: {
		         x: 0, y: -10
		      },
            effect: false // Disable positioning animation

         },

		 show: {
		 	event: 'click'
		 },
         hide: {
         	event: 'click unfocus'
         },
         width:false,
         height:false,
         style: {
            classes: 'ui-tooltip-rounded ui-tooltip-shadow  ui-tooltip-garagistry no-point'
         }
        
      })
      $(this).click( function() {
      	$(this).toggleClass("focussed");
     	}
      );
	  $(this).focusout( function() {
      	$(this).removeClass("focussed");
     	}
      );
     
   })

   // Make sure it doesn't follow the link when we click it
   .click(function(event) { event.preventDefault(); });
  });
});
		    

