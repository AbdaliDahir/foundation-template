( function( $ ) {
	'use strict';

	$('.panel-settings .settings-btn').on('click', function(){
		if($(this).hasClass('active')) {
			$(this).removeClass('active');
      $('.panel-settings').removeClass('active');
		}
		else {
			$(this).addClass('active');
      $('.panel-settings').addClass('active');
		}
		return false;
	});

	//colors panel
	$('.panel-settings .color-list').on('click', 'a', function(){
		$(this).closest('.panel-settings').find('a').removeClass('active');
		$(this).addClass('active');

		var color = $(this).attr('data-color');
			if( !$('#color-layout').length ) {
				$('head').append('<link rel="stylesheet" id="color-layout" href="css/colors/'+color+'.css" />');
			} else {
				$('#color-layout').attr('href', 'css/colors/'+color+'.css');
			}
			return false;
	});
  
} )( jQuery );