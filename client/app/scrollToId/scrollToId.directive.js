'use strict';

angular.module('websiteApp')
  .directive('scrollToId', function () {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        var duration = 300;
        var id = attrs.scrollToId;

        element.click(function(event) {
          event.preventDefault();

          $('html, body').animate({
            scrollTop: $(id).offset().top
          }, duration);

          return false;
        });
      }
    };
  });
