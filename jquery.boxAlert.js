// jQuery boxAlert Plugin
//
// Version 1.0
//
// Josimar P. Santana Junior (Jota)
// São Paulo / SP - Brazil
// Bugs or Sugesttions, please contact me at junior-ramone@hotmail.com
//
// Usage:
//		$('#form').boxAlert('You must fill in all fields!', { type: 'error', mode: 'append' });
//
// History:
//		1.00 - Released (01 October 2012)
//
// License:
//		This plugin is licensed under the GNU General Public License: http://www.gnu.org/licenses/gpl.html
//
// Inspirated by:
//		jQuery Alert Dialogs Plugin - Cory S.N. LaViska (http://abeautifulsite.net/notebook/87)
//
(function($){

	// Function that create de messages
	$.fn.boxAlert = function(msg, options){
		// default options 
		var defaults = {
			'type' 		: 'info',		// error, warning, info
			'mode' 		: 'prepend',	// prepend, append, before, after
			'effect' 	: 'fade',		// show or fade
			'duration'  : 'slow',		// slow, normal, fast or a number
			'clear'		: 'true'		// if is true the current messages are removed before insert a new message
		}
		var settings = $.extend( {}, defaults, options );
		
		// local variables
		var root 	  	= ($.browser.msie) ? 'html' : 'body';
		var cssClass  	= '';
		var needScroll 	= false;
		var reference 	= null;
		var content   	= '';
		var topDistance = 0;
		
		msg = msg.replace(/\n/g, '<br />').replace(/<br>/g, '<br />').replace(/<br\/>/g, '<br />');
		if(msg.split('<br />').length <= 1){
			cssClass += ' one-line';
		}

		settings.type = settings.type.toLowerCase();
		if((settings.type == 'error') || (settings.type == 'warning') || (settings.type == 'info')){
			cssClass += ' box-alert-' + settings.type;
		}else{
			cssClass += ' box-alert-info';
		}

		// set the html content of the box
		content = '<div class="box-alert-hidden' + cssClass + '" style="display:none;">' + msg + '</div>';
		
		// clear all current messages 
		if(settings.clear) $.clearBoxAlert();

		// verifying the need of scroll the page
		topDistance = $(this).first().position().top;
		if(settings.mode == 'prepend') topDistance -= 30;		
		if($(window).scrollTop() > topDistance) needScroll = true;
		//alert('top do elemento: ' + topDistance + ' - scrollTop: ' + $(window).scrollTop() + ' - needScroll: ' + needScroll);

		if(needScroll == false){
			return this.each(function(){
				switch(settings.mode){
					case 'prepend':
						$(this).prepend(content);
					break;
					case 'append':
						$(this).append(content);
					break;
					case 'before':
						$(this).before(content);
					break;
					case 'after':
						$(this).after(content);
					break;
				}
				if(settings.effect == 'fade'){
					$('.box-alert-hidden').fadeIn(settings.duration, function(){ $(this).removeClass('box-alert-hidden'); } );
				}else{
					$('.box-alert-hidden').show(settings.duration, function(){ $(this).removeClass('box-alert-hidden'); } );
				}
			});
		}else{
			reference = this;
			$(root).stop().animate({ scrollTop: topDistance}, 'normal', function(){
				return reference.each(function(){
					switch(settings.mode){
						case 'prepend':
							$(this).prepend(content);
						break;
						case 'append':
							$(this).append(content);
						break;
						case 'before':
							$(this).before(content);
						break;
						case 'after':
							$(this).after(content);
						break;
					}
					if(settings.effect == 'fade'){
						$('.box-alert-hidden').fadeIn(settings.duration, function(){ $(this).removeClass('box-alert-hidden'); } );
					}else{
						$('.box-alert-hidden').show(settings.duration, function(){ $(this).removeClass('box-alert-hidden'); } );
					}
				});
			});
		}
	};

	// Public method for clear all messages on page
	$.clearBoxAlert = function(useEffect){
		if(useEffect){
			$('.box-alert-error, .box-alert-warning, .box-alert-info').fadeOut('fast', function(){ $(this).remove(); });
		}else{
			$('.box-alert-error, .box-alert-warning, .box-alert-info').remove();
		}
	};

})(jQuery);