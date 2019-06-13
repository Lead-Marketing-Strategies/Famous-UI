(function ($, window, FamousUI) {
  FamousUI.carousel = {
    init: () => {

      $(".fui-carousel").each(function(){
        var carousel = $(this);
        var slides = carousel.find(".fui-carousel-track > .fui-carousel-item");
        var total_slides = slides.length;
        var indicators =  carousel.find(".fui-carousel-indicators");
        var indicate = carousel.hasClass("fui-carousel-indicate");

        if(indicators.length < 1 && indicate){
          indicators = $("<div>").addClass("fui-carousel-indicators");
          carousel.prepend(indicators);
        }

        carousel.attr("data-index", 0);

        slides.each(function(){
          var slide = $(this);
          slide.attr("data-index", slide.index());
          indicators.append($("<div>").addClass("fui-carousel-indicator"));
        });

        indicators.children().first().addClass("fui-carousel-indicator-active");

        FamousUI.carousel.autoPlay(carousel);

        carousel.find(".fui-carousel-arrow-left.fui-carousel-arrow").click(function(){
          var index = carousel.data("index");
          FamousUI.carousel.setIndex(carousel, index-1);
          FamousUI.carousel.autoPlay(carousel);
        });

        carousel.find(".fui-carousel-arrow-right.fui-carousel-arrow").click(function(){
          var index = carousel.data("index");
          FamousUI.carousel.setIndex(carousel, index+1);
          FamousUI.carousel.autoPlay(carousel);
        });

        carousel.find(".fui-carousel-indicators .fui-carousel-indicator").click(function(){
          var index = $(this).index();
          FamousUI.carousel.setIndex(carousel, index);
          FamousUI.carousel.autoPlay(carousel);
        });


      });
    },
    setIndex: (carousel, index) => {

    var indicators =  carousel.find(".fui-carousel-indicators");
    var content = carousel.find(".fui-carousel-track");
    var slides = carousel.find(".fui-carousel-track > .fui-carousel-item");
    var total_slides = slides.length;

    if (index > total_slides-1) {
      index = 0;

    } else if (index < 0) {
      index = total_slides-1;
    }

    carousel.data("index", index);

    content.css({
      "transform": "translateX(" + (-index * content.width()) + "px)"
    });

      indicators.find(".fui-carousel-indicator").removeClass("fui-carousel-indicator-active");

    var active = indicators.find(".fui-carousel-indicator").eq(index);
    if(active.length){
      active.addClass("fui-carousel-indicator-active");
    }
  },
  autoPlay: (carousel) => {
    var auto_play = carousel.hasClass("fui-carousel-auto");
    var intervalimer = carousel.data("intervalTimer");
    clearInterval(intervalimer);
    if(auto_play){
      var newInterval = setInterval(function(){
        var index = carousel.data("index");
        FamousUI.carousel.setIndex(carousel, index+1);
      }, 5000);
      carousel.data("intervalTimer", newInterval);
    }
  }
  };
  FamousUI.carousel.init();
}(jQuery, window, FamousUI));
