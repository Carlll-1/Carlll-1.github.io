<<<<<<< HEAD
function castParallax() {

	var opThresh = 350;
	var opFactor = 750;

	window.addEventListener("scroll", function (event) {
		var top = this.pageYOffset;

		var layers = document.getElementsByClassName("parallax");
		var layer, speed, yPos;
		for (var i = 0; i < layers.length; i++) {
			layer = layers[i];
			speed = layer.getAttribute('data-speed');
			var yPos = -(top * speed / 100);
			layer.setAttribute('style', 'transform: translate3d(0px, ' + yPos + 'px, 0px)');
		}
	});
}

function dispelParallax() {
	$("#nonparallax").css('display', 'block');
	$("#parallax").css('display', 'none');
}

function castSmoothScroll() {
	$.srSmoothscroll({
		step: 80,
		speed: 300,
		ease: 'linear'
	});
}

function startSite() {
	var platform = navigator.platform.toLowerCase();
	var userAgent = navigator.userAgent.toLowerCase();

	if (platform.indexOf('ipad') != -1 || platform.indexOf('iphone') != -1) {
		dispelParallax();
	} else if (platform.indexOf('win32') != -1 || platform.indexOf('linux') != -1) {
		castParallax();
		if ($.browser.webkit) {
			castSmoothScroll();
		}
	} else {
		castParallax();
	}
}

=======
function castParallax() {

	var opThresh = 350;
	var opFactor = 750;

	window.addEventListener("scroll", function (event) {
		var top = this.pageYOffset;

		var layers = document.getElementsByClassName("parallax");
		var layer, speed, yPos;
		for (var i = 0; i < layers.length; i++) {
			layer = layers[i];
			speed = layer.getAttribute('data-speed');
			var yPos = -(top * speed / 100);
			layer.setAttribute('style', 'transform: translate3d(0px, ' + yPos + 'px, 0px)');
		}
	});
}

function dispelParallax() {
	$("#nonparallax").css('display', 'block');
	$("#parallax").css('display', 'none');
}

function castSmoothScroll() {
	$.srSmoothscroll({
		step: 80,
		speed: 300,
		ease: 'linear'
	});
}

function startSite() {
	var platform = navigator.platform.toLowerCase();
	var userAgent = navigator.userAgent.toLowerCase();

	if (platform.indexOf('ipad') != -1 || platform.indexOf('iphone') != -1) {
		dispelParallax();
	} else if (platform.indexOf('win32') != -1 || platform.indexOf('linux') != -1) {
		castParallax();
		if ($.browser.webkit) {
			castSmoothScroll();
		}
	} else {
		castParallax();
	}
}

>>>>>>> 3f8b81f1371eac34f1cb68bbf891ff55d832ec44
document.body.onload = startSite();