
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
		$("#form-submit-success a.return").addClass("success");
	} else {
		$("#form-submit-success div h2:first-child").text("Oops, something went wrong.");
		$("#form-submit-success div h2:last-child").text("Please try again later...");
		$("#form-submit-success a.return").text("Go back");
		$("#form-submit-success a.return").removeClass("success");
	}
	$("#form-submit-success").toggle();
}

/* Displays validation warnings */
function displayValidation(data) {
	//console.log(data);
	if (data.error.email === true) {
		$(".validation.email:hidden").css("display", "block");
	}

	if (data.error.name === true) {
		$(".validation.name:hidden").css("display", "block");
	}
}

/* Hides validation warnings */
function hideValidation() {
	$(".validation.name, .validation.email").css("display", "none");
}

function openForm() {
	// on smaller displays extend the main section of the page, so the footer is not cut off
	if (parseInt($(window).width()) <= 440) {
		$("#footer-info-container").toggleClass("mobile-expand");
	}

	$("#contact-form-container").toggle();

	$("html, body").animate({
		scrollTop: $("#contact-form-container").offset().top
	}, 1000);
}

function closeForm(e, element) {
	e.preventDefault();
	// restore the main section of the page to normal height
	if (parseInt($(window).width()) <= 440) {
		$("#footer-info-container").toggleClass("mobile-expand");
	}
	element.closest("section").toggle();
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

		openForm();

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
		openForm();
	});

	$(".page-close.contact-form").click(function(e) {
		closeForm(e, $(this));
	});

	/* Form submission and popup display */
	$("#contact-form input[type='submit']").click(function(e) {
		e.preventDefault();
		var form = $(this).closest("form");

		hideValidation();
		// AJAX form submission
		$.post("./scripts/contact_form_submit.php", form.serialize(), function(data) {
			var data = JSON.parse(data);
			if (data.res == "s") {
				// success
				displayMessage("s");
			} else if (data.res == "form_invalid") {
				// invalid form
				displayValidation(data);
			} else {
				// failure
				displayMessage("f");
			}
		});
	});

	/* Scroll to top on link click in text popup after form submission */
	$("#form-submit-success a.return").click(function(e) {
		e.preventDefault();
		$("#form-submit-success").toggle();
		// scroll to top if form was successfully submitted
		if ($(this).hasClass("success")) {
			// restore the main section of the page to normal height
			if (parseInt($(window).width()) <= 440) {
				$("#footer-info-container").toggleClass("mobile-expand");
			}
			$("html, body").animate({
				scrollTop: $("header").offset().top
			}, 1000);
		} else {
			// go back to form if form was not successfully submitted
			$("#contact-form-container").toggle();
			$("html, body").animate({
				scrollTop: $("#contact-form-container").offset().top
			}, 1000);
		}
	});

	/* Language select toggle on hover */
	$(".language-select").hoverIntent(function() {
		$(".language-select div:last-child").slideToggle();
	});
})();

