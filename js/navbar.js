(function ($, window, FamousUI) {
  FamousUI.navbar = {
    toggler: $('.fui-navbar .fui-toggler'),
    id: null,
    sideBar: () => {
      var $width = $(window).width() + 15;
      $('.fui-navbar').each(function () {
        var $toggleWidth = $(this).attr('data-toggle');
        $toggleWidth = parseInt($toggleWidth);

        if ($toggleWidth !== undefined) {
          if ($toggleWidth !== 'null' || $toggleWidth === 'none') {
            $toggleWidth = parseInt($toggleWidth);
            if ($width >= $toggleWidth) {
              $(this).find('.fui-menu-box').removeClass('sideNavbar toggled');
            } else {
              $(this).find('.fui-menu-box').addClass('sideNavbar');
            }
          }
        }
      });
    },
    onResize: () => {
      $(window).on('resize', function () {
        FamousUI.navbar.sideBar();
      });
    },
    responsive: () => {
      // NAVBAR RESPONSIVE BREAKING POINTS
      $('.fui-navbar').each(function () {
        if ($(this).hasClass('fui-expand-sm')) {
          $(this).attr('data-toggle', FamousUI.breakPoints.sm);
        } else if ($(this).hasClass('fui-expand-md')) {
          $(this).attr('data-toggle', FamousUI.breakPoints.md);
        } else if ($(this).hasClass('fui-expand-lg')) {
          $(this).attr('data-toggle', FamousUI.breakPoints.lg);
        } else if ($(this).hasClass('fui-expand-xl')) {
          $(this).attr('data-toggle', FamousUI.breakPoints.xl);
        } else if ($(this).hasClass('fui-expanded')) {
          $(this).attr('data-toggle', '0');
        } else {
          $(this).attr('data-toggle', 'none');
        }
        FamousUI.navbar.sideBar();
        $(this).find('.fui-container').append('<div class="shadow-fixed"></div>');
        $(this).find('.fui-container-fluid').append('<div class="shadow-fixed"></div>');
      });
    },
    init: () => {
      FamousUI.navbar.responsive();
      FamousUI.navbar.onResize();

      // TOGGLER CLICK
      FamousUI.navbar.toggler.on('click', function () {
        FamousUI.navbar.id = $(this).attr('data-nav');
        FamousUI.body.toggleClass('noScroll');
        $(FamousUI.navbar.id).toggleClass('toggled');
      });

      // MENU CLOSE
      $('.menu-close').on('click', function () {
        FamousUI.body.removeClass('noScroll');
        $(FamousUI.navbar.id).removeClass('toggled');
      });

      // SHADOW CLICK
      $('.fui-navbar .shadow-fixed').click(function (e) {
        if (!$(e.target).is(FamousUI.navbar.id)) {
          FamousUI.body.removeClass('noScroll');
          $(FamousUI.navbar.id).removeClass('toggled');
        }
      });

    }
  };

  FamousUI.navbar.init();
}(jQuery, window, FamousUI));
