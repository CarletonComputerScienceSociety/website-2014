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
        $(window).scroll(function() {
            if ($(this).scrollTop() > offset) {
                element.fadeIn(duration);
            } else {
                element.fadeOut(duration);
            }
        });

        element.click(function(event) {
            event.preventDefault();
            $('html, body').animate({scrollTop: 0}, duration);
            return false;
        });
      }
    };
  });
