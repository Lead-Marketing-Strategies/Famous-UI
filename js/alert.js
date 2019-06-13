(function ($, window, FamousUI) {
  FamousUI.alert = {
    init: () => {
      $('.fui-alert .fui-alert-close').on('click', function () {
        var $this = $(this);
        $this.parent('.dismissable').fadeOut('fast', function () {
          $this.parent('.dismissable').remove();
        })
      })
    }
  };
  FamousUI.alert.init();
}(jQuery, window, FamousUI));
