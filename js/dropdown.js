(function ($, window, FamousUI) {
  FamousUI.dropdown = {
    elem: $('.fui-dropdown'),
    init: () => {
      $('.fui-dropdown > a').on('click', function (e) {
        e.preventDefault();
      })

      FamousUI.dropdown.elem.on('click', function (event) {
        event.stopPropagation();
        $(this).siblings('.fui-dropdown').removeClass('menu-showing');
        $(this).toggleClass('menu-showing');
      });

      FamousUI.dropdown.elem.on('mouseleave', function (event) {
        event.stopPropagation();
        $(this).removeClass('menu-showing');
      });

      FamousUI.body.on('click', function (e) {
        if (!$(e.target).is('.fui-dropdown')) {
          $('.fui-dropdown').removeClass('menu-showing');
        }
      });
    }
  };
  FamousUI.dropdown.init();
}(jQuery, window, FamousUI));
