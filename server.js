const express = require("express")
const mongoose = require("mongoose")
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt")
const routes = require("./routes/index")
const app = express();
const dotenv = require("dotenv");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Blog API Documentation",
            version: "1.0.0",
        },
        servers: [
            {
                url: "http://localhost:4000/api",
            },
        ],
    },

    apis: ["./server.js"],
};
const swaggerSpec = swaggerJSDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


/**
 * @swagger
 *  components:
 *    securitySchemes:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 *    schemas:
 *      blogSchema:
 *        type: object
 *        properties:
 *          title:
 *            type: string
 *          subtitle:
 *            type: string
 *          image:
 *            type: string
 *          content:
 *            type: string
 *      messageSchema:
 *        type: object
 *        properties:
 *          name:
 *            type: string
 *          email:
 *            type: string
 *          message:
 *            type: string
 *      commentSchema:
 *        type: object
 *        properties:
 *          comment:
 *            type: string
 *      loginSchema:
 *        type: object
 *        properties:
 *          email:
 *            type: string
 *          password:
 *            type: string
 *      signupSchema:
 *        type: object
 *        properties:
 *          names:
 *            type: string
 *          email:
 *            type: string
 *          password:
 *            type: string
 *      adminSchema:
 *        type: object
 *        properties:
 *          names:
 *            type: string
 *          email:
 *            type: string
 *          password:
 *            type: string
 *      adminLoginSchema:
 *        type: object
 *        properties:
 *          email:
 *            type: string
 *          password:
 *            type: string
 *
 */


// BLOGS


/**
 * @swagger
 * /blogs:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    summary: ADD A BLOG
 *    description: ADD A BLOG
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *           $ref: "#components/schemas/blogSchema"
 *    responses:
 *      200:
 *          description: Blog added successfully
 */

/**
* @swagger
* /blogs:
*  get:
*      summary: GET ALL BLOGS
*      description: GET ALL BLOGS
*      responses:
*          200:
*              description: To test Get method
*/


/**
 * @swagger
 * /blogs/{id}:
 *  get:
 *      summary: This API is used to check if get method on single blog is working or not
 *      description: This API is used to check if GET method on single blog is working or not
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: numeric ID required
 *            schema:
 *            type: integer
 *      responses:
 *          200:
 *              description: To test Get method
 */


/**
 *  @swagger
 *  /blogs/{id}:
 *   patch:
 *     security:
 *       - bearerAuth: []
 *     summary: UPDATE
 *     parameters:
 *           - in: path
 *             name: id
 *             schema:
 *               type: string
 *             required: true
 *             description: The blog id
 *     requestBody:
 *        required: true
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                subtitle:
 *                  type: string
 *                image:
 *                  type: string
 *                content:
 *                  type: string
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/blogSchema'
 *     responses:
 *       200:
 *         description: BLOG UPDATED
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/blogSchema"
 *       404:
 *         description: Not Found  
 */


/**
 * @swagger
 * /blogs/{id}:
 *  delete:
 *    security:
 *      - bearerAuth: []
 *    summary:  DELETE SINGLE BLOG
 *    description: DELETE SINGLE BLOG
 *    parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: numeric ID required
 *            schema:
 *            type: integer
 *    responses:
 *          200:
 *              description: User deleted successfully
 */




// MESSAGES


/**
 * @swagger
 * /messages:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    summary: ADD A MESSAGE
 *    description: ADD A MESSAGE
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *           $ref: "#components/schemas/messageSchema"
 *    responses:
 *      200:
 *          description: Blog added successfully
 */

/**
 * @swagger
 * /messages:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: GET MESSAGES
 *    description: GET MESSAGES
 *    responses:
 *          200:
 *              description: To test Get method
 */


/**
 * @swagger
 * /message/{id}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: GET SINGLE MESSAGE
 *    description: GET SINGLE MESSAGE
 *    parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: numeric ID required
 *            schema:
 *            type: integer
 *    responses:
 *          200:
 *              description: To test Get method
 */



/**
 * @swagger
 * /messages/{id}:
 *  delete:
 *    security:
 *      - bearerAuth: []
 *    summary:  DELETE MESSAGE
 *    description: DELETE MESSAGE
 *    parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: numeric ID required
 *            schema:
 *            type: integer
 *    responses:
 *          200:
 *              description: Message deleted successfully
 */



// USERS


/**
 * @swagger
 * /users:
 *  post:
 *    summary: Sign Up
 *    description: For registering new users
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *           $ref: "#components/schemas/signupSchema"
 *    responses:
 *      200:
 *          description: User registered successfully
 */


 /**
 * @swagger
 * /users:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: RETRIEVE USERS LIST
 *    description: RETRIEVE USERS LIST
 *    responses:
 *          200:
 *              description: To test Get method
*/

/**
 * @swagger
 * /users/{id}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: RETRIEVE SINGLE USER
 *    description: RETRIEVE SINGLE USER
 *    parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: numeric ID required
 *            schema:
 *            type: integer
 *    responses:
 *          200:
 *              description: To test Get method
 */


/**
 * @swagger
 * /users:
 *  post:
 *    summary: REGISTER NEW USER
 *    description: REGISTER NEW USER
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *           $ref: "#components/schemas/signupSchema"
 *    responses:
 *      200:
 *          description: User registered successfully
 */


/**
 *  @swagger
 *  /users/{id}:
 *   patch:
 *     security:
 *       - bearerAuth: []
 *     summary: UPDATE USER
 *     parameters:
 *           - in: path
 *             name: id
 *             schema:
 *               type: string
 *             required: true
 *             description: USER ID
 *     requestBody:
 *        required: true
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              properties:
 *                names:
 *                  type: string
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/signupSchema'
 *     responses:
 *       200:
 *         description: USER UPDATED
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/signupSchema"
 *       404:
 *         description: Not Found  
 */



/**
 * @swagger
 * /users/{id}:
 *  delete:
 *    security:
 *      - bearerAuth: []
 *    summary: DELETE USER
 *    description: DELETE USER
 *    parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: numeric ID required
 *            schema:
 *            type: integer
 *    responses:
 *          200:
 *              description: User deleted successfully
 */




// SIGN IN


/**
 * @swagger
 * /users/login:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    summary: PUBLIC LOGIN
 *    description: PUBLIC LOGIN
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *           $ref: "#components/schemas/loginSchema"
 *    responses:
 *      200:
 *          description: User logged in succesfully
 */


// COMMENT


/**
 * @swagger
 * /comments/{id}:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    summary: ADD COMMENT
 *    description: ADD COMMENT
 *    parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: numeric ID required
 *            schema:
 *              $ref: "#/components/schemas/commentSchema"
 *    responses:
 *      200:
 *          description: Comment added succesfully
 */


// LIKES


/**
 * @swagger
 * /likes/{id}:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    summary: ADD LIKE
 *    description: ADD LIKE
 *    parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: numeric ID required
 *            schema:
 *              $ref: "#/components/schemas/likeSchema"
 *    responses:
 *      200:
 *          description: Like added succesfully
 */



//ADMINISTRATOR


/**
 * @swagger
 * /users/admin:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    summary: ADMIN sign up
 *    description: ADMIN sign up
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *           $ref: "#components/schemas/adminSchema"
 *    responses:
 *      200:
 *          description: Admin added succesfully
 */


// ADMIN LOGIN

/**
 * @swagger
 * /users/login/admin:
 *  post:
 *    summary: ADMIN LOGIN
 *    description: ADMIN LOGIN
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *           $ref: "#components/schemas/adminLoginSchema"
 *    responses:
 *      200:
 *          description: Admin logged in
 */






/**
 * @swagger
 * /users/admin/{id}:
 *  delete:
 *    security:
 *      - bearerAuth: []
 *    summary: DELETE SINGLE ADMIN
 *    description: DELETE SINGLE ADMIN
 * 
 *    parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: numeric ID required
 *            schema:
 *            type: integer
 *    responses:
 *          200:
 *              description: Admin deleted successfully
 */




dotenv.config();
const port = process.env.PORT || 3000;

app.use(express.json())
app.use("/api", routes)

app.listen(port, () => {
    console.log("Server is listening on port", port)
})


mongoose.set('strictQuery', false)
    .connect(process.env.MONGO_URL, { useNewUrlParser: true })
    .then(() => {
        console.log("connected to DB")
    }).catch((err) => console.log("Error, couldn't connect to db", err))
app.get("/", (req, res) => {
    res.status(200).json({ msg: "Welcome home" })
})

module.exports = app;
