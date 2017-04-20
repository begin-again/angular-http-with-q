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
- It is not necessary to use q.resolve() if one is catching failures with q.reject()
  - not http errors though
