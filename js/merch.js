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
	//console.log(colourWidth);
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


(function() {
	// inital header height setup
	setHeaderHeight();
	setUpColourBoxes();
	
	$(window).resize(resizeColourBoxes);

	// register header resize handler to window resize event
	$(window).resize(setHeaderHeight);

	/* Handler for opening product popup upon clicking on a product image */
	$(".products img").click(function() {
		$("#popup-container .product, #page-cover").show();
		var offset = Math.floor($(".products").offset().top);
		$("#popup-container").css("top", offset + "px");

		$("html, body").animate({
			scrollTop: $("#popup-container").offset().top
		}, 1000);
	});
		
	/* Handler for closing product popup container */
	$(".page-close.product-popup").click(function(e) {
		e.preventDefault();
		$("#popup-container .product, #page-cover").hide();
	});	

	/* Handler for closing form popup container */
	$(".page-close.contact-form").click(function(e) {
		e.preventDefault();
		$("#popup-container #contact-form-container, #page-cover").hide();
	});	

	/* Handler form opening contact form */
	$(".contact-us a, .product-contact a, a.contact-us").click(function(e) {
		e.preventDefault();
		$("#popup-container .product, #page-cover").hide();
		$("#popup-container #contact-form-container, #page-cover").show();
		var offset = Math.floor($(".products").offset().top);
		$("#popup-container").css("top", offset + "px");

		$("html, body").animate({
			scrollTop: $("#popup-container").offset().top
		}, 1000);
	});

	/* Scroll to content by clicking on the arrow in header */
	$(".scroll-arrow").click(function() {
		$("html, body").animate({
			scrollTop: $(".we-offer").offset().top
		}, 1000);
	});

	/* Handler for closing form popup container */
	$("#form-submit-success .page-close").click(function(e) {
		e.preventDefault();
		$("#popup-container #form-submit-success, #page-cover").hide();
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