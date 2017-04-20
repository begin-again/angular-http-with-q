(function() {
  'use strict';

  angular
    .module('Insights')
    .factory('PromiseFunQ', PromiseFunQ);

  // will never make an actual http call
  PromiseFunQ.$inject = ['$q', '$http'];
  function PromiseFunQ($q, $http){
    var service = {
      withDefer: withDefer
      ,withoutDefer: withoutDefer
      ,withoutDeferNoCatch: withoutDeferNoCatch
      ,withoutDeferPretty: withoutDeferPretty
      ,withDeferNoCatch: withDeferNoCatch
      ,withoutDeferCommon: withoutDeferCommon
    }
    return service;

    function withDefer(){
      var prm = $q.defer();
      $http.get('/someUrl')
        .then(function(resp){
          if(resp.data === 'resolve') {
            prm.resolve('onSuccess: ' + resp.data);
          } else {
            prm.reject('onSuccess: ' + resp.data);
          }
        })
        .catch(function(resp){
          if(resp.data === 'resolve') {
            prm.resolve('onCatch: ' + resp.data);
          } else {
            prm.reject('onCatch: ' + resp.data);
          }
        });
      return prm.promise;
    }

    function withDeferNoCatch(){
      var prm = $q.defer();
      $http.get('/someUrl')
        .then(
          function onSuccess(resp){
            if(resp.data === 'resolve') {
              prm.resolve('onSuccess: ' + resp.data);
            } else {
              prm.reject('onSuccess: ' + resp.data);
            }
          },
          function onError(resp){
            if(resp.data === 'resolve') {
              prm.resolve('onError: ' + resp.data);
            } else {
              prm.reject('onError: ' + resp.data);
            }
          }
        );
      return prm.promise;
    }

    function withoutDefer(){
      // on $q.reject, the catch block will be evaluated
      return $http.get('/someUrl')
        .then(function(resp){
            console.log('in then', resp.data)
          if(resp.data === 'resolve') {
            return $q.resolve('onSuccess: ' + resp.data);
          } else {
            console.log('in then reject: ' + resp.data)
            return $q.reject('onSuccess: ' + resp.data);
          }
        })
        .catch(function(resp){
          console.log('in catch', resp.data ? resp.data : resp)
          if(resp.data){
            if(resp.data === 'resolve') {
              return $q.resolve('onCatch: ' + resp.data);
            } else {
              return $q.reject('onCatch: ' + resp.data);
            }
          } else {
            if(resp.match(/resolve/)) {
              return $q.resolve('onCatch: ' + resp);
            } else {
              return $q.reject('onCatch: ' + resp);
            }
          }
        });
    }

    function withoutDeferNoCatch(){
      return $http.get('/someUrl')
        .then(
          function(resp){
            if(resp.data === 'resolve') {
              return $q.resolve('onSuccess: ' + resp.data);
            } else {
              console.log('in then reject: ' + resp.data)
              return $q.reject('onSuccess: ' + resp.data);
            }
          },
          function(resp){
            console.log('in error', resp.data ? resp.data : resp)
            if(resp.data){
              if(resp.data === 'resolve') {
                return $q.resolve('onError: ' + resp.data);
              } else {
                return $q.reject('onError: ' + resp.data);
              }
            } else {
              if(resp.match(/resolve/)) {
                return $q.resolve('onError: ' + resp);
              } else {
                return $q.reject('onError: ' + resp);
              }
            }
          }
        );
    }

    function withoutDeferCommon(){
      return $http.get('/someUrl')
        .then(
          function(resp){
            if(resp.data === 'reject') {
              console.log('in then reject: ' + resp.data)
              return $q.reject('onSuccess: ' + resp.data);
            } else {
              console.log('in then just return: ' + resp.data)
              return 'onSuccess: ' + resp.data;
            }
          },
          function(resp){
            console.log('in error', resp.data ? resp.data : resp)
            if(resp.data){
              if(resp.data === 'reject') {
                console.log('in error reject: ' + resp.data)
                return $q.reject('onError: ' + resp.data);
              } else {
                console.log('in error resolve: ' + resp.data)
                return 'onError: ' + resp.data;
              }
            } else {
              if(resp.match(/reject/)) {
                console.log('in error reject: ' + resp.data)
                return $q.reject('onError: ' + resp);
              } else {
                console.log('in error resolve: ' + resp.data)
                return 'onError: ' + resp;
              }
            }
          }
        );
    }

    function withoutDeferPretty(){
      var prm =  $http.get('/someUrl')
        .then(function(resp){
          return $q.resolve(resp.data);
        })
        .catch(function(resp){
          return $q.reject(resp.status);
        });
      return prm;
    }

  }

}());
