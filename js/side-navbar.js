(function ($, window, FamousUI) {
  FamousUI.sideNavbar = {
    toggler: $('.navbar .toggler'),
    id: null,
    sideBar: () => {
      var $width = $(window).width() + 15;
      $('.navbar').each(function () {
        var $toggleWidth = $(this).attr('data-toggle');
        if ($toggleWidth !== undefined) {
          if ($toggleWidth !== 'null' || $toggleWidth === 'none') {
            if ($width >= $toggleWidth) {
              $(this).find('.menu-box').removeClass('sideNavbar toggled');
            } else {
              $(this).find('.menu-box').addClass('sideNavbar');
            }
          }
        }

      });
    },
    onResize: () => {
      $(window).on('resize', function () {
        FamousUI.sideNavbar.sideBar();
      });
    },
    responsive: () => {
      // NAVBAR RESPONSIVE BREAKING POINTS
      $('.navbar').each(function () {
        if ($(this).hasClass('expand-sm')) {
          $(this).attr('data-toggle', breakPoint.sm);
        } else if ($(this).hasClass('expand-md')) {
          $(this).attr('data-toggle', breakPoint.md);
        } else if ($(this).hasClass('expand-lg')) {
          $(this).attr('data-toggle', breakPoint.lg);
        } else if ($(this).hasClass('expand-xl')) {
          $(this).attr('data-toggle', breakPoint.xl);
        } else if ($(this).hasClass('expanded')) {
          $(this).attr('data-toggle', '0');
        } else {
          $(this).attr('data-toggle', 'none');
        }
        FamousUI.sideNavbar.sideBar();
        $(this).find('.container').append('<div class="shadow-fixed"></div>');
        $(this).find('.container-fluid').append('<div class="shadow-fixed"></div>');
      });
    },
    init: () => {
      FamousUI.sideNavbar.responsive();
      FamousUI.sideNavbar.onResize();

      // TOGGLER CLICK
      FamousUI.sideNavbar.toggler.on('click', function () {
        FamousUI.sideNavbar.id = $(this).attr('data-nav');
        FamousUI.body.toggleClass('noScroll');
        $(FamousUI.sideNavbar.id).toggleClass('toggled');
      });

      // MENU CLOSE
      $('.menu-close').on('click', function () {
        FamousUI.body.removeClass('noScroll');
        $(FamousUI.sideNavbar.id).removeClass('toggled');
      });

      // SHADOW CLICK
      $('.navbar .shadow-fixed').click(function (e) {
        if (!$(e.target).is(FamousUI.sideNavbar.id)) {
          FamousUI.body.removeClass('noScroll');
          $(FamousUI.sideNavbar.id).removeClass('toggled');
        }
      });

    }
  };

  FamousUI.sideNavbar.init();
}(jQuery, window, FamousUI));
