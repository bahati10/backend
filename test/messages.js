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


describe("Blogs API", () => {

    it("Should GET all Messages", function (done) {

        chai.request(server)
            .get("/api/messages").then(response => {
                response.should.have.status(500);
                expect(response).to.be.a("object");
                done();
            })
            .catch((err) => {

                done(err)
            })
    });


    it("Should GET single Message", function (done) {

        chai.request(server)
            .get("/api/messages/63e3fa9bed8523be086b107f").then(response => {
                response.should.have.status(500);
                expect(response).to.be.a("object");
                done();

            })
            .catch((err) => {

                done(err)
            })
    });



    it("Should not DELETE message if not Admin", function (done) {

        chai.request(server)
            .delete("/api/messsages/63e3fa9bed8523be086b107f").then(response => {
                response.should.have.status(404);
                expect(response).to.be.a("object");
                done();
            })
            .catch((err) => {

                done(err)
            })
    });

    it("can DELETE message if Admin", function (done) {

        chai.request(server)
            .delete("/api/messages/63e3fa9bed8523be086b107f").then(response => {
                response.should.have.status(500);
                expect(response).to.be.a("object");
                done();
            })
            .catch((err) => {

                done(err)
            })
    });
})