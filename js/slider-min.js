var sliderOptions = {
    sliderId: "slider",
    effect: "series1",
    effectRandom: false,
    pauseTime: 2600,
    transitionTime: 500,
    slices: 12,
    boxes: 8,
    hoverPause: true,
    autoAdvance: true,
    captionOpacity: 0.3,
    captionEffect: "fade",
    thumbnailsWrapperId: "thumbs",
    m: false,
    license: "mylicense"
};

var imageSlider = new mcImgSlider(sliderOptions);

function mcImgSlider(options) {
    var slider = this;

    var elements = {
        slider: document.getElementById(options.sliderId),
        captions: document.getElementById("mc-caption"),
        captionsBackground: document.getElementById("mc-caption-bg"),
        captionsBackground2: document.getElementById("mc-caption-bg2"),
        thumbnails: document.getElementById(options.thumbnailsWrapperId)
    };

    var state = {
        currentSlide: 0,
        autoPlay: options.autoAdvance,
        transitionInterval: null
    };

    var effects = {
        series1: [6, 8, 15, 2, 5, 14, 13, 3, 7, 4, 14, 1, 13, 15],
        series2: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
    };

    function initialize() {
        setEffect(options.effect);
        setTransitionTime(options.transitionTime);
        createThumbnails();
        setupEvents();
        if (options.autoAdvance) {
            startAutoPlay();
        }
    }

    function setEffect(effect) {
        if (effects[effect]) {
            options.effect = effect;
            options.effectRandom = false;
            options.slices = effects[effect].length;
        } else {
            var effectArray = effect.split(/\W+/);
            if (effectArray.length > 1) {
                options.effect = effectArray;
                options.slices = effectArray.length;
                options.effectRandom = true;
            }
        }
    }

    function setTransitionTime(time) {
        options.transitionTime = time;
    }

    function createThumbnails() {
        if (options.thumbnailsWrapperId) {
            elements.thumbnails = document.getElementById(options.thumbnailsWrapperId);

            var thumbnails = [];
            for (var i = 0; i < options.slices; i++) {
                thumbnails.push('<div rel="' + i + '"></div>');
            }
            elements.thumbnails.innerHTML = thumbnails.join("");
        }
    }

    function setupEvents() {
        if (elements.thumbnails) {
            var thumbnailLinks = elements.thumbnails.getElementsByTagName("div");
            for (var i = 0; i < thumbnailLinks.length; i++) {
                thumbnailLinks[i].onclick = function () {
                    slider.displaySlide(parseInt(this.getAttribute("rel")));
                };
            }
        }

        elements.slider.onmouseover = function () {
            if (state.autoPlay) {
                state.autoPlay = false;
                clearTimeout(state.transitionInterval);
            }
        };

        elements.slider.onmouseout = function () {
            if (!state.autoPlay) {
                state.autoPlay = true;
                startAutoPlay();
            }
        };
    }

    function startAutoPlay() {
        if (options.autoAdvance) {
            state.transitionInterval = setTimeout(function () {
                slider.displaySlide(state.currentSlide + 1);
            }, options.pauseTime);
        }
    }

    this.displaySlide = function (slideIndex) {
        if (slideIndex == state.currentSlide) return;

        if (state.autoPlay) {
            clearTimeout(state.transitionInterval);
        }

        elements.slider.style.background = 'url("' + elements.sliderImages[slideIndex].getAttribute("src") + '") no-repeat';
        Y(0);

        var nextCaption = elements.sliderImages[slideIndex].getAttribute("alt");
        elements.captions.innerHTML = nextCaption;

        if (options.captionEffect == "fade") {
            captionsFadeIn();
        }

        if (options.thumbnailsWrapperId) {
            Y(slideIndex);
        }

        state.currentSlide = slideIndex;

        if (state.autoPlay) {
            startAutoPlay();
        }
    };

    this.next = function () {
        this.displaySlide(state.currentSlide + 1);
    };

    this.previous = function () {
        this.displaySlide(state.currentSlide - 1);
    };

    this.getAuto = function () {
        return state.autoPlay;
    };

    this.thumbnailPreview = function (slideIndex) {
        if (elements.thumbnails) {
            elements.thumbnails.onmouseover = function () {
                tooltip.pop(this, slideIndex);
            };
        }
    };

    this.switchAuto = function () {
        if (state.autoPlay) {
            state.autoPlay = false;
            clearTimeout(state.transitionInterval);
        } else {
            state.autoPlay = true;
            startAutoPlay();
        }
    };

    function captionsFadeIn() {
        elements.captions.style.opacity = 0;
        elements.captions.style.filter = "alpha(opacity=0)";
        elements.captionsBackground.style.opacity = 0;
        elements.captionsBackground.style.filter = "alpha(opacity=0)";
        elements.captionsBackground2.style.opacity = 0;
        elements.captionsBackground2.style.filter = "alpha(opacity=0)";

        var s = 0;
        fade();

        function fade() {
            if (s < 21) {
                elements.captions.style.opacity = s * 0.05;
                elements.captions.style.filter = "alpha(opacity=" + s * 5 + ")";
                if (options.captionEffect) {
                    elements.captionsBackground.style.opacity = s * 0.05;
                    elements.captionsBackground.style.filter = "alpha(opacity=" + s * 5 + ")";
                    elements.captionsBackground2.style.opacity = s * 0.05;
                    elements.captionsBackground2.style.filter = "alpha(opacity=" + s * 5 + ")";
                }
                s++;
                setTimeout(fade, options.transitionTime / 20);
            }
        }
    }

    initialize();
}
