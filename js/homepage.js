
// toggle navigation movement and move/hide element that interfere with it
function toggleNav() {
	$("header").toggleClass("in");
	$("nav").toggleClass("offcanvas");
	$(".loading-bar").toggle();
};

(function() {
	/* Sliding behaviour of navigation */
	$("#nav-container").click(function() {
		toggleNav();
	});

	/* Sliding behaviour of contact link */
	$("#nav-link-contact").click(function(e) {
		// prevent default anchor click behavior
		e.preventDefault();

		toggleNav();

		// animate
		$("html, body").animate({
			scrollTop: $(this.hash).offset().top
		}, 1000);
	});

	/* Sliding behaviour of home link */
	$("#nav-link-home").click(function(e) {
		// prevent default anchor click behavior
		e.preventDefault();

		toggleNav();

		// animate
		$("html, body").animate({
			scrollTop: 0
		}, 1000);
	});

	/* Sliding behaviour of We Are link */
	$("#nav-link-about").click(function(e) {
		// prevent default anchor click behavior
		e.preventDefault();

		// if about-us section is empty, get the source by AJAX
		if ($("#site-cover-container").is(":empty")){
			$("#site-cover-container").load("about-us.html", function() {

				coverVisible = true;
				setCoverHeight();
				$(this).slideToggle({ duration: 600 });
				
				// register new event for closing link
				$("a.about-us").click(function(e) {
					// prevent default anchor click behavior
					e.preventDefault();
					coverVisible = false;
					setCoverHeight();
					$("#site-cover-container").slideToggle({ duration: 600 });

					// adjust header height in case it was expanded to fit the cover
					setHeaderHeight();
				});
			});
		} else {
			coverVisible = true;
			setCoverHeight();
			$("#site-cover-container").slideToggle({ duration: 600 });
		}
	});

	// SelectBox plugin behaviour, delay amount base on select size
	$("#jquery-select").selectbox({
		onOpen: function() {
			$(".sbHolder").css("background-color", "#F39773");
			$(".sbDisabled").hide();
		},
		onClose: function() {
			$(".sbHolder").delay(220).queue(function(next) {
				$(this).css("background-color", "#B0DED3");
				$(".sbDisabled").show();
				next();
			});

		}
	});

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

	$("#form-toggle-button").click(function() {
		$("#contact-form-container").toggle();

		$("html, body").animate({
			scrollTop: $("#contact-form-container").offset().top
		}, 1000);
	});

	$(".page-close.contact-form").click(function(e) {
		e.preventDefault();
		$("#contact-form-container").toggle();
	});
})();

