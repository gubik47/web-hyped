(function() {

	loadingBar.start();
	
	$(".rslides").responsiveSlides({
		auto: false,
		speed: 2000,
		nav: true,
		navContainer: ".project-switch",
		prevText: "",
		nextText: "",
		before: function() {
			loadingBar.fill();
		},
		after: function() {
			loadingBar.start();
		}
	});
})();