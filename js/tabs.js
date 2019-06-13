(function ($, window, FamousUI) {
  FamousUI.tabs = {
    init: () => {
      $('.fui-tab-link').on('click', function () {
        const $target = $(this).attr('data-tab');
        const $mainParent = $(this).closest('.fui-tabs');

        $mainParent.find('.fui-tab-nav .fui-tab-link').removeClass('active');
        $("[data-tab='" + $target + "']").addClass('active');

        $mainParent.find('.fui-tab-content').removeClass('active');
        $('#' + $target).addClass('active');

      });

      // TAB CLOSE
      $('.fui-tab-close').on('click', function () {
        $(this).closest('.fui-tab-content').removeClass('active');
      });
    }
  };
  FamousUI.tabs.init();
}(jQuery, window, FamousUI));
