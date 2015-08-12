
// toggle navigation movement and move/hide element that interfere with it
function toggleNav() {
	$("header").toggleClass("in");
	$("nav").toggleClass("offcanvas");
	$(".loading-bar").toggle();
};

(function() {

	/* Hide dummies for image hover blink avoidance */
	$("#dummies").hide();

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
	$("#nav-link-about, #qoute-link-about").click(function(e) {
		// prevent default anchor click behavior
		e.preventDefault();

		// scroll top
		$("html, body").animate({
			scrollTop: 0
		}, 1000);

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
		/* 
			Na malych displejich se musi prodlouzit hlavni cast stranky tak, 
			aby formular neprekryval paticku.
		*/
		if (parseInt($(window).width()) <= 440) {
			$("#footer-info-container").toggleClass("mobile-expand");
		}

		$("#contact-form-container").toggle();

		$("html, body").animate({
			scrollTop: $("#contact-form-container").offset().top
		}, 1000);
	});

	$(".page-close.contact-form").click(function(e) {
		e.preventDefault();
		/* 
			Vraceni vysky hlavni casti stranky do puvodni hodnoty.
		*/
		if (parseInt($(window).width()) <= 440) {
			$("#footer-info-container").toggleClass("mobile-expand");
		}
		$(this).closest("section").toggle();
	});

	/* Odeslani formulare a zobrazeni podekovani */
	$("#contact-form input[type='submit']").click(function(e) {
		e.preventDefault();
		/* TODO odeslani formulare
		$.post("url", $(this).closest("form").serialize(), function(data) {
			// Zobrazit podekovani
		});
		*/
		$("#contact-form-container").toggle();
		$("#form-submit-success").toggle();
	});

	/* Scroll na top pro talicitko u zobrazeni podekovani */
	$("#form-submit-success a.return").click(function(e) {
		e.preventDefault();
		$("#form-submit-success").toggle();
		/* 
			Vraceni vysky hlavni casti stranky do puvodni hodnoty.
		*/
		if (parseInt($(window).width()) <= 440) {
			$("#footer-info-container").toggleClass("mobile-expand");
		}
		$("html, body").animate({
			scrollTop: $("header").offset().top
		}, 1000);
	});
})();

