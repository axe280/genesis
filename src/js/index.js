import $ from 'jquery'

$(function () {
  //for ie 11
  svg4everybody()

  // page scroll blocker
  var body = document.body
  var scrollPosition = 0

  var addDocumentScrollBlocker = function () {
    body.classList.add('scroll-page-locked')
    scrollPosition = window.pageYOffset
    body.style.overflow = 'hidden'
    body.style.position = 'fixed'
    body.style.top = `-${scrollPosition}px`
    body.style.width = '100%'
  }

  var removeDocumentScrollBlocker = function () {
    body.classList.remove('scroll-page-locked')
    body.style.removeProperty('overflow')
    body.style.removeProperty('position')
    body.style.removeProperty('top')
    body.style.removeProperty('width')
    window.scrollTo(0, scrollPosition)
  }

  // company select https://designwithpc.com/Plugins/ddSlick#demo
  $('.custom-select').ddslick({
    imagePosition: 'left',
    onSelected: function (data) {
      if (data.selectedIndex !== 0) {
        data.selectedItem.parents('.dd-container').addClass('_selected')
      }
    },
  })

  // select img wrapp
  $('.dd-options .dd-option img').wrap('<span class="select-img-wrap"></span>')

  // open mobile menu
  $('.burger-menu').on('click', function () {
    $('body').toggleClass('menu_opened')

    if ($('body').hasClass('menu_opened')) {
      addDocumentScrollBlocker()
    } else {
      removeDocumentScrollBlocker()
    }
  })

  // copy btn
  var copytext = function (el) {
    var $tmp = $('<input>')
    $('body').append($tmp)
    $tmp.val($(el).val()).select()
    document.execCommand('copy')
    $tmp.remove()
  }

  var copyTimer = null

  $('.copy-link .btn').on('click', function () {
    copytext($(this).parent().find('.field-item__field input'))

    clearTimeout(copyTimer)

    $(this).siblings('.copied-text').fadeIn()

    copyTimer = setTimeout(() => {
      $(this).siblings('.copied-text').fadeOut()
    }, 2000)
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

  // aside filter nav
  $('.h-aside-nav').on('click', 'li:not(.active)', function () {
    $(this).addClass('active').siblings('li').removeClass('active')
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

  // init resize carousel
  var $mobileCarouselHts = null
  var $mobileCarouselStatusList = null

  var initHtsCarousel = function () {
    $mobileCarouselHts = $('.tiles-mobile-carousel').owlCarousel({
      loop: false,
      dots: false,
      nav: false,
      autoWidth: true,
      margin: 4,
    })
  }

  var initStatusListCarousel = function () {
    $mobileCarouselStatusList = $('.status-list').owlCarousel({
      loop: false,
      dots: false,
      nav: true,
      autoHeight: true,
      items: 1,
    })
  }

  var initCarouselResizeHandler = function ($selector, initFunc) {
    if ($selector && $selector.length && $(window).width() >= 740) {
      $selector.trigger('destroy.owl.carousel')
    } else if ($(window).width() < 740) {
      initFunc()
    }
  }

  initCarouselResizeHandler($mobileCarouselHts, initHtsCarousel)
  initCarouselResizeHandler($mobileCarouselStatusList, initStatusListCarousel)

  $(window).on('resize', function () {
    initCarouselResizeHandler($mobileCarouselHts, initHtsCarousel)
    initCarouselResizeHandler($mobileCarouselStatusList, initStatusListCarousel)
  })

  // cabinet
  // switch theme
  $('.header-switch-theme').on('click', 'button:not(.active)', function () {
    var themeName = $(this).data('switchTheme')
    $(this).addClass('active').siblings('button').removeClass('active')
    $('body').attr('data-theme', themeName)
  })

  // fix aside
  var addAsideFixClass = function () {
    if ($(window).scrollTop() > $('.header').outerHeight()) {
      $('.aside-nav').addClass('h-fixed')
    } else {
      $('.aside-nav').removeClass('h-fixed')
    }
  }

  if ($('.aside-nav').length) {
    if ($(window).width() > 740) {
      $(window).on('scroll', addAsideFixClass)
    }
  }

  addAsideFixClass()

  // open aside pan
  $('.aside-nav-tablet-btn__burger, .burger-menu-cabinet').on(
    'click',
    function () {
      $('body').toggleClass('aside-pan_opened')

      if ($('body').hasClass('aside-pan_opened')) {
        addDocumentScrollBlocker()
      } else {
        removeDocumentScrollBlocker()
      }
    }
  )

  // aside career open reasons
  var isReasonBtnOpen = false
  var $reasonCabBtn = $('.cab-c-reasons-line .btn')
  var reasonTextOpen =
    $reasonCabBtn.attr('data-open-text') +
    '<svg class="icon icon-arrow-down"><use xlink:href="assets/img/sprite.svg#arrow-down"></use></svg>'
  var reasonTextClose =
    $reasonCabBtn.attr('data-close-text') +
    '<svg class="icon icon-arrow-down"><use xlink:href="assets/img/sprite.svg#arrow-down"></use></svg>'
  $reasonCabBtn.html(reasonTextOpen)

  $reasonCabBtn.on('click', function () {
    if (isReasonBtnOpen === true) {
      $reasonCabBtn.html(reasonTextOpen)
      isReasonBtnOpen = false
      $(this)
        .parents('.cab-career-reasons')
        .removeClass('_opened')
        .find('.cab-career-reasons-body')
        .slideUp()
    } else {
      $reasonCabBtn.html(reasonTextClose)
      isReasonBtnOpen = true
      $(this)
        .parents('.cab-career-reasons')
        .addClass('_opened')
        .find('.cab-career-reasons-body')
        .slideDown()
    }
  })

  // statuses carousel
  var $statusesCarousel = $('.statuses-carousel').owlCarousel({
    loop: false,
    dots: false,
    nav: true,
    autoWidth: true,
    margin: 0,
    navText: [
      '<svg class="icon icon-arrow-prev"><use xlink:href="assets/img/sprite.svg#arrow-prev"></use></svg>',
      '<svg class="icon icon-arrow-next"><use xlink:href="assets/img/sprite.svg#arrow-next"></use></svg>',
    ],
  })

  if ($statusesCarousel.length) {
    var $currentCarItem = $('.carousel-status._current')

    var showCurrentCarItem = function () {
      var indx = $currentCarItem.parent().index() - 1
      if (indx < 0) {
        indx = 0
      }
      $statusesCarousel.trigger('to.owl.carousel', indx)
    }

    // add class all previous items
    $currentCarItem
      .parent()
      .prevAll()
      .find('.carousel-status')
      .addClass('_prev-current')

    // show current item when resize and start
    $(window).on('resize', showCurrentCarItem)
    showCurrentCarItem()

    // click item
    $('.carousel-status:not(._prev-current)').on(
      'click',
      '.car-st-icon',
      function () {
        // change inner info
        var idx = $(this).parents('.owl-item').index()
        $('.career-ms-details__inner').eq(idx).fadeIn().siblings().hide()

        $('.carousel-status').removeClass('_clicked')

        if ($(window).width() <= 740) {
          var offset = 20
          var destination =
            $('.career-main-status-details').offset().top - offset
          $('html:not(:animated),body:not(:animated)').animate(
            { scrollTop: destination },
            800
          )
        }

        if ($(this).parent().is('._current')) {
          return
        }

        $(this).parent().addClass('_clicked')
      }
    )
  }

  // open mobile data btn
  $('.cabinet-stat-data-mob-btn').on('click', function () {
    $(this).parent().toggleClass('_mob-opened')
    $(this).siblings('.cabinet-stat-data').slideToggle()
  })

  // progress line width
  $('.status-level-progress').each(function () {
    var levelVal = $(this).attr('data-progress-level')
    var itemsVal = $(this).attr('data-progress-items')
    var html = ''

    for (var i = 0; i < itemsVal; i++) {
      if (i < levelVal) {
        html += '<span class="active"></span>'
      } else {
        html += '<span></span>'
      }
    }

    $(this).append(html)
  })

  // pic avatar file
  var oldVal = null

  $('#avaFileBtn').on('change', function () {
    if (!this.value) return

    if (readMaxFileSize(this)) {
      $('.error-file-size').hide()
      readURL(this)
    } else {
      $('.error-file-size').show()
    }
  })

  function readMaxFileSize(input) {
    if (typeof input.files[0] !== 'undefined') {
      var maxSize = parseInt($(input).attr('data-max-bytes-size'), 10),
        size = input.files[0].size
      return maxSize > size
    }
  }

  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader()

      reader.onload = function (e) {
        $('#fileImgTarget img')
          .attr('src', e.target.result)
          .parents('.cabinet-data-photo__img')
          .addClass('_img')
      }

      reader.readAsDataURL(input.files[0])
    }
  }

  // mobile career tabs
  $('.ic-tt-col-about').on('click', '.ic-tt-chart:not(._mob-act)', function () {
    if ($(window).width() < 740) {
      $(this)
        .addClass('_mob-act')
        .siblings('.ic-tt-chart')
        .removeClass('_mob-act')
        .parents('.ic-tt-rows')
        .find('.tiles-list')
        .eq($(this).index())
        .fadeIn()
        .siblings('.tiles-list')
        .hide()
    }
  })
})
