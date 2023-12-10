document.addEventListener("DOMContentLoaded", function() {
    var sliderContainer = document.getElementById("slider");
    var images = sliderContainer.getElementsByClassName("slider-image");

    var dotContainer = document.querySelector(".dot-container");

    var currentIndex = 0;

    function showImage(index) {
        images[currentIndex].style.display = "none";
        currentIndex = index;
        images[currentIndex].style.display = "block";

        // Remove active class from all dots
        for (var i = 0; i < dots.length; i++) {
            dots[i].classList.remove("active");
        }

        // Add active class to the current dot
        dots[currentIndex].classList.add("active");
    }

    function showNextImage() {
        var nextIndex = (currentIndex + 1) % images.length;
        showImage(nextIndex);
    }

    // Create dots based on the number of images
    for (var i = 0; i < images.length; i++) {
        var dot = document.createElement("span");
        dot.className = "dot";
        dotContainer.appendChild(dot);
    }

    // Get all dots after they have been created
    var dots = document.querySelectorAll(".dot");

    // Show the first image and set the first dot as active
    showImage(currentIndex);

    // Add click event listeners to dots
    for (var i = 0; i < dots.length; i++) {
        dots[i].addEventListener("click", function(index) {
            return function() {
                showImage(index);
            };
        }(i));
    }

    // Auto-advance to the next image every 3 seconds
    setInterval(showNextImage, 3000);
});
