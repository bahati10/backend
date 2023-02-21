let chai = require("chai");
var mongoose = require('mongoose');
let chaiHttp = require("chai-http");
let server = require("../server");
const { expect } = require("chai");
const { response } = require("../server");

chai.use(chaiHttp);

//ASSERTION

chai.should();
chai.use(chaiHttp);


describe("Comments API", () => {
    it("It should GET all comments", (done) => {
        chai
            .request(server)
            .get("/api/comments/")
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a("object");
                done();
            });
    });

    it("It should not DELETE comments", (done) => {
        chai
            .request(server)
            .delete("/api/comments/")
            .end((err, response) => {
                response.should.have.status(404);
                response.body.should.be.a("object");
                done();
            });
    });

    it("Should get single comment", function (done) {

        chai.request(server)
            .get("/api/blogs").then(response => {
                response.should.have.status(200);
                expect(response).to.be.a("object");
                done();
            })
            .catch((err) => {

                done(err)
            })
    });
})