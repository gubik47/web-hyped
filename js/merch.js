// sets header height to match the viewport height
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

	/* Handler form openening contact form */
	$(".contact-us a, .product-contact a, a.contact-us").click(function(e) {
		e.preventDefault();
		$("#popup-container .product, #page-cover").hide();
		$("#popup-container #contact-form-container, #page-cover").show();
		var offset = Math.floor($(".products").offset().top);
		$("#popup-container").css("top", offset + "px");
	});

	/* Scroll to content by clicking on the arrow in header */
	$(".scroll-arrow").click(function() {
		$("html, body").animate({
			scrollTop: $(".we-offer").offset().top
		}, 1000);
	});
})();