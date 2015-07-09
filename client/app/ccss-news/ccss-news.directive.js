'use strict';

angular.module('websiteApp')
  .directive('ccssNews', function () {
    return {
      templateUrl: 'app/ccss-news/ccss-news.html',
      restrict: 'E',
      scope: {
        author: '@',
        published: '@',
        article: '@'
      }
    };
  });
