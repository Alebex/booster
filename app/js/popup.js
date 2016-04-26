$(document).ready(function() {

	$('.header__btn').click( function(event) {

		event.preventDefault();

		$('.popup__paranja').fadeIn(400, function(){
				$('.popup__box') 
					.css('display', 'block')
					.animate({opacity: 1}, 200);
		});

	});

	/* Зaкрытие мoдaльнoгo oкнa, тут делaем тo же сaмoе нo в oбрaтнoм пoрядке */
	$('.popup__close, .popup__paranja').click( function() {
		$('.popup__box').animate({
			opacity: 0
			}, 200, function() {
				$(this).css('display', 'none');
				$('.popup__paranja').fadeOut(400);
			}
		);
	});
});