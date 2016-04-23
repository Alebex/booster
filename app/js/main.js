$(document).ready(function() {
	//SlideBar
	(function($) {
		$(document).ready(function() {
			$.slidebars({
				siteClose: true,
				disableOver: 480,
				hideControlClasses: true,
				scrollLock: false
			});
		});
	}) (jQuery);

	var mySlidebars = new $.slidebars();
	$('.header__bars').on('click', function() {
		mySlidebars.slidebars.toggle('left');
	});
	
	//navigation
	$("#navigation, .header__content, .slidebar").on("click","a", function (event) {
		event.preventDefault();
		var id  = $(this).attr('href'),
		top = $(id).offset().top - 0;
		$('body,html').animate({scrollTop: top}, 1500);
	});

	$(".navigation").autoHidingNavbar();

	$('.fancybox').fancybox({
		padding : 0,
		openEffect  : 'elastic',
		closeBtn: false
	});

});

$(window).resize(function() {
	$('.navigation__wrapper').css({
		'margin-left': ($(document).width() - $('.navigation__wrapper').outerWidth())/2,
	});
});
$(window).resize();

//add class
var $menu = $(".navigation");
$(window).scroll(function(){
	if ( $(this).scrollTop() > 650 ){
		$menu.addClass("navigation__bg");
	} else if($(this).scrollTop() <= 650 && $menu.hasClass("navigation__bg")) {
		$menu.removeClass("navigation__bg");
	}
});//scroll

