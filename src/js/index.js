import $ from 'jquery'

$(function () {
  //for ie 11
  svg4everybody()

  // page scroll blocker
  var addDocumentScrollBlocker = function () {
    document.body.classList.add('scroll-page-locked')
  }

  var removeDocumentScrollBlocker = function () {
    document.body.classList.remove('scroll-page-locked')
  }

  // open mobile menu
  $('.burger-menu').on('click', function () {
    $('body').toggleClass('menu_opened')

    if ($('body').hasClass('menu_opened')) {
      addDocumentScrollBlocker()
    } else {
      removeDocumentScrollBlocker()
    }
  })

  // calc checked
  var $inputVal = $('.m-calc-rc-field input')
  $('.m-calc-result').css('display', 'flex').hide()
  $('.m-calc-row-controls .btn').on('click', function () {
    // if $inputVal.value valid => $('.m-calc-result').fadeIn()
    $('.m-calc-result').fadeIn()
  })

  var $targetNameBl = $('.m-calc-result-logo__tt')
  var $targetImageBl = $('.m-calc-result-logo__img img')

  $('.m-calc-radio-list').on('change', 'input', function (e) {
    var name = e.target.value
    var imgSrc = $(this).parent().find('img').attr('src')

    $targetNameBl.text(name)
    $targetImageBl.attr('src', imgSrc)

    $(this)
      .parent()
      .addClass('active')
      .siblings('.m-calc-radio-item')
      .removeClass('active')
  })

  // lang opened
  $('.header-lang__current').on('click', function () {
    $(this).parent().toggleClass('_opened')
    $(this).siblings('.header-lang__dd').fadeToggle(200)
  })

  $(document).bind('click touchstart', function (e) {
    var $clicked = $(e.target)
    if (!$clicked.parents().hasClass('header-lang')) {
      $('.header-lang').removeClass('_opened')
      $('.header-lang__dd').fadeOut(200)
    }
  })

  // faq list
  $('.faq-head').on('click', function () {
    if ($(this).parents('.faq-list').hasClass('_all-opened')) return

    $(this).toggleClass('_opened').parent().find('.faq-body').slideToggle(200)
  })

  // scrollto
  $('a.scrollto').on('click', function () {
    var elementClick = $(this).attr('href')
    var destination = $(elementClick).offset().top
    jQuery('html:not(:animated),body:not(:animated)').animate(
      { scrollTop: destination },
      800
    )
    return false
  })

  // magnific popup
  $('.open-popup-link').magnificPopup({
    type: 'inline',
    midClick: true,
    mainClass: 'mfp-zoom',
    removalDelay: 300,
    cursor: null,
    callbacks: {
      open: function () {
        addDocumentScrollBlocker()
        $('.mfp-close').html(
          '<svg class="icon icon-close"><use xlink:href="assets/img/sprite.svg#close"></use></svg>'
        )
      },
      close: function () {
        removeDocumentScrollBlocker()
      },
    },
  })

  if ($(window).width() < 740) {
    $('.tiles-mobile-carousel').owlCarousel({
      loop: false,
      dots: false,
      nav: false,
      autoWidth: true,
      margin: 4,
    })
  }
})
