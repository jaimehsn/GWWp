let chai = require("chai")
let chaiHttp = require("chai-http")


chai.should()
chai.use(chaiHttp)

const url = "http://localhost:8080"
const tokenRe = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqYWltZWhzbkBnbWFpbC5jb20iLCJpYXQiOjE1OTE5OTcyODcsImV4cCI6MTU5MzIwNjg4N30.ncxMONR-CNBUCQLZdNXfwmSI5KmOyhf4Jp24FqlRwTM"


describe("Users Test", () => {

    describe("POST /api/users", () => {
        const body = {
            email: "rand" + Math.floor(Math.random() * 1000) + 1 + "@gmail.com",
            password: "123qweASD?",
        }
        const bodyEmpty = {
            email: "jaimehsn@gmail.com",
            password: "",
        }
        /*it("Create Users test SUCCESS", (done) => {
            chai.request(url)
                .post("/api/users")
                .send(body)
                .end((err, response) => {
                    if (err) console.log(err)
                    response.should.have.status(200)
                    response.body.should.have.property('token')

                    done()
                })
        })*/

        it("Create Users test BAD REQUEST", (done) => {
            chai.request(url)
                .post("/api/users")
                .send(bodyEmpty)
                .end((err, response) => {
                    if (err) console.log(err)
                    response.should.have.status(400)
                    response.body.should.include({ message: "This email is already registered." })

                    done()
                })
        })


    })

    describe("GET /api/users", () => {

        let body = {
            email: "jaimehsn@gmail.com",
            password: "123qweASD?",
        }

        it("Get One User test SUCCESS", (done) => {
            chai.request(url)
                .get("/api/users/jaimehsn@gmail.com")
                .set({ 'authorization': tokenRe })
                .send(body)
                .end((err, response) => {
                    if (err) console.log(err)
                    response.should.have.status(200)
                    response.body.should.to.be.an('array')
                    done()
                })
        })

        it("Get One User test NOT FOUND", (done) => {
            chai.request(url)
                .get("/api/users/asdf@gmail.com")
                .set({ 'authorization': tokenRe })
                .send(body)
                .end((err, response) => {
                    if (err) console.log(err)
                    response.should.have.status(404)
                    response.body.should.include({ message: "User not found." })
                    done()
                })
        })

        it("Get One User test UNAUTHORIZED", (done) => {
            chai.request(url)
                .get("/api/users/jaimehsn@gmail.com")
                .send(body)
                .end((err, response) => {
                    if (err) console.log(err)
                    response.should.have.status(401)
                    response.body.should.include({ message: "Token required." })
                    done()
                })
        })

        it("Get One User test UNKNOWN TOKEN", (done) => {
            chai.request(url)
                .get("/api/users/jaimehsn@gmail.com")
                .set({ 'authorization': tokenRe + "aaaa" })
                .send(body)
                .end((err, response) => {
                    if (err) console.log(err)
                    response.should.have.status(401)
                    response.body.should.include({ message: "Invalid token." })
                    done()
                })
        })


    })

    describe("PUT /api/users", () => {

        let body = {
            name: "Jaime",
            lastname: "Hidalgo",
            phone: "689289270",
            category: "Programador"
        }

        it("Get One User test USER NOT FOUND", (done) => {
            chai.request(url)
                .put("/api/users/asdf@gmail.com")
                .set({ 'authorization': tokenRe })
                .send()
                .end((err, response) => {
                    if (err) console.log(err)
                    response.should.have.status(404)
                    response.body.should.include({ message: "User not found." })
                    done()
                })
        })

        it("Get One User test UPDATED", (done) => {
            chai.request(url)
                .put("/api/users/jaimehsn@gmail.com")
                .set({ 'authorization': tokenRe })
                .send(body)
                .end((err, response) => {
                    if (err) console.log(err)
                    response.should.have.status(200)
                    response.body.should.include({ message: "User update successful." })
                    done()
                })
        })
    })

    




})