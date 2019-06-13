(function ($, window, FamousUI) {
  FamousUI.sideDownNavbar = {
    elem: $('.navbar .menu-box'),
    toggler: $('.navbar .toggler'),
    id: null,
    menu: () => {
      let $width = $(window).width();

      $('.navbar').each(function () {
        let $toggleWidth = $(this).attr('data-toggle');
        if ($toggleWidth !== undefined) {
          if ($toggleWidth !== 'null' || $toggleWidth === 'none') {
            if ($width > $toggleWidth) {
               $('.menu-box').css('max-height', '');
              $(this).find('.menu-box').removeClass('slidedown toggled');
            } else {
              $('.menu-box').css('max-height', 0);
              $(this).find('.menu-box').addClass('slidedown');
              FamousUI.sideDownNavbar.elem.each(function (e) {
                const elemHeight = $(FamousUI.sideDownNavbar.elem)[e].scrollHeight;
                $(this).attr('data-height', elemHeight);
              });
            }
          }
        }
      });
    },

    onResize: () => {
      $(window).on('resize', function () {
        FamousUI.sideDownNavbar.menu();
      });
    },
    responsive: () => {
      $('.navbar').each(function () {

        if ($(this).hasClass('expand-sm')) {
          $(this).attr('data-toggle', FamousUI.breakPoints.sm);
        } else if ($(this).hasClass('expand-md')) {
          $(this).attr('data-toggle', FamousUI.breakPoints.md);
        } else if ($(this).hasClass('expand-lg')) {
          $(this).attr('data-toggle', FamousUI.breakPoints.lg);
        } else if ($(this).hasClass('expand-xl')) {
          $(this).attr('data-toggle', FamousUI.breakPoints.xl);
        } else if ($(this).hasClass('expanded')) {
          $(this).attr('data-toggle', 'null');
        } else {
          $(this).attr('data-toggle', 'none');
        }
        FamousUI.sideDownNavbar.menu();

      });
    },

    init: () => {
      FamousUI.sideDownNavbar.responsive();
      FamousUI.sideDownNavbar.onResize();

      // TOGGLER CLICK
      FamousUI.sideDownNavbar.toggler.on('click', function () {
        var elemId = $(this).attr('data-nav');
        $(elemId).toggleClass('toggled');
        var elemHeight = parseFloat($(elemId).attr('data-height'));
        $(elemId).css('max-height', elemHeight + "px");
        if (parseFloat($(elemId).css('max-height'))) {
          $(elemId).css('max-height', 0);
        } else {
          $(elemId).css('max-height', elemHeight + "px");
        }
      });
    }
  };

  FamousUI.sideDownNavbar.init();
}(jQuery, window, FamousUI));
