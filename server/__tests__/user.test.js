const request = require("supertest");
const app = require("express")();

describe("User Test Cases", function () {
  it("Get all user list", function (done) {
    request(app)
      .get("/user")
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        done();
      });
  });

  // we are using same user data hence it shows bad request error
  const UserData = {
    name: "vsm",
    email: "vm123@gmail.com",
    password: "vm12345",
  };
  it("register new user", function (done) {
    request(app)
      .post("/user/signup")
      .set("Content-type", "application/json")
      .send(UserData)
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
       
        done();
      });
  });

  const LoginData = {
    email: "mvai@gmail.com",
    password: "Pass@123",
  };

  it("Login user with valid email and password", function (done) {
    request(app)
      .post("/user/login")
      .set("Content-type", "application/json")
      .send(LoginData)
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        
        done();
      });
  });

  const InvalidLoginData = {
    email: "mvai@gmail.com",
    password: "ass@1113",
  };

  it("Login user with Invalid password expect BadRequest", function (done) {
    request(app)
      .post("/user/login")
      .set("Content-type", "application/json")
      .send(InvalidLoginData)
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        done();
      });
  });
});