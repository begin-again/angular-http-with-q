describe('$http Promises', function(){
  var $httpBackend;
  var $q;
  var pfq;
  var response;
  var isThenResolve = ', promise eval in then for resolve';
  var isThenReject = ', promise eval in then for reject';
  var isCatchResolve = ', promise eval in catch for resolve';
  var isCatchReject = ', promise eval in catch for reject';
  //var isCatch = ' catch';

  beforeEach( module('Insights'));

  beforeEach( inject(function(_$q_,  _$httpBackend_, PromiseFunQ){
    $httpBackend = _$httpBackend_;
    $q = _$q_;
    pfq = PromiseFunQ;
  }));

  afterEach( function(){
    response = undefined;
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('with $q', function(){
    describe('with defer, Has Catch', function(){
      it('resolve in service success callback will appear in eval of the \'then\' block', function(){
        $httpBackend
          .expectGET('/someUrl')
          .respond(200, 'resolve');

        pfq.withDefer()
          .then(function(r){
            response = r + isThenResolve;
          })
          .catch(function(){
            response = r + isCatchResolve;
          });

        expect($httpBackend.flush).not.toThrow();
        expect(response).toEqual( 'onSuccess: resolve' + isThenResolve);
      });
      it('reject in service success callback will appear in the eval of the \'catch\' block', function(){
        $httpBackend
          .expectGET('/someUrl')
          .respond(200, 'reject');

        pfq.withDefer()
          .then(function(r){
            response = r + isThenReject;
          })
          .catch(function(r){
            response = r + isCatchReject;
          });

        expect($httpBackend.flush).not.toThrow();
        expect(response).toEqual( 'onSuccess: reject' + isCatchReject);
      });
      it('resolve in a service failure callback will appear in the eval of the \'then\' block', function(){
        $httpBackend
          .expectGET('/someUrl')
          .respond(500, 'resolve');

        pfq.withDefer()
          .then(function(r){
            response = r + isThenResolve;
          })
          .catch(function(r){
            response = r + isCatchResolve;
          });

        expect($httpBackend.flush).not.toThrow();
        expect(response).toEqual( 'onCatch: resolve' + isThenResolve);
      });
      it('reject in a service failure callback will appear in the eval of the \'catch\' block', function(){
        //
        $httpBackend
          .expectGET('/someUrl')
          .respond(500, 'reject');

        pfq.withDefer()
          .then(function(r){
            response = r + isThenReject;
          })
          .catch(function(r){
            response = r + isCatchReject;
          });

        expect($httpBackend.flush).not.toThrow();
        expect(response).toEqual( 'onCatch: reject' + isCatchReject);
      });
    });
    describe('with defer, No Catch', function(){
      it('resolve in a service success callback will appear in the eval of the \'then\' block', function(){
        $httpBackend
          .expectGET('/someUrl')
          .respond(200, 'resolve');

        pfq.withDeferNoCatch()
          .then(function(r){
            response = r + isThenResolve;
          })
          .catch(function(){
            response = r + isCatchResolve;
          });

        expect($httpBackend.flush).not.toThrow();
        expect(response).toEqual( 'onSuccess: resolve' + isThenResolve);
      });
      it('reject in service success callback will appear in the eval of the \'catch\' block', function(){
        $httpBackend
          .expectGET('/someUrl')
          .respond(200, 'reject');

        pfq.withDeferNoCatch()
          .then(function(r){
            response = r + isThenReject;
          })
          .catch(function(r){
            response = r + isCatchReject;
          });

        expect($httpBackend.flush).not.toThrow();
        expect(response).toEqual( 'onSuccess: reject' + isCatchReject);
      });
      it('resolve in a service failure callback will appear in the eval of the \'then\' block', function(){
        $httpBackend
          .expectGET('/someUrl')
          .respond(500, 'resolve');

        pfq.withDeferNoCatch()
          .then(function(r){
            response = r + isThenResolve;
          })
          .catch(function(r){
            response = r + isCatchResolve;
          });

        expect($httpBackend.flush).not.toThrow();
        expect(response).toEqual( 'onError: resolve' + isThenResolve);
      });
      it('reject in a service failure callback will appear in the eval of the \'catch\' block', function(){
        //
        $httpBackend
          .expectGET('/someUrl')
          .respond(500, 'reject');

        pfq.withDeferNoCatch()
          .then(function(r){
            response = r + isThenReject;
          })
          .catch(function(r){
            response = r + isCatchReject;
          });

        expect($httpBackend.flush).not.toThrow();
        expect(response).toEqual( 'onError: reject' + isCatchReject);
      });
    });
    describe('without defer, has Catch', function(){
      it('resolve in service success callback will appear in eval of the \'then\' block', function(){
        $httpBackend
          .expectGET('/someUrl')
          .respond(200, 'resolve');

        pfq.withoutDefer()
          .then(function(r){
            response = r + isThenResolve;
          })
          .catch(function(r){
            resolve = r + isCatchResolve
          });

        expect($httpBackend.flush).not.toThrow();
        expect(response).toEqual('onSuccess: resolve' + isThenResolve);
      });
      it('reject in service success callback will appear in eval of the \'catch\' block', function(){
        // this is because the $q.reject in the service then calls the catch block.
        $httpBackend
          .expectGET('/someUrl')
          .respond(200, 'reject');

        pfq.withoutDefer()
          .then(function(r){
            response = r + isThenReject
          })
          .catch(function(r){
            response = r + isCatchReject;
          });

        expect($httpBackend.flush).not.toThrow();
        expect(response).toEqual('onCatch: onSuccess: reject' + isCatchReject);
      });
      it('resolve in a service failure callback will appear in the eval of the \'then\' block', function(){
        $httpBackend
          .expectGET('/someUrl')
          .respond(500, 'resolve');

        pfq.withoutDefer()
          .then(function(r){
            response = r + isThenResolve
          })
          .catch(function(r){
            response = r + isCatchResolve;
          });

        expect($httpBackend.flush).not.toThrow();
        expect(response).toEqual('onCatch: resolve' + isThenResolve);
      });
      it('reject in a service failure callback will appear in the eval of the \'catch\' block', function(){
        $httpBackend
          .expectGET('/someUrl')
          .respond(500, 'reject');

        pfq.withoutDefer()
          .then(function(r){
            response = r + isThenReject
          })
          .catch(function(r){
            response = r + isCatchReject;
          });

        expect($httpBackend.flush).not.toThrow();
        expect(response).toEqual('onCatch: reject' + isCatchReject);
      });
    });
    describe('without defer, No Catch', function(){
      it('resolve in service success callback will appear in eval of the \'then\' block', function(){
        $httpBackend
          .expectGET('/someUrl')
          .respond(200, 'resolve');

        pfq.withoutDeferNoCatch()
          .then(function(r){
            response = r + isThenResolve;
          })
          .catch(function(r){
            resolve = r + isCatchResolve
          });

        expect($httpBackend.flush).not.toThrow();
        expect(response).toEqual('onSuccess: resolve' + isThenResolve);
      });
      it('reject in service success callback will appear in eval of the  \'catch\' block', function(){
        // this is because the $q.reject in the service is not caught by a catch block and thus returns undefined
        $httpBackend
          .expectGET('/someUrl')
          .respond(200, 'reject');

        pfq.withoutDeferNoCatch()
          .then(function(r){
            response = r + isThenReject
          })
          .catch(function(r){
            console.log('here i am')
            response = r + isCatchReject;
          });

        expect($httpBackend.flush).not.toThrow();
        expect(response).toEqual('onSuccess: reject' + isCatchReject);
      });
      it('resolve in a service failure callback will appear in the eval of the \'then\' block', function(){
        $httpBackend
          .expectGET('/someUrl')
          .respond(500, 'resolve');

        pfq.withoutDeferNoCatch()
          .then(function(r){
            response = r + isThenResolve
          })
          .catch(function(r){
            response = r + isCatchResolve;
          });

        expect($httpBackend.flush).not.toThrow();
        expect(response).toEqual('onError: resolve' + isThenResolve);
      });
      it('reject in a service failure callback will appear in the eval of the \'catch\' block', function(){
        $httpBackend
          .expectGET('/someUrl')
          .respond(500, 'reject');

        pfq.withoutDeferNoCatch()
          .then(function(r){
            response = r + isThenReject
          })
          .catch(function(r){
            response = r + isCatchReject;
          });

        expect($httpBackend.flush).not.toThrow();
        expect(response).toEqual('onError: reject' + isCatchReject);
      });
    });
    describe('without defer Common Use, No Catch', function(){
      it('resolve in service success callback will appear in eval of the \'then\' block', function(){
        $httpBackend
          .expectGET('/someUrl')
          .respond(200, 'resolve');

        pfq.withoutDeferCommon()
          .then(function(r){
            response = r + isThenResolve;
          })
          .catch(function(r){
            resolve = r + isCatchResolve
          });

        expect($httpBackend.flush).not.toThrow();
        expect(response).toEqual('onSuccess: resolve' + isThenResolve);
      });
      it('reject in service success callback will appear in eval of the \'catch\' blocks', function(){
        // this is because the $q.reject in the service is not caught by a catch block and thus returns undefined
        $httpBackend
          .expectGET('/someUrl')
          .respond(200, 'reject');

        pfq.withoutDeferCommon()
          .then(function(r){
            response = r + isThenReject
          })
          .catch(function(r){
            console.log('here I am')
            response = r + isCatchReject;
          });

        expect($httpBackend.flush).not.toThrow();
        expect(response).toEqual('onSuccess: reject' + isCatchReject);
      });
      it('resolve in a service failure callback will appear in the eval of the \'then\' block', function(){
        $httpBackend
          .expectGET('/someUrl')
          .respond(500, 'resolve');

        pfq.withoutDeferCommon()
          .then(function(r){
            response = r + isThenResolve
          })
          .catch(function(r){
            response = r + isCatchResolve;
          });

        expect($httpBackend.flush).not.toThrow();
        expect(response).toEqual('onError: resolve' + isThenResolve);
      });
      it('reject in a service failure callback will appear in the eval of the \'catch\' block', function(){
        $httpBackend
          .expectGET('/someUrl')
          .respond(500, 'reject');

        pfq.withoutDeferCommon()
          .then(function(r){
            response = r + isThenReject
          })
          .catch(function(r){
            response = r + isCatchReject;
          });

        expect($httpBackend.flush).not.toThrow();
        expect(response).toEqual('onError: reject' + isCatchReject);
      });
    });
    describe('without defer Common Use, No Catch Part II', function(){
      it('resolve in service success callback will appear in eval of the \'then\' block', function(){
        $httpBackend
          .expectGET('/someUrl')
          .respond(200, 'resolve');

        pfq.withoutDeferCommon()
          .then(function(r){
            response = r + isThenResolve;
          },function(r){
            resolve = r + isCatchResolve
          });

        expect($httpBackend.flush).not.toThrow();
        expect(response).toEqual('onSuccess: resolve' + isThenResolve);
      });
      it('reject in service success callback will appear in eval of the \'catch\' blocks', function(){
        // this is because the $q.reject in the service is not caught by a catch block and thus returns undefined
        $httpBackend
          .expectGET('/someUrl')
          .respond(200, 'reject');

        pfq.withoutDeferCommon()
          .then(function(r){
            response = r + isThenReject
          },function(r){
            console.log('here I am')
            response = r + isCatchReject;
          });

        expect($httpBackend.flush).not.toThrow();
        expect(response).toEqual('onSuccess: reject' + isCatchReject);
      });
      it('resolve in a service failure callback will appear in the eval of the \'then\' block', function(){
        $httpBackend
          .expectGET('/someUrl')
          .respond(500, 'resolve');

        pfq.withoutDeferCommon()
          .then(function(r){
            response = r + isThenResolve
          },function(r){
            response = r + isCatchResolve;
          });

        expect($httpBackend.flush).not.toThrow();
        expect(response).toEqual('onError: resolve' + isThenResolve);
      });
      it('reject in a service failure callback will appear in the eval of the \'catch\' block', function(){
        $httpBackend
          .expectGET('/someUrl')
          .respond(500, 'reject');

        pfq.withoutDeferCommon()
          .then(function(r){
            response = r + isThenReject
          })
          .catch(function(r){
            response = r + isCatchReject;
          });

        expect($httpBackend.flush).not.toThrow();
        expect(response).toEqual('onError: reject' + isCatchReject);
      });
    });
  });
});
