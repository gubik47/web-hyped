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

/* Sets height of we offer section to match its contents */
function setWeOfferHeight() {
	$("section.we-offer").css("height", $(".slide.active").innerHeight() + "px");
}

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
	if ($("body").hasClass("cs")) {
		if (type == "s") {
			$("#form-submit-success div h2:first-child").text("High five, zvládli jste to.");
			$("#form-submit-success div h2:last-child").text("První krok k úspěchu.");
			$("#form-submit-success a.return").text("Zobrazit portfolio");
			$("#form-submit-success a.return").addClass("success");
		} else {
			$("#form-submit-success div h2:first-child").text("Oops, něco se pokazilo.");
			$("#form-submit-success div h2:last-child").text("Zkuste to znovu později...");
			$("#form-submit-success a.return").text("Zpět");
			$("#form-submit-success a.return").removeClass("success");
		}
	} else {
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
	}

	$("#form-submit-success").toggle();
}

/* Page features initialization
   Opens product popup if supplied product id hash in URL
*/
function pageInit() {
	setHeaderHeight();
	setUpColourBoxes();

	// find product id hash in URL
	var hashIndex = window.location.href.indexOf("#");
	if (hashIndex != -1) {
		var productId = window.location.href.substring(hashIndex + 1);
		openProductPopup(productId);
	}

	$("section.we-offer").css("height", $(".slide.active").innerHeight() + "px");
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
	//window.location.href = trimUrl();

	// slice off the remaining '#' in HTML5:    
	if (typeof window.history.replaceState == 'function') {
		history.replaceState({}, '', trimUrl());
	}
}

/* Updates product filter with new selected category */
function updateFilter() {
	$(".filter li.cat").removeClass("active");

	var active = $(this).data("cat");
	$(".filter li.cat").each(function() {
		if ($(this).data("cat") === active) {
			$(this).addClass("active");
		}
	});

	filterProducts();
}

/* Filters products based on selected category */
function filterProducts() {
	var category = $(".filter .active").data("cat").toLowerCase();
	if (category == "all") {
		$(".products img").fadeIn();
	} else {
		var categorySelector = ".products ." + category;
		$(".products img").not(categorySelector).fadeOut(function() {
			$(categorySelector).fadeIn();
		});
	}
}

/* Trims URL of all hashes */
function trimUrl() {
	var hashIndex = window.location.href.indexOf("#");
	if (hashIndex != -1) {
		return trimmedUrl = window.location.href.substring(0, hashIndex);
	}
	return "";
}

/* Updates URL with product ID hash at the end */
function updateUrl(productId) {
	var trimmedUrl = trimUrl();
	window.location.href = trimmedUrl + "#" + productId;
}

/* Opens a product popup with specific ID */
function openProductPopup(productId) {
	var product = $("#popup-container .product#" + productId); 
	if (product.length !== 0) {
		product.show();
		$("#page-cover").show();
		setPopupPosition();
		updateUrl(productId);
	} else {
		// slice off the remaining '#' in HTML5:    
		if (typeof window.history.replaceState == "function") {
			history.replaceState({}, "", trimUrl());
		}
	}
}

/* Displays specific slide when clicked on slide counter */
function displaySlide(id, counter) {
	var activeSlide = $(".slide.active");
	var targetSlide = $(".slide.active").siblings(id);

	if (targetSlide.length === 0) {
		return;
	}

	activeSlide.animate({
        left: "100%"
    }, 500, function() {
    	$(this).removeClass("active");
        $(this).css("left", "-100%");

        targetSlide.css("left", "-100%");
        targetSlide.animate({
        	left: "0"
        }, function() {
        	targetSlide.css("left", 0);
        })
        targetSlide.addClass("active");

        var active = $(".slide-counter li.active");
		active.removeClass("active");
		counter.addClass("active");
    });
}

/* Displays previous slide in We offer section */
function prevSlide() {
	$(".slide.active").animate({
        left: "100%"
    }, 500, function() {
    	$(this).removeClass("active");
        $(this).css("left", "-100%");

        var prevSlide = $(this).prev();
        if (prevSlide.length === 0) {
        	prevSlide = $(this).siblings(":last");
        }
        prevSlide.css("left", "-100%");
        prevSlide.animate({
        	left: "0"
        }, function() {
        	prevSlide.css("left", 0);
        })
        prevSlide.addClass("active");

        decCounter();
    });
}

/* Displays next slide in We offer section */
function nextSlide() {
	$(".slide.active").animate({
        left: "-100%"
    }, 500, function() {
    	$(this).removeClass("active");
        $(this).css("left", "100%");

       	var nextSlide = $(this).next();
       	if (nextSlide.length === 0) {
       		nextSlide = $(this).siblings(":first");
       	}
       	nextSlide.css("left", "100%");
	    nextSlide.animate({
	    	left: "0"
	    }, function() {
	    	nextSlide.css("left", "0");
	    });
	    nextSlide.addClass("active");

	    incCounter();
    });
}

/* Moves slide counter to the right */
function incCounter() {
	var active = $(".slide-counter li.active");
	active.removeClass("active");
	if (active.is(":last-child")) {
		$(".slide-counter li:first-child").addClass("active");
	} else {
		active.next().addClass("active");
	}
}

/* Moves slide counter to the left */
function decCounter() {
	var active = $(".slide-counter li.active");
	active.removeClass("active");
	if (active.is(":first-child")) {
		$(".slide-counter li:last-child").addClass("active");
	} else {
		active.prev().addClass("active");
	}
}

(function() {
	pageInit();
	
	$(window).resize(resizeColourBoxes);
	$(window).resize(setHeaderHeight);
	$(window).resize(setWeOfferHeight);

	/* Handler for opening product popup upon clicking on a product image */
	$(".products img").click(function() {
		var productId = $(this).data("id");
		openProductPopup(productId);
	});

	/* Handler form opening contact form */
	$(".contact-us a, .product-contact a, a.contact-us, .realization p").click(function(event) {
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
		$.post("../scripts/contact_form_submit.php", form.serialize(), function(data) {
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

	/* Handler for selecting new category in product filter */
	$(".filter li.cat").click(updateFilter);

	/* Slides functionality */
	$(".arrow-left").click(function(event) {
		event.preventDefault();
		nextSlide();
	});	

	$(".arrow-right").click(function(event) {
		event.preventDefault();
		prevSlide();
	});

	$(".slide-counter li").click(function() {
		displaySlide($(this).data("slide"), $(this));
	});

	/* swipe support for touch devices */
	$("section.we-offer").swipe({
		swipeLeft: function() {
			$(".arrow-left").click();
		},

		swipeRight: function() {
			$(".arrow-right").click();
		}
	});
})();