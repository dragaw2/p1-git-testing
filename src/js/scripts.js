$('document').ready(function(){
	//налаштування Fancybox
	
	$(".fancybox").fancybox({
		helpers: {
			overlay: {
				locked: false
			}
		},
		openEffect	: 'none',
		closeEffect	: 'none',
		padding: 0
	});

	$(".fancy-video").fancybox({
		'width'				: '90%',
		'height'			: '90%',
        'autoScale'     	: false,
        'transitionIn'		: 'none',
		'transitionOut'		: 'none',
		padding: 0,
		'type'				: 'iframe'
	});
	
	//налаштування модалок
	
	$('.modal-show-btn').fancybox({
		autoSize: true,
		type: 'inline',
		closeBtn: true,
		padding: 0,
		scrolling: 'visible',
		fixed: false,
		autoCenter: false,
		beforeShow: function() {
				$('input').removeClass('error');
				$('input[type="text"]').val('');
				$('textarea').val('');
				$(".fancybox-skin").css("background-color", "transparent");
		},
		afterShow: function(){

		},
		beforeClose: function(){

		},
		afterClose: function() {

		}
	});
	
	$('.modal-close-btn').click(function() {
		$.fancybox.close();
		return false;
	});
	
	// налаштування скролу за якорями	

	$('.go_to').click( function(){
		var scroll_el = $(this).attr('href');
		if ($(scroll_el).length != 0) {			
			$('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 800);
		}
    return false;
	});

	//налаштування слайдерів

	$('.reviews-slider').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		arrows: false,
		autoplay: false,
		dots: true,
		prevArrow: ".prev",
		nextArrow: ".next",
		responsive: [{
			breakpoint: 999,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1,
				infinite: true,
				dots: true,
				autoplay: false,
			}
		}]
	});

	// налаштування мобильного меню

	$('.menu-toggle').click(function(){
		$('.mobile-menu').toggleClass('active');
		$(this).toggleClass('active');
		$('body').toggleClass('no-scroll');
	});

});
