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

  $('.menu-close-overlay').on('click', function () {
    $('body').removeClass('menu_opened')
    removeDocumentScrollBlocker()
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
})
