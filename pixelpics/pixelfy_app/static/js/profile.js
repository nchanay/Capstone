// $('#hide-btn').on('click', function(e) {
//   console.log("test")
// });

$('#confirmDelete').on('click', function () {
    pk = $('.is-active img').attr('pk');
    url = `delete/${pk}/`
    $.ajax({
        url: url,
        success: function (data) {
          window.location.href = ''
        },
        fail: function (error) {
          console.log(error);
        }
    });
});

$(function() {
  $('.slider-single').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: false,
    arrows: true,
    fade: false,
    adaptiveHeight: false,
    infinite: true,
    useTransform: true,
    speed: 400,
    cssEase: 'cubic-bezier(0.77, 0, 0.18, 1)',
  });

  $('.slider-nav')
  .on('init', function(event, slick) {
    $('.slider-nav .slick-slide.slick-current').addClass('is-active');
  })
  .slick({
    slidesToShow: 7,
    slidesToScroll: 3,
    dots: false,
    arrows: true,
    focusOnSelect: true,
    infinite: true,
    responsive: [{
      breakpoint: 1024,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5,
      }
    }, {
      breakpoint: 640,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      }
    }, {
      breakpoint: 420,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      }
    }]
  });

  $('.slider-single').on('afterChange', function(event, slick, currentSlide) {
    $('.slider-nav').slick('slickGoTo', currentSlide);
    var currrentNavSlideElem = '.slider-nav .slick-slide[data-slick-index="' + currentSlide + '"]';
    $('.slider-nav .slick-slide.is-active').removeClass('is-active');
    $(currrentNavSlideElem).addClass('is-active');
  });

  $('.slider-nav').on('click', '.slick-slide', function(event) {
    event.preventDefault();
    var goToSingleSlide = $(this).data('slick-index');

    $('.slider-single').slick('slickGoTo', goToSingleSlide);
  });
});
