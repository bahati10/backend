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


describe("GET all HOME", () => {
        it("It should GET HOME", (done) => {
            chai
                .request(server)
                .get("/api/home")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    done();
                });
        });

    it("Should not GET Home page", (done) => {
        chai
            .request(server)
            .get("/api/homes")
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });

});

describe("BLOGS", () => {

            it("It should GET Blogs", (done) => {
                chai
                    .request(server)
                    .get("/api/blogs")
                    .end((err, response) => {
                        response.should.have.status(200);
                        response.body.should.be.a("object");
                        done();
                    });
            });
    
    
    
            it("It should GET single Blog", (done) => {
                chai
                    .request(server)
                    .get("/api/blogs/63fe42370f11d7f5bd9b3441")
                    .end((err, response) => {
                        response.should.have.status(200);
                        response.body.should.be.a("object");
                        done();
                    });
            });


            it("It should GET single Blog", (done) => {
                chai
                    .request(server)
                    .delete("/api/blogs/63fdc6097d6641e187c02032")
                    .end((err, response) => {
                        response.should.have.status(500);
                        done();
                    });
            });


            it("It should not UPDATE single Blog", (done) => {
                chai
                    .request(server)
                    .patch("/api/blogs/63fdc6097d6641e187c02032")
                    .end((err, response) => {
                        response.should.have.status(500);
                        response.body.should.be.a("object");
                        done();
                    });
            });
})



describe("users API", () => {

    let defaultUser = {
        email: "admin@gmail.com",
        password: "ADMIN1234"
    };

    let token;



        before(done => {
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


            it("It should not GET all users", (done) => {
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

})



describe("the users API", () => {

    let defaultUser = {
        email: "admin@gmail.com",
        password: "ADMIN1234"
    };

    let token;



        before(done => {
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


            it("It should not GET all users", (done) => {
            chai
                .request(server)
                .delete("/api/users/63fcac4c1f5ab1316adb8fae")
                .set({ Authorization: `Bearer ${token}` })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    done();
                });
        });

})



describe("Users API", () => {

    let defaultUser = {
        email: "admin@gmail.com",
        password: "ADMIN1234"
    };

    let update = {
        email: "admin@gmail.com",
        password: "ADMIN1234"
    };

    let token;



        before(done => {
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


            it("It should UPDATE all users", (done) => {
            chai
                .request(server)
                .patch("/api/users/63fa293c7f039c64f4d10980")
                .set({ Authorization: `Bearer ${token}` })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    done();
                });
        });



        it("It should not GET user", (done) => {
            chai
                .request(server)
                .get("/api/users/63fa293c7f039c64f4d10980")
                .set({ Authorization: `Bearer ${token}` })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    done();
                });
        });

})



describe("Users TEST", () => {

    let defaultUser = {
        email: "admin@gmail.com",
        password: "ADMIN1234"
    };

    let token;



        before(done => {
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


        it("It should not GET all users", (done) => {
            chai
                .request(server)
                .get("/api/users/63fa293c7f039c64f4d10980")
                .set({ Authorization: `Bearer ${token}` })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    done();
                });
        });

})


describe("Users", () => {

it("It should ADD new user", (done) => {

    let newUser = {
        names: "Bahati Yves",
        email: "unknowil@gmail.com",
        password: "unknownwemail"
    }

    chai
        .request(server)
        .post("/api/users")
        .send(newUser)
        .end((err, response) => {
            response.should.have.status(201);
            done();
        });
});
})



describe("messages API", () => {


    let defaultUser = {
        email: "admin@gmail.com",
        password: "ADMIN1234"
    };


    let msg = {
        name: "hello there again",
        email: "admin@gmail.com",
        message: "ADMIN1234"
    };

    let token;



        before(done => {
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





    it("It should ADD new message", (done) => {
        chai
            .request(server)
            .post("/api/messages")
            .send(msg)
            .set({ Authorization: `Bearer ${token}` })
            .end((err, response) => {
                response.should.have.status(201);
                done();
            });
    });it


    it("It should not update message", (done) => {
        chai
            .request(server)
            .patch("/api/messages/63fc7b841a41cec3a895ab61")
            .set({ Authorization: `Bearer ${token}` })
            .end((err, response) => {
                response.should.have.status(404);
                done();
            });
    });

    it("Should not del message", (done) => {
        chai
            .request(server)
            .delete("/api/messages")
            .set({ Authorization: `Bearer ${token}` })
            .end((err, response) => {
                response.should.have.status(404);
                done();
            });
    });
})



describe("messages", () => {


    let defaultUser = {
        email: "admin@gmail.com",
        password: "ADMIN1234"
    };

    let token;



        before(done => {
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



    it("It should delete message", (done) => {
        chai
            .request(server)
            .delete("/api/messages/63fcf9ae1f5ab1316adb90e0")
            .set({ Authorization: `Bearer ${token}` })
            .end((err, response) => {
                response.should.have.status(200);
                done();
            });
    });


    it("It should get all message", (done) => {
        chai
            .request(server)
            .get("/api/messages")
            .set({ Authorization: `Bearer ${token}` })
            .end((err, response) => {
                response.should.have.status(200);
                done();
            });
    });


    it("It should get all message", (done) => {
        chai
            .request(server)
            .get("/api/messages/63fc7b841a41cec3a895ab61")
            .set({ Authorization: `Bearer ${token}` })
            .end((err, response) => {
                response.should.have.status(200);
                done();
            });
    });



    it("It should get message by id", (done) => {
        chai
            .request(server)
            .get("/api/messages/63fcf9ae1f5ab1316adb90e0")
            .set({ Authorization: `Bearer ${token}` })
            .end((err, response) => {
                response.should.have.status(404);
                done();
            });
    });
})





describe("messages API", () => {


    let defaultUser = {
        email: "admin@gmail.com",
        password: "ADMIN1234"
    };

    let token;



        before(done => {
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


    it("It should get all admins", (done) => {
        chai
            .request(server)
            .get("/api/users/admin")
            .set({ Authorization: `Bearer ${token}` })
            .end((err, response) => {
                response.should.have.status(200);
                done();
            });
    });


    it("It should get single admin", (done) => {
        chai
            .request(server)
            .get("/api/users/admin/63fcfe591f5ab1316adb90e2")
            .set({ Authorization: `Bearer ${token}` })
            .end((err, response) => {
                response.should.have.status(404);
                done();
            });
    });

})




describe("Comment API", () => {


    let defaultUser = {
        email: "fortesting@gmail.com",
        password: "fortesting"
    };


    let cmnt = {
        comment: "fortesting"
    };


    let token;



        before(done => {
        chai
            .request(server)
            .post("/api/users/login")
            .send(defaultUser)
            .end((err, res) => {
                token = res.body.token;
                res.should.have.status(200);
                done();
            });
    })


    it("It should add single comment", (done) => {
        chai
            .request(server)
            .post("/api/comments/63fe425a0f11d7f5bd9b3445")
            .send(cmnt)
            .set({ Authorization: `Bearer ${token}` })
            .end((err, response) => {
                response.should.have.status(201);
                done();
            });
    });


    describe("blogs", () => {
        it("Should not ADD single blog", function (done) {

            chai.request(server)
                .get("/api/blog/63e3fa9bed8523be0").then(response => {
                    response.should.have.status(404);
                    expect(response).to.be.a("object");
                    done();
                })
                .catch((err) => {

                    done(err)
                })
        });
    })


    describe("blogs", () => {
        it("Should not DELETE single blog", function (done) {

            chai.request(server)
                .get("/api/blog/63fc8d90bc73e0be691d00c6")
                .set({ Authorization: `Bearer ${token}` })
                .end((err, response) => {
                response.should.have.status(404);
                done();
            });
        });
    })


    it("It should add single comment", (done) => {
        chai
            .request(server)
            .get("/api/comments")
            .set({ Authorization: `Bearer ${token}` })
            .end((err, response) => {
                response.should.have.status(200);
                done();
            });
    });


    it("It should get single comment", (done) => {
        chai
            .request(server)
            .get("/api/comments/63fe496a7e7f44f8c55043c6")
            .set({ Authorization: `Bearer ${token}` })
            .end((err, response) => {
                response.should.have.status(200);
                done();
            });
    });

})


describe("Comments API", () => {


    let defaultUser = {
        email: "admin@gmail.com",
        password: "ADMIN1234"
    };

    let token;



        before(done => {
        chai
            .request(server)
            .post("/api/users/login/admin")
            .send(defaultUser)
            .end((err, res) => {
                token = res.body.token;
                res.should.have.status(200);
                done();
            });
    })

    it("It should delete single comment", (done) => {
        chai
            .request(server)
            .delete("/api/comments/63fc8d98bc73e0be691d00ca")
            .set({ Authorization: `Bearer ${token}` })
            .end((err, response) => {
                response.should.have.status(200);
                done();
            });
    });


})


// LIKES



describe("Likes API", () => {


    let defaultUser = {
        email: "fortesting@gmail.com",
        password: "fortesting"
    };

    let token;



        before(done => {
        chai
            .request(server)
            .post("/api/users/login")
            .send(defaultUser)
            .end((err, res) => {
                token = res.body.token;
                res.should.have.status(200);
                done();
            });
    })

        it("It should add single like", (done) => {
        chai
            .request(server)
            .post("/api/likes/63fe42370f11d7f5bd9b3441")
            .set({ Authorization: `Bearer ${token}` })
            .end((err, response) => {
                response.should.have.status(201);
                done();
            });
    });
    
})

describe("like", () => {


    let defaultUser = {
        email: "admin@gmail.com",
        password: "ADMIN1234"
    };

    let token;


        before(done => {
        chai
            .request(server)
            .post("/api/users/login/admin")
            .send(defaultUser)
            .end((err, res) => {
                token = res.body.token;
                res.should.have.status(200);
                done();
            });
    })



    it("It should delete like", (done) => {
        chai
            .request(server)
            .delete("/api/likes/63fc6d922ffcd722befbb4c2")
            .set({ Authorization: `Bearer ${token}` })
            .end((err, response) => {
                response.should.have.status(200);
                done();
            });
    });


    it("It should get likes", (done) => {
        chai
            .request(server)
            .delete("/api/likes")
            .set({ Authorization: `Bearer ${token}` })
            .end((err, response) => {
                response.should.have.status(404);
                done();
            });
    });
})




describe("admin cont", () => {
    let user = {
        email: "admin@gmail.com",
        password: "ADMIN1234"
    };


    let admin = {
        names: "admin admin",
        email: "admin@gmail.com",
        password: "ADMIN1234"
    };

    let atoken;


    before(done => {
        chai
            .request(server)
            .post("/api/users/login/admin")
            .send(user)
            .end((err, res) => {
                atoken = res.body.token;
                res.should.have.status(200);
                done();
            });
    })



    it("It should ADD new admin", (done) => {
        chai
            .request(server)
            .post("/api/users/admin")
            .send(admin)
            .set({ Authorization: `Bearer ${atoken}` })
            .end((err, response) => {
                response.should.have.status(201);
                done();
            })
            
    });


    it("It should get admins", (done) => {
        chai
            .request(server)
            .get("/api/users/admin")
            .set({ Authorization: `Bearer ${atoken}` })
            .end((err, response) => {
                response.should.have.status(200);
                done();
            });
    });



    it("It should delete admin", (done) => {
        chai
            .request(server)
            .delete("/api/users/admin/63fcfe591f5ab1316adb90e2")
            .set({ Authorization: `Bearer ${atoken}` })
            .end((err, response) => {
                response.should.have.status(404);
                done();
            });
    });
    
})




describe("blog cont", () => {
    let user = {
        email: "admin@gmail.com",
        password: "ADMIN1234"
    };


    let blog = {
        title: "admin@gmail.com",
        subtitle: "ADMIN1234",
        image: "ADMIN1234",
        content: "ADMIN1234"
    };


    let updateBlog = {
        title: "UPDATIONG PERSONAL BLOG",
        subtitle: "UPDATIONG PERSONAL BLOG",
        image: "UPDATIONG PERSONAL BLOG",
        content: "UPDATIONG PERSONAL BLOGUPDATIONG PERSONAL BLOGUPDATIONG PERSONAL BLOGUPDATIONG PERSONAL BLOGUPDATIONG PERSONAL BLOGUPDATIONG PERSONAL BLOGUPDATIONG PERSONAL BLOGUPDATIONG PERSONAL BLOGUPDATIONG PERSONAL BLOG"
    };

    let atoken;


    before(done => {
        chai
            .request(server)
            .post("/api/users/login/admin")
            .send(user)
            .end((err, res) => {
                atoken = res.body.token;
                res.should.have.status(200);
                done();
            });
    })


    it("It should ADD new Blog", (done) => {
        chai
            .request(server)
            .post("/api/blogs")
            .send(blog)
            .set({ Authorization: `Bearer ${atoken}` })
            .end((err, response) => {
                response.should.have.status(201);
                done();
            })
            
    });


    it("It should GET single blog", (done) => {
        chai
            .request(server)
            .get("/api/blogs/63fe42370f11d7f5bd9b3441")
            .set({ Authorization: `Bearer ${atoken}` })
            .end((err, response) => {
                response.should.have.status(200);
                done();
            })
            
    });

    it("GET single blog", (done) => {
        chai
            .request(server)
            .get("/api/blogs/63fe42370f11d7f5bd9b3441")
            .set({ Authorization: `Bearer ${atoken}` })
            .end((err, response) => {
                response.should.have.status(200);
                done();
            })
            
    });


    it("UPDATE single blog", (done) => {
        chai
            .request(server)
            .patch("/api/blogs/63fe42370f11d7f5bd9b3441")
            .send(updateBlog)
            .set({ Authorization: `Bearer ${atoken}` })
            .end((err, response) => {
                response.should.have.status(200);
                done();
            })
            
    });


    it("It should UPDATE single blog", (done) => {
        chai
            .request(server)
            .patch("/api/blogs/63fe42370f11d7f5bd9b3441")
            .send(updateBlog)
            .set({ Authorization: `Bearer ${atoken}` })
            .end((err, response) => {
                response.should.have.status(200);
                done();
            })
            
    });


    it("It should DELETE single blog", (done) => {
        chai
            .request(server)
            .delete("/api/blogs/63fdc7a17d6641e187c02038")
            .set({ Authorization: `Bearer ${atoken}` })
            .end((err, response) => {
                response.should.have.status(200);
                done();
            })
            
    });
})




describe("users cont", () => {
    let user = {
        email: "admin@gmail.com",
        password: "ADMIN1234"
    };


    let uBlog = {
        title: "UPDATIONG PERSONAL BLOG",
        subtitle: "UPDATIONG PERSONAL BLOG",
        image: "UPDATIONG PERSONAL BLOG",
        content: "UPDATIONG PERSONAL BLOGUPDATIONG PERSONAL BLOGUPDATIONG PERSONAL BLOGUPDATIONG PERSONAL BLOGUPDATIONG PERSONAL BLOGUPDATIONG PERSONAL BLOGUPDATIONG PERSONAL BLOGUPDATIONG PERSONAL BLOGUPDATIONG PERSONAL BLOG"
    };

    let atoken;


    before(done => {
        chai
            .request(server)
            .post("/api/users/login/admin")
            .send(user)
            .end((err, res) => {
                atoken = res.body.token;
                res.should.have.status(200);
                done();
            });
    })



    it("It should GET users", (done) => {
        chai
            .request(server)
            .get("/api/users")
            .set({ Authorization: `Bearer ${atoken}` })
            .end((err, response) => {
                response.should.have.status(200);
                done();
            })
            
    });


    it("GET single user", (done) => {
        chai
            .request(server)
            .get("/api/users/63fa293c7f039c64f4d10980")
            .set({ Authorization: `Bearer ${atoken}` })
            .end((err, response) => {
                response.should.have.status(200);
                done();
            })
            
    });


    it("UPDATE single user", (done) => {
        chai
            .request(server)
            .patch("/api/users/63fa293c7f039c64f4d10980")
            .set({ Authorization: `Bearer ${atoken}` })
            .end((err, response) => {
                response.should.have.status(200);
                done();
            })
            
    });



    it("Should not UPDATE single user", (done) => {
        chai
            .request(server)
            .patch("/api/users/63fa039c64f4d10980")
            .set({ Authorization: `Bearer ${atoken}` })
            .end((err, response) => {
                response.should.have.status(404);
                done();
            })
            
    });


    it("It should DELETE single user", (done) => {
        chai
            .request(server)
            .delete("/api/users/63fc7af51a41cec3a895ab4f")
            .set({ Authorization: `Bearer ${atoken}` })
            .end((err, response) => {
                response.should.have.status(200);
                done();
            })
            
    });


    it("Should not DELETE single user", (done) => {
        chai
            .request(server)
            .delete("/api/users/63fec3a895ab4f")
            .set({ Authorization: `Bearer ${atoken}` })
            .end((err, response) => {
                response.should.have.status(400);
                done();
            })
            
    });


    describe("Blog", () => {
        it("It should GET single Blog", (done) => {
            chai
                .request(server)
                .get("/api/blogs")
                .set({ Authorization: `Bearer ${atoken}` })
                .end((err, response) => {
                    response.should.have.status(200);
                    done();
                });
        });

    });

    describe("Blog", () => {
        it("It should not POST A Blog", (done) => {
            chai
                .request(server)
                .post("/api/blogs")
                .set({ Authorization: `Bearer ${atoken}` })
                .end((err, response) => {
                    response.should.have.status(400);
                    done();
                });
        });

    });


    describe("Blog", () => {
        it("It should UPDATE A Blog", (done) => {
            chai
                .request(server)
                .patch("/api/blogs/63fe42370f11d7f5bd9b3441")
                .send(uBlog)
                .set({ Authorization: `Bearer ${atoken}` })
                .end((err, response) => {
                    response.should.have.status(200);
                    done();
                });
        });

    });
    
})





// PUBLIC CONTROLLER



describe("PUBLIC CONTROLLER", () => {
    let Puser = {
        email: "fortesting@gmail.com",
        password: "fortesting"
    };

    let token;


    before(done => {
        chai
            .request(server)
            .post("/api/users/login")
            .send(Puser)
            .end((err, res) => {
                token = res.body.token;
                res.should.have.status(200);
                done();
            });
    })
})





















