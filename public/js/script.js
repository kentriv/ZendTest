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






















