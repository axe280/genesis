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
