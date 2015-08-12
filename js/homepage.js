
/* toggle navigation movement and move/hide element that interfere with it */
function toggleNav() {
	$("header").toggleClass("in");
	$("nav").toggleClass("offcanvas");
	$(".loading-bar").toggle();
}

/* Displays text popup after form submission */
function displayMessage(type) {
	$("#contact-form-container").toggle();
	if (type == "s") {
		$("#form-submit-success div h2:first-child").text("High five, you've made it.");
		$("#form-submit-success div h2:last-child").text("First step towards success.");
		$("#form-submit-success a.return").text("View portfolio");
	} else {
		$("#form-submit-success div h2:first-child").text("Ooop, an error has occurred.");
		$("#form-submit-success div h2:last-child").text("Please try again later.");
		$("#form-submit-success a.return").text("Go back");
	}
	$("#form-submit-success").toggle();
}

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
		// on smaller displays extend the main section of the page, so the footer is not cut off
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
		// restore the main section of the page to normal height
		if (parseInt($(window).width()) <= 440) {
			$("#footer-info-container").toggleClass("mobile-expand");
		}
		$(this).closest("section").toggle();
	});

	/* Form submission and popup display */
	$("#contact-form input[type='submit']").click(function(e) {
		e.preventDefault();
		var form = $(this).closest("form");

		if (form[0].checkValidity()) {
			// AJAX form submission
			$.post("./scripts/contact_form_submit.php", form.serialize(), function(data) {
				var data = JSON.parse(data);
				if (data.res == "s") {
					// success
					displayMessage("s");
				} else {
					// failure
					displayMessage("f");
				}
			});
		} else {
			// neni validni
			// TODO: zobrazit nejakou indikaci
		}
	});

	/* Scroll to top on link click in text popup after form submission */
	$("#form-submit-success a.return").click(function(e) {
		e.preventDefault();
		$("#form-submit-success").toggle();
		// restore the main section of the page to normal height
		if (parseInt($(window).width()) <= 440) {
			$("#footer-info-container").toggleClass("mobile-expand");
		}
		$("html, body").animate({
			scrollTop: $("header").offset().top
		}, 1000);
	});
})();

