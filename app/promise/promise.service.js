(function() {
  'use strict';

  angular
    .module('Insights')
    .factory('PromiseFun', PromiseFun);

  // will never make an actual http call
  PromiseFun.$inject = ['$http'];
  function PromiseFun($http){
    var service = {
      fetch: fetch
    }
    return service;

    function fetch(){
      var config = {
        method: 'GET',
        url: '/someUrl'
      };
      return $http(config)
        .then(function(resp){
          return 'then';
        },function(resp){
          return 'catch';
        });

    }

  }

}());
