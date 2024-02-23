/*jslint browser */
/*global window */

/**
 * create slideshow from images
 @param  {Element}   slides   The images found in index.html body
 @param  {Number}   slideIndex   The index of a visible slides
 */
let start = null, slideIndex = 1;
const slides = document.getElementsByClassName("slide");
function showSlides(n) {
    "use strict";
    let i;
    if (n > slides.length)
        slideIndex = 1;
    if (n < 1)
        slideIndex = slides.length;
    for (i = 0; i < slides.length; i++)
        slides[i].style.display = "none";
    slides[slideIndex - 1].style.display = "block";
}
//increase and decrease slideIndex number
function plusSlides(n) {
    "use strict";
    showSlides(slideIndex += n);
}
function currentSlide(n) {
    "use strict";
    showSlides(slideIndex === n);
}
//change to random slide on timer, reset timer on click
let timer;
function startSlideTimer() {
    "use strict";
    timer = window.setInterval("plusSlides(n)", 16 * 1000);
}
function stopSlideTimer() {
    "use strict";
    clearInterval(timer);
}
function resetSlideTimer() {
    "use strict";
    stopSlideTimer();
    startSlideTimer();
}
//change first slide faster then slide timer
let slideTimeout;
function startSlideTimeout() {
    "use strict";
    slideTimeout = window.setTimeout(function () {
        plusSlides(1);
        resetSlideTimer();
    }, 8 * 1000);
}
function stopSlideTimeout() {
    "use strict";
    window.clearTimeout(slideTimeout);
}
//swipe command to change slideIndex number
window.addEventListener("touchstart", function (event) {
    "use strict";
    if (event.touches.length === 1) {
        start = event.touches.item(0).clientX;
    } else {
        start = null;
    }
});
window.addEventListener("touchend", function (event) {
    "use strict";
    const offset = 100;
    if (start) {
        let end = event.changedTouches.item(0).clientX;
        if (end > start + offset) {
            return plusSlides(+1) && resetSlideTimer() && stopSlideTimeout();
        }
        if (end < start - offset) {
            return plusSlides(-1) && resetSlideTimer() && stopSlideTimeout();
        }
    }
});
//select random first slide on load
const n = Math.floor(Math.random() * (slides.length - 1 + 1)) + 1;
plusSlides(n);
//start slide timeout on load
startSlideTimeout();
//start random slide timer on load
startSlideTimer();
