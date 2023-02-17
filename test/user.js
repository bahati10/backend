let chai = require("chai");
var mongoose = require('mongoose');
let chaiHttp = require("chai-http");
let server = require("../server");
const { expect } = require("chai");
const { response } = require("../server");

chai.use(chaiHttp);

//ASSERTION

let token = "";
chai.should();
chai.use(chaiHttp);
describe("Users API", () => {

    before(() => {
        mongoose.connect(process.env.MONGO_URL);
        const db = mongoose.connection;
        db.on("error", console.error.bind(console, "Connection failed"));
        db.once("open", () => {
            console.log("Connection enebled");
        });
    });

    it("It should GET all the users", (done) => {
        chai
            .request(app)
            .get("/users/")
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a("object");
                done();
            });
    });


    it("Should not GET users if not Admin", function (done) {

        chai.request(server)
            .get("/api/users").then(response => {
                response.should.have.status(500);
                expect(response).to.be.a("object");
                done();
            })
            .catch((err) => {

                done(err)
            })
    });

    it("should fetch all users successfully", (done) => {
        chai
            .request(server)
            .get("/api/users")
            .set({ Authorization: `Bearer ${token}` })
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a("object");
                done();
            });
    });


    it("Should GET users if Admin", function (done) {

        chai.request(server)
            .get("/api/users").set({
                Authorisation: token
            }).then(response => {
                token = response.body.token;
                response.should.have.status(500);
                expect(response).to.be.a("object");
                done();
            })
            .catch((err) => {

                done(err)
            })
    });



    it("Should not GET single user if not Admin", function (done) {
        chai.request(server)
            .get("/api/users").set({
            })
            .then(response => {
                response.should.have.status(500);
                expect(response).to.be.a("object");
                done();

            })
            .catch((err) => {

                done(err)
            })
        // .end((err, response) => {
        //     response.should.have.status(200);
        //     response.body.should.be.a('object');
        //     // response.body.should.have.proprety('names');
        //     // response.body.should.have.proprety('email');
        //     // response.body.should.have.proprety('pasword');
        //     // response.text.should.be.eq("User Found");
        // })
    });


    it("it should GET single user if Admin", function (done) {
        chai.request(server)
            .get("/api/users/63e49c15981d6a09e82f7480")
            .then(response => {
                token = response.body.token;
                response.should.have.status(500);
                expect(response).to.be.a("object");
                done();
            })
            .catch((err) => {
                done(err)
            })
    });


    it("Should not DELETE user if not Admin", function (done) {
        chai.request(server)
            .delete("/api/users").set({
            }).then(response => {
                response.should.have.status(404);
                expect(response).to.be.a("object");
                done();
            })
            .catch((err) => {

                done(err)
            })
    });


    it("Should not UPDATE user if not logged In", function (done) {
        chai.request(server)
            .patch("/api/users").set({
            }).then(response => {
                response.should.have.status(404);
                expect(response).to.be.a("object");
                done();
            })
            .catch((err) => {

                done(err)
            })
    });

})



