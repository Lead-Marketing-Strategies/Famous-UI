(function ($, window, FamousUI) {
  FamousUI.modal = {
    animateModal: ($modal) => {
      var animate = $modal.find('.fui-modal-container').attr('data-modal-animate');
      if (typeof animate !== typeof undefined && animate !== false) {
        animate = animate.split(',');
        return animate;
      } else {
        $modal.find('.fui-modal-container').addClass('animation-added');
        return ['', ''];
      }
    },
    modalOpen: ($modal) => {
      $modal.removeClass('modal-exit').addClass('modal-show');
      $modal.find('.fui-modal-container').addClass('animated ' + FamousUI.modal.animateModal($modal)[0]);
      FamousUI.body.addClass('noScroll');
      setTimeout(function () {
        $modal.find('.fui-modal-container').removeClass('animated ' + FamousUI.modal.animateModal($modal)[0]);
      }, 1000);
    },
    modalClose: ($modal) => {
      $modal.find('.fui-modal-container').addClass('animated ' + FamousUI.modal.animateModal($modal)[1]);
      if (FamousUI.modal.animateModal($modal)[1] === '') {
        $modal.find('.fui-modal-container').removeClass('animated ' + FamousUI.modal.animateModal($modal)[1]);
        $modal.removeClass('modal-show').addClass('modal-exit');
        FamousUI.body.removeClass('noScroll');
      } else {
        setTimeout(function () {
          $modal.find('.fui-modal-container').removeClass('animated ' + FamousUI.modal.animateModal($modal)[1]);
          $modal.removeClass('modal-show').addClass('modal-exit');
          FamousUI.body.removeClass('noScroll');
        }, 1000);
      }
    },
    init: () => {
      $('.modal-open').on('click', function (e) {
        e.preventDefault();
        var target = $(this).attr('data-modal');
        var $modal = $('#' + target);
        console.log($modal);
        
        FamousUI.modal.modalOpen($modal);
      });


      // MODAL CLOSE ON CLICK
      $('.modal-close').on('click', function (e) {
        e.preventDefault();
        var target = $(this).attr('data-modal');
        var $modal = $('#' + target);
        FamousUI.modal.modalClose($modal)
      });

      // CLICK EVENT OUTSIDE MODAL
      $('.fui-modal').on('click', function (e) {
        if ($(e.target).is('.fui-modal')) {
          var $modal = $('.fui-modal.modal-show');
          FamousUI.modal.modalClose($modal);
        }
      });

      $.fn.FUIModal = function () {
        var $target = $(this);

        function open() {
          FamousUI.modal.modalOpen($target);
        }

        function close() {
          FamousUI.modal.modalClose($target);
        }

        return {
          open: open,
          close: close
        }

      };
    }
  };
  FamousUI.modal.init();
}(jQuery, window, FamousUI));
