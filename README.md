# Angular Promises

I wrote these tests to help me to understand how the HttpPromise object returned by the $http service
works and how to utilize $q.

# The tests

You will need to have nodejs installed and some libraries installed with npm  globally

1. ensure node installed and available in your path.
2. npm i -g karma-cli
3. cd into the folder containing the package.json file
4. npm install

To run the tests:

    npm run test

# Results

- defer() creates a new promise;
- For functions that already return a promise, such as $http, defer() is not necessary.
- Whether using defer() or not, the _then_ method is still present.
- It is not necessary to use $q.resolve() if one is catching failures with $q.reject()
  - not http errors though
- A .catch() can be used in lieu of the second parameter of the then() method.
- Data returned with $q.resolve() will be applied the input of the next success function within the next then() in the chain
- Data returned with a $q.reject() will be applied to the input of the next failure function within the next then() or optionally catch() in the chain.

## Usages
The HttpPromise object's then() takes two parameters as shown below. Returning data from #1 is applied to the next _then_'s #1. Returning data from #2 is applied to the next _then_'s #2 (optionally one may omit #2 to ignore failures or to utilize a _catch_ method instead).

  1. a function to handle success
  2. a function to handle failure

### With $q to create a new promise
One often reads that this is an anti-pattern because the defer() is creating a new promise which is not necessary.

    var p = $q.defer()
    $http.get('someUrl')
      .then(
        function(response){
          if(response.data === 'xyz') {
            p.resolve(response.data);
          } else {
            p.reject('not xyz!')
          }
        },
        function(err){
          if(err.status !== 500){
            p.resolve('123')
          } else {
            p.reject(err.status);
          }
        }
      )
    return p.promise;


Resolves are an input into the next _then_'s success function. Rejects are an input into the next _then_'s failure function (or _catch_)

### With $q sans a new promise
With $q, one can reject or resolve in both the success and error portions.

    return $http.get('someUrl')
      .then(
        function(response){
          if(response.data === 'xyz') {
            return response.data;  // will be an input into the _success_ function of the next _then_
          } else {
            $q.reject('not xyz!')
          }
        },
        function(err){
          if(err.status !== 500){
            $q.resolve('123')
          } else {
            return err.status; // will be an input into the _failure_ function of the next _then_
          }
        }
      );

Resolves are an input into the next _then_'s success function. Rejects are an input into the next _then_'s failure function (or _catch_)

### Without $q
If one doesn't need to worry about rejecting within the _success_ function or conversely resolving in the _failure_ function of the _then_ (or catch) method, $q is not needed.

    return $http.get('someUrl')
      .then(
        function(response){
          return response.data  // will be an input into the next _then_'s success function
        },
        function(err){
          return err.status   // will be an input into the next _then_'s failure function (or catch)
        }
      );
