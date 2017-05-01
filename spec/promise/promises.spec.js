describe('$http Promises', function(){
  var $httpBackend;
  var pf;
  var response;
  var isThenResolve = ', promise eval in then for resolve';
  var isThenReject = ', promise eval in then for reject';
  var isCatchResolve = ', promise eval in catch for resolve';
  var isCatchReject = ', promise eval in catch for reject';

  beforeEach( module('Insights'));

  beforeEach( inject(function(_$httpBackend_, PromiseFun){
    $httpBackend = _$httpBackend_;
    pf = PromiseFun;
  }));

  afterEach( function(){
    response = undefined
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('without $q', function(){
    it('should be then', function(){

      $httpBackend
        .expectGET('/someUrl')
        .respond(200);

      pf.fetch()
        .then(function(r){
          response = 'success ' + r;
        });

      expect($httpBackend.flush).not.toThrow();
      expect(response).toEqual('success then');
    });
    it('should be catch', function(){

      $httpBackend
        .expectGET('/someUrl')
        .respond(500);

      pf.fetch()
        .then(function(r){
          response = 'success '  + r;
        })
        .catch(function(r){
          response = 'catch ' + r
        });

      expect($httpBackend.flush).not.toThrow();
      expect(response).toEqual('success catch');
    });

  });

});
