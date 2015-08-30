'use strict';

angular.module('websiteApp')
  .controller('NewsCtrl', function ($scope) {

    //ul that contains all the li for articles
    var articles = angular.element('.news-widget .news-articles ul');

    //add and remove class to elements for display purposes
    var activate = function(index) {
      articles.children().eq(index-1).addClass('active');
    }
    var deactivate = function(index) {
      articles.children().eq(index-1).removeClass('active');
    }

    //scope set up
    $scope.currArticle = 1;
    $scope.numArticles = articles.children().length;
    activate($scope.currArticle);

    //cycle article in view forward (with loop)
    $scope.next = function() {
      deactivate($scope.currArticle);
      $scope.currArticle += 1;
      if($scope.currArticle > $scope.numArticles) {
        $scope.currArticle = 1;
      }
      activate($scope.currArticle);
    }

    //cycle article in view backward (with loop)
    $scope.prev = function() {
      deactivate($scope.currArticle);
      $scope.currArticle -= 1;
      if($scope.currArticle <= 0) {
        $scope.currArticle = $scope.numArticles;
      }
      activate($scope.currArticle);
    }
  });
