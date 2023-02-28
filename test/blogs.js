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



    let defaultUser = {
        email: "admin@gmail.com",
        password: "ADMIN1234"
    };

    let token;



    beforeEach(done => {
        chai
            .request(server)
            .post("/api/blogs")
            .send(defaultUser)
            .end((err, res) => {
                token = res.body.token;
                res.should.have.status(500);
                done();
            });
    });




    it("Should POST new blog if not Admin", function (done) {
        chai.request(server)
            .post("/api/blogs")
            .set({ Authorization: `Bearer ${token}` })
            .end((err, res) => {
                token = res.body.token;
                res.should.have.status(500);
                done();
            });
    });


    // it("Should GET all Blogs", function (done) {

    //     chai.request(server)
    //         .get("/api/blogs").then(response => {
    //             response.should.have.status(200);
    //             expect(response).to.be.a("object");
    //             done();
    //         })
    //         .catch((err) => {

    //             done(err)
    //         })
    // });


    it("Should GET single Blog", function (done) {

        chai.request(server)
            .get("/api/blogs/63e5e819789dece2a1cd9a68").then(response => {
                response.should.have.status(404);
                expect(response).to.be.a("object");
                done();

            })
            .catch((err) => {

                done(err)
            })
    });


    it("Should not UPDATE blog if not Admin", function (done) {

        chai.request(server)
            .patch("/api/blogs/63e5e819789dece2a1cd9a68").set({
            }).then(response => {
                response.should.have.status(500);
                expect(response).to.be.a("object");
                done();
            })
            .catch((err) => {

                done(err)
            })
    });


    it("Should not UPDATE blog if not Admin 2", function (done) {

        chai.request(server)
            .patch("/api/blogs/63f8eb7a7f039c64f4d10975").set({
            }).then(response => {
                response.should.have.status(500);
                expect(response).to.be.a("object");
                done();
            })
            .catch((err) => {

                done(err)
            })
    });

    it("can UPDATE blog if Admin", function (done) {

        chai.request(server)
            .patch("/api/blogs/63e5e819789dece2a1cd9a68").set({
            }).then(response => {
                response.should.have.status(500);
                expect(response).to.be.a("object");
                done();
            })
            .catch((err) => {

                done(err)
            })
    });


    it("Should not DELETE blog if not Admin", function (done) {

        chai.request(server)
            .delete("/api/blogs/63e5e819789dece2a1cd9a68").then(response => {
                response.should.have.status(500);
                expect(response).to.be.a("object");
                done();
            })
            .catch((err) => {

                done(err)
            })
    });

    it("can DELETE blog if Admin", function (done) {

        chai.request(server)
            .delete("/api/blogs/63e5e819789dece2a1cd9a68").then(response => {
                response.should.have.status(500);
                expect(response).to.be.a("object");
                done();
            })
            .catch((err) => {

                done(err)
            })
    });

    it("It should GET all the users unique", (done) => {
        chai
            .request(server)
            .get("/api/users/")
            .end((err, response) => {
                response.should.have.status(500);
                response.body.should.be.a("object");
                done();
            });
    });

    it("can not login if not Admin", (done) => {
        chai
            .request(server)
            .get("/api/users/login/admin")
            .end((err, response) => {
                response.should.have.status(404);
                response.body.should.be.a("object");
                done();
            });
    });
})


describe("user", () => {

    it("It should not ADD users", (done) => {
        chai
            .request(server)
            .get("/api/users")
            .end((err, response) => {
                response.should.have.status(500);
                done();
            })

    });

    describe("user deletion", () => {
        it("It should not DELETE users", (done) => {
            chai
                .request(server)
                .get("/api/users/63e5e819789a1cd9a68")
                .end((err, response) => {
                    response.should.have.status(500);
                    done();
                })
        });
    })
})