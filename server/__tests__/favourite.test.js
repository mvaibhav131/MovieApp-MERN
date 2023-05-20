const request = require("supertest");
const app = require("express")();

describe("Favourites Test Cases", function () {
  it("Get all favourites", function (done) {
    request(app)
      .get("/favourites")
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        done();
      });
  });

  const NewFavourites = {
    title: "my Favouritess",
    description: "creating simple favourite api to add new bolg",
    image:
      "https://media.istockphoto.com/photos/mountain-landscape-picture-id517188688?k=20&m=517188688&s=612x612&w=0&h=i38qBm2P-6V4vZVEaMy_TaTEaoCMkYhvLCysE7yJQ5Q=",
  };

  it("Create new Favourites", function (done) {
    request(app)
      .post("/favourites/add")
      .set("Content-type", "application/json")
      .send(NewFavourites)
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
       
        done();
      });
  });

  const invalidFavouritesId = "6463b07e9e86514dd74a2dbf";
  it("Get favourites by InvalidId", function (done) {
    request(app)
      .get(`/favourites/${invalidFavouritesId}`)
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        done();
      });
  });

  const UpdateFavourites = {
    title: "my Favouritess",
    description: "creats simple favourite api to add new favourite",
    image:
      "https://media.istockphoto.com/photos/mountain-landscape-picture-id517188688?k=20&m=517188688&s=612x612&w=0&h=i38qBm2P-6V4vZVEaMy_TaTEaoCMkYhvLCysE7yJQ5Q=",
  };
  const updateId = "6463b07e9e86514dd74a2dbf";

  it("Update Favourites", function (done) {
    request(app)
      .put(`/favourites/update/${updateId}`)
      .set("Content-type", "application/json")
      .send(UpdateFavourites)
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        done();
      });
  });
});