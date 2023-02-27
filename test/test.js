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


describe("blogs API", () => {
    let defaultUser = {
        email: "fortesting@gmail.com",
        password: "fortesting"
    };

    let token;


    beforeEach(done => {
        chai
            .request(server)
            .post("/api/users/login")
            .send(defaultUser)
            .end((err, res) => {
                token = res.body.token;
                res.should.have.status(200);
                done();
            });
    });

    describe("should not GET all users", () => {
        it("It should not GET all users", (done) => {
            chai
                .request(server)
                .get("/api/users")
                .set({ Authorization: `Bearer ${token}` })
                .end((err, response) => {
                    response.should.have.status(500);
                    done();
                });
        });

    });
})


describe("blogs API", () => {
    let defaultUser = {
        email: "admin@gmail.com",
        password: "ADMIN1234"
    };

    let token;


    beforeEach(done => {
        chai
            .request(server)
            .post("/api/users/login/admin")
            .send(defaultUser)
            .end((err, res) => {
                token = res.body.token;
                res.should.have.status(200);
                done();
            });
    });

    describe("GET all users", () => {
        it("It should GET all users", (done) => {
            chai
                .request(server)
                .get("/api/users")
                .set({ Authorization: `Bearer ${token}` })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    done();
                });
        });

    });

    it("It should NOT GET users uni", (done) => {
        chai
            .request(server)
            .get("/api/uses/")
            .set({ Authorization: `Bearer ${token}` })
            .end((err, response) => {
                response.should.have.status(404);
                response.body.should.be.a("object");
                done();
            });
    });


})

describe("GET all blogs", () => {

    describe("blogs API", () => {
        let defaultUser = {
            email: "admin@gmail.com",
            password: "ADMIN1234"
        };

        let token;


        beforeEach(done => {
            chai
                .request(server)
                .post("/api/users/login/admin")
                .send(defaultUser)
                .end((err, res) => {
                    token = res.body.token;
                    res.should.have.status(200);
                    done();
                });
        });

        describe("GET all users", () => {
            it("It should GET all users", (done) => {
                chai
                    .request(server)
                    .get("/api/users")
                    .set({ Authorization: `Bearer ${token}` })
                    .end((err, response) => {
                        response.should.have.status(200);
                        done();
                    });
            });

        });



        it("It should GET all the blogs", (done) => {
            chai
                .request(server)
                .get("/api/blogs/")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    done();
                });
        });

        it("It should NOT GET all the blogs", (done) => {
            chai
                .request(server)
                .get("/api/blog/")
                .set({ Authorization: `Bearer ${token}` })
                .end((err, response) => {
                    response.should.have.status(404);
                    done();
                });
        });


        it("It should NOT GET a blog by ID", (done) => {
            chai
                .request(server)
                .get("/api/blogs/63ef6944a63de385587b25608")
                .set({ Authorization: `Bearer ${token}` })
                .end((err, response) => {
                    response.should.have.status(400);
                    done();
                });
        });
    })
})


describe("Testing Home Page", () => {
    it("Should GET Home page", (done) => {
        chai
            .request(server)
            .get("/api/home")
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
}); response.should.be.a("object");


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



    it("Should not POST new blog if not Admin", function (done) {

        chai.request(server)
            .post("/api/blogs")
            .send(defaultUser)
            .end((err, res) => {
                token = res.body.token;
                res.should.have.status(500);
                done();
            })
    });



    it("Should GET all Blogs", function (done) {

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


    it("Should GET single Blog", function (done) {

        chai.request(server)
            .get("/api/blogs/63f8eb7a7f039c64f4d10975").then(response => {
                response.should.have.status(200);
                expect(response).to.be.a("object");
                done();

            })
            .catch((err) => {

                done(err)
            })
    });


    it("Should GET single Blog", function (done) {
        chai.request(server)
            .get("/api/blogs/63fc69561a41cec3a895ab46").then(response => {
                response.should.have.status(200);
                expect(response).to.be.a("object");
                done();

            })
            .catch((err) => {

                done(err)
            })
    });


    it("Should not UPDATE blog if not Admin", function (done) {

        chai.request(server)
            .patch("/api/blogs/63ef6944a63de385587b2560").set({
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
            .patch("/api/blogs/663ef6944a63de385587b2560").set({
            }).then(response => {
                expect(response).to.be.a("object");
                done();
            })
            .catch((err) => {

                done(err)
            })
    });


    it("Should not DELETE blog if not Admin", function (done) {

        chai.request(server)
            .delete("/api/blogs/63ef6944a63de385587b2560").then(response => {
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
            .delete("/api/blogs/63f8eb7a7f039c64f4d10975").then(response => {
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


    it("can DELETE blog if Admin", function (done) {

        chai.request(server)
            .delete("/api/blogs/63f8eb7a7f039c64f4d10975").then(response => {
                response.should.have.status(500);
                expect(response).to.be.a("object");
                done();
            })
            .catch((err) => {

                done(err)
            })
    });
})



it("Should not UPDATE message", function (done) {

    chai.request(server)
        .patch("/api/messsages/63e3fa9bed8523be086b107f").then(response => {
            response.should.have.status(404);
            expect(response).to.be.a("object");
            done();
        })
        .catch((err) => {

            done(err)
        })
});









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


    it("It should not GET comments", (done) => {
        chai
            .request(server)
            .delete("/api/comment/")
            .end((err, response) => {
                response.should.have.status(404);
                response.body.should.be.a("object");
                done();
            });
    });

    it("Should get single comment", function (done) {

        chai.request(server)
            .get("/api/comments").then(response => {
                response.should.have.status(200);
                expect(response).to.be.a("object");
                done();
            })
            .catch((err) => {

                done(err)
            })
    });
})
















describe("Messages API", () => {



    it("Should not DELETE message if not Admin", function (done) {

        chai.request(server)
            .delete("/api/messsages/63e3fa9bed8523be086b107f").then(response => {
                expect(response).to.be.a("object");
                done();
            })
            .catch((err) => {

                done(err)
            })
    });

    it("Should not UPDATE message", function (done) {

        chai.request(server)
            .patch("/api/messsages/63e3fa9bed8523be086b107f").then(response => {
                response.should.have.status(404);
                expect(response).to.be.a("object");
                done();
            })
            .catch((err) => {

                done(err)
            })
    });
})



describe("Messages API", () => {
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








describe("Users API", () => {


    it("It should GET all the users", (done) => {
        chai
            .request(server)
            .get("/api/users/")
            .end((err, response) => {
                response.should.have.status(500);
                response.body.should.be.a("object");
                done();
            });
    });

    it("It should ADD user id admin", (done) => {
        chai
            .request(server)
            .get("/api/users/")
            .end((err, response) => {
                response.should.have.status(500);
                response.body.should.be.a("object");
                done();
            });
    });



    it("should fetch all users successfully", (done) => {
        chai
            .request(server)
            .get("/api/users")
            .end((err, res) => {
                res.should.have.status(500);
                res.body.should.be.a("object");
                done();
            });
    });




    it("should fetch all users successfully", (done) => {
        chai
            .request(server)
            .get("/api/users")
            .end((err, res) => {
                res.should.have.status(500);
                res.body.should.be.a("object");
                done();
            });
    });

    it("It should NOT GET all the users", (done) => {
        chai
            .request(server)
            .get("/api/users")
            .end((err, response) => {
                response.should.have.status(500);
            });
        done();
    });

    it("Should not UPDATE user", function (done) {
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



//ADMIN 



describe("Admin API", () => {


    it("It should NOT UPDATE all the admins", (done) => {
        chai
            .request(server)
            .get("/api/users/login/admin")
            .end((err, response) => {
                response.should.have.status(404);
                expect(response).to.be.a("object");
                done();
            });
    });



    describe("get users", () => {

        let defaultUser = {
            email: "admin@gmail.com",
            password: "ADMIN1234"
        };

        let token;



        beforeEach(done => {
            chai
                .request(server)
                .post("/api/users/login/admin")
                .send(defaultUser)
                .end((err, res) => {
                    token = res.body.token;
                    res.should.have.status(200);
                    done();
                });
        });



        it("should fetch all users successfully", (done) => {
            chai
                .request(server)
                .get("/api/users")
                .set({ Authorization: `Bearer ${token}` })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    done();
                });
        });


        it("It should GET all the admins", (done) => {
            chai
                .request(server)
                .get("/api/users/admin")
                .set({ Authorization: `Bearer ${token}` })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    done();
                });
        });


        it("It should ADD NEW admin", (done) => {
            chai
                .request(server)
                .post("/api/usersadmin")
                .set({ Authorization: `Bearer ${token}` })
                .end((err, response) => {
                    response.should.have.status(404);
                    done();
                });
        });


        it("It should not ADD new admin", (done) => {
            chai.request(server)
                .post("/api/uses/admin")
                .set({ Authorization: `Bearer ${token}` })
                .end((err, response) => {
                    response.should.have.status(404);
                    response.body.should.be.a("object");
                    done();
                });
        });


        it("Should GET all Messages", function (done) {

            chai
                .request(server)
                .get("/api/messages")
                .set({ Authorization: `Bearer ${token}` })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    done();
                });
        });

        it("It should NOT UPDATE all the admins", (done) => {
            chai
                .request(server)
                .get("/api/users/login/admin")
                .end((err, response) => {
                    response.should.have.status(404);
                    expect(response).to.be.a("object");
                    done();
                });
        });



        it("Should UPDATE user", function (done) {
            chai.request(server)
                .patch("/api/users/63f5ee3c71c0d268b5b5b6aa")
                .set({ Authorization: `Bearer ${token}` })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    done();
                });
        });

        it("Should UPDATE auser", function (done) {
            chai.request(server)
                .patch("/api/users/63fc7b551a41cec3a895ab5b")
                .set({ Authorization: `Bearer ${token}` })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    done();
                });
        });


        it("Should UPDATE a user", function (done) {
            chai.request(server)
                .patch("/api/users/63fc7b301a41cec3a895ab58")
                .set({ Authorization: `Bearer ${token}` })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    done();
                });
        });

        it("Should UPDATE auser", function (done) {
            chai.request(server)
                .patch("/api/users/63fc7b1b1a41cec3a895ab55")
                .set({ Authorization: `Bearer ${token}` })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    done();
                });
        });




        it("Should PDATE user", function (done) {
            chai.request(server)
                .patch("/api/users/63fc67d71a41cec3a895ab33")
                .set({ Authorization: `Bearer ${token}` })
                .end((err, response) => {
                    response.should.have.status(404);
                    response.body.should.be.a("object");
                    done();
                });
        });



        it("Should delete user", function (done) {
            chai.request(server)
                .delete("/api/users/63e4e3e439e811e3460ba734")
                .set({ Authorization: `Bearer ${token}` })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    done();
                });
        });


        it("Should delete user", function (done) {
            chai.request(server)
                .delete("/api/users/63fc67d71a41cec3a895ab33")
                .set({ Authorization: `Bearer ${token}` })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    done();
                });
        });


        it("Should DELETE message", function (done) {
            chai.request(server)
                .delete("/api/messages/63f31d75d6d3a9fe2147a2f0")
                .set({ Authorization: `Bearer ${token}` })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    done();
                });
        });


        it("Should DELETE single message", function (done) {
            chai.request(server)
                .delete("/api/messages/63fc69a21a41cec3a895ab4b")
                .set({ Authorization: `Bearer ${token}` })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    done();
                });
        });



        it("Should GET single Message", function (done) {

            chai.request(server)
                .get("/api/messages/63f883394e5b8706eb0741ba")
                .set({ Authorization: `Bearer ${token}` })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    done();
                });
        });


        it("Should GET Message", function (done) {

            chai.request(server)
                .get("/api/messages/63fc69751a41cec3a895ab49")
                .set({ Authorization: `Bearer ${token}` })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    done();
                });
        });


        it("It should GET a blog by ID", (done) => {
            chai
                .request(server)
                .get("/api/blogs/63f8eb7a7f039c64f4d10975")
                .set({ Authorization: `Bearer ${token}` })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.should.be.a("object");
                    done();
                });
        });



        it("It should NOT DELETE comment", (done) => {
            chai
                .request(server)
                .get("/api/comments/63ee0cb4604a73259c121d79")
                .set({ Authorization: `Bearer ${token}` })
                .end((err, response) => {
                    response.should.have.status(404);
                    response.should.be.a("object");
                    done();
                });
        });


    });
})






describe("Admin API", () => {


    it("It should NOT UPDATE all the admins", (done) => {
        chai
            .request(server)
            .get("/api/users/login/admin")
            .end((err, response) => {
                response.should.have.status(404);
                expect(response).to.be.a("object");
                done();
            });
    });



    describe("get users", () => {

        let defaultUser = {
            email: "admin@gmail.com",
            password: "ADMIN1234"
        };

        let token;



        beforeEach(done => {
            chai
                .request(server)
                .post("/api/users/login/admin")
                .send(defaultUser)
                .end((err, res) => {
                    token = res.body.token;
                    res.should.have.status(200);
                    done();
                });
        });



        it("should fetch all users successfully", (done) => {
            chai
                .request(server)
                .get("/api/users")
                .set({ Authorization: `Bearer ${token}` })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    done();
                });
        });


        it("It should GET all the admins", (done) => {
            chai
                .request(server)
                .get("/api/users/admin")
                .set({ Authorization: `Bearer ${token}` })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    done();
                });
        });


        it("It should ADD NEW admin", (done) => {
            chai
                .request(server)
                .post("/api/usersadmin")
                .set({ Authorization: `Bearer ${token}` })
                .end((err, response) => {
                    response.should.have.status(404);
                    done();
                });
        });


        it("It should not ADD new admin", (done) => {
            chai.request(server)
                .post("/api/us/admin")
                .end((err, response) => {
                    response.should.have.status(404);
                    response.body.should.be.a("object");
                    done();
                });
        });


        it("Should GET all Messages", function (done) {

            chai
                .request(server)
                .get("/api/messages")
                .set({ Authorization: `Bearer ${token}` })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    done();
                });
        });

        it("It should NOT UPDATE all the admins", (done) => {
            chai
                .request(server)
                .get("/api/users/login/admin")
                .end((err, response) => {
                    response.should.have.status(404);
                    expect(response).to.be.a("object");
                    done();
                });
        });



        it("Should UPDATE user", function (done) {
            chai.request(server)
                .patch("/api/users/63f5ee3c71c0d268b5b5b6aa")
                .set({ Authorization: `Bearer ${token}` })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    done();
                });
        });

        it("Should UPDATE auser", function (done) {
            chai.request(server)
                .patch("/api/users/63fc7b551a41cec3a895ab5b")
                .set({ Authorization: `Bearer ${token}` })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    done();
                });
        });


        it("Should UPDATE a user", function (done) {
            chai.request(server)
                .patch("/api/users/63fc7b301a41cec3a895ab58")
                .set({ Authorization: `Bearer ${token}` })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    done();
                });
        });

        it("Should UPDATE auser", function (done) {
            chai.request(server)
                .patch("/api/users/63fc7b1b1a41cec3a895ab55")
                .set({ Authorization: `Bearer ${token}` })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    done();
                });
        });




        it("Should PDATE user", function (done) {
            chai.request(server)
                .patch("/api/users/63fc67d71a41cec3a895ab33")
                .set({ Authorization: `Bearer ${token}` })
                .end((err, response) => {
                    response.should.have.status(404);
                    response.body.should.be.a("object");
                    done();
                });
        });



        it("Should delete user", function (done) {
            chai.request(server)
                .delete("/api/users/63e4e3e439e811e3460ba734")
                .set({ Authorization: `Bearer ${token}` })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    done();
                });
        });


        it("Should delete user", function (done) {
            chai.request(server)
                .delete("/api/users/63fc67d71a41cec3a895ab33")
                .set({ Authorization: `Bearer ${token}` })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    done();
                });
        });


        it("Should DELETE message", function (done) {
            chai.request(server)
                .delete("/api/messages/63f31d75d6d3a9fe2147a2f0")
                .set({ Authorization: `Bearer ${token}` })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    done();
                });
        });


        it("Should DELETE single message", function (done) {
            chai.request(server)
                .delete("/api/messages/63fc69a21a41cec3a895ab4b")
                .set({ Authorization: `Bearer ${token}` })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    done();
                });
        });



        it("Should GET single Message", function (done) {

            chai.request(server)
                .get("/api/messages/63f883394e5b8706eb0741ba")
                .set({ Authorization: `Bearer ${token}` })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    done();
                });
        });


        it("Should GET Message", function (done) {

            chai.request(server)
                .get("/api/messages/63fc69751a41cec3a895ab49")
                .set({ Authorization: `Bearer ${token}` })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    done();
                });
        });

        it("Should GET Message", function (done) {

            chai.request(server)
                .get("/api/messages/63fc7b841a41cec3a895ab61")
                .set({ Authorization: `Bearer ${token}` })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    done();
                });
        });


        it("Should DELETE Message", function (done) {

            chai.request(server)
                .delete("/api/messages/63fc7b7a1a41cec3a895ab5f")
                .set({ Authorization: `Bearer ${token}` })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    done();
                });
        });





        it("It should GET a blog by ID", (done) => {
            chai
                .request(server)
                .get("/api/blogs/63f8eb7a7f039c64f4d10975")
                .set({ Authorization: `Bearer ${token}` })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.should.be.a("object");
                    done();
                });
        });



        it("It should NOT DELETE comment", (done) => {
            chai
                .request(server)
                .get("/api/comments/63ee0cb4604a73259c121d79")
                .set({ Authorization: `Bearer ${token}` })
                .end((err, response) => {
                    response.should.have.status(404);
                    response.should.be.a("object");
                    done();
                });
        });

        it("It should DELETE comment", (done) => {
            chai
                .request(server)
                .get("/api/comments/63fc69561a41cec3a895ab46")
                .set({ Authorization: `Bearer ${token}` })
                .end((err, response) => {
                    response.should.have.status(404);
                    response.should.be.a("object");
                    done();
                });
        });



    });
})















// PUBLIC USER


describe("Visitor's API", () => {


    let publicUser = {
        email: "fortesting@gmail.com",
        password: "fortesting"
    };

    let pToken;


    beforeEach(done => {
        chai
            .request(server)
            .post("/api/users/login")
            .send(publicUser)
            .end((err, res) => {
                pToken = res.body.token;
                res.should.have.status(200);
                done();
            });
    });


    it("should POST a comment", (done) => {
        chai
            .request(server)
            .post("/api/comments/63f3324e9ecd3d9b8b637fcb")
            .set({ Authorization: `Bearer ${pToken}` })
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a("object");
                done();
            });
    });

    it("should POST comment", (done) => {
        chai
            .request(server)
            .post("/api/comments/63fc69561a41cec3a895ab46")
            .set({ Authorization: `Bearer ${pToken}` })
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a("object");
                done();
            });
    });

    it("should not POST a comment", (done) => {
        chai
            .request(server)
            .post("/api/comm/63f3324e9ecd3d9b8b637fcb")
            .set({ Authorization: `Bearer ${pToken}` })
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a("object");
                done();
            });
    });



    it("should not POST a comment", (done) => {
        chai
            .request(server)
            .post("/api/comm/63fc69561a41cec3a895ab4")
            .set({ Authorization: `Bearer ${pToken}` })
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a("object");
                done();
            });
    });



})




describe("Visitor's API", () => {


    let publicUser = {
        email: "fortesting@gmail.com",
        password: "fortesting"
    };

    let pToken;


    beforeEach(done => {
        chai
            .request(server)
            .post("/api/users/login")
            .send(publicUser)
            .end((err, res) => {
                pToken = res.body.token;
                res.should.have.status(200);
                done();
            });
    });


    it("should POST a like", (done) => {
        chai
            .request(server)
            .post("/api/likes/63f3324e9ecd3d9b8b637fcb")
            .set({ Authorization: `Bearer ${pToken}` })
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a("object");
                done();
            });
    });

    it("should POST like", (done) => {
        chai
            .request(server)
            .post("/api/likes/63fc69561a41cec3a895ab46")
            .set({ Authorization: `Bearer ${pToken}` })
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a("object");
                done();
            });
    });


})


it("should POST a like", (done) => {
    chai
        .request(server)
        .post("/api/likes/63f3324e9ecd3d9b8b637fcb")
        .end((err, res) => {
            res.should.have.status(500);
            res.body.should.be.a("object");
            done();
        });
});

it("should POST not like", (done) => {
    chai
        .request(server)
        .post("/api/likes/63fc69561a41cec3a895ab46")
        .end((err, res) => {
            res.should.have.status(500);
            res.body.should.be.a("object");
            done();
        });
});




describe("Visitor's API", () => {


    let publicUser = {
        email: "bahati@gmail.com",
        password: "BAATI"
    };

    let pToken;


    beforeEach(done => {
        chai
            .request(server)
            .post("/api/users/login")
            .send(publicUser)
            .end((err, res) => {
                pToken = res.body.token;
                res.should.have.status(400);
                done();
            });
    });


    it("should not POST a like", (done) => {
        chai
            .request(server)
            .post("/api/likes/63f891cdf48ca38d410e6aa7")
            .set({ Authorization: `Bearer ${pToken}` })
            .end((err, res) => {
                res.should.have.status(500);
                res.body.should.be.a("object");
                done();
            });
    });

    it("should not POST a like", (done) => {
        chai
            .request(server)
            .post("/api/likes/63fc69561a41cec3a895ab")
            .set({ Authorization: `Bearer ${pToken}` })
            .end((err, res) => {
                res.should.have.status(500);
                res.body.should.be.a("object");
                done();
            });
    });


})




describe("Visitor's API", () => {


    let publicUser = {
        email: "baati@gmail.com",
        password: "BAHATI"
    };

    let pToken;


    beforeEach(done => {
        chai
            .request(server)
            .post("/api/users/login")
            .send(publicUser)
            .end((err, res) => {
                pToken = res.body.token;
                res.should.have.status(400);
                done();
            });
    });


    it("should POST a comment", (done) => {
        chai
            .request(server)
            .post("/api/comments/63f3324e9ecd3d9b8b637fcb")
            .set({ Authorization: `Bearer ${pToken}` })
            .end((err, res) => {
                res.should.have.status(500);
                res.body.should.be.a("object");
                done();
            });
    });

    it("should POST comment", (done) => {
        chai
            .request(server)
            .post("/api/comments/63fc69561a41cec3a895ab46")
            .set({ Authorization: `Bearer ${pToken}` })
            .end((err, res) => {
                res.should.have.status(500);
                res.body.should.be.a("object");
                done();
            });
    });





    it("should not POST a comment", (done) => {
        chai
            .request(server)
            .post("/api/comm/63f3324e9ecd3d9b8b637fcb")
            .set({ Authorization: `Bearer ${pToken}` })
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a("object");
                done();
            });
    });

    it("should not POST a comment", (done) => {
        chai
            .request(server)
            .post("/api/comm/63fc69561a41cec3a895a")
            .set({ Authorization: `Bearer ${pToken}` })
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a("object");
                done();
            });
    });


})


describe("Visitor's API", () => {


    let publicUser = {
        email: "",
        password: "BAHATI"
    };

    let pToken;


    beforeEach(done => {
        chai
            .request(server)
            .post("/api/users/login")
            .send(publicUser)
            .end((err, res) => {
                pToken = res.body.token;
                res.should.have.status(400);
                done();
            });
    });


    it("should POST a comment", (done) => {
        chai
            .request(server)
            .post("/api/comments/63f3324e9ecd3d9b8b637fcb")
            .set({ Authorization: `Bearer ${pToken}` })
            .end((err, res) => {
                res.should.have.status(500);
                res.body.should.be.a("object");
                done();
            });
    });

    it("should POST a comment", (done) => {
        chai
            .request(server)
            .post("/api/comments/63fc69561a41cec3a895ab46")
            .set({ Authorization: `Bearer ${pToken}` })
            .end((err, res) => {
                res.should.have.status(500);
                res.body.should.be.a("object");
                done();
            });
    });


    it("should not POST a comment", (done) => {
        chai
            .request(server)
            .post("/api/comm/63f3324e9ecd3d9b8b637fcb")
            .set({ Authorization: `Bearer ${pToken}` })
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a("object");
                done();
            });
    });


    it("should not POST comment", (done) => {
        chai
            .request(server)
            .post("/api/comm/63fc69561a41cec3a895a")
            .set({ Authorization: `Bearer ${pToken}` })
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a("object");
                done();
            });
    });




    it("should not POST a like", (done) => {
        chai
            .request(server)
            .post("/api/likes/63f3324e9ecd3d9b8b637fcb")
            .set({ Authorization: `Bearer ${pToken}` })
            .end((err, res) => {
                res.should.have.status(500);
                res.body.should.be.a("object");
                done();
            });
    });


    it("should not POST like", (done) => {
        chai
            .request(server)
            .post("/api/likes/63fc69561a41cec3a895ab46")
            .set({ Authorization: `Bearer ${pToken}` })
            .end((err, res) => {
                res.should.have.status(500);
                res.body.should.be.a("object");
                done();
            });
    });


    it("Should not UPDATE message", function (done) {

        chai.request(server)
            .patch("/api/messsages/63e3fa9bed8523be086b107f").then(response => {
                response.should.have.status(404);
                expect(response).to.be.a("object");
                done();
            })
            .catch((err) => {

                done(err)
            })
    });

    it("Should not PDATE message", function (done) {

        chai.request(server)
            .patch("/api/messsages/63fc69561a41cec3a895ab46").then(response => {
                response.should.have.status(404);
                expect(response).to.be.a("object");
                done();
            })
            .catch((err) => {

                done(err)
            })
    });


})


describe("Users API", () => {

    describe("Users", () => {

        let defaultUser = {
            email: "admin@gmail.com",
            password: "ADMIN1234"
        };

        let token;



        beforeEach(done => {
            chai
                .request(server)
                .post("/api/users/login/admin")
                .send(defaultUser)
                .end((err, res) => {
                    token = res.body.token;
                    res.should.have.status(200);
                    done();
                });
        });

        it("should fetch all users", (done) => {
            chai
                .request(server)
                .get("/api/users")
                .set({ Authorization: `Bearer ${token}` })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    done();
                });
        });


        it("should fetch single user", (done) => {
            chai
                .request(server)
                .get("/api/users/63f5ee3c71c0d268b5b5b6aa")
                .set({ Authorization: `Bearer ${token}` })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    done();
                });
        });


        it("It should GET admins", (done) => {
            chai
                .request(server)
                .get("/api/users/admin")
                .set({ Authorization: `Bearer ${token}` })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    done();
                });
        });


        it("It should GET single admin", (done) => {
            chai
                .request(server)
                .get("/api/users/admin/63f5ec8462f504bb7a09ff3d")
                .set({ Authorization: `Bearer ${token}` })
                .end((err, response) => {
                    response.should.have.status(404);
                    response.body.should.be.a("object");
                    done();
                });
        });


        it("It should not GET a single admin", (done) => {
            chai
                .request(server)
                .get("/api/users/admin/63f5ec8462f504bb7a09ff3aad")
                .set({ Authorization: `Bearer ${token}` })
                .end((err, response) => {
                    response.should.have.status(404);
                    response.body.should.be.a("object");
                    done();
                });
        });





    })
})


describe("Admin API", () => {
    describe("get usrs", () => {

        let dUser = {
            email: "fortesting@gmail.com",
            password: "fortesting"
        };

        let token;


        beforeEach(done => {
            chai
                .request(server)
                .post("/api/users/login")
                .send(dUser)
                .end((err, res) => {
                    token = res.body.token;
                    res.should.have.status(200);
                    done();
                });
        });


        it("should not fetch all users successfully", (done) => {
            chai
                .request(server)
                .get("/api/users")
                .set({ Authorization: `Bearer ${token}` })
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.a("object");
                    done();
                });
        });

        it("should not fetch single user successfully", (done) => {
            chai
                .request(server)
                .get("/api/users/63f5ee3c71c0d268b5b5b6aa")
                .set({ Authorization: `Bearer ${token}` })
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.a("object");
                    done();
                });
        });

        it("It should not GET all the admins", (done) => {
            chai
                .request(server)
                .get("/api/users/admin")
                .set({ Authorization: `Bearer ${token}` })
                .end((err, response) => {
                    response.should.have.status(500);
                    response.body.should.be.a("object");
                    done();
                });
        });

        it("It should not ADD NEW admin", (done) => {
            chai
                .request(server)
                .post("/api/usersadmin")
                .set({ Authorization: `Bearer ${token}` })
                .end((err, response) => {
                    response.should.have.status(404);
                    done();
                });
        });

        it("Should not GET all Messages", function (done) {

            chai
                .request(server)
                .get("/api/messages")
                .set({ Authorization: `Bearer ${token}` })
                .end((err, response) => {
                    response.should.have.status(500);
                    response.body.should.be.a("object");
                    done();
                });
        });

        it("Should UPDATE user", function (done) {
            chai.request(server)
                .patch("/api/users/63f5ee3c71c0d268b5b5b6aa")
                .set({ Authorization: `Bearer ${token}` })
                .end((err, response) => {
                    response.should.have.status(500);
                    response.body.should.be.a("object");
                    done();
                });
        });


        it("Should not be able to UPDATE user", function (done) {
            chai.request(server)
                .patch("/api/users/63f5ee2071c0d268b5b5b6a7")
                .set({ Authorization: `Bearer ${token}` })
                .end((err, response) => {
                    response.should.have.status(500);
                    response.body.should.be.a("object");
                    done();
                });
        });



        it("Should not UPDATE user", function (done) {
            chai.request(server)
                .patch("/api/users/63f5ee2071c0d2686a7")
                .set({ Authorization: `Bearer ${token}` })
                .end((err, response) => {
                    response.should.have.status(500);
                    response.body.should.be.a("object");
                    done();
                });
        });

        it("should POST a comment", (done) => {
            chai
                .request(server)
                .post("/api/comments/63fc69561a41cec3a895ab46")
                .set({ Authorization: `Bearer ${token}` })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a("object");
                    done();
                });
        });


        it("should POST a comment", (done) => {
            chai
                .request(server)
                .post("/api/comments/63f8eb7a7f039c64f4d10975")
                .set({ Authorization: `Bearer ${token}` })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a("object");
                    done();
                });
        });
    })


})















