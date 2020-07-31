let request = require("supertest");
let app = require("../src/app");
const assert = require("chai").assert;

var Cookies;

describe("Functional Test: #start_test", function() {
  it("should create user session for valid user #end_test", function(done) {
    request(app)
      .post("/signin")
      .set("Accept", "application/json")
      .send({ email: "led@zeppelin.com", password: "stairwaytoheaven" })
      .then(function(res) {
        Cookies = res.headers['set-cookie'];
        request(app)
          .post("/add")
          .send({ item: "My first item" })
          .set('Cookie', Cookies)
          .set("Accept", "application/json")
          .end(function(err, res) {
            assert.equal(res.status, 302);
            console.log("The Cookie: " + Cookies);
            done();
          });
      });
  });
});

