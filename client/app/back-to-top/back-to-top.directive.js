'use strict';

angular.module('websiteApp')
  .directive('backToTop', function () {
    return {
      templateUrl: 'app/back-to-top/back-to-top.html',

      restrict: 'EA',

      link: function (scope, element, attrs) {
        var offset = 250;
        var duration = 300;
        element.css('display', 'none');

        var fadeFunc = function() {
          if($(window).scrollTop() > offset) {
            element.fadeIn(duration);
          } else {
            element.fadeOut(duration);
          }
        }
        $(window).scroll(function() {
          var $this = $(this);
          if($this.data('scrollTimeout')) {
            clearTimeout($this.data('scrollTimeout'));
          }
          $this.data('scrollTimeout', setTimeout(fadeFunc, 100));
        });

        element.click(function(event) {
            event.preventDefault();
            $('html, body').animate({scrollTop: 0}, duration);
            return false;
        });
      }
    };
  });
