$(document).ready(function () {
  //   Hide and Show Events
  //   Window Click
  $(window).click(function (e) {
    // Check Hide Language Tab
    if (!e.target.closest(".header__action.language")) {
      let lgHiddenBar = $(".language__hidden");

      if (lgHiddenBar.hasClass("active")) {
        lgHiddenBar.removeClass("active");
        $(".language__arrow").removeClass("active");
      }
    }
  });

  // Show and Hide language
  $(".language__display").click(function (e) {
    $(".language__hidden").toggleClass("active");

    $(".language__arrow").toggleClass("active");
  });

  $(".header .menu__link").click(function (e) {
    $(".menu__link").removeClass("active");
    $(this).addClass("active");
  });

  //   Event
  $(".language__item").click(function (e) {
    let language = this.dataset.id;
    let lgImgMain = $(".language__img-main");
    let currentLanguage = lgImgMain.attr("data-id");

    if (language != currentLanguage) {
      $(".loading-page").addClass("active");
      $(".language__hidden").removeClass("active");
      $(".language__arrow").removeClass("active");

      setTimeout(() => {
        lgImgMain.attr("data-id", language);
        lgImgMain.attr("src", `./images/${language}-flag.png`);
        $(".loading-page").removeClass("active");
      }, 5000);
    }
  });

  // Slide
  let makeSlideshow = (nameSlider) => {
    let slideContainer = $(`${nameSlider}`);
    let slideWrapper = $(`${nameSlider} .slider__wrapper`);
    let arrowLeft = $(`${nameSlider} .slider__arrow-left`);
    let arrowRight = $(`${nameSlider} .slider__arrow-right`);
    let slides = $(`${nameSlider} .slider__slide`);
    let pagings = $(`${nameSlider} .slider__pagination`);
    let slideWidth = slideWrapper.innerWidth();
    const interval = 5000;
    let index = 1;
    let intervalID;

    let firstClone = slides[0].cloneNode(true);
    let lastClone = slides[slides.length - 1].cloneNode(true);
    $(firstClone).addClass('first-clone');
    $(lastClone).addClass('last-clone');
    slideWrapper.append(firstClone);
    slideWrapper.prepend(lastClone);

    slides = $(`${nameSlider} .slider__slide`);
    tranformSlide(index, "none");

    // Slide Handler
    function tranformSlide(indexValue, transValue) {
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
      // Handler Transform
      tranformSlide(index + val, "all 0.7s ease");

      // Handler First and Last Slide
      setTimeout(() => {
        if (slides.eq(index).hasClass("first-clone")) {
          tranformSlide(1, "none");
          // all 0.7s ease
        } else if (slides.eq(index).hasClass("last-clone")) {
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

});
