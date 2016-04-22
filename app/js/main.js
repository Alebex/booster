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
	$("#navigation, .header__content").on("click","a", function (event) {
		event.preventDefault();
		var id  = $(this).attr('href'),
		top = $(id).offset().top - 141;
		$('body,html').animate({scrollTop: top}, 1500);
	});

});

$(window).resize(function() {
	$('.navigation__wrapper').css({
		'margin-left': ($(document).width() - $('.navigation__wrapper').outerWidth())/2,
	});
});
$(window).resize();

//add class
var $menu = $(".navigation111");
$(window).scroll(function(){
	if ( $(this).scrollTop() > 650 ){
		$menu.addClass("navigation__fix");
	} else if($(this).scrollTop() <= 650 && $menu.hasClass("navigation__fix")) {
		$menu.removeClass("navigation__fix");
	}
});//scroll


