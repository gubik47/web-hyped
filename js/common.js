// is site cover visible
var coverVisible = false;

// sets header height to match the viewport height
function setHeaderHeight() {
	var windowHeight = $(window).innerHeight();
	windowHeight = parseInt(windowHeight) + 15 + "px";
	$("header, .project-background, nav, .project-wrapper, .project-container").css("height", windowHeight);

	// if cover is visible, adjust its height
	if (coverVisible) {
		setCoverHeight();
	}
};

// sets cover height (We are) to match the viewport height
function setCoverHeight() {
	var headerHeight = $("header").height();

	if ($(".qoute").length) {
		var qouteHeight = $(".qoute").height();	
	}

	var newCoverHeight = headerHeight + qouteHeight;

	if (newCoverHeight < 700) {
		newCoverHeight = 700;
		$("header, .project-background, nav, .project-wrapper").css("height", 700 - qouteHeight);
	}

	$(".site-cover").css("height", newCoverHeight + "px");
};

var loadingBar = {
	bar: $(".loading-bar"),

	start: function() {
		this.bar.stop();
		this.bar.css("width", 0);
		this.bar.animate({
			width: "100%"
		}, 6000, "linear", function() {
			$(".rslides_nav.next").click();
		});
	},

	fill: function() {
		this.bar.stop();
		if (this.bar.css("width") != "0px") {
			this.bar.animate({
				width: "100%"
			}, 500, "linear");
		}
		$(this).css("width", 0);
	}
};

(function() {
	// inital header height setup
	setHeaderHeight();

	// register header resize handler to window resize event
	$(window).resize(setHeaderHeight);

	// add slideshow swipe support for touch devices
	$(".rslides").swipe({
		swipeLeft: function() {
			$(".rslides_nav.next").click();
		},

		swipeRight: function() {
			$(".rslides_nav.prev").click();
		}
	});
})();