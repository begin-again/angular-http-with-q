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
      return $http.get('/someUrl')
        .then(function(resp){
          return resp.data;
        })
        .catch(function(resp){
          return resp.data;
        });

    }

  }

}());
