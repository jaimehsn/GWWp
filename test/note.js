let chai = require("chai")
let chaiHttp = require("chai-http")


chai.should()

const url = "http://localhost:8080"
const tokenRe = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqYWltZWhzbkBnbWFpbC5jb20iLCJpYXQiOjE1OTE5OTcyODcsImV4cCI6MTU5MzIwNjg4N30.ncxMONR-CNBUCQLZdNXfwmSI5KmOyhf4Jp24FqlRwTM"


chai.use(chaiHttp)

describe("Notes TEST", () => {
    describe("POST /api/notes", () => {

        let body = {
            title: 'none',
            content: 'none',
            autor: 'none',
            state: 'note',
            grpName: 'test',
        }
        let bodyEmpty = {
            
        }

        it("Create notes test SUCCESS", (done) => {
            chai.request(url)
                .post("/api/notes")
                .set({ 'authorization': tokenRe })
                .send(body)
                .end((err, response) => {
                    if (err) console.log(err)
                    response.should.have.status(200)
                    response.body.should.include({ message: "Create note OK." })

                    done()
                })
        })

        it("Create notes test BAD REQUEST", (done) => {
            chai.request(url)
                .post("/api/notes")
                .set({ 'authorization': tokenRe })
                .send(bodyEmpty)
                .end((err, response) => {
                    if (err) console.log(err)
                    response.should.have.status(400)
                    response.body.should.include({ message: "Bad query." })

                    done()
                })
        })
    })

    describe("GET /api/notes", () => {

        it("Get notes test SUCCESS", (done) => {
            chai.request(url)
                .get("/api/notes/test")
                .set({ 'authorization': tokenRe })
                .send()
                .end((err, response) => {
                    if (err) console.log(err)
                    response.should.have.status(200)
                    response.body.should.to.be.an('array')
                    done()
                })
        })
    })

    describe("PUT /api/notes", () => {

        let body = {
            title: 'none',
            content: 'none',
            autor: 'none',
            state: 'note',
        }

        it("Udate notes test SUCCESS", (done) => {
            chai.request(url)
                .put("/api/notes/161")
                .set({ 'authorization': tokenRe })
                .send(body)
                .end((err, response) => {
                    if (err) console.log(err)
                    response.should.have.status(200)
                    response.body.should.include({ message: "Note update successful." })
                    done()
                })
        })

        it("Udate notes test NOT FOUND", (done) => {
            chai.request(url)
                .put("/api/notes/123123123")
                .set({ 'authorization': tokenRe })
                .send(body)
                .end((err, response) => {
                    if (err) console.log(err)
                    response.should.have.status(404)
                    response.body.should.include({ message: "Not found Note." })
                    done()
                })
        })
    })


})