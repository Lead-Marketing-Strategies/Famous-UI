(function ($, window, FamousUI) {
  FamousUI.accordion = {
    init: () => {
      $('.fui-accordion').each(function () {

        if ($(this).hasClass('active')) {
          var panel = $(this).next('.fui-panel');
          $(this).next('.fui-panel').css('max-height', panel[0].scrollHeight + "px");
        }

        $('.fui-accordion').on('click', function () {

          $('.fui-accordion').next('.fui-panel').css('max-height', 0);
          $('.fui-accordion').removeClass('active');

          panel = $(this).next('.fui-panel');
          $(this).addClass('active');
          if (parseFloat($(this).next('.fui-panel').css('max-height'))) {
            $(this).next('.fui-panel').css('max-height', 0);
            $(this).removeClass('active');
          } else {
            $(this).next('.fui-panel').css('max-height', panel[0].scrollHeight + "px");
          }
        });
      });
    }
  };
  FamousUI.accordion.init();
}(jQuery, window, FamousUI));
