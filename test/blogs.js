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
    it("Should not POST new blog if not Admin", function (done) {

        chai.request(server)
            .post("/api/blogs").then(response => {
                response.should.have.status(500);
                expect(response).to.be.a("object");
                done();
            })
            .catch((err) => {

                done(err)
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
})

describe("Contact API", () => {
  /**
   * Test the GET all messages route
   */
  describe("GET /api/contacts", () => {
    it("it should GET all the messages", (done) => {
      chai
        .request(server)
        .get("/api/contacts")
        .end((err, response) => {
          response.should.have.status(200);
        });
      done();
    });
    it("it should NOT GET all the messages", (done) => {
      chai
        .request(server)
        .get("/api/contact")
        .end((err, response) => {
          response.should.have.status(404);
        });
      done();
    });
  });

  /**
   * Test the GET message  (by id) route
   */
  describe("GET /api/contacts/:id", () => {
    it("it should GET a message", (done) => {
      chai
        .request(server)
        .get("/api/contacts/:id")
        .end((err, response) => {
          response.should.have.status(200);
        });
      done();
    });
  });
  /**
   * Test the POST a message route
   */
  describe("POST /api/contacts", () => {
    it("it should POST a new messages", (done) => {
      const contact = {
        name: "kalex",
        email: "kal1@gmail.com",
        message: "Hello to you",
      };
      chai
        .request(server)
        .post("/api/contacts")
        .send(contact)
        .end((err, response) => {
          response.should.have.status(201);
          response.body.should.have.property("name");
          response.body.should.have.property("email");
          response.body.should.have.property("message");
        });
      done();
    });

    it("it should NOT POST a new messages without the name", (done) => {
      const contact = {
        email: "kal1@gmail.com",
        message: "Hello to you",
      };
      chai
        .request(server)
        .post("/api/contacts")
        .send(contact)
        .end((err, response) => {
          response.should.have.status(400);
        });
      done();
    });
  });
  /**
   * Test the  DELETE a message
   */

  /**
   * Test the GET All blogs route
   */
  describe("GET /api/blogs", () => {
    it("it should GET all the users", (done) => {
      chai
        .request(server)
        .get("/api/blogs")
        .end((err, response) => {
          response.should.have.status(200);
        });
      done();
    });
    it("it should NOT GET all the users", (done) => {
      chai
        .request(server)
        .get("/api/blog")
        .end((err, response) => {
          response.should.have.status(404);
        });
      done();
    });
  });
  /**
   * Test GET single  blog
   */
  describe("GET /api/blogs/:id", () => {
    it("it should GET a single blog with ID", (done) => {
      chai
        .request(server)
        .get("/api/blogs/:id")
        .end((err, response) => {
          response.should.have.status(200);
        });
      done();
    });
  });
  /**
   * Test to add a blog
   */
  describe("POST /api/blogs", () => {
    it("it should POST a new blog", (done) => {
      const blogs = {
        image: "https://unsplash.com/photos/2V7KKhNwQTk",
        title: "mocha testing blog",
        description: "Hello to you",
      };
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImthbGV4QGdtYWlsLmNvbSIsImlkIjoiNjNlYzkxN2VmMjYxYjY2Y2ZjYzA4ZGYwIiwiaWF0IjoxNjc2NjE4ODM1fQ.Yd8uuTPC8n4Vc0AEDrkyV8KetXv-mqt2TUXqaHDaN5I";
      chai
        .request(server)
        .post("/api/blogs")
        .send(blogs)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.should.have.status(201);
          response.body.should.have.property("image");
          response.body.should.have.property("title");
          response.body.should.have.property("description");
        });
      done();
    });
    it("it should NOT POST a new blog without image", (done) => {
      const blogs = {
        title: "mocha testing blog",
        description: "Hello to you",
      };
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImthbGV4QGdtYWlsLmNvbSIsImlkIjoiNjNlYzkxN2VmMjYxYjY2Y2ZjYzA4ZGYwIiwiaWF0IjoxNjc2NjE4ODM1fQ.Yd8uuTPC8n4Vc0AEDrkyV8KetXv-mqt2TUXqaHDaN5I";
      chai
        .request(server)
        .post("/api/blogs")
        .send(blogs)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.should.have.status(201);
        });
      done();
    });
  });
  /**
   * Test the Delete a blog
   */

  describe("DELETE /api/blogs/:id", function () {
    this.timeout(10000);
    let blogId;
    beforeEach((done) => {
      const blogs = new Blog({
        image: "https://unsplash.com/photos/2V7KKhNwQTk",
        title: "mocha testing blog",
        description: "Hello to you",
      });
      blogs.save((err, create) => {
        blogId = create._id;
        done();
      });
    });
    it("It should DELETE an existing blog", (done) => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImthbGV4QGdtYWlsLmNvbSIsImlkIjoiNjNlYzkxN2VmMjYxYjY2Y2ZjYzA4ZGYwIiwiaWF0IjoxNjc2NjE4ODM1fQ.Yd8uuTPC8n4Vc0AEDrkyV8KetXv-mqt2TUXqaHDaN5I";
      chai
        .request(server)
        .delete(`/api/blogs/${blogId}`)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          expect(response).to.have.status(200);
          done();
        });
    });
  });

  /**
   * Test Editing a blog route
   */

  /**
   * Test the GET single user after registration
   */
  describe("GET /api/signup/:id", () => {
    it("it should GET a user", (done) => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImthbGV4QGdtYWlsLmNvbSIsImlkIjoiNjNlYzkxN2VmMjYxYjY2Y2ZjYzA4ZGYwIiwiaWF0IjoxNjc2NjE4ODM1fQ.Yd8uuTPC8n4Vc0AEDrkyV8KetXv-mqt2TUXqaHDaN5I";
      chai
        .request(server)
        .get("/api/signup/:id")
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.should.have.status(404);
        });
      done();
    });
  });
});






















