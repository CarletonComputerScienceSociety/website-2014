'use strict';

angular.module('websiteApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [{
      'title': 'News',
      'link': '#'
    },
    {
      'title': 'Useful Links',
      'link': '#'
    },
    {
      'title': 'Executives',
      'link': '#'
    },
    {
      'title': 'Get Involved',
      'link': '#'
    }
    ];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
