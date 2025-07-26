const { test, request, expect } = require('@playwright/test');

var baseURL = "http://localhost:3000";

test('Registers user successfully with valid password', function() {
  return request.newContext().then(function(apiContext) {
    return apiContext.post(baseURL + '/userRegistration', {
      data: {
        firstname: 'Alex',
        secondname: 'Richards',
        email: 'alexrichards10@outlook.com',
        password: 'Manutd101'
      }
    }).then(function(response) {
      return response.json().then(function(responseBody) {
        var responseStatus = response.status();
        expect(responseBody.message).toBe("User has been registered successfully");
        expect(responseStatus).toBe(201);
        expect(responseBody).toHaveProperty('accessToken');  // check token is returned
      });
    });
  });
});

test('Fails registration with empty password', function() {
  return request.newContext().then(function(apiContext) {
    return apiContext.post(baseURL + '/userRegistration', {
      data: {
        firstname: 'James',
        secondname: 'Mahogany',
        email: 'mahogany20@gmail.com',
        password: ''
      }
    }).then(function(response) {
      return response.json().then(function(responseBody) {
        var responseStatus = response.status();
        expect(responseBody.message).toBe("Error: please enter a valid password");
        expect(responseStatus).toBe(400);
      });
    });
  });
});

test.describe("Testing user login", function() {

  test("Tests login for success", function() {
    return request.newContext().then(function(apiContext) {
      return apiContext.post(baseURL + '/login', {
        data: {
          firstname: 'Alex',
          secondname: 'Richards',
          email: 'alexrichards10@outlook.com',
          password: 'Manutd101'
        }
      }).then(function(response) {
        return response.json().then(function(responseBody) {
          var responseStatus = response.status();
          expect(responseBody.message).toBe("User has logged in successfully");
          expect(responseStatus).toBe(201);
          expect(responseBody).toHaveProperty('accessToken');
        });
      });
    });
  });

  test("Returns error if user not found", function() {
    return request.newContext().then(function(apiContext) {
      return apiContext.post(baseURL + '/login', {
        data: {
           firstname: 'Alex',
          secondname: 'Richards',
          email: 'alexrichards10@outlook.com',
          password: 'Manutd101'
        }
      }).then(function(response) {
        var responseStatus = response.status();
        return response.text().then(function(responseText) {
          expect(responseText).toBe("User not found");
          expect(responseStatus).toBe(401);
        });
      });
    });
  });

});