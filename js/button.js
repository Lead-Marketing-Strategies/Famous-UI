(function ($, window, FamousUI) {
  FamousUI.button = {
    loading: (target, direction) => {

        if(direction == "stop"){
          FamousUI.button.stopLoading(target);
        } else {
          FamousUI.button.startLoading(target);
        }

    },
    startLoading: (target) => {
      if(target.hasClass("fui-btn") && target.find(".fui-spinner-border").length < 1){
        target.addClass("loading");
        let content = target.html();
        target.data("original", content);
        let spinner = $("<span>");
        spinner.addClass("fui-spinner-border fui-spinner-border-sm");
        spinner.attr({"role":"status", "aria-hidden":"true"});
        let loadingContent = $("<span>");
        loadingContent.text("Loading...")
        target.html("").append(spinner).append(loadingContent);
      }
    },
    stopLoading: (target) => {
      if(target.hasClass("fui-btn") && target.find(".fui-spinner-border").length > 0){
        target.removeClass("loading");
        let originalContent = target.data("original");
        if(!originalContent){ originalContent = "Submit"; }
        target.html("").append(originalContent);
      }
    },
    init: () => {
      $.fn.FUIButton = function () {
        let target = $(this);

        let loading = (direction = "start") => {
          FamousUI.button.loading(target, direction);
        }

        return {
          loading: loading
        }

      };
    }
  };
  FamousUI.button.init();
}(jQuery, window, FamousUI));
