'use strict';

angular.module('websiteApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [{
      'title': 'News',
      'link': '#news'
    },
    {
      'title': 'Resources',
      'link': '#resources'
    },
    {
      'title': 'Executives',
      'link': '#executives'
    },
    {
      'title': 'Get Involved',
      'link': '#get-involved'
    }
    ];

    $scope.goto = function(hash) {
      // set the location.hash to the id of
      // the element you wish to scroll to.
      $location.hash('bottom');

      // call $anchorScroll()
      $anchorScroll();
    };

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
