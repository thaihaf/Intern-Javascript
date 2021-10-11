let makeSlideshow = (nameSlider) => {
  let slideContainer = $(`${nameSlider}`);
  let slideWrapper = $(`${nameSlider} .slider__wrapper`);
  let arrowLeft = $(`${nameSlider} .slider__arrow-left`);
  let arrowRight = $(`${nameSlider} .slider__arrow-right`);
  let slides = $(`${nameSlider} .slider__slide`);
  let pagings = $(`${nameSlider} .slider__pagination`);
  let slideWidth = slideWrapper.innerWidth();
  const interval = 3000;
  let index = 1;
  let intervalID;

  slideWrapper.append(slides[0].cloneNode(true));
  slideWrapper.prepend(slides[slides.length - 1].cloneNode(true));

  slides = $(`${nameSlider} .slider__slide`);
  tranformSlide(index, "none");

  // Slide Handler
  function tranformSlide(indexValue, transValue) {
    // Handler Transform
    index = indexValue;
    slides.css({
      transition: `${transValue}`,
      transform: `translateX(${-slideWidth * index}px)`,
    });

    // Handle Button Pagings
    pagings.removeClass("active");
    pagings.eq(index - 1).addClass("active");
  }
  const startSlide = (val) => {
    tranformSlide(index + val, "all 0.7s ease");

    // Handler First and Last Slide
    setTimeout(() => {
      if (index >= slides.length - 1) {
        tranformSlide(1, "none");
      } else if (index <= 0) {
        tranformSlide(slides.length - 2, "none");
      }
    }, 700);
  };
  function sliderLoop(num) {
    intervalID = setInterval(() => {
      startSlide(num);
    }, interval);
  }
  // User Event
  arrowLeft.click(() => {
    startSlide(-1);
  });
  arrowRight.click(() => {
    startSlide(1);
  });
  // Stop and Restart Loop
  slideContainer.click(function (e) {
    clearInterval(intervalID);
  });
  slideContainer.dblclick(function () {
    startSlide(1);
    sliderLoop(1);
  });
  pagings.click(function (e) {
    tranformSlide(pagings.index($(this)) + 1, "all 0.7s ease");
  });
  sliderLoop(1);
};

makeSlideshow(".slider-main");
makeSlideshow(".ad-blockk");
