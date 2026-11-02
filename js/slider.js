document.addEventListener("DOMContentLoaded", function () {
  var track = document.getElementById("sliderTrack");
  var slides = document.querySelectorAll(".slide");
  var dots = document.querySelectorAll(".dot");
  var current = 0;
  var total = slides.length;

  if (dots.length < total) {
    console.error("ОШИБКА: Точек меньше, чем слайдов!");
    console.log("Слайдов:", total, "Точек:", dots.length);
    return;
  }

  function goTo(index) {
    if (index >= total) index = 0;
    if (index < 0) index = total - 1;
    current = index;

    track.style.transform = "translateX(-" + current * 100 + "%)";
    track.style.transition = "transform 0.5s ease";

    for (var i = 0; i < dots.length; i++) {
      dots[i].classList.remove("active");
    }
    if (dots[current]) {
      dots[current].classList.add("active");
    }

    // console.log('Текущий слайд:', current);
  }

  goTo(0);

  var autoSlide = setInterval(function () {
    goTo(current + 1);
  }, 5000);

  for (var i = 0; i < dots.length; i++) {
    (function (index) {
      dots[index].addEventListener("click", function () {
        clearInterval(autoSlide);
        goTo(index);
        autoSlide = setInterval(function () {
          goTo(current + 1);
        }, 5000);
      });
    })(i);
  }
});
