/* Displays validation warnings */
function displayValidation(data) {
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

/* sets header height to match the viewport height */
function setHeaderHeight() {
	var windowHeight = $(window).innerHeight();
	$("header").css("height", windowHeight + "px");
};

/* Resizes colour boxes to square shape */
function resizeColourBoxes() {
	var colourWidth = $(".product .colour").actual("width");
	$(".product .colour").css("height", colourWidth + "px");
}

/* Sets up colour boxes backgrounds */
function setUpColourBoxes() {
	$(".product .colour").each(function() {
		$(this).css("background-color", $(this).data("colour"));
	});

	resizeColourBoxes();
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

/* Page features initialization */
function pageInit() {
	setHeaderHeight();
	setUpColourBoxes();
}

/* Adjusts popup position on the screen */
function setPopupPosition() {
	var viewportWidth = $(window).innerWidth();
	var viewportHeight = $(window).innerHeight();

	if (viewportWidth <= 490) {
		// for small screens fixed position is disabled
		// display popup pinned to the top of viewport
		var offset = window.scrollY;
	} else if (viewportWidth < 1024 || viewportHeight < 700) {
		// for medium screens pin to the top of the products section
		var offset = $(".products").offset().top;
		$("html, body").animate({
			scrollTop: $(".products").offset().top
		}, 1000);
	} else {
		// for larger screens fixed position is enabled
		// display popup 100 px from top of viewport
		var offset = 100;
	}
	$("#popup-container").css("top", offset + "px");
}

/* Hides popup */
function closePopup() {
	$("#popup-container .content, #page-cover").hide();
}

(function() {
	pageInit();
	
	$(window).resize(resizeColourBoxes);
	$(window).resize(setHeaderHeight);

	/* Handler for opening product popup upon clicking on a product image */
	$(".products img").click(function() {
		$("#popup-container .product, #page-cover").show();
		setPopupPosition();
	});

	/* Handler form opening contact form */
	$(".contact-us a, .product-contact a, a.contact-us").click(function(event) {
		event.preventDefault();
		$("#popup-container .product").hide();
		$("#popup-container #contact-form-container, #page-cover").show();

		setPopupPosition();
	});
		
	/* Handler for closing popup container on exit button click*/
	$(".content .page-close").click(function(event) {
		event.preventDefault();
		closePopup();
	});	

	/* If clicked anywhere else but on the popup, close it */
	$("#page-cover, #popup-container").click(function(event) {
		if (!$(event.target).closest(".content").length) {
			closePopup();
		}
	});

	/* Scroll to content by clicking on the arrow in header */
	$(".scroll-arrow").click(function() {
		$("html, body").animate({
			scrollTop: $(".we-offer").offset().top
		}, 1000);
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
})();